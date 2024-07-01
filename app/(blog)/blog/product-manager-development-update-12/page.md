---
author:
  name: Brandon Iglesias
date: '2018-11-29 00:00:00'
layout: blog
metadata:
  description: Instead of spending the week shopping for online holiday deals,  we
    have been busy making huge amounts of progress on the V3 network. Our next major
    milestone is the Explorer release, which will allow storage nodes to start joining
    the V3 alpha network. Most of our efforts have been focused aroun...
  heroimage: ./8855fa2f80969623.png
  title: Product Manager Development Update 12
title: Product Manager Development Update 12

---

Instead of spending the week shopping for online holiday deals, we have been busy making huge amounts of progress on the V3 network. Our next major milestone is the Explorer release, which will allow storage nodes to start joining the V3 alpha network. Most of our efforts have been focused around building out features related to this. 

**Recent development accomplishments:**

* We added the ability for storage nodes to advertise a wallet and email address over Kademlia. This information will be used to pay storage node operators for the bandwidth and storage capacity they provide on the network.
* We enabled the overlay, which allows Satellites to talk to nodes that bootstrap onto the network. Before this, those nodes were manually hardcoded on the Satellite.
* We made a lot of progress on how we will be calculating storage node payments for V3. More details on this will be shared in the coming weeks.
* We built a few of the web app screens that clients will be using to sign up for accounts on a Satellite.
* We added better Windows configuration directory support.
* We fixed some bugs and general UX issues.

**In our next post, we plan to share updates on:**

* The great database merger. Currently, on the Satellite, we have a number of different databases which will be combined to improve performance and make it easier for others to also run a Satellite on the network.
* The implementation of how we calculate storage node payments.
* The Satellite web application for users.
* Integrating the auditor with the data repair checker. This will provide confidence that we have enough pieces of a file to maintain its integrity, and that those pieces are valid.

If you want to know what else we have been working on, please take a look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and [development update](https://storj.io/blog/2018/11/product-manager-development-update-11/). If you want to dig into the code visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

