---
title: Use presigned URLs
docId: use-presigned-urls
metadata:
  title: How to Use Presigned URLs - Storj DCS
  description: Create presigned URLs to allow unauthenticated access to your Storj objects for uploads and downloads
---

Create presigned URLs to enable unauthenticated users to upload or download objects without exposing your credentials.

## Prerequisites

- Storj DCS account with S3-compatible credentials
- Python 3.x installed
- boto3 library (`pip install boto3`)
- Target bucket already created

## Create presigned URL for uploads

### Set up the upload script

Create `create_upload_url.py`:

```python
import boto3

# Configure your credentials
ACCESS_KEY = "your_access_key_here"
SECRET_KEY = "your_secret_key_here"
ENDPOINT_URL = "https://gateway.storjshare.io"
BUCKET_NAME = "your-bucket-name"

# Create S3 client
session = boto3.session.Session()
s3 = session.client(
    service_name="s3",
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    endpoint_url=ENDPOINT_URL
)

# Generate presigned URL for upload (valid for 1 hour)
upload_url = s3.generate_presigned_url(
    'put_object',
    Params={
        "Bucket": BUCKET_NAME,
        "Key": "uploads/my-file.txt"  # Path where file will be stored
    },
    ExpiresIn=3600  # URL expires in 1 hour
)

print("Upload URL:", upload_url)
```

### Run the script

```bash
python3 create_upload_url.py
```

### Use the presigned URL

Upload a file using curl:

```bash
curl -X PUT \
  --upload-file local-file.txt \
  "YOUR_GENERATED_PRESIGNED_URL"
```

## Create presigned URL for downloads

### Set up the download script

Create `create_download_url.py`:

```python
import boto3

# Configure your credentials  
ACCESS_KEY = "your_access_key_here"
SECRET_KEY = "your_secret_key_here"
ENDPOINT_URL = "https://gateway.storjshare.io"
BUCKET_NAME = "your-bucket-name"

# Create S3 client
session = boto3.session.Session()
s3 = session.client(
    service_name="s3",
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    endpoint_url=ENDPOINT_URL
)

# Generate presigned URL for download (valid for 1 hour)
download_url = s3.generate_presigned_url(
    'get_object',
    Params={
        "Bucket": BUCKET_NAME,
        "Key": "path/to/your/file.txt"  # Existing file path
    },
    ExpiresIn=3600  # URL expires in 1 hour
)

print("Download URL:", download_url)
```

### Use the download URL

Download the file:

```bash
curl -o downloaded-file.txt "YOUR_GENERATED_PRESIGNED_URL"
```

Or share the URL directly with users to download in their browser.

## Customize expiration time

Set different expiration periods based on your needs:

```python
# 15 minutes
ExpiresIn=900

# 24 hours  
ExpiresIn=86400

# 7 days
ExpiresIn=604800
```

## Verification

1. **Generate URL**: Run your script and confirm it outputs a valid URL
2. **Test upload**: Use curl to upload a file with the presigned upload URL
3. **Check object**: Verify the object appears in your bucket
4. **Test download**: Generate a download URL and verify you can retrieve the file
5. **Test expiration**: Wait for URL to expire and confirm it no longer works

## Troubleshooting

**"Access Denied" errors**: 
- Verify your S3 credentials have proper permissions
- Check that the bucket name is correct
- Ensure you're using the correct endpoint URL

**"URL expired" errors**: 
- Generate a new presigned URL
- Increase the `ExpiresIn` value if needed

**Upload fails**: 
- Verify the object key path is valid
- Ensure the bucket allows uploads
- Check that the file size is within limits

## Security considerations

- URLs contain temporary credentials in query parameters
- Share URLs only over secure channels (HTTPS)
- Use appropriate expiration times (shorter is more secure)
- Monitor bucket access logs for unauthorized usage

## Next steps

- Learn about [Storj Linkshare](docId:sN2GhYgGUtqBVF65GhKEa) as an alternative sharing method
- Set up [static website hosting](docId:GkgE6Egi02wRZtyryFyPz) for public file sharing
- Configure [bucket CORS settings](docId:configure-cors) for web applications