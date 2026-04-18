---
title: Starfish
docId: Ooy9pheiloquaisooy9oh
tags:
  - backup
metadata:
  title: Integrating Starfish for Large-Scale File Management with Storj
  description:
    Learn how to connect Storj and Starfish for efficient, secure, and
    cost-effective large-scale file management.
---

## Integration guide for connecting Storj to Starfish

[Starfish Storage](https://starfishstorage.com/) is a versatile service designed for file and object management across a wide range of scales, suitable for everything from small departmental file shares to the largest supercomputing file systems. It stands out for its ability to handle vast quantities of data with efficiency and ease, making it a valuable tool for organizations dealing with large and complex data environments.

## Advantages of Starfish with Storj

Integrating Starfish with Storj offers a comprehensive solution for large-scale file management at a competitive cost. Starfish, specializing in metadata-driven file organization and management, integrates smoothly with Storj's S3 compatible API, ensuring efficient storage and retrieval of vast data volumes. This combination leverages Storj's robust security features, giving users confidence in the safety and integrity of their data.

## Integration

The integration between Storj and Starfish is achieved through the S3 protocol, which allows Starfish to write and read backup data directly to and from the Storj network. Users can configure Starfish to use Storj as the storage target for their archive jobs.

To integrate Starfish with Storj, you will need:

- An active Storj account
- A bucket for Starfish in your Storj account
- Storj S3 compatible credentials
- Starfish account (see [here](https://starfishstorage.com/contact-us/))

For more details, see <https://starfishstorage.com/solutions/>

---

## Set up Storj

### Create an Account

To begin, you will need to create a Storj account.

Navigate to <https://storj.io/signup?partner=starfish> to sign up, or log in <https://storj.io/login> if you already have an account.

### Create a Bucket

Once you have your Storj account you can create a bucket for your data to be stored in.

{% partial file="create-bucket.md" /%}

### Generate S3 credentials

{% partial file="s3-credentials.md" /%}

---

## Connecting Starfish with Storj

The workflow assumes a bucket called sf-test has previously been created within Storj. The following will add Storj as an target for archive jobs.

1. Select **Targets** button from the base UI to create a new target
   ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/starfish_image_2.png)

1. Select **Add target** and **S3**
   ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/starfish_image_3.png)

1. Fill out the target specific details:

   - **Type**: s3
   - **Endpoint URL**: <https://gateway.storjshare.io>
   - **Aws access key id**: Enter the access key from the S3 credentials you generated in Storj.
   - **Aws secret access Key**: Enter the secret key from the S3 credentials you generated in Storj.
   - **Bucket name**: Enter the name of the bucket created previously

   ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/starfish_image_6.png)

1. Select **Close**

   ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/starfish_image_5.png)

1. Using the CLI, adjust the `max_part_size` and `default_part_size` to 64MiB

   {% callout type="info"  %}
   These options are not available via UI but can also be configured via the REST API.
   {% /callout %}

   Run the following command in a terminal:

   ```bash
   # terminal
   # focus
   sf archive-target update Storj default_part_size=64MiB max_part_size=64MiB

   Archive target updated
   id: 44
   name: Storj
   type: s3
   params:
   aws_access_key_id=jusgujwkr4wkoeijgfhbtn465ara
   aws_secret_access_key=***
   bucket_name=sf-test
   default_part_size=64MiB
   dst_path=km-tst
   endpoint_url=https://gateway.storjshare.io
   max_part_size=64MiB
   retries=8
   single_read_on_s3_upload=False
   timeout=60
   ```
