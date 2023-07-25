---
title: Store Tesla Sentry Mode & Dashcam videos on Storj DCS
createdAt: 2022-05-19T18:15:05.000Z
updatedAt: 2023-04-03T18:49:54.000Z
docId: XjYoGwaE6ncc3xTICXOOu
redirects:
  - /dcs/how-tos/tesla-sentry-mode-teslausb
pageTitle: Tesla Sentry Mode & Dashcam videos
---

## Introduction

In this How To, we'll demonstrate how to automatically transfer Tesla Sentry Mode and Dashcam video clips over WiFi to Storj DCS and make room for more videos the next day. We'll use a Raspberry Pi (a small, low cost, low power computer) plugged into the USB port in the dashboard to store the video files. When the Tesla pulls into your garage at night, the Raspberry Pi will connect via WiFi and upload all the videos to Storj DCS, then clear off the drive for use the next day. This will also work for videos recorded in Track Mode if you have one of the performance models, and you can easily share any of the videos with your friends.

## What you'll need

You'll need some hardware, some software and a Storj DCS account for this project.

## Hardware required

All in, you’re looking at right around $60 of hardware to get going (prices as of April 2021). Here’s the hardware you’ll need:

*   [Raspberry Pi Zero W : ID 3400 : $10.00](https://www.adafruit.com/product/3400) (We used a different model, but this is better)

*   [Adafruit Raspberry Pi Zero Case : ID 3252 : $4.75](https://www.adafruit.com/product/3252) (It should look good - you can 3d print your own for extra credit)

*   [SanDisk 256GB High Endurance Video microSDXC Card $37 ](https://www.amazon.com/SanDisk-Endurance-microSDXC-Adapter-Monitoring/dp/B07P4HBRMV)(Very important to have high quality storage with high write endurance. This gives you room for a few days in case you don’t connect to WiFi and won't wear out too quickly)

*   [USB Cable to plug into the car](https://www.adafruit.com/product/592)  USB A to Micro-B - 3 foot long

*   [Storj DCS cloud storage](https://www.storj.io) - Secure, private and decentralized.&#x20;

Optional hardware for easier setup:

*   [Mini HDMI to HDMI Cable - 5 feet : ID 2775: $5.95](https://www.adafruit.com/product/2775) Makes it easier to set everything up by connecting the Pi to a monitor

### Software required

The code used in this tutorial is open source and uses, among other things, [Rlcone](https://github.com/rclone/rclone) which includes native support for Storj DCS. The GitHub Repository for the code is available at: <https://github.com/marcone/teslausb> and the project was originally described on the [/r/teslamotors](https://www.reddit.com/r/teslamotors/comments/9m9gyk/build_a_smart_usb_drive_for_your_tesla_dash_cam/) subreddit.&#x20;

### Storj DCS Account

If you have not yet signed up, please [do so now](https://storj.io/signup).

## Step-by-step guide

Using the software in the [teslausb](https://github.com/marcone/teslausb) project with Storj DCS is a multipart process, we will accomplish the following:

*   Generate Credentials for Storj DSC
    *   This occurs through the [storj.io]() website

*   Configure your Raspberry Pi with the teslausb kit
    *   Part 1 - One-step setup
        *   This is done by flashing a preconfigured Raspbian image and then filling out a config file.

    *   Part 2 - Rclone Configuration with Storj DCS via hosted Gateway MT
        *   This is done by accessing the Pi via SSH and installing/configuring Rclone

### Sign Up for a Storj DCS Account

If you have not yet signed up, please head here to[ sign up for the free tier.](https://www.storj.io/signup)&#x20;

{% callout type="info"  %} 
Please consult [](docId\:nGzxQBhV8nx5Pukj6O0zT) for details on setting up an account and using the Satellite Admin Console.
{% /callout %}

### Generate Credentials to the Gateway MT

**Navigate to the Access** page within your project and then click on **Create S3 Credentials**. A modal window will pop up where you should enter a name for this access grant.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/02Sc23bYY6ck4tjYrzlIV_tesla.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/LpyTBi_2N18mWja2fJ5m9_tesla2.png)

**Assign the permissions** you want this access grant to have, then click on **Encrypt My Access**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/66eO3SJy71s90en2nLrxC_tesla5.png)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you.)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/HXh6bgiEar2FhwMCuVMg8_tesla6.png)

Click either on the **Copy to clipboard** link or **Download .txt** and then confirm that you copied your Encryption Phrase to a safe place.

{% callout type="info"  %} 
Please ***save*** this **Encryption Passphrase** in a safe place as it will be required to decrypt and view your sentry mode videos from the web.&#x20;
{% /callout %}

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/ElpzbwDB96FCM8TqKXQte_tesla7.png)

Click the **Create my Access** link to finish generating of S3 credentials.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Cpk1IzKHX4r9A7Kh0Jw8C_tesla8.png)

**Copy** your **Access Key, Secret Key,** and **Endpoint** to a safe location. We will use this information later to configure Rclone with the hosted Gateway MT.&#x20;

Now we have our **credentials** and can move on to configuring teslausb.

### Overview of credentials collected&#x20;

*   **Encryption Passphrase**&#x20;
    *   We will need this to view and/or retrieve clips in the browser later

*   **Access Grant**
    *   Not used for this lab but please record it anyway for your reference

*   Gateway MT (S3) Credentials
    *   Used to connect to the hosted gateway via Rclone
        *   **Access Key**

        *   **Secret Key**

        *   **Endpoint**

{% callout type="info"  %} 
Learn more about [](docId\:bNywu7-9KLjYfk5LBQABx) on Storj DCS and using [](docId\:XKib9SzjtEXTXWvdyYWX6).&#x20;
{% /callout %}

### Configure teslausb

Teslausb is the open source software that will run on the Raspberry Pi to send your videos to Storj DCS. Now that you have your gateway credentials for Storj DCS, you need to set up teslausb on the Raspberry Pi and configure it for use with those Storj DCS credentials.

### Part 1 - One-step setup

You'll find the one-step setup guide for testlausb in this GitHub repo: <https://github.com/marcone/teslausb/blob/v2.5/doc/OneStepSetup.md>

**Quick Instructions**

1.  Download the latest release of the pre-built image from the repository’s releases page: <https://github.com/marcone/teslausb/releases/latest>

2.  Flash the image to the SD card you plan on using in your Raspberry Pi. For this we can use belena Etcher (<https://www.balena.io/etcher/>) or any similar image flashing software, you can find some examples [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

3.  Mount the SD card to edit the initial configuration file located in the `boot` directory. Create a `teslausb_setup_variables.conf`A sample config file is located in the `boot` folder on the SD card. The latest sample is also available from GitHub via [pi-gen-sources/00-teslausb-tweaks/files/teslausb\_setup\_variables.conf.sample](https://github.com/marcone/teslausb/blob/main-dev/pi-gen-sources/00-teslausb-tweaks/files/teslausb_setup_variables.conf.sample).

4.  Specifically, set the \`ARCHIVE\_SYSTEM\` to \`none\`. This is because we need to boot the Pi to install some additional software to push our sentry clips in Storj DCS. Please also set your Wifi settings. Save the file when you are done editing.

Below is a small portion of the config file showing 'export ARCHIVE\_SYSTEM=none' as well as the wifi settings.&#x20;

```Text
# Variables for CIFS (Windows/Mac file sharing) archiving
export ARCHIVE_SYSTEM=none
export ARCHIVE_SERVER=your_archive_name_or_ip
export SHARE_NAME=your_archive_share_name
export SHARE_USER=username
export SHARE_PASSWORD=password
# the cifs options below usually don't need to be specified
# export SHARE_DOMAIN=domain
# export CIFS_VERSION="3.0"
# export CIFS_SEC="ntlm"


# Wifi setup information. Note that Raspberry Pi Zero W only supports 2.4 GHz wifi.
# If you are you are trying to connect to a network with a _hidden_ SSID,
#   edit /boot/wpa_supplicant.conf.sample and un-comment the indicated line.
export SSID='your_ssid'
export WIFIPASS='your_pass'

```

### Part 2 - Rclone Configuration

Now that Raspbian is installed and configured, it's time to set up Rclone, the software that will actually transfer the files from the Raspberry Pi to Storj DCS. (If you're not familiar with [Rclone](https://github.com/rclone), it's Rsync for cloud storage.)  Boot up that Pi and let' s keep it moving.

The Rclone Setup Guide for teslausb is available at: <https://github.com/marcone/teslausb/blob/v2.5/doc/SetupRClone.md>

The steps you need to follow are also provided below:

**SSH** into the Pi, become root and remount the file system's read-write:

```Text
sudo -i
/root/bin/remountfs_rw
```

**Install** Rclone:&#x20;

```Text
curl https://rclone.org/install.sh | sudo bash
```

**Configure** Rclone with the settings and Storj DCS gateway credentials created above:

```Text
# setup rclone
rclone config
# select n (New Remote)
# name
storj-dcs-us1-gateway
# select 4 (4 / Amazon S3 Compliant Storage Provider)
4
# select 13 (13 / Any other S3 compatible provider)
13
# select 1 (1 / Enter AWS credentials in the next step \ "false")
1
# enter access key
<access_key>
# enter secret key
<secret_key>
# select 1 ( 1 / Use this if unsure. Will use v4 signatures and an empty region.\ "")
1
# enter endpoint (use your own endpoint, the example shows the Americas region gateway)
https://gateway.us1.storjshare.io
# use default location_constraint 
# use default ACL
# edit advanced config
n
# review config and select default
# quit config
q
```

**Create** a bucket tesla-m3-cam for saving clips:

```Text
# make bucket
rclone mkdir storj-dcs-us1-gateway:tesla-m3-cam
```

Update your `teslausb_setup_variables.conf`file in the boot directory with the following information. Ensure your Wifi variables are also set. If your variables have any spaces, please put your variables in quotes like this: "variable"

```Text
# Variables for rclone archiving
export ARCHIVE_SYSTEM=rclone
export RCLONE_DRIVE=storj-dcs-us1-gateway
export RCLONE_PATH=tesla-m3-cam
# The following is optional
#export RCLONE_FLAGS=()
```

Shut down your Pi and plug it into your Tesla: If you are using a RPi4, you only need to plug the Pi via its USB-C cable into one of the Tesla's USB-C ports, this will provide power and data transfer. If using a RPi Zero W, you will need to use the usb/data USB port on the Pi.

To test that everything is set up correctly, you can navigate to the Pi’s web interface at \<rpi ip address>:80. Enable ***Honk to Save Clips*** on your Tesla, and then under the Tools page of your Raspberry Pi’s web interface, click the ***Trigger archive/sync*** button.

Follow along on the **Archive log** page to see your clips being acknowledged and pushed to Storj DCS.

Finally, log in to your Storj DCS account and take advantage of the [](docId:4oDAezF-FcfPr0WPl7knd) to manage and share your clips!
