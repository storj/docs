---
title: Mastodon
docId: ThG-lYh8tu_EjNUcVqVK9
tags:
  - content-delivery
redirects:
  - /dcs/ThG--mastodon
metadata:
  title: Mastodon integration guide
---

We have a webinar walking you through it, but you can also refer to the steps below:

<https://youtu.be/2OFB1fKoQss?t=14>

The following instructions have been tested with Mastodon 4.0.2.

The things you need here are:

- A Storj bucket

- S3 compatible credentials (access key and secret key)

- Linksharing credentials for public access

Because of the linksharing credentials part, the easiest way to generate all of the things you need is through our uplink CLI.

After downloading and installing the [](docId:hFL-goCWqrQMJPcTN82NB) (so that `ls`, `mb`, `cp`, etc work), you can use the following steps:

To make a bucket, you can choose the bucketname, like `mastodon`, and do

```shell
uplink mb sj://mastodon
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

For Mastodon to use this url we'll need to set the `S3_ALIAS_HOST` setting (which seems to support path prefixes crammed in there as well). Note the lack of `https://` and the lack of trailing slash below.

Once you have these things, you should be able to plop this configuration in to your Mastodon’s `.env.production` configuration and you should be all set.

```ini
S3_ENABLED=true
S3_PROTOCOL=https
S3_REGION=global
S3_ENDPOINT=https://gateway.storjshare.io
S3_HOSTNAME=gateway.storjshare.io
S3_BUCKET=BUCKET
S3_ALIAS_HOST=link.storjshare.io/raw/LINKSHARINGKEY/BUCKET
AWS_ACCESS_KEY_ID=ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=SECRET_KEY
```

If you’re doing the `rake mastodon:setup` wizard and Storj isn't listed, choosing `Minio` as your object storage provider and telling it you do want to access the uploaded files from your own domain should allow you to set the same settings in the setup wizard.

Of course, these instructions mean all your media will be served from [link.storjshare.io](http://link.storjshare.io/), and maybe you don’t like that. You can always follow [our instructions for sharing a bucket via DNS settings for your own domain name](https://docs.storj.io/dcs/how-tos/host-a-static-website/host-a-static-website-with-the-cli-and-linksharing-service/). If you do that, you’d replace `S3_ALIAS_HOST` with your domain name backed by Storj.
