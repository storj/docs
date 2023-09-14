---
title: PixelFed
tags:
  - content-delivery
docId: SboATM5Y5-lWay0Zg-k4T
redirects:
  - /dcs/pixelfed
metadata:
  title: Configuring PixelFed with Storj
  description:
    Detailed guide on configuring PixelFed with Storj, with steps including
    creating a Storj bucket, generating S3 compatible and linksharing credentials,
    and setting up the PixelFed environment.
---

We have a webinar walking you through it, but you can also refer to the steps below:

{% youtube-embed videoId="K-Zmgt6KtzI" /%}

The things you need here are:

- A Storj bucket

- S3 compatible credentials

- Linksharing credentials for public access

Because of the linksharing credentials part, the easiest way to generate all of the things you need is through our uplink CLI.

After downloading and installing the [](docId:hFL-goCWqrQMJPcTN82NB) (so that `ls`, `mb`, `cp`, etc work), you can use the following steps:

```shell
uplink mb sj://pixelfed
```

In subsequent steps it'll be referred to as `BUCKET`.

To generate S3 compatible credentials `Access Key ID` and `Secret Key`, run

```shell
uplink share --register --readonly=false --not-after=none sj://BUCKET
```

Along with the credientials, the output will have the AWS endpoint you'll need to set which is <https://gateway.storjshare.io>.

Storj doesn’t have the same sort of concept of public buckets that S3 has. We support public access, but it’s able to be more fine-grained than at the bucket level. To generate `LINKSHARINGKEY` you can do

```shell
uplink share --url --readonly --disallow-lists --not-after=none sj://BUCKET
```

You’ll get a Browser URL, but the URL is not quite right. It will be of the form `https://link.storjshare.io/s/LINKSHARINGKEY/BUCKET/`. To make the content embeddable, swap the `/s/` for `/raw/`. This url should be used as the AWS alias host or AWS url.

In the [PixelFed environment](https://docs.pixelfed.org/running-pixelfed/installation/#configure-environment-variables), we'll use this url for `AWS_URL`.

Set `PF_ENABLE_CLOUD=true` and `FILESYSTEM_DRIVER=s3`

Your PixelFed S3 Configuration will look like this

```ini
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=s3
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=SECRET_KEY
AWS_DEFAULT_REGION=global
AWS_BUCKET=BUCKET
AWS_URL=https://link.storjshare.io/raw/LINKSHARINGKEY/BUCKET
AWS_ENDPOINT=https://gateway.storjshare.io
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

Reload config and restart PixelFed services

```shell
sudo php artisan config:cache
sudo systemctl restart pixelfed nginx php8.1-fpm.service
```
