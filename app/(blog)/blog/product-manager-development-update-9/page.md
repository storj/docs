---
author:
  name: Brandon Iglesias
date: '2018-10-19 00:00:00'
layout: blog
metadata:
  description: Hey Storjlings! We have been working on some major components for the
    V3 network and wanted to share a quick update. Our new white paper has also been
    sent out to a number of external people for peer review. Once we gather and incorporate
    their feedback, the next step is public release, so stay t...
  heroimage: ./8855fa2f80969623.png
  title: Product Manager Development Update 9
title: Product Manager Development Update 9

---

Hey Storjlings! We have been working on some major components for the V3 network and wanted to share a quick update. Our new white paper has also been sent out to a number of external people for peer review. Once we gather and incorporate their feedback, the next step is public release, so stay tuned! 

Recent development accomplishments:

* We finished the initial implementation of Kademlia! Kademlia is the DHT (distributed hash table) we use to find out about other nodes on the network.
* We added the ability for storage node operators to set bandwidth usage limits.
* We added functionality to audit Storage Nodes. Auditing is used to determine if the Storage Nodes still have the data they should, and that the data has not been modified.
* We are now encrypting the metadata that is generated for each object which is stored on the Satellite.
* We also finished adding Satellite-signed proofs which allow Storage Nodes to verify that commands are coming from the Satellite who is responsible for the data.
* We bought another fridge and stacked them to create a super fridge cluster. The cluster is capable of storing cold brew coffee and exponentially more creamer. We expect this to increase our productivity levels by 37.5 percent!
* We fixed an issue where we were handling windows paths incorrectly.

In our next update, we plan to share updates on:

* Polishing and fixing bugs on our Kademlia implementation.
* Testing our Audit and Data Repair components and how they are functioning together.
* Adding some extra functionality to our Kademlia implementation.
* Adding the ability to create an account on a Satellite. With this account, the user will be able to obtain API keys and create projects.
* Enhancing the node selection process the Satellite uses to choose what nodes get data.
* How the V3 white paper is progressing: the paper is out for early review with a select few external reviewers. After we incorporate the feedback we will release it!
* Working on our bandwidth measuring protocol so that we are able to pay storage nodes for the amount of bandwidth they use.
* Roll out the initial implementation for data repair, this component is going to repair pieces of files on storage nodes that fail audits. Once we release our V3 whitepaper, you will be able to learn more about how the auditing and data repair systems work together.

If you want to know what else we have been working on, take a look at our [previous development update](https://storj.io/blog/2018/10/product-manager-development-update-8/) or visit our GitHub repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum.](https://community.storj.io/)

