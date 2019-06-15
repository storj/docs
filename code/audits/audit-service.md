# Audit Service on the Satellite

The purpose of this document is to describe the audit service's implementation.

>An assumption in our storage system is that most storage nodes are reasonably well-behaved, and most data is stored faithfully. As long as that assumption holds, Reed-Solomon is able to detect errors and even correct them, via mechanisms such as the Berlekamp-Welch error correction algorithm [37,65].

Excerpt from [Storj Whitepaper](https://storj.io/storjv3.pdf) Section 4.13, where more information and a higher-level description of the audit service can be found.

This document describes the following:
- Audit Service Components
- Overview of an Audit
- Stripe Selection
- Verification
- Containment Mode
- Reverification

# Components

- Cursor - keeps track of auditing location as while iterating through the metainfoDB (or pointerDB)
- Verifier - verifies the correctness of a given stripe (the bulk of "auditing" occurs here)
- Service - coordinates the Cursor and Verifier to run the audit process continuously
- Reporter - collates audit results and records the stats in the overlay cache

# Overview of an Audit

The audit cursor uses the metainfoDB to select a random stripe from a random remote segment. The audit verifier downloads all erasure shares generated for that stripe. The verifier needs at least the Reed-Solomon minimum required number of pieces (K) in order to verify the stripe's correctness. The verifier uses the Berlekamp-Welch algorithm to determine if any shares have been damaged or altered. If so, the verifier marks the culpable nodes as having failed the audit. If the share has not been altered, then the verifier will record the responsible nodes' audit successes. If the node appears to be offline at the time of downloading, the verifier will record the node as offline.

In a special case, if a node appears to be online but does not send the requested share data to the satellite, then the verifier will mark the node as `contained`, and a pending audit will be entered in the ContainmentDB. The contained node will have a `MaxReverifyCount` number of opportunities (a configurable parameter with default 3) to produce the correct data, before it's automatically marked as an audit failure.

Steps within Service:
1. The audit service uses the cursor to select a random stripe.
2. The verifier calls `Reverify` on the stripe in order to verify the correctness of data held by contained nodes.
3. `Reverify` returns a report detailing if any contained nodes were found to pass the audit, fail the audit, or remain contained. The reporter records these results to the overlay cache.
4. The service then calls `Verify` on the stripe, which will skip any nodes that were `reverified` already.
5. `Verify` also returns a report of the audit results, which are then recorded to the overlay cache.

# Stripe Selection

1. The cursor gets a list of pointers from the metainfoDB, keeping track of the last path listed.
2. The cursor finds a valid pointer, by filtering out pointers that are expired, inline, or have a segment size of 0.
3. Once the cursor finds a random pointer to a remote segment, it uses a random number to pick a random stripe index within that segment.
4. The cursor returns a random stripe struct that contains the random index, the pointer (used to later download erasure shares), the segment path, and indication if more pointers remain in the metainfoDB. If no more remain, then the cursor begins listing pointers from the beginning again.

# Verification

Once a random stripe has been chosen, the following steps occur to verify:
1. The verifier creates order limits for each of the remote pieces stored in the pointer associated with that stripe.
 - If an order limit couldn't be created for a piece, then that node is added to the audit report as offline.
2. The verifier downloads shares from the pieces in the pointer. Downloading the piece begins at a certain offset where the relevant erasure share begins (which is calculated by _stripe index * erasure share size_).
3. The verifier processes any potential errors from downloading a share.
    - Dial timeout -> node marked offline
    - Dial fail -> node marked offline
    - Unknown transport error -> node marked contained
    - Piece not found -> node marked failure
    - Dial successful but download timeout -> node marked contained
    - Unknown error -> node marked contained
4. The verifier takes the downloaded shares and uses the Infectious package's `Correct` method to correct altered shares. The verifier identifies the responsible nodes that housed any corrected shares, and marks audit failures for them.
5. If any nodes were marked as contained, then `pending audits` are created for them in order to be reverified in the future.
6. All successes, fails, offlines, and pending audits are returned in an audit `Report`.

# Containment Mode

The purpose of containment mode is to prevent nodes from "escaping" an audit by shutting down after having received an audit request from the satellite. (Malicious nodes could try to do this because the penalty for failing an audit is harsher than for being offline.)

Containment mode also functions as a second chance for honest nodes who happened to be rebooting, upgrading, or backlogged with tasks when they received the audit request, and weren't able to return the required data in time.

When downloading erasure shares during the verification process, if a node returns an unknown transport error, a download timeout error, or other unknown error, then the node will be marked as contained rather than succeeded, failed, or offline.

A `pending audit` entry will also be created for the node in the ContainmentDB. The verifier will rebuild the stripe, use the Infectious library to encode the single share expected from the contained node, then create a hash of that share data. The hash will be saved to the `pending audit` to check against when reverification occurs in the future.

Contained nodes will not be audited for any new data, until their contained status is lifted. For this reason, the audit service calls `Reverify` to before `Verify`.

# Reverification

1. After the cursor picks a random stripe, the verifier uses the pointer associated with that stripe to check if any of its nodes are contained.
2. If so, the verifier creates an order limit to download a share from each node.
3. The verifier downloads the erasure share. If any errors arise, they will be processed the same as in Verification step 3. 
4. If the share was downloaded successfully, then the verifier hashes the share data and compares it to the `ExpectedShareHash` saved in the `pending audit`. If it's the same, then the verifier will record the node's audit success. If not, it will record the audit failure. In both cases, the `pending audit` entry will be removed from ContainmentDB and the node will no longer be marked as `contained`.
6. All successes, fails, offlines, and pending audits are returned in an audit `Report`.