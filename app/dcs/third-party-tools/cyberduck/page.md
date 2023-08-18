---
title: Cyberduck
docId: QQGzEDU8o-IodQWmr7xP3
tags:
  - file-management
redirects:
  - /dcs/how-tos/how-to-use-cyberduck-and-storj-dcs
---

## Introduction

Cyberduck is a free, open-source libre server - a small server system that enables you to run your own internet services independently - cloud storage browser for macOS, Windows, and Linux that supports FTP and SFTP, WebDAV, and cloud storage such as **Storj DCS** and other cloud storage providers.

Users can leverage the Cyberduck services via the user interface (GUI) or CLI (for Linux), including file transfer by drag and drop and notifications via Growl. It is also able to open some files in external text editors.

Users can choose **Storj DCS** to act as a decentralized cloud storage network target to send files to via the Cyberduck file manager interface, available via Storj's hosted multitenant gateway ([](docId:AsyYcUJFbO1JI8-Tu8tW3) that is backward compatible with S3. This means you’ll be able to integrate with the Storj network via HTTP, and you won’t have to run anything extra on your end.

In this brief tutorial, we'll go over downloading and setting up Cyberduck to integrate with Storj DCS, facilitating easy and intuitive drag-and-drop file transfer to Storj DCS.

## Downloading Cyberduck

As a free solution, Cyberduck gives users the freedom to run, copy, distribute, study, change, and improve the software. Those who wish to pay for Cyberduck will receive a registration key as a contributor. Becoming a contributor registers the installed application to your name, disabling donation prompts after downloading or updating.

As noted, Cyberduck supports Windows, macOS as well as Linux. Users can download Cyberduck by navigating to https\://cyberduck.io/download/. Here, you can download the given installer for both Windows and macOS.

For those who wish to download via CLI:

### Windows

{% tabs %}
{% tab label="GUI" %}

```Text
choco install cyberduck
```

{% /tab %}

{% tab label="CLI" %}

```Text
choco install duck
```

{% /tab %}
{% /tabs %}

_Requires Chocolatey. See other installation options to download the_ _MSI installer for Windows._

### macOS

```Text
brew install duck
```

_Requires Homebrew. See other installation options to download an_ _OS X installer package._

### Linux

**RPM Package**

```Text
echo -e "[duck-stable]\nname=duck-stable\nbaseurl=https://repo.cyberduck.io/stable/\$basearch/\nenabled=1\ngpgcheck=0" | sudo tee /etc/yum.repos.d/duck-stable.repo
sudo yum install duck
```

_Requires Yum Package Manager. See_ _other installation options_ _to download DEB and RPM packages._

**DEB Package**

```Text
echo -e "deb https://s3.amazonaws.com/repo.deb.cyberduck.io stable main" | sudo tee /etc/apt/sources.list.d/cyberduck.list > /dev/null
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FE7097963FEFBE72
sudo apt-get update
sudo apt-get install duck
```

_Requires APT. See_ _other installation options_ _to download DEB and RPM packages._

### Using CyberDuck with Storj - Windows

Once the download is complete, you'll be able to open the CyberDuck client. By selecting **Open Connection** to the top left, you can establish a connection via Cyberduck. By selecting Amazon S3 from the dropdown, you’ll be prompted to fill out the following:

- **Server:**

- **Port:**

- **Access Key ID:**

- **Secret Access Key:**

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/xOlk_1dXj-ODMpTIn-37o_image.png)

To configure **Storj DCS** as the decentralized cloud storage network target, you’ll need to generate Storj credentials.

### Using CyberDuck with Storj - macOS

Once the download is complete, you'll be able to open the CyberDuck client. By selecting the **+** button in the bottom left-hand corner of the client, you'll be able to add a connection bookmark, facilitating the connection between CyberDuck and Storj DCS. Select **Storj DCS** from the drop-down.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/MJ-vjelgQGnchg9zxFu7J_image.png)

This is where you will add **Server, Access Key ID, and the Secret Access Key** for Storj Gateway MT.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/aGFG9jmdtOm32wmk1dNKM_image.png)

To configure **Storj DCS** as the decentralized cloud storage network target, you’ll need to generate Storj credentials.

### Generate Credentials to the Gateway MT

One of the most versatile ways to get up and running with **Storj DCS** is through the [](docId:EGM8O-1xt2Az03eBWT8Rf)

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

Be sure to download the Access Grant to save it and then click on the **Generate S3 Gateway Credentials** link.&#x20;

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/_1N0mondSjpRRtnlrLkrc_screen-shot-2021-04-16-at-90354-am.png)

Now click on the **Generate Credentials** button.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rONKodBVYoHRO6nTU7Kg0_screen-shot-2021-04-16-at-90408-am.png)

Copy your **_Access Key_**, \*\* **\_**Secret Key**\*, and \*\* \*\*\***Endpoint\*\*\_ to a safe location.

### Configuring Storj + Cyberduck

Whether using Windows or macOS, you’ll simply add the Storj Gateway S3 credentials into the CyberDuck client to establish the connection. Click the **Open Connection** button to create a new connection.

- First, start by selecting S3 from the drop-down menu

- Enter your S3 Gateway Credentials Endpoint for the **Server** selection (**without **)

- Enter your S3 Gateway Credentials Access Key into the **Access Key ID** selection

- Enter your S3 Gateway Credentials Secret Key into the **Secret Access Key** selection

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rAvBeUlBjTAhTZnsj_S7H_image.png)

**Click Connect**&#x20;

{% callout type="info"  %}
_Use endpoint without, i.e., \***\*gateway.us1.storjshare.io\*\*** in the Cyberduck \***\*Server\*\*** entry above. Otherwise, Cyberduck will revert to WEBDAV (HTTPS), causing a connection error._

As seen here:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/H428j0xiIhv_wp1Hfkq-l_pasted-image-0.png)

---

---

{% /callout %}

### **For Mac OS**

Back to the open connection in Cyberduck as we referenced above in [](docId:QQGzEDU8o-IodQWmr7xP3) you now have all the information you need to send files to your **Storj DCS** network.

- **Select your saved bookmark** Here, you'll see the Amazon S3 server window reopen. To move forward, you'll simply just add in your Storj Gateway S3 credentials that we previously configured.

- Enter your S3 Gateway Credentials Endpoint for the **Server** selection.

- Enter your S3 Gateway Credentials Access Key into the **Access Key ID** selection.

- Enter your S3 Gateway Credentials Secret Key into the **Secret Access Key** selection.

Close the modal window and click the modified bookmark.

If you’ve added your S3 Gateway Credentials properly, you’ll see your **Storj DCS** buckets, and you can now drag and drop files to your **Storj DCS** network seamlessly and easily via the Cyberduck GUI. Congrats!
