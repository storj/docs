---
title: Troubleshoot mount issues
docId: troubleshoot-mount-issues
metadata:
  title: How to Troubleshoot Object Mount Issues
  description: Solve common Object Mount problems including mounting failures, slow performance, and credential issues
---

Diagnose and resolve common Object Mount issues to ensure reliable cloud storage access.

## Prerequisites

- Object Mount installed and activated
- Access to log files and system information
- Basic troubleshooting permissions (ability to restart services)

## Mount won't appear or activate

### Check credentials and permissions

**Verify credential configuration**:
1. **Go to Credentials tab** in Object Mount
2. **Test credentials** with "Test Connection"
3. **Confirm endpoint URL** is correct
4. **Check bucket accessibility**

**For Storj DCS**:
- Endpoint: `https://gateway.storjshare.io`
- Region: `us-east-1` (required even though not used)
- Ensure bucket names are lexicographically ordered

### Verify system dependencies

**Check required components**:

On macOS:
```bash
# Verify macFUSE is installed
ls -la /Library/Filesystems/macfuse.fs/

# Check macFUSE version
/Library/Filesystems/macfuse.fs/Contents/Resources/load_macfuse
```

On Windows:
- Ensure WinFsp is installed from [official releases](https://github.com/billziss-gh/winfsp)
- Check Windows services for WinFsp components

On Linux:  
```bash
# Check FUSE availability
ls -la /dev/fuse
lsmod | grep fuse

# Install FUSE if missing
sudo apt install fuse        # Debian/Ubuntu
sudo yum install fuse        # CentOS/RHEL
```

### Diagnose POSIX mode issues

**Common POSIX problems**:
- POSIX mode enabled with read-only credentials
- Insufficient permissions for metadata file creation

**Solutions**:
```bash
# Disable POSIX mode for read-only mounts
# In mount configuration, uncheck "Enable POSIX mode"

# OR upgrade credentials to read-write access
```

## Mount is slow or freezes

### Enable caching

**Configure data and metadata caching**:
1. **Go to Preferences > Cache Settings**
2. **Enable data cache**: Set cache size (e.g., 1-5GB)
3. **Enable metadata cache**: Set reasonable TTL (e.g., 5-15 minutes)
4. **Choose SSD location** for cache directory

### Optimize connection settings

**Increase connection pool**:
1. **Go to Preferences > Advanced Settings**
2. **Set S3 connection pool**: 
   - 50-100 for basic usage
   - 150-200 for high-bandwidth connections (1Gbps+)
3. **Enable file prefetch**: Set `CUNO_OPTIONS = -filePrefetch`

### Check network performance

```bash
# Test network latency to Storj
ping gateway.storjshare.io

# Test bandwidth to cloud storage
# Upload/download test files to measure throughput

# Check for network congestion
netstat -i    # Interface statistics
iftop         # Real-time bandwidth monitoring
```

## Credentials work elsewhere but fail in Object Mount

### Configure S3-compatible settings

**For non-AWS S3 providers**:
1. **Use S3-Compatible tab** when importing credentials
2. **Select provider** from dropdown (if available)
3. **Set explicit region** even if not used
4. **Verify endpoint reachability**

```bash
# Test endpoint connectivity
curl -I https://gateway.storjshare.io

# Test S3 API access
aws s3 ls --endpoint-url https://gateway.storjshare.io \
  --profile your-profile
```

### Handle custom authentication

**For providers requiring special configuration**:
- Check provider documentation for required headers
- Verify signature version compatibility
- Configure custom authentication parameters in advanced settings

## Files are stalling during operations

### Optimize transfer settings

**For large file transfers**:
1. **Enable multi-part uploads** in preferences
2. **Adjust chunk size** for your connection speed
3. **Increase timeout values** for slow connections

**Windows-specific solutions**:
- Use **"Fast Paste Here"** right-click option instead of standard Windows copy
- This bypasses Windows Explorer and uses optimized Object Mount transfers

### Monitor transfer progress

```bash
# Monitor network activity (Linux/macOS)
iftop -i your-interface

# Check Object Mount processes
ps aux | grep cuno
top -p $(pgrep cuno)

# Windows: Use Task Manager or Resource Monitor
```

## Enable detailed logging

### Configure debug logging

1. **Go to Preferences > Advanced Settings**
2. **Set Log Level to "debug" or "trace"**
3. **Reproduce the issue**
4. **Collect logs from**:

**Log locations**:
- **macOS**: `~/Library/Application Support/Object Mount/cunoFS.log`
- **Windows**: `C:\Users\%username%\AppData\Local\Object Mount\cunofs.log`  
- **Linux**: `~/.local/share/Object Mount/logs/`

### Analyze log files

**Common error patterns**:
```bash
# Search for authentication errors
grep -i "auth\|credential\|permission" cunoFS.log

# Look for network issues  
grep -i "timeout\|connection\|network" cunoFS.log

# Check for FUSE/mount errors
grep -i "fuse\|mount\|filesystem" cunoFS.log
```

## Creative application compatibility issues

### Handle "Leave Files in Place" problems

**Common issues with NLE applications**:
- Applications verify write access even for read-only workflows
- POSIX mode conflicts with permission checks
- Mount paths are too long or contain special characters

**Solutions**:
1. **Disable POSIX mode** for read-only media workflows
2. **Use shorter mount paths** closer to root directory
3. **Create proxy workflows** instead of direct mounting
4. **Test with read-write credentials** if available

### Application-specific workarounds

**For Avid Media Composer**:
- Keep mount paths short (avoid deep nested folders)
- Place scratch files on local storage, not mounted storage
- Test with small projects before production use

**For Adobe Premiere Pro / After Effects**:
- Enable media cache on local storage
- Use proxy files for remote media when possible
- Monitor for memory usage spikes during scrubbing

## System-level troubleshooting

### Restart Object Mount service

**Clean restart process**:
1. **Quit Object Mount** completely
2. **Clear any stuck mounts**:
   ```bash
   # macOS/Linux: Force unmount stuck filesystems
   sudo umount -f /path/to/stuck/mount
   
   # Windows: Use Disk Management to disconnect network drives
   ```
3. **Clear cache** (if corruption suspected):
   ```bash
   rm -rf ~/Library/Application\ Support/Object\ Mount/cache/  # macOS
   ```
4. **Restart Object Mount**

### Check system resources

```bash
# Monitor memory usage
free -h                    # Linux
vm_stat                   # macOS

# Check disk space for cache
df -h /path/to/cache/directory

# Monitor CPU usage during operations
top / htop
```

## Advanced diagnostics

### Test with minimal configuration

1. **Create new test mount** with minimal settings
2. **Disable all optimization features** (caching, prefetch, etc.)
3. **Test basic functionality** (list, read small files)
4. **Gradually enable features** to isolate issues

### Network troubleshooting

```bash
# Test specific S3 operations
aws s3api head-bucket --bucket your-bucket \
  --endpoint-url https://gateway.storjshare.io

# Monitor DNS resolution
nslookup gateway.storjshare.io

# Check firewall/proxy settings
curl -v https://gateway.storjshare.io
```

## When to contact support

**Gather this information before contacting support**:
- Operating system and version
- Object Mount version number  
- Cloud storage provider and bucket details
- Complete error messages from logs
- Steps to reproduce the issue
- Screenshots of error dialogs

**Contact Storj DCS support**: [Submit a support request](https://supportdcs.storj.io/hc/en-us/requests/new)

## Next steps

- [Optimize for large files](docId:optimize-large-files) once basic functionality is working
- Set up [performance monitoring](docId:your-monitoring-guide) for ongoing health checks
- Learn about [media workflow optimization](docId:your-media-guide) for creative applications