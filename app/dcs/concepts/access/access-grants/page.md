---
title: Access Grants
docId: XKib9SzjtEXTXWvdyYWX6
redirects:
  - /dcs/concepts/access/access-grants
---

An Access Grant is a bearer token that enables applications to interact with Storj DCS to access objects stored on the service and decrypt them client-side.

An Access Grant is a security envelope that contains a satellite address, a restricted API Key, and a set of one or more restricted prefix-based encryption keys—everything an application needs to locate an object on the network, access that object, and decrypt it.&#x20;

## Simple Developer Tool for Access Management

Access Grants coordinate two parallel constructs—encryption and authorization in a way that makes it easy to share data without having to manage access control lists or use complex encryption tools. Both of these constructs work together to provide a client-side access management framework that’s secure and private, as well as extremely flexible for application developers.

{% callout type="info"  %}
Access Grants are used for access management for client applications using the libuplink library, the CLI, as well as for generating credentials for the S3 compatible gateway (both the hosted GatewayMT and the self-hosted GatewayST).
{% /callout %}

To make the implementation of these constructs as easy as possible for developers, the Storj DCS developer tools abstract the complexity of encoding objects for access management and encryption/decryption. A simple share command encapsulates an encryption key, an [](docId:XOtletuYWGeA2Om86yvwA) ( a bearer token), and the appropriate Satellite address into an encoded string called an Access Grant.&#x20;

Access Grants can be imported easily into an Uplink client, whether it's the CLI, developer library, or a client application. Imported Access Grants are managed client-side and may be leveraged in applications via the uplink client library.

Access Grants can be restricted both from the server side (at the Satellite) and from the client side using the CLI or libuplink library, a serialized, hierarchically derived structure. When creating restricted access grants, both the API Key and the encryption key are hierarchically derived automatically from the parent Access Grant.

Learn how to create an Access Grant using the Satellite Admin Console in the[](docId:nGzxQBhV8nx5Pukj6O0zT).

Learn how to [](docId:OXSINcFRuVMBacPvswwNU) in the[](docId:TbMdOGCAXNWyPpQmH6EOq).&#x20;

{% callout type="warning"  %}
Storj DCS satellites never come in contact with encryption keys. When you use an access grant with the CLI, libuplink library, or the self-hosted Gateway, encryption keys are managed client-side using a serialized, hierarchically derived structure for end-to-end encryption. With the cloud-hosted Gateway-MT, your data is server-side encrypted, since Storj is hosting the gateway.
{% /callout %}
