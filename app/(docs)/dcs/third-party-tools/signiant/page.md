---
title: Signiant
docId: zee9naNah3eech7ied7na
tags:
  - content-delivery
metadata:
  title: Guide for Signiant Integration
  description:
    A guide on how to configure and use Signiant with Storj.
---

## Integration

To integrate Storj with Signiant, you will need to create S3 credentials in Storj and add them within Signiant.

### Requirements

- An active Storj account
- A bucket for use with Signiant in your Storj instance
- An active Signiant Management Console account

---

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://www.storj.io/signup?partner=Signiant> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting Signiant to Storj

### Cloud Credentials Configuration


{% callout type="info"  %}
Important: 
From Signiant’s S3 Compatible documentation [source](https://help.signiant.com/media-shuttle/account-administration/storage/cloud-storage/s3-compatible-storage#adding-s3-compatible-storage): 
“For best performance, ensure that SDCX Server software is installed on a server near your S3 compatible storage location.”  

The lower the latency between the SDCX server and Storj’s endpoint (gateway.storjshare.io) is, the better the throughput will be.  

The performance achieved in the [Storj + Signiant blog post](https://www.storj.io/blog/signiant-performance-testing-achieves-multi-gigabit-transfers-on-storj) 
was from a SDCX server installed on a [Vultr](https://www.vultr.com/) instance located in the same city where a Storj endpoint was running.  

Vultr’s [“Looking Glass”](https://lax-ca-us-ping.vultr.com/) ping test can be used to see which Vultr locations have single-digit-ms latency to gateway.storjshare.io.
{% /callout %}


1. Log into the Signiant Media Shuttle management console: [https://manage.mediashuttle.com/](https://manage.mediashuttle.com/)

1. Go to **Storage** - **Add**
![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/signiant/signiant-image3.png)

1. Select **S3 Compatible**
![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/signiant/signiant-image1.png)


1. Select a SDCX server, then enter in all of the S3 information:
   - **Service Endpoint**: gateway.storjshare.io
   - **Bucket**: your-bucket-name
   - **Subfolder**: your-prefix-name
   - **Access Key**: your-access-key
   - **Secret Key**: your-secret-key
   - **Access Parameters**: Check **Use SSL** and Bucket Access Style **Virtual Host**
![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/signiant/signiant-image4.png)

1. Assign the newly created storage to the Media Shuttle Portal by clicking **Assign**
![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/signiant/signiant-image2.png)
