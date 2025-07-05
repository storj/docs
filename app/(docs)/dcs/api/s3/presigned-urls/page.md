---
title: Using presigned URLs
docId: _pCGnHv0_XwR0-mX0rIkJ
redirects:
  - /dcs/api-reference/s3-compatible-gateway/using-presigned-urls
metadata:
  title: Creating and Using Presigned URLs with Storj
  description:
    Step-by-step guide on creating and using presigned URLs for unauthenticated
    object access using Storj's S3-compatible gateway. Includes Python scripting instructions.
---

## Introduction

Creating presigned URLs for Storj - HTTP POST & GET to a URL

All objects and paths are private and encrypted by default. However, it is possible to use a pre-signed URL via our S3-compatible gateway to enable unauthenticated customers/users to upload objects to buckets or access objects in buckets without providing an [](docId:XKib9SzjtEXTXWvdyYWX6) or [](docId:AsyYcUJFbO1JI8-Tu8tW3).

## HTTP GET vs Storj Linkshare Service

While we support this behavior via the S3-compatible pre-signed URL function, as an alternative to sharing with a customer/user via a GET, consider utilizing our [](docId:sN2GhYgGUtqBVF65GhKEa). One advantage of this approach is the ability to easily create perpetual share links, valid until you remove them or until a configurable end date of any duration. You can even [host a static website](docId:GkgE6Egi02wRZtyryFyPz) via Linkshare.

## Tutorial

The goal of the following tutorial is to guide you in the creation of pre-signed URLs for Storj using a Python script and our multi-tenant hosted gateway.

Our lab example took place on MacOSX and used BREW as a package manager. Depending on your host operating system, you will need to use the appropriate package manager to fetch the prerequisites listed below.

Our implementation of the S3 standard allows additional configuration options. Please reference the official [AWS S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) for additional details.

### Prerequisites

```bash
# Install python
brew install python3
# install boto3
pip3 install boto3
pip3 install requests
```

### Script

#### Create your script my_put_script.py for uploads

This script will create a “put” pre-signed URL to be used for uploading

Below you can see we need to set the following parameters:

- **ACCESS_KEY** - S3 Credential created with Access

- **SECRET_KEY** - S3 Credential created with Access

- **URL** - You can use us1, eu1, or ap1 depending on location

- **BUCKET NAME** - Name of the bucket related to this URL

- **url** - Use ‘put_object to upload and ‘get_object’ to download/share

- **Key** - Path of the object you wish to upload

- **ExpiresIn** - How long the URL will be valid from its creation (in seconds)

```python
import boto3
ACCESS_KEY = "Your_Access_Key"
SECRET_KEY = "Your_Secret_Key"
URL = "https://gateway.storjshare.io"
BUCKET_NAME = "yourbucketname"
session = boto3.session.Session()
s3 = session.client(service_name="s3", aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY, endpoint_url=URL)
url = s3.generate_presigned_url('put_object', Params={"Bucket":BUCKET_NAME, "Key":"path/within/bucket/file.name"}, ExpiresIn=3600)
print(url)
```

#### Execute script my_put_script.py

The output of this script will be your pre-signed URL

```bash
python3 my_put_script.py
```

#### Upload with URL and Curl

Set for file name and extension and paste in your newly generated pre-signed URL. Note that the pre-signed URL below is invalid and included as an example only.

```bash
curl -v --upload-file file.name "https://gateway.storjshare.io/yourbucketname/path/within/bucket?AWSAccessKeyId=jvruleqdpbwqx7vxmwgqbtlbmapa&Signature=fUNxawPyFd%2F9apR%2FZnKmR%2BPXGCA%3D&Expires=1628019103"
```

### Script for Download

#### Create your script my_get_script.py for downloads

This script will create a "get" pre-signed URL to be used for downloading

Below you can see we need to set the following parameters:

- **ACCESS_KEY** - S3 Credential created with Access

- **SECRET_KEY** - S3 Credential created with Access

- **URL** - You can use us1, eu1, or ap1 depending on location

- **BUCKET NAME** - Name of the bucket related to this URL

- **url** - Use ‘put_object to upload and ‘get_object’ to download/share

- **Key** - Path of the object you wish to upload

- **ExpiresIn** - How long the URL will be valid from its creation (in seconds)

```python
import boto3
ACCESS_KEY = "Your_Access_Key"
SECRET_KEY = "Your_Secret_Key"
URL = "https://gateway.storjshare.io"
BUCKET_NAME = "yourbucketname"
session = boto3.session.Session()
s3 = session.client(service_name="s3", aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY, endpoint_url=URL)
url = s3.generate_presigned_url('get_object', Params={"Bucket":BUCKET_NAME, "Key":"path/within/bucket/file.name"}, ExpiresIn=3600)
print(url)
```

#### Execute script my_get_script.py

The output of this script will be your pre-signed URL

```bash
python3 my_get_script.py
```

#### Download with URL and Curl

Set for file name and extension and paste in your newly generated pre-signed URL. Note that the pre-signed URL below is invalid and included as an example only.

```bash
curl -v -o file.name "https://gateway.storjshare.io/yourbucketname/path/within/bucket/file.name?AWSAccessKeyId=jvruleqdpbwqx7vxmwgqbtlbmapa&Signature=fUNyawPyFd%2F9apT%2FZnLmD%2BPXDCB%3D&Expires=1628019103"
```
