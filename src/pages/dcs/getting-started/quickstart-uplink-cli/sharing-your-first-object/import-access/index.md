---
title: Import an Access to an Object
slug: getting-started/quickstart-uplink-cli/sharing-your-first-object/import-access
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-03T08:36:11.000Z
docId: R8OfnPylILOIrkpc187Xx
---

Importing an access is done using the `import` command.

## Import from the file

:::codeblocktabs
```windows
./uplink.exe access import cheesecake cheesecake.access
```

```macos
uplink access import cheesecake ~/cheesecake.access
```

```linux
uplink access import cheesecake ~/cheesecake.access
```
:::

This should give you the following output:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/LnvFyNM5SGNgYhluYziqI_access-import.png)

### Import from the input

:::codeblocktabs
```windows
./uplink.exe access import cheesecake 14dfgh....qr
```

```macos
uplink access import cheesecake 14dfgh....qr
```

```linux
uplink access import cheesecake 14dfgh....qr
```
:::

### Check list of Access grants

You can list your available accesses using:

:::codeblocktabs
```windows
./uplink.exe access list
```

```macos
uplink access list
```

```linux
uplink access list
```
:::

```Text
CURRENT    NAME           SATELLITE
*          cheesecake     us1.storj.io:7777
           pumpkin-pie    us1.storj.io:7777
           tarte          us1.storj.io:7777
```

To get more information on an access use the `inspect` command:

:::codeblocktabs
```windows
./uplink.exe access inspect cheesecake
```

```macos
uplink access inspect cheesecake
```

```linux
uplink access inspect cheesecake
```
:::

```Text
{
  "satellite_addr": "12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us1.storj.io:7777",
  "encryption_access": {
    "default_path_cipher": "ENC_AESGCM"
  },
  "api_key": "...",
  "macaroon": {
    "head": "...",
    "caveats": [
      {
        "not_after": "2021-04-17T00:00:00Z",
        "not_before": "2021-04-18T00:00:00Z",
        "nonce": "..."
      }
    ],
    "tail": "..."
  }
}
```

{% callout type="info"  %} 
There is no command to delete an access. You can delete an access directly in your configuration file.
{% /callout %}

### How to use an Access grant with commands

You can now use this access setting the `--access` flag. For example, to copy the shared object to your current directory you would use:

:::codeblocktabs
```windows
./uplink.exe cp --access cheesecake sj://cakes/cheesecake.jpg .
```

```macos
uplink cp --access cheesecake sj://cakes/cheesecake.jpg .
```

```linux
uplink cp --access cheesecake sj://cakes/cheesecake.jpg .
```
:::

