---
title: Acronis
description: >-
  Get started integrating Acronis with Storj for cost effective cloud backup and
  storage. Our guide provides step-by-step instructions to connect your Acronis
  Cyber Infrastructure to Storj. Read now!
docId: GhGW4KaBkd428zJ51EIdp
redirects:
  - /dcs/how-tos/acronis-integration-guide
pageTitle: Integration guide for connecting Storj to Acronis
---

## Integration guide for connecting Storj to Acronis

[Acronis](https://www.acronis.com/) is a leading cyber protection solution provider that delivers innovative backup, disaster recovery, and secure file sync and share services. With a wide range of products and services for businesses and individuals, Acronis ensures data safety, accessibility, privacy, authenticity, and security.

## Advantages of Acronis with Storj 

The combination of Acronis and Storj provides comprehensive cloud management capabilities at a competitive cost. Acronis offers reliable backup and disaster recovery solutions for data archiving and organization, seamlessly integrating with Storj's S3 infrastructure for cost-effective storage and retrieval of large datasets.

With Storj's advanced security integrations, users can be confident that their data managed on Acronis is safe and secure. Acronis also provides metadata archives that make managing and accessing large datasets easy, while manual and automatic archiving capabilities help optimize storage costs.

## Integration

The integration between Storj and Acronis is achieved through the S3 protocol, which allows Acronis to write and read backup data directly to and from the Storj network. Users can configure Acronis Backup Gateway to use Storj as the storage destination for their backups.

To integrate Acronis with Storj, you will need:

- An active Storj account

- A bucket for Acronis in your Storj account

- Storj S3 compatible credentials

- Acronis Cyber Infrastructure instance (see [here](https://dl.acronis.com/u/software-defined/html/AcronisCyberInfrastructure_5_4_abgw_quick_start_guide_for_amazon_s3_ec2_en-US/#launching-the-instance.html))

- [Partner Account Access](https://www.acronis.com/en-us/partners/registration/) to the Acronis web interface for configuration and management

For more details, see <https://www.acronis.com/en-us/products/>

---

## Create a Storj Account

To begin, you will need to create a Storj account.&#x20;

Navigate to <https://us1.storj.io/signup?partner=acronis> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket 

Once you have your Storj account you can create a bucket for your data to be stored in.

1\. Navigate to “Buckets” on the left side menu.

2\. Click “New Bucket” on the top right.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/jbnQ38ynnrWl0jnO_j-E5_comet-backup-storj-2.png)

3\. Assign the bucket an easily identifiable name, such as "my-bucket".

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/K65vHcrJtRq4S87jICtYx_screenshot-2023-03-09-at-110429-am.png)

4\. Click **Create bucket**

### Generate S3 credentials

Storj has an Amazon S3 compatible API and you'll need generate S3 credentials to use it. S3 credentials consist of an **access key**, **secret key**, and **endpoint**.

Create S3 credentials in the Storj web console:

1\. Navigate to **Access** on the left side menu.

2\. Click **Create S3 Credentials** under the S3 Credentials block.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/EZyAl8Wux2GOlyPd70HnI_screenshot-2023-03-09-at-110900-am.png)

3\. When the Create Access screen comes up, set specifications according to the following guidelines:

- **Type:** S3 Credentials

- **Name:** The name of the credentials (e.g. my-access)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Cv1Lirp-3-OueRk-YAR8u_image.png)

4\. Click **Continue** to provide permissions

- **Permissions:** All

- **Buckets:** Feel free to specify the bucket you created above (e.g. my-bucket), or leave as “All”

- **End date**: provide an expiration date for these credentials (optional)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/gQ8jBHtvd5sFZFuAqth_h_image.png)

5\. Click **Continue** to provide Access encryption Information

- **Use the current passphrase**: this is default option

- **Advanced**: you may provide a different encryption phrase either your own or generate a new one.

  - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase

  - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Uxn8zBqXQVmQvsswV3pJ2_image.png)

{% callout type="warning"  %}
In order to see the data uploaded to your bucket in the web console, you must unlock the bucket with the same encryption passphrase as the credentials.
{% /callout %}

6\. Click **Create Access** to finish creation of your S3 credentials

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/zk2JE9Z6f3vk_R2cjpdqc_image.png)

7\. Click **Confirm** the Confirm details pop-up message

8\. Your S3 credentials are created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/xH5tgzVKXn-uK2hVfSo8e_image.png)

## Connecting to Storj via Backup Gateway

Before proceeding, ensure the destination storage has enough space for backups.

To set up Backup Gateway, do the following:

1\. On the **INFRASTRUCTURE** > **Networks** screen, make sure that the **ABGW private** and **ABGW public** traffic types are added to your networks.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Zzfpt2JpXnvew_u57s4Em_screenshot-2023-03-08-at-15302-pm.png)

2\. In the left menu, click **STORAGE SERVICES** > **Backup storage**.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/VcMLWnSaqkHs9Rt_KV-rn_screenshot-2023-03-08-at-15353-pm.png)

3\. Click **Create backup storage**.

4\. Select **Public cloud** and click **next.**

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/5xj9hChjVLwVJs5QpOL-U_screenshot-2023-03-08-at-15443-pm.png)

5\. Select the node(s) to run the gateway services on and click **Next.
**

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/hnehZ46GqDA6tjCM2A0YU_screenshot-2023-03-08-at-15521-pm.png)

6\. Configure Public cloud with the following in their respective fields:

- **Object Storage type**: Select AuthV2 compatible (S3).

- **Endpoint URL**: <https://gateway.storjshare.io>

- **Access Key**: Enter the access key from the S3 credentials you generated in Storj.

- **Secret Key**: Enter the secret key from the S3 credentials you generated in Storj.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/nrSFaE1HABH7hiU1PYavW_screenshot-2023-06-20-at-24524-pm.png)

7\. Click **Next** on the Storage policy.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/ysUUNOfYk4qJY7M-1Yw5H_screenshot-2023-03-08-at-20100-pm.png)

8\. Sign in to your Acronis account and click **Next**.&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/SMydqxrJiWu53hMoIbliJ_screenshot-2023-03-08-at-20344-pm.png)

9\. Click **Create.**

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/4vrgngJbaH5JLjl4HyFql_screenshot-2023-03-08-at-24028-pm.png)

You now should be able to use Storj as a backup destination.
