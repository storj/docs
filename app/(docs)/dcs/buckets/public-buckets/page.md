---
title: Public Buckets
weight: 2
docId: cie0gae7voob2Weigh3c
metadata:
  title: Creating Public Buckets and Embedding Content
  description: Guide on generating a LINKSHARINGKEY to make Storj buckets public and embedding content from the buckets.
---

Storj supports public access with a `LINKSHARINGKEY`, which similar to public buckets on S3 but has more [fine-grained controls](docId:tBnCSrmR1jbOewG38fIr4#flags).

To generate a `LINKSHARINGKEY` and make your bucket public:

{% tabs %}
{% tab label="uplink" %}

```shell
uplink share --url --readonly --disallow-lists --not-after=none sj://BUCKET
```

{% /tab %}
{% tab label="Storj Console" %}

1. Navigate to Buckets

1. Select **Share Bucket** from the bucket menu

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/cie0gae7voob2Weigh3c_public_buckets.png)

{% /tab %}
{% /tabs %}

## Embeddable Content

The share from above will give you a browser URL linking to the default Storj share page. It will be of the form `https://link.storjshare.io/s/LINKSHARINGKEY/BUCKET/`.

To make the content embeddable insert `/raw/` before `LINKSHARINGKEY` (you may need to swap `/s/` for `/raw/` instead). This prefix can then be used to access anything in the bucket.

For example, to access two different images:

https://link.storjshare.io/raw/LINKSHARINGKEY/BUCKET/my_image1.png
https://link.storjshare.io/raw/LINKSHARINGKEY/BUCKET/my_image2.png
