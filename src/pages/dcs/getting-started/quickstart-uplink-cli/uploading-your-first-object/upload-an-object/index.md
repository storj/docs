---
title: Upload an Object
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-03T08:36:11.000Z
docId: gh5RtIDbMkAoomljO7f8d
redirects:
  - >-
    /dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/upload-an-object
---

You need to have a satellite account and installed Uplink CLI as described in [](docId\:TbMdOGCAXNWyPpQmH6EOq)

## The Object we'll upload

Right-click and save as **cheesecake.jpg** to your **Desktop**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Agk7hc0TSkbDdOVi_kAmL_cheesecake.jpeg)

## Upload our object

To upload our photo, let's use the copy command:

{% code-group %}
```windows
./uplink.exe cp ~/Desktop/cheesecake.jpg sj://cakes
```

```macos
uplink cp ~/Desktop/cheesecake.jpg sj://cakes
```

```linux
uplink cp ~/Desktop/cheesecake.jpg sj://cakes
```
{% /code-group %}

Result

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/-kJd4nJmCle8qwhaY5-bW_uploadfile.png)

