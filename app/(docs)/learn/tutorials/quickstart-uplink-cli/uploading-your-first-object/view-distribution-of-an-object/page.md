---
title: View Distribution of an Object
docId: '-v_wZieO-SN4FiEn3mmFU'
redirects:
  - >-
    /dcs/getting-started/quickstart-uplink-cli/uploading-your-first-object/view-distribution-of-an-object
  - /getting-started/uploading-your-first-object/view-distribution-of-an-object
weight: 20
---

You need to have a satellite account and installed Uplink CLI as described in [](docId:TbMdOGCAXNWyPpQmH6EOq)

You can view the geographic distribution of your object and generate a shareable URL via the Link Sharing Service. Run the `uplink share --url` command below.

See [](docId:tBnCSrmR1jbOewG38fIr4)for specifications on how to select an auth region and restrict the `uplink share --url` command.

{% code-group %}

```windows
./uplink.exe share --url --not-after=+2h sj://cakes/cheesecake.jpg
```

```macos
uplink share --url --not-after=+2h sj://cakes/cheesecake.jpg
```

```linux
uplink share --url --not-after=+2h sj://cakes/cheesecake.jpg
```

{% /code-group %}

Copy the URL that is returned by the `uplink share --url` command and paste into your browser window.

```shell
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Disallowed
Lists     : Allowed
Deletes   : Disallowed
NotBefore : No restriction
NotAfter  : 2022-03-01 09:56:13
Paths     : sj://cakes/cheesecake.jpg
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 1Dv4...
========== CREDENTIALS ===================================================================
Access Key ID: jvw3fmzqyg2cvxm27qishw6y4qka
Secret Key   : ...
Endpoint     : https://gateway.storjshare.io
Public Access:  true
=========== BROWSER URL ==================================================================
REMINDER  : Object key must end in '/' when trying to share recursively
URL       : https://link.storjshare.io/s/juexo54k2db7lt5fawuqkupqkcfa/cakes/cheesecake.jpg
```

This is a real distribution of your file's pieces that you uploaded to the network. You can share this file with anyone you'd like.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/wx1Ujm2Y4Fnpn9vtROT0R_object-distribution.png)
