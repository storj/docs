---
title: Arq
docId: rnZKB53zoxOVjYLcnHngs
tags:
  - backup
redirects:
  - /dcs/how-tos/arq-integration-guide
metadata:
  title: Guide for Integrating Arq Backup Software with Storj
  description: Tutorial on how to configure Arq backup software to work with Storj, along with detailed instructions to create and implement a backup plan.
---

## Introduction

**Arq** is a backup software that allows you to use your own cloud storage account on a Mac or Windows-based system. You can use **Arq** with **Storj ** S3-compatible storage.

**Main site**: [Arqbackup](https://www.arqbackup.com/) - you can download and follow the instructions to install Arq [here](https://www.arqbackup.com/download/).

## Configure Arq to use Storj DCS

**Your Storj Account**

1.  To begin, you need to create a Storj account. Navigate to <https://us1.storj.io/signup?partner=arq> to sign up, or log in <https://storj.io/login> if you already have an account.

2.  Click on “Buckets” in the Storj DCS console and create a bucket for your Arq backups.

3.  Click on “Access” in the Storj DCS console and click "[](docId:ObsfiEHKpVU7JTdGtW-3t)“

4.  Give it a name, select **_All_** permissions, and click **Encrypt My Access**.

5.  Enter the encryption passphrase and click either on the **Copy to clipboard** link or **Download .txt** to copy or download your encryption phrase.

6.  Confirm that you copied your Encryption Phrase to a safe place and click the **Create my Access** link.

7.  **Leave the resulting web page open** in your browser while you configure Arq.

{% callout type="warning"  %}
New Users should be presented with the option to **_Create a backup plan_**. Existing users may need to create a backup plan from a menu.
{% /callout %}

Pick **New Backup Plan** from Arq’s File menu. Click **Add Storage Location**, choose **_Storj_**, and click **Continue**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/N6I8rnUYX8QGa5aRKP-x0_image-34-2.png)

Copy and paste the **_Access Key_** and **_Secret Key_** values from your web browser into the **_Storj Access Key ID_** and **_Storj Secret Access Key_** fields in Arq and click **Continue**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Wrpn4kV2MWr2CPD98kuqa_image-42.png)

Check **Use existing bucket**, choose your bucket, and click **Continue**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/fNyYgCE3ujxntenNyK-ca_image-32-2.png)

Click **Continue** to use the storage location you just added:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/RM5tmZXEaSn36pqkbes4N_screen-shot-2022-05-27-at-94548-am-1024x814.png)

Choose an encryption password for Arq to encrypt your data **before** transmitting it (this password will never leave your computer):

{% callout type="warning"  %}
Files are stored encrypted within the Storj network. Using Arq's encryption would add a second layer of encryption. Users may want to uncheck `Encrypt with password` when given the option. This is optional.&#x20;
{% /callout %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/j-ej_S6qiBjUl-c_-ggZb_screen-shot-2022-05-27-at-94638-am-1024x814.png)

Choose which files you’d like to back up, and click **Create Backup Plan**:

{% callout type="warning"  %}
To change the schedule, the files being backed up, and many other options, click on your backup plan on the left and click “Edit…”.
{% /callout %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/snmPnsOGwsJ2aQ7Ub_wiy_screen-shot-2022-05-27-at-94712-am-1024x814.png)

Congratulations, you have successfully configured Arq to back up your data to Storj DCS!
