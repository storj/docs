---
title: QNAP Hybrid Backup Sync 3
tags:
  - backup
docId: ahJah5samahgueFu
metadata:
  title: QNAP Hybrid Backup Sync 3 Overview and Integration with Storj
  description:
    Comprehensive guide on using QNAP HBS 3, its advantages with Storj
    integration, and steps to set it up on QNAP NAS for efficient data backup and
    recovery.
---

**QNAP Hybrid Backup Sync (HBS) 3** is a comprehensive backup, recovery, and data synchronization solution for QNAP NAS devices. It supports various storage solutions, including local, remote, and cloud storage.

For more information, visit the [QNAP website](https://www.qnap.com/). You can also explore [QNAP's HBS 3](https://www.qnap.com/solution/hbs3/en-us/) for detailed features.

## Advantages of QNAP HBS 3 with Storj

- **Comprehensive Coverage**: Backup and synchronize data across multiple platforms, including NAS, cloud, and remote servers.
- **Efficient Disaster Recovery**: Using Storj's global network of tens of thousands of Storage nodes provides quick and easy recovery to ensure minimal downtime in case of data loss.
- **Real-time Synchronization**: Keep your data updated across different locations in real time.
- **Flexible Scheduling**: Customizable backup schedules to fit business needs.

## Integration

To integrate your QNAP NAS with your preferred backup solution using HBS 3, you'll need to configure settings within HBS 3.

### Requirements

- A QNAP NAS device with HBS 3 installed.
- An active Storj account: Navigate to <https://storj.io/signup?partner=qnap> to sign up, or log in <https://storj.io/login> if you already have an account.
- A bucket for QNAP in your Storj account.

### Set Up HBS 3 on Your QNAP NAS

1. **Install HBS 3**: Ensure that HBS 3 is installed on your QNAP NAS. You can find it in the QNAP App Center.

2. **Launch HBS 3**: Open HBS 3 from your QNAP interface.

### Configure HBS 3 to use Storj

1. Go to "Storage Spaces"

1. Create new S3 compatible space.

   ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/qnap-hbs3-backup1.png)

1. Create [Storj S3-compatible credentials](docId:_xWsamBjOsZYyu9xtQCm5#create-s3-credentials)

1. Enter the following on the "Create a Storage Space" screen

   - **Service provider**: S3 Compatible
   - **Server address**: gateway.storjshare.io
   - **Signature version**: v4
   - **Region**: Global
   - **Access key** and **Secret key**: created in the previous step

   ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/qnap-hbs3-backup2.png)

1. [Create a bucket](docId:pxdnqsVDjCLZgeEXt2S6x) for the "Use specific bucket" option

1. Select **Create**

### Configure Backup Jobs

1. Create a New Backup Job: Choose remote as the backup you want to create

1. Select Source: Choose the folders or volumes on your NAS that you want to back up

1. Select Destination: Choose Storj

1. Enter the bucket name created previously

   ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/qnap-hbs3-backup4.png)

1. Set Schedule and Options: Configure backup schedule, versioning, encryption, and other options based on your needs.

1. Save and Run the Backup Job: Save the configuration and run the backup job to ensure it works as expected.

