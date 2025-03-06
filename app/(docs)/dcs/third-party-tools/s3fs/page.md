---
title: s3fs
docId: cJm_o93WkIvh0qm40oBlV
tags:
  - file-management
redirects:
  - /dcs/how-tos/how-to-connect-s3fs-to-storj-dcs
metadata:
  title: Connecting s3fs to Storj
  description:
    Learn how to connect s3fs to Storj, create and mount a bucket, and
    ensure the bucket is available on boot. Also, explore alternative uses with rclone.
---

## Prerequisites

- S3 compatible credentials (see [](docId:AsyYcUJFbO1JI8-Tu8tW3)).

## Install s3fs

See [https://github.com/s3fs-fuse/s3fs-fuse](https://github.com/s3fs-fuse/s3fs-fuse#installation) for installation instructions for your OS.

## Configure s3fs to use Storj S3 Gateway

You can use either [](docId:EGM8O-1xt2Az03eBWT8Rf) or [](docId:yYCzPT8HHcbEZZMvfoCFa). You only need S3 compatible credentials and endpoint.

## Create the credentials file

Please substitute your own **Access Key ID** instead of `ACCESS_KEY_ID` and your own **Secret Access Key** instead of `SECRET_ACCESS_KEY` in the example below:

```Text
echo ACCESS_KEY_ID:SECRET_ACCESS_KEY > ${HOME}/.passwd-s3fs
chmod 600 ${HOME}/.passwd-s3fs
```

### Create a bucket

First you will want to [create a bucket](docId:pxdnqsVDjCLZgeEXt2S6x).

## Mount a bucket to the folder

Create a folder:

```Text
sudo mkdir /mnt/my-bucket
sudo chown myuser /mnt/my-bucket
```

Mount a bucket to the folder. We will assume that you created a bucket `my-bucket` earlier. We will use the endpoint `https://gateway.storjshare.io` here, as this will [](docId:yYCzPT8HHcbEZZMvfoCFa)automatically.

If you use the [](docId:EGM8O-1xt2Az03eBWT8Rf), then the endpoint could be `http://localhost:7777` (depends on your configuration and infrastructure).

```Text
s3fs my-bucket /mnt/my-bucket -o passwd_file=${HOME}/.passwd-s3fs -o url=https://gateway.storjshare.io -o use_path_request_style
```

## Mount a bucket to the folder on boot

You should make sure that the credentials file is available for the root on boot time. You can create it in the `/etc/` folder:

```Text
sudo echo ACCESS_KEY_ID:SECRET_ACCESS_KEY > /etc/passwd-s3fs
sudo chmod 0640 /etc/passwd-s3fs
```

Then add the following to `/etc/fstab`:

```Text
my-bucket /mnt/my-bucket fuse.s3fs _netdev,allow_other,use_path_request_style,url=https://gateway.storjshare.io 0 0
```

Check that it is working - The command:

```Text
sudo mount -a
```

should not return any error. Next, check that your Storj bucket is mounted:

```Text
df -HT
```

Now you can use the mounted bucket almost as any folder.

## See also

We recommend having a look at [](docId:LdrqSoECrAyE_LQMvj3aF) and its [`rclone mount` command](https://rclone.org/commands/rclone_mount/) as well.

Please note - you can configure a native connector in rclone, (see: [](docId:Mk51zylAE6xmqP7jUYAuX)) and use [](docId:Pksf8d0TCLY2tBgXeT18d), unlike [](docId:yYCzPT8HHcbEZZMvfoCFa) which uses[](docId:hf2uumViqYvS1oq8TYbeW) to provide a S3-compatible protocol (the S3 protocol does not use client side encryption by design).
