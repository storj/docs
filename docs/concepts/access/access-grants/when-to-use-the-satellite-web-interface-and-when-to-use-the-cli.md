---
description: >-
  Determining when to use the different tools for generating Access Grants is
  driven by the use of the underlying tool.
---

# When to use the Satellite Web Interface and When to use the CLI

You can generate an Access Grant in the [Satellite Admin Console](../../../getting-started/satellite-developer-account/), or you can use either our Go Library or [the CLI](../../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md).&#x20;

## When to use the Satellite Admin Console

In general, you use the Satellite Admin Console web interface to create an Access Grant that is then used to set up whatever client tool you are using.  In order to configure and use the CLI or an application like [FileZilla](../../../how-tos/set-up-filezilla-for-decentralized-file-transfer.md) or [Rclone](../../../how-tos/sync-files-with-rclone/), you must first [create an Access Grant](../../../getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant.md) to configure the client.  You may create an unrestricted Access Grant or Restricted Access Grant with limited access. The Satellite Admin Console web interface is also used to generate credentials if you want to use an application with the Storj hosted S3-compatible gateway.

{% hint style="warning" %}
**Remember:** When you use an Access Grant to generate credentials for the Storj hosted S3-compatible gateway, the hosted gateway uses server-side encryption. If end-to-end encryption is essential for your use case, you should encrypt your data before sending it to the hosted gateway, or use a self-hosted S3-compatible Gateway.
{% endhint %}

## When to use an Uplink client

Once you have created an Access Grant from the Satellite Admin Console web interface, the CLI, client library or other client tool can then use that Access Grant to interact with the Storj DCS service, or create additional restricted Access Grants - child Access Grants of the parent created in the Satellite Admin Console. The Uplink Client can be used to create additional child Restricted Access Grants.&#x20;

{% hint style="warning" %}
**Remember:** When you create child Restricted Access Grants from a parent Restricted Access Grant, the child Restricted Access Grants can have the same level of access as the parent or less access, but never more.&#x20;

**For example:** A parent Restricted Access Grant that only has Read and Write access to a particular may be used to create child Restricted Access Grants that have Read-only access to the bucket or just one path within that bucket. But, a parent Restricted Access Grant that only has Read and Write access to a particular may NOT be used to create child Restricted Access Grants that have Read-write-delete access to the bucket or another path within another bucket to which the parent  Restricted Access Grant does not have any access.
{% endhint %}

If you want to learn more, check out the [Key Architecture Constructs](../../key-architecture-constructs.md) section or read all about [Access Management](../).

Learn how to [create an Access Grant using the Satellite Admin Console](../../../getting-started/satellite-developer-account/access-grants.md) in the [Satellite Admin Console Quickstart](../../../getting-started/satellite-developer-account/).

Learn how to [create an Access Grant using the Uplink CLI](../../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md) in the [Uplink CLI Quickstart](../../../getting-started/quickstart-uplink-cli/).
