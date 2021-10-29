---
description: Creating presigned URLs for Storj DCS - HTTP POST & GET to a URL
---

# Using presigned URLs

## **Introduction**

All objects and paths are private and encrypted by default. However, it is possible to use a pre-signed URL via our S3-compatible gateway to enable unauthenticated customers/users to upload objects to buckets or access objects in buckets without providing an [Access Grant](https://docs.storj.io/dcs/concepts/access/access-grants) or [S3-compatible gateway access credentials](../../getting-started/quickstart-aws-sdk-and-hosted-gateway-mt.md#generate-credentials-to-the-gateway-mt).&#x20;

### **HTTP GET vs Storj Linkshare Service**

While we support this behavior via the S3-compatible pre-signed URL function, as an alternative to sharing with a customer/user via a GET, consider utilizing our [Linkshare service](../linksharing-service.md). One advantage of this approach is the ability to easily create perpetual share links, valid until you remove them or until a configurable end date of any duration. You can even [host a static webpage on Storj DCS](../../how-tos/host-a-static-website/) via Linkshare.

## **Tutorial **

The goal of the following tutorial is to guide you in the creation of pre-signed URLs for storage DCS using a Python script and our multi-tenant hosted gateway.

Our lab example took place on MacOSX and used BREW as a package manager. Depending on your host operating system, you will need to use the appropriate package manager to fetch the prerequisites listed below.&#x20;

Our implementation of the S3 standard allows additional configuration options. Please reference the official [AWS S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) for additional details.&#x20;

### **Prerequisites**

```bash
# Install python
brew install python3
# install boto3
pip3 install boto3
pip3 install requests
```

### **Script**

#### Create your script my\_put\_script.py

This script will create a “put” pre-signed URL to be used for uploading

Below you can see we need to set the following parameters:

* **ACCESS\_KEY **- S3 Credential created with Access
* **SECRET\_KEY** - S3 Credential created with Access
* **URL** - You can use us1, eu1, or ap1 depending on location
* **BUCKET NAME** - Name of the bucket related to this URL
* **url** - Use ‘put\_object to upload and ‘get\_object’ to download/share
* **Key** - Path of the object you wish to upload
* **ExpiresIn** - How long the URL will be valid from its creation (in seconds)

```python
import boto3
ACCESS_KEY = "Your_Access_Key"
SECRET_KEY = "Your_Secret_Key"
URL = "https://gateway.us1.storjshare.io"
BUCKET_NAME = "yourbucketname"
session = boto3.session.Session()
s3 = session.client(service_name="s3", aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY, endpoint_url=URL)
url = s3.generate_presigned_url('put_object', Params={"Bucket":BUCKET_NAME, "Key":"path/within/bucket/file.name"}, ExpiresIn=3600)
print(url)
```

#### **Execute script myscript.py**

The output of this script will be your pre-signed URL

```bash
python3 my_put_script.py
```

#### **Upload with URL and Curl**

Set for file name and extension and paste in your newly generated pre-signed URL. Note that the pre-signed URL below is invalid and included as an example only.

```bash
curl -v --upload-file file.name "https://gateway.us1.storjshare.io/yourbucketname/path/within/bucket?AWSAccessKeyId=jvruleqdpbwqx7vxmwgqbtlbmapa&Signature=fUNxawPyFd%2F9apR%2FZnKmR%2BPXGCA%3D&Expires=1628019103"
```
