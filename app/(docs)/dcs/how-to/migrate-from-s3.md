---
title: Migrate from AWS S3
docId: migrate-from-s3-guide
metadata:
  title: How to Migrate from AWS S3 to Storj DCS
  description: Complete guide to migrate your data and applications from Amazon S3 to Storj DCS
---

{% callout type="info" %}
**How-to Guide** - Problem-solving guide for specific tasks
{% /callout %}

Migrate your data and applications from Amazon S3 to Storj DCS with minimal disruption to your workflows.

## Prerequisites

- AWS S3 buckets and data to migrate
- AWS CLI or S3-compatible tools (Rclone recommended)
- Storj DCS account with project set up
- S3-compatible credentials for Storj DCS

## Migration planning

### Assess your current setup

1. **Inventory your S3 buckets**: List all buckets and estimate data volumes
2. **Document S3 features in use**: Versioning, lifecycle policies, CORS, etc.
3. **Review access patterns**: Identify high-traffic vs. archival data
4. **Check integrations**: Note applications and services using S3

### Create migration timeline

- **Small datasets (< 1TB)**: Can typically migrate in hours
- **Medium datasets (1-10TB)**: Plan for 1-3 days  
- **Large datasets (> 10TB)**: May require 1-2 weeks with parallel transfers

## Set up Storj DCS

### Create destination buckets

Match your S3 bucket structure in Storj:

```bash
# Create buckets using uplink CLI
uplink mb sj://production-data
uplink mb sj://staging-assets
uplink mb sj://backup-files
```

### Configure equivalent features

Enable features that match your S3 setup:
- **Object versioning**: [Set up versioning](docId:setup-object-vers1) if used in S3
- **CORS policies**: [Configure CORS](docId:configure-cors) for web applications
- **Bucket logging**: [Request logging](docId:setup-bucket-logging) if needed

## Choose migration method

### Method 1: Rclone (recommended)

Best for most migrations due to parallel transfers and resume capability.

#### Configure Rclone for both providers

```bash
# Configure AWS S3 source
rclone config create aws-source s3 \
  provider=AWS \
  access_key_id=YOUR_AWS_ACCESS_KEY \
  secret_access_key=YOUR_AWS_SECRET_KEY \
  region=us-east-1

# Configure Storj destination  
rclone config create storj-dest s3 \
  provider=Other \
  access_key_id=YOUR_STORJ_ACCESS_KEY \
  secret_access_key=YOUR_STORJ_SECRET_KEY \
  endpoint=https://gateway.storjshare.io
```

#### Perform the migration

```bash
# Migrate single bucket with progress tracking
rclone copy aws-source:source-bucket storj-dest:dest-bucket \
  --progress --stats 30s \
  --transfers 4 \
  --s3-chunk-size 64M \
  --checksum

# Migrate multiple buckets
rclone copy aws-source: storj-dest: \
  --progress --stats 30s \
  --transfers 2 \
  --s3-chunk-size 64M \
  --exclude "*.tmp"
```

### Method 2: AWS CLI to Storj

Good for scripted migrations and AWS CLI users.

#### Set up dual configuration

```bash
# Configure AWS CLI with Storj profile
aws configure set profile.storj.s3.endpoint_url https://gateway.storjshare.io
aws configure set profile.storj.aws_access_key_id YOUR_STORJ_ACCESS_KEY  
aws configure set profile.storj.aws_secret_access_key YOUR_STORJ_SECRET_KEY
```

#### Migrate data

```bash
# Sync bucket contents
aws s3 sync s3://aws-source-bucket s3://storj-dest-bucket \
  --profile storj \
  --exclude "*.tmp" \
  --delete
```

## Optimize migration performance

### Large file transfers

```bash
# Use maximum parallelism for large files
rclone copy aws-source:large-files storj-dest:large-files \
  --transfers 2 \
  --s3-upload-concurrency 32 \
  --s3-chunk-size 64M \
  --progress
```

### Many small files

```bash  
# Increase concurrent transfers for small files
rclone copy aws-source:small-files storj-dest:small-files \
  --transfers 8 \
  --s3-chunk-size 64M \
  --progress
```

### Resume interrupted transfers

```bash
# Rclone automatically resumes with same command
rclone copy aws-source:bucket storj-dest:bucket \
  --progress \
  --transfers 4
```

## Update applications

### Change S3 endpoints

Update your application configuration to use Storj:

```python
# Before (AWS S3)
s3_client = boto3.client('s3', region_name='us-east-1')

# After (Storj DCS)  
s3_client = boto3.client(
    's3',
    endpoint_url='https://gateway.storjshare.io',
    aws_access_key_id='your_storj_access_key',
    aws_secret_access_key='your_storj_secret_key'
)
```

### Update SDK configurations

Most S3-compatible SDKs only need endpoint URL changes:

```javascript
// Node.js AWS SDK v3
const s3Client = new S3Client({
  endpoint: "https://gateway.storjshare.io",
  credentials: {
    accessKeyId: "your_storj_access_key",
    secretAccessKey: "your_storj_secret_key"
  },
  region: "us-east-1" // Required but not used by Storj
});
```

## Verification

### Validate data integrity

```bash
# Compare object counts
aws s3api list-objects-v2 --bucket aws-source | jq '.KeyCount'
aws s3api list-objects-v2 --bucket storj-dest --profile storj | jq '.KeyCount'

# Verify file checksums with rclone
rclone check aws-source:bucket storj-dest:bucket --one-way
```

### Test application functionality

1. **Update staging environment**: Test applications against Storj endpoints
2. **Verify uploads/downloads**: Confirm all operations work correctly  
3. **Check performance**: Monitor transfer speeds and latency
4. **Test error handling**: Ensure graceful handling of any compatibility issues

## Production cutover

### Gradual migration approach

1. **Phase 1**: Migrate archival/backup data first
2. **Phase 2**: Migrate staging environments
3. **Phase 3**: Switch production traffic during low-usage periods

### DNS and load balancer updates

For applications using custom domains:
- Update DNS CNAME records to point to Storj endpoints
- Modify load balancer configurations
- Update CDN origin settings if applicable

## Post-migration cleanup

### Monitor performance

Track key metrics for the first few weeks:
- Transfer speeds and latency
- Error rates and failed requests
- Storage costs compared to S3

### Decommission AWS resources

After successful migration:
1. **Backup verification**: Ensure all data migrated correctly
2. **Stop S3 lifecycle policies**: Prevent unexpected deletions
3. **Delete S3 buckets**: Remove old buckets to stop billing
4. **Clean up IAM roles**: Remove unused S3 access policies

## Troubleshooting

**Slow migration speeds**:
- Increase `--transfers` and `--s3-upload-concurrency`
- Check bandwidth limitations
- Consider migrating during off-peak hours

**Authentication errors**:
- Verify Storj S3 credentials are correct
- Ensure endpoint URL uses `https://gateway.storjshare.io`
- Check that access grants have proper permissions

**Application compatibility issues**:
- Review [S3 API compatibility](docId:your-s3-compat-doc) documentation
- Test specific S3 features your application uses
- Contact Storj support for compatibility questions

## Cost optimization

### Compare ongoing costs

Monitor your new costs structure:
- **Storage**: $4/TB/month vs. S3 pricing
- **Bandwidth**: $7/TB egress vs. S3 data transfer costs
- **Operations**: No per-request charges vs. S3 request pricing

### Implement cost controls

- Set up billing alerts
- Monitor usage patterns
- Optimize data lifecycle policies

## Next steps

- Set up [performance monitoring](docId:your-monitoring-guide) for ongoing optimization
- Configure [backup strategies](docId:your-backup-guide) for critical data
- Learn about [advanced Storj features](docId:your-advanced-guide) to maximize benefits