---
author:
  name: Brandon Iglesias
date: '2019-11-01 00:00:00'
layout: blog
metadata:
  description: "Hello Storjlings! It's finally feeling like winter, but our team is\
    \ only heating up as we get closer to our Pioneer 2 and Voyager launches. Over\
    \ the past couple of weeks, we\u2019ve been focused on finishing the final remaining\
    \ items before our Pioneer 2 release. Pioneer 2 is a major milestone because..."
  heroimage: /blog/development-update-31-from-storj-labs/8855fa2f80969623.png
  title: Development Update 31 from Storj Labs
title: Development Update 31 from Storj Labs

---

Hello Storjlings! It's finally feeling like winter, but our team is only heating up as we get closer to our Pioneer 2 and Voyager launches. Over the past couple of weeks, we’ve been focused on finishing the final remaining items before our Pioneer 2 release. Pioneer 2 is a major milestone because it means we’re code complete for Voyager launch. We’re also going to be measuring the network’s performance, retrievability, availability, and durability to ensure we can meet our SLAs.

#### Development Accomplishments:

* We enhanced our uploads so they aren’t time-based anymore. This means you’re able to upload files to the network with an extremely slow internet connection.
* We enhanced our [Java library](https://storj.github.io/android-libuplink/javadoc/latest) so that our developer community can use all of the features we have on the network.
* Since the weather has finally changed to winter at our Atlanta office, we’ve switched over to spiked hot chocolate (the spike is a double shot of espresso to keep us focused)!
* We’ve finished the initial implementation of graceful exit but we’re leaving it disabled for more in-depth testing.
* Finished our credit card and token payment flows as well as moved billing to the account level. Until we announce official pricing for our Tardigrade Cloud Storage Service in the coming weeks, invoices on user accounts will be listed at zero dollars.
* Breaking the Satellites apart into multiple services so that we can withstand [chaos monkey](https://github.com/Netflix/chaosmonkey) events.

#### In Our Next Post, We'll Cover:

* Squashing bugs and making sure we have test coverage for edge cases on our network.
* Testing the graceful exit functionality for Storage Node Operators to ensure we don’t have any issues when we roll it out.
* Building a trash feature in our garbage collection process so nodes don't immediately delete pieces—instead, they will hold them for a short time to ensure garbage collection is working correctly.
* Working on Horizontal database scaling for the Satellite Database and pointer database, both which run on the Satellite.
* Improving our delete functionality on the network for clients who want to delete files they have been storing.

#### For More Information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/10/development-update-30-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing ask@storj.io or through our [community forum](https://forum.storj.io).
