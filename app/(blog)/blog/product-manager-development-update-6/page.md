---
author:
  name: Brandon Iglesias
date: '2018-09-05 00:00:00'
layout: blog
metadata:
  description: "Hey everyone, we hope you were able to watch Ben Golub and Shawn Wilkinson\u2019\
    s keynote presentation at The Linux Foundation's Open Source Summit last week.\
    \ At the conference, we announced our new Open Source Partner Program! Through\
    \ this program, open-source projects can generate revenue when their..."
  heroimage: ./8855fa2f80969623.png
  title: Product Manager Development Update 6
title: Product Manager Development Update 6

---

Hey everyone, we hope you were able to watch [Ben Golub and Shawn Wilkinson’s keynote presentation](https://www.youtube.com/watch?v=rNpaaqFX6tQ&feature=youtu.be) at The Linux Foundation's Open Source Summit last week. At the conference, we announced our new [Open Source Partner Program](https://storj.io/blog/2018/08/enabling-economic-empowerment-for-open-source-companies-via-the-storj-network/)! Through this program, open-source projects can generate revenue when their users store data on the Storj network. We are beyond excited about this program because it will financially empower our 10 new open-source partners to continue to make products we all love and use. 

Most of the work we have done in the last month was focused on getting V3 ready for the [private alpha](https://storj.io/blog/2018/08/storj-launches-v3-private-alpha/) (which launched last week as well) and our partner program.

Recent development accomplishments:

* We added TLS for all gRPC connections.
* We renamed components in our codebase to follow our V3 theme:
* *Uplink*: is the piece of software a user would run if they want to utilize the network to interact with it and upload/download data.
* *Storage Node*: is the piece of software that Uplinks communicate with to store and retrieve data.
* *Satellite*: is responsible for orchestrating the connections between uplinks and storage nodes so that files can be uploaded/ downloaded on the network efficiently.
* We increased performance in regards to command response times so there is almost no lag between a user entering a command and getting feedback.
* We fixed a bunch of bugs to improve the overall user experience in V3.

In our next update, we plan to share updates on:

* Continuing to fix bugs and improve the overall user experience in V3.
* Working with our partners to identify areas where V3 can be improved.
* Increasing upload/download speeds on the V3 network.
* Improvements to the Storj V3 CLI tool.
* Improving our bandwidth allocation protocol by pipelining the messages, which will increase performance.

If you want to know what else we have been working on, take a look at our [previous development update](https://storj.io/blog/2018/08/prod.-mgr-development-update-5/) or visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](http://ask@storj.io) or through our [community forum](https://community.storj.io/).

- Brandon Iglesias, Product Manager

