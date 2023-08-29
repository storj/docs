---
title: Coordination Avoidance
docId: UxLZTYCEDciC5L0f3LRWd
redirects:
  - /dcs/concepts/decentralization/coordination-avoidance
metadata:
  title: Understanding Coordination Avoidance in the Storj Network
  description:
    The Storj Network maintains a coordination avoidant approach for better
    performance, scalability, and reliability, compared to coordination-dependent
    systems. While it does not utilize blockchain consensus for file transfers, it
    leverages it for payment processing. The network's decentralization allows for
    greater scalability by minimizing coordination overhead.
---

Rather than coming to a global consensus around the entire state of the network (as in blockchains like ethereum, etc.) The Storj Network is **Coordination Avoidant.** The network does not need global consistency (as per CAP Theorem) as each uplink user only needs to be able to recover _their_ files.

## Advantages Over Coordination-dependant Systems

By ensuring coordination avoidance within Storj DCS, we’re able to deliver better performance and scalability over other decentralized systems—two issues that are critical to achieving broad adoption with traditional storage users. Decentralized systems that are coordination dependent, like Bitcoin, require an increasing number of resources as they scale. To compete with centralized cloud storage platforms like Amazon S3, Microsoft Azure, and Google Cloud, Storj DCS must be able to scale into the exabyte range, and beyond—something we feel confident it will be able to achieve.

We believe our approach of decentralizing both storage and metadata tiers in the network allows greater scalability, performance, and reliability than systems that rely on seeking consensus.

### Comparison to Blockchain Networks

Blockchain consensus offers very strong guarantees, but this comes at a heavy cost in coordination overhead. Coordination is not always necessary for correctness and minimizing coordination is key to maximizing scalability, availability, and high performance in database systems. One fundamental design decision of the Storj network was not to utilize blockchain consensus for file transfers to increase those properties of the Storj network. Storj takes a pragmatic approach to avoiding blockchain consensus while still maintaining correctness for file transfers. But, at the same time by default, Storj uses blockchain consensus with the Ethereum-based STORJ token for payment processing to storage node operators.

Storj DCS is an enterprise, production-ready version of the Storj network, complete with guaranteed SLAs. All user uploads and downloads on Storj DCS uses metainformation from Storj DCS [Satellites which are special nodes on the network that audit storage nodes](https://storj.io/blog/2018/12/decentralized-auditing-and-repair-the-low-key-life-of-data-resurrection/) and ensure Storage Nodes properly storing files and managing metadata for users storing data on the network.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/9K_5V8vYA1l3jjFHSe3bl_image.png)

As shown in the above architecture, there are three primary peer classes within the Storj network. All are open source, and capable of being run by any third party, making the network architecture fundamentally decentralized.&#x20;

The Storj network can leverage the decentralized nature of storage nodes and Satellites to create partitions in the network to isolate users and file transfers from each other, which helps minimize coordination across the Storj network. For extremely high throughput demands, organizations can run their own Satellite. This avoids coordination overhead with the rest of Storj DCS and allows users to make their own decisions about what database infrastructure their Satellite will use and relax consistency guarantees if they wish.
