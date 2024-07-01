---
author:
  name: Brandon Iglesias
date: '2020-01-10 00:00:00'
layout: blog
metadata:
  description: Happy New Year from everyone here at Storj Labs! We are so excited
    for 2020 we could cry and scream at the same time. Our focus during the holiday
    season was finishing the final bits of functionality needed on the network ahead
    of the Tardigrade production launch. Our team has been onboarding our...
  heroimage: ./8855fa2f80969623.png
  title: Development Update 34 from Storj Labs
title: Development Update 34 from Storj Labs

---

Happy New Year from everyone here at Storj Labs! We are so excited for 2020 we could cry and scream at the same time. Our focus during the holiday season was finishing the final bits of functionality needed on the network ahead of the Tardigrade production launch. Our team has been onboarding our first paying customers and we’re just a few weeks away from production launch, our next development update will be the most exciting one yet!

#### Development Accomplishments:

* We completed and enabled graceful exit for Storage Nodes who are 6 months or older. You can read more about this on our [forum](https://forum.storj.io/t/graceful-exit-guide/3618).
* We finished and enabled garbage collection for Storage Nodes so that the garbage that is left by unreceived delete requests gets deleted off of Storage Nodes.
* We finished the zombie segment cleaner and are running it once a week so that objects that are inaccessible to users are automatically deleted from storage nodes by the Satellite.
* We finished adding support for STORJ token payments so that clients utilizing the Tardigrade network have the option to pay for their invoices in STORJ. Making a STORJ token deposit will result in a 10% bonus to users' accounts.
* We finished implementing the trusted Satellite functionality for Storage Nodes so that operators can easily choose to trust more Satellites by editing their nodes. More documentation on this will be published in the near future.

#### In Our Next Post, We'll Cover:

* Finishing the improvements to our delete architecture so that the delete operations on the network are more efficient for both users and Storage Node Operators.
* Adding support for CockroachDB for the Satellite so that it can be scaled horizontally.
* Final polishing and bug fixes to the Satellite console user experience in preparations for production launch.
* Bug fixes and "bake-offs." At Storj Labs we sometimes pretend to be restaurant critics like Gordon Ramsay but instead of critiquing restaurants we critique our network for its user experience and try to find bugs.
* Progress update on finishing all old the egg nog we bought for the holiday season in our Atlanta and Salt Lake City office, including Dan's homemade stuff, [ala Alton Brown](https://www.youtube.com/watch?v=RsIUU1WQnck).

#### For More Information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/12/development-update-33-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing ask@storj.io or through our [community forum](https://forum.storj.io).
