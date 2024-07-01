---
author:
  name: Brandon Iglesias
date: '2019-07-02 00:00:00'
heroimage: ./71dd92bdd263bc4c.jpeg
layout: blog
metadata:
  description: "Today we crossed another major milestone off our list on the road\
    \ to production. We\u2019re happy to announce the release of Beacon. This is the\
    \ last update ahead of our Pioneer 1 (Beta), which we\u2019re planning to release\
    \ mid-July.\_Beacon is a huge milestone for several reasons. In addition to general\
    \ i..."
  title: Announcing Beacon Alpha - File sharing, IP filtering, and increased performance
title: Announcing Beacon Alpha - File sharing, IP filtering, and increased performance

---

Today we crossed another major milestone off our list on the road to production. We’re happy to announce the release of Beacon. This is the last update ahead of our Pioneer 1 (Beta), which we’re planning to release mid-July. 

Beacon is a huge milestone for several reasons. In addition to general improvements, it adds three major updates. 

**File sharing with macaroons:** As we mentioned before, [macaroons are cryptographic authorization credentials](https://storj.io/blog/2019/05/flexible-file-sharing-with-macaroons/) that enable decentralized encryption key management. This means users storing data on the network can easily share files or folders with various types of access controls for team members, customers, website visitors, and other external contacts. For developers building on top of the Tardigrade network, Storj’s SLA-backed decentralized cloud storage platform, macaroons give them the ability to manage file access without having to trust that the Tardigrade Satellite is properly managing encryption keys.

**IP Filtering for improved file piece distribution:** A core part of a decentralized cloud storage network is that data needs to be stored in a way that is thoroughly distributed. Without distribution, there’s the chance a large portion of a file’s pieces might be stored on the same storage node, putting it at risk for data loss. [IP filtering](https://storj.io/blog/2019/06/ip-filtering-keeps-data-distributed/) ensures that data stored on the Tardigrade network is truly distributed. Even if a single storage node operator is running 10 nodes in a single location, those nodes would not receive multiple pieces per file when it is uploaded to the network.

**Performance improvements:** We’ve also made several performance improvements, geared towards developers looking to store and retrieve data on Tardigrade.

If you haven’t yet, [join our waitlist](https://tardigrade.io/waitlist/). We’re in the middle of welcoming partners and developers to start building on the V3 network and invites are going out on a first-come, first-served basis. Early waitlist members will also be given increased incentives for joining the network—1 TB of storage capacity and 500 GB of bandwidth, instead of the regular 25 GB of capacity and bandwidth available at launch.

Thanks for your continued support. We appreciate every community member. Every member is supporting the future of cloud storage and making it a reality. Stay tuned for our Pioneer announcement in a few weeks!

