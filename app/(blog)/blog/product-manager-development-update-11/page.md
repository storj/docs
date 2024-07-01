---
author:
  name: Brandon Iglesias
date: '2018-11-19 00:00:00'
layout: blog
metadata:
  description: Hey Storjlings! Now that we are in the Sputnik release (public alpha
    for developers), and our white paper has been published, we would love for the
    community to start contributing to the project. We have opened a number of GitHub
    issues for open source developers within the community to tackle, i...
  heroimage: ./8855fa2f80969623.png
  title: Product Manager Development Update 11
title: Product Manager Development Update 11

---

Hey Storjlings! Now that we are in the Sputnik release (public alpha for developers), and our white paper has been published, we would love for the community to start contributing to the project. We have [opened a number of GitHub issues](https://github.com/storj/storj/issues) for open source developers within the community to tackle, if they would like to get involved.

**Recent development accomplishments:**

* We added an API endpoint on the Satellite so that storage node operators have a place they can send their bandwidth agreements. The network uses these bandwidth agreements to calculate how much a storage node should be paid.
* We enhanced how many pieces are downloaded when a file is requested from the network to reduce our bandwidth costs and increase performance.
* We created a collection of inspection tools throughout different components within the system to help us debug problems in the future.
* We held a couple of milk frothing training sessions to maximize creaminess within our beverages. Coincidently, the oat milk shortage is starting to affect us in Atlanta so we have rolled back to using cow milk for our lattes.
* We fixed several bugs and made some general UX/UI enhancements.

**In our next post, we plan to share updates on:**

* Refining how we calculate storage node payments. The component we are building to do this will take into account how much data the storage node has stored, how long it has been storing the data, and how much bandwidth is used.
* Satellite account user registration build out. This is how a user who wants to store data would get API credentials to interact with the Storj network.
* We have finished the Kademlia implementation and are planning on enabling the overlay cache, which keeps track of all the nodes on the network.
* Integrating the auditor with the data repair checker. This will provide confidence that we have enough pieces of a file to maintain its integrity, and that those pieces are valid.
* Standardizing node IDs across the code base.

If you want to know what else we have been working on, please take a look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and our [previous development update](https://storj.io/blog/2018/11/product-manager-development-update-10/). If you want to dig into the code, visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

