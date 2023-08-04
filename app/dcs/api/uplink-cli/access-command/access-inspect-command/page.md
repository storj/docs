---
title: access inspect
docId: '-2V4QD-Wl-oYac7laROm7'
redirects:
  - /dcs/api-reference/uplink-cli/access-command/access-inspect-command
---

Inspect allows you to explode a serialized access into its constituent parts.

## Usage

{% code-group %}

```windows
./uplink.exe access inspect [ACCESS-GRANT] [flags]
```

```linux
uplink access inspect [ACCESS-GRANT] [flags]
```

```macos
uplink access inspect [ACCESS-GRANT] [flags]
```

{% /code-group %}

## Flags

| Flag              | Description                                         |
| :---------------- | :-------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`,` -h`    | help for inspect                                    |

## Examples

{% code-group %}

```windows
./uplink.exe access inspect cheesecake
```

```linux
uplink access inspect cheesecake
```

```macos
uplink access inspect cheesecake
```

{% /code-group %}

is equivalent to:

{% code-group %}

```windows
./uplink.exe access --access cheesecake inspect
```

```linux
uplink access --access cheesecake inspect
```

```macos
uplink access --access cheesecake inspect
```

{% /code-group %}

and will output something like:

```Text
{
  "satellite_addr": "12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us1.storj.io:7777",
  "encryption_access": {
    "default_path_cipher": "ENC_AESGCM"
  },
  "api_key": "...",
  "macaroon": {
    "head": "...",
    "caveats": [],
    "tail": "..."
  }
}
```
