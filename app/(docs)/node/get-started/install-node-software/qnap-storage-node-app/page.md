---
title: QNAP Storage Node App
docId: N-dnnf7HhHcOaavvXjplw
redirects:
  - /node/sno-applications/qnap-storage-node-app
---


## Introduction

In this guide, we are going to walk through the installation process for the Storage Node QNAP application for your QNAP NAS Device – enabling you to:

1.  Monetize your excess capacity on the Storj Network

2.  [Back up your NAS Device](docId:ahJah5samahgueFu) using QNAP's HBS 3 using Storj's S3-compatible API

For a video walkthrough of this process, please see below:

{% youtube-embed videoId="H6bRljVjR48" /%}

## Prerequisites

- [](docId:aT6VAB297OWLd4vqeXxf5)

- Download the [QNAP Binary](https://github.com/storj-thirdparty/qnap-storagenode-app/releases/latest)  - NOTE: This version(V1.1.4) is not compatible with any QTS version higher than 5.0

## Sharing Capacity Prerequisites

1. Navigate to QNAP App Center application, by double clicking on its icon on the QNAP Desktop Homepage.

1. Click "Install Manually" and click on the QNAP Package (downloaded above) to install the QNAP Storj application onto the device.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/2_N44-j5CDn6cZiLzoCVG_spaces.png)

1. Hit **accept** when prompted to accept that the application has no official digital signature:

Once the installation is completed, the Storj Storage Node app will be available through the App Center, as well as be visible on the desktop.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/1uAYJpLKzzU09nFBE3owp_image.png)

{% callout type="info" title="Don't see the Storj app?" %}

Go to **Control Panel** -> **Privileges**, double click the storage node app and put a checkmark in the **Allow** box of the user you're logging in with. After that it should appear in the start menu.
{% /callout %}

1. Open the application, and click "Wizard" in the sidebar. You will be prompted with a walkthrough of the application, like so:

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/9mKBXGbXoQJ95ywE_mbBL_image.png)

1. Enter your email address that you would like associated with notifications for your node:

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/kfnmhfsVG_k61weJPvi4a_image.png)

1. Add your [ERC-20 Token Compatible Wallet Address](https://support.storj.io/hc/en-us/articles/360026611692-How-do-I-hold-STORJ-What-is-a-valid-address-or-compatible-wallet-) for payouts.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/4nmAYwFJUzivgihR-NruY_image.png)

1. Configure Storage Allocation, and set the amount of excess storage capacity you would like to share with the network.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/LWmWZBADgrai71-5EQDp9_image.png)

1. Input a selected Storage Directory (which specifies the path where the data will be stored).

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/DGiiifk0J5D7xotc04dp9_image.png)

1. Configure the external [](docId:y0jltT-HzKPmDefi532sd)

   This allows the connection for the Storj Network to come in, and communicate with the software running on the NAS.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/jZ8twzcfbWd-AnTpKMprj_image.png)

1. Set the location for your node's identity certificate, like so:

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/hIJRyypNup8zNmjTzKq7F_image.png)

1. Hit **finish**, and you have successfully completed that setup wizard for your QNAP device.

## Run the Application

After following the configuration steps above,

1. Click **Start My Storage Node**

   Look for the log output, which indicates that the image is running.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/AoZkAsmxNVvt8HkJX-h-K_image.png)

1. You have successfully shared your excess capacity on your QNAP Device with the Storj Network.

1. Click the Dashboard Option to view your current stats - and keep an eye on that payout address!
