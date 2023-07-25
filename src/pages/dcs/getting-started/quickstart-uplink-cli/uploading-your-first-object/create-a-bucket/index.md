---
title: Create a Bucket
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-03T08:36:11.000Z
docId: OJPnxiexQIXHmzGBkvzHc
redirects:
  - >-
    /dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/create-a-bucket
---

You need to have a satellite account and installed Uplink CLI as described in [](docId\:TbMdOGCAXNWyPpQmH6EOq)

## Create a bucket in our Project

Let's create a bucket to store photos of cake for our "food app" project:

{% code-group %}
```windows
./uplink.exe mb sj://cakes
```

```macos
uplink mb sj://cakes
```

```linux
uplink mb sj://cakes
```
{% /code-group %}

Result

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/VE2SKIz_0DR32w_SqGKly_bucketcakescreated.png)

