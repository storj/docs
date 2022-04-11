---
description: How to Integrate Filezilla Pro with Storj DCS
---

# Filezilla Pro Integration Guide

At a quick glance, FileZilla provides a fast and reliable cross-platform (Windows, Linux and Mac OS X) FTP, FTPS and SFTP client that supports connections, file transfers and file structure browsing for many of today’s cloud data storage services, including Storj. This integration is beneficial for developers as it allows them to use the FileZilla Pro client to transfer files point-to-point using the decentralized cloud.

However, there are some caveats around using FileZilla that Storj DCS users should take into consideration, namely what version of FileZilla supports integration with Storj.

## What Is the Difference Between FileZilla and FileZilla Pro and How Does This Influence Integration with Storj?

FileZilla is available in a free version, known as FileZilla Standard. It not only supports Storj DCS and FTP, but also FTP over TLS (FTPS) and SFTP. It is open-source software distributed free of charge under the terms of the GNU General Public License.

****[**FileZillaPro**](https://filezillapro.com) is a paid upgrade which delivers all of the base functionality of [**FileZilla Standard**](https://filezilla-project.org), while adding additional support for many of today’s popular cloud data storage services like Amazon S3, OneDrive, Dropbox, WebDAV, Microsoft Azure, OneDrive for Business and SharePoint, Google Cloud, Backblaze and, of course, Storj DCS.

You can use FileZilla Standard with the Storj DCS native connector—as long as you don’t use a package manager to [download it](set-up-filezilla-for-decentralized-file-transfer.md#downloading-filezilla). To learn how to use the Storj integration with FileZilla Standard, check out this [how-to doc](set-up-filezilla-for-decentralized-file-transfer.md). To leverage the FileZillaPro functionality, you can integrate it with Storj using a native connector or our backwards S3-compatible Gateway MT. Below we will focus on the integration between Storj and FileZilla Pro.

## Storj + FileZilla Pro Integration&#x20;

FileZilla Pro gives users the option to send files to a Storj DCS account in two ways, either via native uplink or via [Gateway MT](https://docs.storj.io/dcs/getting-started/gateway-mt/). Let’s take a look at some of the specs of both Native Uplink and Gateway MT, providing a clearer understanding of which integration method will work better for unique use cases.

#### Native Uplink specs regarding integration with Storj DCS:

* Native Integration (Fastest for downloading large files)
* Encrypt, erasure code, and transfer from the storage nodes directly from your computer. This is ideal for downloading large files fast.
* Supports parallelism for downloads
* Has a 2.68x upload multiplier for uploads and does not support segment parallelism

#### GatewayMT specs regarding integration with Storj DCS:

* Gateway MT (Fastest for uploading large files)
* Encryption, erasure coding, and upload to storage nodes occur server side
* Supports parallelism for upload and multi-transfer for download
* A 1GB upload will result in 1GB of data being uploaded to storage nodes across the network, based on S3 standard

There are benefits to each method of integration. To provide users with the best value as they look to make the most out of their Storj and FileZillaPro integration, we’ve put together dedicated sections on integrating Storj DCS with FileZillaPro via native uplink as well as through Gateway MT.

### Storj + FileZilla Pro Via Native Uplink

Navigate to the [**Access**](../getting-started/satellite-developer-account/access-grants.md) page within your project and then click on ‘**Create Access Grant**’&#x20;

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2F3wJnsmllerNs1nKDx9vz%2Fimage.png?alt=media\&token=38f36b08-f8c3-444a-ba7b-d66d134ebf3d)

then give your new Access Grant a name.

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2FQ6t8Q0lZVzDZK3qt1zO4%2Fimage.png?alt=media\&token=5bdd06cd-03ec-4a8b-b0e6-fa58a2a22d57)

Assign permissions to the Access Grant.

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2FYntUQ4tviuRhVZkbeIMy%2Fimage.png?alt=media\&token=2430d3be-e395-47a8-a50e-c12c142ad169)

If you click **Continue in Browser**, our client-side javascript will finalize your access grant with your encryption passphrase. Your data will remain end-to-end encrypted until you explicitly register your access grant with [Gateway MT](../api-reference/s3-compatible-gateway/) for S3 compatibility. Only then will your access grant be shared with our servers.

Storj does not know or store your encryption passphrase. However, if you are still reluctant to enter your passphrase into our web application, that’s completely understandable, and you should instead select **Continue in CLI** and follow [these instructions](../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md).

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2FDuNiKeRIwlVHk4vg9FIM%2Fimage.png?alt=media\&token=e93e7bd2-7d79-4511-90f5-4dc1c2cea0cb)

{% hint style="info" %}
The instructions below assume you selected **Continue in Browser**.
{% endhint %}

Select a passphrase type:

* Either create your own encryption passphrase&#x20;
* or generate a 12-word mnemonic passphrase.&#x20;

{% hint style="warning" %}
Make sure you save your encryption passphrase as you’ll not be able to reset this after it’s created.

This passphrase is important! Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want to change the passphrase!&#x20;

Importantly, if you want various access grants to have access to the same data, they _**must use the same passphrase**_. You won’t be able to access your data if the passphrase in your access grant is different from the passphrase you uploaded the data with.
{% endhint %}

{% hint style="danger" %}
Please note that Storj does not know or store your encryption passphrase, so if you lose it, you will not be able to recover your files. Please store it in a safe place.
{% endhint %}

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2FiKW39FXWEqaZuqKDmcE1%2Fimage.png?alt=media\&token=77ea9f32-6e14-4f89-94ca-a58e53923712)

Now that the Access Grant has been generated, this will allow for integration with FileZilla Pro via native uplink. Let's take a look.

![](https://lh5.googleusercontent.com/9jq5zC6Ljxn9uE0BxpuWyxuUUtYzOBt5zZ7DFoHiUy1be6kwvVgOYTWG05qYG6sZeZycOheip7mqt4lH-GvTy4Q-cQGzbROxhESpHP6UuJJLAohQD1MhWFdYe7A3xDnPiGlBOm57)

Once the FileZilla Pro client is open, select the **Open the Site Manager** icon at the top left of the FileZilla Pro client. Once open, start by selecting the **New Site** button and _**Storj - Decentralized Cloud Storage**_ as the protocol.

![](https://lh5.googleusercontent.com/q0XPBbEHQ21ObuKtrqZ9qwKxnGnhj2L2DzrHTfA6ONmMeGjHI8HO6idJ1cSEAkCooeG-uNLji\_gucZ-cRuu3pPm4dydSfDyQO6KVIs7DiJSmJZm-aI0eucXhBujHi-EYZbENvwhE)

Now, add the appropriate **Satellite** url (without adding `htpps://`) and simply copy your Access Grant that was previously generated within your Storj DCS account to the **Access Grant** field:

![](<../.gitbook/assets/image (137).png>)

Hit **Connect**, and access to your Storj DCS account should be established.

### Storj + FileZilla Pro via Gateway MT

In this section, we’ll go through the Storj FileZilla Pro integration leveraging Gateway MT.

Navigate to the [**Access**](../getting-started/satellite-developer-account/access-grants.md) page within your project and then click on **Create Access Grant +**. A modal window will pop up where you should enter a name for this access grant.

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2F3wJnsmllerNs1nKDx9vz%2Fimage.png?alt=media\&token=38f36b08-f8c3-444a-ba7b-d66d134ebf3d)

Assign the permissions you want this access grant to have, then click on **Continue in Browser**:

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2FYntUQ4tviuRhVZkbeIMy%2Fimage.png?alt=media\&token=2430d3be-e395-47a8-a50e-c12c142ad169)

Enter the encryption passphrase you used for your other access grants (click on the **Enter Phrase** option at the top far right to do so.) If this is your first access grant, use the **Generate Phrase** option as shown below - we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one for you on the client-side.)

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2FDuNiKeRIwlVHk4vg9FIM%2Fimage.png?alt=media\&token=e93e7bd2-7d79-4511-90f5-4dc1c2cea0cb)

When you are ready - click **Next**.

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2FiKW39FXWEqaZuqKDmcE1%2Fimage.png?alt=media\&token=77ea9f32-6e14-4f89-94ca-a58e53923712)

Click on the **Generate S3 Gateway Credentials** link and then click on the **Generate Credentials** button.

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2FZGFHdpPjj7GgSJEFQ99i%2Fimage.png?alt=media\&token=1b050ea8-cba8-46f1-8287-ceac84359bf8)

Copy your **Access Key**, **Secret Key**, and **Endpoint** to a safe location. Now you are ready to use FileZillaPro to work with Gateway MT.

![](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LmlDzFHYn9g\_f2QxmPe-887967055%2Fuploads%2F8zcpGtFAJ47uKN1iiIvw%2Fimage.png?alt=media\&token=c0346bd7-c04f-423f-8f48-4b464cc28322)

### Setting up regions

1. In the FileZilla menu bar, click on _**Edit**_ > _**Settings**_ ...
2. Select _**Transfers**_ > _**S3: Providers**_ from the menu on the left.\


![](https://lh3.googleusercontent.com/zvXGMbx5aGkx4JfZ0FqbITMSSXzDglshM37zoyX1pvzxZP3uq4EhHtvV3R2cXF3\_KxCeSGIm3IVjka7NCnGXLZ5fA3w1Iy6lduvJ0aIrux6OrfjaYBh2\_Rqpc4d1sJ6dfLffl09S)

3\. Click on the **Add** button under the **Providers** list.

4\. Enter _**Storj**_ as the name of the hosting provider.

5\. Press ENTER.

6\. Highlight the new hosting provider (_**Storj**_).

7\. Click on the **Add** button under the **Regions** list.

8\. Enter a name (for example, "US1") for the region and then press ENTER.

9\. Optionally, you can enter a description here.

10\. Click on the **Endpoints** column of the new region row and enter the _**Endpoint address**_ for Storj DCS, generated earlier during the creation of the Storj Gateway MT credentials (without adding `https://`).

![](<../.gitbook/assets/image (140).png>)

11\. Click on **OK.**

### Adding a new site to FileZillaPro

1. In the menu bar, click on **File** > **Site Manager** …
2. Click on **New Site**.
3. Enter a name for the Site - for example, _**US1 GatewayMT**_.
4. In the protocol section, select **S3 - Amazon Simple Storage Service** from the **Protocol** drop-down list.

![](<../.gitbook/assets/image (124).png>)

5\. Provide the **Access key ID **_****_ and **Secret Access Key** in the parameters for the new Site.

6\. Click **Connect** to connect to Storj via Gateway MT.

{% hint style="info" %}
If this is the first time you connect, you may see a message like this:

![](<../.gitbook/assets/image (26).png>)

You will need to confirm it by clicking the **OK** button.
{% endhint %}

Now you should be able to see your buckets now:

![](<../.gitbook/assets/image (143).png>)
