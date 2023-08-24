---
title: Create a Bucket
docId: OJPnxiexQIXHmzGBkvzHc
redirects:
  - >-
    /dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/create-a-bucket
weight: 10
---

You need to have a satellite account and installed Uplink CLI as described in [](docId:TbMdOGCAXNWyPpQmH6EOq)

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

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/VE2SKIz_0DR32w_SqGKly_bucketcakescreated.png)
