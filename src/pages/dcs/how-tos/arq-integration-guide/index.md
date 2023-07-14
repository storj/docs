---
title: Arq
slug: how-tos/arq-integration-guide
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-09T18:38:22.000Z
docId: rnZKB53zoxOVjYLcnHngs
---

## Introduction

**Arq** is a backup software that allows you to use your own cloud storage account on a Mac or Windows based system. You can use **Arq** with **Storj DCS** S3-compatible storage.

**Main site**: [Arqbackup](https://www.arqbackup.com/) - you can download and follow instructions to install Arq [here](https://www.arqbackup.com/download/).

## Configure Arq to use Storj DCS

**Your Storj Account**

1.  You’ll need a Storj account. Sign up [here](), or log into your existing account [here]().

2.  Click on “Buckets” in the Storj DCS console and create a bucket for your Arq backups.

3.  Click on “Access” in the Storj DCS console and click "[](docId\:ObsfiEHKpVU7JTdGtW-3t)“

4.  Give it a name, select ***All*** permissions and click **Encrypt My Access**.

5.  Enter the encryption passphrase and click either on the **Copy to clipboard** link or **Download .txt** to copy or download your encryption phrase.

6.  Confirm that you copied your Encryption Phrase to a safe place and click the **Create my Access** link.

7.  **Leave the resulting web page open** in your browser while you configure Arq.

:::hint{type="warning"}
New Users should be presented with the option to ***Create a backup plan***.  Existing users may need to create a backup plan from a menu.
:::

Pick **New Backup Plan** from Arq’s File menu. Click **Add Storage Location**, choose ***Storj***, and click **Continue**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/N6I8rnUYX8QGa5aRKP-x0_image-34-2.png)

Copy and paste the ***Access Key*** and ***Secret Key*** values from your web browser into the ***Storj Access Key ID*** and ***Storj Secret Access Key*** fields in Arq and click **Continue**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Wrpn4kV2MWr2CPD98kuqa_image-42.png)

Check **Use existing bucket**, choose your bucket, and click **Continue**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/fNyYgCE3ujxntenNyK-ca_image-32-2.png)

Click **Continue** to use the storage location you just added:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/RM5tmZXEaSn36pqkbes4N_screen-shot-2022-05-27-at-94548-am-1024x814.png)

Choose an encryption password for Arq to encrypt your data **before** transmitting it (this password will never leave your computer):

:::hint{type="warning"}
Files are stored encrypted within the Storj network.  Using Arq's encryption would add a second layer of encryption.  Users may want to uncheck `Encrypt with password` when given the option.  This is optional.&#x20;
:::

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/j-ej_S6qiBjUl-c_-ggZb_screen-shot-2022-05-27-at-94638-am-1024x814.png)

Choose which files you’d like to back up, and click **Create Backup Plan**:

:::hint{type="warning"}
&#x20;To change the schedule, the files being backed up, and many other options, click on your backup plan on the left and click “Edit…”.
:::

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/snmPnsOGwsJ2aQ7Ub_wiy_screen-shot-2022-05-27-at-94712-am-1024x814.png)



Congratulations, you have successfully configured Arq to back up your data to Storj DCS!

