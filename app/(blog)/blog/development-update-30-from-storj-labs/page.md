---
author:
  name: Brandon Iglesias
date: '2019-10-17 00:00:00'
layout: blog
metadata:
  description: "Hello Storjlings,\_It has been just under a month since our last development\
    \ update, so strap in, we've got a lot to share! If you missed our September quarterly\
    \ town hall, don't worry, we recorded it for your viewing pleasure. We also just\
    \ announced a Storj IPFS integration that allows you to upl..."
  heroimage: ./8855fa2f80969623.png
  title: Development Update 30 from Storj Labs
title: Development Update 30 from Storj Labs

---

Hello Storjlings, 

It has been just under a month since our last development update, so strap in, we've got a lot to share! If you missed our September quarterly town hall, don't worry, we recorded it for your [viewing pleasure](https://www.youtube.com/watch?v=uvLsE9OogS8&t=2116s). We also just announced a [Storj IPFS integration](http://storjipfs.com) that allows you to upload files to the Storj network via the IPFS protocol.

If you've been waiting for us to release the native Windows installer, we've got some good news— [your wait is over!](https://storj.io/blog/2019/10/storage-nodes-are-now-supported-on-windows-home/) 

Recently we met some fantastic folks at [DevCon V](https://devcon.org/) Osaka Japan, [Korea Blockchain Week](https://koreablockchainweek.com/) Seoul Korea, and [All Things Open](https://allthingsopen.org/) Raleigh, NC USA. If you stopped by one of our booths, we just want to say thanks for taking the time to chat with us.

#### Development Accomplishments:

* We finished the [Windows installer and auto-updater](https://storj.io/blog/2019/10/storage-nodes-are-now-supported-on-windows-home/). We're currently beta testing the installer with some of our amazing community members and will be launching it soon.
* We finished [removing our Kademlia implementation](https://forum.storj.io/t/design-draft-removing-kademlia/1038), which drastically simplifies our codebase and node communication.
* We made enhancements to the Satellite GUI so that you can manage your projects, invoices, and API keys easier and have more time for an afternoon espresso.
* We enhanced the Storj Node CLI dashboard to include disqualification status.
* We performed extensive testing on our dRPC implementation, which we'll enable soon—this will improve the performance for Node Operators and Uplinks across the network.

#### In Our Next Post, We'll Cover:

* Adding a few more features to our Windows installer and auto-updater to improve the user experience.
* Enhancing our Java library for developers who are integrating their Java applications with our network.
* Finishing up the Storage Node graceful exit functionality so that if a node wants to leave the network, they can do so while still getting their held amount back.
* Building a trash feature in our garbage collection process so nodes don't immediately delete pieces—instead, they will hold them for a short time to ensure garbage collection is working correctly.
* Breaking the Satellites apart into multiple services so that we can withstand [chaos monkey](https://github.com/Netflix/chaosmonkey) events.
* Finishing our Token and credit card payment flow in the Satellite GUI so that clients can pay their invoices easily and quickly.

#### For More Information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/09/development-update-29-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing ask@storj.io or through our [community forum](https://forum.storj.io).
