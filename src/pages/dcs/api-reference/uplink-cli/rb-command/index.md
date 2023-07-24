---
title: rb
slug: api-reference/uplink-cli/rb-command
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:03:50.000Z
docId: Wo5-shT0hZDNMeyM1kA12
---

rb is the command to remove an empty bucket, or empty a bucket and then remove  it.

## Usage

{% code-group %}
```windows
./uplink.exe rb sj://BUCKET [flags]
```

```linux
uplink rb sj://BUCKET [flags]
```

```macos
uplink rb sj://BUCKET [flags]
```
{% /code-group %}

## Flags

| Flag              | Description                                         |
| :---------------- | :-------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--force`         | if true, empties the bucket of objects first        |
| `--help`, `-h`    | help for rb                                         |

## Examples

## Delete empty bucket

{% code-group %}
```windows
./uplink.exe rb sj://cakes
```

```linux
uplink rb sj://cakes
```

```macos
uplink rb sj://cakes
```
{% /code-group %}

Output:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/zb6IxHgf6VxL2NIRb4J9F_rb-empty-bucket.png)

## Delete bucket and all the objects it contains

{% code-group %}
```windows
./uplink.exe rb sj://cakes --force
```

```linux
uplink rb sj://cakes --force
```

```macos
uplink rb sj://cakes --force
```
{% /code-group %}

Output:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/WA_RPCu8OqqEAswu5yBJL_rb-force.png)

{% callout type="info"  %} 
Deleting large buckets is a time-consuming process. It would roughly take 1 hour per 10,000 objects. We are working on adding progress reporting.

If you need to delete very large buckets and the waiting time is unacceptable, please [file a support request](https://supportdcs.storj.io/hc/en-us).
{% /callout %}

