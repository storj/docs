---
title: meta get
docId: 0u8rcWLCr1hwNmWRnyvgn
redirects:
  - /dcs/api-reference/uplink-cli/meta-command/meta-get-command
---

## Usage

{% code-group %}

```windows
./uplink.exe meta get PATH [KEY] [flags]
```

```linux
uplink meta get PATH [KEY] [flags]
```

```macos
uplink meta get PATH [KEY] [flags]
```

{% /code-group %}

## Flags

| Flag              | Description                                         |
| :---------------- | :-------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for get                                        |

## Retrieve all metadata of an object

Suppose you have uploaded your object with metadata using this command:

{% code-group %}

```windows
./uplink.exe cp cheesecake.jpg sj://cakes --metadata '{\"baker\":\"cheeseman\", "\picture-author\": "\picman\"}'
```

```linux
uplink cp cheesecake.jpg sj://cakes --metadata '{"baker":"cheeseman", "picture-author": "picman"}'
```

```macos
uplink cp cheesecake.jpg sj://cakes --metadata '{"baker":"cheeseman", "picture-author": "picman"}'
```

{% /code-group %}

Retrieving all metadata defined for object `sj://cakes/cheesecake.jpg` is done with:

{% code-group %}

```windows
./uplink.exe meta get sj://cakes/cheesecake.jpg
```

```linux
uplink meta get sj://cakes/cheesecake.jpg
```

```macos
uplink meta get sj://cakes/cheesecake.jpg
```

{% /code-group %}

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/zxWOIDRiLXcedbjVc6OmG_meta-get.png)

### Query for a specific key in metadata

You can retrieve the value of key `baker` for object `sj://cakes/cheesecake.jpg` using:

{% code-group %}

```windows
./uplink.exe meta get sj://cakes/cheesecake.jpg baker
```

```linux
uplink meta get sj://cakes/cheesecake.jpg baker
```

```macos
uplink meta get sj://cakes/cheesecake.jpg baker
```

{% /code-group %}

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/B2qjHGPbKsZHONu74SsL0_meta-get-key.png)

{% callout type="info"  %}
Querying for a non-existent key will raise an error.
{% /callout %}
