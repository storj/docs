---
author:
  name: Brandon Iglesias
date: '2019-11-14 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: "Hello Storjlings!\_We hope you are staying warm now that winter has\
    \ arrived. We were ranked #2 on Consensys Top 20 blockchain - Developer Activity\
    \ for October. Our team has been laser-focused and its showing as we finish features\
    \ for our Pioneer 2 release. The network is more stable, performant, a..."
  title: Development Update 32 from Storj Labs
title: Development Update 32 from Storj Labs

---

Hello Storjlings! We hope you are staying warm now that winter has arrived. We were ranked #2 on [Consensys Top 20 blockchain - Developer Activity for October](https://consensys.net/blog/blockchain-development/the-top-20-dapps-for-developer-activity-october-2019/). Our team has been laser-focused and its showing as we finish features for our Pioneer 2 release. The network is more stable, performant, and user-friendly than ever before. We’re still looking for more Nodes to join ahead of our Voyager release, please sign up on the [waitlist](https://storj.io/sign-up-node-operator/) to get an auth token for your node! If you signed up on our developer waitlist, please be patient as we’re still sending out invites. We had over 13,000 developers interested and now with the network stabilizing, we’re increasing invitations every day.

#### Development Accomplishments:

* We’ve made updates to the Satellite console to improve the user experience as well as added support for credit card payments and STORJ token payments.
* We split up all of the major services on the Satellite so they can be scaled independently, as well as allow the Satellite to survive some of these services crashing without bringing down the entire system.
* We’ve finished up testing the graceful exit functionality and will be launching it once we’ve resolved the final bugs.
* Created a few design docs for how to [improve our delete architecture](https://forum.storj.io/t/design-draft-improve-deletion-performance/2583) and how we’re going to [clean up zombie segments](https://forum.storj.io/t/design-draft-zombie-segments-cleaner/2507).

#### In Our Next Post, We'll Cover:

* Adding support for Cockaroch DB on the Satellite so those databases can be scaled horizontally.
* Finishing the trash feature in our garbage collection process so nodes don't immediately delete pieces—instead, they’ll hold them for a short time to ensure garbage collection is working correctly.
* Implementing the zombie segment cleaner so that segments that are inaccessible are automatically deleted.
* Improving our delete architecture so that the delete operations on the network happen faster for our users.
* Fixing bugs and improving the overall stability ahead of our Pioneer 2 and Voyager releases later this year.

#### For More Information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/11/development-update-31-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing ask@storj.io or through our [community forum](https://forum.storj.io).
