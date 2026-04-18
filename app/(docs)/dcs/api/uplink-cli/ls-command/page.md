---
title: ls
docId: Df-CVmCCHmt6r3_c1PLn4
redirects:
  - /dcs/api-reference/uplink-cli/ls-command
---

List objects and prefixes or all buckets

## Usage

{% code-group %}

```windows
./uplink.exe ls [sj://BUCKET[/PREFIX]] [flags]
```

```linux
uplink ls [sj://BUCKET[/PREFIX]] [flags]
```

```macos
uplink ls [sj://BUCKET[/PREFIX]] [flags]
```

{% /code-group %}

## Flags

| Flag                | Description                                                                                        |
| :------------------ | :------------------------------------------------------------------------------------------------- |
| `--access string`   | the serialized access, or name of the access to use                                                |
| `--encrypted`       | if true, show paths as base64-encoded encrypted paths                                              |
| `--expanded`, `-x`  | Use expanded output, showing object expiration times and whether there is custom metadata attached |
| `--help`, `-h`      | help for ls                                                                                        |
| `--pending`         | if true, list incomplete objects instead                                                           |
| `--recursive`, `-r` | if true, list recursively                                                                          |

## Examples

_We consider the following object hierarchy throughout these examples:_

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/cvEUiGkZBSQPWr_GwlRLL_ls-example-hierarchy2.png)

_We assume the object has been uploaded using a different encryption key than the other objects in the project._

## List buckets

{% code-group %}

```windows
./uplink.exe ls
```

```linux
uplink ls
```

```macos
uplink ls
```

{% /code-group %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/37CrYbSUci3Pdlh1QcuwW_ls-project.png)

### List objects in a bucket

{% code-group %}

```windows
./uplink.exe ls sj://images
```

```linux
uplink ls sj://images
```

```macos
uplink ls sj://images
```

{% /code-group %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/yqXPSB-VzWVfHnSdD0i3A_ls-bucket.png)

### List by prefix

{% code-group %}

```windows
./uplink.exe ls sj://images/cakes
```

```linux
uplink ls sj://images/cakes
```

```macos
uplink ls sj://images/cakes
```

{% /code-group %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/jC9kW-YXQ7fi3xje1o5Vs_ls-prefix.png)

### List recursively

{% code-group %}

```windows
./uplink.exe ls --recursive
```

```linux
uplink ls --recursive
```

```macos
uplink ls --recursive
```

{% /code-group %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/EbQXgIH4f3qxT1oP7K9kk_ls-example-hierarchy3.png)

### List encrypted paths of all objects in a bucket

{% code-group %}

```windows
./uplink.exe ls sj://recipes --encrypted --recursive
```

```linux
uplink ls sj://recipes --encrypted
```

```macos
uplink ls sj://recipes --encrypted
```

{% /code-group %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/CBy2GPMCGBtZtHw7V7PVm_ls-encrypted.png)

Notice that since `sj://recipes/cakes/very-secret-recipe.txt` was encrypted with a different key, we cannot view it using regular ls and the default access, but with `--encrypted` we can see that it is indeed stored in sj://recipes
