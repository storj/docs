---
title: access list
docId: 8ROAZiLnev7X-CP9A_DQF
redirects:
  - /dcs/api-reference/uplink-cli/access-command/access-list-command
---

Prints name and associated satellite of all available accesses.

## Usage

{% code-group %}

```windows
./uplink.exe access list [flags]
```

```linux
uplink access list [flags]
```

```macos
uplink access list [flags]
```

{% /code-group %}

## Flags

| Flag              | Description                                         |
| :---------------- | :-------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`,` -h`    | help for list                                       |

## Examples

{% code-group %}

```windows
./uplink.exe access list
```

```linux
uplink access list
```

```macos
uplink access list
```

{% /code-group %}

```Text
=========== ACCESSES LIST: name / satellite ================================
cheesecake / 12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us1.storj.io:7777
pumpkin-pie / 12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777
tarte / 121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6@ap1.storj.io:7777
```
