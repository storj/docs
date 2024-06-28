---
author:
  name: Brandon Iglesias
date: '2018-06-27 00:00:00'
layout: blog
metadata:
  description: Since our town hall earlier this month, our engineering team has made
    significant progress towards building V3 of the Storj network. To continue our
    goal of transparency, we will provide regular development updates to keep the
    community apprised of our progress and the milestones we meet. You can...
  heroimage: ''
  title: Product Manager Development Update 1
title: Product Manager Development Update 1

---

Since our [town hall earlier this month](https://storj.io/blog/2018/06/quarterly-update-storj-town-hall-3/), our engineering team has made significant progress towards building V3 of the Storj network. To continue our goal of transparency, we will provide regular development updates to keep the community apprised of our progress and the milestones we meet. [You can also follow our GitHub](https://github.com/Storj), where we regularly commit updates to our repositories. 

**Recent development accomplishments:**

* Our engineering team has created a way to track a file’s TTL (time-to-live). This enables us to execute certain tasks, like automatically deleting files from the network when their TTL expires. This differs from the current network, which did not utilize TTL-style semantics and simply deleted files automatically every 90 days. The old approach was more in-line with other decentralized storage providers, however this new approach is better suited for users who are used to file management in traditional cloud environments.
* We added gRPC for storage operations to storage nodes. This is how different nodes (both heavy clients and farmers) across the network communicate with one another and exchange various information, including portions of files.
* Our team also automated the deployment of the heavy client when code is successfully merged to master branch for internal staging tests.
* We continued our work on the V3 white paper, including creating a collection of technical diagrams that will be incorporated for reference.
* Our continuous integration tool (Travis), is now measuring our test coverage so that we can ensure it does not fall below a certain threshold. This reduces the chances of introducing bugs into the code.

In case you missed it, we announced another milestone a few weeks ago. We successfully completed [a streaming test on the V3 decentralized cloud storage network](https://twitter.com/storjproject/status/1004831655738134528) where we uploaded and streamed a buffered HD video off of a series of nodes. This would allow companies to utilize the Storj network to stream video files directly from the cloud to their users, similar to commonly used cloud video platforms like YouTube and Vimeo. This is a vast improvement over other video streaming approaches, where a large portion of the file must be downloaded to begin streaming, the video can only be streamed to the machine where it was uploaded from, or the video can only be streamed to other users participating in the decentralized storage network.

**In our next update, we plan to share our progress on these projects:**

* Creating TLS-based identity signing, which enables nodes to cryptographically verify one another
* Building a 'Transport Client' which will abstract away details about finding and contacting a storage node by ID
* Incorporating pagination support for file listing, so it will have the ability to return partial results
* Continuing work on the heavy client to combine the network state, reputation and DHT cache into a single process
* Designing and creating additional technical diagrams that will be incorporated into the V3 white paper

We are very excited about the functionality we were able to build into the platform during the last several weeks. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/). 

- *Brandon Iglesias, Product Manager*

