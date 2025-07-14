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

Refer to Aspera's [Setup and Configuration in Amazon S3](https://www.ibm.com/docs/en/ahts/4.4.x?topic=sutos-setup-configuration-in-amazon-s3-1) 
documentation for more detailed configuration.

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
# asconfigurator -x "set_user_data;user_name,[account];absolute,s3://[s3_account_id]:[s3_secret_key]]@gateway.storjshare.io/[bucket]"
```


### Install the Aspera Trapd Service

The Aspera Trapd service enables Aspera to write to object storage.  
If you have not previously enabled it, run the following command.

```
dnf install initscripts chkconfig
/opt/aspera/bin/astrap-config.sh enable
```

You may alternatively create a similar `file_system` node beneath the `default` tag to enable Storj for all accounts.


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

After restarting the Aspera service, you should be able to test local transfers to Storj using the following command:

```
# systemctl restart asperanoded
# ascp -P 33001 -v [testfile] [account]@localhost:/
```
