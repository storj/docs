---
title: AWS CLI Advanced Options
docId: 20zlQyfMD9gmHJOUPx3jh
redirects:
  - /dcs/getting-started/gateway-mt/aws-cli-advanced-options
---

## Install `awscli-plugin-endpoint` plugin

{% tabs %}
{% tab label="aws CLI v1.x" %}

```shell
pip3 install awscli-plugin-endpoint
```

Configure plugin in your `~/.aws/config` file:

```shell
aws configure set plugins.endpoint awscli_plugin_endpoint
```

{% /tab %}

{% tab label="aws CLI v2.x" %}

1.  [Install the AWS CLI v2.x](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

2.  Install `awscli-plugin-endpoint` plugin:

```shell
pip3 install --no-deps awscli-plugin-endpoint
```

3\. Configure the path in your `~/.aws/config` file (replace the `site-packages-path` to your path from a previous step):

```shell
aws configure set plugins.cli_legacy_plugin_path site-packages-path
```

4\. Configure plugin in your `~/.aws/config` file:

```shell
aws configure set plugins.endpoint awscli_plugin_endpoint
```

{% /tab %}
{% /tabs %}

## Define an endpoint with AWS CLI

Configure the default profile (see [](docId:EGM8O-1xt2Az03eBWT8Rf) to choose a correct endpoint):

```shell
aws configure set default.s3.endpoint_url https://gateway.storjshare.io
aws configure set default.s3.multipart_threshold 60MB
aws configure set default.s3.multipart_chunksize 60MB
```

The resulting file would look like:

```none
[default]
aws_access_key_id = judjq3jjusboabcyw7qk6o5mqepq
aws_secret_access_key = jygstztxxqreukegsd25vbpjyaaegdtgbd34uqvgapfswqk2467ze6
s3 =
  endpoint_url = https://gateway.storjshare.io
  multipart_threshold = 60MB
  multipart_chunksize = 60MB
```

You can now use the AWS CLI without specifying an endpoint:

```shell
aws s3 ls
```

To configure `s3api` endpoint you can use this command:

```shell
aws configure set default.s3api.endpoint_url https://gateway.storjshare.io
```

You can also use a different profile for Storj:

```shell
aws configure set profile.storj.s3.endpoint_url https://gateway.storjshare.io
aws configure set profile.storj.s3.multipart_threshold 1TB
```

To use AWS CLI with a separate profile `storj`:

```shell
aws s3 --profile storj ls
```
