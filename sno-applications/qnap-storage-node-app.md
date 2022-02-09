---
description: Walkthrough for the Storage Node App setup on your QNAP NAS Device
---

# QNAP Storage Node App

In this guide, we are going to walk through the installation process for the Storage Node QNAP application for your QNAP NAS Device – enabling you to:

1. Monetize your excess capacity on the Storj Network
2. Back up your NAS Device to the Network using [Gateway-MT](https://docs.storj.io/getting-started/beta-gateway-mt) and any S3-compatible backup solution

For a video walkthrough of this process, please see below:&#x20;

{% embed url="https://www.youtube.com/watch?v=H6bRljVjR48" %}
Video Tutorial for the Setup Process
{% endembed %}

## Prerequisites:

* [x] [Storage Node Identity](../dependencies/identity.md)
* [x] Download the [QNAP Binary](https://github.com/storj-thirdparty/qnap-storagenode-app/releases/latest)

## Sharing Capacity Prerequisites

First, navigate to QNAP App Center application, by double clicking on its icon on the QNAP Desktop Homepage.

Next, click "Install Manually" and click on the QNAP Package (downloaded above) to install the QNAP Storj application onto the device.

![](https://firebasestorage.googleapis.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LiiXe2K6q6NwWAdegg5%2Fuploads%2F4Zy6PuZMzEkEAgSB5IZ0%2Ffile.png?alt=media)

Before installing, you will be prompted to accept that the application has no official digital signature: hit "accept"

Once the installation is completed, the Storj Storage Node app will be available through the App Center, as well as be visible on the desktop.

![The app is downloaded!](<../.gitbook/assets/image (9).png>)

{% hint style="info" %}
**Don't see the Storj app?**

Go to “**Control Panel** -> **Privileges**”, double click the storage node app and put a checkmark in the “**Allow**” box of the user you're logging in with. After that it should appear in the start menu.
{% endhint %}

Open the application, and click "Wizard" in the sidebar.  You will be prompted with a walkthrough of the application, like so:

![](<../.gitbook/assets/Screen Shot 2020-05-13 at 11.09.56 AM.png>)

First, enter your email address that you would like associated with notifications for your node:

![](<../.gitbook/assets/Screen Shot 2020-05-13 at 11.10.56 AM.png>)

Then, add your [ERC-20 Token Compatible Wallet Address](https://support.storj.io/hc/en-us/articles/360026611692-How-do-I-hold-STORJ-What-is-a-valid-address-or-compatible-wallet-) for payouts.

![](<../.gitbook/assets/Screen Shot 2020-05-13 at 11.11.36 AM.png>)

After, configure Storage Allocation, and set the amount of excess storage capacity you would like to share with the network.

![](<../.gitbook/assets/Screen Shot 2020-05-13 at 11.11.58 AM.png>)

After, input a selected Storage Directory (which specifies the path where the data will be stored).

![](<../.gitbook/assets/Screen Shot 2020-05-13 at 11.12.11 AM.png>)

Next, configure the external [Port Forwarding](../dependencies/port-forwarding.md) (this allows the connection for the Storj Network to come in, and communicate with the software running on the NAS).

![](<../.gitbook/assets/Screen Shot 2020-05-13 at 11.13.14 AM.png>)

After, set the location for your node's identity certificate, like so:

![](<../.gitbook/assets/Screen Shot 2020-05-13 at 11.13.28 AM.png>)

Hit finish, and you have successfully completed that setup wizard for your QNAP device.&#x20;

## Run the Application

After following the configuration steps above, click 'Start My Storage Node' and look for the log output, which indicates that the image is running.

![](<../.gitbook/assets/image (12).png>)

You have successfully shared your excess capacity on your QNAP Device with the Storj Network. &#x20;

Click the Dashboard Option to view your current stats - and keep an eye on that payout address!
