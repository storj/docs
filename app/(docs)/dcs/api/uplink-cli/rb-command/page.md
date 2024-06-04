---
title: rb
docId: Wo5-shT0hZDNMeyM1kA12
redirects:
  - /dcs/api-reference/uplink-cli/rb-command
---

rb is the command to remove an empty bucket, or empty a bucket and then remove it.

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

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/zb6IxHgf6VxL2NIRb4J9F_rb-empty-bucket.png)

### Delete bucket and all the objects it contains

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

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/WA_RPCu8OqqEAswu5yBJL_rb-force.png)

{% callout type="info"  %}
Deleting large buckets is a time-consuming process. It would roughly take 1 hour per 10,000 objects. We are working on adding progress reporting.

If you need to delete very large buckets and the waiting time is unacceptable, please [file a support request](https://supportdcs.storj.io/hc/en-us).
{% /callout %}
