---
description: >-
  When it's important that your data and metadata are encrypted, but you require
  a simple and more compatible development approach, Storj DCS provides a
  best-in-class integration.
---

# Design Decision: Server-side Encryption

Strong encryption is critical to decentralized projects especially where a significant part of the infrastructure is run by independent third-party providers. Encryption is especially important with data storage to deliver security + privacy and ensure developers are in control of their data.

It's also important to enable the broadest range of use cases for object storage, and some of those use cases rely on server-side encryption for privacy and security.&#x20;

{% hint style="warning" %}
The Storj DCS hosted S3-compatible gateway service uses server-side encryption, following the industry standard practices for managing access credentials.&#x20;
{% endhint %}

When you generate a set of S3-compatible Gateway credentials from an Access Grant, your Access Grant is encrypted using your Access Key. That means that you are passing your decryption information to the Storj-hosted authservice running within GatewayMT. All data and metadata are still encrypted, and that encryption is compatible with the rest of the Storj encryption ecosystem.

That means even though your data is encrypted via the hosted gateway, client applications using Uplink CLI, libuplink library, a variety of developer tools including FileZilla and Rclone, and the self-hosted GatewayST can be used to interact with your data using an Access Grant with the same encryption passphrase.&#x20;

Whether you create an Access Grant in the Satellite Admin Console, or you use one of the uplink clients, you, and only you have access to your encryption key. Within the Storj DCS encryption ecosystem, all of the tools are interoperable and encryption is easily managed between tools.

In terms of interoperability, the Storj DCS S3-compatible gateway is also compatible with Amazon's S3 encryption tools, and if you use the Amazon encryption tools, not only will your object data be encrypted, but also the path and metadata as well. One thing to remember is that if you use the Amazon encryption ecosystem, it will only be decryptable in the way you encrypted it, and the Uplink CLI and other tooling won't be able to do it for you.&#x20;

Of course, if end-to-end encryption is important to your use case and you also want the convenience of the hosted gateway service, you can encrypt the data client-side using the encryption mechanism of your choice. In the near future, we plan to release an SDK to extend the Storj DCS encryption ecosystem to include end-to-end encryption with the hosted GatewayMT.&#x20;
