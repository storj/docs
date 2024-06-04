---
title: import
docId: N20xcpVOuPQIEcaA44wZu
redirects:
  - /dcs/api-reference/uplink-cli/import-command
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

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/QMHA8C75PyqDP6qfMVNfR_access-imported.png)
