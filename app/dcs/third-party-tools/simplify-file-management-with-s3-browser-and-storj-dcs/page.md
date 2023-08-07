---
title: S3 Browser
docId: LcjEYyxUmyViTjNYy6hDd
redirects:
  - /dcs/how-tos/simplify-file-management-with-s3-browser-and-storj-dcs
---

## Simplify File Management with S3 Browser and Storj DCS

S3 Browser is a Windows-based client that provides simple and reliable file management for AWS S3 storage and [AWS S3 compatible storage such as Storj DCS](https://www.storj.io/blog/what-is-s3-compatibility). Via the intuitive web file management interface, users can store and retrieve files from their Storj DCS bucket anytime and anywhere.

While S3 Browser is free for personal use, users who wish to utilize the S3 Browser in commercial, business, government, or military institutions, or for any other profit activity, must purchase a pro license.

Keep in mind that to get the best performance in using S3 Browser to manage your Storj buckets, you’ll want to apply some additional configurations to your S3 Browser instance.

S3 Browser can be configured to download large files via multiple parallel threads. By default, S3 Browsers will download everything using 5MB chunks, whereas, you have the configuration option to increase that download size to 64MB, the segment size for Storj. We suggest configuring your S3 Bucket instance to **_Enable Multipart downloads with part size (in megabytes)_** of 64. You can find more on configuring this option [here](https://s3browser.com/multipart-downloads.aspx).

{% callout type="info"  %}
One license allows you to install one instance of S3 Browser on a single computer. Your license can be transferred if you change your PC. The license is a lifetime license and includes one year of free upgrades and support. Users are also limited to two accounts added within the free version of S3 Browser.
{% /callout %}

## Downloading S3 Browser

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/imHgm4QwRRec0sKL2Z-yx_pasted-image-0.png)

As noted, S3 Browser is only available for Windows, supporting **Windows XP/Vista/7/8/10/11 and Windows Server 2003/2008/2012/2016/2019/2022.**

Users can download the S3 Browser client by navigating to the S3 Browser homepage at [https://s3browser.com/](https://s3browser.com) and selecting the _Download Now_ icon, or at <https://s3browser.com/download.aspx>.

Some stats for the S3 Browser Download:&#x20;

**S3 Browser Version** 10.3.1&#x20;

**Size of file**: 5.37 MB (5 631 160 bytes)&#x20;

**SHA256**: 0b813e6f4d5cc9d2898fd9045f577d0f5e750dd960408abf3894b447033143e2&#x20;

**Operating System**: Windows XP/Vista/7/8/10/11 and Windows Server 2003/2008/2012/2016/2019/2022

{% callout type="info"  %}
There is no option to download S3 Browser via CLI
{% /callout %}

### Generate Credentials to the Gateway MT

Users interested in accessing their Storj DCS bucket(s) via S3 Browser can do so via the hosted AWS multitenant gateway known as Gateway MT. This backward-compatible hosted gateway is one of the most versatile ways to get up and running with Storj DCS when using platforms such as S3 Browser or other file manager platforms that support Storj DCS.

**Gateway MT offers the following:**

- Encryption, erasure coding, and upload to nodes occur server side

- Supports parallelism for upload and multi transfer for download

- A 1GB upload will result in 1GB of data being uploaded to storage nodes across the network based on the S3 standard

**Navigate to the Access** page within your project and then click on **Create S3 Credentials**. A modal window will pop up where you should enter a name for this access grant.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/U_P56dlNYzj-p7I4Ubsvj_rclone1.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/xTdExe6AA-ZbmJWOqNmSf_rclone2.png)

**Assign the permissions** you want this access grant to have, then click on **Encrypt My Access**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/m_NwIW3B7Rx5xOL1zRAwz_rclone3.png)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase. (The GUI automatically generates one on the client-side for you)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/JrZT5rCAHWkwTWMy-iJzE_rclone4.png)

Click either on the **Copy to clipboard** link or **Download .txt** and then confirm that you copied your Encryption Phrase to a safe place.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/1tsIfAbcVWQWViVWNSYF1_rclone5.png)

Click the **Create my Access** link to finish generating of S3 credentials.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/m4gl1YLwvpUBQ0DTu6mQe_rclone6.png)

Copy your **Access Key**, **Secret Key**, and **Endpoint** to a safe location or download them. We’ll be using this shortly!

{% callout type="info"  %}
Storj does not know or store your encryption passphrase. However, if you are still reluctant to enter your passphrase into our web application, that’s completely understandable, and you should select **Continue in CLI** and follow [](docId:TbMdOGCAXNWyPpQmH6EOq)
{% /callout %}

### Configuring Storj + S3 Browser

Now that your S3 Browser client is downloaded and installed and you’ve generated and saved your S3 Gateway Credentials, it’s time to configure S3 Browser to interface with your Storj DCS bucket.

Select the **Accounts** menu item at the top left of the S3 Browser client. Select **Add New Account**. Add any name to your account in the **Display Name** selection. In the dropdown menu titled **Account type** select **S3 Compatible Storage**.

In the **REST Endpoint** section enter the **S3 Gateway Credentials End Point** without `https://` and trailing `/`.

In the **Access Key ID** section enter the **S3 Gateway Credentials Access Key**.

In the **Secret Access Key** section enter the **S3 Gateway Credentials Secret Key**.

Optionally, you’ll be able to protect your Access Keys with a master password by selecting the **Encrypt Access Keys with a Password** checkbox.

Check the box **Use secure transfer (SSL/TSL)** to secure all transfers via (SSL/TLS).

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/floRrJHtKxYJNVPKRL2Cl_s3browser.png)

Finallly, hit **Connect**.

If you’ve added in your S3 Gateway Credentials properly, you’ll see the following:

### Uploading Files to Storj DCS Through S3 Browser

Within the S3 Browser, you’ll be able to upload files directly to your Storj DCS bucket once you’ve effectively tied in StorJ DCS to S3 Browser.

Start by selecting which Storj bucket you wish to upload data into by selecting the bucket at the top left. Once you’ve selected your bucket, select the **Upload** icon.

Here, you’ll be prompted to select whether you’d like to **upload file(s)** or **upload folder(s)**.

Following a selection of **upload file(s)** or **upload folder(s)** you’ll be prompted with a file navigator to select the file or folder you wish to upload.

### Downloading Files From Storj DCS Through S3 Browser

Within the S3 Browser, you’ll be able to download files directly from your Storj DCS bucket once you’ve effectively tied in StorJ DCS to S3 Browser.

Start by selecting which Storj bucket you wish to download data from by selecting the bucket at the top left.

Once you’ve selected your bucket, select the **Download** icon.

Here, you’ll be prompted to select whether you’d like to **download file(s)** or **download folder(s)**

Following a selection of **download file(s)** or **download folder(s)** you’ll be prompted with a file navigator to select the file or folder you wish to download.
