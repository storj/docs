---
title: Create buckets
docId: pxdnqsVDjCLZgeEXt2S6x
weight: 1
redirects:
  - /dcs/buckets
metadata:
  title: Creating Buckets Using Different Tools
  description:
    Guide on how to create Storj buckets using command-line tools or the
    Storj Console.
---

You can create a bucket from various command-line tools or the Storj Console.

{% tabs %}

{% tab label="rclone" %}

```shell {% title="rclone" %}
# link[1:6] https://rclone.org/install/
# link[8:12] https://rclone.org/commands/rclone_mkdir/
# terminal
rclone mkdir storj:my-bucket
```

{% /tab %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
# link[1:3] https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io mb s3://my-bucket
```

{% /tab %}

{% tab label="uplink" %}

```shell {% title="uplink" %}
# link[1:6] docId:hFL-goCWqrQMJPcTN82NB
# link[8:9] docId:F77kaGpjXx7w-JYv2rkhf
# terminal
uplink mb sj://my-bucket
```

{% /tab %}

{% tab label="Storj Console" %}

{% partial file="create-bucket.md" /%}

{% /tab %}

{% /tabs %}
