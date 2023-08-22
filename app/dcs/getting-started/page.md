---
title: Getting started
docId: AsyYcUJFbO1JI8-Tu8tW3
weight: 1
redirects:
  - /dcs/getting-started/gateway-mt
  - /dcs/getting-started/quickstart-aws-sdk-and-hosted-gateway-mt
---

Storj is the leading provider of enterprise-grade, globally distributed cloud object storage.

It is a drop-in replacement for any S3-compatible object storage that is just as durable but with 99.95% availability and better global performance from a single upload.

Storj delivers default multi-region CDN-like performance with zero-trust security at a [cost that’s 80%](docId:59T_2l7c1rvZVhI8p91VX) lower than AWS S3.

## Before you begin

To get started, create an account with Storj. You’ll automatically be on Storj's free plan that gives you access to try our storage with your [third-party tool](docId:REPde_t8MJMDaE2BU8RfQ) or project.

{% quick-links %}
{% quick-link title="Sign up" href="https://storj.io/signup"  %}

If you've never used Storj before, sign up for a new Storj account

{% /quick-link %}
{% quick-link title="Log in" href="https://storj.io/login"  %}

If you already have a Storj account, log in to get started

{% /quick-link %}
{% /quick-links %}

## Generate S3 compatible credentials

{% partial file="s3-credentials.md" /%}

## Install command-line tools

Storj works with a variety command-line tools. Rclone is recommended for its compatibility with various cloud providers and ease of use.

However, some may already be familiar with AWS CLI which is also a suitable option.

{% tabs %}

{% tab label="rclone" %}

1. Install rclone

   ```shell
   sudo -v ; curl https://rclone.org/install.sh | sudo bash
   ```

   Or use an [alternative method](https://rclone.org/downloads/)

2. Configure rclone

   Edit the rclone config file directly, you can find where it is stored by running the following:

   ```shell
   # focus
   # terminal
   # link[8:13] https://rclone.org/commands/rclone_config_file/
   rclone config file

   Configuration file is stored at:
   /Users/dan/.config/rclone/rclone.conf
   ```

   In `rclone.conf`, set the `access_key_id` and `secret_access_key` with the S3 compatible credentials created above.

   {% code-group label="~/.config/rclone/rclone.conf" %}

   ```ini
   [storj]
   type = s3
   provider = Storj
   access_key_id =  access_key # REPLACE ME
   secret_access_key = secret_key  # REPLACE ME
   endpoint = gateway.storjshare.io
   chunk_size = 64Mi
   disable_checksum: true
   ```

   {% /code-group %}

{% /tab %}

{% tab label="aws cli" %}

1. [Install the AWS CLI v2.x](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

2. Configure your AWS CLI with the gateway MT credentials from the previous step by running `aws configure` in your terminal:

   ```shell
   # focus(1)
   # terminal
   aws configure
     AWS Access Key ID [None]: <Access Key>
     AWS Secret Access Key [None]: <Secret Key>
   # link[31:36] docId:eem7iong0aSh7ahbich5
     Default region name [None]: global
     Default output format [None]:
   ```

3. **Optional but strongly recommended**: Set the multipart threshold to 64 MB

```shell
aws configure set default.s3.multipart_threshold 64MB
aws configure set default.s3.multipart_chunksize 64MB
```

{% /tab %}
{% /tabs %}

## Create a bucket

Now that the command-line tool is configured, let's make a bucket to store our files.

{% code-group %}

```shell {% title="rclone" %}
# link[8:12] https://rclone.org/commands/rclone_mkdir/
# terminal
rclone mkdir storj:my-bucket
```

```shell {% title="aws cli" %}
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io mb s3://my-bucket
```

{% /code-group %}

## List buckets

The bucket will show up in our bucket list (not to be mistaken with a life's to-do list)

{% code-group %}

```shell {% title="rclone" %}
# `lsf` is non-recursive, while `ls` is recursive
# focus
# terminal
# link[8:10] https://rclone.org/commands/rclone_lsf/
rclone lsf storj:
my-bucket/
```

```shell {% title="aws cli" %}
# focus
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io ls s3://
2023-08-21 15:30:40 my-bucket
```

{% /code-group %}

## Upload file

Next we'll upload a file. Here is an example image of a tree growing hard drives (while Storj doesn't grow hard drives on trees, it does emphasize [sustainability](https://www.storj.io/benefits/sustainability)). Right-click on it and save as `storj-tree.png` to your Downloads.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-tree.png)

Copy the file to your bucket.

{% code-group %}

```shell {% title="rclone" %}
# link[8:11] https://rclone.org/commands/rclone_copy/
# terminal
rclone copy ~/Downloads/storj-tree.png storj:my-bucket/
```

```shell {% title="aws cli" %}
# focus
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io cp ~/Downloads/storj-tree.png s3://my-bucket/

upload: Downloads/storj-tree.png to s3://my-bucket/storj-tree.png
```

{% /code-group %}

## Download file

To retrieve the file, use the same command as upload but reverse the order of the arguments

{% code-group %}

```shell {% title="rclone" %}
# terminal
# link[8:11] https://rclone.org/commands/rclone_copy/
rclone copy storj:my-bucket/ ~/Downloads/storj-tree-2.png
```

```shell {% title="aws cli" %}
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io cp s3://my-bucket/ ~/Downloads/storj-tree-2.png
```

{% /code-group %}

## List files

Let's see what files we have in the bucket.

{% code-group %}

```shell {% title="rclone" %}
# focus
# terminal
# link[8:9] https://rclone.org/commands/rclone_ls/
rclone ls storj:my-bucket

   133220 storj-tree.png
```

```shell {% title="aws cli" %}
# focus
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io ls s3://my-bucket
2023-08-21 16:00:40     133220 storj-tree.png
```

{% /code-group %}

Yep there's the Storj tree!

## Delete file

Okay time to remove the file.

{% code-group %}

```shell {% title="rclone" %}
# focus
# terminal
# link[8:17] https://rclone.org/commands/rclone_deletefile/
rclone deletefile storj:my-bucket/storj-tree.png
```

```shell {% title="aws cli" %}
# focus
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io rm s3://my-bucket/storj-tree.png

delete: s3://my-bucket/storj-tree.png
```

{% /code-group %}

## Delete buckets

Last but not least, we'll delete the bucket.

{% code-group %}

```shell {% title="rclone" %}
# focus
# terminal
# link[8:12] https://rclone.org/commands/rclone_rmdir/
rclone rmdir storj:my-bucket
```

```shell {% title="aws cli" %}
# focus
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io rb s3://my-bucket/

remove_bucket: my-bucket
```

{% /code-group %}

### Delete a non-empty bucket

{% code-group %}

```shell {% title="rclone" %}
# focus
# terminal
# link[8:12] https://rclone.org/commands/rclone_purge/
rclone purge storj:my-bucket
```

```shell {% title="aws cli" %}
# add `--force`
# focus
# terminal
aws s3 --endpoint-url=https://gateway.storjshare.io rb --force s3://my-bucket/

remove_bucket: my-bucket
```

{% /code-group %}

## Next Steps

Congratulations on getting started with Storj!
