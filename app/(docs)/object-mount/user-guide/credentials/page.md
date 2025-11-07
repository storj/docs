---
title: S3 Credential Management
hideTitle: false
docId: E4NhE5kPdjURRajJ
weight: 3
metadata:
  title: Credentials & Authentication
  description:
    Understanding how to obtain credentials and use them to authenticate and mount object buckets.
hidden: false
---

Object Mount can connect to Storj’s Distributed Cloud Storage as well as other major S3-compatible cloud storage providers.

You will need to create and/or obtain credentials from your provider and configure Object Mount with those credentials. 

**Note:** API access may also need to be enabled for some 3rd-party S3 providers. Consult your storage solution’s documentation to learn how to enable API access.


## Obtaining Your S3 Credentials

You will need to obtain the following three items from your provider:

| **Value**             | **Description** |
| :--------             | :-------------- | 
| **Access Key ID**     | Example: j4SQYkDxxxxxxxxxxsaSRYAahZgh
| **Access Key Secret** | Example: vMxJBmUxxxxxxxxxxxxxxxxxxxxxxxxxK4kKvwJnw8PwKpj4PmNvL
| **Endpoint**          | An accessible IP address or domain/subdomain to use as an endpoint. Example: https://gateway.storjshare.io

{% callout type="info" %}
The credentials you obtain need to have sufficient permissions in order for Object Mount to discover and manage your data. This needs to include permission to list buckets. If this is not possible (or desired), you can use `cuno creds pair` options (See: << LINK TO BE ADDED >>).
{% /callout %}

For instructions on how to create and/or obtain your S3 credentials, select the tab below that corresponds to your S3 storage provider:

{% tabs %}

{% tab label="AWS S3" %}
  **Amazon Web Services**
  
  **AWS EC2 with IAM:**
  
  If you are accessing S3 buckets through an Amazon AWS EC2 instance configured with an IAM role, no further configuration is needed and Object Mount will automatically authenticate using the AWS-managed configuration.
    
  **Using Credentials:**

  You will need the Access Key ID and Access Key Secret for an AWS **IAM user** with permission to access your S3 buckets. These credentials would need to have been saved when the IAM user was first created.

  **Creating New Credentials**

  Alternatively, create a new IAM user with “programmatic access” (access using keys), by following the AWS User Guide: 🌐 [Creating an IAM user in your AWS account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)`.

  For further options and alternatives, consult our full guide on [accessing S3 object storage](../user-guides/credentials#amazon-web-services-s3).
{% /tab %}

{% tab label="Storj" %}
  **Storj Object Storage**
  
  **Creating New Storj Credentials:**
  
  To create new Storj credentials to be used by your Object Mount users, follow these steps:

  1. Log into the **Storj Dashboard** for your Satellite.
    
  &nbsp; &nbsp; &nbsp; For example: 🌐 [https://us1.storj.io/login](https://us1.storj.io/login)

  2. Click on **Access Keys** in the left-hand menu.
    
  3. Click the **New Access Key** button.
    
  4. Enter a name. Select **S3 Credentials** and choose **Storj Object Mount** from the Application dropdown menu. Click Next.

  ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/storj-create-new-access-keys-01.jpg)
    
  5. Choose **Full Access** and click Next.

  6. Click **Create Access**.
    
  7. Click the **Copy All** button (or selectively click **Show** / **Copy** for each value).
    
      **Important:** These values will ONLY APPEAR ONCE! Copy them now.

  ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/storj-create-new-access-keys-02.jpg)

  8. (Optional) Click **Download All** to save the credentials to a text file.
  
      **Note:** This saved text file is _not_ in the correct format for importing into Object Mount for Linux. See below for details on creating a credential file with the _correct_ syntax.
{% /tab %}

{% tab label="Microsoft Azure" %}
  **Microsoft Azure**
  
  You will need the account name and the associated access key. No region or endpoint is required.

  To set up a new account, see 🌐 [Create a storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create).

  If you already have an account and need the access key, see 🌐 [View account access keys](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys).

  Alternatively, Object Mount supports using Shared Access Signatures (SAS) to access Azure containers. (See [Accessing Azure containers using SAS](../user-guides/credentials#microsoft-azure-blob-storage-with-shared-access-signatures)).
{% /tab %}

{% tab label="Google Cloud" %}
  **Google Cloud Platform**

  You will need key-based access to be associated with your 🌐 [Google Cloud service account](https://developers.google.com/workspace/guides/create-credentials#service-account).

  If you need to set this up, you can have Google generate a new key by following Google’s guide, 🌐 [Create and delete service account keys](https://cloud.google.com/iam/docs/keys-create-delete). 
  
  Alternatively, you can generate your own key pair and upload it on the service account’s key management page, by following the guide 🌐 [Upload service account keys](https://cloud.google.com/iam/docs/keys-upload).
{% /tab %}

{% tab label="Other S3-Compatible" %}
  **S3-Compatible Providers**
  
  Consult your object storage solution’s documentation to find out how to retrieve credentials for authentication using S3 APIs. 

  You will need an **Access Key ID**, an **Access Key Secret**, and an accessible IP address/URL or domain/subdomain to use as an **endpoint**.
{% /tab %}

{% /tabs %}


## Using & Saving Your S3 Credentials

Depending on your S3 storage platform, you may only be able to see, copy, and save your access credentials _at the time you create them_. (For increased security, some platforms prevent the display of previously generated credentials.) 

Therefore, be sure to copy and record your Access Key ID and Access Key Secret at the time you create them.

**Entering Credentials: Object Mount for Windows and macOS**

When activating Object Mount in **Windows** and **macOS**, you will need to copy & paste these keys into the application’s GUI interface.

**Entering Credentials: Object Mount for Linux**

For **Linux** Object Mount activation, you can copy/paste your your credentials, or you can import them from a previously saved text file.

See below for instructions (and the syntax required) to save you credentials to a text file to be used for import:

### Saving Credentials as a File

A credential file can be used to import your S3 credentials when activating a mount in Object Mount for Linux. 

Credential files are `plain-text` and must comply with the proper format defined for your specific cloud provider.

Select your S3 storage provider below for details on syntax and variable naming:

{% tabs %}

{% tab label="AWS S3" %}
  **Amazon Web Services**
  
  There are two equivalent formats for AWS S3 credential files. Use either one:

  ```
  aws_access_key_id = <access_key_id>
  aws_secret_access_key = <secret_access_key>
  region = <region> [optional]
  ```

  ```
  AWSAccessKeyId = <access_key_id>
  AWSSecretKey = <secret_access_key>
  region = <region> [optional]
  ```

  Object Mount can also use an **AWS S3 Access Point** instead of a container (see [](docId:jieteeYeyievui9k) for more details).
{% /tab %}

{% tab label="Storj" %}
  **Storj Object Storage**

  Storj’s object storage is S3-compatible.
  
  Therefore, the syntax used for storing Storj credentials mimics the format used for AWS S3 storage:

  ```
  aws_access_key_id = <access_key_id>
  aws_secret_access_key = <access_key_secret>
  region = <endpoint>
  ```
{% /tab %}

{% tab label="Microsoft Azure" %}
  **Microsoft Azure**

  For Microsoft’s Azure cloud storage, the credential file should conform to the following format:

  ```
  AZURE_STORAGE_ACCOUNT= xxxxxxxxxxxxxxxxxx
  AZURE_STORAGE_ACCESS_KEY= xxxxxxxxxxxxxxxxxx
  ```

  No region or endpoint is needed.
{% /tab %}

{% tab label="Google Cloud" %}
  **Google Cloud Platform**
  
  If you have an existing JSON/P12 (PCKS#12) file &mdash;  that file is formatted correctly and will import properly.

  If you provided your own private key when creating the service account, you will need to create a JSON file which conforms to the following format:

  ```
  {
     "type": "service_account",
     "project_id": "PROJECT_ID",
     "private_key_id": "KEY_ID",
     "private_key": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY\n-----END PRIVATE KEY-----\n",
     "client_email": "SERVICE_ACCOUNT_EMAIL",
     "client_id": "CLIENT_ID",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://accounts.google.com/o/oauth2/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/SERVICE_ACCOUNT_EMAIL"
  }
  ```
{% /tab %}
{% tab label="Other S3-Compatible" %}
   The file needs to contain at least:

   ```
   aws_access_key_id = xxxxxxxxxxxxxxxxxx
   aws_secret_access_key = xxxxxxxxxxxxxxxxxx
   endpoint=http://127.0.0.1:8080
   ```
{% /tab %}

{% /tabs %}


**Note:** For additional details and options on _endpoint_ formatting, consult the user guide section for [Authenticating with S3-compatible solutions](../user-guides/credentials#s3-compatible-solutions).


## Securing Your S3 Credentials

You can use any text editor to create the credential file &mdash; just remember to change the permissions on the file when you’re done to prevent other users from accessing it:

```shell
#terminal
chmod 0600 "<path to your credentials file>"
```

{% callout type="info" %}
  **Time Saving Tip**

  You can combine the creation of the file and securing permissions on the file in a single shell command (insert your credential details):
  
  ```shell
  #terminal
  touch credentials.txt ; chmod 0600 credentials.txt ; printf "aws_access_key_id = xxxxxxxxxxxxxxxxxx \naws_secret_access_key = xxxxxxxxxxxxxxxxx \nendpoint=A.B.C.D:PORT" > credentials.txt
  ```
{% /callout %}

