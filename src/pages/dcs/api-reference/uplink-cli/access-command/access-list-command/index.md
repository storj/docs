---
title: access list
slug: api-reference/uplink-cli/access-command/access-list-command
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:01:44.000Z
---

Prints name and associated satellite of all available accesses.

## Usage

:::codeblocktabs
```windows
./uplink.exe access list [flags]
```

```linux
uplink access list [flags]
```

```macos
uplink access list [flags]
```
:::

## Flags

| Flag              | Description                                         |
| :---------------- | :---------------------------------------------docId: 8ROAZiLnev7X-CP9A_DQF
----- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`,` -h`    | help for list                                       |

## Examples

:::codeblocktabs
```windows
./uplink.exe access list
```

```linux
uplink access list
```

```macos
uplink access list
```
:::

```Text
=========== ACCESSES LIST: name / satellite ================================
cheesecake / 12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us1.storj.io:7777
pumpkin-pie / 12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777
tarte / 121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6@ap1.storj.io:7777
```

