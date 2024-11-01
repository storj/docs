---
title: Aspera
docId: eicohT4Eichoquoyah9ae
tags:
  - content-delivery
metadata:
  description: Learn how to use Storj with Aspera.
  title: 'Using Storj with Aspera'
---

## Integration

To integrate Storj with Aspera, you will need to create S3 credentials in Storj and add them within Aspera.

This document is written for IBM Aspera HSTS version 4.4.4 on Redhat Linux.

### Requirements

- An active Storj account
- A bucket for use with IBM Aspera in your Storj instance
- An valid install of IBM Aspera High Speed Transfer Server

---

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://www.storj.io/signup?partner=Aspera> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting Aspera to Storj

These instructions are designed for IBM Aspera HSTS on Redhat.

### Creating a Document Root for Storj in Aspera

Aspera user interfaces allow dynamic connections to Amazon S3, but not to S3 compatible endpoints such as Storj.
Because of this limitation, it it necessary to configure an Aspera HSTS with a document root to connect to Storj.
This document root will allow Aspera users to connect to Storj transparently without complex client configuration.

```
# vi /opt/aspera/etc/aspera.conf
```

```
<?xml version='1.0' encoding='UTF-8'?>
<CONF version="2">
...
    <default>
        <file_system>
            <access>
                <paths>
                    <path>
                        <absolute>s3://[access_key_id]:[secret_key]@gateway.storjshare.io/[bucket]</absolute>
                        <dir_allowed>true</dir_allowed>
                        <read_allowed>true</read_allowed>
                        <write_allowed>true</write_allowed>
                    </path>
                </paths>
            </access>
        </file_system>
    </default>
...
</CONF>
```


### Edit Aspera S3 Properties to Require HTTPS

For security reasons, Storj requires all S3 compatible traffic to use HTTPS rather than HTTP.
Aspera's default configuration attempts to connect to S3 service via HTTP, which is incompatible with Storj.
Update Aspera's `s3.properties` file to require HTTPS.

```
# vi /opt/aspera/etc/trapd/s3.properties
```

```
# Set to true to use HTTPS for s3 storage
# Default is false
s3service.https-only=true
```

### Testing Storj + Aspera Integration Locally

You may test these settings on the HSTS server itself by running the `ascp` command:

```
# ascp -P 33001 -v [testfile] localhost:/
```

If you're not testing under an account authorized for use with Aspera, you can use the following format:

```
# ascp -P 33001 -v [testfile] [account]@localhost:/
```