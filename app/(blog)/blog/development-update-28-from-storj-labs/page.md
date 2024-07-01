---
author:
  name: Brandon Iglesias
date: '2019-08-30 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: "Hello Storjlings,\_If you haven't heard, Pioneer 1 is a go! We launched\
    \ our first beta release last week while we were at Open Source Summit in San\
    \ Diego. Open Source Summit has a special place in our hard drives because we\
    \ love being a part of the incredibly talented, and diverse open source comm..."
  title: Development Update 28 from Storj Labs
title: Development Update 28 from Storj Labs

---

Hello Storjlings, 

If you haven't heard, Pioneer 1 is a go! We launched our first beta release last week while we were at Open Source Summit in San Diego. Open Source Summit has a special place in our hard drives because we love being a part of the incredibly talented, and diverse open source community. Here are some of the major items we have been working on over the last month.

#### Recent development accomplishments:

* We enhanced the storage nodes to automatically delete expired or rejected orders to save space on their disks.
* We enhanced the performance on Satellites by grouping some database calls into single transactions. We expect this will substantially reduce the load on the Satellite databases.
* We finished a few design docs for features we’re going to be working on in the near future. If you want to learn more about those please visit our [forum](https://forum.storj.io/c/engineer-amas/design-draft) where we openly discuss them.
* We refactored some parts of the Satellite user GUI to be more performant and simpler in order to help us implement future features.
* We began the implementation of another storage node auditing feature so we can ensure nodes are behaving correctly and our user's data is readily available. This auditing feature is going to audit nodes more consistently across the network, regardless of how much data each node is storing.

#### What we’re focused on next:

* [Removing our Kademlia network](https://storj.io/blog/2019/08/so-youre-a-storage-node-operator.-which-satellites-do-you-trust/) since it is no longer needed.
* Finishing the new auditing feature that will audit nodes consistently across the network regardless of how much data each node is storing.
* Creating a storage node windows installer and auto-updater so we can support more SNOs who run Windows.
* Replacing GRPC with our own solution to increase the performance across the network and on each operation.

#### For more information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/08/development-update-27-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).
