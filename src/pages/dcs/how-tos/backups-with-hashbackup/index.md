---
title: HashBackup
slug: how-tos/backups-with-hashbackup
createdAt: 2022-05-19T18:15:05.000Z
updatedAt: 2023-03-03T08:30:09.000Z
docId: y-G_lQNpFO15OPh_cevQM
---

## Introduction

One of the most important things you can do to maintain the integrity and accessibility of your files is to routinely perform backups. Data backups are a familiar concept for many, allowing for efficient recovery from lost or damaged files.

The best way to benefit from data backups is to do them regularly. However, frequent backups can quickly start requiring significant storage space. This is especially true for long-term backups. They also create copies of your files, which must be securely protected just as much as with your current live files.

These are some of the problems that [HashBackup](https://www.hashbackup.com/hashbackup/overview.html) tries to solve. HashBackup addresses the issues of security and storage by not only encrypting backups but also compressing them. This approach offers an efficient, reliable solution for performing backups regularly which doesn't need compromise due to storage or compute limitations.

The benefits of HashBackup can be enhanced with the supplemental storage and accessibility offered by Storj DCS. This document will describe how to configure Storj as a backup destination for HashBackup.

## Running HashBackup with Storj as a Destination

While HashBackup compresses backups to limit the storage requirements necessary for local storage, there are still use cases for backing up data externally to cloud services like Storj. For example, the decentralized network of Storj DCS nodes increases availability and security when accessing your backups.

HashBackup allows the configuration of additional storage destinations through a `dest.conf` file which contains information about the destination and access keys to upload data. Before that, however, you must first ensure that HashBackup is properly installed to perform local backups.

To install HashBackup on your local system, follow these steps [as shown in the HashBackup docs](https://www.hashbackup.com/hashbackup/quickstart.html):

1.  Download and extract the `hb` installer binary for your system architecture from the [HashBackup Downloads page](https://www.hashbackup.com/hashbackup/download.html)

2.  Run the binary with `./hb` to install HashBackup

3.  Move the `hb` binary to your local search path (on Linux, `sudo mv hb /usr/local/bin/`)

Now, we must create a bucket in Storj DCS that will hold the backup data uploaded by HashBackup. While doing this, it will be important to also create access keys for the bucket which can be used by HashBackup to securely access the Storj bucket.

1.  If you haven't already, create an account at [Storj.io/signup](https://storj.io/signup).

2.  Once logged in, select a project and choose [](docId\:pxdnqsVDjCLZgeEXt2S6x)** **, followed by [](docId\:OJPnxiexQIXHmzGBkvzHc)**.** Give the bucket a descriptive name, for example **"hashbackup"**.

3.  When the bucket has been created, go to the **Access** panel on the left-hand side and choose ** **[](docId\:b4-QgUOxVHDHSIWpAf3hG).

4.  Give the new access grant a descriptive name and appropriate permissions. When you are finished, choose **Generate S3 Gateway Credentials,** see** **[](docId\:AsyYcUJFbO1JI8-Tu8tW3).&#x20;

5.  Save the **Access Key**, **Secret Key**, and **End Point** in a safe location as these will be used later to authenticate HashBackup with Storj.

Now it is time to create the local backup directory with HashBackup. This step will initialize a local HashBackup folder which could normally be used to maintain encrypted backups on your personal machine. However, we will provide the additional configuration necessary to enable remote backups with Storj.

1.  Create a backup directory with `hb init -c backup` (this creates a folder called `backup` which will hold all of your backup config settings)

2.  Create a file called `dest.conf` within the `backup` directory

The `dest.conf` file will hold all of the external configuration details as listed in the [HashBackup S3 Destination docs](https://www.hashbackup.com/hashbackup/destinations/s3.html). For Storj DCS, this file should look as follows:

```Text
destname storj
type s3
host <End Point>
partsize 64m
secure
accesskey <Access Key>
secretkey <Secret Key>
bucket <Bucket Name>
```

This file contains a few key definitions:

*   **destname**: this is the destination name which will be referred to by HashBackup

*   **type**: should be set to **"s3"** for Storj

*   **host**: this points to the gateway endpoint created with our S3 gateway access credentials, for example **"gateway.us1.storjshare.io"**.

*   **partsize**: Storj processes files in 64MB segments, so declaring this value here (as **"64m"**) optimizes backups to work with Storj

*   **accesskey**: this is the **Access Key** saved from earlier when creating the S3 gateway credentials for our access grant

*   **secretkey**: this is the **Secret Key** from earlier

*   **bucket**: the name of the bucket in Storj DCS, for example **"hashbackup"**

With HashBackup now configured to send remote backups to Storj, any new files that are backed up will create a local copy as well as a remote copy. For example, running the following command will back up a local directory called `data` both in the local `backup` folder as well as in the `hashbackup` Storj DCS bucket we just configured:

```Text
hb backup -c backup data
```

If the local backup is lost, damaged, or pruned but later needed, the remote backup can be recovered from Storj following the standard [destination recovery steps documented on HashBackup's website](https://www.hashbackup.com/hashbackup/quickstart.html#_recover).

## Conclusion

Storj DCS offers an excellent option for decentralized, distributed, cloud-based file storage. With a global distribution of network nodes and inherently secure decentralized access, Storj is a great platform for hosting files and data. These same benefits extend to backups of data, which is where an automated tool like HashBackup can combine with Storj to ensure that your files are always accessible locally. In this article, we showed how to do just that by installing HashBackup and configuring it to use Storj as a remote destination. Now, the power of encrypted and compressed backups are able to be hosted on the distributed Storj platform, with all of the benefits that brings.
