---
author:
  name: Brandon Iglesias
date: '2019-04-04 00:00:00'
layout: blog
metadata:
  description: Hey Storjlings! Next week we will hold our quarterly town hall for
    Q1 of this year. Make sure to register for the event to reserve your spot! We
    are eager to share a synopsis of what we have accomplished this year and an overview
    of our 2019 plans. Our team has been burning the midnight oil to fi...
  heroimage: /blog/development-update-20-from-storj-labs/8855fa2f80969623.png
  title: Development Update 20 from Storj Labs
title: Development Update 20 from Storj Labs

---

Hey Storjlings! Next week we will hold our quarterly town hall for Q1 of this year. Make sure to [register for the event to reserve your spot](https://zoom.us/webinar/register/WN_WbG7BYRFSzqZ8OE8_uhuWw)! We are eager to share a synopsis of what we have accomplished this year and an overview of our 2019 plans. Our team has been burning the midnight oil to finish the last bit of functionality needed for the Vanguard release. If you want early access to start storing your data on the network, make sure to sign up on the [waitlist](https://storj.io/sign-up/).

For V3 storage node operators, payments for the month of March went out on April 1-2. Also, please make sure to update your storage node; we pushed a backward incompatible change to production on Tuesday, April 2 that requires everyone to update. If you encounter a bug, or have a suggestion on how we can improve the platform, please share your thoughts in our [ideas portal](https://ideas.storj.io/).

#### Recent development accomplishments:

* We added the ability to limit disk space and bandwidth (egress) usage for users who create an account on our Satellite during the Vanguard release. We want to make sure the network is not overloaded and grows at a sustainable pace. The limit during Vanguard will be 25 GB of disk space and 25 GB of egress per month, however we expect those amounts will slowly increase over time.
* We enhanced the storage node dashboard to show egress and ingress bandwidth usage separately.
* We made a large batch of updates to the Satellite console in preparation for the Vanguard release. This is where users will create accounts and view information about their projects.
* We fixed a bug that was auditing storage nodes on expired segments. As part of this fix, those segments will now be deleted from the Satellite’s database.

#### In our next post, we plan to share updates on:

* Final improvements to the Libuplink library. You will have the ability to interact with the network programmatically via this library.
* Final enhancements to the Satellite console before the Vanguard release, such as copy edits and final branding (logos, colors, icons, typography).
* Adding required versioning to our software so that storage nodes do not start unless they are running a specific version of our software. This is necessary because we are pushing backward incompatible changes to production during the alpha releases. The node selection process that occurs when a client wants to upload data to the network will also take this into account.
* Performance improvements for uploading, downloading, and streaming data. Our goal is to achieve network speeds faster than Amazon S3 at launch.

#### For More Information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development update](https://storj.io/blog/2019/03/development-update-19-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).
* [Register for the next town hall](https://zoom.us/webinar/register/WN_WbG7BYRFSzqZ8OE8_uhuWw).
