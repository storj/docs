---
author:
  name: Brandon Iglesias
date: '2019-03-21 00:00:00'
layout: blog
metadata:
  description: "It\u2019s the second day of spring, but here at Storj Labs we are\
    \ getting ready for the hottest summer we've ever had! Our team is on fire and\
    \ making great progress on our release roadmap. The Vanguard release is next,\
    \ so be on the lookout for more information about it. If you would like to participat..."
  heroimage: ./8855fa2f80969623.png
  title: Development Update 19 from Storj Labs
title: Development Update 19 from Storj Labs

---

It’s the second day of spring, but here at Storj Labs we are getting ready for the hottest summer we've ever had! Our team is on fire and making great progress on our release roadmap. The Vanguard release is next, so be on the lookout for more information about it. If you would like to participate in the Vanguard release, please sign up on our [waitlist](https://storj.io/sign-up/) to receive an invitation when we launch.

If you are a V3 SNO, please make sure to update your storage node; we pushed a backward incompatible change to production on March 20 that requires everyone to update. If you encounter a bug or have a suggestion on how we can improve the platform, please share your thoughts in our [ideas portal](https://ideas.storj.io/).

#### Recent development accomplishments:

* We made some major architectural changes to a few of the components in our system which fixed a handful of bugs. This change was necessary to create a simple RPC service which will standardize the Satellites’ behaviors with the rest of the system.
* We fixed a bug with our identity tool to prevent users from accidentally using their auth tokens but not being able to write the signature to the directory.
* We enhanced the storage node piece upload process so uplinks are now hashing the data and sending the hash to the storage node. This ensures the storage node cannot be cheated because the storage node will know the hash of the data and will recreate the hash to make sure it's storing the right data.
* We made changes to the Satellite GUI to improve the user experience and functionality.

#### In our next post, we plan to share updates on:

* Enhancements to the Libuplink library for clients to start utilizing it in order to interact with the network programmatically.
* Enhancements to the Satellite account creation flow to improve the user experience when clients create accounts during the Vanguard release.
* Adding usage reports to the Satellite GUI so that clients can see how much usage they have on the network.
* Wrapping up the invoicing work so that we can generate invoices for clients.
* Prepping for the Vanguard release, there are a few minor things we must do to prepare for the gated release.

#### For more information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development update](https://storj.io/blog/2019/03/development-update-18-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).
