---
title: access inspect
slug: api-reference/uplink-cli/access-command/access-inspect-command
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:01:40.000Z
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
| :---------------- | :---------------------------------------------docId: -2V4QD-Wl-oYac7laROm7
----- |
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

