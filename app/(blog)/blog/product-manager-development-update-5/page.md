---
author:
  name: Brandon Iglesias
date: '2018-08-21 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: "We are just one week away from the Linux Foundation\u2019s Open Source\
    \ Summit where Ben Golub and Shawn Wilkinson will be giving a keynote! They will\
    \ make some major announcements on stage so our team has been focusing on finishing\
    \ everything they need. The V3 network has made tremendous progress sinc..."
  title: Product Manager Development Update 5
title: Product Manager Development Update 5

---

We are just one week away from the [Linux Foundation’s Open Source Summit where Ben Golub and Shawn Wilkinson will be giving a keynote](https://ossna18.sched.com/event/FADk)! They will make some major announcements on stage so our team has been focusing on finishing everything they need. The V3 network has made tremendous progress since our last development update. Here is what we have been working on:

Recent development accomplishments:

* We added bucket support in V3 so you can now create and organize your data in buckets! This puts us one step closer to full AWS S3 compatibility.
* We created a simple CLI (command line interface tool) with basic commands, like create buckets and upload/download objects. For a full list of available commands see our [readme in GitHub](https://github.com/storj/storj/blob/master/README.md).
* We added secure node ID generation which is a proof of work defense against [sybil attacks](https://en.wikipedia.org/wiki/Sybil_attack) on the network.
* We finished the bandwidth accounting protocol framework. This protocol will be used to keep track of how much bandwidth is used for payments.
* Bugs, bugs, and more bugs! We squashed about a dozen bugs since our last development update. This really makes the v3 network feel polished.
* Fixed the office fridge to prevent it from staying open and spoiling our coffee creamer. This will help us stay properly caffeinated to continue development on V3.
* Improved error messages and the overall user experience.

In our next update, we plan to share updates on:

* How the Open Source Summit conference went and a recap of the announcements we made.
* Improvements to the CLI tool.
* Enhancements to the pointer DB so that it only tracks pieces that are still valid.
* Improving the user experience and fixing bugs.

If you want to know what else we have been working on, take a look at our previous [development update](https://storj.io/blog/2018/08/prod.-mgr-development-update-4/) or visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](http://ask@storj.io) or through our [community forum](https://community.storj.io/).

- Brandon Iglesias, Product Manager

