---
title: Set up object versioning
docId: setup-object-vers1
metadata:
  title: How to Set Up Object Versioning - Storj DCS
  description: Step-by-step guide to enable object versioning on your Storj DCS buckets for data protection and recovery
---

Set up object versioning to preserve, retrieve, and restore every version of every object in your bucket. This adds data protection against accidental deletions and overwrites.

## Prerequisites

- Storj DCS account with active project
- S3-compatible credentials (access key and secret key)
- Bucket where you want to enable versioning
- S3-compatible tool or SDK (AWS CLI, boto3, etc.)

## Enable versioning on a bucket

### Using AWS CLI

Configure your credentials and enable versioning:

```bash
# Configure credentials (one time setup)
aws configure set aws_access_key_id YOUR_ACCESS_KEY
aws configure set aws_secret_access_key YOUR_SECRET_KEY
aws configure set default.region us-east-1

# Enable versioning on bucket
aws s3api put-bucket-versioning \
  --bucket YOUR_BUCKET_NAME \
  --versioning-configuration Status=Enabled \
  --endpoint-url https://gateway.storjshare.io
```

### Using Python (boto3)

```python
import boto3

# Create S3 client
s3 = boto3.client(
    's3',
    aws_access_key_id='YOUR_ACCESS_KEY',
    aws_secret_access_key='YOUR_SECRET_KEY',
    endpoint_url='https://gateway.storjshare.io'
)

# Enable versioning
s3.put_bucket_versioning(
    Bucket='YOUR_BUCKET_NAME',
    VersioningConfiguration={
        'Status': 'Enabled'
    }
)
```

## Verify versioning is enabled

Check the versioning status of your bucket:

```bash
# Using AWS CLI
aws s3api get-bucket-versioning \
  --bucket YOUR_BUCKET_NAME \
  --endpoint-url https://gateway.storjshare.io
```

Expected output:
```json
{
    "Status": "Enabled"
}
```

## Upload versioned objects

Once versioning is enabled, each object upload creates a new version:

```bash
# Upload the same file multiple times
echo "Version 1" > test-file.txt
aws s3 cp test-file.txt s3://YOUR_BUCKET_NAME/ --endpoint-url https://gateway.storjshare.io

echo "Version 2" > test-file.txt  
aws s3 cp test-file.txt s3://YOUR_BUCKET_NAME/ --endpoint-url https://gateway.storjshare.io
```

List all versions:
```bash
aws s3api list-object-versions \
  --bucket YOUR_BUCKET_NAME \
  --endpoint-url https://gateway.storjshare.io
```

## Suspend versioning

To stop creating new versions while keeping existing ones:

```bash
aws s3api put-bucket-versioning \
  --bucket YOUR_BUCKET_NAME \
  --versioning-configuration Status=Suspended \
  --endpoint-url https://gateway.storjshare.io
```

## Verification

1. **Check versioning status**: Run `get-bucket-versioning` and confirm `Status: "Enabled"`
2. **Upload test files**: Upload the same filename twice and verify multiple versions exist
3. **List versions**: Use `list-object-versions` to see all versions of your objects

## Troubleshooting

**"Versioning cannot be enabled" error**: The bucket was created before versioning support. Create a new bucket to use versioning.

**No versions appearing**: Ensure you're using the S3-compatible gateway endpoint (`https://gateway.storjshare.io`) in your commands.

**Cost concerns**: Each object version is stored separately and incurs storage costs. Monitor your usage and implement lifecycle policies to manage older versions.

## Next steps

- [Configure Object Lock](docId:gjrGzPNnhpYrAGTTAUaj) for additional protection
- Learn about [object lifecycle management](docId:your-lifecycle-doc)
- Set up [bucket logging](docId:your-logging-doc) to track version access