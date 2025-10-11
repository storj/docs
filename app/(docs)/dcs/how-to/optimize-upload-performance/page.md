---
title: Optimize upload performance  
docId: optimize-upload-performance
metadata:
  title: How to Optimize Upload Performance - Storj DCS
  description: Improve file upload speeds using parallel transfers with Rclone and Uplink CLI
---

Optimize your upload performance to Storj DCS using parallel transfers and proper configuration settings.

## Prerequisites

- Storj DCS account with project and bucket set up
- Rclone configured with Storj (recommended for multiple files)
- OR Uplink CLI installed (for single large files)
- Files ready for upload
- Sufficient RAM for parallel transfers

## Choose the right tool

**For multiple small-to-medium files (< 1GB each)**: Use Rclone with `--transfers` flag
**For single large files (> 1GB)**: Use Uplink CLI with `--parallelism` flag
**For mixed workloads**: Start with Rclone

## Optimize single large file uploads

### Calculate optimal settings

For a large file, determine concurrency based on file size:
- File size ÷ 64MB = maximum concurrency segments
- Each segment uses ~64MB of RAM during transfer

Example for 1GB file: 1024MB ÷ 64MB = 16 segments maximum

### Upload with Rclone

```bash
# Upload 1GB file with optimal parallelism
rclone copy --progress \
  --s3-upload-concurrency 16 \
  --s3-chunk-size 64M \
  large-file.zip remote:bucket
```

### Upload with Uplink CLI

```bash  
# Upload with native Storj performance
uplink cp large-file.zip sj://bucket/large-file.zip --parallelism 4
```

## Optimize multiple file uploads

### Upload multiple files simultaneously

```bash
# Upload 4 files at once with Rclone
rclone copy --progress \
  --transfers 4 \
  --s3-upload-concurrency 16 \
  --s3-chunk-size 64M \
  /local/folder remote:bucket
```

### Calculate memory usage

Memory usage = transfers × concurrency × chunk size
- 4 transfers × 16 concurrency × 64MB = 4GB RAM required

## Configuration examples

### Small files (< 100MB)
```bash
rclone copy --progress \
  --transfers 10 \
  --s3-chunk-size 64M \
  /local/photos remote:bucket
```

### Medium files (100MB - 1GB)  
```bash
rclone copy --progress \
  --transfers 4 \
  --s3-upload-concurrency 8 \
  --s3-chunk-size 64M \
  /local/videos remote:bucket
```

### Large files (> 1GB)
```bash
rclone copy --progress \
  --transfers 2 \
  --s3-upload-concurrency 32 \
  --s3-chunk-size 64M \
  /local/archives remote:bucket
```

## Monitor and adjust performance

### Watch transfer progress

Add monitoring flags to see performance:
```bash
rclone copy --progress --stats 30s \
  --transfers 4 \
  --s3-upload-concurrency 16 \
  --s3-chunk-size 64M \
  /local/folder remote:bucket
```

### Test different settings

1. Start with conservative settings
2. Monitor RAM and CPU usage  
3. Gradually increase concurrency/transfers
4. Find optimal balance for your system

## Verification

1. **Check upload completion**: Verify all files appear in your bucket
2. **Monitor system resources**: Ensure RAM/CPU usage stays manageable
3. **Measure throughput**: Compare upload speeds with different settings
4. **Test large files**: Confirm segment parallelism works correctly

## Troubleshooting

**Out of memory errors**:
- Reduce `--transfers` or `--s3-upload-concurrency`  
- Monitor RAM usage during transfers
- Consider smaller `--s3-chunk-size` for very memory-limited systems

**Slow upload speeds**:
- Increase concurrency if you have available RAM
- Check network bandwidth limitations
- Try Uplink CLI for single large files

**Transfer failures**:
- Reduce parallelism settings and retry
- Check network stability
- Verify bucket permissions and access

## Advanced optimization

### System-specific tuning

Calculate optimal settings for your system:
```bash
# Check available RAM
free -h

# Monitor transfer performance  
htop

# Test network bandwidth
speedtest-cli
```

### Batch operations

For regular uploads, create scripts with optimized settings:
```bash
#!/bin/bash
# upload-optimized.sh
rclone copy --progress \
  --transfers 6 \
  --s3-upload-concurrency 12 \
  --s3-chunk-size 64M \
  "$1" remote:bucket
```

## Next steps

- Learn about [download performance optimization](docId:optimize-download-perf)
- Set up [monitoring and analytics](docId:bucket-logging) for transfer metrics  
- Configure [automated sync](docId:use-rclone) for ongoing file management