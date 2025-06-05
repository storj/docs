---
title: Bacula
docId: Tejiethai7ait4Uorahre
tags:
  - backup
metadata:
  title: Guide for Bacula Integration
  description:
    A guide on how to configure, and use Bacula's backup solutions
    to integrate with Storj for fast and efficient backups.
---

## Integration

To integrate Storj with Bacula, you will need to create S3 credentials in Storj and add them within Bacula.

### Requirements

- An active Storj account
- A bucket for use with Bacula in your Storj instance
- Bacula Enterprise Edition
- Installed [Bacula Cloud S3 plugin](https://docs.baculasystems.com/BEDedicatedBackupSolutions/StorageBackend/cloud/CloudInstallation/cloud-installation-s3amazon.html#installation-of-the-cloud-s3-amazon-plugin)

Bacula Enterprise Edition offers a [30-day trial](https://www.baculasystems.com/try/) for new users.

---

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://www.storj.io/signup?partner=bacula> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting Bacula to Storj

1. Log into Bweb Management Console (https://IP-of-server:9180)

1. On the left hand navigation, click **Storage and Media** then **Add New Storage**
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/bacula.png)

1. From the radio buttons, choose **Select a Storage Dameon...**. Then, in the **Device Type** dropdown, select **Cloud Virtual Disk Changer**. Click **Next**.
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/bacula-config-1.png)

1. On the **Copy from existing Storage** dropdown, select **DiskAutoChanger**. The remaining fields automatically populate with information.  Click **Next**.
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/bacula-config-2.png)

1. Type "storj" or a custom name for **Media Type**.  Then enter values under **Configure your Cloud resource**.
   * **Driver** : "S3"
   * **Hostname** : "gateway.storjshare.io"
   * **Access Key** : The Access Key ID you generated in Storj
   * **Secret Key** : The Secret Access Key you generated in Storj
   * **Region** : Click the paper/pencil button to type in any custom region name
   * **Bucket Name**:  The name of the bucket you created in Storj

1. Click the circle-arrow button to test the connectivity, it will turn green if successful.  Then click **Next**.
![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/bacula-config-3.png)

1. Give this storage resource a name, then hit **Save**.

1. If Autocommit is not enabled in your BWeb console, you will be displayed what changes will be committed to the Storage Director once you hit **Commit**.

1. The Storage Daemon must be restarted in order to see the newly created S3 target.  From the CLI of the Bacula server, type:

```shell
systemctl restart bacula-sd
```

