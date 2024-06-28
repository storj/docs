---
author:
  name: Brandon Iglesias
date: '2019-05-02 00:00:00'
layout: blog
metadata:
  description: The Beacon release is within our sights! We are hitting our stride
    and continue to be listed as one of the top Ethereum projects by developer activity!
    The Beacon release will enable clients to share objects with others, and we have
    a hand full of features we need to implement to make that happen...
  heroimage: /blog/development-update-22-from-storj-labs/8855fa2f80969623.png
  title: Development Update 22 from Storj Labs
title: Development Update 22 from Storj Labs

---

The Beacon release is within our sights! We are hitting our stride and continue to be listed as one of the [top Ethereum projects by developer activity](https://media.consensys.net/the-20-blockchain-projects-with-the-most-dev-activity-on-github-april-2019-b7449cc876a6)! The Beacon release will enable clients to share objects with others, and we have a hand full of features we need to implement to make that happen. We are now sending invitations for the Vanguard release so, if you want to get access to store data on the network, make sure to sign up on the [waitlist](https://storj.io/sign-up/). 

#### Recent development accomplishments:

* Completed improvements to the data repair system. Thus far, the system has been functioning properly. We will continue to monitor it and make improvements as time goes on.
* We enhanced the user experience and fixed some bugs in our Satellite web interface based off of user feedback sessions while onboarding clients.
* We started designing some of the components we need to build for our next couple of releases (Beacon and Pioneer).
* We updated the Uplink CLI to use the libuplink library in order to remove the requirement of having to create an identity. This greatly enhances the user experience for clients storing data on the network.
* After extensive research, we determined none of us were good at making a decent cappuccino so we have been outsourcing it to a local coffee shop. It just so happens they use a double shot of espresso, which has really boosted our velocity the last couple weeks.

#### In our next post, we plan to share updates on:

* Finishing one last refactor called metainfo index, which will help us implement some of our future components more easily.
* Adding Macaroon validation logic to the Satellite, and the command on the Uplink CLI, so that clients can begin to share files. We have a great blog post coming out on Macaroons in the next few days. Stay tuned.
* Continuing to work on C-bindings for the libuplink library.
* Enabling the creation of invoices for clients based on storage space and egress used in a month.
* Adding a wizard to our S3 gateway binary so that it can easily be configured by clients storing data on the network.
* Investigating areas in our code base where we can improve performance.

#### For more information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development update](https://storj.io/blog/2019/04/development-update-21-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [support@storj.io](mailto:support@storj.io) or through our [community forum](https://community.storj.io/).
