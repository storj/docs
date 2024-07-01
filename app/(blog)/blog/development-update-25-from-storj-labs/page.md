---
author:
  name: Brandon Iglesias
date: '2019-06-28 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: "It has been almost a month since we posted our last development update,\
    \ so strap in, this is a long one. Since our last update, we\u2019ve merged over\
    \ 250 PRs, which equates to about 30,000 lines of code added and 10,000 lines\
    \ deleted. This code is for the functionality we\u2019re building into the network..."
  title: Development Update 25 from Storj Labs
title: Development Update 25 from Storj Labs

---

It has been almost a month since we posted our last development update, so strap in, this is a long one. Since our last update, we’ve merged over 250 PRs, which equates to about 30,000 lines of code added and 10,000 lines deleted. This code is for the functionality we’re building into the network for our Beacon and Pioneer releases. Part of our team has been focused on finishing out the last bits of functionality for Beacon, while the rest of our team has been focused on Pioneer.

![null](./ef6762a0cfb87e44.jpeg)**Recent development accomplishments:**

* We finished the libuplink C library bindings. This means anyone who wants to use V3 as their data storage layer on a C application can integrate easily.
* We added the ability to determine how much storage and egress (value attribution) is referred to the V3 network by our partners for our Open Source Partner Program. We are particularly proud of this because it reinforces our commitment to open source and is one way we’re trying to give back to the open source community we love.
* We finished the macaroon implementation. This means clients are able to share encrypted files stored on the network with others.
* We added [IP filtering](https://storj.io/blog/2019/06/ip-filtering-keeps-data-distributed/) so that one particular storage node doesn’t get an uneven distribution of pieces for a file. With this functionality, node operators will be able to run multiple nodes in the future.
* We finished a new reputation model that is more in line with how we’re disqualifying nodes on the network.
* We made a bunch of performance improvements for uploads and downloads on the network. Our goal is to be faster than S3, so we’ll continue to optimize our code until we can conformability make that claim.
* We finished the Storage Node Containment mode. This gives storage nodes multiple opportunities to respond to an audit request from a Satellite in case they happen to go offline right at the time of the request or something else happened.

**In our next post, we plan to share updates on:**

* Finalizing the functionality for the first iteration of the SNOBoard (Storage Node Operator Dashboard). This functionality includes giving the SNOs information about audit pass/fails, uptime checks, bandwidth/storage usage, and more.
* Creating a garbage collection service so that storage nodes can delete data on their hard drives that they are not being paid for by a Satellite. Garbage data can be created in a number of different ways like nodes not receiving delete messages or uploads being canceled.
* Implementing an antechamber for Kademlia to protect the network against Sybil attacks. If you want to read more about this, check out the [design doc](https://github.com/storj/storj/blob/master/docs/design/kademlia-audit-gating.md).
* Making some enhancements to the Satellite GUI based off of user feedback from clients. These improvements will make the user experience better for everyone.

**For more information:**

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/05/development-update-24-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).
