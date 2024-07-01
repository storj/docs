---
author:
  name: Brandon Iglesias
date: '2018-07-24 00:00:00'
heroimage: ''
layout: blog
metadata:
  description: We hope you are staying cool during these hot summer months, here at
    Storj we are just starting to heat up! We have continued to make great progress
    towards V3 and want to keep you in the loop on the latest updates.Recent development
    accomplishments:We created a wrapper around the object store in...
  title: Product Manager Development Update 3
title: Product Manager Development Update 3

---

We hope you are staying cool during these hot summer months, here at Storj we are just starting to heat up! We have continued to make great progress towards V3 and want to keep you in the loop on the latest updates.

Recent development accomplishments:

* We created a wrapper around the object store interface for the Minio gateway so that if you want to use Minio, you have the ability to do CRUD operations.
* We added configuration handling to the heavy client. This allows you to set your ports, file destination, options for services, and keys.
* We combined the network state, reputation system, and DHT cache into a single service to make it easier to run. For piece storage, we created a start/ stop method which handles creating a database and starting all the services for you.
* We added “errcheck” linting to the V3 repo via Travis (the bot) to ensure we do not overlook any reported error in our code.
* We increased our overall test coverage in the V3 repo.
* We added gRPC for DHT node to node communication.
* We added a bunch of sections to the white paper. It is taking shape and will be shared with the community as soon as possible.

In our next update, we plan to share our progress on these projects:

* Creating a simple command line tool (CLT) for starting an S3 gateway and CRUD capabilities.
* Creating a developer tool to run a mini-network on your development computer for easier testing.
* Adding support for buckets in the pointer database so that you can organize your data into however many buckets you please.
* Implementing our bandwidth allocation protocol, which will be used to keep track of how much bandwidth farmers have used so that they can be paid for it. The protocol is nearly complete we are just adding some finishing touches.
* Increasing the test coverage in our code base.

If you want to know what else we have been working on, take a look at our previous [development update](https://storj.io/blog/2018/07/prod.-mgr-development-update-2/) or visit our [GitHub](https://github.com/storj/storj) repository. If you have questions, feel free to reach out by emailing [ask@storj.io](mailto:ask@storj.io) or through our [community forum](https://community.storj.io/).

- *Brandon Iglesias, Product Manager*

