---
title: Configuring Credentials
docId: heefureS2iubahpi
weight: 4
metadata:
  title: Configuring Credentials
  description:
   Object Mount can connect to any of the major cloud storage providers using the native storage credentials.
---
## Authentication

Object Mount can connect to any of the major cloud storage providers using the native storage credentials.

If you have an S3-compatible object storage solution from another provider, you will first need to configure S3 API access.

{% callout type="note"  %}
If you are trying to access S3 through an EC2 instance configured with an IAM role, no further configuration is needed and Object Mount will automatically authenticate using the AWS-managed configuration. 
You can skip to [Enabling Object Mount](./enabling-object-mount).
{% /callout %}

## Getting your credentials

{% callout type="warning"  %}
Any credentials you use need to have sufficient permissions in order for Object Mount to discover and manage your data. This needs to include permission to list buckets. If this is not possible or desired, you must use the `cuno creds pair` options, for which instructions can be found [here](user-guide-pair-containers).
{% /callout %}

{% tabs %}
{% tab label="AWS S3" %}
    You will need the Access Key ID and Access Key Secret for an AWS IAM user with permission to access the S3 buckets you want to use. You will have stored these credentials somewhere when first creating the IAM user.

    Alternatively, create a new IAM user with "programmatic access" (access using keys), by following the AWS User Guide: [Creating an IAM user in your AWS account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)`.
    For further options and alternatives, consult our full guide on [accessing S3 object storage](../user-guides/credentials#amazon-web-services-s3).
{% /tab %}
{% tab label="Microsoft Azure" %}
    You will need the account name, and the associated access key.

    To set up a new account, see [Create a storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create)`.

    If you already have an account and need the access key, see [View account access keys](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys).

    Alternatively, Object Mount supports using Shared Access Signatures (SAS) to Azure containers. To do this, see [Accessing Azure containers using SAS](../user-guides/credentials#microsoft-azure-blob-storage-with-shared-access-signatures).
{% /tab %}
{% tab label="Google Cloud Storage" %}
    You will need key-based access to be associated with your [Google Cloud service account](https://developers.google.com/workspace/guides/create-credentials#service-account).

    If you need to set this up, you can have Google generate a new key by following Google's guide, [Create and delete service account keys](https://cloud.google.com/iam/docs/keys-create-delete). Alternatively, you can generate your own key pair and upload it on the service account's key management page, by following the guide [Upload service account keys](https://cloud.google.com/iam/docs/keys-upload).

    If you've generated a new key, store the JSON file you have downloaded in a safe place with appropriate access permissions, ready for the next steps.
{% /tab %}
{% tab label="S3-compatible" %}
    Consult your object storage solution's documentation to find out how to retrieve credentials for authenticating using the S3 API. You will need an Access Key ID, Access Key Secret, and an accessible IP address or domain/subdomain to use as an endpoint.
{% /tab %}
{% /tabs %}


## Saving credentials as a file
{% tabs %}
{% tab label="AWS S3" %}
   The file needs to be of the form:

   ```shell
   aws_access_key_id = xxxxxxxxxxxxxxxxxx
   aws_secret_access_key = xxxxxxxxxxxxxxxxxx
   ```

   You can use any text editor to create the file, just remember to change the permissions on the file when you're done to prevent other users from reading it:

   ```shell
   # terminal
   chmod 0600 "<path to your credentials file>"
   ```

   Alternatively, use our handy one-liner (after editing in your details):

   ```shell
   # terminal
   touch credentials.txt ; chmod 0600 credentials.txt ; printf "aws_access_key_id = xxxxxxxxxxxxxxxxxx \naws_secret_access_key = xxxxxxxxxxxxxxxxxx" > credentials.txt
   ```
{% /tab %}
{% tab label="Microsoft Azure" %}
   The file needs to be of the form:

   ```shell
   AZURE_STORAGE_ACCOUNT= xxxxxxxxxxxxxxxxxx
   AZURE_STORAGE_ACCESS_KEY= xxxxxxxxxxxxxxxxxx
   ```

   You can use any text editor to create the file, just remember to change the permissions on the file when you're done to prevent other users from reading it:

   ```shell
   # terminal
   chmod 0600 "<path to your credentials file>"
   ```
   Alternatively, use our handy one-liner (after editing in your details):

   ```shell
   # terminal
   touch credentials.txt ; chmod 0600 credentials.txt ; printf "AZURE_STORAGE_ACCOUNT= xxxxxxxxxxxxxxxxxx \nAZURE_STORAGE_ACCESS_KEY= xxxxxxxxxxxxxxxxxx" > credentials.txt
   ```
{% /tab %}
{% tab label="Google Cloud Storage" %}
   If you have an existing JSON/P12 (PCKS#12) file or you downloaded one in Step 1, that will work and you can move on to Step 3.

   If you provided you own private key when creating the service account, you will need to create a JSON file of the form:

   ```shell  
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
{% tab label="S3-compatible" %}
   The file needs to contain at least:

   ```shell
   aws_access_key_id = xxxxxxxxxxxxxxxxxx
   aws_secret_access_key = xxxxxxxxxxxxxxxxxx
   endpoint=http://127.0.0.1:8080
   ```

   For more information on endpoint formatting, and additional options, consult the full user guide section for [Authenticating with S3-compatible solutions](../user-guides/credentials#s3-compatible-solutions).

   You can use any text editor to create the file, just remember to change the permissions on the file when you're done to prevent other users from reading it:

   ```shell
   #terminal
   chmod 0600 "<path to your credentials file>"
   ```

   You can use any text editor to create the file, or use our handy one-liner (after editing in your details):

   ```shell
   #terminal
   touch credentials.txt ; chmod 0600 credentials.txt ; printf "aws_access_key_id = xxxxxxxxxxxxxxxxxx \naws_secret_access_key = xxxxxxxxxxxxxxxxxx\nendpoint=A.B.C.D:PORT" > credentials.txt
   ```
{% /tab %}
{% /tabs %}


## Importing the credentials into Object Mount

{% callout type="note"  %}
The default location for imported credentials is the directory `$XDG_CONFIG_HOME/cuno/creds` (if unset, `$XDG_CONFIG_HOME` defaults to `~/.config`). To use an alternative location, please set the `CUNO_CREDENTIALS` environment variable to point to this path. For example: `export CUNO_CREDENTIALS=/home/user/my-cloud-credentials`.

Note that you should not insert your credentials directly into these locations because the `cuno creds import` command also creates corresponding bucket entries, and adds appropriate configuration settings (region, URL path style, etc.).
{% /callout %}

Assuming you have saved your credentials in a file `credentials.txt`, run the following command to add these credentials to the local set of Object Mount managed credentials:

```sh
cuno creds import credentials.txt
```

This command will attempt to discover all the buckets that these credentials have access to, as well as the settings, limitations, and compatibility of these buckets. This may take a while if you have many buckets associated with the credentials you are importing.

{% callout type="note"  %}
If you are using an S3-compatible service and are having problems, you can run a compatibility check:

```sh
cuno creds detectfeatures s3://bucket-to-test credentials.txt
```

This command will test S3-compatibility, settings, and limitations, and then reconfigure credentials based on this. It needs a bucket to be specified that it can write temporary files to for testing purposes.

{% callout type="warning"  %}
Running feature detection will use up to a few gigabytes of bandwidth and may take a few minutes to complete depending on the machine's connection speed and the S3-compatible storage provider.
{% /callout %}
{% /callout %}

## Testing that your credentials work

You can immediately test that your credentials work using a private bucket that you are happy to use for these purposes (which we will assume is called `bucket1`).

{% callout type="note"  %}
Optional: after each command, you can confirm that the changes are reflect in your cloud or object storage provider's standard GUI interface.
{% /callout %}

{% tabs %}
{% tab label="AWS S3" %}
   First, ensure that Object Mount is enabled by calling ``cuno``. If you are using a ``bash`` or ``zsh`` terminal, this will prefix your prompt with ``(cuno)``. Otherwise, run ``cuno`` again to see if Object Mount has been successfully enabled (if it has, you will see the output ``INFO: CUNO already loaded``).

   Try listing your paired buckets:

   ```shell
   #terminal
   ls s3://
   ```

   Try listing objects:
   ```shell
   #terminal
   ls s3://bucket1/
   ```

   Try writing an object:
   ```shell
   #terminal
   echo "hello world" > s3://bucket1/helloworld.txt
   ```

   Try reading that file back:

   ```shell
   #terminal
   cat s3://bucket1/helloworld.txt
   ```

   Try deleting that file:
   ```shell
   #terminal
   rm s3://bucket1/helloworld.txt
   ```
{% /tab %}
{% tab label="Microsoft Azure" %}
   First, ensure that Object Mount is enabled by calling ``cuno``. If you are using a ``bash`` or ``zsh`` terminal, this will prefix your prompt with ``(cuno)``. Otherwise, run ``cuno`` again to see if Object Mount has been successfully enabled (if it has, you will see the output ``INFO: CUNO already loaded``).

   Try listing your paired buckets:
   ```shell
   #terminal
   ls az://
   ```

   Try listing objects:
   ```shell
   #terminal
   ls az://your-azure-storage-account/bucket1/
   ```

   Try writing an object:

   ```shell
   #terminal
   echo "hello world" > az://your-azure-storage-account/bucket1/helloworld.txt
   ```

   Try reading that file back:
   
   ```shell
   #terminal
   cat az://your-azure-storage-account/bucket1/helloworld.txt
   ```

   Try deleting that file:
   
   ```shell
   #terminal
   rm az://your-azure-storage-account/bucket1/helloworld.txt
   ```
{% /tab %}
{% tab label="Google Cloud Storage" %}
   First, ensure that Object Mount is enabled by calling ``cuno``. If you are using a ``bash`` or ``zsh`` terminal, this will prefix your prompt with ``(cuno)``. Otherwise, run ``cuno`` again to see if Object Mount has been successfully enabled (if it has, you will see the output ``INFO: CUNO already loaded``).

   Try listing your paired buckets:
   
   ```shell
   #terminal
   ls gs://
   ```
   
   Try listing objects:
    
   ```shell
   #terminal
   ls gs://bucket1/
   ```
   
   Try writing an object:
   ```shell
   #terminal
   echo "hello world" > gs://bucket1/helloworld.txt
   ```
   
   Try reading that file back:
   ```shell
   #terminal         
   cat gs://bucket1/helloworld.txt
   ```
   
   Try deleting that file:
   
   ```shell
   #terminal
   rm gs://bucket1/helloworld.txt 
   ```
{% /tab %}
{% tab label="S3-compatible" %}
   First, ensure that Object Mount is enabled by calling ``cuno``. If you are using a ``bash`` or ``zsh`` terminal, this will prefix your prompt with ``(cuno)``. Otherwise, run ``cuno`` again to see if Object Mount has been successfully enabled (if it has, you will see the output ``INFO: CUNO already loaded``).

   Try listing your paired buckets:
   
   ```shell
   #terminal
   ls s3://
   ```
   
   Try listing objects:

   ```shell
   #terminal
   ls s3://bucket1/
   ```      

   Try writing an object:
  
   ```shell
   #terminal
   echo "hello world" > s3://bucket1/helloworld.txt
   ```  

   Try reading that file back:

   ```shell
   #terminal
   cat s3://bucket1/helloworld.txt
   ```  

   Try deleting that file:
   
   ```shell
   #terminal
   rm s3://bucket1/helloworld.txt
   ```  
{% /tab %}
{% /tabs %}
