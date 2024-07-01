---
author:
  name: Brandon Iglesias
date: '2018-10-04 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: Development Update 8 from Storj LabsHey Storjlings! We hope everyone
    had a great summer. Even though summer has come to an end, the Storj team is still
    running HOT and making tons of progress on the V3 network. Below is a quick update
    from our engineering team.Recent development accomplishments:W...
  title: Product Manager Development Update 8
title: Product Manager Development Update 8

---

Development Update 8 from Storj Labs

Hey Storjlings! We hope everyone had a great summer. Even though summer has come to an end, the Storj team is still running HOT and making tons of progress on the V3 network. Below is a quick update from our engineering team.

Recent development accomplishments:

* We added client-side encryption for uploads. This means when a file is being uploaded to the network, it is encrypted before it ever leaves the user's computer.
* We fixed the pointer DB to only keep track of uploads that were successful.
* We created a POC for multipart uploads on the V3 network.
* We added the ability for storage node operators to set storage capacity limits.
* We enhanced the overall user experience and fixed some bugs our OSS partners found.

In our next update, we plan to share updates on:

* Adding a few more finishing touches to our initial Kademlia implementation.
* Continuing work on our satellite audit component, which checks storage nodes to see if they hold the pieces of the files they should.
* Finishing up satellite-signed proofs, which allow storage nodes to verify that commands have been approved by the satellite.
* Continuing work on the data repair component. This component is responsible for regenerating pieces of segments from storage nodes that have gone offline and uploading them to new storage nodes. We have also been working on the component that determines when a file is in need of repair.
* How the V3 white paper is progressing: we are making final edits to the content, formatting and creating illustrations.

If you want to know what else we have been working on, take a look at our [previous development update](https://storj.io/blog/2018/09/product-manager-development-update-7/) or visit our [GitHub repository](https://github.com/storj/storj). If you have questions, feel free to reach out by emailing ask@storj.io or through our [community forum](https://community.storj.io/).

- Brandon Iglesias, Product Manager

