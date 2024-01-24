---
title: Atempo (Miria)
docId: Sg-4A2Td09A3OeSu6H5ag
tags:
  - backup
redirects:
  - /dcs/how-tos/atempo-miria-integration
metadata:
  title: Integration Guide for Atempo Miria with Storj
  description:
    Learn how to integrate the Atempo Miria data management tool with Storj
    for cost-effective, high-performance cloud storage, including set up and security
    features.
---

[Atempo](https://www.atempo.com/) is a leading software vendor providing data management solutions to companies worldwide. Miria is an open solution from Atempo that provides high-performance backup, movement, synchronization, and archiving for large data sets from heterogeneous sources. It delivers vendor-agnostic solutions for petascale NAS and cloud environments and has five pillars:

- Analytics

- Migration

- Data backup

- Data archiving

- Synchronization

For more information, visit <https://www.atempo.com/solutions/hybrid-nas-storage-synchronizations/#>

## Advantages of Miria with Storj

The combination of Miria and Storj provides complete flexibility for cloud management at a competitive cost. Miria handles data archiving and organization from primary storage to the Storj cloud S3 infrastructure; large data sets can be hosted, stored, replicated, and recovered at any time through Storj's platform.

Security integrations in Miria ensure that data on Storj is kept safe, while metadata archives allow large datasets to be easily accessible and manageable. Manual and automatic archiving capabilities in Miria simplify access and economize storage costs. Miria meets any requirements: data volumes, different file sizes and formats, storage technologies, and workflows.

## Integration

Miria integrates with Storj cloud storage through the S3 protocol. The Miria server orchestrates the Miria data movers, which integrates with Storj through the S3 protocol. Conversely, any other storage platform also integrates with the data movers, thus integrating data movement and management from heterogeneous sources. The Miria solution is fully scalable - simply add another Miria Data mover as needed.

To integrate Miria with Storj, you must create S3 credentials for Miria in Storj and pass them to the Miria server through the Miria web interface.

### Requirements

- An active Storj account, or you can sign up here <https://us1.storj.io/signup?partner=atempo>

- A bucket for Miria in your Storj instance

- An instance of Miria 2021 or newer

- Access to the Miria Web UI

Request [a demo of Miria](https://www.atempo.com/demo-request/) or [contact Atempo for pricing.](https://www.atempo.com/contact-atempo/)

---

## Set up Storj

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://storj.io/signup?partner=atempo> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Integrating Atempo (Miria) with Storj

1. Log into the Miria web UI.

1. Select **Infrastructure** in the left panel

1. Select **Object Storages**.

1. Select **New Storage Manager**.

1. Choose "Storj" or "General Storage" in the **Storage Manager Type** dropdown list.

1. Click **Next**.

1. Enter a name for your **Storage Manager**, such as Storj, and the appropriate **Storj service URL** into the **Configuration** part.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/zM2lJCGBJZOFUWbZW7fPc_0.png)

1. Click **Create**.

1. Enter the **access key** in the **Access Key ID** field and the **secret key** in the **Secret Access Key** field with the S3 credentials generated previously.

1. If desired, enable the **Data compression** checkbox to optimize the size of data stored in the Object Storage.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/KApbFdOcEAxy0sPeG-Xyr_2.png)

1. The new **Storage Manager Container** is ready for data storage.

   You can store backups, archives, tiered data, or synchronized files from primary storage.

1. Create a new **project**.

1. Configure **Start the task** and check its progression.

1. Once the task is complete, you should see the **files** and **folders** on your Storj account inside **my-bucket**.
