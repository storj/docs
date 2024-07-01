---
author:
  name: Brandon Iglesias
date: '2018-07-10 00:00:00'
heroimage: ''
layout: blog
metadata:
  description: Since our last development update, our engineering team has completed
    several key pieces of the V3 platform. Here are some of the highlights; we hope
    you are as excited as we are about this new functionality!Recent development accomplishments:We
    finished adding pagination support to our pointer d...
  title: Product Manager Development Update 2
title: Product Manager Development Update 2

---

Since our last [development update](https://storj.io/blog/2018/06/prod.-mgr-development-update-1/), our engineering team has completed several key pieces of the V3 platform. Here are some of the highlights; we hope you are as excited as we are about this new functionality!

Recent development accomplishments:

* We finished adding pagination support to our pointer database so that the system can return specific results given a starting offset and limit. The pointer database keeps track of node IPs and ports.
* We automated some of our deployment practices. For example, when something is merged to master, we automatically deploy some test farmers to look for bugs. If the merge affects the heavy client, we will automatically rebuild the heavy client Docker image and deploy it to begin generating test coverage.
* We implemented an interface (transport client) that handles all of the gRPC dial out complexities so that establishing connections between nodes is very simple. The transport client would be utilized by our S3 gateway (Minio).
* We added tests in pkg/kademlia.
* We created a few diagrams of some of the services we are building to help explain them in the V3 white paper. The V3 white paper will be published in the near future.
* We set up a CLA bot (Contributor License Agreement) so that in the future, if someone wants to contribute code to the repository, they will automatically be prompted to sign our CLA.

In our next update, we plan to share our progress on these projects:

* Implementing our bandwidth accounting protocol, which will be used to keep track of how much bandwidth farmers have used so that they can be paid for it.
* Creating a stat database to keep track of farmer stats such as uptime, audit success ratios, latency, and data stored.
* Continuing work on our V3 white paper so that is can be published in the near future.
* Increasing the test coverage in our code base.
* Continuing work on the heavy client to combine the network state, reputation and DHT cache into a single process. Along with this effort, we are also adding the ability to update the configs for anyone who wants to run a heavy client in the future.

If you would like to take a look at everything we have been working on please visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

- *Brandon Iglesias, Product Manager*

