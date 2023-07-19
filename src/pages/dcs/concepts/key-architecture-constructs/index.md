---
title: Key Architecture Constructs
slug: concepts/key-architecture-constructs
createdAt: 2022-05-19T22:24:55.000Z
updatedAt: 2023-07-19T20:57:27.198Z
docId: M-5oxBinC6J1D-qSNjKYS
---

Developing applications on Storj DCS require a basic familiarity with the  basic constructs of the service.

At a high level, object storage is a well-understood technology with established vendors and standards for integration. Storj DCS brings a number of new capabilities to make it easy for developers to build more secure and private applications and, as with any new and disruptive technology, the key to maximizing the potential value of that technology is understanding how that technology can be practically applied to solve real-world problems.

This section will orient you to some of the main constructs within the service and describes how to use Storj DCS in your application.

## But first, a word on information architecture...&#x20;

It's important to understand the constructs of Storj DCS so that an application storing data is optimized depending on the requirements for privacy, access control, sharing, etc. The main constructs to understand are shown in the figure below:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/9b421M_VoF9n0TBr2Enoh_image.png)

## Satellite

The Satellite is a set of hosted services that is responsible for a range of functions on the network, including the node discovery system, node address information caching,  per-object metadata storage, storage node reputation management, billing data aggregation, storage node payment, data audit, and repair, as well as user account and authorization management.&#x20;

{% callout type="info"  %} 
**Key Point:** You'll create an account on a Satellite. We have them all over the world. You choose a Satellite based on where your data will be most frequently accessed, as Satellites are where metadata is stored and node selection takes place.
{% /callout %}

Read more about [](docId\:v0b3GtAU4dDT_1qibwCxc)

## Developer Account

When you create an account on a Satellite, you add some basic contact information, including a payment method if you want to use the Paid Tier Service. You can create Projects and Access Grants/Gateway Credentials, view invoices, and track usage.

{% callout type="info"  %} 
**Key Point:** You can invite other developers with accounts on your Satellite to join one or more of your Projects, or be added to other Developers' Projects.
{% /callout %}

Read more about the [](docId\:nGzxQBhV8nx5Pukj6O0zT)

## Project

A project is a basic unit for aggregating usage, calculating billing, invoicing fees,  collecting payment, and handling access management. Users can create multiple projects and projects are invoiced separately. Within a project, usage is tracked at the Bucket level and aggregated for invoicing to the Project. Project names are not client-side encrypted, so they may be rendered in the Satellite user interface. There are two main drivers for creating multiple Projects: access management and billing.

## Access Management

For access management, Access Grants are instantiated at the project level. A primary Access Grant created in the Satellite admin console can perform any action on any bucket in a project, but Access Grants do not work across projects. If you are a managed service provider or have multiple applications where there must be no commonality between applications for access management (no single Access Grant can be used to manage data across applications) then you should create a separate project per application or customer.

Projects are also useful for managing phases of software development across environments. You may want to use a separate project for development, staging, and production environments.

{% callout type="info"  %} 
**Key Point:** The key distinction is that you can create granular Access Grants within a Project with restricted access to only a single object or path, it's also possible to create an Access Grant with all access to all buckets, paths, and objects within a Project. It is not possible to create an Access Grant with access to buckets, paths, and objects within more than one Project.
{% /callout %}

### Billing

From a billing perspective, if you only have one application, or you’re an individual using an app like [FileZilla](https://www.storj.io/integrations/filezilla) or [Duplicati](https://www.storj.io/integrations/backup-with-duplicati), you probably only need one project. If you are a managed service provider or systems integrator, and you have multiple applications or want separate invoices for each of the applications, customers, or environments you have, depending on what is relevant to your business, you’ll want to create multiple projects. Usage is itemized within projects at the bucket level, but projects have separate invoices.

## Bucket&#x20;

A bucket is an unbounded but named collection of objects identified by paths. Every object has a unique path within a bucket.&#x20;

{% callout type="warning"  %} 
**Key Point:** Bucket names are not client-side encrypted so that they may be rendered in the Satellite user interface.&#x20;
{% /callout %}

Bucket names are not client-side encrypted so that they may be rendered in the Satellite user interface.&#x20;

Usage is tracked and itemized on invoices at the Bucket level. One practical consideration when choosing how to map constructs in your application to constructs on Storj DCS is that large numbers of buckets will increase the size and complexity of your invoices.

From an access management perspective, there’s really no difference between using a bucket and using a top-level path within a bucket. The only differences are that bucket names are unencrypted and appear on invoices while top-level path names are encrypted and billing is aggregated at the bucket level.

If you are an individual user with a single application, you may only need one Bucket. If you are building a multi-tenant or multi-user application, the best practice is to use a single bucket for the application, then create a separate top-level path to store object data associated with each tenant or user within the application. Each top-level path can be secured with a separate Restricted Access Grant.&#x20;

With this structure, your application can manage the data for all of the tenants or users of your application, but 100% of the objects and object metadata will be encrypted, and the tenants or users of your application will not have any access to the data of their peers unless they specifically authorize that access.

## Object Key or Path (encrypted metadata)

An object key (or path) is a unique identifier for an object within a bucket. An object key is an arbitrary string of bytes. Object keys resemble file system paths by containing forward slashes at access control boundaries. Forward slashes (referred to as the path separator) separate path components. An example path might be `videos/carlsagan/gloriousdawn.mp4`, where the path components are `videos`, `carlsagan`, and `gloriousdawn.mp4`. It is possible to share just the encryption keys for objects that have a common object key path component prefix.

{% callout type="info"  %} 
While many object storage platforms provide access management restrictions only at the bucket level, Storj DCS provides the tools to manage granular access at the path level.
{% /callout %}

## Object (encrypted metadata)

An object is the main data type in our system. An object is referred to by an object key, contains an arbitrary amount of bytes, and has no minimum or maximum size. An object is represented by an ordered collection of one or more segments. Segments have a fixed maximum size. An object also supports a limited amount of key/value user-defined fields called user-defined metadata.&#x20;

## Access Grant

Storj DCS uses hierarchically deterministic Access Grants as an access management layer for objects. An Access Grant is a security envelope that contains a satellite address, a restricted API Key, and a restricted path component prefix-based encryption key—everything an application needs to locate an object on the network, access that object, and decrypt it. The key benefit of this approach is that these Access Grants and any associated restrictions can be entirely managed client-side, without a central Access Control List or other server-side mechanism involved in the access management process. We call this delegated authorization.

The most important thing to understand about Access Grants is, even though an  Access Grant contains a serialized encryption key encapsulated in the Access Grant, that encryption key is NEVER passed to a Satellite. Storj DCS Uplink clients separate the API Key from the Access Grant and only pass the API Key to Satellites. That way, a Satellite can receive an access request, evaluate the validity of the API Key associated with that request, and respond with the metadata needed to retrieve the pieces of the object associated with that request without having any ability to decrypt the underlying data or metadata or have any information about the context of the user or application making the request.&#x20;

The result is that the Storj DCS service allows you to create more private and secure applications. Below is a brief description of the three components within an Access Grant:

### Satellite Address

The Satellite Address is contained within the Access Grant so that an Uplink client knows which Satellite to contact to retrieve the metadata associated with an object to be retrieved.

### API Key

An Access Grant contains an API Key that is based on a type of bearer token called a Macaroon. API Keys are both hierarchically derived from a parent and may also contain programmatic restrictions based on:

1.  **Specific Operations**: Caveats can restrict whether an Access Grant can permit any of the following operations: Read, Write, Delete, List

2.  **Bucket:** Caveats can restrict whether an Access Grant can permit operations on one or more Buckets.

3.  **Object key and path prefix:** Caveats can restrict whether an Access Grant can permit operations on Objects that share a common path component prefix.

4.  **Time Window:** Caveats can restrict when an Access Grant can permit operations on objects stored on the platform.

Restrictions applied to an API Key within an Access Grant are hierarchically derived from the access restrictions contained in the API Key within the Parent Access Grant from which the Restricted Access Grant was created. That means a Restricted Access Grant can have the same level of access or less access than its Parent Access Grant, but never more access.

### Encryption Key

All data stored on Storj DCS is encrypted. By using hierarchically-derived encryption keys, it becomes easy to share the ability to decrypt a single object or set of objects without sharing the private encryption passphrase or having to re-encrypt objects. When you create a Primary Access Grant, you provide an encryption passphrase. All Restricted Access Grants derived from that Primary Access Grant contain a path-based hierarchically derived serialized encryption key (or set of encryption keys, based on what has been shared).

If you're interested in more details, please read more about [](docId\:uuhN7eyr1a8P3l_vzdnDk) at your leisure.

A unique encryption key can be derived client-side for each object. That unique key is generated automatically when sharing objects, allowing users to share single objects or object key prefixes, with the ability to decrypt just the objects that are shared without having to worry about separately managing encryption access to objects that aren’t being shared.&#x20;

But, your keys are your data. If you lose the encryption passphrase, you effectively lose the ability to recover your data. Satellites never have access to your encryption keys. Satellites can’t access your data so your privacy is ensured, but if you lose the key, that means we also can’t help you recover it. **The point:** don’t lose your encryption key.

## Primary Access Grants

Primary Access Grants are generated via the Satellite Admin Console. Note that only the API Key and Satellite address are generated by the Satellite. The actual Access Grant is created in the browser with the Encryption Passphrase provided by you. The Satellite does not store or retain the encryption passphrase or serialized encryption key encapsulated in the Access Grant. That is entirely handled in client-side Javascript in the browser. A Primary Access Grant can be created with no restrictions or can be created with one or more caveats.

A Primary Access Grant can then be imported into an Uplink Client for use. The Uplink Client can then be used to create Restricted Access Grants derived from the Primary Access Key.

## Restricted Access Grants

The Storj DCS service generates primary Access Grants, and restricted Access Grants are derived from a primary Access Grant or any other Access Grant via the Uplink Client. Parent-to-child, access may be further restricted, but not expanded. A restricted Access Grant can never have more access than its parent.&#x20;

A primary Access Grant is created in the admin console of the Satellite. A primary Access Grant has all permissions to all buckets within a project and can be used to create a child Access Grant.

A restricted Access Grant may be created using the Satellite console or Uplink client. Restricted Access Grants are created in the context of creating access. Essentially, you don’t explicitly create a Restricted Access Grant, the Uplink client creates one when you generate an access, which handles both access management and encryption,  both restricted to the scope of access being shared.&#x20;

The Storj DCS service also supports the revocation of Access Grants. Note that revoking an Access Grant adds that Access Grant to a revocation list and invalidates the Access Grant and any child Access Grant derived from the Access Grant that has been revoked. Revoking a primary access grant can be done in the UI, but currently revoking a restricted access grant can only happen via the Uplink CLI.

## Sharing Access with Restricted Access Grants

Sharing access to objects stored on Storj DCS requires sending encryption and authorization information about that object from one client to another. The information is sent in a construct called a Restricted Access Grant. As noted above, an Access Grant is a security envelope that contains a satellite address, a restricted API Key, and a restricted path-based encryption key—everything an application needs to locate an object on the network, access that object, and decrypt it.

An Access contains a bearer token that is generated client-side and transmitted client-to-client. When the Uplink client generates or uses an Access, only the API Key (the bearer token) from the Access is sent to a Satellite to retrieve an object. The encryption key is retained by the Client and used to decrypt objects, metadata, and paths client-side.

To implement these constructs as easily as possible for developers, the Storj DCS developer tools abstract the complexity of encoding objects for access management and encryption/decryption. A simple share command encapsulates the satellite address for an object’s metadata, an encryption key, and an API Key into an Access in the format of an encoded string that can be easily imported into an Uplink client. Imported Accesses are managed client-side and may be leveraged in applications via the Uplink client library.

## Applying the Storj DCS Information Architecture

Once you understand the basic building blocks of Storj DCS, it’s pretty easy to build some fairly sophisticated privacy and security controls into your application.
