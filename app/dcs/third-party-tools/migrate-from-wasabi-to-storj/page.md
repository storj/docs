---
title: Migrate from Wasabi to Storj
description: >-
  Learn how to smoothly migrate from Wasabi to Storj using the rclone tool. Our
  comprehensive guide offers step-by-step instructions to securely transfer your
  data between these cloud storage providers, ensuring data integrity and
  cost-efficiency.
docId: FQTEKVgNNJBpZwe2hT7LH
redirects:
  - /dcs/how-tos/migrate-from-wasabi-to-storj
pageTitle: How to migrate from Wasabi to Storj
---

This article will discuss the migration process from Wasabi to Storj using the rclone tool, a command-line program to manage files on cloud storage.

For a cost comparison between Wasabi and Storj, see <https://www.storj.io/landing/wasabi-comparison>.

## Prerequisites

Before starting the migration process, you'll need to have the following:

1.  Access to both your Wasabi and Storj accounts.&#x20;

    - Navigate to <https://us1.storj.io/signup?partner=rclone> to sign up or log in to an existing Storj account.

2.  Installed and configured rclone on your machine.

## Why Rclone?

Rclone is a command-line program written in Go language, which is designed to sync files and directories from different cloud storage providers. It allows for easy migration, syncs directories and files, checks file hashes, and even modifies drives. It works with a wide range of cloud storage providers, including Wasabi and Storj, which makes it an excellent tool for our use-case.

## Install rclone

Visit <https://rclone.org/install/> for instructions on how to install rclone.

## Create Access Credentials

Before using rclone, we'll need to create access and a secret key for Wasabi and an access grant for Storj.

### Wasabi Access and Secret Key

Use your Wasabi account credentials to log in to the Wasabi Management Console.

1.  Click `Access Keys` from the left side menu

2.  Click `CREATE ACCESS KEY` button under the Access Keys heading

![create a wasabi access key](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/bDKe-207rFZXgsmC3e9Mn_screenshot-2023-07-05-at-22731-pm.png)

Once the key is created, you can view and copy the Access Key and Secret Key. Make sure to store these securely as the Secret Key cannot be retrieved again and will be needed later on.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/1rp53j9mBwkYEoYKOzUqK_screenshot-2023-07-05-at-21415-pm.png)

### Create Storj Access Grant

A Storj access grant is a serialized, self-contained credential that allows users to access a specific bucket, or object, within a Storj project. It encapsulates everything needed for authentication and authorization on the Storj network.

Create Access Grant in the Storj web console:

1\. Navigate to **Access** on the left side menu.

2\. Click **Create Access Grant** under the Access Grant block

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/I0a-_XJBVJRkWobIDMI6P_screenshot-2023-07-05-at-22016-pm.png)

3\. When the Create Access screen comes up, set specifications according to the following guidelines:

- **Type:** Access Grant

- **Name:** The name of the credentials (e.g. my-access-grant)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/ezY2HJuPFEsgyH4p13ebP_screenshot-2023-07-05-at-22057-pm.png)

4\. Click **Continue** to provide permissions

- **Permissions:** All

- **Buckets:** Feel free to specify the bucket (e.g. my-bucket), or leave as “All”

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

7\. Click **Confirm** the Confirm details pop-up message

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/WAgyNSbTLK8aR3W8btpMg_screenshot-2023-07-05-at-22143-pm.png)

8\. Your Access Grant is created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/5c73MkTyjkYBJkkQ42yUF_screenshot-2023-07-05-at-22152-pm.png)

## Update Rclone config

After getting your access keys for Storj and Wasabi, you need to configure rclone.&#x20;

{% callout type="info"  %}
We'll edit the rclone config directory directly, but you can also run `rclone config` for a more interactive experience.&#x20;
{% /callout %}

We'll edit the rclone config file directly, you can find where it is stored by running the following:

```shell
rclone config file
```

Command output will look like this

> Configuration file is stored at:
> /Users/dan/.config/rclone/rclone.conf

Edit `~/.config/rclone/rclone.conf` with the access keys created above and the values below (see sample file).

**Wasabi:**

- **\[wasabi]**: This is the section name for the configuration.

- **type = s3**: This refers to the type of storage you are interacting with, in this case 's3' for Simple Storage Service, a type of cloud storage.

- **provider = Wasabi**: This indicates that the provider of the storage service is Wasabi.

- **access_key_id**: Replace with your actual Wasabi access key created previously.

- **secret_access_key**: Replace with your actual Wasabi secret key created previously.

- **endpoint**: This points to the Wasabi service endpoint. The value depends on the region of your Wasabi storage. Replace the placeholder with the endpoint that corresponds to your Wasabi service region.

- **acl = private**: This represents the Access Control List (ACL) policy for your objects. 'private' means that the objects are only accessible to the owner of the bucket.

**Storj:**

- **\[storj]**: This is the section name for the configuration.

- **type = storj**: This indicates that the type of storage is Storj.

- **access_grant**: The **access_grant** is a serialized access grant string which encapsulates all necessary information to list or download objects. Replace with the actual access grant created previously.

`~/.config/rclone/rclone.conf`

```ini
[wasabi]
type = s3
provider = Wasabi
access_key_id =  access_key # REPLACE ME
secret_access_key = secret_key  # REPLACE ME
endpoint = s3.us-central-1.wasabisys.com # REPLACE ME
acl = private

[storj]
type = storj
access_grant = access_grant # REPLACE ME
```

## Migrate data

Once the configuration is done, you can use the `rclone sync` command to migrate data from Wasabi to Storj. The syntax is as follows:

{% callout type="warning"  %}
Be mindful of potential network costs due to high egress traffic when running rclone for large data migrations on your machine.
{% /callout %}

Replace `my-wasabi-bucket` with the name of your specific bucket. This command will sync the contents from your Wasabi bucket to your Storj bucket, effectively migrating the data.

```shell
rclone sync --progress wasabi:my-wasabi-bucket storj:my-wasabi-bucket
```

## Post-Migration Steps

After migration, validate the data integrity in your Storj bucket by running `rclone check`

```shell
rclone check wasabi:my-wasabi-bucket storj:my-wasabi-bucket
```

This command will compare the source (Wasabi) and destination (Storj) and report any discrepancies.

You can also see the contents of your Wasabi bucket in the Storj Web Console.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/k_hZRrlzb3x4CqXweWmoD_screenshot-2023-07-05-at-30729-pm.png)
