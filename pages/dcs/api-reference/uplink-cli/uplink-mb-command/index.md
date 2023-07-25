---
title: mb
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:03:23.000Z
docId: F77kaGpjXx7w-JYv2rkhf
redirects:
  - /dcs/api-reference/uplink-cli/uplink-mb-command
---

Create a new bucket

## Usage

{% code-group %}
```windows
./uplink.exe mb [flags] sj://<BUCKET>
```

```linux
uplink mb [flags] sj://<BUCKET>
```

```macos
uplink mb [flags] sj://<BUCKET>
```
{% /code-group %}

## Flags

| Flag              | Description                                         |
| :---------------- | :-------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for `mb`                                       |

## Examples

## Create bucket

{% code-group %}
```windows
./uplink.exe mb sj://cakes
```

```linux
uplink mb sj://cakes
```

```macos
uplink mb sj://cakes
```
{% /code-group %}

{% callout type="info"  %} 
Nested buckets are not supported.
{% /callout %}

Output:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/tu46BijIJlozZB2Rhhjd5_bucketcakescreated.png)

