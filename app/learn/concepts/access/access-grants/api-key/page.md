---
title: API Key
docId: XOtletuYWGeA2Om86yvwA
redirects:
  - /dcs/concepts/access/access-grants/api-key
metadata:
  title: Understanding API Keys and Access Management
  description:
    Discussion on API Keys in Storj, including their construction, access
    management at different levels, and sharing access to objects securely.
---

API Keys are based on Macaroons and include the capability to encode programmatic access restrictions into the API Key.

The API Key encoded into an Access Grants is based on a type of token called a Macaroon. A Macaroon is essentially a cookie with an internal structure for encoding logic, in this case, access restrictions. A Macaroon embeds the logic for the access it allows and can be restricted, simply by embedding the path restrictions and any additional restrictions within the string that represents the Macaroon. Unlike a typical cookie, a Macaroon is not a random string of bytes, but rather is an envelope with access logic encoded in it.

{% callout type="info"  %}
Storj DCS make it easy to share access to objects securely and privately. You don't need to know how to construct an API Key, but understanding how they work and what the capabilities are provide you with a better understanding of the tools Storj DCS provides you to build more private and secure applications.
{% /callout %}

## About API Keys

For a more complete review of Macaroons, please check out [the Google paper](https://ai.google/research/pubs/pub41892). This documentation will provide enough information to effectively use the access management and object sharing functionality of Storj DCS, but is not intended to be an exhaustive explanation on the full functionality of Macaroons.

Although this documentation uses the terms “API Key” and “Macaroon” interchangeably, only the term “Access Grant” is referenced on the service, through the libraries, and in the documentation. The API Key is embedded inside of an Access Grant, and is not something you need to manage separately.

## Access Management Starts at the Project Level

Each Project has a Root API Key Secret that is issued by the Satellite. This Root API Key Secret is used to create other API Keys. Since all Access Grants are derived from the same Root API Key Secret, they all have the same level of access. By default, all API Keys have complete, unrestricted access to perform all functions against all objects within a project.

## Access Encoding by Uplink Client

When an Uplink Client (LibUplink, Uplink CLI, or Uplink S3 Gateway) is configured to use an Access Grant, the Uplink Client automatically creates an HMAC signature that is encoded in the metadata of the object stored. As objects and their path metadata are created, the hierarchy is encoded in the object metadata. Based on where an object falls in the hierarchy, If the parent Access Grant is known, a restricted Access Grant can be derived for any level of the hierarchy that is valid from that point in the hierarchy and below to any child objects below it in the hierarchy.

## Sharing Access to Objects

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MwdavJ1Uhw29KTR0n6XhZ_image.png)

When the Access Grant is created by the Uplink Client, that Access Grant can be passed to a peer (another Uplink Client). When that peer Uplink Client uses that Access Grant to access an object, it passes only the API Key to the appropriate Satellite to request access to the object (never the encryption key). The Satellite can determine the validity of the API Key passed to it (along with any Caveats as described below) without needing access to the actual metadata. Since the metadata is also encrypted client-side, this is extremely important.&#x20;

{% callout type="info"  %}
Effectively, the Satellite does not need to know which user or application is attempting an object or what the object is; The Uplink Client provides only the minimum information that allows the Satellite to determine the validity of the request without knowing anything about the requestor or the object being requested.&#x20;
{% /callout %}

## Encoding Restrictions in an Access Grant

It is also possible to restrict an Access Grant to provide a limited level of access to an object. Access restrictions are accomplished through the use of Caveats. Caveats are conditional access restrictions that are encoded into the body of an API Key.

An API Key has three parts, a head, a list of caveats, and a tail. These are concatenated and serialized together. An unrestricted API Key has no caveats, so it’s just a head and a tail. The head is a random nonce, and the tail of the unrestricted API Key is the HMAC of the root secret and the head.

The next section will detail the specific restrictions on the bucket and object constructs.
