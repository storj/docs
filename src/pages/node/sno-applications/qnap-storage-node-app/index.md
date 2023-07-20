---
title: QNAP Storage Node App
slug: sno-applications/qnap-storage-node-app
createdAt: 2022-05-24T21:18:27.000Z
updatedAt: 2023-03-03T08:30:27.000Z
---

## Introduction

In this guide, we are going to walk through the installation process for the Storage Node QNAP application for your QNAP NAS Device – enabling you to:

1.  Monetize your excess capacity on the Storj Network

2.  Back up your NAS Device to the Network using Gateway-MT and any S3-compatible backup solution.

For a video walkthrough of this process, please see below:&#x20;

<https://www.youtube.com/watch?v=H6bRljVjR48>

## Prerequisites

*    [](docId\:aT6VAB297OWLd4vqeXxf5)&#x20;

*    Download the [QNAP Binary](https://github.com/storj-thirdparty/qnap-storagenode-app/releases/latest)

## Sharing Capacity Prerequisites

First, navigate to QNAP App Center application, by double clicking on its icon on the QNAP Desktop Homepage.

Next, click "Install Manually" and click on the QNAP Package (downloaded above) to install the QNAP Storj application onto the device.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/2_N44-j5CDn6cZiLzoCVG_spaces.png)

Before installing, you will be prompted to accept that the application has no official digital signature: hit "accept"

Once the installation is completed, the Storj Storage Node app will be available through the App Center, as well as be visible on the desktop.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/1uAYJpLKzzU09nFBE3owp_image.png)



{% callout type="info"  %} 
**Don't see the Storj app?**

Go to “**Control Panel** -> **Privileges**”, double click the storage node app and put a checkmark in the “**Allow**” box of the user you're logging in with. After that it should appear in the start menu.
{% /callout %}

Open the application, and click "Wizard" in the sidebar.  You will be prompted with a walkthrough of the application, like so:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/9mKBXGbXoQJ95ywE_mbBL_image.png)



First, enter your email address that you would like associated with notifications for your node:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/kfnmhfsVG_k61weJPvi4a_image.png)

Then, add your [ERC-20 Token Compatible Wallet Address](https://support.storj.io/hc/en-us/articles/360026611692-How-do-I-hold-STORJ-What-is-a-valid-address-or-compatible-wallet-) for payouts.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/4nmAYwFJUzivgihR-NruY_image.png)

After, configure Storage Allocation, and set the amount of excess storage capacity you would like to share with the network.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/LWmWZBADgrai71-5EQDp9_image.png)

After, input a selected Storage Directory (which specifies the path where the data will be stored).


![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/DGiiifk0J5D7xotc04dp9_image.png)

Next, configure the external [](docId\:y0jltT-HzKPmDefi532sd) (this allows the connection for the Storj Network to come in, and communicate with the software running on the NAS).

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/jZ8twzcfbWd-AnTpKMprj_image.png)

After, set the location for your node's identity certificate, like so:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/hIJRyypNup8zNmjTzKq7F_image.png)

Hit finish, and you have successfully completed that setup wizard for your QNAP device.&#x20;

## Run the Application

After following the configuration steps above, click 'Start My Storage Node' and look for the log output, which indicates that the image is running.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/AoZkAsmxNVvt8HkJX-h-K_image.png)

You have successfully shared your excess capacity on your QNAP Device with the Storj Network. &#x20;

Click the Dashboard Option to view your current stats - and keep an eye on that payout address!
---undefineddocId: N-dnnf7HhHcOaavvXjplw
