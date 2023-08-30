---
title: access register
docId: 6hH_ygAn1FJdrIZQ0CGsJ
redirects:
  - /dcs/api-reference/uplink-cli/access-command/access-register
---

Register your access for use with a hosted gateway.

## Usage

{% code-group %}

```windows
./uplink.exe access register <flags> <ACCESS-GRANT>
```

```linux
uplink access register <flags> <ACCESS-GRANT>
```

```macos
uplink access register <flags> <ACCESS-GRANT>
```

{% /code-group %}

## Flags

| Flag                    | Description                                                      |
| :---------------------- | :--------------------------------------------------------------- |
| `--access string`       | the serialized access, or name of the access to use              |
| `--auth-service string` | the address to the service you wish to register your access with |
| `--public`              | if the access should be public. Default false                    |

## Example

Once you have an access grant from the [](docId:OXSINcFRuVMBacPvswwNU) or `uplink share` you can register it with a GatewayMT auth service and designate the access to be public (no secret ket necessary to access) or private. If you want to use it to host a static site or share a URL, you must create a public access.

{% code-group %}

```windows
./uplink.exe access register --public=true <ACCESS-GRANT>
```

```linux
uplink access register --public=true <ACCESS-GRANT>
```

```macos
uplink access register --public=true <ACCESS-GRANT>
```

{% /code-group %}

```Text
========== CREDENTIALS ===================================================================
Access Key ID: jw7w7n2...
Secret Key   : jycbodr...
Endpoint     : https://gateway.storjshare.io
```
