---
title: Commvault
docId: zohpei7doongeiNg9caiy
tags:
  - backup
metadata:
  title: Setting Up and Using Cyberduck
  description:
    A guide on how to download, setup, and use the free, open-source Cyberduck
    file manager to integrate and transfer files easily with Storj.
---

## Integration

To integrate Storj with Commvault, you will need to create S3 credentials in Storj and add them within Commvault. Veeam uses a wizard to guide users in adding S3-compatible cloud storage.

### Requirements

- An active Storj account
- A bucket for use with Commvault in your Storj instance.
- An active Commvault account.

Download a [free trial](https://www.commvault.com/free-trial-form) of Commvault or [sign up for a Demo](https://www.commvault.com/request-demo).

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

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/xOlk_1dXj-ODMpTIn-37o_image.png)

To configure **Storj** as the decentralized cloud storage network target, you’ll need to generate Storj credentials.

### Using CyberDuck with Storj - macOS

Once the download is complete, you'll be able to open the CyberDuck client. By selecting the **+** button in the bottom left-hand corner of the client, you'll be able to add a connection bookmark, facilitating the connection between CyberDuck and Storj. Select **Storj** from the drop-down.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MJ-vjelgQGnchg9zxFu7J_image.png)

This is where you will add **Server, Access Key ID, and the Secret Access Key** for Storj Gateway MT.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/aGFG9jmdtOm32wmk1dNKM_image.png)

To configure **Storj** as the decentralized cloud storage network target, you’ll need to generate Storj credentials.

### Generate Credentials to the Gateway MT

One of the most versatile ways to get up and running with **Storj** is through the [](docId:EGM8O-1xt2Az03eBWT8Rf)

**Gateway MT offers the following:**

- Encryption, erasure coding, and upload to nodes occur server-side

- Supports parallelism for upload and multi transfer for download

- 1GB upload will result in 1GB of data being uploaded to storage nodes across the network

- Based on S3 standard

Navigate to the [](docId:bNywu7-9KLjYfk5LBQABx) page within your project and then click on **Create Access Grant**. A modal window will pop up where you should enter a name for this access grant.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/BcnCX2eZIgoKJSofci7la_screen-shot-2021-04-16-at-90250-am.png)

Assign the permissions you want this access grant to have, then click on **Continue in Browser**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Ny23pe6zPwc2Y_wRzt3YM_screen-shot-2021-04-16-at-90315-am.png)

{% callout type="info"  %}
_If you do not feel comfortable entering this sensitive information into your browser, we understand. Storj does not know or store your encryption passphrase. However, if you are still reluctant to enter your passphrase into our web application, please select “Continue in CLI” and follow _[](docId:AsyYcUJFbO1JI8-Tu8tW3) _instead._
{% /callout %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Q_OxNbVD1vGCmLacrNcTT_screen-shot-2021-04-16-at-90334-am.png)

**Generate and Save the Encryption Passphrase.** If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you if you choose "Generate Phrase.") You will need this passphrase later if you want to again access files uploaded with this encryption phrase.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/N6BqEH4bKainTDV7T_spV_screen-shot-2021-04-16-at-90350-am.png)

Be sure to download the Access Grant to save it and then click on the **Generate S3 Gateway Credentials** link.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/_1N0mondSjpRRtnlrLkrc_screen-shot-2021-04-16-at-90354-am.png)

Now click on the **Generate Credentials** button.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rONKodBVYoHRO6nTU7Kg0_screen-shot-2021-04-16-at-90408-am.png)

Copy your **_Access Key_**, **_Secret Key_**, and **_Endpoint_** to a safe location.

### Configuring Storj + Cyberduck

Whether using Windows or macOS, you’ll simply add the Storj Gateway S3 credentials into the CyberDuck client to establish the connection. Click the **Open Connection** button to create a new connection.

- First, start by selecting S3 from the drop-down menu

- Enter your S3 Gateway Credentials Endpoint for the **Server** selection (**without `https://`**)

- Enter your S3 Gateway Credentials Access Key into the **Access Key ID** selection

- Enter your S3 Gateway Credentials Secret Key into the **Secret Access Key** selection

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rAvBeUlBjTAhTZnsj_S7H_image.png)

**Click Connect**

{% callout type="info"  %}
_Use endpoint without `https://`, i.e., **gateway.us1.storjshare.io** in the Cyberduck **Server** entry above. Otherwise, Cyberduck will revert to WEBDAV (HTTPS), causing a connection error._

As seen here:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/H428j0xiIhv_wp1Hfkq-l_pasted-image-0.png)

---

---

{% /callout %}

### **For Mac OS**

Back to the open connection in Cyberduck as we referenced above in [](docId:QQGzEDU8o-IodQWmr7xP3) you now have all the information you need to send files to your **Storj** network.

- **Select your saved bookmark** Here, you'll see the Amazon S3 server window reopen. To move forward, you'll simply just add in your Storj Gateway S3 credentials that we previously configured.

- Enter your S3 Gateway Credentials Endpoint for the **Server** selection.

- Enter your S3 Gateway Credentials Access Key into the **Access Key ID** selection.

- Enter your S3 Gateway Credentials Secret Key into the **Secret Access Key** selection.

Close the modal window and click the modified bookmark.

If you’ve added your S3 Gateway Credentials properly, you’ll see your **Storj** buckets, and you can now drag and drop files to your **Storj** network seamlessly and easily via the Cyberduck GUI. Congrats!
