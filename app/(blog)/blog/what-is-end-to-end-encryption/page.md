---
author:
  name: Bill Thorp
date: '2021-04-06 00:00:00'
layout: blog
metadata:
  description: We care deeply about security and privacy, so it's no surprise that
    the official Storj "uplink" client has always supported end-to-end encryption
    (E2E). Learn what end-to-end encryption means to us.
  heroimage: ./7d93123c73021515.jpeg
  title: What is End-to-End Encryption?
title: What is End-to-End Encryption?

---

We care deeply about security and privacy, so it's no surprise that the official Storj "uplink" client has always supported end-to-end encryption (E2E). Before we delve deeper into the details, let's define end-to-end encryption:

Most end-to-end encryption descriptions say it's a system of communication where only the communicating users can read the messages. Messages or data are protected from potential eavesdroppers, including telecom providers, internet providers, and even the provider of the communication service. Only users, who have the needed cryptographic keys, can decrypt the conversation.

In the case of Storj, the "conversation" consists of objects (often files) being saved and retrieved from the network. With the uplink client, objects are end-to-end encrypted. We even encrypt the "path" used to store the object on the network. Before uploading an object to Storj, a user must create an encryption key that encodes and decodes the object's contents. This key exists only on the user's device, and thus only the owner of the key can access the information. This means Storj is incapable of accessing the contents of your encrypted objects or even reading the "path" used to store the file. This same security protects users from internet marketers, government surveillance, and network hackers.

Like all keys, this encryption key must be kept secure to truly secure the information it protects. This is where end-to-end encryption becomes more nuanced. Let's take the analogy of sharing physical house keys. If you're sharing with someone you really trust, you'd likely give them a copy of your key. Leasing out a room? You'd probably use a different lock and key in that case. Want to Airbnb a room? You might want someone to manage those keys for you.

In our analogy, it's clear that there are some instances when you want a more flexible E2E story. At Storj, we offer an optional service called Link Sharing, which allows you to share objects by sharing a URL. These URLs embed information allowing someone to access one object. When someone uses this URL to download your objects, Storj briefly has the ability to access those objects. Back to our key analogy, it's wise to use different encryption keys for objects you plan to share versus those you want to protect. Storj makes this easy to do, ensuring that only the objects you intend to share are accessible by others.

Another optional service with more flexible E2E encryption is our S3 compatible multi-tenant gateway. At Storj, we require files to be encrypted before they're stored on our network. While a few of Amazon's S3 libraries offer end-to-end encryption, not all do. Critically, the official command-line tools most developers use do not offer this option. To enable this for our S3 compatible gateway, the multi-tenant gateway service stores an encryption key to ensure full S3 compatibility. In future updates, we plan to add full E2E encryption with the S3 compatible gateway.

Security versus accessibility has always been a fine balance and end-to-end encryption has always been the default at Storj. When using a service that necessitates more accessibility, your files are still protected during transit with security standards such as TLS. At Storj, we continue to strive toward the most secure and private services while also supporting our customers' needs.

‍

