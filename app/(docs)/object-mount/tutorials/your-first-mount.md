---
title: Your first mount
docId: your-first-object-mount
metadata:
  title: Your First Object Mount Tutorial
  description: Complete 15-minute hands-on tutorial to mount and access Storj files using Object Mount with step-by-step instructions.
---

This tutorial walks you through mounting your first Storj bucket as a filesystem using Object Mount. By the end, you'll understand how to seamlessly access cloud storage as if it were local files.

## What you'll build

In this 15-minute hands-on tutorial, you'll:

- Install Object Mount on your Linux system
- Configure credentials to access your Storj storage
- Mount a bucket as a local filesystem
- Create, edit, and manage files directly in cloud storage
- Understand the performance characteristics and best practices

**Expected time to complete**: 15-20 minutes

## Prerequisites

Before starting, ensure you have:

- A Linux system (Ubuntu 18.04+, Debian 9+, RHEL 7+, or CentOS 7+)
- Administrative privileges to install packages  
- A Storj account with S3-compatible credentials
- At least one existing bucket with some test files
- Basic command-line familiarity

If you need to set up credentials or buckets, complete the [Getting Started guide](docId:AsyYcUJFbO1JI8-Tu8tW3) first.

## Step 1: Install Object Mount

Choose the installation method for your Linux distribution:

{% tabs %}

{% tab label="Ubuntu/Debian" %}

```shell
# Download and install the package
curl -L https://github.com/storj/edge/releases/latest/download/object-mount_linux_amd64.deb -o object-mount.deb
sudo dpkg -i object-mount.deb
```

{% /tab %}

{% tab label="RHEL/CentOS" %}

```shell
# Download and install the package  
curl -L https://github.com/storj/edge/releases/latest/download/object-mount_linux_amd64.rpm -o object-mount.rpm
sudo rpm -i object-mount.rpm
```

{% /tab %}

{% tab label="Generic Linux" %}

```shell
# Download and extract the binary
curl -L https://github.com/storj/edge/releases/latest/download/object-mount_linux_amd64.tar.gz -o object-mount.tar.gz
tar -xzf object-mount.tar.gz
sudo mv object-mount /usr/local/bin/
sudo chmod +x /usr/local/bin/object-mount
```

{% /tab %}

{% /tabs %}

**Expected outcome**: Object Mount should be installed and available in your PATH. Verify with:

```shell
object-mount --version
```

## Step 2: Configure your credentials  

Create a configuration file with your Storj credentials:

```shell
# Create config directory
mkdir -p ~/.config/object-mount

# Create configuration file
cat > ~/.config/object-mount/config.yaml << EOF
credentials:
  access_key_id: "your_access_key_here"
  secret_access_key: "your_secret_key_here" 
  endpoint: "https://gateway.storjshare.io"
  
# Optional performance settings
cache:
  directory: "/tmp/object-mount-cache"
  size: "1GB"
  
logging:
  level: "info"
EOF
```

Replace `your_access_key_here` and `your_secret_key_here` with your actual Storj S3 credentials.

**Expected outcome**: Your configuration file should be created successfully. Test connectivity:

```shell
object-mount test-connection
```

## Step 3: Create a mount point

Prepare a directory where your bucket will appear:

```shell
# Create mount directory
mkdir -p ~/storj-mount

# Verify the directory is empty
ls -la ~/storj-mount
```

**Expected outcome**: You should see an empty directory that will serve as your mount point.

## Step 4: Mount your bucket

Now mount your Storj bucket as a filesystem:

```shell
# Mount bucket (replace 'my-bucket' with your actual bucket name)
object-mount mount my-bucket ~/storj-mount

# Verify mount succeeded
mount | grep object-mount
```

You should see output indicating the mount is active.

**Expected outcome**: Your bucket is now mounted and accessible as a local directory. The command should complete without errors.

## Step 5: Explore your mounted storage

Navigate to your mount point and explore:

```shell
# Change to mount directory
cd ~/storj-mount

# List files (should show your bucket contents)
ls -la

# Check filesystem type
df -h ~/storj-mount
```

**Expected outcome**: You should see the files and directories from your Storj bucket listed as if they were local files.

## Step 6: Create and edit files

Now let's create and modify files directly in cloud storage:

```shell
# Create a new file
echo "Hello from Object Mount!" > test-file.txt

# View the file
cat test-file.txt

# Edit the file with your preferred editor
nano test-file.txt  # or vim, emacs, etc.
```

Add some additional content and save the file.

**Expected outcome**: You should be able to create, view, and edit files seamlessly. The changes are automatically synced to your Storj storage.

## Step 7: Test file operations

Perform various file operations to understand Object Mount capabilities:

```shell
# Create a directory
mkdir project-files

# Copy files
cp test-file.txt project-files/copy-of-test.txt

# Move/rename files  
mv test-file.txt renamed-test.txt

# Check file permissions
ls -la renamed-test.txt

# Create a symbolic link
ln -s renamed-test.txt link-to-test.txt
```

**Expected outcome**: All standard filesystem operations should work normally, with changes reflected in your Storj storage.

## Step 8: Monitor performance

Open a second terminal and monitor Object Mount activity:

```shell
# In second terminal - monitor mount activity
object-mount status

# Check cache usage
du -sh /tmp/object-mount-cache

# Monitor real-time activity (if available)
object-mount logs --follow
```

Try copying a larger file in your first terminal and watch the activity in the second.

**Expected outcome**: You should see Object Mount efficiently managing data transfer and caching operations.

## Step 9: Understand the object storage integration

Verify that your files are actually stored in Storj:

```shell
# In a third terminal, check your bucket using CLI tools
# (if you have rclone or aws cli configured)
rclone ls storj:my-bucket

# Or use the Storj Console web interface
# Navigate to your bucket and verify files are there
```

**Expected outcome**: Files created through Object Mount should be visible in your Storj bucket through other access methods.

## Step 10: Unmount and cleanup

When finished, properly unmount your storage:

```shell
# Change out of mount directory
cd ~

# Unmount the filesystem
object-mount unmount ~/storj-mount

# Verify unmount
ls ~/storj-mount
# (should be empty)

# Clean up cache if desired
rm -rf /tmp/object-mount-cache
```

**Expected outcome**: The mount should be cleanly removed and the mount directory should be empty.

## What you've accomplished

Congratulations! You've successfully used Object Mount to:

- Install and configure Object Mount for Storj access
- Mount cloud storage as a local filesystem
- Perform standard file operations on cloud-stored data
- Experience the seamless integration between POSIX applications and object storage
- Monitor performance and understand caching behavior

## Understanding what happened

**Object Mount magic**: Object Mount intercepted your filesystem calls and translated them to object storage operations. When you created `test-file.txt`, it became an object in your Storj bucket. When you edited it, Object Mount optimized the process using caching and prediction.

**Performance characteristics**: 
- **Reads**: Very fast due to intelligent caching
- **Writes**: Optimized with write-behind caching  
- **Metadata operations**: Cached for performance
- **Large files**: Handled efficiently with streaming and partial reads

**POSIX compliance**: Object Mount provides NFS-equivalent consistency guarantees while maintaining compatibility with all standard filesystem operations.

## What's next

Now that you understand the basics of Object Mount:

### Explore Advanced Features
- [Set up Object Mount Fusion](docId:Xaegoh6iedietahf) for enhanced performance with frequent writes
- [Configure POSIX permissions and metadata](#) for multi-user environments
- [Optimize performance settings](#) for your specific workload

### Production Deployment
- [Install Object Mount in containerized environments](#)
- [Set up monitoring and logging](#)
- [Configure high-availability mounts](#)

### Application Integration  
- [Use Object Mount with media editing workflows](#)
- [Integrate with data processing pipelines](#)
- [Set up development environments with cloud storage](#)

Ready to explore media workflows? Check out [Object Mount for video editing](docId:media-workflows) to see how to edit large media files directly from cloud storage.