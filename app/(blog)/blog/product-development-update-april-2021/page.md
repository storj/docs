---
author:
  name: Brandon Iglesias
date: '2021-04-01 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: Read all about the latest features our engineering team has been working
    on.
  title: Product Development Update - April 2021
title: Product Development Update - April 2021

---

Hello Everyone!

To say we’ve been a bit quiet on sending out product updates lately is an understatement. We’ve been hard at work implementing feedback given by our community— and our community keeps becoming more geographically diverse by the day. Below we’ve listed a few bullet points covering what we’ve been working on and implementing—but the coolest updates are yet to come. One of the more ambitious projects lately has been to run our Satellite components on actual Satellites.

We believe the melding of software and hardware will have an amazing trajectory, but only time and testing will tell. We can’t reveal all of our cards yet, but the extraterrestrial work has attracted an entirely new category of users. We’re not fully able to reveal the nature and extent of the partnership until the United States government declassifies the remaining documents as they are required to do within 180 days under the recent COVID-19 relief legislation. Until then, we hope the below updates will appease.

### Recent product feature updates:

* The meta info project we’ve been referencing for the past year is finally complete. Our migrations happened earlier this month during our scheduled Satellite maintenance downtimes. This work paved the way for new customer-facing features such as multipart upload and server-side copy/ rename.
* We implemented support for zkSync for monthly Node Operator payouts. Node Operators can now opt in to receiving payouts via zkSync transactions, which is super exciting if you’re asking us. If you want to learn more about zkSync transactions or how to configure your Node for zkSync, visit our [Node Operator documentation](https://documentation.storj.io/dependencies/storage-node-operator-payout-information/zk-sync-opt-in-for-snos).
* All Satellites have been fully migrated to CockroachDB, meaning they are now multi-region—YAY!
* The Linux Installer is currently in community release (tech preview) for final testing! If you want to learn more, please read [this forum post](https://forum.storj.io/t/tech-preview-linux-installer/12380) for details.
* We’ve added a crash reporting service to the Node Software. This will allow us to debug issues with the Node Softwareton to ensure Node Operators aren’t penalized for any software bugs.
* We’ve also added the ability for Satellites to track observed Node downtime. Node downtime has a direct effect on many aspects of the system, including repair and object durability.

### Our next updates:

* We’re making some major changes to our customer onboarding experience in the Satellite GUI based on community feedback from our beta test program.
* Continuing to build the global network of distributed  Gateway MT’s. This has been the number one customer-requested feature and makes it incredibly easy to switch from any centralized cloud storage provider to Storj decentralized cloud storage.
* Adding support for a new Reed Solomon scheme to our Satellites. This will reduce the redundancy we store per file and most likely increase our performance (fingers crossed).
* Adding a new payout overview page to the Multi-Node dashboard so Node Operators can easily get payout information for all of their Nodes in one view.
* Exposing more metrics about the network in a way our community can use this data however they would like.

We have a lot of new exciting news we can’t wait to share soon, so please stay tuned for our next product update!

### For More Information:

* Dive into our code or contribute by visiting our [GitHub repository](https://github.com/storj/storj)
* Reach out to us by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io)

Thanks,

The Storj Product Team

‍

