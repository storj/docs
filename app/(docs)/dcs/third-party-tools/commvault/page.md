---
title: Commvault
docId: zohpei7doongeiNg9caiy
tags:
  - backup
metadata:
  title: Guide for Commvault Integration
  description:
    A guide on how to download, configure, and use Commvault's backup solutions
    to integrate with Storj for fast and efficient backups.
---

## Integration

To integrate Storj with Commvault, you will need to create S3 credentials in Storj and add them within Commvault.

### Requirements

- An active Storj account
- A bucket for use with Commvault in your Storj instance
- An active Commvault account
- Commvault MediaAgent installed and connected to CommCell server or Metallic.io


Download a [free trial](https://www.commvault.com/free-trial-form) of Commvault or [sign up for a Demo](https://www.commvault.com/request-demo).

Trial users using Metallic.io may obtain a MediaAgent by performing a File Server installation.

---

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://www.storj.io/signup?partner=commvault> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting Commvault to Storj

### Cloud Credentials Configuration

1. Log in to the Commvault Command Center or Metallic.io web console

1. From the navigation pane on the left, click **Manage** then **Security**

1. On the **Security** page, click **Credential Vault**, then click **Add**

1. On the resulting **Add credential** page configure the following fields:
   * **Account type** : "Cloud Account"
   * **Vendor type** : "S3 Compatible Storage"
   * **Credential name** : Any name you choose
   * **Access key ID** : The Access Key ID you generated in Storj
   * **Secret access key** : The Secret Access Key you generated in Storj
   * **Description** : Any description you choose

1.  Click **Save**

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Commvault%20add%20credential.png)


### Cloud Storage Configuration

1. From the navigation pane on the left, click **Storage** then **Cloud**

1. On the Cloud Storage page, in the upper right, click **Add** 

1. On the resulting **Add cloud storage** page configure the following fields:
   * **Type** : "S3 Compatible Storage"
   * **Name** : Any name you choose
   * **MediaAgent** : The MediaAgent you wish to use for this storage
   * **Service host** : "gateway.storjshare.io"
   * **Credentials** : Select the credentials you created in the previous section
   * **Bucket** : The name of the bucket you created in Storj
   * **Use deduplication**:  Unselect or configure as desired

1.  Click **Save**

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Commvault%20add%20cloud%20storage.png)


### Backup Configuration

1.  Storj should now be available as a storage target for your Commvault backups.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Commvault%20storage%20location.png)
