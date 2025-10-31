---
title: Obtaining Credentials
hideTitle: false
docId: E4NhE5kPdjURRajJ
weight: 3
metadata:
  title: Credentials & Authentication
  description:
    Understanding how to obtain credentials and use them to authenticate and mount object buckets.
hidden: false
---

Object Mount can connect to Storj’s Cloud Object Storage, or to any other major cloud storage providers.

You will need to create and/or obtain credentials from your S3-compatible provider and configure Object Mount with those credentials. 

**Note:** API access may also need to be enabled for some 3rd-party S3 providers.


## S3 Credentials

Consult your specific object storage solution’s documentation to find out how to enable API access and how to create/retrieve credentials for authenticating using their S3 API. 

You will need to obtain the following three items:

| **Value**             | **Description** |
| :--------             | :-------------- | 
| **Access Key ID**     | Example: j4SQYkDxxxxxxxxxxsaSRYAahZgh
| **Access Key Secret** | Example: vMxJBmUxxxxxxxxxxxxxxxxxxxxxxxxxK4kKvwJnw8PwKpj4PmNvL
| **Endpoint**          | An accessible IP address or domain/subdomain to use as an endpoint. Example: https://gateway.storjshare.io



>>> **** **THE NOTE BELOW NEEDS ANOTHER LOOK** ****

**Important:** The credentials you obtain need to have sufficient permissions in order for Object Mount to discover and manage your data. This needs to include permission to list buckets. If this is not possible (or desired), you must use the `cuno creds pair` options, for which instructions can be found [here](user-guide-pair-containers).


## Obtaining Your Credentials

Select the tab below that corresponds to your S3 storage provider:

{% tabs %}

{% tab label="Storj" %}
    To create new Storj credentials to be used by your Object Mount users, follow these steps:

    1. Log into the Storj Dashboard for your Satellite
    
    &nbsp; &nbsp; &nbsp; For example: 🌐 [https://us1.storj.io/login](https://us1.storj.io/login)

    2. Click on **Access Keys** in the left-hand menu
    
    3. Click the **New Access Key** button
    
    4. Enter a name, choose **S3 Credentials**, select **Storj Object Mount** from the Application dropdown menu and click Next
    
    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/storj-create-new-access-keys-01.jpg)
    
    5. Choose **Full Access** and click Next

    6. Click **Create Access**
    
    7. Click the **Copy All** button or selectively click **Show** / **Copy** for each of the three values.
    
    &nbsp; &nbsp; &nbsp; **Important:** These values will ONLY APPEAR ONCE! Copy them now.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/storj-create-new-access-keys-02.jpg)
{% /tab %}

{% tab label="AWS S3" %}
    **Note:** If you are trying to access S3 through an Amazon AWS EC2 instance configured with an IAM role, no further configuration is needed and Object Mount will automatically authenticate using the AWS-managed configuration. You can skip to [Enabling Object Mount](./enabling-object-mount).
    
    **Obtaining Credentials**

    You will need the Access Key ID and Access Key Secret for an AWS IAM user with permission to access the S3 buckets you want to use. You will have stored these credentials somewhere when first creating the IAM user.

    **Creating New Credentials**

    Alternatively, create a new IAM user with "programmatic access" (access using keys), by following the AWS User Guide: 🌐 [Creating an IAM user in your AWS account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)`.

    For further options and alternatives, consult our full guide on [accessing S3 object storage](../user-guides/credentials#amazon-web-services-s3).
{% /tab %}

{% tab label="Microsoft Azure" %}
    You will need the account name, and the associated access key.

    To set up a new account, see 🌐 [Create a storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create).

    If you already have an account and need the access key, see 🌐 [View account access keys](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys).

    Alternatively, Object Mount supports using Shared Access Signatures (SAS) to access Azure containers. To do this, see [Accessing Azure containers using SAS](../user-guides/credentials#microsoft-azure-blob-storage-with-shared-access-signatures).
{% /tab %}

{% tab label="Google Cloud Storage" %}
    You will need key-based access to be associated with your 🌐 [Google Cloud service account](https://developers.google.com/workspace/guides/create-credentials#service-account).

    If you need to set this up, you can have Google generate a new key by following Google’s guide, 🌐 [Create and delete service account keys](https://cloud.google.com/iam/docs/keys-create-delete). Alternatively, you can generate your own key pair and upload it on the service account’s key management page, by following the guide 🌐 [Upload service account keys](https://cloud.google.com/iam/docs/keys-upload).

    If you’ve generated a new key, store the JSON file you have downloaded in a safe place with appropriate access permissions, ready for the next steps.
{% /tab %}

{% /tabs %}


## Next Steps

Having obtained your S3 credentials, choose your operating system below for Installation Guides, User References and Feature Details:

- [macOS](docId:apog2ij9jk6f)
- Windows <<LINK>>
- Linux <<LINK>>
