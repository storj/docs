---
title: Commvault
docId: zohpei7doongeiNg9caiy
tags:
  - backup
metadata:
  title: Guide for Commvault Integration
  description:
    A guide on how to download, setup, and use the free, open-source Cyberduck
    file manager to integrate and transfer files easily with Storj.
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

1. From the navigation pane on the left, click _Manage_ then _Security_

1. On the _Security_ page, click _Credential Vault_, then click _Add_

1. On the resulting _Add credential_ page configure the following fields:
   * _Account type_ : "Cloud Account"
   * _Vendor type_ : "S3 Compatible Storage"
   * _Credential name_ : Any name you choose
   * _Access key ID_ : The Access Key ID you generated in Storj
   * _Secret access key_ : The Secret Access Key you generated in Storj
   * _Description_ : Any description you choose

1.  Click _Save_

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Commvault%20add%20credential.png)


### Cloud Storage Configuration

1. From the navigation pane on the left, click _Storage_ then _Cloud_

1. On the Cloud Storage page, in the upper right, click _Add_ 

1. On the resulting _Add cloud storage_ page configure the following fields:
   * _Type_ : "S3 Compatible Storage"
   * _Name_ : Any name you choose
   * _MediaAgent_ : The MediaAgent you wish to use for this storage
   * _Service host_ : "gateway.storjshare.io"
   * _Credentials_ : Select the credentials you created in the previous section
   * _Bucket_ : The name of the bucket you created in Storj
   * _Use deduplication_:  Unselect or configure as desired

1.  Click _Save_

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Commvault%20add%20cloud%20storage.png)


### Backup Configuration

1.  Storj should now be available as a storage target for your Commvault backups.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Commvault%20storage%20location.png)