---
title: Migrate from Backblaze to Storj
docId: ieWofei1KooHahgh
redirects:
  - /dcs/how-tos/migrate-from-backblaze-to-storj
metadata:
  title: How to migrate from Backblaze to Storj
  description: >-
    Learn how to smoothly migrate from Backblaze to Storj using the rclone tool. Our
    comprehensive guide offers step-by-step instructions to securely transfer your
    data between these cloud storage providers, ensuring data integrity and
    cost-efficiency.
---

This article will discuss the migration process from Backblaze to Storj using the rclone tool, a command-line program to manage files on cloud storage.

## Prerequisites

Before starting the migration process, you'll need to have the following:

1.  Access to both your Backblaze and Storj accounts.

    - Navigate to <https://us1.storj.io/signup?partner=rclone> to sign up or log in to an existing Storj account.

2.  Installed and configured rclone on your machine.

## Why Rclone?

Rclone is a command-line program written in Go language, which is designed to sync files and directories from different cloud storage providers. It allows for easy migration, syncs directories and files, checks file hashes, and even modifies drives. It works with a wide range of cloud storage providers, including Backblaze and Storj, which makes it an excellent tool for our use-case.

## Alternative to Backblaze

Storj is a great alternative to Backblaze because it utilizes a distributed cloud model allowing for faster global data access and retrieval compared to Backblaze's centralized model. Storj is also more cost-effective with its lower price per gigabyte for storage and bandwidth.

## Install rclone

Visit <https://rclone.org/install/> for instructions on how to install rclone.

## Create Access Credentials

Before using rclone, we'll need to create `keyID` and `applicationKey` for Backblaze and an access grant for Storj.

### Backblaze Account and Key

Use your Backblaze account credentials to log in to the Backblaze Management Console.

1.  Click `Application Keys` from the left side menu under Accounts

    ![Account application keys](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/b2_application_keys.png)

1.  Click `Add a New Application Key` button

    ![create a b2 application key](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/b2_new_application_key.png)

1.  Populate the name of the key and Click the `Create New Key` button

    ![create new b2 application key](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/b2_add_application_key.png)

1.  Save the `keyID` and `applicationKey` as you'll need those later to configure rclone

    ![b2 application key](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/b2_account_key.png)

### Create Storj Access Grant

{% partial file="create-access-grant.md" /%}

## Update Rclone config

After getting your access keys for Storj and Backblaze, you need to configure rclone.

{% callout type="info"  %}
We'll edit the rclone config directory directly, but you can also run `rclone config` for a more interactive experience.
{% /callout %}

We'll edit the rclone config file directly, you can find where it is stored by running the following:

```shell
rclone config file
```

Command output will look like this

> Configuration file is stored at:
> /Users/dan/.config/rclone/rclone.conf

Edit `~/.config/rclone/rclone.conf` with the access keys created above and the values below (see sample file).

**Backblaze:**

- **\[backblaze]**: This is the section name for the configuration.

- **type = b2**: This refers to the type of storage you are interacting with, in this case 'b2' for Backblaze

- **account**: Use your Backblaze account ID or keyID. This is a unique identifier for your Backblaze account, used to ensure that rclone accesses the correct account.

- **key:** Use your Backblaze application key. The application key is a credential that grants rclone the necessary permissions to access and manipulate the data in your Backblaze B2 buckets.

**Storj:**

- **\[storj]**: This is the section name for the configuration.

- **type = storj**: This indicates that the type of storage is Storj.

- **access_grant**: The **access_grant** is a serialized access grant string which encapsulates all necessary information to list or download objects. Replace with the actual access grant created previously.

`~/.config/rclone/rclone.conf`

```ini
[backblaze]
type = b2
account =  keyID # REPLACE ME
key = applicationKey # REPLACE ME

[storj]
type = storj
access_grant = access_grant # REPLACE ME
```

## Migrate data

Once the configuration is done, you can use the `rclone sync` command to migrate data from Backblaze to Storj. The syntax is as follows:

{% callout type="warning"  %}
Be mindful of potential network costs due to high egress traffic when running rclone for large data migrations on your machine.
{% /callout %}

Replace `my-backblaze-bucket` with the name of your specific bucket. This command will sync the contents from your Backblaze bucket to your Storj bucket, effectively migrating the data.

```shell
rclone sync --progress backblaze:my-backblaze-bucket storj:my-backblaze-bucket
```

## Post-Migration Steps

After migration, validate the data integrity in your Storj bucket by running `rclone check`

```shell
rclone check backblaze:my-backblaze-bucket storj:my-backblaze-bucket
```

This command will compare the source (Backblaze) and destination (Storj) and report any discrepancies.

You can also see the contents of your Backblaze bucket in the Storj Web Console.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/b2_bucket_on_storj.png)
