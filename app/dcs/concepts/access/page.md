---
title: Access Management
docId: bNywu7-9KLjYfk5LBQABx
redirects:
  - /dcs/concepts/access
---

Distributed and decentralized cloud storage is a fantastic way to take advantage of underutilized storage and bandwidth, but in order to provide highly available and durable cloud storage, we needed to build in some fairly sophisticated security and privacy controls.&#x20;

Since we had to build with the assumption that any Peer Class besides the Uplink could be run by an untrusted person, we had to implement a zero-knowledge security architecture. This turns out to not only make our system far more resistant to attacks than traditional architectures but also brings significant benefits to developers building apps on Storj DCS.

## Access Management Paradigm

The access management paradigm for Storj DCS is based on a set of security and privacy principles that are incorporated at the code level either as a necessary component of the decentralized architecture or as a feature to enable developers to build more secure and private applications.

1.  Data and metadata stored on Storj DCS is encrypted and the Satellite never has access to encryption keys

2.  Authorization management should be delegated to the edge, but provide easy-to-use tools for granular levels of access control

3.  Identity and Access Management for users of applications that store data on Storj DCS should be handled by those applications

These security and privacy principles are ultimately manifested in Storj DCS as a set of tools developers can use for access management, providing granular control over how data is accessed and shared within their applications, on top of a decentralized, distributed system.

Access management on Storj DCS requires coordination of two parallel constructs:

- **Authorization** - a determination of whether a particular request to perform an action on a resource is valid. Authorization management is implemented using hierarchically deterministic API Keys based on [macaroons](https://research.google/pubs/pub41892/).

- **Encryption** - Data and metadata stored on Storj DCS are encrypted using hierarchically deterministic Encryption Keys. Objects are encrypted with a randomized encryption key that is salted with a predetermined salt. Paths and randomized encryption keys are encrypted with a passphrase using AES 256 GCM or Secretbox.

Both of these constructs work together to provide an access management framework that is secure and private, as well as extremely flexible for application developers.

To make the implementation of these constructs as easy as possible for developers to use, the Storj DCS developer tools abstract the complexity of encoding objects for access management and encryption/decryption.

{% callout type="info"  %}
Understanding how **Authorization** and **Encryption** work together is critical to designing an appropriate access management flow for an application
{% /callout %}

## Combining Authorization and encryption Management: Access Grants

Storj DCS uses hierarchically deterministic Access Grants as an access management layer for objects. An Access Grant is a security envelope that contains a satellite address, a restricted API Key, and a restricted path-based encryption key—everything an application needs to locate an object on the network, access that object, and decrypt it. The key benefit of this approach is that these Access Grants and any associated restrictions can be entirely managed client-side, without a central Access Control List or other server-side mechanism involved in the access management process. We call this delegated authorization.

Read more about [](docId:XKib9SzjtEXTXWvdyYWX6).&#x20;
