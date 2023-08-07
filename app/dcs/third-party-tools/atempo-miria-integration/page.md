---
title: Atempo (Miria)
docId: Sg-4A2Td09A3OeSu6H5ag
redirects:
  - /dcs/how-tos/atempo-miria-integration
pageTitle: Atempo (Miria) Integration Guide
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

### Create a Storj Account

To begin, you will need to create a Storj account. If you already an account, go to <https://storj.io/login>.

Navigate to <https://storj.io/signup> to sign up. Enter your full name, email address, and a password, as shown below:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/x1VMINrRdadrVk5vLXIBT_capture.PNG)

### Create a Bucket 

Once you have your Storj account you can create a bucket for your data to be stored in.

1\. Navigate to “Buckets” on the left side menu.

2\. Click “New Bucket” on the top right.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/jbnQ38ynnrWl0jnO_j-E5_comet-backup-storj-2.png)

3\. Assign the bucket an easily identifiable name, such as "my-bucket".

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/K65vHcrJtRq4S87jICtYx_screenshot-2023-03-09-at-110429-am.png)

4\. Click **Create bucket**

### Generate S3 credentials

Storj has an Amazon S3 compatible API and you'll need generate S3 credentials to use it. S3 credentials consist of an **access key**, **secret key**, and **endpoint**.

Create S3 credentials in the Storj web console:

1\. Navigate to **Access** on the left side menu.

2\. Click **Create S3 Credentials** under the S3 Credentials block.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/EZyAl8Wux2GOlyPd70HnI_screenshot-2023-03-09-at-110900-am.png)

3\. When the Create Access screen comes up, set specifications according to the following guidelines:

- **Type:** S3 Credentials

- **Name:** The name of the credentials (e.g. my-access)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Cv1Lirp-3-OueRk-YAR8u_image.png)

4\. Click **Continue** to provide permissions

- **Permissions:** All

- **Buckets:** Feel free to specify the bucket you created above (e.g. my-bucket), or leave as “All”

- **End date**: provide an expiration date for these credentials (optional)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/gQ8jBHtvd5sFZFuAqth_h_image.png)

5\. Click **Continue** to provide Access encryption Information

- **Use the current passphrase**: this is default option

- **Advanced**: you may provide a different encryption phrase either your own or generate a new one.

  - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase

  - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Uxn8zBqXQVmQvsswV3pJ2_image.png)

{% callout type="warning"  %}
In order to see the data uploaded to your bucket in the web console, you must unlock the bucket with the same encryption passphrase as the credentials.
{% /callout %}

6\. Click **Create Access** to finish creation of your S3 credentials

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/zk2JE9Z6f3vk_R2cjpdqc_image.png)

7\. Click **Confirm** the Confirm details pop-up message

8\. Your S3 credentials are created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/xH5tgzVKXn-uK2hVfSo8e_image.png)

---

## Integrating Miria with Storj

### Miria Configuration

1\. Log into the Miria web UI. In the left panel, select **Infrastructure**, then **Object Storages**.&#x20;

2\. Select **New Storage Manager**.

3\. Choose "Storj" or "General Storage" in the** Storage Manager Type **dropdown list.

5\. Click **Next**.

6\. Enter a name for your **Storage Manager**, such as Storj, and the appropriate **Storj service URL** into the **Configuration **part. Click Create.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/zM2lJCGBJZOFUWbZW7fPc_0.png)

7\. Now, you will need the S3 credentials generated earlier. Enter the **access key** in the **Access Key ID** field\*\* **and the **secret key** in the **Secret Access Key\*\* field.

8\. If desired, enable the** Data compression** checkbox to optimize the size of data stored in the Object Storage.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/KApbFdOcEAxy0sPeG-Xyr_2.png)

9\. The new **Storage Manager Container **is ready for data storage. You can store backups, archives, tiered data, or synchronized files from primary storage.&#x20;

## Success!

1\. Create a new **project**.&#x20;

2\. Configure **Start the task** and check its progression.

12\. Once the task is complete, you should see the **files** and **folders** on your Storj account inside the **storj-miria-bucket**.
