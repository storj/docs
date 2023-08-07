---
title: AWS CLI and Hosted Gateway MT
docId: AsyYcUJFbO1JI8-Tu8tW3
redirects:
  - /dcs/getting-started/gateway-mt
pageTitle: Quickstart - AWS CLI and Hosted Gateway MT
---

## Introduction

Storj now offers a hosted multitenant gateway (Gateway MT) that is backward compatible with S3. This means you’ll be able to integrate with the Storj network via HTTP, and you won’t have to run anything extra on your end.

{% callout type="info"  %}
By using hosted Gateway MT you are opting into [](docId:hf2uumViqYvS1oq8TYbeW) &#x20;
{% /callout %}

Using Gateway MT with AWS CLI is a 2-step process:

1.  [](docId:AsyYcUJFbO1JI8-Tu8tW3)

2.  [](docId:AsyYcUJFbO1JI8-Tu8tW3)

## Generate Credentials to the Gateway MT

**Navigate to the Access** page within your project and then click on **Create S3 Credentials**. A modal window will pop up where you should enter a name for this access grant.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/5RKA8emw0p4_ATa5USbzJ_qscredmt01.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/JTMChfUIPD6gQmGc2e7uR_qscredmt02.png)

**Assign the permissions** you want this access grant to have, then click on **Encrypt My Access**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/HLTlQ4TBPQLLpr7ZJxetz_qscredmt03.png)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you.)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Ix5CB6wG-XseeBfJIXy4H_qscredmt04.png)

{% callout type="warning"  %}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!

Importantly, if you want two access grants to have access to the same data, **they must use the same passphrase**. You won't be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.

Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% /callout %}

Click either on the **Copy to clipboard** link or **Download .txt** and then confirm that you copied your Encryption Phrase to a safe place.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/HfTli7NU_1A--3mlLWq3M_qscredmt05.png)

Click the **Create my Access** link to finish generating of S3 credentials.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/OUR0GHdpgzJjuZeepEQGX_qscredmt06.png)

Copy your **Access Key**, **Secret Key**, and **Endpoint** to a safe location or download them.

Now you are ready to configure AWS CLI.

### Configure AWS CLI with your credentials

{% callout type="info"  %}
To continue make sure you have the AWS CLI installed on your machine.&#x20;
{% /callout %}

Verify your AWS CLI version by running `aws --version`in your terminal. AWS CLI current version is version 2. If you are using AWS CLI v1, you will need to install a plugin to be able to define the endpoint. See how on [](docId:20zlQyfMD9gmHJOUPx3jh).

2\. Configure your AWS CLI with the gateway MT credentials from the previous step by running `aws configure` in your terminal:

```Text
~ % aws configure
AWS Access Key ID [****************e53q]: <<yourAccessKey>>
AWS Secret Access Key [****************bbxq]: <<yourSecretKey>>
Default region name [us-east-1]:
Default output format [None]:
~ %
```

3\. **Optional but strongly recommended**: Set the multipart threshold to 64 MB.&#x20;

You can now use AWS CLI. Some examples of use:

### Make a bucket

```Text
aws s3 --endpoint-url=https://gateway.storjshare.io mb s3://waterbear
```

### Display buckets

```Text
aws s3 --endpoint-url=https://gateway.storjshare.io ls
```

### Copy a file

```Text
aws s3 --endpoint-url=https://gateway.storjshare.io cp /tmp/test.zip s3://waterbear
```

### List files in a bucket

```Text
aws s3 --endpoint-url=https://gateway.storjshare.io ls s3://waterbear
```

### Copy a file from a bucket

```Text
aws s3 --endpoint-url=https://gateway.storjshare.io cp s3://waterbear/test.zip /tmp/Archive.zip
```

### Delete a bucket

```Text
aws s3 --endpoint-url=https://gateway.storjshare.io rb s3://waterbear/
```

### Delete a non-empty bucket

```Text
aws s3 --endpoint-url=https://gateway.storjshare.io rb --force s3://waterbear/
```
