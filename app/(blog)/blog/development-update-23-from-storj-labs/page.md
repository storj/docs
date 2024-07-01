---
author:
  name: Brandon Iglesias
date: '2019-05-16 00:00:00'
layout: blog
metadata:
  description: "We have been drinking lots of espresso and working hard to finish\
    \ the functionality needed for our next release, bacon\u2026 I mean Beacon. The\
    \ functionality in this release will allow clients to share encrypted files via\
    \ a cool technique called macaroons. As part of the Vanguard release, we are still..."
  heroimage: ./8855fa2f80969623.png
  title: Development Update 23 from Storj Labs
title: Development Update 23 from Storj Labs

---

We have been drinking lots of espresso and working hard to finish the functionality needed for our next release, bacon… I mean Beacon. The functionality in this release will allow clients to share encrypted files via [a cool technique called macaroons](https://ai.google/research/pubs/pub41892). As part of the Vanguard release, we are still sending invitations to developers who joined the waitlist to store data on the V3 network. If you would like early access to store data on the V3 network, please make sure to sign up on our [waitlist](https://storj.io/sign-up/).

#### Recent development accomplishments:

* We added the ability to create macaroons in the Uplink CLI. Macaroons are how clients will be able to share encrypted files stored on the Storj network.
* Finished up design docs for garbage collection, audits, the referral program, and several other features that we will soon begin to build. These documents outline how we will add the functionality into the platform. You can read our proposed solutions [here](https://github.com/storj/storj/tree/master/docs/design) and [here](https://github.com/storj/storj/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aopen+design+doc).
* We improved the [libuplink documentation](https://godoc.org/storj.io/storj/lib/uplink) so that developers can more easily integrate with our go lang library. These updates include some specific examples that outline how to incorporate the library into existing applications.
* We added real-time project limiting so that users will be unable to upload more data than allowed during our alpha stage. Once we are in beta, users will be charged for usage and will be able to upload unlimited amounts of data.
* We made several improvements to our deployment process to help us push changes to production quicker and easier. These include commenting out default config values in the Satellite config, moving release defaults from docker to the codebase, and designing a test that breaks when adding new command line flags so that we can make sure to account for them during deployments.
* We enhanced the gateway setup command to be a wizard, just like our Uplink setup command, to improve the user experience. Neither the gateway or Uplink CLI require an identity now so clients will have few steps and a cleaner user experience.
* We added the ability to resend the new user activation email on the signup flow.
* We fixed several bugs and made some UX enhancements in the Satellite web interface.

#### In our next post, we plan to share updates on:

* Adding the ability to receive macaroons on the Uplink CLI and access the files associated with the shared token.
* Continuing to work on C-bindings for the libuplink library.
* Adding the ability to create invoices for clients on Satellites. The invoices will utilize a client’s usage report to determine how much money they owe that Satellite for the previous billing cycle.
* Starting the storage node containment mode work. Containment mode is for storage nodes that are audited but do not respond to the audit request. You can read more about containment mode in the [V3 white paper section 4.13](https://storj.io/storjv3.pdf).
* Investigating areas in our codebase where we can improve performance.

#### For more information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development update](https://storj.io/blog/2019/05/development-update-22-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).
