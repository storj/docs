---
description: Frequently asked questions about Storj DCS.
---

# FAQ

## How do I navigate to the binary location?

{% hint style="info" %}
How to navigate to the _Desktop_ folder? Execute the command:

```
cd ~/Desktop
```

Or use your own location where you extracted the binary. It could be _Downloads_ folder:

```
cd ~/Downloads
```

If you followed [Download Uplink CLI](../downloads/download-uplink-cli.md) or [Download Self-hosted S3 Compatible Gateway](../downloads/download-self-hosted-s3-compatible-gateway.md) - you doesn't need to change the current location. The shell will open the user's home folder by default. Or you can navigate to there:

```
cd ~
```
{% endhint %}

## How do I upload a file?

You can upload your first object by following our documentation [here](../getting-started/quickstart-uplink-cli/uploading-your-first-object/).

## How do I create a URL to share an object?

All you need to create a shareable URL is the linksharing base URL for your region, a public, read-only [access key](../api-reference/uplink-cli/access-command/access-register.md) from the Gateway MT of the same region, and the path to your object or bucket. For a shortcut, [Uplink CLI](../api-reference/uplink-cli/share-command.md#link-sharing) will generate the shareable URL for you.&#x20;

{% hint style="warning" %}
**Please, do not use the possibility to manually build the URL with your access grant described below!**

The access grant contains your derived encryption key, it's especially dangerous if you would use your root access grant with full access - it will give a full access to your project to everyone!

Use the safe `--url` option instead!
{% endhint %}

You can build a not safe link like so: `<base url>/s/<access key>/<path sans sj://>`

| Satellite Region | Base URL                       |
| ---------------- | ------------------------------ |
| Asia             | https://link.ap1.storjshare.io |
| EU               | https://link.eu1.storjshare.io |
| US               | https://link.us1.storjshare.io |

e.g. `https://link.ap1.storjshare.io/s/<access key>/my/path`

{% hint style="danger" %}
Please, think twice before using the described method above - it exposes your access grant. If you would like to use this method anyway, then make sure to limit the access as much as possible. Ideally - read-only with time duration and only to one or two objects/paths, not to the whole bucket!
{% endhint %}

## Can I use Storj DCS for web hosting?

The Storj DCS service allows you to **host static websites** along with multimedia streaming, large file distribution, and other web-delivered assets.&#x20;

Since your webpages and assets are simply objects stored on the network and there is no server/database, Storj DCS does **not** support the hosting of **dynamic websites.** However, you can store all of your unchanging assets on Storj DCS and reference them from your dynamic site that is hosted on an external compute service of your choice.

There are a few ways you can host your static site on Storj DCS. We recommend using the [Uplink CLI ](../how-tos/host-a-static-website/host-a-static-website-with-the-cli-and-linksharing-service.md)but you may also use the [single-tenant S3 Gateway](../api-reference/s3-gateway/#running-the-gateway-to-host-a-static-website) to host your site.

{% hint style="info" %}
**Static websites** serve files, including HTML, CSS, and Javascript files, exactly as they are stored on the server. All visitors will be served the same files.

**Dynamic websites** use server-side processing to generate the underlying code behind each page. They support Create, Read, Update, Delete operations against a database. Web views can be custom rendered to each user.
{% endhint %}

## What happens if nodes go offline?&#x20;

When your data is uploaded, each object is encrypted, then broken into 64 MB Segments, then each Segment is erasure coded, meaning it's broken into 80 pieces, of which only 29 are required to reconstitute an object or segment. Each of those 80 pieces is then uploaded directly, peer-to-peer, to statistically uncorrelated storage nodes. The erasure coded redundancy means that 51 of those nodes (operated by different people, in different locations, with different power supplies and internet connections. If too many nodes fail or leave the network, the network can repair the missing pieces.&#x20;

You can learn more under Concepts for [File Redundancy](../concepts/file-redundancy.md) and [File Repair](../concepts/file-repair.md).

## How are encryption keys managed?

Storj DCS is a secure and private object storage service. While there are several different ways to interact with the service, including an S3 compatible gateway, CLI, developer library and tools like FileZilla, Rclone, Restic, Duplicati and more, you are responsible for keeping your encryption keys safe.

You can learn more under Concepts for [Encryption](../concepts/encryption-key/) and [Access Management](../concepts/access/).

## When do you create an Access Grant in Satellite UI and when do you use the CLI?

You can generate an Access Grant in the [Satellite Admin Console](../getting-started/satellite-developer-account/), or you can use either our Go Library or the CLI. In general, you use the Satellite Admin Console web interface to create an Access Grant that you can then use to set up whatever client tool you are using.  The CLI, client library or other client tool can then use that Access Grant to interact with the Storj DCS service, or create restricted Access Grants - child Access Grants of the parent created in the Satellite Admin Console.

If you want to learn more, check out the [Key Architecture Constructs](../concepts/key-architecture-constructs.md) section or read all about [Access Management](../concepts/access/)

## How can I delete an Access Grant?

Access Grants created using the Satellite user interface my be deleted using the Remove button on the Access page. Check the box next to the Access Grant(s) you want to delete, then click the Remove Selected button and follow the prompts. &#x20;

{% hint style="success" %}
**Important:** If you delete an Access Grant from the Satellite user interface, that Access Grant will immediately cease to function, and all hierarchically derived child Access Grants will also cease to function.  Any data uploaded with that Access Grant will persist on Storj DCS. If you didn't back up the encryption passphrase used with the Access Grant you are deleting, you will not be able to decrypt that data without that encryption passphrase, and it will be effectively unrecoverable.
{% endhint %}

If you created a child Access Grant client-side, using the CLI, the client Go library, or any other client-side tool or implementation, you can't "delete" the access because, by design and for enhanced privacy and security, the Satellite is not aware of Access Grants created in a client. When presented with any Access Grant, the Satellite can only verify whether the Access Grant is valid for the resource being requested.  For this reason, Access Grants that have been created client-side cannot be deleted, but must be revoked instead.

You can learn more under Concepts for [Access Grants](../concepts/access/access-grants/).

## How do I recover from having lost my encryption key associated with an access grant?&#x20;

Your encryption keys effectively are your data. If you've lost the encryption key associated with an Access Grant, but you still have the Access Grant, DO NOT DELETE OR REVOKE that Access Grant. An Access Grant will continue to work until revoked or deleted. An Access Grant contains a serialized API key, encryption key, and the Satellite that holds the metadata for an object, but what is serialized in the access grant is derived from the passphrase - the passphrase is not stored in the access grant directly. Of course, that encryption passphrase is not stored by any Storj DCS service.

The safest approach would be to download your data with the working Access Grant, then create a new Access Grant with a new encryption passphrase and re-upload the data. Be sure to save that encryption passphrase in a secure location! As long as you have the encryption passphrase, you can generate new Access Grants that will work with pre-existing data.

If you've lost the Access Grant and you don't have a backup of the encryption passphrase, you will not be able to decrypt your data and it is effectively lost.

## How can I revoke an Access Grant I shared with someone?

Access Grants can be created either in a browser or with the CLI or library, they can be further restricted, client-side creating additional hierarchically derived Access grants. Since these restricted Access Grants are managed client-side through delegated authorization, no server has any registry that these Access Grants even exist. While this gives developers a powerful tool kit to create more private and secure applications, shared access also needs to be revoked. The Storj DCS service has an API for revoking Access Grants via a revocation list.

You can learn more under Concepts for [Access Revocation](../concepts/access/access-revocation.md).

## What kind of restrictions can I put on an Access Grant?

You can generate a restricted Access Grant from the Satellite user interface, using the CLI, or using the client Go Library. While the possibilities for access controls that can be encoded in a caveat are virtually unlimited, the specific caveats supported on Storj DCS are as follows:

* **Specific operations:** Caveats can restrict whether an API Key can perform any of the following operations: Read, Write, Delete, List
* **Bucket:** Caveats can restrict whether an API Key can perform operations on one or more Buckets&#x20;
* **Path and path prefix:** Caveats can restrict whether an API Key can perform operations on Objects within a specific path in the object hierarchy
* **Time window**: Caveats can restrict when an API Key can perform operations on objects stored on the service

For some sample Go code around access-restriction, check out: [https://godoc.org/storj.io/storj/lib/uplink#example-package--RestrictAccess](https://godoc.org/storj.io/storj/lib/uplink#example-package--RestrictAccess)

## How do I pay with Storj Token?

When you decide to become a paid customer of Storj DCS, you can choose to pay with a credit card or using STORJ token. The process for adding a payment method is covered in our [Billing Documentation](broken-reference).&#x20;

## What are the current rate and usage limits?

The default usage limits for a new account are published on the [Usage Limits](../concepts/limits.md) section under Concepts.

## How do I increase my usage limits?&#x20;

The default usage limits may not be suitable for all projects.  Usage limits may be increased for paid tier accounts. A valid credit card or a sufficient balance of STORJ token relative to the usage limit increase requested as the payment method must be added before a [usage limit request form may be submitted](https://supportdcs.storj.io/hc/en-us/requests/new?ticket\_form\_id=360000683212). Please note that you will be required to verify email address on account by making a help desk account before requesting a limit increase.

For more information on rate limits view the [Limits](../concepts/limits.md) section under Concepts.

## How do I get support?

Our support process is described under the [Support Process Overview](support-process-overview.md) section of this documentation. Our Support SLA is covered under our [Terms of Service](https://www.storj.io/terms-of-service).

## How am I billed for usage?

For detailed information on how billing and payment work on Storj DCS, please see the [Billing & Payment](broken-reference) section of this documentation.

## How can I remove my credit card from my account?&#x20;

For detailed information on how to remove a credit card from the Storj DCS service, please see [Deleting a Payment Method](../billing-payment-and-accounts-1/storj-token/deleting-a-payment-method.md) under the  [Billing & Payment](broken-reference) section of this documentation. Please note that a valid payment method must be maintained on a paid tier account. You may be required to submit a support request as part of the payment method removal process.

## How can I delete a bucket?

Buckets can be created and deleted using the S3-compatible gateway, CLI, or Go library. For detailed information on how deleting a bucket works on  Storj DCS, please see the appropriate section of this documentation:

* Delete a bucket from the Satellite user interface
* [Delete a bucket from the command line](../api-reference/uplink-cli/rb-command.md)
* Delete a bucket using the Go library
* Delete a bucket using the S3-compatible gateway

## How do I delete all my data?

The easiest way to delete your data is to use the CLI.  For detailed information on how to use the command for removing buckets on Storj DCS, please see the section of this documentation on how to [delete a bucket from the command line](../api-reference/uplink-cli/rb-command.md).&#x20;

## How do I delete my account?

We want all of our users to receive value when they choose the Storj DCS service for their storage needs, but it’s possible that a user may no longer need Storj DCS services. If a user wants to stop using their account and permanently delete it, the user may do so only after following the steps outlined in the Billing Documentation to eliminate service usage.

The process to eliminate service usage starts with deleting all data from the service, including all objects and buckets. Next, all Access Grants should be deleted. Once this is done, the user should submit a support ticket to remove all payment methods and delete the account.&#x20;

For detailed information on how to close your account on Storj DCS, please see the [Closing an Account](../billing-payment-and-accounts-1/closing-an-account.md) section of this documentation.

## Does Storj DCS provide tools for end-user identity management for applications that store data on the service?

The Storj DCS service is not designed to handle **** identity management for end users of applications that store data on the service. User authentication is expected to be handled by applications. Application developers may then make further design decisions related to use the authorization management functions of the service to enable secure and private sharing of data between users of an application or sharing data with a publicly available URL.&#x20;
