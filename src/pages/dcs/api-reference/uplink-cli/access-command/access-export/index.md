---
title: access export
slug: api-reference/uplink-cli/access-command/access-export
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T12:56:03.000Z
docId: 3MZxftia7vLWYDOom-hrY
---

This command allows you to export the Access Grant from Uplink.

## Usage

:::codeblocktabs
```windows
./uplink.exe access export <name> <filename>
```

```macos
uplink access export <name> <filename>
```

```linux
uplink access export <name> <filename>
```
:::

## Example

Once you created/imported access to the Uplink, you can export it using its name and specify a filename.

:::codeblocktabs
```windows
./uplink.exe access export us1 us1.txt
```

```macos
uplink access export us1 us1.txt
```

```linux
uplink access export us1 us1.txt
```
:::

```Text
Exported access to: us1.txt
```

