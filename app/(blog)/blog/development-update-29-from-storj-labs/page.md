---
author:
  name: Brandon Iglesias
date: '2019-09-12 00:00:00'
layout: blog
metadata:
  description: "Hello Storjlings!\_As the summer comes to an end, we've been working\
    \ hard on functionality for our next release, Pioneer 2. Pioneer 2 will contain\
    \ all of the functionality we need to launch our production service, so it\u2019\
    s a major milestone. Our town hall this quarter will be held on Wednesday, Sep..."
  heroimage: ./8855fa2f80969623.png
  title: Development Update 29 from Storj Labs
title: Development Update 29 from Storj Labs

---

Hello Storjlings! As the summer comes to an end, we've been working hard on functionality for our next release, Pioneer 2. Pioneer 2 will contain all of the functionality we need to launch our production service, so it’s a major milestone. Our town hall this quarter will be held [on Wednesday, September 25th](https://zoom.us/webinar/register/WN_i_e4wM3JQheAuWzBw_pIVg) to give a company-wide update and share some exciting news, so please tune in. 

#### Recent Development Accomplishments:

* We finished implementing the initial version of the SNO Dashboard, it will be released soon, so be on the lookout for an announcement.
* We enhanced our data repair process to utilize hashes. This improvement will validate whether the pieces are correct so we can download fewer pieces from SNOs when performing repairs on the network.
* We created another auditor on the Satellite that more evenly audits storage nodes, instead of auditing them based on how much data they have. This is going to ensure nodes are vetted in a timely manner when they join the network.
* We made some enhancements on the Satellite user interface to improve our users' experiences.

#### In Our Next Post, We’ll Cover:

* Finishing our Windows installer and auto-updater so we can start onboarding SNOs who are running Windows Home.
* Finishing the removal of our Kademlia implementation, since it’s no longer needed on our network for node discovery. You can read more about this on our [forum](https://forum.storj.io/t/design-draft-removing-kademlia/1038).
* Start work on implementing graceful exit for storage nodes. This will allow SNOs to leave the network without losing their withholdings. You can read more about this on our [forum](https://forum.storj.io/t/design-draft-storage-node-graceful-exit/480/8).
* Relacing [gRPC](https://grpc.io/) with dRPC, which is our own implementation of an RPC to enhance the performance throughout the network.
* Adding the ability to accept STORJ on the V3 network so our users have the ability to pay for their usage with STORJ token. With the addition of this payment method, we’re also moving the billing information to the user account level to make a better user experience.

#### For More Information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/08/development-update-28-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).

TL/DR: 

We’re working on our Pioneer 2 epics, the last bits of functionality we’ll be implementing before launching production.

