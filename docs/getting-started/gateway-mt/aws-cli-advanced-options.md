# AWS CLI Advanced Options

## Define an endpoint with AWS CLI

{% tabs %}
{% tab title="AWS CLI v1.x" %}
{% hint style="info" %}
Installing plugin`awscli-plugin-endpoint` will also install the AWS CLI v1
{% endhint %}

Install `awscli-plugin-endpoint` plugin:

```
~ % pip3 install awscli-plugin-endpoint
```

Configure plugin in your `~/.aws/config` file:

```
~ % aws configure set plugins.endpoint awscli_plugin_endpoint
```
{% endtab %}

{% tab title="AWS CLI v2.x" %}
1. [Install the AWS CLI v2.x](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
2.  Install `awscli-plugin-endpoint` plugin:

    ```
    ~ % pip3 install --no-deps awscli-plugin-endpoint
    ```

    Remember the path where the plugin is installed, you will need it in the next step.
3.  Configure the path in your `~/.aws/config` file (replace the `site-packages-path` to your path from a previous step):&#x20;

    ```
    ~ % aws configure set plugins.cli_legacy_plugin_path site-packages-path
    ```
4.  Configure plugin in your `~/.aws/config` file:

    ```
    ~ % aws configure set plugins.endpoint awscli_plugin_endpoint
    ```
{% endtab %}
{% endtabs %}

..and configure the default profile (see [#regions-and-points-of-presence](../../api-reference/s3-compatible-gateway/#regions-and-points-of-presence "mention") to choose a correct endpoint):

```
~ % aws configure set default.s3.endpoint_url https://gateway.us1.storjshare.io
~ % aws configure set default.s3.multipart_threshold 60MB
~ % aws configure set default.s3.multipart_chunksize 60MB
```

The resulting file would look like:

{% tabs %}
{% tab title="AWS CLI v1.x" %}
```
[plugins]
endpoint = awscli_plugin_endpoint

[default]
s3 =
  endpoint_url = https://gateway.us1.storjshare.io
  multipart_threshold = 60MB
  multipart_chunksize = 60MB
```
{% endtab %}

{% tab title="AWS CLI v2.x" %}
```
[plugins]
cli_legacy_plugin_path = c:\users\USER\appdata\local\packages\pythonsoftwarefoundation.python.3.8_qbz5n2kfra8p0\localcache\local-packages\python38\site-packages
endpoint = awscli_plugin_endpoint

[default]
s3 =
  endpoint_url = https://gateway.us1.storjshare.io
  multipart_threshold = 60MB
  multipart_chunksize = 60MB
```
{% endtab %}
{% endtabs %}

You can now use the AWS CLI without specifying an endpoint:

```
~ % aws s3 ls
2021-01-08 19:41:13 demo
```

To configure `s3api` endpoint you can use this command:

```
~ % aws configure set default.s3api.endpoint_url https://gateway.us1.storjshare.io
```

You can also use a different profile for Storj:

```
~ % aws configure set profile.storj.s3.endpoint_url https://gateway.us1.storjshare.io
~ % aws configure set profile.storj.s3.multipart_threshold 1TB
```

To use AWS CLI with a separate profile `storj`:

```
~ % aws s3 --profile storj ls
2021-01-08 19:41:13 demo
```
