# AWS CLI Advanced Options

### Define an endpoint with AWS CLI v1

{% hint style="info" %}
Installing plugin`awscli-plugin-endpoint` will also install the AWS CLI v1
{% endhint %}

{% hint style="info" %}
If you use an AWS CLI v1 then you actually can install a plugin to allow to specify the endpoint:

Install `awscli-plugin-endpoint`:

```
~ % pip3 install awscli-plugin-endpoint
```

Configure plugin in your `~/.aws/config` file:

```
~ % aws configure set plugins.endpoint awscli_plugin_endpoint
```

..and configure the default profile:

```
~ % aws configure set default.s3.endpoint_url https://gateway.storj.io
~ % aws configure set default.s3.multipart_threshold 60MB
~ % aws configure set default.s3.multipart_chunksize 60MB
```

The resulting file would look like:

```
[plugins]
endpoint = awscli_plugin_endpoint

[default]
s3 =
  endpoint_url = https://gateway.storj.io
  multipart_threshold = 60MB  
  multipart_chunksize = 60MB
```

Now you can use your AWS CLI without specifying of the endpoint:

```
~ % aws s3 ls
2021-01-08 19:41:13 demo
```

To configure `s3api` endpoint you can use this command:

```
~ % aws configure set default.s3api.endpoint_url https://gateway.storj.io
```

You also can use a different profile for Storj:

```
~ % aws configure set profile.storj.s3.endpoint_url https://gateway.storj.io
~ % aws configure set profile.storj.s3.multipart_threshold 1TB
```

To use AWS CLI with a separate profile `storj`:

```
~ % aws s3 --profile storj ls
2021-01-08 19:41:13 demo
```
{% endhint %}

{% hint style="warning" %}
Installing plugin`awscli-plugin-endpoint` will also install the AWS CLI v1!
{% endhint %}
