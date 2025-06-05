---
title: mb
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

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/tu46BijIJlozZB2Rhhjd5_bucketcakescreated.png)
