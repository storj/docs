---
title: Upload an Object
docId: gh5RtIDbMkAoomljO7f8d
redirects:
  - >-
    /dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/upload-an-object
weight: 15
---

You need to have a satellite account and installed Uplink CLI as described in [](docId:TbMdOGCAXNWyPpQmH6EOq)

## The Object we'll upload

Right-click and save as **cheesecake.jpg** to your **Desktop**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Agk7hc0TSkbDdOVi_kAmL_cheesecake.jpeg)

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

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/-kJd4nJmCle8qwhaY5-bW_uploadfile.png)
