---
title: FAQ
slug: support/faqs
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-03T08:36:11.000Z
---

Frequently asked questions about Storj DCS.

## How do I navigate to the binary location?

:::hint{type="info"}
How to navigate to the *Desktop* folder? Execute the command:

```shell
cd ~/Desktop
```

Or use your own location where you extracted the binary. It could be *Downloads* folder:

```shell
cd ~/Downloads
```

If you followed [](docId\:hFL-goCWqrQMJPcTN82NB) or [](docId\:OBgx_1X2IO-MKBpmP7yAf) - you doesn't need to change the current location. The shell will open the user's home folder by default. Or you can navigate to there:

```shell
cd ~
```
:::

##

## How do I upload a file?

You can upload your first object by following our documentation [](docId\:R8xZNlt1dr3nZzo-_ZQLx).

## How do I create a URL to share an object?

All you need to create a shareable URL is the linksharing base URL for your region, a public, read-only [](docId:6hH_ygAn1FJdrIZQ0CGsJ) from the Gateway MT of the same region, and the path to your object or bucket. For a shortcut, [](docId\:tBnCSrmR1jbOewG38fIr4) will generate the shareable URL for you.&#x20;

:::hint{type="warning"}
**Please, do not use the possibility to manually build the URL with your access grant described below!**

The access grant contains your derived encryption key, it's especially dangerous if you would use your root access grant with full access - it will give a full access to your project to everyone!

Use the safe `--url` option instead!
:::

You can build a not safe link like so: `<base url>/s/<access key>/<path sans sj://>`

| Satellite Region | Base URL |
| :--------------- | :---docId: 4qPQxa8HlvDIO1Kgqa2No
---- |
| Asia             |          |
| EU               |          |
| US               |          |

e.g. `https://link.ap1.storjshare.io/s/<access key>/my/path`

:::hint{type="danger"}
Please, think twice before using the described method above - it exposes your access grant. If you would like to use this method anyway, then make sure to limit the access as much as possible. Ideally - read-only with time duration and only to one or two objects/paths, not to the whole bucket!
:::

## /

## Can I use Storj DCS for web hosting?

The Storj DCS service allows you to **host static websites** along with multimedia streaming, large file distribution, and other web-delivered assets.&#x20;

Since your webpages and assets are simply objects stored on the network and there is no server/database, Storj DCS does **not** support the hosting of **dynamic websites.** However, you can store all of your unchanging assets on Storj DCS and reference them from your dynamic site that is hosted on an external compute service of your choice.

There are a few ways you can host your static site on Storj DCS. We recommend using the [](docId\:GkgE6Egi02wRZtyryFyPz) but you may also use the [](docId\:EGM8O-1xt2Az03eBWT8Rf) to host your site.

:::hint{type="info"}
**Static websites** serve files, including HTML, CSS, and Javascript files, exactly as they are stored on the server. All visitors will be served the same files.

**Dynamic websites** use server-side processing to generate the underlying code behind each page. They support Create, Read, Update, Delete operations against a database. Web views can be custom rendered to each user.
:::

##

## What happens if nodes go offline?&#x20;

When your data is uploaded, each object is encrypted, then broken into 64 MB Segments, then each Segment is erasure coded, meaning it's broken into 80 pieces, of which only 29 are required to reconstitute an object or segment. Each of those 80 pieces is then uploaded directly, peer-to-peer, to statistically uncorrelated storage nodes. The erasure coded redundancy means that 51 of those nodes (operated by different people, in different locations, with different power supplies and internet connections. If too many nodes fail or leave the network, the network can repair the missing pieces.&#x20;

You can learn more under Concepts for [](docId\:CBMEVO2vA2lDZ_BVuZ9aP) and [](docId\:z4JgCuivlGbnn4YQMmlVX).

##

## How are encryption keys managed?

Storj DCS is a secure and private object storage service. While there are several different ways to interact with the service, including an S3 compatible gateway, CLI, developer library and tools like FileZilla, Rclone, Restic, Duplicati and more, you are responsible for keeping your encryption keys safe.

You can learn more under [](docId\:ZS9b7lYUWcC1NdsktRRkG) about Encryption and Access Management.

## When do you create an Access Grant in Satellite UI and when do you use the CLI?

You can generate an Access Grant in the [](docId\:nGzxQBhV8nx5Pukj6O0zT), or you can use either our Go Library or the CLI. In general, you use the Satellite Admin Console web interface to create an Access Grant that you can then use to set up whatever client tool you are using.  The CLI, client library or other client tool can then use that Access Grant to interact with the Storj DCS service, or create restricted Access Grants - child Access Grants of the parent created in the Satellite Admin Console.

If you want to learn more, check out the [](docId\:M-5oxBinC6J1D-qSNjKYS) section or read all about [](docId\:bNywu7-9KLjYfk5LBQABx).

## How can I delete an Access Grant?

Access Grants created using the Satellite user interface my be deleted using the Remove button on the Access page. Check the box next to the Access Grant(s) you want to delete, then click the Remove Selected button and follow the prompts. &#x20;

:::hint{type="success"}
**Important:** If you delete an Access Grant from the Satellite user interface, that Access Grant will immediately cease to function, and all hierarchically derived child Access Grants will also cease to function.  Any data uploaded with that Access Grant will persist on Storj DCS. If you didn't back up the encryption passphrase used with the Access Grant you are deleting, you will not be able to decrypt that data without that encryption passphrase, and it will be effectively unrecoverable.
:::

If you created a child Access Grant client-side, using the CLI, the client Go library, or any other client-side tool or implementation, you can't "delete" the access because, by design and for enhanced privacy and security, the Satellite is not aware of Access Grants created in a client. When presented with any Access Grant, the Satellite can only verify whether the Access Grant is valid for the resource being requested.  For this reason, Access Grants that have been created client-side cannot be deleted, but must be revoked instead.

You can learn more under Concepts for [](docId\:XKib9SzjtEXTXWvdyYWX6).

## How do I recover from having lost my encryption key associated with an access grant?

Your encryption keys effectively are your data. If you've lost the encryption key associated with an Access Grant, but you still have the Access Grant, DO NOT DELETE OR REVOKE that Access Grant. An Access Grant will continue to work until revoked or deleted. An Access Grant contains a serialized API key, encryption key, and the Satellite that holds the metadata for an object, but what is serialized in the access grant is derived from the passphrase - the passphrase is not stored in the access grant directly. Of course, that encryption passphrase is not stored by any Storj DCS service.

The safest approach would be to download your data with the working Access Grant, then create a new Access Grant with a new encryption passphrase and re-upload the data. Be sure to save that encryption passphrase in a secure location! As long as you have the encryption passphrase, you can generate new Access Grants that will work with pre-existing data.

If you've lost the Access Grant and you don't have a backup of the encryption passphrase, you will not be able to decrypt your data and it is effectively lost.

## How can I revoke an Access Grant I shared with someone?

Access Grants can be created either in a browser or with the CLI or library, they can be further restricted, client-side creating additional hierarchically derived Access grants. Since these restricted Access Grants are managed client-side through delegated authorization, no server has any registry that these Access Grants even exist. While this gives developers a powerful tool kit to create more private and secure applications, shared access also needs to be revoked. The Storj DCS service has an API for revoking Access Grants via a revocation list.

You can learn more under Concepts for [](docId\:k-qsdTq8rYcpbfhWIFLeR).

## What kind of restrictions can I put on an Access Grant?

You can generate a restricted Access Grant from the Satellite user interface, using the CLI, or using the client Go Library. While the possibilities for access controls that can be encoded in a caveat are virtually unlimited, the specific caveats supported on Storj DCS are as follows:

*   **Specific operations:** Caveats can restrict whether an API Key can perform any of the following operations: Read, Write, Delete, List

*   **Bucket:** Caveats can restrict whether an API Key can perform operations on one or more Buckets&#x20;

*   **Path and path prefix:** Caveats can restrict whether an API Key can perform operations on Objects within a specific path in the object hierarchy

*   **Time window**: Caveats can restrict when an API Key can perform operations on objects stored on the service

For some sample Go code around access-restriction, check out: <https://godoc.org/storj.io/storj/lib/uplink#example-package--RestrictAccess>

## How do I pay with Storj Token?

When you decide to become a paid customer of Storj DCS, you can choose to pay with a credit card or using STORJ token. The process for adding a payment method is covered in [](docId\:xxo0jDSfb_UgbmQoUUbml).  &#x20;

##

## What are the current rate and usage limits?

The default usage limits for a new account are published on the [](docId\:Zrbz4XYhIOm99hhRShWHg) section under Concept.

## How do I increase my usage limits?&#x20;

The default usage limits may not be suitable for all projects.  Usage limits may be increased for paid tier accounts. A valid credit card or a sufficient balance of STORJ token relative to the usage limit increase requested as the payment method must be added before a [usage limit request form may be submitted](https://supportdcs.storj.io/hc/en-us/requests/new?ticket_form_id=360000683212). Please note that you will be required to verify email address on account by making a help desk account before requesting a limit increase.

For more information on rate limits view the [](docId\:Zrbz4XYhIOm99hhRShWHg) section under Concepts.

## How do I get support?

Our support process is described under the [](docId\:xe__i9r3jY1QWUR6RYgzd) section of this documentation. Our Support SLA is covered under our [Terms of Service](https://www.storj.io/terms-of-service).

## How am I billed for usage?

For detailed information on how billing and payment work on Storj DCS, please see the [](docId\:xxo0jDSfb_UgbmQoUUbml)  section of this documentation.

## How can I remove my credit card from my account?&#x20;

For detailed information on how to remove a credit card from the Storj DCS service, please see [](docId\:WMzdlxUZzKJ4TbNa8TETG) under the [](docId:7U4_uu6Pzg6u2N6FpV9VE) section of this documentation. Please note that a valid payment method must be maintained on a paid tier account. You may be required to submit a support request as part of the payment method removal process.

## How can I delete a bucket?

Buckets can be created and deleted using the S3-compatible gateway, CLI, or Go library. For detailed information on how deleting a bucket works on  Storj DCS, please see the appropriate section of this documentation:

*   [](docId:4oDAezF-FcfPr0WPl7knd)

*   [](docId\:Wo5-shT0hZDNMeyM1kA12)&#x20;

*   [Delete a bucket using the Go library](https://pkg.go.dev/storj.io/uplink#Project.DeleteBucket)

*   [](docId\:AsyYcUJFbO1JI8-Tu8tW3)

##

## How do I delete all my data?

The easiest way to delete your data is to use the CLI.  For detailed information on how to use the command for removing buckets on Storj DCS, please see the section of this documentation on how to [](docId\:Wo5-shT0hZDNMeyM1kA12).

## How do I delete my account?

We want all of our users to receive value when they choose the Storj DCS service for their storage needs, but it’s possible that a user may no longer need Storj DCS services. If a user wants to stop using their account and permanently delete it, the user may do so only after following the steps outlined in the Billing Documentation to eliminate service usage.

The process to eliminate service usage starts with deleting all data from the service, including all objects and buckets. Next, all Access Grants should be deleted. Once this is done, the user should submit a support ticket to remove all payment methods and delete the account.&#x20;

For detailed information on how to close your account on Storj DCS, please see the [](docId:1AZ8BVkKsR3a2MTEKq85b)  section of this documentation.

## Does Storj DCS provide tools for end-user identity management for applications that store data on the service?

The Storj DCS service is not designed to handle  identity management for end users of applications that store data on the service. User authentication is expected to be handled by applications. Application developers may then make further design decisions related to use the authorization management functions of the service to enable secure and private sharing of data between users of an application or sharing data with a publicly available URL.&#x20;

***

# Need help?

&#x20;If you don't find the answers you're looking for, visit our [](docId\:h0GeE0-z8ta1rOlKLL7lL).
