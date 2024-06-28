---
author:
  name: Brandon Iglesias
date: '2018-12-27 00:00:00'
layout: blog
metadata:
  description: Happy holidays and happy New Year from the Storj family to yours! We
    are continuing to focus our efforts around the Explorer release, which is scheduled
    to be released in Q1 of 2019. We want to make sure all of our storage node operators
    are pleasantly surprised when they join the V3 network, so ...
  heroimage: /blog/product-manager-development-update-14/8855fa2f80969623.png
  title: Product Manager Development Update 14
title: Product Manager Development Update 14

---

Happy holidays and happy New Year from the Storj family to yours! We are continuing to focus our efforts around the Explorer release, which is scheduled to be released in Q1 of 2019. We want to make sure all of our storage node operators are pleasantly surprised when they join the V3 network, so we have been enhancing the overall user experience quite a bit.

Recent development accomplishments:

* We finished merging the majority of the databases into the master Satellite DB. This merger will make it easier for anyone to run a Satellite in the future.
* We refactored the code that updates the stats for storage nodes to be more efficient. We also started updating storage node uptime stats every time a node is contacted successfully or unsuccessfully for any reason.
* We implemented an identity generation/certificate revocation tool for the Explorer release. The Explorer release is going to be gated, which means we are going to allow storage node operators on the waitlist onto the network first and slowly open it up to anyone after that in stages.
* We fixed about a dozen bugs which will increase the overall user experience for storage node operators joining the network.
* We made a ton of progress on the Satellite user account GUI/backend. This is where customers will go to sign up to store things on the network.
* We experimented a bit with our cappuccinos to get us in the holiday spirit using eggnog instead of cows milk. This increased our productivity for a short time until we had one too many eggnog cappuccinos. (Alert: There is still a shortage of oat milk in the US)

In our next post, we plan to share updates on:

* Our finishing touches ahead of the Explorer release (the public alpha that will open the network to external storage nodes).
* The implementation of how we calculate storage node payments. All we have left to do is make a few API endpoints so that we can query how much we owe a specific storage node operator when we are going to pay them.
* The Satellite web app that clients will use to sign up to store data on the Storj network. This will be deployed in the Vanguard release.

If you want to know what else we have been working on, please take a look at our product roadmap and development update. If you want to dig into the code, visit our GitHub repository. If you have questions, feel free to reach out by emailing ask@storj.io or through our community forum.

