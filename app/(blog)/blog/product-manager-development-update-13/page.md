---
author:
  name: Brandon Iglesias
date: '2018-12-14 00:00:00'
layout: blog
metadata:
  description: "All I want for Christmas is a\u2026 decentralized object storage network,\
    \ and that's not something you can find on Amazon so we are working hard to make\
    \ that happen! Our next major milestone is the Explorer release, which is scheduled\
    \ to be released in Q1 of 2019, so we have shifted our focus around e..."
  heroimage: ./8855fa2f80969623.png
  title: Product Manager Development Update 13
title: Product Manager Development Update 13

---

All I want for Christmas is a… decentralized object storage network, and that's not something you can find on Amazon so we are working hard to make that happen! Our next major milestone is the [Explorer release](https://storj.io/blog/2018/11/upcoming-milestone-releases-on-the-storj-v3-roadmap/), which is scheduled to be released in Q1 of 2019, so we have shifted our focus around everything we need to hit that deadline, polishing our current functionality and squashing bugs.

**Recent development accomplishments:**

* We started implementing the storage space and bandwidth limits for storage nodes so that if a storage node receives a request that puts them over the limit, that request would be rejected.
* We created a pointerDB diagnostic and inspection tool to help us debug the pointerDB and ensure everything functions properly.
* We enhanced the node selection process to enable us to filter for storage nodes that meet certain criteria. This enables us to select storage nodes that will give us the durability we desire.
* We added the ability to track irreparable or missing pieces of a file. This will be used in the future when we create a service that tries to repair those files for an extended period of time.
* We merged a few databases into the master Satellite DB. This merger will make it easier for anyone to run a Satellite in the future.
* We enhanced the data repair checker to take into account if nodes are holding bad data from the auditing results. This helps ensure we not only have enough pieces to recover a file but that those pieces are valid. If they are not valid, the Satellite will repair the file sooner.

**In our next post, we plan to share updates on:**

* Our finishing touches ahead of the Explorer release (the public alpha that will open the network to external storage nodes).
* The Satellite web app that clients will use to sign up to store data on the Storj network. This will be deployed in the Vanguard release.
* The implementation of how we calculate storage node payments.
* Finishing the great database merger to make it easier for anyone to run a Satellite.

If you want to know what else we have been working on, please take a look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and [development update](https://storj.io/blog/2018/11/product-manager-development-update-12). If you want to dig into the code, visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

