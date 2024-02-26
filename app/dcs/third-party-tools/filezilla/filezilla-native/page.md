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

This guide walks users through the process of setting up FileZilla to transfer files over Storj.

{% callout type="info"  %}
The native integration uses [](docId:Pksf8d0TCLY2tBgXeT18d) for your object data, including metadata and path data.
{% /callout %}

{% callout type="warning"  %}
This is the only integration available for the **free version of Filezilla**. If you wish to use the Hosted Gateway MT you will need the [](docId:APk9353kCNcg5PKRPQ06u)
{% /callout %}

The **_ FileZilla_** Client is a fast and reliable cross-platform (Windows, Linux, and Mac OS X) FTP, FTPS, and SFTP client with many useful features and an intuitive graphical user interface.

It includes a site manager to store all your connection details and logins, as well as an Explorer-style interface that shows the local and remote folders and can be customized independently.

With the launch of the native Storj Integration into the FileZilla client, developers can use the client configured to transfer files point-to-point using the decentralized cloud.

## Getting Started

![Getting Started Guide to Configure Storj with Filezilla](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/A3axDH9IIHl-G8gI--gjT_fz.png)

## Create an Access Grant

{% partial file="create-access-grant.md" /%}

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

After you enter the above information, hit the "Connect" button, and FileZilla will connect directly to the remote site. You should see a screen showing your local site vs. Storj, like so:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/LKG7hFgbpmSQUM5Ps8GIh_filezilla2.png)

### Uploading a File

To upload a file to your local machine, simply drag it from the local to the remote site (on the decentralized cloud), as shown below:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/yC9FAbglEVJ3Ps7eL4Eik_filezilla3.gif)

### Downloading a File

To download a file to your local machine, simply drag it from the remote site to the local site, as shown below:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/TvSrHNg6pSIvsXyeKGm2A_filezilla4.gif)
