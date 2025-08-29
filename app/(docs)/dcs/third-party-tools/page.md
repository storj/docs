---
title: Third-Party Tools
docId: REPde_t8MJMDaE2BU8RfQ
redirects:
  - /dcs/how-tos
  - /dcs/backups
  - /dcs/file-transfer
  - /dcs/multimedia-storage-and-streaming
metadata:
  title: How to Use Third-Party Tools with Storj
  description:
    Practical how-to guides for integrating Storj with popular third-party tools for backups,
    large file handling, file management, content delivery, scientific applications,
    and cloud operations.
---

This section contains practical how-to guides for integrating Storj DCS with popular third-party tools and applications. These guides help you achieve specific goals with step-by-step instructions.

## Prerequisites

Before using most third-party tools with Storj, ensure you have:

- A Storj account with valid S3-compatible credentials
- The third-party tool installed and accessible
- Basic familiarity with the tool's interface or command-line usage
- Network connectivity and appropriate firewall configurations

For credential setup, see the [Getting Started guide](docId:AsyYcUJFbO1JI8-Tu8tW3).

## How to choose the right tool

Each tool category serves different use cases:

- **Backups**: Automated, scheduled data protection with versioning and retention
- **Large Files**: Optimized handling of multi-gigabyte files and datasets  
- **File Management**: User-friendly interfaces for everyday file operations
- **Content Delivery**: Web hosting, media streaming, and public file sharing
- **Scientific**: Research data management, analysis pipelines, and collaboration
- **Cloud Ops**: Infrastructure automation, monitoring, and DevOps workflows

## Backups

{% tag-links tag="backup" directory="./app/(docs)/dcs/third-party-tools" %}
{% /tag-links %}

## Large Files

{% tag-links tag="large-file" directory="./app/(docs)/dcs/third-party-tools" %}
{% /tag-links %}

## File Management

{% tag-links tag="file-management" directory="./app/(docs)/dcs/third-party-tools" %}
{% /tag-links %}

## Content Delivery

{% tag-links tag="content-delivery" directory="./app/(docs)/dcs/third-party-tools" %}
{% /tag-links %}

## Scientific

{% tag-links tag="scientific" directory="./app/(docs)/dcs/third-party-tools" %}
{% /tag-links %}

## Cloud Ops

{% tag-links tag="cloud-ops" directory="./app/(docs)/dcs/third-party-tools" %}
{% /tag-links %}

## Verification steps

After configuring any third-party tool with Storj:

1. **Test connectivity**: Verify the tool can list your buckets or existing files
2. **Test upload**: Upload a small test file to confirm write access
3. **Test download**: Download the test file to verify read access  
4. **Check permissions**: Ensure the tool has appropriate access for your use case
5. **Validate settings**: Confirm endpoint URLs, regions, and other configuration

## Common troubleshooting

**"Access Denied" errors**: 
- Verify your S3 credentials are correct and active
- Check that your access key has the required permissions
- Ensure you're using the correct endpoint: `gateway.storjshare.io`

**Connection timeouts**:
- Check your internet connection and firewall settings
- Verify the tool supports custom S3 endpoints
- Try reducing concurrent connection limits in tool settings

**Upload/download failures**:
- For large files, ensure the tool supports multipart uploads
- Check available disk space and network stability
- Verify file paths and naming conventions are correct

**Performance issues**:
- Use the recommended chunk/part size of 64MB for uploads
- Enable multipart uploads for files larger than 64MB
- Consider network latency and bandwidth limitations

## Getting help

If you encounter issues not covered in individual tool guides:

1. Check the tool's official documentation for S3 compatibility
2. Review Storj's [S3 API compatibility reference](docId:eZ4caegh9queuQuaazoo)
3. Search the [Storj community forum](https://forum.storj.io) for similar issues
4. Contact Storj support with specific error messages and configuration details
