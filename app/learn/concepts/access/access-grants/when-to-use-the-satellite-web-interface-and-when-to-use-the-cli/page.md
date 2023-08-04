---
title: When to use the Satellite Web Interface and When to use the CLI
docId: oUovFUZTldzMuuiM4KbHr
redirects:
  - >-
    /dcs/concepts/access/access-grants/when-to-use-the-satellite-web-interface-and-when-to-use-the-cli
---

Determining when to use the different tools for generating Access Grants is driven by the use of the underlying tool. You can generate an Access Grant in the [](docId:nGzxQBhV8nx5Pukj6O0zT), or you can use either our Go Library or [](docId:OXSINcFRuVMBacPvswwNU). &#x20;

## When to use the Satellite Admin Console

In general, you use the Satellite Admin Console web interface to create an Access Grant that is then used to set up whatever client tool you are using. In order to configure and use the CLI or an application like [](docId:OkJongWeLGhPy4KKz34W4) or [](docId:LdrqSoECrAyE_LQMvj3aF) you must first [](docId:b4-QgUOxVHDHSIWpAf3hG) to configure the client. You may create an unrestricted Access Grant or Restricted Access Grant with limited access. The Satellite Admin Console web interface is also used to generate credentials if you want to use an application with the Storj hosted S3-compatible gateway.

{% callout type="warning"  %}
**Remember:** When you use an Access Grant to generate credentials for the Storj hosted S3-compatible gateway, the hosted gateway uses server-side encryption. If end-to-end encryption is essential for your use case, you should encrypt your data before sending it to the hosted gateway, or use a self-hosted S3-compatible Gateway.
{% /callout %}

## When to use an Uplink client

Once you have created an Access Grant from the Satellite Admin Console web interface, the CLI, client library or other client tool can then use that Access Grant to interact with the Storj DCS service, or create additional restricted Access Grants - child Access Grants of the parent created in the Satellite Admin Console. The Uplink Client can be used to create additional child Restricted Access Grants.&#x20;

{% callout type="warning"  %}
**Remember:** When you create child Restricted Access Grants from a parent Restricted Access Grant, the child Restricted Access Grants can have the same level of access as the parent or less access, but never more.&#x20;

**For example:** A parent Restricted Access Grant that only has Read and Write access to a particular may be used to create child Restricted Access Grants that have Read-only access to the bucket or just one path within that bucket. But, a parent Restricted Access Grant that only has Read and Write access to a particular may NOT be used to create child Restricted Access Grants that have Read-write-delete access to the bucket or another path within another bucket to which the parent Restricted Access Grant does not have any access.
{% /callout %}

If you want to learn more, check out the [](docId:M-5oxBinC6J1D-qSNjKYS) section or read all about [](docId:bNywu7-9KLjYfk5LBQABx).

Learn how to [](docId:OXSINcFRuVMBacPvswwNU) in the [](docId:nGzxQBhV8nx5Pukj6O0zT).

Learn how to [](docId:OXSINcFRuVMBacPvswwNU) in the [](docId:TbMdOGCAXNWyPpQmH6EOq).
