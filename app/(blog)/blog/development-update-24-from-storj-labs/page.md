---
author:
  name: Brandon Iglesias
date: '2019-05-31 00:00:00'
layout: blog
metadata:
  description: "Greetings Storjlings, Our team has been making waves with everything\
    \ they have been able to accomplish over the last two weeks. We\u2019re closing\
    \ in on our next major release Beacon, which will give our clients the ability\
    \ to share files with each other, among other things. As part of the Vanguard\
    \ re..."
  heroimage: ./8855fa2f80969623.png
  title: Development Update 24 from Storj Labs
title: Development Update 24 from Storj Labs

---

Greetings Storjlings, 

Our team has been making waves with everything they have been able to accomplish over the last two weeks. We’re closing in on our next major release Beacon, which will give our clients the ability to share files with each other, among other things. 

As part of the Vanguard release, we’re still sending invitations to developers who joined the waitlist to store data on the V3 network. If you would like early access to store data on the V3 network, please make sure to sign up [here](https://storj.io/sign-up/).

#### Recent development accomplishments:

* We’ve added the validation logic for Macaroons onto the Satellite. This addition will allow the Satellite to verify if a Macaroon is valid and if the user should be able to access those files or folders.
* We finished creating Android bindings for the libuplink library so that clients can create mobile applications with our network.
* We added the ability to create invoices for clients on the Satellite. We’ll be publishing more information about our pricing structure in the coming weeks.
* All of the design docs created by the Development team for functionality have been moved to our public [GitHub repository](https://github.com/storj/storj/tree/master/docs/design) so you can learn why and how we implement changes.
* We changed the location of the Uplink’s encryption key. It was previously stored in the config.YAML file but is now located in a file in memory.
* We added IP filtering during the node selection process so that the files on the network are spread out more evenly, making them inherently more durable.
* Squashing bugs left and right.
* We created automated performance benchmark tests to ensure our code doesn’t slow down our upload/download speeds as we add features and functionality.
* We made a handful of UX/UI enhancements to the Satellite web interface.

#### In our next post, we plan to share updates on:

* The build-out of the SNOBoard (Storage Node Operator Dashboard). This is going to be a feature-rich GUI for storage node operators to get more information about their nodes such as audit pass/fails, uptime checks, bandwidth/storage usage, and more.
* Adding the ability to determine value attribution for our Open Source Partners. One of our company goals is to bring economic empowerment to the open source community—we’ll share our revenue with our Open Source Partners based off usage for clients they’ve referred to us. You can read more about this program [here](https://storj.io/partners/).
* Polishing our invoice creation process and adding the ability to accept credit card payments.
* General performance improvements to ensure we’re delivering a best in class experience for our clients.
* Our libuplink C library binding as well as libstorj (V2 library) C bindings to libuplink. We’re going to have as much backward compatibility as possible.

#### For more information:

* Look at our [product roadmap](https://storjlabs.aha.io/published/01ee405b4bd8d14208c5256d70d73a38?page=1) and previous [development updates](https://storj.io/blog/2019/05/development-update-23-from-storj-labs/).
* Dig into the code or contribute to the project by visiting our [GitHub](https://github.com/storj/storj) repository.
* Reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).
