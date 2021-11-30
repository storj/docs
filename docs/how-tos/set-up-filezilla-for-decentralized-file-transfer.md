---
description: >-
  This guide walks users through the process around setting up FileZilla to
  transfer files over Storj DCS
---

# FileZilla Native Integration

{% hint style="info" %}
The native integration uses [**end-to-end encryption**](../concepts/encryption-key/design-decision-end-to-end-encryption.md) for your object data, including metadata and path data.
{% endhint %}

{% hint style="warning" %}
This is the only integration available for the **free version of Filezilla**. If you wish to use the Hosted Gateway MT you will need the paid version of Filezilla.&#x20;
{% endhint %}

## **Background**

The _**FileZilla**_ Client is a fast and reliable cross-platform (Windows, Linux and Mac OS X) FTP, FTPS and SFTP client with lots of useful features and an intuitive graphical user interface.

It includes a site manager to store all your connection details and logins, as well as an Explorer-style interface that shows the local and remote folders and can be customized independently.

With the launch of the native Storj DCS Integration into the FileZilla client, developers can use the client configured to transfer files, point-to-point using the decentralized cloud.

## Getting Started

![Getting Started Guide to Configure Storj DCS with Filezilla](<../.gitbook/assets/image (77).png>)

### Create an Access Grant

Navigate to the **Access** page within your project and then click on **Continue**.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-19 at 9.36.53 AM.png>)

Give your new **** Access Grant a **name.**

![](<../.gitbook/assets/Screen Shot 2021-04-19 at 9.36.56 AM.png>)

**Assign** **permissions** to the Access Grant.

![](<../.gitbook/assets/Screen Shot 2021-04-19 at 9.37.25 AM.png>)

{% hint style="info" %}
If you click "Continue in Browser", our client-side javascript will finalize your access grant with your encryption passphrase. Your data will remain end-to-end encrypted until you explicitly register your access grant with [Gateway MT](../getting-started/gateway-mt/) for S3 compatibility. Only then will your access grant be shared with our servers. Storj does not know or store your encryption passphrase.

However, if you are still reluctant to enter your passphrase into our web application, that's completely understandable, and you should select "Continue in CLI" and follow these [instructions](../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md).

**The instructions below assume you selected "Continue in Browser."**
{% endhint %}

Select a **Passphrase** type: Either create your own Encryption Passphrase or Generate a 12-Word Mnemonic Passphrase. Make sure you **save your encryption passphrase** as you'll not be able to reset this after it's created.

{% hint style="warning" %}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!

Importantly, if you want two access grants to have access to the same data, they must use the same passphrase. You won't be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.

Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% endhint %}

![](<../.gitbook/assets/Screen Shot 2021-04-19 at 9.37.37 AM.png>)

Access Grant is generated. **The Access Grant will only display once.** Save this information in a password manager or wherever you prefer to store sensitive information.&#x20;

![](<../.gitbook/assets/Screen Shot 2021-04-19 at 9.37.52 AM.png>)

### Downloading FileZilla

To download the latest release of FileZilla, navigate to [https://filezilla-project.org/download.php?show\_all=1](https://filezilla-project.org/download.php?show\_all=1) and select the version appropriate for your operating system, then install FileZilla.

### Creating a new Site

Open the Site Manager by clicking on the leftmost icon.

![](<../.gitbook/assets/image (101).png>)

Select the 'New Site' option

![](<../.gitbook/assets/image (115).png>)

### Configure the Satellite and Access Grant

Next, select Protocol:  "Storj - Decentralized Cloud Storage" from the Protocol dropdown in the "General" tab.&#x20;

Now enter the **Satellite** and **Access Grant** as shown below (Entering the port is not required)

1. Use the **Satellite** URL from which you created the Access Grant.
   * us-central-1.tardigrade.io (us1.storj.io)
   * asia-east-1.tardigrade.io (ap1.storj.io)
   * europe-west-1.tardigrade.io (eu1.storj.io)
2. For **Access Grant** please enter the Access Grant you saved above.

![](<../.gitbook/assets/image (116).png>)

After you enter the above information, hit the "Connect" button, and FileZilla will connect directly to the remote site.  You should see a screen showing your local site vs. Storj DCS, like so:

![](<../.gitbook/assets/image (113).png>)

### Uploading a File

To upload a file to your local machine, simply drag it from the local to the remote site (on the decentralized cloud), as shown below:

![](../.gitbook/assets/upload.gif)

### Downloading a File

To download a file to your local machine, simply drag it from the remote site to the local site, as shown below:

![](<../.gitbook/assets/download (1).gif>)

