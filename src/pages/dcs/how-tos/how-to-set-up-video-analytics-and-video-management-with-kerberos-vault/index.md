---
title: Video analytics and management with Kerberos Vault
slug: how-tos/how-to-set-up-video-analytics-and-video-management-with-kerberos-vault
createdAt: 2022-05-19T18:15:05.000Z
updatedAt: 2023-03-03T08:30:09.000Z
docId: c0Ay0w8gxfln0EJxle0bz
---

## Introduction

The [Kerberos.io](https://kerberos.io) project (not to be confused with the authentication protocol of the same name) offers an open-source platform for video analytics and monitoring. With a modular system design focused on minimal startup requirements and additional components available to add later, Kerberos.io is built to work for everything from small, personal systems to complex enterprise configurations. This makes it a useful solution that is relevant at all scales.

The modularity of Kerberos.io includes optional components that help integrate it into any cloud architecture. One of these components is [Kerberos Vault](https://kerberos.io/product/vault/), which provides a flexible and extensible storage solution for video files. Kerberos Vault is designed to work with several different cloud providers, including Storj DCS, to allow for customized storage options where users can bring their own providers.

### Storj DCS and Kerberos

Storj's decentralized cloud storage platform offers a great video storage backend for integration with Kerberos.io and Kerberos Vault. This is because the distributed storage design that Storj DCS is built on offers both high availability access to video files (thanks to its network of nodes across multiple regions) and secure, reliable hosting with no single-point-of-failure.

Conveniently, it is fairly simple to configure Storj DCS to work with Kerberos Vault. This doc will show the steps necessary to do so.

### Prerequisites

Before starting the steps in this outline, ensure you have the following:

*   **A Storj account.** You can [](docId\:HeEf9wiMdlQx9ZdS_-oZS) for free at Storj.io/signup.

*   **A Kubernetes cluster.** Kerberos.io is best deployed as a container in Kubernetes. You can create a Kubernetes cluster locally or on any service provider that offers Kubernetes such as Google Cloud's GKE or Amazon EKS.

*   **Kerberos Vault installed in your Kubernetes cluster.** Kerberos.io provides documentation on [how to install Kerberos Vault in Kubernetes](https://doc.kerberos.io/vault/installation/), both for public and private cloud options.

With these prerequisites satisfied, we can begin configuring Kerberos Vault to use Storj in our Kubernetes cluster.

### Creating a Storj Bucket and Access Credentials

The first step in configuring Storj as the storage backend for Kerberos.io is to create a bucket in your Storj DCS account and [](docId\:AsyYcUJFbO1JI8-Tu8tW3) for the bucket.

Kerberos Vault will then use the bucket information and access grant to connect with Storj.

For this, do the following steps:

1\) Log in to your Storj DCS account

2\) On the main dashboard, click [](docId\:pxdnqsVDjCLZgeEXt2S6x)  and **"New Bucket"**

3\) Give your bucket a descriptive name in the text box, for example "**kerberos-vault**"&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/37JTYTC20PveNiS6h-Kj2_kerberos1.png)

4\) Click **Continue**. You will be prompted to select your Encryption - either **Generate passphrase** or **Enter passphrase**.

:::hint{type="info"}
If this is your first time using the object browser, you **must create an encryption passphrase.** We strongly encourage you to use a mnemonic phrase. The GUI automatically generates one on the client side for you with the **Generate passphrase** option. You can also download it as a text file.
:::

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/b8f25t3ezfVSntymkkreo_kerberos2.png)

5\) To continue, you need to mark the checkbox ***\[v] I understand, and I have saved the passphrase.*** This will enable the **Continue** button. When you click it - the bucket “***kerberos-vault***” will be created.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/xM1VMoKpLAO2l8MUtdwUj_kerberos3.png)

:::hint{type="warning"}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!



Importantly, if you want two access grants to have access to the same data, **they must use the same passphrase**. You won’t be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.



Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
:::

6\) Navigate to the **Access** page, then click on **Create S3 Credentials**. A modal window will pop up where you should enter a name for this access grant.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/BDTw8G2G_UrYLCqigpIbD_kerberos4.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/MBJgkjvxjquWt0BfC4i3D_kerberos5.png)

7\) In the new window, give your access grant a descriptive name, for example “**kerberosvault**”

8\) Choose the appropriate permissions you wish to grant Kerberos Vault for this bucket:

*   **Download** / **Update** / **List** / **Delete** - these are the actions that Kerberos.io will be able to perform

*   **Duration** - this is the time until this access grant will expire

*   **Buckets** - this sets which bucket (or buckets) Kerberos.io will have access to.

9\) Click **Encrypt My Access**

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/44wvYuZEoZ-bffautbCxG_kerberos6.png)

10\) Select **Create My Own Passphrase** and provide your Encryption Phrase used during creation of “***kerberos-vault***” bucket earlier. To continue click either **Copy to clipboard** or **Download .txt**.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/XK4E4GALm02OiwRFTaaai_kerberos7.png)

11\) To confirm creation mark the checkbox **\[v] I understand that Storj does not know or store my encryption passphrase. If I lose it, I won’t be able to recover files.**, this will enable **Create my Access** button.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/P9pu642N2YNRLl1wn945a_kerberos8.png)

12\) When you click on **Create my Access** the window with S3 Credentials will be opened.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/UBU80LbzKUOFcn6WCMt8S_kerberos9.png)

13\) Copy S3 Keys and S3 Endpoint or click **Download .txt** to use with Kerberos Vault in a safe place.

After completing these steps, you are ready to configure Kerberos Vault with your new bucket’s access credentials.

### Configuring Kerberos Vault to Use Storj

Now it is time to tell Kerberos where to store videos (your Storj bucket) and how to access that location (with the access grant created above). These steps can be completed from the Kerberos Vault web panel within your running instance of Kerberos inside a Kubernetes cluster.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/1_U_rGF5rIVbd_OuNKwrW_kerberos-doc-graphic-6.gif)

1.  From the main Kerberos Vault dashboard, select **Storage Providers** (on the left menu)

2.  In the window that pops up, in the drop-down menu under **Select Storage Provider**, choose **Storj**.

3.  Under **Provider Name**, enter a descriptive name for this provider to be referred to in your Kerberos instance (for example, **"storjdcs"**)

4.  For **Bucket Name**, enter the same bucket name as the one created above (in this tutorial, that would be **"kerberos-vault"**)

5.  **Region** this is not relevant for Storj or an edge deployment and can be left blank

6.  **Hostname** is the [](docId\:yYCzPT8HHcbEZZMvfoCFa)for your Storj bucket's region (for example, **"gateway.us1.storjshare.io"**)

7.  Under **Storj Credentials**, enter the **Access Key** and **Secret Key** you saved earlier when creating your access credentials.

8.  Finally, click **Validate** to ensure your access is correct and **Add Integration** to finish setup.

### Summary

The flexibility of Kerberos.io and its components like Kerberos Vault are what make it a versatile platform for video monitoring and analytics. From single-camera setups to advanced cloud-based enterprise installations, the Kerberos.io video technology is adaptable to any configuration. This adaptability includes the option to customize your choice for video storage with the platform, which is where Storj DCS makes an excellent choice.

In this tutorial, we demonstrated the steps to set up a Storj bucket and create access credentials for that bucket. We then showed how to update a Kerberos Vault installation to use Storj as a storage provider. Doing all of this allows Kerberos.io to leverage the distributed storage network provided by Storj DCS, taking advantage of all the benefits it provides. Your video monitoring and analytics solution is now enhanced with the power of decentralized media storage.
