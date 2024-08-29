---
title: Objects
docId: uyuWpwchZx29f28UGAILP
weight: 6
redirects:
  - /dcs/getting-started/satellite-developer-account/objects
metadata:
  title: Uploading and Downloading Files Guide
  description:
    Learn how to upload and download files to and from your bucket using
    various methods.
---

## Upload file

Copy a file to your bucket.

{% tabs %}

{% tab label="rclone" %}

```shell {% title="rclone" %}
# link[8:11] https://rclone.org/commands/rclone_copy/
# terminal
rclone copy ~/Downloads/storj-tree.png storj:my-bucket/
```

{% /tab %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
# focus
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io cp ~/Downloads/storj-tree.png s3://my-bucket/

upload: Downloads/storj-tree.png to s3://my-bucket/storj-tree.png
```

{% /tab %}

{% tab label="uplink" %}

```shell {% title="uplink" %}
# terminal
uplink cp ~/Downloads/storj-tree.png sj://my-bucket
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to **Browse** on the left side menu

2. Open your bucket from the list

3. Click **Upload**

{% /tab %}

{% /tabs %}

## Download file

Copy a file from your bucket.

{% tabs %}

{% tab label="rclone" %}

```shell {% title="rclone" %}
# terminal
# link[8:11] https://rclone.org/commands/rclone_copy/
rclone copy storj:my-bucket/ ~/Downloads/storj-tree-2.png
```

{% /tab %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io cp s3://my-bucket/ ~/Downloads/storj-tree-2.png
```

{% /tab %}

{% tab label="uplink" %}

```shell {% title="uplink" %}
# terminal
uplink cp sj://my-bucket ~/Downloads/storj-tree.png
```

{% /tab %}

{% tab label="Storj Console" %}

1. Navigate to **Browse** on the left side menu

2. Open your bucket from the list

3. Click on the Download button on your file.

{% /tab %}

{% /tabs %}
