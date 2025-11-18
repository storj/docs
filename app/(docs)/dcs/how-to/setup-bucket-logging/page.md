---
title: Set up bucket logging
docId: setup-bucket-logging
metadata:
  title: How to Set Up Bucket Logging - Storj DCS
  description: Enable server access logging for your Storj DCS buckets to track all requests and operations
---

Enable bucket logging to track all access requests to your buckets. This feature is available upon request and provides detailed logs in S3 server access log format.

## Prerequisites

- Active Storj DCS project
- Target bucket to monitor
- Destination bucket for storing logs
- Write-only access grant for the destination bucket

## Request bucket logging activation

### Submit support request

1. Go to [Storj DCS Support](https://supportdcs.storj.io/hc/en-us/requests/new?ticket_form_id=360000379291)
2. Select "Enable Bucket Logging" as the subject
3. Allow up to two weeks for processing

### Prepare required information

Gather the following details for your request:

**Source bucket information:**
- Satellite (AP1, EU1, or US1)
- Project name  
- Bucket name(s) to monitor

**Destination bucket information:**
- Destination project name
- Destination bucket name
- Optional: Key prefix for log files
- Write-only access grant (see next section)

## Create write-only access grant

### Generate the access grant

1. **Open Storj console**: Log in to your satellite UI
2. **Create new access**: Click "New Access Key" → "Access Grant"
3. **Name the grant**: Use descriptive name like "bucket-logging-destination"

### Configure advanced options

4. **Select Advanced Options**: Click "Advanced Options" on the second screen
5. **Set encryption passphrase**: Enter a secure passphrase

{% callout type="warning" %}
**Important:** Save this passphrase securely. You'll need it to decrypt log data later.
{% /callout %}

### Set permissions

6. **Choose Write Only**: Select "Write Only" permissions
7. **Limit to destination bucket**: Specify the exact bucket for logs
8. **Set no expiration**: Select "No Expiration" to ensure continuous logging

### Complete access grant creation

9. **Review settings**: Verify all selections are correct
10. **Create access**: Click "Create Access" to generate the grant
11. **Save the access grant**: Copy and securely store the generated access grant string

## Submit your logging request

Include this information in your support ticket:

```
Subject: Enable Bucket Logging

Source Bucket Details:
- Satellite: US1
- Project Name: my-production-project  
- Bucket Name: my-monitored-bucket

Destination Details:
- Destination Project: my-logging-project
- Destination Bucket: access-logs-bucket
- Prefix (optional): prod-logs/
- Write-only Access Grant: [paste your access grant here]
```

## Verification

After logging is enabled by Storj support:

### Check for log files

1. **Wait for activity**: Perform some operations on your monitored bucket
2. **Check destination bucket**: Look for log files in your destination bucket  
3. **Verify log format**: Confirm logs follow the expected naming pattern:
   ```
   [prefix]YYYY-MM-DD-hh-mm-ss-[UniqueString]
   ```

### Download and examine logs

```bash
# Download recent log files
uplink cp sj://logs-bucket/prod-logs/ ./logs/ --recursive

# Examine log content (example format)
cat 2024-08-29-15-30-45-ABC123.log
```

## Understanding log format

Log entries follow [Amazon S3 Server Access Log Format](https://docs.aws.amazon.com/AmazonS3/latest/userguide/LogFormat.html) with these key fields:

- **Timestamp**: When the request occurred
- **Remote IP**: Client IP address  
- **Requester**: Authenticated user ID
- **Request ID**: Unique identifier for the request
- **Operation**: API operation performed (GET, PUT, DELETE, etc.)
- **Key**: Object key accessed
- **HTTP Status**: Response code (200, 404, etc.)
- **Bytes Sent**: Size of response
- **User Agent**: Client application identifier

### Example log entry

```
project-id bucket-name [29/Aug/2024:15:30:45 +0000] 192.168.1.100 
user-id ABC123 GetObject myfile.pdf "GET /bucket-name/myfile.pdf HTTP/1.1" 
200 - 1024 - - - "curl/7.68.0" - request-signature SigV4
```

## Troubleshooting

**No log files appearing**:
- Verify bucket logging was activated by support
- Confirm the access grant has write permissions to destination bucket
- Check that monitored bucket has actual activity

**Cannot decrypt log files**:
- Ensure you're using the correct encryption passphrase from access grant creation
- Verify the access grant hasn't expired

**Access denied errors**:
- Confirm the write-only access grant is valid
- Check that destination bucket exists and is accessible
- Verify project permissions

## Monitor and manage logs

### Log rotation and storage

Logs are automatically created with timestamps. Consider:
- Setting up lifecycle policies for log retention
- Monitoring storage costs for log accumulation
- Implementing automated log processing pipelines

### Analyze access patterns  

Use logs to:
- Monitor access frequency and patterns
- Identify unusual access attempts
- Track bandwidth usage per client
- Audit compliance requirements

## Next steps

- Set up [automated log processing](docId:your-log-processing-guide) 
- Configure [monitoring alerts](docId:your-monitoring-guide) for unusual access patterns
- Learn about [security best practices](docId:your-security-guide) for log management