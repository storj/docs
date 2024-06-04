---
title: Mountain Duck
docId: Eem9ais3o-fee9iaquieh
tags:
  - file-management
metadata:
  title: Setting Up and Using Mountain Duck
  description:
    A guide on how to download, setup, and use the Mountain Duck
    drive mounting tool to integrate and transfer files easily with Storj.
---

## Introduction

Mountain Duck is an inexpensive, user-licensed application developed by the same team as [Cyberduck](docid:QQGzEDU8o-IodQWmr7xP3), serving as a versatile file access tool. 
It allows users to mount server and cloud storage accounts as local disks in Finder on macOS and the File Explorer on Windows. 
Supporting various protocols like FTP, SFTP, WebDAV, and cloud storage providers, including Storj, Mountain Duck provides a seamless integration of remote storage into the user's file system. 

In this brief tutorial, we'll go over downloading and setting up Mountain Duck to integrate with Storj, facilitating easy and intuitive drag-and-drop file transfer to Storj.



## Prerequisites:

- Storj account with [](docId:AsyYcUJFbO1JI8-Tu8tW3)

- Storj S3 compatiable access and secret key (see [Create S3 Credentials](docId:_xWsamBjOsZYyu9xtQCm5#create-s3-credentials))



## Downloading Mountain Duck

Users can download Mountain Duck by navigating to [https://mountainduck.io/](https://mountainduck.io/). Mountain Duck offers a free trial, so that you can evaluate the software before deciding if you'll purchase a license.



### Using Mountain Duck with Storj

Once the download is complete, install and run the Mountain Duck client.
Click the new, duck-shaped icon in your menu bar (MacOS) / system tray (Windows), and select **Open Connection**.
Perform the following actions in the resulting window:

Select **Storj DCS** from the top-most selection list.

  - If "Storj DCS" is not an option in this list, select **More options...** to open the Profiles window.  Find **Storj DCS** in the profile list, check it's checkbox, and close the Profiles window.  This will add **Storj DCS** to the selection list.


Populate the **Nickname**, **Access Key**, and **Secret Key** fields.

- Enter any name of your choice into the **Nickname** selection.

- Enter your S3 Gateway Credentials Access Key into the **Access Key** selection.

- Enter your S3 Gateway Credentials Secret Key into the **Secret Key** selection.

Finally, click **Connect**.


If you’ve added your S3 Gateway Credentials properly, a folder will display in Finder (MacOS) / Explorer (Windows), displaying one folder per Storj. 
You can now drag and drop files to the **Storj** network seamlessly and easily via Mountain Duck and your operating system. Congrats!
