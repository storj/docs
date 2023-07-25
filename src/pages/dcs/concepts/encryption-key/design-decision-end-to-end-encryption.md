---
title: Design Decision - End-to-end Encryption
createdAt: 2022-05-19T22:27:23.000Z
updatedAt: 2023-07-24T21:51:16.262Z
docId: Pksf8d0TCLY2tBgXeT18d
redirects:
  - /dcs/concepts/encryption-key/design-decision-end-to-end-encryption
pageTitle: 'Design Decision: End-to-end Encryption'
---

When the privacy and security of your application data are mission critical,  Storj DCS provides options to ensure only you have access to your data.

Strong encryption is critical to decentralized projects especially where a significant part of the infrastructure is run by independent third-party providers. Encryption is especially important with data storage to deliver security + privacy and ensure developers are in control of their data.

End-to-end encryption means that only you have access to your data and the associated metadata. If end-to-end encryption is essential to your use case, Storj DCS provides the Uplink CLI, libuplink library, a variety of developer tools including FileZilla and Rclone, and the self-hosted GatewayST that allow you to ensure data and metadata are encrypted before they ever reach any service operated by Storj or any other third party.

Whether you create an Access Grant in the Satellite Admin Console, or you use one of the uplink clients, you, and only you have access to your encryption key. Within the Storj DCS encryption ecosystem, all of the tools are interoperable and encryption is easily managed between tools.

