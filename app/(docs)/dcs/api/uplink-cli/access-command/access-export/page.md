---
title: access export
docId: 3MZxftia7vLWYDOom-hrY
redirects:
  - /dcs/api-reference/uplink-cli/access-command/access-export
---

This command allows you to export the Access Grant from Uplink.

## Usage

{% code-group %}

```windows
./uplink.exe access export <name> <filename>
```

```macos
uplink access export <name> <filename>
```

```linux
uplink access export <name> <filename>
```

{% /code-group %}

## Example

Once you created/imported access to the Uplink, you can export it using its name and specify a filename.

{% code-group %}

```windows
./uplink.exe access export us1 us1.txt
```

```macos
uplink access export us1 us1.txt
```

```linux
uplink access export us1 us1.txt
```

{% /code-group %}

```Text
Exported access to: us1.txt
```
