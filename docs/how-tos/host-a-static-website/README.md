---
description: Host a static website using the Storj DCS service
---

# Host a Static Website

The Storj DCS service allows you to **host static websites** along with other web-delivered assets such as streaming multimedia and large file distribution.&#x20;

Since your webpages and assets are simply objects stored on the network and there is no server/database, Storj DCS does **not** support the hosting of **dynamic websites.** However, you can store all of your unchanging assets on Storj DCS and reference them from your dynamic site that is hosted on an external compute service of your choice.

There are a few ways you can host your static site on Storj DCS. We recommend using the [Uplink CLI and Linksharing Service](host-a-static-website-with-the-cli-and-linksharing-service.md) but you may also use the [single-tenant S3 gateway](../../api-reference/s3-gateway/gateway-st-advanced-usage.md#running-gateway-st-to-host-a-static-website) to host your site.

{% hint style="info" %}
**Static websites** serve files, including HTML, CSS, and Javascript files, exactly as they are stored on the server. All visitors will be served the same files.

**Dynamic websites** use server-side processing to generate the underlying code behind each page. They support Create, Read, Update, Delete operations against a database. Web views can be custom rendered to each user.
{% endhint %}
