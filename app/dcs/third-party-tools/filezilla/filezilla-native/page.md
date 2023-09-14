---
title: FileZilla Native Integration
docId: OkJongWeLGhPy4KKz34W4
redirects:
  - /dcs/how-tos/set-up-filezilla-for-decentralized-file-transfer
  - /how-tos/set-up-filezilla-for-decentralized-file-transfer
metadata:
  title: Setting Up FileZilla for File Transfer
  description:
    A comprehensive guide on setting up FileZilla for seamless file transfers
    over Storj, including creating an Access Grant, and encryption options.
---

## Introduction

This guide walks users through the process of setting up FileZilla to transfer files over Storj DCS.

{% callout type="info"  %}
The native integration uses [](docId:Pksf8d0TCLY2tBgXeT18d) for your object data, including metadata and path data.
{% /callout %}

{% callout type="warning"  %}
This is the only integration available for the **free version of Filezilla**. If you wish to use the Hosted Gateway MT you will need the [](docId:APk9353kCNcg5PKRPQ06u)
{% /callout %}

The**_ FileZilla_** Client is a fast and reliable cross-platform (Windows, Linux, and Mac OS X) FTP, FTPS, and SFTP client with many useful features and an intuitive graphical user interface.

It includes a site manager to store all your connection details and logins, as well as an Explorer-style interface that shows the local and remote folders and can be customized independently.

With the launch of the native Storj DCS Integration into the FileZilla client, developers can use the client configured to transfer files point-to-point using the decentralized cloud.

## Getting Started

![Getting Started Guide to Configure Storj DCS with Filezilla](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/A3axDH9IIHl-G8gI--gjT_fz.png)

## Create an Access Grant

Navigate to the [](docId:b4-QgUOxVHDHSIWpAf3hG) page within your project and then click on **Create S3 Credentials**. A modal window will pop up where you should enter a name for this access grant.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/QNJWifIV1LD34MT6toKSc_s3-credentials.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/_98VnssVr5Qa2Qa_fQ0t__s3-credentials-2.png)

{% callout type="info"  %}
If you click **Encrypt My Access**, our client-side javascript will finalize your access grant with your encryption passphrase. Your data will remain end-to-end encrypted until you explicitly register your access grant with [](docId:AsyYcUJFbO1JI8-Tu8tW3) for S3 compatibility. Only then will your access grant be shared with our servers. Storj does not know or store your encryption passphrase.

However, if you are still reluctant to enter your passphrase into our web application, that's completely understandable, and you should cancel creation of Access Grant in Web UI, select **Create Keys for CLI** and follow these [](docId:OXSINcFRuVMBacPvswwNU).

**The instructions below assume you selected Encrypt My Access.**
{% /callout %}

Assign the permissions you want this access grant to have, then click on **Encrypt My Access**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/VDkm74BA40yFm9o4nT1Qf_s3-credentials-3.png)

Select a **Passphrase** type: Either **Enter** your own **_Encryption Passphrase_** or **Generate** a 12-Word **_Mnemonic Passphrase_**. Make sure you **save your encryption passphrase** as you'll not be able to reset this after it's created.

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you.)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/cjkC2NEfDvsUmM-CjmmWp_s3-credentials-4.png)

{% callout type="warning"  %}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!

Importantly, if you want two access grants to have access to the same data, **they must use the same passphrase**. You won't be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.

Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% /callout %}

Click either on the** Copy to clipboard** link or **Download .txt **and then confirm that you copied your Encryption Phrase to a safe place.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/cRptNujhW_fS5JN-PuxQ9_s3-credentials-5.png)

Click the **Create my Access** link to finish generating of Access Grant.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/dqRiMbrR6WZPxAD8SQehA_s3-credentials-6.png)

{% callout type="danger"  %}
Please note that Storj does not know or store your encryption passphrase, so if you lose it, you will not be able to recover your files. Please store it in a safe place.
{% /callout %}

## Downloading FileZilla

To download the latest release of FileZilla, navigate to <https://filezilla-project.org/download.php?show_all=1> and select the version appropriate for your operating system, then install FileZilla.

### Creating a new Site

Open the Site Manager by clicking on the leftmost icon.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/ptIx46T-1UVKXUjFN4ogP_filezilla1.png)

Select the 'New Site' option

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/R_IRpQKcgfDIUbxsBnW7d_image.png)

### Configure the Satellite and Access Grant

Next, select Protocol: "Storj - Decentralized Cloud Storage" from the Protocol dropdown in the "General" tab.

Now enter the **Satellite** and **Access Grant** as shown below (Entering the port is not required)

1.  Use the **Satellite** URL from which you created the Access Grant.

2.  For **Access Grant** please enter the Access Grant you saved above.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/QfVDo6-BAPCOq85iJqWEJ_image.png)

After you enter the above information, hit the "Connect" button, and FileZilla will connect directly to the remote site. You should see a screen showing your local site vs. Storj DCS, like so:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/LKG7hFgbpmSQUM5Ps8GIh_filezilla2.png)

### Uploading a File

To upload a file to your local machine, simply drag it from the local to the remote site (on the decentralized cloud), as shown below:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/yC9FAbglEVJ3Ps7eL4Eik_filezilla3.gif)

### Downloading a File

To download a file to your local machine, simply drag it from the remote site to the local site, as shown below:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/TvSrHNg6pSIvsXyeKGm2A_filezilla4.gif)
