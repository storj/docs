---
title: Configure POSIX permissions
docId: configure-posix-permissions
metadata:
  title: How to Configure POSIX Permissions - Object Mount
  description: Enable and configure POSIX mode for traditional file system permissions on Object Mount
---

Configure POSIX permissions to enable traditional Unix-style file permissions, ownership, and metadata on your Object Mount filesystems.

## Prerequisites

- Object Mount installed and activated
- Write access to the target bucket
- S3 credentials with `PutObject` and `DeleteObject` permissions
- Understanding of when POSIX mode is needed

## When to use POSIX mode

**Enable POSIX mode if you need**:
- Applications that check file permissions
- Symbolic link support
- Fine-grained user/group permissions
- Shared filesystem access across users
- Traditional Unix file metadata (mtime, ctime, ownership)

**Skip POSIX mode if**:
- Using read-only credentials (POSIX mode will fail)
- Only need basic file browsing and download
- Working with simple media workflows
- Want maximum performance (POSIX adds overhead)

## Enable POSIX mode on new mount

### Create POSIX-enabled mount

1. **Open Object Mount application**
2. **Go to Mounts tab**  
3. **Click "Create new mount"**
4. **Configure basic settings**:
   - Mount name: Choose descriptive name
   - Credentials: Select your S3 credentials
   - Bucket: Choose target bucket
5. **Enable POSIX mode**: Check "Enable POSIX mode" checkbox
6. **Save and activate mount**

### Verify POSIX activation

```bash
# Check mount options
mount | grep cuno

# Verify POSIX metadata file exists in bucket
# (This is created automatically at bucket root)
```

## Configure POSIX permissions

### Set default permissions

POSIX mode creates files and directories with default permissions:
- **Files**: 644 (owner read/write, group/others read)
- **Directories**: 755 (owner read/write/execute, group/others read/execute)

### Customize permission behavior

In Object Mount preferences:
1. **Go to Preferences > Advanced Settings**
2. **Configure POSIX options**:
   - Default file permissions
   - Default directory permissions  
   - User/group mapping behavior

### Handle existing files

Files uploaded without POSIX mode:
- Will inherit default POSIX permissions when accessed
- Metadata gets added automatically on first access
- Original files remain unchanged in cloud storage

## Manage file ownership

### Set user/group ownership

```bash
# Change ownership (if mount supports it)
chown user:group /path/to/mounted/file

# Change group only
chgrp group /path/to/mounted/file
```

### Configure user mapping

For multi-user environments:
1. **Map cloud storage users to local system users**
2. **Configure in Object Mount preferences**
3. **Set consistent UID/GID mappings across systems**

## Working with symbolic links

### Create symbolic links

```bash
# Create symbolic link on mounted filesystem
ln -s /target/file /path/to/mount/symlink

# Verify link creation
ls -la /path/to/mount/
```

### Limitations

- Symbolic links work within the mounted filesystem
- Cross-filesystem links may not work as expected
- Some cloud storage providers have symlink limitations

## Troubleshooting POSIX mode

### Mount fails to activate

**Check write permissions**:
```bash
# Test bucket write access
echo "test" > /tmp/testfile
# Try to upload test file to verify write access
```

**Common causes**:
- Read-only credentials (POSIX requires write access)
- Bucket permissions don't allow object creation
- Network connectivity issues

### Permission errors

**"Operation not permitted" errors**:
- Verify POSIX mode is enabled on the mount
- Check that metadata file exists in bucket root
- Ensure credentials have adequate permissions

**Files show wrong ownership**:
- Check user/group mapping configuration
- Verify UID/GID settings in Object Mount preferences

### Performance issues

**POSIX mode adds overhead**:
- Each file access requires metadata lookup
- Consider disabling if not needed
- Use caching settings to improve performance

## Advanced POSIX configuration

### Optimize metadata caching

1. **Enable metadata cache** in Preferences
2. **Set appropriate cache duration**:
   - Longer for read-heavy workloads
   - Shorter for frequently changing files
3. **Monitor cache performance**

### Configure for shared access

For team environments:
- Set consistent POSIX permissions across all mounts
- Configure shared user/group mappings
- Implement access control policies

### Integration with backup tools

Many backup tools expect POSIX metadata:
```bash
# rsync with POSIX metadata preservation
rsync -avX /local/files/ /mounted/storage/

# tar with extended attributes
tar --xattrs -czf backup.tar.gz /mounted/files/
```

## Disable POSIX mode

### Remove POSIX from existing mount

1. **Unmount the filesystem**
2. **Edit mount configuration**
3. **Uncheck "Enable POSIX mode"**
4. **Remount filesystem**

**Note**: Metadata files remain in cloud storage but won't be actively used.

## Verification checklist

- [ ] Mount created with POSIX mode enabled
- [ ] Write access confirmed for target bucket
- [ ] File permissions work as expected
- [ ] Ownership changes are preserved
- [ ] Symbolic links function correctly
- [ ] Performance is acceptable for your use case

## Next steps

- [Optimize for large files](docId:optimize-large-files) with POSIX-aware applications
- [Troubleshoot mount issues](docId:troubleshoot-mount-issues) if problems arise  
- Learn about [media workflow integration](docId:your-media-guide) with POSIX-enabled mounts