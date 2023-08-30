---
title: Globus
docId: NHV1H2XZHxPHc8xeHiI8t
tags:
  - scientific
redirects:
  - /dcs/how-tos/globus-integration-guide
  - /dcs/how-to/globus-integration-guide
metadata:
  title: Globus Integration Guide
  description: >-
    Efficiently integrate Globus with Storj's S3 compatible storage via the Globus
    S3 Storage Gateway for seamless data transfer, large dataset management, and
    secure data sharing.
---

## Integration guide for connecting Storj to Globus

[Globus](https://www.globus.org/) is a premier solution that empowers research by providing advanced data management capabilities. It offers data transfer, sharing, and discovery, all integrated into a unified, open-source platform. Globus ensures data security, seamless collaboration, and efficient management for individual researchers and larger research institutions.

## Advantages of Globus with Storj

The synergy between Globus and Storj brings about a comprehensive data management solution at a competitive cost. Globus provides reliable data transfer and sharing tools for streamlined research processes, effectively integrating with Storj's S3 compatible storage for affordable storing and retrieval of vast datasets.

With Storj's cutting-edge security features, users can rest assured that their data managed on Globus is secure. Additionally, Globus offers metadata management, simplifying the handling and access of extensive datasets, while its efficient data sharing mechanisms help optimize storage costs.

## Integration

The integration of Storj and Globus is facilitated via the S3 protocol, allowing Globus to directly write and read data to and from the Storj network. Users can configure the Globus endpoint to utilize Storj as the storage destination for their data.

To integrate Globus with Storj, you will need:

- An active Storj account

- Bucket(s) to be shared in the Globus ecosystem

- Storj S3 compatible credentials

- Globus Connect Server instance (see [here](https://docs.globus.org/globus-connect-server/))

- Globus for [AWS S3 Connector Subscription](https://www.globus.org/connectors/)

- Access to the Globus web interface for configuration and management

For more details, see <https://www.globus.org/globus-connect>.

## Create a Storj Account

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

## Connecting to Storj via Globus S3 Storage Gateway

The Globus Storage Gateway allows for a seamless integration with Storj's S3 compatible storage, creating an efficient bridge between your local data storage and Storj's decentralized cloud service.

### Enable the Globus for AWS S3 Connector

To enable the S3 connector follow the instructions [here](https://docs.globus.org/premium-storage-connectors/v4/aws-s3)

### Create S3 Storage Gateway

Next run `globus-connect-server storage-gateway create s3`, which initiates the process of creating a new S3 storage gateway.

Replace `my-bucket` with the one created previously in the command below. You can specify more than one bucket if needed. For more details see [here](https://docs.globus.org/premium-storage-connectors/v5/aws-s3/#creating_the_storage_gateway).&#x20;

```shell
globus-connect-server storage-gateway create s3 \
    "Storj Storage Gateway" \
    --domain example.org \
    --s3-endpoint https://gateway.storjshare.io \
    --s3-user-credential \
    --bucket my-bucket --bucket research-data-bucket-2
```

The command will output a unique id to identify the gateway.

```text
Storage Gateway Created: 7187a9a0-68e4-48ea-b3b9-7fd06630f8ab
```

If you forget the id of a storage gateway, use the command [**globus-connect-server storage-gateway list**](https://docs.globus.org/globus-connect-server/v5/reference/storage-gateway/list) to get a list of the storage gateways on the endpoint.

### Create S3 user credential

First register user credentials with the Globus storage gateway using `globus-connect-server user-credentials s3-create`. For more details see [here](https://docs.globus.org/globus-connect-server/v5/reference/user-credentials/s3-create/).

```shell
globus-connect-server user-credentials s3-create --globus-identity user@example.org
```

Follow prompts to input S3 Access Key and Secret Key (created previously)

```text
S3 access key id: access_key # REPLACE ME
S3 secret key: secret_key # REPLACE ME
Created credential 9bb3d1d1-f506-41f1-b161-41c372b7da19 for

<user@example.org>
```

### Create collection

Create a collection (addition details [here](https://docs.globus.org/premium-storage-connectors/v5/aws-s3/#collection))

The STORAGE_GATEWAY_ID is from the previous step of “Create S3 Gateway”

```shell
globus-connect-server collection create STORAGE_GATEWAY_ID  BASE_PATH DISPLAY_NAME
```

### Viewing the Collection with Globus File Manager

Enter the COLLECTION ID from the previous step

To be able to view collection follow the instructions [here](https://docs.globus.org/how-to/get-started/#the_file_manager)
