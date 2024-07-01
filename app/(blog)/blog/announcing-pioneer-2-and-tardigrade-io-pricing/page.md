---
author:
  name: JT Olio And Brandon Iglesias
date: '2019-11-19 00:00:00'
layout: blog
metadata:
  description: "Cloud storage prices haven\u2019t changed much in the past 5 years.\
    \ They\u2019re about to! Today, we\u2019re pleased to announce pricing for our\
    \ Tardigrade Decentralized Cloud Storage Service. Since our founding, our goal\
    \ has been to achieve pricing that is half the price of centralized cloud storage\
    \ providers,..."
  heroimage: ./050b4597b2f44ed5.png
  title: Announcing Pioneer 2 and Tardigrade.io Pricing
title: Announcing Pioneer 2 and Tardigrade.io Pricing

---

Cloud storage prices haven’t changed much in the past 5 years. They’re about to! Today, we’re pleased to announce pricing for our Tardigrade Decentralized Cloud Storage Service. Since our founding, our goal has been to achieve pricing that is half the price of centralized cloud storage providers, or less. And, to do so in a way that is economically sustainable for us, for storage node providers, and for our network of partners. Here is Tardigrade pricing: 

* **Static storage** is charged at $10 per terabyte per month, or $.01 per gigabyte. Storage is calculated in “terabyte months,” which is a prorated calculation of how much storage is used throughout the month, broken down by hour. Storing one terabyte for 30 days, two terabytes of data for 15 days, or three terabytes for 10 days, would each be the equivalent of one terabyte month.
* **Download bandwidth** is charged at $45 per terabyte, or $.045 per gigabyte, of bandwidth consumed. Storj does not charge for upload bandwidth, so uploading files to the network doesn’t incur any cost. Download bandwidth measures the transfer of data from a Storage Node Operator (or Host) to an Uplink. We’re also offering discounts if you decide to leave the network, so customers don’t feel locked in. That’s how confident we are that you will love Tardigrade.

Since our rebuild, we’ve aimed to make our list prices one-half of the legacy providers. At these prices, we are officially less than half of the average price starting list price of the large, centralized cloud providers for static storage (we are $10 per terabyte versus their $22 per terabyte) and bandwidth (we are $45 per terabyte versus their $99 per terabyte). And just like them, Tardigrade also offers discounts based on bulk pricing. Tardigrade also comes with added features that cost extra with current legacy offerings, like encryption and multi-zone redundancy.

We’re really excited to see what our customers can achieve with affordable, private, secure, decentralized cloud storage.

This pricing news accompanies our Beta 2 (Pioneer 2) release, which will be followed closely by our production release in January 2020. [Check out our updated roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1). 

With this announcement, we’ll be accelerating invites to our waitlist of 14,000 developers. If you’re on the waitlist, keep an eye out for your invitation to join the network. If you’re not on the waitlist, [sign up](https://tardigrade.io/waitlist/) to secure your 1 terabyte of free storage and 1 terabyte of bandwidth for a month. Anyone who signs up between now and our production launch will be eligible for this offer. 

Our Beta 2 release delivers enhanced performance across all of the metrics we track for our service level agreements, including availability, durability, and performance. Here’s how each of these metrics has improved: 

* **Availability:** This measures the system’s ability to download a file on the first attempt. Over the past month, the Tardigrade platform surpassed our target metric of 99.95% and achieved 99.96% availability. For production launch, we’re targeting 99.995% availability. For the last 21 days, the service has achieved 100% availability.
* **Durability:** Since launching the platform into Alpha (our Vanguard v0.1.0 release) in April 2019, Tardigrade has never lost any of the approximately 2 million files stored on the network. While the service has been operating at 100% durability, we feel we can currently make a statistically significant claim of 99.9999% (six 9s) durability, meaning that the chance of losing a single file (one in a million) is far less than your chances of being struck by lightning this year. For production, we’re targeting 99.9999999% (9 9s) durability. Our goal is to give our developers a service level agreement of 11 9s of durability, however, we will need to maintain the current level of 100% durability for several million more files for at least one year to be able to officially make that claim.
* **Performance:** Tardigrade upload and download performance is on par with, or superior to, major centralized cloud storage providers like Amazon S3. At production launch, Tardigrade will deliver performance that is faster and much more consistent than legacy providers. The great thing about Tardigrade’s performance is consistency; if you’re downloading 100 files, a user would experience less than a half-second difference between the fastest and slowest download, versus several seconds compared to centralized cloud storage providers. This is due to the platform’s decentralized architecture.

These are the three main metrics we’re tracking for our service level agreements. For each milestone along our road to production, we have a series of 16 “gates” we use to ensure that the desired performance levels are being achieved. Having features is simply not enough. Other gates we track include total number of vetted storage nodes, which is currently at about 3,000; number of active Tardigrade users; Node churn, which is currently at 1.5% per month; total capacity, which is now between 4.3 petabytes and 7 petabytes, already higher than our 6 petabytes for production launch; and several other metrics like “chaos monkey” tests, on-time payments, and security and software audits. For more info on these gates, check out our [other blog post](https://storj.io/blog/2019/11/measuring-production-readiness-using-qualification-gates) that went live today that goes into detail on each of these metrics. 

As mentioned, reaching production is more than just delivering code. We need to ensure that data is accessible, secure, and protected. We also need to ensure that we have enough capacity to meet demand, given we can’t just spin up some more server racks if demand exceeds supply. To do these things, we need everybody’s help—especially yours. 

If you’re a developer, join the waitlist and actually try out the platform! You can use our S3 gateway to start using us with existing S3 compatible applications with only a few clicks. [We have a native library with several popular bindings (Go, Python, Swift, Android, .Net, Node.js)](https://documentation.tardigrade.io/api-reference/libraries) for those who want to take advantage of some of our advanced features, such as [macaroons](https://storj.io/blog/2019/05/flexible-file-sharing-with-macaroons/). And, if you’re into IPFS, you can also upload files through our [IPFS gateway](https://storjipfs.com/). If you’re not a developer, you can still benefit by setting up a storage node. If you already have a storage node set up, you can request another token for a second storage node by visiting our [sign-up page](https://storj.io/sign-up-node-operator/) or you can tell your friends and invite them to set up a storage node. [Storj now supports Windows](https://storj.io/blog/2019/10/storage-nodes-are-now-supported-on-windows-home/) (with an installer wizard) in addition to Linux, so setting up a node is easier than ever.  

Thanks for being a valued member of our community. We hope you’re excited to see our production release as we are! Watch for it in a few weeks.

