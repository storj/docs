---
author:
  name: Brandon Iglesias
date: '2018-11-02 00:00:00'
layout: blog
metadata:
  description: "Hey Storjlings! If you haven't heard yet, we\u2019ve released the\
    \ Storj V3 white paper! We hope that the white paper will bring more clarity about\
    \ what we are building and how it works.  Most of our time has been dedicated\
    \ to writing and publishing the white paper during the last several weeks, but\
    \ he..."
  heroimage: /blog/product-manager-development-update-10/8855fa2f80969623.png
  title: Product Manager Development Update 10
title: Product Manager Development Update 10

---

Hey Storjlings! If you haven't heard yet, we’ve released the [Storj V3 white paper](https://storj.io/white-paper)! We hope that the white paper will bring more clarity about what we are building and how it works. Most of our time has been dedicated to writing and publishing the white paper during the last several weeks, but here are a few additional things we were able to accomplish: 

Recent development accomplishments:

* We finished the initial implementation of the data repair component. This component is responsible for re-creating pieces of files on the network so that file durability is maintained.
* We enhanced how we handle a cancel upload command via the AWS CLI so that the pieces that had previously been uploaded to the nodes get deleted.
* We added the ability for the Uplink to retrieve bandwidth allocation checks from the Satellite before interacting with the storage nodes. If an Uplink tries to interact with a storage node without a bandwidth allocation check, the node rejects the Uplink's commands because it's not guaranteed to get paid.
* We created a read-only FUSE (Filesystem in Userspace) bindings for the Storj Network.

In our next update, we plan to share updates on:

* Initial work on the component that is going to be responsible for calculating how much ($) we owe the storage nodes. This will be taking into account how much data the storage node has stored, how long it has been storing the data, and how much bandwidth it used.
* Work on our bandwidth measuring protocol that will enable us to pay storage nodes for the amount of bandwidth they use.
* Enhancing the node selection process the Satellite uses to choose which nodes get data and how much data they get.
* Adding the ability to create an account on a Satellite. With an account, the user will be able to obtain API keys to interact with the Storj network.

If you want to know what else we have been working on, take a look at our [previous development update](https://storj.io/blog/2018/10/product-manager-development-update-9/) or visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

