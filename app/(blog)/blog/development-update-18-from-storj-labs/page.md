---
author:
  name: Brandon Iglesias
date: '2019-03-06 00:00:00'
heroimage: ./8855fa2f80969623.png
layout: blog
metadata:
  description: "We are one month into our Explorer release and that means it\u2019\
    s time for our first round of V3 storage node operator (SNO) payments! We will\
    \ soon be releasing payments for the month of February and will send communication\
    \ directly to the SNOs when they have been completed. If you are a V3 SNO and\
    \ ..."
  title: Development Update 18 from Storj Labs
title: Development Update 18 from Storj Labs

---

We are one month into our Explorer release and that means it’s time for our first round of V3 storage node operator (SNO) payments! We will soon be releasing payments for the month of February and will send communication directly to the SNOs when they have been completed. 

If you are a V3 SNO and have encountered a bug, or have a suggestion on how we can improve the platform, please share your thoughts in our [ideas portal](https://ideas.storj.io/). Please be aware some of the changes we are making to the storage node software are backward incompatible and will require you to update. Be on the lookout for emails about required updates as we continue to improve the stability and reliability of the storage node software for our SNOs! 

Aside from SNO payments, we are full steam ahead on the Vanguard release (the alpha for clients and developers uploading data to the network). The Vanguard release will be gated just like the Explorer release and we will be publishing details on how that process will work in the coming weeks. 

**Recent development accomplishments:**

* We made many user experience enhancements to the Satellite web app, which is where users who would like to store data on the network will go to register for an account on a Satellite. This web app will launch in conjunction with the Vanguard release.
* We enhanced the storage node software to keep all bandwidth allocation agreements for 90 days. This will allow SNOs to cross-reference, check their payments, and resend the agreements if needed.
* We added the ability to calculate the amount of storage space, bandwidth, and objects a client is using per bucket. During the Vanguard release, we will not be charging clients uploading data to the network, within certain limits. However, we will generate invoices for our clients based on this information so that they can see how much they would have been charged for the services utilized by the network during the billing period.
* We added file uploads with TTLs (time to live) so that files can be automatically deleted after the specified time period, if a TTL is utilized.

**In our next post, we plan to share updates on:**

* Wrapping up the invoicing work so that we can generate invoices for clients.
* The first iteration of Libuplink for our V3 library in golang! This will allow partners and clients to integrate with our services programmatically.
* Writing tests and fixing bugs for our data repair system. This is how we ensure files don't get lost on the network because of node churn and other factors.
* Prepping for the Vanguard release, there are a few minor things we must do to prepare for the gated release.
* Fixing bugs to enhance our user experience.

If you want to know what else we have been working on, please take a look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development update](https://storj.io/blog/2019/02/development-update-17-from-storj-labs/). If you want to dig into the code or contribute to the project, visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

