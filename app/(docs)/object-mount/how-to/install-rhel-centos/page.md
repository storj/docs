---
title: Install on RHEL/CentOS
docId: install-rhel-centos
metadata:
  title: How to Install Object Mount on RHEL/CentOS
  description: Step-by-step installation guide for Object Mount on Red Hat Enterprise Linux and CentOS systems
---

Install Object Mount on Red Hat Enterprise Linux (RHEL) or CentOS systems to mount cloud storage as a local filesystem.

## Prerequisites

- RHEL 8+ or CentOS 8+
- Administrative privileges (sudo access)
- Active internet connection
- Storj DCS account with S3-compatible credentials

## Download and install

### Download the installer package

```bash
# Download the latest RPM-compatible package
wget https://github.com/cunoFS/cunoFS/releases/latest/download/cuno_amd64_glibc_rpm.run
```

### Extract the installation files

```bash
# Make the installer executable and run it
chmod +x cuno_amd64_glibc_rpm.run

# Extract files (accept EULA interactively)
sh cuno_amd64_glibc_rpm.run

# OR accept EULA automatically
CUNO_INSTALL_ACCEPT_EULA="yes" sh cuno_amd64_glibc_rpm.run
```

### Install system dependencies

```bash
# Update package list
sudo yum update

# Install FUSE and other dependencies
sudo yum install fuse fuse-libs

# For RHEL 8+/CentOS 8+, you may need EPEL repository
sudo yum install epel-release
```

### Install the package

```bash
# Navigate to extracted directory
cd cuno_*_amd64_glibc/

# Install Object Mount using yum/dnf
sudo yum localinstall cuno_*_amd64.rpm

# OR use dnf on newer systems
sudo dnf localinstall cuno_*_amd64.rpm
```

## Activate Object Mount

### Choose activation method

During installation, you'll be prompted to activate Object Mount:

**Option 1: Start free trial**
```bash
# Set environment variable for automatic trial activation
CUNO_INSTALL_LICENSE="trial" sudo yum localinstall cuno_*_amd64.rpm
```

**Option 2: Use license key**
```bash
# For existing license key
CUNO_INSTALL_LICENSE="your-license-key-here" sudo yum localinstall cuno_*_amd64.rpm
```

**Option 3: Skip activation**
```bash
# Skip activation during install (activate later in app)
CUNO_INSTALL_LICENSE="none" sudo yum localinstall cuno_*_amd64.rpm
```

### Set environment variables

```bash
# Add to your shell profile (~/.bashrc or ~/.zshrc)
echo 'export CUNO_ROOT=/opt/cuno' >> ~/.bashrc

# Reload your shell configuration
source ~/.bashrc
```

## Configure firewall and SELinux

### Adjust firewall settings

```bash
# Allow FUSE filesystem access (if needed)
sudo firewall-cmd --permanent --add-service=nfs
sudo firewall-cmd --reload

# OR disable firewall temporarily for testing
sudo systemctl stop firewalld
```

### Handle SELinux policies

```bash
# Check SELinux status
getenforce

# If SELinux is enforcing, you may need to allow FUSE access
sudo setsebool -P use_fusefs_home_dirs on

# Create custom SELinux policy if needed (advanced)
# Consult your security administrator for production systems
```

## Launch Object Mount

### Start the application

```bash
# Launch Object Mount GUI (if display available)
object-mount

# OR launch from command line
cuno

# Check if running as service
systemctl status cuno
```

### Verify installation

Check that Object Mount is properly installed:

```bash
# Check version
cuno --version

# Check installation directory
ls -la /opt/cuno/

# Verify FUSE module is loaded
lsmod | grep fuse
```

## Configure credentials

### Add Storj DCS credentials

1. **Open Object Mount application**
2. **Go to Credentials tab**
3. **Click "Import Credentials"**
4. **Select "S3-Compatible"**
5. **Enter your details**:
   - Access Key: Your Storj access key
   - Secret Key: Your Storj secret key
   - Endpoint: `https://gateway.storjshare.io`
   - Region: `us-east-1`

### Test connection

1. **Go to Mounts tab**
2. **Create new mount**
3. **Select your credentials**
4. **Choose a bucket**
5. **Test the connection**

## Handle RHEL/CentOS-specific issues

### User permissions

```bash
# Add your user to the fuse group
sudo usermod -a -G fuse $USER

# Log out and back in, or use newgrp
newgrp fuse
```

### Mount point permissions

```bash
# Create mount directory with proper permissions
sudo mkdir -p /mnt/object-mount
sudo chown $USER:$USER /mnt/object-mount
sudo chmod 755 /mnt/object-mount
```

### Service configuration

```bash
# Enable Object Mount service (if available)
sudo systemctl enable cuno

# Start the service
sudo systemctl start cuno

# Check service status
sudo systemctl status cuno
```

## Verification

1. **Check service status**: Verify Object Mount service is running
2. **Test mount creation**: Create a test mount with your credentials
3. **Browse files**: Navigate mounted storage in file manager
4. **Verify read/write**: Test file operations if you have write access

## Troubleshooting

**Installation fails with dependency errors**:
```bash
# Install missing dependencies manually
sudo yum install -y fuse fuse-libs

# Check for conflicting packages
rpm -qa | grep fuse
```

**Permission denied during install**:
```bash
# Ensure you're using sudo
sudo yum localinstall cuno_*_amd64.rpm

# Check file permissions
ls -la cuno_*_amd64.rpm
```

**FUSE module not loaded**:
```bash
# Load FUSE module manually
sudo modprobe fuse

# Add to modules to load at boot
echo "fuse" | sudo tee -a /etc/modules-load.d/fuse.conf
```

**SELinux blocking mounts**:
```bash
# Check for SELinux denials
sudo ausearch -m avc -ts recent

# Temporarily disable SELinux for testing
sudo setenforce 0

# Re-enable after testing
sudo setenforce 1
```

**Mount not appearing**:
- Verify credentials are correct
- Check that buckets are accessible
- Ensure user is in fuse group
- Check firewall isn't blocking connections

## Uninstall (if needed)

```bash
# Remove Object Mount package
sudo yum remove cuno

# Remove configuration files (optional)
rm -rf ~/.config/Object Mount/
```

## Next steps

- [Configure POSIX permissions](docId:configure-posix-permissions) for advanced file system compatibility
- [Optimize for large files](docId:optimize-large-files) if working with media workflows
- [Set up Docker container](docId:setup-docker-container) for containerized environments