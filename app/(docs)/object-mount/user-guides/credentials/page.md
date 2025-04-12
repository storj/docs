---
title: Credential Management
docId: aish4shuiheeZaig

metadata:
  title: Credential Management
  description: Credential Management

weight: 5    
---

## Overview 
Users will need to specify their credentials for their cloud storage accounts in order to fully use Object Mount.
`cuno creds` allows users to import and manage their credentials for supported cloud providers.
Credentials are stored in `"${XDG_CONFIG_HOME}"/cuno/creds` by default (or `~/.config/cuno/creds` if `XDG_CONFIG_HOME` is not set).

Override the defaults by setting the `CUNO_CREDENTIALS` environment variable.

{% callout type="note"  %}
`cuno creds` will determine the presence of the following paths to store credentials, in {emphasis}`descending` order of precedence:

1. `$CUNO_CREDENTIALS`
2. `"${XDG_CONFIG_HOME}"/cuno/creds`
3. `~/.config/cuno/creds`
4. `"${CUNO_ROOT}"/cuno-config/creds`
{% /callout %}

## Create and retrieve credentials

### Credential file formats

Credential files are `plain-text`, with a specific format for each cloud provider.

### Amazon Web Services S3

There are two (equivalent) formats for AWS S3 credential files:

```
aws_access_key_id     = <access_key_id>
aws_secret_access_key = <secret_access_key>
region                = <region> [optional]
```

```
AWSAccessKeyId = <access_key_id>
AWSSecretKey   = <secret_access_key>
region         = <region> [optional]
```

More information on S3 access keys is available in (user-guide-getting-s3-credentials)[../user-guides/appendix#getting-s3-credentials-using-the-aws-console].

Object Mount can also use an AWS S3 Access Point instead of a container; see [user-guide-s3-access-points](../user-guides/access#aws-s3-access-point-support) for more details.

### S3-compatible solutions

To define a custom endpoint for S3-compatible storage solutions, create a file containing at least the following:

> ```text
> aws_access_key_id = xxxxxxxxxxxxxxxxxx
> aws_secret_access_key = xxxxxxxxxxxxxxxxxx
> endpoint=http://127.0.0.1:8080
> ```

Endpoints could be IP addresses or domain URIs (optionally with port numbers). Note that a schema is required (e.g. `http://` or `https://`).
The following are examples of valid endpoint key-value pairs:

```
endpoint = http://127.0.0.1:8080
endpoint = https://s3objectstorage.example.com
```

Depending on the capabilities and behaviours of your object storage provider's S3 API, you may find the additional keys useful:

| Option | Description |
|--------|-------------|
| `skipssl` | Skip SSL certificate verification. Useful for private storage solutions with self-signed certificates. |
| `nossl` | Use HTTP protocol instead of HTTPS. Use when the endpoint starts with `http://`. |
| `pathstyle` | Switch from virtual host style to path style syntax for S3-compatible storage solutions. Enable for private storage solutions supporting only path style syntax (e.g. MinIO, Ceph). |
| `no-delete-objects` | Do not use `DeleteObjects` to remove multiple objects. Instead, use `DeleteObject` for single object removal. |
| `no-remote-copy` | Do not copy objects within the same bucket via the server; download and upload instead. |
| `no-object-tagging` | Do not attempt to get/put object tags. |
| `no-object-acl` | Do not attempt to get/put object ACLs. |
| `no-multipart-upload` | Do not attempt to use [multipart upload](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html). |
| `no-copy-part` | Do not attempt to use [UploadPartCopy](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPartCopy.html). |
| `no-range-download` | Do not attempt to use [Byte-Range Fetches](https://docs.aws.amazon.com/whitepapers/latest/s3-optimizing-performance-best-practices/use-byte-range-fetches.html); use a single request to download the whole object instead. |
| `no-delete-objects` | Do not attempt to use [DeleteObjects](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) when deleting multiple objects; use [DeleteObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html) for each object to delete. |
| `directory-marker` | Create a placeholder object when creating an empty prefix (e.g., `mkdir`). Remove the placeholder object when removing an empty directory. |
| `ignore-empty-prefixes` | Ignore directories that were removed but still reported as existing prefixes by the server. |
| `posix=<true/false>` | Set POSIX mode for all buckets associated with this credential. This option takes precedence over the POSIX mode runtime environment variable, but may be overridden by a bucket-wide POSIX setting (set via `cuno creds`). |


{% callout type="note"  %}
Some of the above options can be automatically detected and populated by running `cuno creds detectfeatures <URI> <credential file name>` (e.g. `cuno creds detectfeatures s3://test-bucket test_credentials.s3c`).
This command needs a bucket to be specified that it can write temporary files to for testing purposes. The commmand will run a series of tests against the specified bucket, checking the availability of S3 features that Object Mount uses and updating the credentials file accordingly.
{% /callout %}

{% callout type="warning"  %}
Running feature detection will use up to a few gigabytes of bandwidth and may take a few minutes to complete depending on the machine's connection speed and the S3-compatible storage provider.
{% /callout %}

## Microsoft Azure Blob Storage

Azure Blob Storage credential files have the following format:

```
AZURE_STORAGE_ACCOUNT    = <account_name>
AZURE_STORAGE_ACCESS_KEY = <access_key>
```

If you need the access key, see [View account access keys](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys).

Object Mount also supports using Shared Access Signatures (SAS) to access remote containers in Azure.
Refer to [user-guide-azure-sas]() to configure SAS.

## Google Cloud Storage

You will need key-based access to be associated with your [Google Cloud service account](https://developers.google.com/workspace/guides/create-credentials#service-account).

If you need to set this up, you can have Google generate a new key by following Google's guide, [Create and delete service account keys](https://cloud.google.com/iam/docs/keys-create-delete). Alternatively, you can generate your own key pair and upload it on the service account's key management page, by following the guide [Upload service account keys](https://cloud.google.com/iam/docs/keys-upload).

If you've generated a new key, store the JSON file you have downloaded in a safe place with appropriate access permissions, ready for the next steps.


## Import credentials

Every cloud account requires a unique credential file.
Import a credential file into Object Mount using the following command:

```console
cuno creds import <credential_file>
```

Object Mount performs the following actions when importing a credential file:

1. Detect the credential file format, and connect to the remote server.
2. Discover all possible containers that can be accessed using the provided credentials.
3. Create pairings between the imported credential file and remote containers.

{% callout type="note"  %}
Discovery only completes when the provided credentials include bucket listing permissions.
If listing permissions cannot be provided, manually pair the imported credential file to remote buckets using `cuno creds pair` (refer to [#pair-containers-and-credentials]()`).
{% /callout %}

## Pair containers and credentials

Manually pair additional containers with previously-imported credential files using `pair`:

```console
cuno creds pair <container_remote_uri> [imported_credential_file]
```

`<container_remote_uri>` is the remote URI of the container to be associated with the credential file.
`[imported_credential_file]` is optional and corresponds to the credential file that has already been imported.
If the latter is not provided, all imported credential files are listed.

To re-associate a previously paired remote container with a different credential file, use `pair` with the same remote URI and a different credential file.

{% callout type="note"  %}
Object Mount verifies that a remote container is accessible when pairing it with a credential file.
Object Mount auto-detects an AWS region if it is not specified, or is invalid.
{% /callout %}

### Microsoft Azure Blob Storage with Shared Access Signatures

To permit access to storage resources without sharing access keys, use a Shared Access Signature (SAS).
An SAS gives users access to a container for only specified intervals and with specified permissions.
A remote Microsoft Azure Blob Storage container can be accessed using a Shared Access Signature (SAS).
Provide an SAS to Object Mount using the following command:

```
cuno creds pair <container_remote_uri> "?<SAS>"
```

{% callout type="note"  %}
The question mark `?` prefix and quotation marks `"` are `required`.
{% /callout %}

### Public Access buckets

To pair a remote URI that has public access, use the following command:

```
cuno creds pair <bucket_remote_uri> public
```

Notice `public` is used in the place of the imported credential file name.

### Requester Pays buckets

Amazon AWS S3 and Google Cloud Storage offer 'Requester Pays' features for containers.
In this case, requesters—and `not` bucket owners—are billed when remote objects are accessed.

By default, Object Mount skips 'Requester Pays' containers when importing a credential file to avoid unexpected charges.
To enable access to such containers with a previously-imported credential file, run the following command:

```
cuno creds --interactive pair <bucket_remote_uri>
```

The `--interactive`/`-i` option will prompt the user to select from credentials in Object Mount's database.

#### Amazon AWS S3

To force a pairing between a 'Requester Pays' container with an imported credential file:

```
cuno creds --force pair <bucket_remote_uri> <imported_credential_file>
```

#### Google Cloud Storage

Run the command in [#requester-pays-buckets](); this will list all available project IDs associated with the selected credential file and available for billing.
Then, select and confirm a 'Requester Pays' container to pair as prompted.

To run the command non-interactively:

```
cuno creds pair --billing <billing_project_ID> <bucket_remote_uri> <imported_credential_file>
```

## List credentials

`list` displays information about imported credential files and paired buckets.
The command accepts additional options:

| Command | Description |
|---------|-------------|
| `cuno creds list` | Display all imported credential files and all paired buckets |
| `cuno creds list creds` | Display all imported credential files **only** |
| `cuno creds list pairings` | Display all paired buckets **only** |
| `cuno creds list pairings <provider>` | Display all paired buckets for the specified provider **only** |

`pairings <provider>` accepts a comma-separated list of providers.
For example, `cuno creds list pairings gs,s3` will display information about all paired buckets in Google Cloud Storage and AWS S3.

## Unpair and purge credentials

To dissociate a container from a credential file, use `unpair`:

```console
cuno creds unpair [bucket_remote_uri]
```

If the second argument is missing, then existing pairings are listed.

To completely remove a credential file and delete all its associations with remote containers, use `purge`:

```
cuno creds purge [imported_credential_file]
```

If the second argument is missing, then existing credential files are listed.

## Additional flags

Object Mount accepts additional flags:

```
cuno creds [flags] <rest_of_command>
```

These flags are described in the following table:

| Flag | Description |
|---------|-------------|
| `--interactive/-i` | Asks for permission to replace existing credential files, pairings, SAS etc. |
| `--force/-f` | Always replaces existing credential files, pairings, SAS etc. |
| `--color/-c` | Displays coloured output. |


## Alternative methods of authenticating

{% callout type="note"  %}
Prefer using the built-in credential management to administer credentials; only use the following methods if additional flexibility is required.
{% /callout %}

### Amazon AWS S3 using native credentials

Object Mount can also use the file supplied by Amazon AWS S3:

```
~/.aws/credentials
```

with the profile optionally specified with the environment variable:

```
AWS_PROFILE
```

Set the AWS region with the environment variable:

```
AWS_REGION
```

Alternatively, directly set the following two environment variables before launching Object Mount:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

### AWS S3 using IAM Roles for EC2

IAM Roles provide an alternative method to securely distribute AWS credentials across EC2 instances.
These credentials can be used for accessing AWS S3. Refer to the [Amazon AWS EC2 documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) for more information.

Object Mount will automatically detect IAM roles on an EC2 instance, so no further configuration is necessary.

{% callout type="note"  %}
Combined use of Object Mount managed credentials with IAM Roles in EC2 is `not currently supported`.
{% /callout %}

### Google Cloud Storage using environment variable

Object Mount can directly use service account credentials, which are commonly used by applications to access Google Cloud Storage. To use a service account credential file (in JSON or PKCS12 format), specify a value for the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.
For example, a credential file located in `/home/user/gckey.json` can be loaded to Object Mount by using:

```
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/gckey.json"
```

### Azure Storage using environment variables

To access Azure Storage without using Object Mount credentials management, provide a storage access key associated with a Microsoft Azure Storage account.
To enable this access scheme, set the `AZURE_STORAGE_ACCOUNT` and `AZURE_STORAGE_ACCESS_KEY` environment variables:

```console
export AZURE_STORAGE_ACCOUNT="<account-name>"
export AZURE_STORAGE_ACCESS_KEY="<account-key>"
```

{% callout type="warning"  %}
Microsoft recommends that storage access keys are not shared with anyone else.
To permit access to storage resources without sharing access keys, use a Shared Access Signature (SAS).
An SAS gives users access to a container for only specified time period with a fixed set of permissions.
Refer to [user-guide-azure-sas](#microsoft-azure-blob-storage-with-shared-access-signatures) for more information.
{% /callout %}
