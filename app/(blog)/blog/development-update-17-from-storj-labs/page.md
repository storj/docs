---
author:
  name: Brandon Iglesias
date: '2019-02-20 00:00:00'
layout: blog
metadata:
  description: We are a couple of weeks into our Explorer release and the network
    continues to grow every day! If you haven't received an invitation to become a
    V3 storage node operator, and you joined the waitlist, please be patient. We currently
    have about 10,000 people on the list. With so many new storage n...
  heroimage: /blog/development-update-17-from-storj-labs/8855fa2f80969623.png
  title: Development Update 17 from Storj Labs
title: Development Update 17 from Storj Labs

---

We are a couple of weeks into our Explorer release and the network continues to grow every day! If you haven't received an invitation to become a V3 storage node operator, and you joined the [waitlist](https://storj.io/sign-up-farmer), please be patient. We currently have about 10,000 people on the list. 

With so many new storage nodes joining the network over the last few weeks, we’ve been able to identify lots of bugs and UX improvements we can make. If you are a V3 storage node operator and have encountered a bug, or have a suggestion on how we can improve the platform, please share your thoughts in our [ideas portal](https://ideas.storj.io/).

**Recent development accomplishments:**

* We added support for Satellite database migrations so that we can upgrade our Satellite while remaining backwards compatible.
* We added support for storage node database migrations so storage node operators can update their nodes without issues.
* We added some extra tests around our roll-up service, which is what we use to calculate how much each storage node should be paid. This will ensure that storage node payouts are completely accurate ahead of our first V3 payout in about 10 days.
* We made many enhancements to our Satellite GUI to increase the user experience.

**In our next post, we plan to share updates on:**

* Adding the ability to calculate the amount of storage space, bandwidth, and objects a client is using per bucket so that we can invoice them accurately.
* Further enhancements to the Satellite GUI for the Vanguard release.
* Enhancing our Irreparabledb and adding the ability to track how many files Satellites are storing so that we can calculate file durability.
* How much progress we have made on switching away from elliptic curve P256 to a more secure solution.
* Fixing a bunch of bugs to enhance our user experience.
* Adding the ability to upload files with a TTL (time to live) so that those files are automatically deleted by the storage nodes after they expire.

If you want to know what else we have been working on, please take a look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development update](https://storj.io/blog/2019/02/product-manager-development-update-16/). If you want to dig into the code or contribute to the project, visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

