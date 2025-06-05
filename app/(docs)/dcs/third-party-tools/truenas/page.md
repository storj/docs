---
title: TrueNAS
docId: ygezxeTPxu9ysDNPxY-WM
tags:
  - backup
redirects:
  - /dcs/how-tos/ix-systems-truenas-integration
  - /dcs/ix-systems-truenas-integration
  - /dcs/third-party-tools/ix-systems-truenas
metadata:
  title: TrueNAS Integration with Storj for Secure Data Storage
  description:
    A guide to integrating TrueNAS storage solution with Storj for off-site
    backup, data durability, speed, and simplicity. Steps include creating a Storj
    account, setting up a bucket, and generating S3 credentials.
---

TrueNAS is a network attached storage (NAS) solution that allows for an off-site backup with cloud storage, such as Storj, to provide simplicity, speed, and durability in data storage.

## Advantages of Storj with TrueNAS

Using Storj with TrueNAS provides resilient cloud object storage with blazing performance and zero-trust security. This integration ensures:

1.  **Data durability**: Use Storj as an offsite backup for your TrueNAS storage for multi-region durability.

2.  **Speed and simplicity** of on-site storage with the added protection of a back-up in the cloud.

3.  It is also configurable in a variety of ways.

## Integration

This integration uses S3 credentials passed from Storj to TrueNAS. You will need to set up a Storj account, create a Storj bucket for TrueNAS, and generate S3 credentials for TrueNAS. Then, you will need to create a Cloud Credential on TrueNAS that will grant it access to the bucket in Storj.

### Software Requirements

Storj is fully integrated with TrueNAS.

To integrate TrueNAS with Storj, you will need:

- A Storj account

- A TrueNAS storage device connected to your network.

For more information about the TrueNAS Storj integration, visit <https://www.truenas.com/ix-storj>.

---

## Setting up Storj

### Sign up for an account

Navigate to <https://storj.io/signup?partner=ix-storj-1> to sign up for TrueNAS Storj account. Enter your full name, email address, and a password, as shown below:

{% callout type="warning"  %}
If you have an existing Storj account, you will need to contact support to have it linked to the TrueNAS Storj integration. See [here](https://forum.storj.io/t/truenas-backups-and-differences-between-storj-and-storj-ix/20044/7) for more information
{% /callout %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/PnQ7D7Z6fU0RPKZpOCRXJ_image.png)

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

1\. Navigate to “Buckets” on the left side menu.

2\. Click “New Bucket” on the top right.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/jbnQ38ynnrWl0jnO_j-E5_comet-backup-storj-2.png)

3\. Assign the bucket an easily identifiable name, such as "my-bucket".

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/K65vHcrJtRq4S87jICtYx_screenshot-2023-03-09-at-110429-am.png)

4\. Click **Create bucket**

### Generate S3 credentials

Storj has an Amazon S3 compatible API and you'll need generate S3 credentials to use it. S3 credentials consist of an **access key**, **secret key**, and **endpoint**.

Create S3 credentials in the Storj web console:

1\. Navigate to **Access** on the left side menu.

2\. Click **Create S3 Credentials** under the S3 Credentials block.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/EZyAl8Wux2GOlyPd70HnI_screenshot-2023-03-09-at-110900-am.png)

3\. When the Create Access screen comes up, set specifications according to the following guidelines:

- **Type:** S3 Credentials

- **Name:** The name of the credentials (e.g. my-access)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Cv1Lirp-3-OueRk-YAR8u_image.png)

4\. Click **Continue** to provide permissions

- **Permissions:** All

- **Buckets:** Feel free to specify the bucket you created above (e.g. my-bucket), or leave as “All”

- **End date**: provide an expiration date for these credentials (optional)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/gQ8jBHtvd5sFZFuAqth_h_image.png)

5\. Click **Continue** to provide Access encryption Information

- **Use the current passphrase**: this is default option

- **Advanced**: you may provide a different encryption phrase either your own or generate a new one.

  - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase

  - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Uxn8zBqXQVmQvsswV3pJ2_image.png)

{% callout type="warning"  %}
In order to see the data uploaded to your bucket in the web console, you must unlock the bucket with the same encryption passphrase as the credentials.
{% /callout %}

6\. Click **Create Access** to finish creation of your S3 credentials

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/zk2JE9Z6f3vk_R2cjpdqc_image.png)

7\. Click **Confirm** the Confirm details pop-up message

8\. Your S3 credentials are created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/xH5tgzVKXn-uK2hVfSo8e_image.png)

---

## Connecting TrueNAS to Storj

To complete the integration, you will need the S3 credentials created in the previous steps and a TrueNAS login.

If you use TrueNAS 24.10 (Electric Eel) or later, you would be able to setup a [TrueCloud Backup Task](#create-a-truecloud-backup-task), it's a preferred method, because it has several advantages above the [Cloud Sync Task](#create-a-cloud-sync-task): [https://www.truenas.com/docs/scale/24.10/scaletutorials/dataprotection/truecloudtasks/](https://www.truenas.com/docs/scale/24.10/scaletutorials/dataprotection/truecloudtasks/)

### Create a Cloud Credential in TrueNAS

1\. Log into TrueNAS on your network.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/9caiWgOrlUL5dtj7e7JFv_login.png)

2\. On the left-hand menu, navigate to **Credentials** and select **Backup credentials**.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/amTXglEqJexuCScBmO2Fm_bc.png)

3\. Click **Add** under the **_Cloud Credentials_** section.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/ryjNzCggsxIy5HSOitxyu_cc.png)

4\. On the right-hand pop-up menu, complete the fields as follows:

- **Name**: the name of your credential, e.g. Storj.

- **Provider**: select Storj iX from the drop-down.

- **Access Key ID**: the access key from your S3 credentials created in Storj.

- **Secret Access Key**: the secret key from your S3 credentials created in Storj.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/JZeL9b5DOtKTZirlwxr7S_cloudc1.png)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/o3G3DY3n4yCw9lq1eBiH8_cloudc2.png)

5\. Click **Verify** to very the credentials if you wish.

6\. Click **Save**.

### Create a TrueCloud Backup Task

This is a cost-efficient solution in comparison with a Cloud Sync Task. It's available starting with TrueNAS 24.10 (Electric Eel).

The TrueCloud Backup Task allows to create [restic](docId:5_zxVAqCUku5pVX0OTwSW) snapshots and upload them to the Storj bucket. Each snapshot contains only a difference, it also packs smaller objects to a bigger chunks, which effectively reduce your [storage](docId:59T_2l7c1rvZVhI8p91VX#object-storage) and [segments usage](docId:59T_2l7c1rvZVhI8p91VX#per-segment-fee) in the bucket.
The restic snapshots allows you to restore a specific version of any object or the entire dataset.

Please follow the [TrueNAS documentation to setup a TrueCloud Backup Task](https://www.truenas.com/docs/scale/24.10/scaletutorials/dataprotection/truecloudtasks/)

### Create a Cloud Sync Task

1\. On the left-hand menu, click **Data Protection**, navigate to **_Cloud Sync Tasks_**, and click **Add**.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/q5Dqcs72_i-JdGQ16NOG3_screen-shot-2022-11-10-at-111126-am.png)

2\. In the **_Add Cloud Sync Task_** window, fill out the fields as follows:

- **Description**: your preferred description, e.g., "**Daily**".

- **Direction**: PUSH. This transfers data from TrueNAS to the cloud.

- **Transfer Mode**: Copy

- **Credential**: Choose the Storj credential from the drop-down.

- **Bucket**: choose the truenas bucket you created within Storj.

- **Folder (optional)**: The path where the data should be stored within the bucket.

- **Directory/Files**: the folder in your directory to push from.

3\. Click **Save**. Under **_Cloud Sync Tasks_** you should see an entry for the **Daily** task, along with a green SUCCESS tag.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/sl2BBBB8ji5l6HXCA1da7_success.png)

4\. To test whether the sync has been successful, click the **Run Now** arrow in the task entry.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/FAbFNiNGpHfycYMgE_1ZJ_run.png)

{% callout type="info" %}
You may consider to enable [Object versioning](docId:oogh5vaiGei6atohm5thi) for the bucket and you may also [generate S3 credentials with TTL](docId:55e7ac9b-cf21-41fa-be19-087f55de1066#setting-object-ttl-in-the-access-grant--s3-credentials) to automatically delete expired versions.

**Please note, the automatic deletion of expired objects can delete the last version too, so be careful with that feature**

**If you want to have a normal backup tool, consider to use a [TrueCloud Backup Task](#create-a-truecloud-backup-task) instead.**

{% /callout %}

## Success!

While the tasks are running, an orange "RUNNING" label will appear in the task entry. Once the task completes, it will return to a green "SUCCESS" tag.

You can now check on the file sync. The TrueNAS bucket in Storj should contain the contents of the folder you had uploaded.
