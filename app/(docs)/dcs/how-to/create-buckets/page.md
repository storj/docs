---
title: How to create buckets
docId: create-buckets
metadata:
  title: How to Create Storj Buckets
  description: Step-by-step guide to create Storj buckets using command-line tools or the Storj Console.
---

This guide shows you how to create a new bucket in Storj DCS for storing your files and data.

## Prerequisites

Before creating a bucket, ensure you have:

- A Storj account with valid credentials
- One of the following tools configured:
  - [Rclone with Storj configuration](docId:AsyYcUJFbO1JI8-Tu8tW3)
  - [AWS CLI with Storj endpoint](docId:AsyYcUJFbO1JI8-Tu8tW3) 
  - [Uplink CLI installed and configured](docId:hFL-goCWqrQMJPcTN82NB)
  - Access to the Storj Console web interface

## Create a bucket

Choose your preferred method to create a bucket:

{% tabs %}

{% tab label="rclone" %}

```shell {% title="rclone" %}
# link[1:6] https://rclone.org/install/
# link[8:12] https://rclone.org/commands/rclone_mkdir/
# terminal
rclone mkdir storj:my-bucket
```

Replace `my-bucket` with your desired bucket name.

{% /tab %}

{% tab label="aws cli" %}

```shell {% title="aws cli" %}
# link[1:3] https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io mb s3://my-bucket
```

Replace `my-bucket` with your desired bucket name.

{% /tab %}

{% tab label="uplink" %}

```shell {% title="uplink" %}
# link[1:6] docId:hFL-goCWqrQMJPcTN82NB
# link[8:9] docId:F77kaGpjXx7w-JYv2rkhf
# terminal
uplink mb sj://my-bucket
```

Replace `my-bucket` with your desired bucket name.

{% /tab %}

{% tab label="Storj Console" %}

{% partial file="create-bucket.md" /%}

{% /tab %}

{% /tabs %}

## Verify bucket creation

Confirm your bucket was created successfully by listing your buckets:

{% tabs %}

{% tab label="rclone" %}

```shell
rclone lsf storj:
```

{% /tab %}

{% tab label="aws cli" %}

```shell
aws s3 --endpoint-url=https://gateway.storjshare.io ls
```

{% /tab %}

{% tab label="uplink" %}

```shell
uplink ls
```

{% /tab %}

{% /tabs %}

You should see your new bucket listed in the output.

## Bucket naming requirements

When creating buckets, follow these naming conventions:

- Use only lowercase letters, numbers, and hyphens
- Must be 3-63 characters long
- Cannot start or end with a hyphen
- Must be globally unique across all Storj users
- Cannot contain periods or underscores

## Next steps

Now that you have a bucket, you can:

- [Upload files to your bucket](#) 
- [Configure bucket settings like CORS](#)
- [Set up object versioning](#)
- [Configure bucket lifecycle policies](#)