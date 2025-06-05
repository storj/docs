---
title: Rubrik
docId: Leaghoh7nooc4oom9sesh
tags:
  - backup
metadata:
  title: Guide for Rubrik Integration
  description:
    A guide on how to configure and use Rubrik's backup solutions 
    to integrate with Storj for fast and efficient backups.
---

## Integration

To integrate Storj with Rubrik, you will need to create S3 credentials in Storj and add them within Rubrik.

### Requirements

- An active Storj account
- A bucket for use with Rubrik in your Storj instance
- An active Rubrik Security Cloud (RSC) account and installation

---

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://www.storj.io/signup?partner=rubrik> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting Rubrik to Storj

### Cloud Credentials Configuration

1. Log into your Rubrik Security Cloud (RSC) Account:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image1.png)

1. Go to **Settings**:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image3.png)

1. Go to the **Archival & Storage** dropdown and select **Data Center Archival Locations**:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image2.png)

1. In **Create Archival Location**, select **Object Store (S3 Compatible)** and hit **Next**:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image5.png)

1. In **Select object store vendor**, select **Amazon S3 compatible** and hit **Next**:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image4.png)

1. Enter **Storage Information** and follow steps to add Archival Location:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image7.png)

1. Verify Archival **Status**:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image6.png)

1. Create or Edit SLA and turn **Archiving** to On:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image9.jpg)

1. Select your Storj **Archival Location**:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image8.png)

1. Select **Archiving Policy**:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image12.png)

1. Assign SLA to VMs; Hosts; etc. and begin backup snapshots and archiving.
You can view the **Events** tab in RSC to monitor backup snapshots and archiving.
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image10.png)
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image11.png)
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image13.png)

### Confirming backups via the Storj.io website

1. Once the backup snapshot indexing and Ransomware Threat Monitoring analysis (if enabled) are completed in RSC (you can view them in the events tab), Storj should look like this:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image14.png)

1. Everything is immutable and encrypted from within Rubrik:
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rubrik/image15.png)
