---
description: >-
  Storj hosted components to support standards-based services including an
  S3-compatible gateway for cloud-native applications
---

# Edge Services

### **Overview**

Storj Edge Services are hosted components that provide S3 compatibility and publicly-available data sharing services and are composed of the Storj Gateway MT, the auth service and the link sharing service. Storj Edge Services use server-side encryption.

{% hint style="info" %}
**Note:** All of the Edge Services use [server-side encryption](../encryption-key/design-decision-server-side-encryption.md).&#x20;
{% endhint %}

### **Edge Services**

The three components comprising the edge services are:

**S3 Compatible Gateway**

Storj DCS includes a globally distributed, multi-region cloud-hosted [S3-compatible gateway](../../api-reference/s3-compatible-gateway/).

{% content-ref url="../../api-reference/s3-compatible-gateway/" %}
[s3-compatible-gateway](../../api-reference/s3-compatible-gateway/)
{% endcontent-ref %}

**Linkshare Service**

The [Storj DCS Linkshare service](../../api-reference/linksharing-service.md) is a globally distributed, multi-region cloud-hosted gateway for standard HTTP requests, for sharing objects with users via a web browser.&#x20;

{% content-ref url="../../api-reference/linksharing-service.md" %}
[linksharing-service.md](../../api-reference/linksharing-service.md)
{% endcontent-ref %}

**Auth Service**

{% content-ref url="auth-service.md" %}
[auth-service.md](auth-service.md)
{% endcontent-ref %}

Both the Storj S3-compatible gateway and the Linkshare service leverage the [Auth Service ](auth-service.md)for access management via a registered Access Grant.\
