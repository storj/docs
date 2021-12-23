---
description: Hosted S3 Compatible Multitenant Gateway
---

# Quickstart - AWS CLI and Hosted Gateway MT

Storj now offers a hosted multitenant gateway (Gateway MT)  that is backward compatible with S3. This means you’ll be able to integrate with the Storj network via HTTP, and you won’t have to run anything extra on your end.

{% hint style="info" %}
By using hosted Gateway MT you are opting in to **** [**server-side encryption**](../../concepts/encryption-key/design-decision-server-side-encryption.md).&#x20;
{% endhint %}

Using Gateway MT with AWS CLI is a 2-step process:

1. [Generate Credentials to the Gateway MT](./#generate-credentials-to-the-gateway-mt)
2. [Configure AWS CLI with your credentials](./#configure-aws-cli-with-your-credentials)

### Generate Credentials to the Gateway MT

**Navigate to the Access** page within your project and then click on **Create Access Grant +**. A modal window will pop up where you should enter a name for this access grant.

![](<../../.gitbook/assets/image (127).png>)

![](<../../.gitbook/assets/Screen Shot 2021-04-16 at 9.02.50 AM.png>)

**Assign the permissions** you want this access grant to have, then click on **Continue in Browser**:

![](<../../.gitbook/assets/Screen Shot 2021-04-16 at 9.03.15 AM.png>)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you.)

![](<../../.gitbook/assets/Screen Shot 2021-04-16 at 9.03.34 AM.png>)

Click on the **Generate S3 Gateway Credentials** link **** and then click on the **Generate Credentials** button.&#x20;

![](<../../.gitbook/assets/Screen Shot 2021-04-16 at 9.03.50 AM.png>)

![](<../../.gitbook/assets/Screen Shot 2021-04-16 at 9.03.54 AM.png>)

**Copy your Access Key, Secret Key, and Endpoint** to a safe location.&#x20;

![](<../../.gitbook/assets/Screen Shot 2021-04-16 at 9.04.08 AM.png>)

Now you are ready to configure AWS CLI.

### Configure AWS CLI with your credentials

{% hint style="info" %}
To continue make sure you have the AWS CLI installed on your machine.&#x20;
{% endhint %}

Verify your AWS CLI version by running `aws --version`in your terminal. AWS CLI current version is version 2. If you are using AWS CLI v1, you will need to install a plugin to be able to define the endpoint. See how [here](aws-cli-advanced-options.md#define-an-endpoint-with-aws-cli-v1).

2\. Configure your AWS CLI with the gateway MT credentials from the previous step by running `aws configure` in your terminal:

```
~ % aws configure 
AWS Access Key ID [****************e53q]: <<yourAccessKey>>
AWS Secret Access Key [****************bbxq]: <<yourSecretKey>>
Default region name [us-east-1]: 
Default output format [None]: 
~ % 
```

3\.  **Optional but strongly recommended**: Set the multipart threshold to 64 MB.&#x20;

You can now use AWS CLI. Some examples of use:

#### Make a bucket

```
~ % aws --endpoint-url=https://gateway.eu1.storjshare.io s3 mb s3://waterbear
```

{% hint style="info" %}
Make sure to adjust the endpoint URL to the one you have been given when creating your credentials.
{% endhint %}

#### Display buckets

```
aws --endpoint-url=https://gateway.eu1.storjshare.io s3 ls
```

#### Copy a file

```
aws --endpoint-url=https://gateway.eu1.storjshare.io s3 cp /tmp/test.zip s3://waterbear
```

#### List files in a bucket

```
aws --endpoint-url=https://gateway.eu1.storjshare.io s3 ls s3://waterbear
```

#### Copy a file from a bucket

```
aws --endpoint-url=https://gateway.eu1.storjshare.io s3 cp s3://waterbear/test.zip /tmp/Archive.zip
```
