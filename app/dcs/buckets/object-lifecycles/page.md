---
title: Object Lifecycles
weight: 10
metadata:
  title: Setting Object Lifecycles
  description: Explaining how to specify Time to Live for an object in Storj
    using different tools like rclone, aws cli, and uplink.
---

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
