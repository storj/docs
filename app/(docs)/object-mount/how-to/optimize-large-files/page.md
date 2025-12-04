---
title: Optimize for large files
docId: optimize-large-files
metadata:
  title: How to Optimize Object Mount for Large Files
  description: Configure Object Mount for optimal performance with large files and media workflows
---

Optimize Object Mount configuration for working with large files, media assets, and high-bandwidth workflows.

## Prerequisites

- Object Mount installed and activated
- Mount with write access (for caching and prefetch)
- Understanding of your file sizes and workflow patterns
- Adequate local storage for caching (recommended: 10-50GB)

## Configure caching for large files

### Enable data caching

**Set up local data cache**:
1. **Go to Preferences > Cache Settings**
2. **Enable Data Cache**: Check the box
3. **Set cache size**: Allocate 10-50GB based on available disk space
4. **Choose cache location**: Use fastest local storage (SSD preferred)
5. **Configure cache policies**:
   - **Aggressive caching** for frequently accessed files
   - **Conservative caching** to preserve local disk space

### Optimize metadata caching

**Configure metadata cache**:
1. **Enable Metadata Cache**: Check the box
2. **Set TTL (Time To Live)**: 
   - 15-30 minutes for active projects
   - 5 minutes for frequently changing directories
3. **Cache directory listings**: Enable for faster browsing

### Cache location best practices

**Choose optimal cache directory**:
```bash
# macOS: Use high-speed SSD
~/Library/Caches/Object Mount/

# Linux: Place on fastest available storage  
~/.cache/object-mount/

# Windows: Use SSD if available
C:\Users\%username%\AppData\Local\Object Mount\cache\
```

## Configure connection optimization

### Adjust connection pool settings

**Optimize for high-bandwidth connections**:
1. **Go to Preferences > Advanced Settings**
2. **S3 Connection Pool Size**:
   - **50-100**: Basic broadband (< 100 Mbps)
   - **150-200**: High-speed fiber (1 Gbps+)
   - **250-300**: Very high-speed connections (10 Gbps+)
3. **Concurrent transfers**: Match your bandwidth capacity

### Enable file prefetching

**Configure automatic prefetch**:
1. **Set environment variable**: `CUNO_OPTIONS=-filePrefetch`
2. **Add to shell profile** (macOS/Linux):
   ```bash
   echo 'export CUNO_OPTIONS="-filePrefetch"' >> ~/.bashrc
   source ~/.bashrc
   ```
3. **Windows**: Set in System Environment Variables

## Optimize transfer behavior

### Configure multi-part uploads

**For files larger than 64MB**:
1. **Enable multi-part uploads** in Advanced Settings
2. **Set chunk size**: 
   - **64MB**: Good balance for most connections
   - **128MB**: For very high-speed connections
   - **32MB**: For slower or unstable connections

### Adjust timeout settings

**Increase timeouts for large files**:
1. **Connection timeout**: 60-120 seconds
2. **Read timeout**: 300-600 seconds  
3. **Write timeout**: 600-1200 seconds for very large files

## Optimize for specific file types

### Video and media files

**Configuration for media workflows**:
```bash
# Set optimal options for media work
export CUNO_OPTIONS="-filePrefetch -chunkSize=128M -connectionPool=200"
```

**Media-specific settings**:
- **Enable aggressive caching** for active projects
- **Use local scratch disks** for rendering and temporary files
- **Keep media cache on local storage** (not on mounted storage)

### Large datasets and archives  

**For scientific data, backups, archives**:
- **Conservative caching**: Only cache frequently accessed files
- **Higher connection pools**: Maximize parallel transfers
- **Longer metadata TTL**: Reduce API calls for static datasets

### CAD and design files

**For engineering and design workflows**:
- **Moderate caching**: Balance between performance and storage
- **Shorter timeouts**: Faster failure detection
- **Enable version-aware caching**: If files change frequently

## Monitor and tune performance

### Monitor transfer speeds

**Track performance metrics**:
```bash
# Monitor network utilization
iftop -i your-interface          # Linux/macOS
netstat -e                      # Windows

# Check Object Mount process usage
top -p $(pgrep cuno)            # Linux  
Activity Monitor               # macOS
Task Manager                   # Windows
```

### Identify bottlenecks

**Common performance limiters**:
- **Network bandwidth**: Test with speed test tools
- **Local disk I/O**: Monitor disk queue depth and utilization
- **CPU usage**: Check if encryption/compression is CPU-bound
- **Memory usage**: Ensure adequate RAM for caching

### Adjust based on usage patterns

**Sequential access patterns** (video playback):
- Increase prefetch buffer size
- Use larger chunk sizes
- Enable aggressive read-ahead caching

**Random access patterns** (browsing, thumbnails):
- Smaller chunk sizes
- More conservative caching
- Higher connection pool for parallel requests

## Application-specific optimization

### Creative applications (Adobe, Avid, etc.)

**Optimize for NLE workflows**:
1. **Proxy workflows**: Use Object Mount for source media, local storage for proxies
2. **Media cache location**: Keep application caches on local fast storage
3. **Project files**: Store project files locally, media on mounted storage

**Configuration example**:
```bash
# Optimized for video editing
export CUNO_OPTIONS="-filePrefetch -chunkSize=64M -connectionPool=150 -cacheSize=20GB"
```

### Database and structured data

**For applications accessing databases**:
- **Disable POSIX mode** unless specifically required
- **Use smaller chunk sizes** for frequent small reads
- **Enable metadata caching** with shorter TTL

## Handle very large files (> 10GB)

### Special considerations

**For extremely large files**:
1. **Monitor memory usage**: Large files can consume significant RAM
2. **Increase timeouts significantly**: Allow time for complete transfers
3. **Use wired connections**: Avoid WiFi for critical large file operations
4. **Plan for interruptions**: Ensure resume capability is working

### Test large file operations

**Before production use**:
```bash
# Test large file upload
time cp large-test-file.bin /mounted/storage/

# Test large file download  
time cp /mounted/storage/large-file.bin /local/destination/

# Monitor during operation
iostat -x 1  # Linux
iostat 1     # macOS
```

## Troubleshoot performance issues

### Common performance problems

**Slow transfer speeds**:
- Check network bandwidth to cloud provider
- Verify cache directory is on fast storage  
- Increase connection pool size gradually
- Test with different chunk sizes

**High memory usage**:
- Reduce cache size allocation
- Lower connection pool count
- Disable prefetch temporarily
- Check for memory leaks in logs

**Frequent timeouts**:
- Increase timeout values
- Check network stability
- Reduce concurrent operations
- Test during different times of day

### Performance testing

**Benchmark your configuration**:
```bash
# Create test files of different sizes
dd if=/dev/zero of=test-1gb.bin bs=1M count=1024

# Time uploads with different settings
time cp test-1gb.bin /mounted/storage/
```

## Verification checklist

- [ ] Data cache enabled and properly sized
- [ ] Metadata cache configured with appropriate TTL
- [ ] Connection pool optimized for your bandwidth
- [ ] File prefetch enabled for sequential access
- [ ] Chunk size appropriate for file sizes
- [ ] Timeouts set for worst-case scenarios
- [ ] Cache location on fastest available storage
- [ ] Performance tested with actual file sizes

## Next steps

- [Set up Docker container](docId:setup-docker-container) for containerized large file processing
- Learn about [media workflow integration](docId:your-media-guide) for video production
- Configure [monitoring and alerting](docId:your-monitoring-guide) for performance tracking