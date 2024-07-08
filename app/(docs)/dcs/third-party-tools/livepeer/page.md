---
title: Livepeer
tags:
  - content-delivery
metadata:
  title: Workshop - Global Video Content Delivery with Storj and Livepeer
  description: >-
    Learn to build a completely decentralized, fast video content delivery
    service. With over tens of thousands of Storj nodes around the world, see how
    simple it can be to remove your reliance on centralized providers.
docId: S-xrhs_X1YHLh4CmwOt2T
redirects:
  - /dcs/how-tos/video-content-delivery-with-storj-and-livepeer
---

Learn to build a completely decentralized, **fast** video content delivery service. With over tens of thousands of Storj nodes around the world, see how simple it can be to remove your reliance on centralized providers. Gain a solid understanding of the steps required to host video files from Storj (an object storage provider) and transcode them with the Livepeer API.

First we'll set up a Storj and Livepeer account, then we'll transcode and view videos completely with decentralized technology!

## Storj Account

## Create a Storj Account

To begin, you will need to create a Storj account. If you already an account, go to <https://storj.io/login>.

Navigate to <https://storj.io/signup> to sign up. Enter your full name, email address, and a password, as shown below:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/x1VMINrRdadrVk5vLXIBT_capture.PNG)

### Install uplink

Storj has [S3 compatibility](docId:AsyYcUJFbO1JI8-Tu8tW3) that can be used familiar tools such aws-cli, but it has some limitations such that it uses a gateway to communicate to the global network. In order to communicate directly with Storage Nodes we'll be using Storj's `uplink` tool.

Run the following to install uplink:

Linux AMD64

```shell
curl -L https://github.com/storj/storj/releases/latest/download/uplink_linux_amd64.zip -o uplink_linux_amd64.zip
unzip -o uplink_linux_amd64.zip
sudo install uplink /usr/local/bin/uplink
```

For different uplink binaries see [](docId:hFL-goCWqrQMJPcTN82NB)

### Create Access Grant

Next you'll need to generate an access grant to be able to use uplink.

Create an Access Grant in the Storj web console:

1.  Navigate to “Access” on the left side menu

2.  Click “Create Access Grant” under the Access Grant block.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/zSzwufHPzUnaoHThKccBx_screenshot-2023-02-28-at-20538-pm.png)

3\. When the Create Access screen comes up, set specifications according to the following guidelines:

- **Type:** Access Grant

- **Name:** The name of the credentials (e.g. My Access Grant)

- **Permissions:** All

- **Buckets:** Feel free to limit the grant to a specific bucket or leave as “All”

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/d49yH5Krbqdh6Sd-vA8k1_screenshot-2023-02-28-at-20757-pm.png)

4\. Select "Encrypt My Access"

5\. Set an encryption passphrase and agree to the prompt

{% callout type="info"  %}
Use the same encryption passphrase for the access grant as the one you used for the web console in order to view your files in both places
{% /callout %}

6\. Run the setup command

```shell
uplink setup
```

7\. Copy the access grant from the web console and paste it into the uplink prompt

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/DprSGo1J0M5JVqqTqkLnK_screenshot-2023-02-28-at-21135-pm.png)

### Create a bucket

Once you have your Storj account and uplink configured, you create a Storj bucket which will hold the input and output files for the Livepeer transcoder.

Use `uplink mb` to create a bucket called `livepeer`

```shell
uplink mb sj://livepeer
```

Download a video file to upload to your newly created bucket. You can use [this one](https://link.storjshare.io/s/jxztgqgoyipublszkwo4e2gg5n4a/livepeer/global-upload.mp4).

```shell
wget https://link.storjshare.io/raw/jxztgqgoyipublszkwo4e2gg5n4a/livepeer/global-upload.mp4
```

Upload the video to be used as a source file in the transcoder later.

```shell
uplink cp global-upload.mp4 sj://livepeer/
```

Finally, create S3 compatible credentials.

```shell
uplink share --register --readonly=false --not-after=none sj://livepeer
```

The output will print the `Access Key ID` and Secret Key that will be used in the `livepeer-req` script below.

## Livepeer Account

Complete the [Livepeer quickstart guide](https://docs.livepeer.org/guides/developing/quickstart) to get a Livepeer API key to use in the `livepeer-req` script below.

## Transcode video files to a desired format and resolution

Copy the shell script below into a file called `livepeer-req`.

```shell
#!/bin/bash

LIVEPEER_API_KEY="<LIVEPEER API KEY>"
STORJ_ACCESS_KEY_ID="<STORJ ACCESS KEY>"
STORJ_SECRET_ACCESS_KEY="<STORJ SECRET KEY>"

curl --location --request POST 'https://livepeer.studio/api/transcode' \
--header "Authorization: Bearer $LIVEPEER_API_KEY" \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": {
        "type": "s3",
        "endpoint": "https://gateway.storjshare.io",
        "credentials": {
            "accessKeyId": "'"$STORJ_ACCESS_KEY_ID"'",
            "secretAccessKey": "'"$STORJ_SECRET_ACCESS_KEY"'"
         },
        "bucket": "livepeer",
        "path": "/global-upload.mp4"
    },
    "storage": {
        "type": "s3",
        "endpoint": "https://gateway.storjshare.io",
        "credentials": {
            "accessKeyId": "'"$STORJ_ACCESS_KEY_ID"'",
            "secretAccessKey": "'"$STORJ_SECRET_ACCESS_KEY"'"
        },
        "bucket": "livepeer"
    },
    "outputs": {
        "hls": {
            "path": "/resized/hls"
        }
    },
    "profiles": [
    {
        "name": "480p0",
        "fps": 24000,
        "fpsDen": 1001,
        "bitrate": 1600000,
        "width": 854,
        "height": 480,
        "gop": "2.0",
        "profile": "H264High"
    },
    {
        "name": "720p0",
        "fps": 0,
        "bitrate": 3000000,
        "width": 1280,
        "height": 720,
        "gop": "2.0",
        "profile": "H264ConstrainedHigh"
    }
]
}'
```

In the `livepeer-req`, populate `LIVEPEER_API_KEY`, `STORJ_ACCESS_KEY_ID`, and `STORJ_SECRET_ACCESS_KEY` with the access credentials from each platform.

Notice the livepeer API takes a json object with the following keys:

`input` has been set to read the `global-upload.mp4` video file and `livepeer` bucket created earlier.

`storage` is where the transcoded file will be uploaded to

`outputs` specifies the output path of `resized/hls`

`profiles` are options for the transcoded which is set to make a 480p and 720p video

Next you'll want to run your `livepeer-req` script to start the transcoding process.

```shell
chmod +x livepeer-req
./livepeer-req
```

It usually takes 1 to 3 minutes before your transcoded videos show output directory of `/resized/hls`

Livepeer will upload transcoded files as it goes. You can check on the progress by running `uplink ls`

```shell
uplink ls sj://livepeer/resized/hls
```

## View video files

Storj doesn’t have the same sort of concept of public buckets that S3 has. We support public access, but it’s able to be more fine-grained than at the bucket level with link sharing. Generating a `LINKSHARINGKEY` will make a certain path of the bucket public (anyone with the link can see the file).

Let's make the `resized` directory public so we can easily see the videos by running the following:

```shell
uplink share --url --public --readonly=true --disallow-lists --not-after=none sj://livepeer/resized
```

You’ll get a Browser URL, but the URL is not quite right. It will be of the form `https://link.storjshare.io/s/LINKSHARINGKEY/livepeer/`. To make the content embeddable, swap the `/s/` for `/raw/`.

Livepeer transcoded the source video file to `hls` video files which means that in order to play the video, we'll need to find the `index<profile name>.m3u8` and pass it to a compatible video player.

We'll use the Livepeer player (`lvpr.tv`) to view the `index480p0.m3u8` video.

Replace the `LINKSHARINGKEY` in the url below, and you'll be able to see your transcoded video!

`lvpr.tv/?url=https://link.storjshare.io/raw/LINKSHARINGKEY/livepeer/resized/hls/index480p0.m3u8`
