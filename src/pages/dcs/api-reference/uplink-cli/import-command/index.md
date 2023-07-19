---
title: import
slug: api-reference/uplink-cli/import-command
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:03:09.000Z
docId: N20xcpVOuPQIEcaA44wZu
---

Imports a serialized access grant into the configuration.

## Usage

{% code-group %}
```windows
./uplink.exe import [flags] NAME (ACCESS | FILE)
```

```linux
uplink import [flags] NAME (ACCESS | FILE)
```

```macos
uplink import [flags] NAME (ACCESS | FILE)
```
{% /code-group %}

## Flags

| Flag            | Description                         |
| :-------------- | :---------------------------------- |
| `--help`, `-h`  | help for import                     |
| `--force`, `-f` | overwrite the existing access grant |

## Examples

## Import access grant from a file

{% code-group %}
```windows
./uplink.exe import cheesecake cheesecake.access
```

```linux
uplink import cheesecake cheesecake.access
```

```macos
uplink import cheesecake cheesecake.access
```
{% /code-group %}

### Import access grant with a key

{% code-group %}
```windows
./uplink.exe import cheesecake 13df....qa
```

```linux
uplink import cheesecake 13df....qa
```

```macos
uplink import cheesecake 13df....qa
```
{% /code-group %}

These two commands will have the same output:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/QMHA8C75PyqDP6qfMVNfR_access-imported.png)
