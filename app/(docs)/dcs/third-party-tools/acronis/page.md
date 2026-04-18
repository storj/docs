---
title: Acronis
docId: GhGW4KaBkd428zJ51EIdp
tags:
  - backup
redirects:
  - /dcs/how-tos/acronis-integration-guide
metadata:
  title: Integration guide for connecting Storj to Acronis
  description: >-
    Get started integrating Acronis with Storj for cost effective cloud backup and
    storage. Our guide provides step-by-step instructions to connect your Acronis
    Cyber Infrastructure to Storj. Read now!
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

## Set up Storj

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://storj.io/signup?partner=acronis> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting to Storj via Backup Gateway

Before proceeding, ensure the destination storage has enough space for backups.

To set up Backup Gateway, do the following:

1.  On the **INFRASTRUCTURE** > **Networks** screen, make sure that the **ABGW private** and **ABGW public** traffic types are added to your networks.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Zzfpt2JpXnvew_u57s4Em_screenshot-2023-03-08-at-15302-pm.png)

2.  In the left menu, click **STORAGE SERVICES** > **Backup storage**.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/VcMLWnSaqkHs9Rt_KV-rn_screenshot-2023-03-08-at-15353-pm.png)

3.  Click **Create backup storage**.

4.  Select **Public cloud** and click **next.**

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/5xj9hChjVLwVJs5QpOL-U_screenshot-2023-03-08-at-15443-pm.png)

5.  Select the node(s) to run the gateway services on and click **Next**

        ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/hnehZ46GqDA6tjCM2A0YU_screenshot-2023-03-08-at-15521-pm.png)

6.  Configure Public cloud with the following in their respective fields:

    - **Object Storage type**: Select AuthV2 compatible (S3).

    - **Endpoint URL**: <https://gateway.storjshare.io>

    - **Access Key**: Enter the access key from the S3 credentials you generated in Storj.

    - **Secret Key**: Enter the secret key from the S3 credentials you generated in Storj.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/nrSFaE1HABH7hiU1PYavW_screenshot-2023-06-20-at-24524-pm.png)

7.  Click **Next** on the Storage policy.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/ysUUNOfYk4qJY7M-1Yw5H_screenshot-2023-03-08-at-20100-pm.png)

8.  Sign in to your Acronis account and click **Next**.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/SMydqxrJiWu53hMoIbliJ_screenshot-2023-03-08-at-20344-pm.png)

9.  Click **Create.**

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/4vrgngJbaH5JLjl4HyFql_screenshot-2023-03-08-at-24028-pm.png)

    You now should be able to use Storj as a backup destination.
