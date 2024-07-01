---
author:
  name: Brandon Iglesias
date: '2019-08-01 00:00:00'
layout: blog
metadata:
  description: "We\u2019re already approaching the end of summer, but things are still\
    \ heating up here at Storj Labs! We\u2019ve been on fire adding the final features\
    \ and improvements ahead of our Pioneer 1 beta launch in the next few weeks, and\
    \ iced coffee and nitro cold brew are the only two things keeping us cool.Rece..."
  heroimage: ./8855fa2f80969623.png
  title: Development Update 27 from Storj Labs
title: Development Update 27 from Storj Labs

---

We’re already approaching the end of summer, but things are still heating up here at Storj Labs! We’ve been on fire adding the final features and improvements ahead of our Pioneer 1 beta launch in the next few weeks, and iced coffee and nitro cold brew are the only two things keeping us cool.

#### Recent development accomplishments:

* We finished implementing the garbage collection feature but have disabled it on storage nodes for the time being until our testing efforts finish and we are confident that there are no bugs.
* We finished the majority of the functionality for the SNOBoard, our storage node operator dashboard. We’re just adding a couple of final features before we release it for use! The SNOBoard will give storage node operators lots of insights on how their nodes are performing.
* We made a bunch of performance improvements on the storage node and Satellite databases.
* We made various enhancements to the Satellite user interface based off of feedback from developers we interviewed.
* Enhanced the logging on the Satellite, Uplink, and storage nodes so that we can detect and resolve problems more quickly.

#### In our next post, we’ll cover:

* More storage node database optimizations. We want to make sure storage node operators don't have to worry about their storage node having any kind of performance issues.
* Performance improvements on the Uplink so that our download speed is at least as fast as, or faster than, Amazon S3.
* Adding the ability for the Satellite to verify file pieces that storage nodes are storing with their public certificates.
* Working on creating design docs for the features we’re planning on implementing as a part of our Pioneer 2 release. The docs will be posted and discussed between our team and community in the [forum](https://forum.storj.io/c/engineer-amas/design-draft). Please check them out and let us know what you think.

#### For more information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/07/development-update-26-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://forum.storj.io).
