---
title: Data Structure
slug: concepts/data-structure
createdAt: 2022-05-19T22:24:55.000Z
updatedAt: 2023-03-03T08:30:09.000Z
docId: Lq9m1BFtBYYz1I-4RwEhp
---

How data is logically segmented on the network

## Hierarchy of Data Storage

**Projects**Projects allow you to invite team members, manage billing, and manage access for various apps or users.

**Buckets** Buckets represent a collection of objects. You can upload, download, list, and delete objects of any size or shape.

**Objects**Each object typically includes the data itself, a variable amount of [metadata](https://en.wikipedia.org/wiki/Metadata), and a [globally unique identifier](https://en.wikipedia.org/wiki/Globally_unique_identifier) (Object key) which  uniquely identifies the object in a bucket. Objects within buckets are represented by keys, where keys can optionally be listed using the "/" delimiter. Objects are always end-to-end encrypted.

## Advanced Concepts

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/F1tpWMp1WeBWlJyUfdem3_image.png)

**Bucket:** represent a collection of objects. You can upload, download, list, and delete objects of any size or shape.

A bucket is an unbounded but named collection of files identified by object keys. Every object has a unique key within a bucket.&#x20;

**Object:** Each object typically includes the data itself, a variable amount of [metadata](https://en.wikipedia.org/wiki/Metadata), and a [globally unique identifier](https://en.wikipedia.org/wiki/Globally_unique_identifier) (Object key) which  uniquely identifies the object in a bucket. Objects within buckets are represented by keys, where keys can optionally be listed using the "/" delimiter. Objects are always end-to-end encrypted.

**Object Key:** An object key is a unique identifier for a file within a bucket. An object key is an arbitrary string of bytes. Object keys contain forward slashes at access control boundaries. Unless otherwise requested, we encrypt the object key before they ever leave the customer’s application’s computer.

**Segment:** represents a single array of bytes up to 64 MB.

**Inline Segment:** A inline segment is a file smaller than the meta data required to keep track of all of the pieces on the network for it. Since inline segments are smaller than the metadata for remote segments these inline segments are stored directly on the satellite. this means inline segments are **NOT** stored on the decentralized network.&#x20;

**Remote Segment:** A remote segment is a segment that will be erasure encoded and distributed across the network. A remote segment is larger than the metadata required to keep track of it on the network.

**Stripe:** a further subdivision of a segment. A stripe is a fixed amount of bytes that is used as an encryption and erasure encoding boundary size. Erasure encoding happens on stripes individually, whereas encryption may happen on a small multiple of stripes at a time. All segments are encrypted, but only remote segments erasure encode stripes. A stripe is the unit on which audits are performed. [See section 4.8.3 in whitepaper for more details. ](https://storj.io/storjv3.pdf)

**Erasure Share:** When a stripe is erasure encoded, it generates multiple pieces called erasure shares. Only a subset of the erasure shares are needed to recover the original stripe. Each erasure share has an index identifying which erasure share it is (e.g., the first, the second, etc.).

**Piece:** When a remote segment’s stripes are erasure encoded into erasure shares, the erasure shares for that remote segment with the same index are concatenated together, and that concatenated group of erasure shares is called a piece. If there are n erasure shares after erasure encoding a stripe, then there are n pieces after processing a remote segment. The nth piece is the concatenation of all of the with erasure shares from that segment’s stripes.

