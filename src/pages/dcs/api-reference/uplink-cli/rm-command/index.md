---
title: rm
slug: api-reference/uplink-cli/rm-command
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:03:54.000Z
---

Delete an object.

## Usage

:::codeblocktabs
```windows
./uplink.exe rm sj://BUCKET/KEY [flags]
```

```linux
uplink rm sj://BUCKET/KEY [flags]
```

```macos
uplink rm sj://BUCKET/KEY [flags]
```
:::

## Flags

| Flag                        | Description                                                  |
| :-------------------------- | :------------------------------------------------------docId: eavv_906IH-39ylIXq30d
----- |
| `--access string`           | the serialized access, or name of the access to use          |
| `--encrypted`               | if true, treat paths as base64-encoded encrypted paths       |
| `--help`, `-h`              | help for `rm`                                                |
| `--parallelism`, `-p` `int` | Controls how many removes to perform in parallel (default 1) |
| `--pending`                 | Remove pending object uploads instead                        |
| `--recursive`, `-r`         | Remove recursively                                           |
| `--help`, `-h`              | help for `rm`                                                |

## Examples

### Delete an object

:::codeblocktabs
```windows
./uplink.exe rm sj://cakes/cheesecake.jpg
```

```linux
uplink rm sj://cakes/cheesecake.jpg
```

```macos
uplink rm sj://cakes/cheesecake.jpg
```
:::

### Delete an encrypted object

If an object has been created with another encryption key, you won't be able to read it, but you can delete it. In order to delete an encrypted object, you have to know its encrypted path. To retrieve it, you can use the list command [](docId\:Df-CVmCCHmt6r3_c1PLn4)  with the encrypted file. For instance, to list the encrypted path of the objects in a bucket `sj://cakes` you could use:

:::codeblocktabs
```windows
./uplink.exe ls sj://cakes --encrypted
```

```linux
uplink ls sj://cakes --encrypted
```

```macos
uplink ls sj://cakes --encrypted
```
:::

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/H3aTNgsLuQGUyyzoHvuOF_rm-01.png)

You can then use this path to delete the encrypted object:

:::codeblocktabs
```windows
./uplink.exe rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```

```linux
uplink rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```

```macos
uplink rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```
:::

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/312jWiPeE9_7b2PweTHUZ_rm-02.png)

