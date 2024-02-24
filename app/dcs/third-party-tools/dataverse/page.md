---
title: Dataverse
docId: lvqkxgrbdMrqc1XnnvDFj
tags:
  - scientific
redirects:
  - /dcs/how-tos/dataverse-integration-guide
metadata:
  title: Guide for Integrating Storj with Dataverse
  description:
    A comprehensive guide on integrating Storj with Dataverse, including
    steps for Storj setup, generating S3 credentials, and configuring Dataverse with
    Storj.
---

## Storj Setup

After [creating an account](https://storj.io/signup?partner=dataverse) on Storj DCS, you'll need to generate an access grant in order to get S3 credentials.

## Generate S3 credentials

S3 credentials allow Dataverse to upload and download files from Storj as if it was using the S3 API. To create credentials:

1.  Click 'Access' on the left menu

2.  Select 'Create S3 Credentials'

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/-85BIv0WdIdn3stV_J5CX_access-2.png)

Give your access grant a name such as 'My S3 Creds' and generate a passphrase. Your credentials will be created. These will be used to configure your Dataverse server.

{% callout type="info"  %}
Credentials will only appear once. Be sure to store them, including the Access Key and Secret Key, securely to prevent unwanted access to your files as well as allow you to configure your AWS credentials profile and to decrypt your files later.
{% /callout %}

## Dataverse Setup

### Configure AWS credentials profile

Dataverse will use the "AWS credentials profile file" that is configured for the user you run the Payara service with (e.g. `/home/dataverse/.aws/config`).

Enter the Storj S3 credentials using `aws configure`

```Text
aws configure
  AWS Access Key ID [None]: <Access Key>
  AWS Secret Access Key [None]: <Secret Key>
  Default region name [None]: us-1
  Default output format [None]:
```

Alternatively, edit the `~/.aws/config` file directly.

```Text
[default]
aws_access_key_id = <Access Key>
aws_secret_access_key = <Secret Key>
region = us-1
```

If you have existing S3 credentials, create an [alternative profile](https://guides.dataverse.org/en/5.10.1/installation/config.html) for Storj.

### Create Bucket

{% callout type="info"  %}
If you choose a different bucket name, be sure to change it in the jvm-options below as well.
{% /callout %}

Create a bucket called `dataverse` to store your files.

```Text
aws --endpoint-url=https://gateway.storjshare.io s3 mb s3://dataverse
```

### Configure Storj option in Dataverse

Using `asadmin` (usually located at `/usr/local/payara5/bin/asadmin`) run the following commands.

```Text
./asadmin create-jvm-options "\-Ddataverse.files.storj.type=s3"
./asadmin create-jvm-options "\-Ddataverse.files.storj.label=Storj"
./asadmin create-jvm-options "\-Ddataverse.files.storj.custom-endpoint-url=gateway.storjshare.io"
./asadmin create-jvm-options "\-Ddataverse.files.storj.custom-endpoint-region=us-1"

./asadmin create-jvm-options "\-Ddataverse.files.storj.bucket-name=dataverse"
./asadmin create-jvm-options "\-Ddataverse.files.storj.profile=default"
./asadmin create-jvm-options "\-Ddataverse.files.storj.path-style-access=false"

./asadmin create-jvm-options "\-Ddataverse.files.storj.payload-signing=false"
./asadmin create-jvm-options "\-Ddataverse.files.storj.upload-redirect=true"
./asadmin create-jvm-options "\-Ddataverse.files.storj.chunked-encoding=true"
./asadmin create-jvm-options "\-Ddataverse.files.storj.download-redirect=true"
./asadmin create-jvm-options "\-Ddataverse.files.storj.min-part-size=67198864"
./asadmin create-jvm-options "\-Ddataverse.files.storj.url-expiration-minutes=120"
```

### (Optional) Make Storj the default

You'll need to delete the existing default storage driver and set a new one using jvm options:

```Text
./asadmin delete-jvm-options "-Ddataverse.files.storage-driver-id=file"
./asadmin create-jvm-options "-Ddataverse.files.storage-driver-id=storj"
```

### Create new Dataverse using Storj

After you've configured your server, the Storj storage option will appear as a when creating a new Dataverse.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/ElEbYhWSbPGCdUWhzvYKj_screen-shot-2022-06-10-at-35521-pm.png)
