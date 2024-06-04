---
title: rm
docId: eavv_906IH-39ylIXq30d
redirects:
  - /dcs/api-reference/uplink-cli/rm-command
---

Delete an object.

## Usage

{% code-group %}

```windows
./uplink.exe rm sj://BUCKET/KEY [flags]
```

```linux
uplink rm sj://BUCKET/KEY [flags]
```

```macos
uplink rm sj://BUCKET/KEY [flags]
```

{% /code-group %}

## Flags

| Flag                        | Description                                                  |
| :-------------------------- | :----------------------------------------------------------- |
| `--access string`           | the serialized access, or name of the access to use          |
| `--encrypted`               | if true, treat paths as base64-encoded encrypted paths       |
| `--help`, `-h`              | help for `rm`                                                |
| `--parallelism`, `-p` `int` | Controls how many removes to perform in parallel (default 1) |
| `--pending`                 | Remove pending object uploads instead                        |
| `--recursive`, `-r`         | Remove recursively                                           |
| `--help`, `-h`              | help for `rm`                                                |

## Examples

## Delete an object

{% code-group %}

```windows
./uplink.exe rm sj://cakes/cheesecake.jpg
```

```linux
uplink rm sj://cakes/cheesecake.jpg
```

```macos
uplink rm sj://cakes/cheesecake.jpg
```

{% /code-group %}

### Delete an encrypted object

If an object has been created with another encryption key, you won't be able to read it, but you can delete it. In order to delete an encrypted object, you have to know its encrypted path. To retrieve it, you can use the list command [](docId:Df-CVmCCHmt6r3_c1PLn4) with the encrypted file. For instance, to list the encrypted path of the objects in a bucket `sj://cakes` you could use:

{% code-group %}

```windows
./uplink.exe ls sj://cakes --encrypted
```

```linux
uplink ls sj://cakes --encrypted
```

```macos
uplink ls sj://cakes --encrypted
```

{% /code-group %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/H3aTNgsLuQGUyyzoHvuOF_rm-01.png)

You can then use this path to delete the encrypted object:

{% code-group %}

```windows
./uplink.exe rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```

```linux
uplink rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```

```macos
uplink rm --encrypted sj://cakes/Ao8rmi2hw5v8_SS2GRokJwqkzQ2j9wXRH2Ll-1owEGPwIWMyu8tj5YCCig==
```

{% /code-group %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/312jWiPeE9_7b2PweTHUZ_rm-02.png)
