---
title: Additional Options
docId: aex8oakeudeepeRa

metadata:
  title: Additional Options
  description: Additional Options

weight: 8    
---

# Additional Options

## Server-side encryption

Object Mount fully supports server-side encryption for both streaming to and from remote locations.
That includes server-side encryption with customer-provided encryption keys (SSE-C) that allows users to set their own encryption keys.
Users are responsible for managing their encryption keys as well as providing them as part of every remote request.
As a result, users have to provide custom keys to Object Mount.

### SSE in AWS S3

Object Mount fully supports the default behavior in AWS to always encrypt the user data on the server side, before it is written to disk.
Object Mount also supports customer-supplied encryption using AES-256 keys. For more information see the [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html).

In AWS S3, users specify their encryption options by setting the `AWS_S3OPTIONS` environment variable.
The available encryption options are the same as those provided by `awscli`.
For example, the following:

```console
export AWS_S3OPTIONS="--sse-write-c AES256 --sse-write-c-key xxxxxxxxxxxxxxxxxx"
```

enables AES256 server-side encryption with a customer-provided key.
All available options follow:

``` 
.. cssclass:: listtable40pc
```

``` 
+-----------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`--sse [string]`            | Specifies server-side encryption of the object in S3. Valid values are :code:`AES256` and :code:`aws:kms`. |
|                                   | The default keys are used in **encryption/decryption**.                                                    |
+-----------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`--sse-read-c [string]`     | This parameter should only be specified when **reading** an S3 object that was encrypted server-side with  |
|                                   | a customer-provided key. It specifies the algorithm to use when **decrypting** the source object.          |
|                                   | :code:`AES256` is the only valid value.                                                                    |
+-----------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`--sse-read-c-key [string]` | This parameter should be specified when **reading** an S3 object that was encrypted server-side with a     |
|                                   | customer-provided key. Specifies the customer-provided encryption key for Amazon S3 to use to **decrypt**  |
|                                   | the source object. The encryption key provided must be one that was used when the source object was        |
|                                   | created.  :code:`--sse-read-c` must be specified as well. The key provided should not be base64 encoded.   |
+-----------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`--sse-write-c [string]`    | Specifies server-side encryption for **writing** an S3 object using customer provided keys of the object   |
|                                   | in S3. :code:`AES256` is the only valid value. If you provide this value, :code:`--sse-write-c-key` must   |
|                                   | be specified as well.                                                                                      |
+-----------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`-sse-write-c-key [string]` | The customer-provided encryption key to use to server-side **encrypt** the object in S3. If you provide    |
|                                   | this value, :code:`--sse-c` must be specified as well. The key provided should not be base64 encoded.      |
+-----------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`--sse-kms-key-id [string]` | The AWS KMS key ID that should be used to server-side **encrypt** the object in S3. Note that you should   |
|                                   | only provide this parameter if the KMS key ID is different from the default S3 master KMS key.             |
+-----------------------------------+------------------------------------------------------------------------------------------------------------+
```

Note that AWS KMS keys are required only for writing encrypted objects. Reading of encrypted objects does not require the corresponding KMS key to be specified. Furthermore, only one of `--sse-write-c-key` and `--sse-kms-key-id` options can be enabled at a time. To use encryption with alternate paths the corresponding `ALT_AWS_S3OPTIONS` environment variable must be set.

### SSE in Google Cloud Storage

Object Mount fully supports the default behavior in Google Cloud Storage to always encrypt the user data on the server side, before it is written to disk. In addition to this option, Object Mount also supports customer-supplied encryption using AES-256 keys. For more information see:

> [https://cloud.google.com/storage/docs/encryption/customer-supplied-keys](https://cloud.google.com/storage/docs/encryption/customer-supplied-keys)

To enable the SSE-C option the user must set the `GS_ENCRYPTION` environment variable. For example:

```
export GS_ENCRYPTION="--sse-write-c-key xxxxxxxxxxxxxxxxxx"
```

enables AES256 server-side encryption with the specified customer-provided key.

Available options for encryption using customer-provided keys:

``` 
.. cssclass:: listtable40pc
```

``` 
+------------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`--sse-read-c-key [string]`  | This parameter should be specified when **reading** a remote object on Google Cloud Storage that was       |
|                                    | encrypted server-side with a customer-provided key. Specifies the customer-provided encryption key for     |
|                                    | Google Storage to use to decrypt the source object. The encryption key provided must be one that was used  |
|                                    | when the source object was created.                                                                        |
+------------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`--sse-write-c-key [string]` | The customer-provided encryption key to use to server-side encrypt the object in Google Cloud Storage when |
|                                    | **writing**. The key provided should not be base64 encoded.                                                |
|                                    |                                                                                                            |
|                                    | Object Mount is also fully compatible with Google’s cloud-hosted key management service (KMS).                   |
|                                    | Customer-managed keys used in encryption are provided :code:`GS_ENCRYPTION` environment variable using the |
|                                    | :code:`--sse-kms-key-id` option described below.                                                           |
+------------------------------------+------------------------------------------------------------------------------------------------------------+
| :code:`--sse-kms-key-id [string]`  | The Cloud KMS key that should be used to server-side encrypt the object in Google Cloud Storage. Note that |
|                                    | you should only provide this parameter if KMS key ID is different than the default KMS key associated with |
|                                    | the remote bucket.                                                                                         |
|                                    |                                                                                                            |
|                                    | Note that Cloud KMS keys are required only for **writing** encrypted objects. Reading of encrypted object  |
|                                    | does not require the corresponding Cloud KMS key to be specified. Furthermore, only one of                 |
|                                    | code:`--sse-write-c-key` and :code:`--sse-kms-key-id` options can be enabled at a time. All supported      |
|                                    | encryption schemes can be applied to alternate paths, e.g. :code:`altgs://mybucket/location`. To that      |
|                                    | extent, the corresponding :code:`ALT_GS_ENCRYPTION` environment variable must be set.                      |
+------------------------------------+------------------------------------------------------------------------------------------------------------+
```

### SSE in Microsoft Azure

Server-side encryption is always enabled at rest in Azure [for all containers](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption). It is the default, and cannot be disabled.
