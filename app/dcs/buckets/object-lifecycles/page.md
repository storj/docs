---
title: Object Lifecycles
weight: 10
metadata:
  title: Setting Object Lifecycles
  description: Explaining how to specify Time to Live for an object in Storj
    using different tools like rclone, aws cli, and uplink.
---

## Setting Object TTL with Custom HTTP Header

It's possible to specify TTL for the object by sending the `X-Amz-Meta-Object-Expires` header (see [](docId:eZ4caegh9queuQuaazoo#object-level-ttl)) with one of the following:

- a signed, positive sequence of decimal numbers, each with an optional fraction
  and a unit suffix, such as `+300ms`, `+1.5h`, or `+2h45m`
  - valid time units are `ns`, `us` (or `µs`), `ms`, `s`, `m`, `h`
  - `+2h` means the object expires 2 hours from now
- full RFC3339-formatted date

{% code-group %}

```shell {% title="rclone" %}
# terminal
rclone copy storj-tree.png storj:my-bucket --header-upload "x-amz-meta-object-expires:+5m"
```

```shell {% title="aws cli" %}
# terminal
aws s3 --endpoint-url https://gateway.storjshare.io cp storj-tree.png s3://my-bucket --metadata "Object-Expires=+5m"
# terminal
aws s3 --endpoint-url https://gateway.storjshare.io cp storj-tree.png s3://my-bucket --metadata Object-Expires=2022-05-19T00:10:55Z
```

```shell {% title="uplink" %}
# uses `--expires` instead
# terminal
uplink cp --expires "+5m" storj-tree.png sj://my-bucket
```

{% /code-group %}

## Setting Object TTL in the Access Grant / S3 Credentials

If the S3 client cannot send custom HTTP headers, it is possible to restrict an access grant with the `MaxObjectTTL` permission. Uploaded objects get a TTL that reflects the configured MaxObjectTTL period.

{% callout type="info" %} The following instructions cannot be executed entirely in the Satellite Console and require to be completed with the Uplink CLI (v1.88 or later). {% /callout %}

1.  Log in to the Satellite Console and follow the steps to [](docId:_xWsamBjOsZYyu9xtQCm5#create-access-grant).

2.  Switch to your command terminal and execute the [](docId:jWrIx32jqwp0r45vQcodH) command.

{% code-group %}

```windows
./uplink.exe access restrict --access 18k...TAY --readonly=false --max-object-ttl 720h
```

```linux
uplink access restrict --access 18k...TAY --readonly=false --max-object-ttl 720h
```

```macos
uplink access restrict --access 18k...TAY --readonly=false --max-object-ttl 720h
```

{% /code-group %}

Use the `--max-object-ttl` flag to set the Object TTL period to set on the uploaded objects. The period is set in hours, e.g. set `720h` for one month.

Make sure to set the `--readonly=false` flag. Otherwise, the restricted access grant will be read-only, making uploading objects impossible.

Executing the command will print the new restricted access grant:

```Text
1AW...V3B
```

3. Execute the [](docId:-2V4QD-Wl-oYac7laROm7) command to ensure the `MaxObjectTTL` was configured properly.

{% code-group %}

```windows
./uplink.exe access inspect 1AW...V3B
```

```linux
uplink access inspect 1AW...V3B
```

```macos
uplink access inspect 1AW...V3B
```

{% /code-group %}

You should see a new caveat added to the macaroon with a `max_object_ttl` field set to the configured period (the value is displayed in nanoseconds).

```Text
"macaroon": {
    "head": "GBo...eg=",
    "caveats": [
      {
        "not_before": "2023-09-14T11:43:29.185Z",
        "nonce": "M4VAag=="
      },
      {
        "max_object_ttl": 2592000000000000,
        "nonce": "HF4OHg=="
      }
    ],
    "tail": "rV_...RQ="
  }
```

4. Register the new access grant as S3 credentials with [](docId:6hH_ygAn1FJdrIZQ0CGsJ) the command.

{% code-group %}

```windows
./uplink.exe access register 1AW...V3B
```

```linux
uplink access register 1AW...V3B
```

```macos
uplink access register 1AW...V3B
```

{% /code-group %}

```Text
========== CREDENTIALS ===================================================================
Access Key ID: jw7w7n2...
Secret Key   : jycbodr...
Endpoint     : https://gateway.storjshare.io
```

5. Configure the S3 credentials in your S3 client.
