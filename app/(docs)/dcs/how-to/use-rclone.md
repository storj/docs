---
title: How to use Rclone with Storj
docId: use-rclone-how-to
metadata:
  title: How to Use Rclone with Storj DCS
  description: Step-by-step guide to configure and use Rclone with Storj, including choosing between S3-compatible and native integration.
---

This guide shows you how to set up and use Rclone with Storj DCS, including how to choose the right integration method for your needs.

## Prerequisites

Before using Rclone with Storj, ensure you have:

- A Storj account with S3-compatible credentials
- Basic familiarity with command-line operations
- Rclone installed on your system

If you need to set up credentials or install Rclone, follow the [Getting Started guide](docId:AsyYcUJFbO1JI8-Tu8tW3) first.

## Choose your integration method

Storj offers two ways to use Rclone, each with different advantages:

### S3-Compatible Integration
Best for: Upload-heavy workloads, server applications, bandwidth-limited connections

**Advantages:**
- Faster upload performance
- Reduced network bandwidth usage (1GB file = 1GB uploaded)
- Server-side encryption handled automatically
- Lower system resource usage

**Trade-offs:**
- Data passes through Storj gateway servers
- Relies on Storj's server-side encryption

### Native Integration  
Best for: Download-heavy workloads, maximum security requirements, distributed applications

**Advantages:**
- End-to-end client-side encryption
- Faster download performance
- Direct connection to storage nodes
- Maximum privacy and security

**Trade-offs:**
- Higher upload bandwidth usage (1GB file = ~2.7GB uploaded due to erasure coding)
- More CPU usage for local erasure coding

## Configure S3-compatible integration

If you chose S3-compatible integration, configure Rclone with these settings:

1. Edit your Rclone configuration file:

   ```shell
   rclone config file
   ```

2. Add or update your Storj configuration:

   ```ini
   [storj]
   type = s3
   provider = Storj
   access_key_id = your_access_key
   secret_access_key = your_secret_key
   endpoint = gateway.storjshare.io
   chunk_size = 64Mi
   disable_checksum = true
   ```

3. Test your configuration:

   ```shell
   rclone lsf storj:
   ```

For complete setup instructions and common commands, see the [S3-compatible Rclone guide](docId:AsyYcUJFbO1JI8-Tu8tW3).

## Configure native integration

If you chose native integration, follow these steps:

1. Set up native Rclone integration with Storj's uplink protocol
2. Configure client-side encryption settings
3. Test connectivity to the distributed network

For detailed setup instructions and commands, see the [Native Rclone guide](docId:Mk51zylAE6xmqP7jUYAuX).

## Verify your setup

After configuration, verify Rclone works correctly:

1. **List buckets** to confirm connectivity:
   ```shell
   rclone lsf storj:
   ```

2. **Test upload** with a small file:
   ```shell
   echo "test content" > test.txt
   rclone copy test.txt storj:my-test-bucket/
   ```

3. **Test download** to verify the round trip:
   ```shell
   rclone copy storj:my-test-bucket/test.txt ./downloaded-test.txt
   ```

4. **Clean up** the test file:
   ```shell
   rclone delete storj:my-test-bucket/test.txt
   ```

## Troubleshooting

**Configuration not found**: Run `rclone config file` to locate your configuration file path.

**Access denied errors**: Verify your credentials are correct and have the necessary permissions.

**Slow performance**: For S3-compatible mode, ensure `chunk_size = 64Mi` is set. For native mode, this is expected for uploads due to erasure coding.

**Connection timeouts**: Check your internet connection and firewall settings. Native mode requires access to distributed storage nodes.

## Next steps

Once Rclone is working with Storj:

- [Optimize upload performance for large files](#)
- [Set up automated sync workflows](#)
- [Configure Rclone for backup applications](#)
- [Explore advanced Rclone features](#)