---
author:
  name: Brandon Iglesias
date: '2019-04-17 00:00:00'
layout: blog
metadata:
  description: Vanguard has launched and we are beyond thrilled to have Uplinks operated
    by community members and partners uploading and downloading data on our network!
    If you want to get access to the Vanguard release, make sure to sign up on the
    waitlist. If you were unable to tune into the Q1 town hall last...
  heroimage: /blog/development-update-21-from-storj-labs/8855fa2f80969623.png
  title: Development Update 21 from Storj Labs
title: Development Update 21 from Storj Labs

---

Vanguard has launched and we are beyond thrilled to have Uplinks operated by community members and partners uploading and downloading data on our network! If you want to get access to the Vanguard release, make sure to sign up on the [waitlist](https://storj.io/sign-up/). If you were unable to tune into the Q1 town hall last week you can still [watch it on YouTube](https://storj.io/blog/2019/04/quarterly-update-storj-town-hall-april-2019/). It has lots of details related to the development of the V3 Storj network. We are now shifting our focus to our next major release, Beacon! The functionality we are adding in this release will allow you to share objects on the network with others.

#### Recent development accomplishments:

* We launched our [Vanguard release](https://storj.io/blog/2019/04/developers-and-v3-network-make-first-contact-with-vanguard-alpha/) and started inviting clients to the network!
* The libuplink Golang library is finished! This is a simple library you can import into your codebase that allows you to interact with the network. If you want more details on the library, take a look at the [godoc](https://godoc.org/storj.io/storj/lib/uplink) or check out this [example](https://github.com/storj/storj/pull/1749/files).
* We made several enhancements to our Satellite web interface, which gave it the polished look, feel, and functionality we wanted. We will continue to iterate and make changes to the web interface to add additional functionality in future releases.
* We updated our storage node documentation with a command that will automatically update your storage node for you when we push a new Docker container to Docker Hub. This is the best way to ensure your storage node stays up to date and your reputation is not affected.

#### In our next post, we plan to share updates on:

* Refactoring improvements to our data repair process to better ensure files are repaired on time and data is not lost.
* Finishing the meta info index refactor. This refactor will make it easier to add new features to the network in the future as well as making the network more performant.
* Creating design docs for a few large chunks of work we have in our next couple of releases, garbage collection, mitigating against Sybil attacks, and encryption key management.
* Finishing the creation of a [Macaroon](https://ai.google/research/pubs/pub41892) library so that we can start implementing object access control/ sharing.
* Performance improvements for uploading, downloading, and streaming data. Our goal is to achieve network speeds faster than Amazon S3 at launch.

#### For More Information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development update](https://storj.io/blog/2019/04/development-update-20-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).
