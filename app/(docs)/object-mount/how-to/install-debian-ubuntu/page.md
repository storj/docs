---
title: Install on Debian/Ubuntu
docId: install-debian-ubuntu
metadata:
  title: How to Install Object Mount on Debian/Ubuntu
  description: Step-by-step installation guide for Object Mount on Debian and Ubuntu systems
---

Install Object Mount on Debian or Ubuntu systems to mount cloud storage as a local filesystem.

## Prerequisites

- Debian 10+ or Ubuntu 18.04+  
- Administrative privileges (sudo access)
- Active internet connection
- Storj DCS account with S3-compatible credentials

## Download and install

### Download the installer package

```bash
# Download the latest Debian package
wget https://github.com/cunoFS/cunoFS/releases/latest/download/cuno_amd64_glibc_deb.run
```

### Extract the installation files

```bash
# Make the installer executable and run it
chmod +x cuno_amd64_glibc_deb.run

# Extract files (accept EULA interactively)
sh cuno_amd64_glibc_deb.run

# OR accept EULA automatically
CUNO_INSTALL_ACCEPT_EULA="yes" sh cuno_amd64_glibc_deb.run
```

### Install the package

```bash
# Update package list
sudo apt update

# Install Object Mount and dependencies
# Note: Use ./ to install local package
cd cuno_*_amd64_glibc/
sudo apt install ./cuno_*_amd64.deb
```

## Activate Object Mount

### Choose activation method

During installation, you'll be prompted to activate Object Mount:

**Option 1: Start free trial**
```bash
# Set environment variable for automatic trial activation
CUNO_INSTALL_LICENSE="trial" sudo apt install ./cuno_*_amd64.deb
```

**Option 2: Use license key**
```bash
# For existing license key
CUNO_INSTALL_LICENSE="your-license-key-here" sudo apt install ./cuno_*_amd64.deb
```

**Option 3: Skip activation**
```bash
# Skip activation during install (activate later in app)
CUNO_INSTALL_LICENSE="none" sudo apt install ./cuno_*_amd64.deb
```

### Set environment variables

```bash
# Add to your shell profile (~/.bashrc or ~/.zshrc)
echo 'export CUNO_ROOT=/opt/cuno' >> ~/.bashrc

# Reload your shell configuration
source ~/.bashrc
```

## Launch Object Mount

### Start the application

```bash
# Launch Object Mount GUI
object-mount

# OR launch from command line
cuno
```

### Verify installation

Check that Object Mount is properly installed:

```bash
# Check version
cuno --version

# Check installation directory
ls -la /opt/cuno/
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

## Verification

1. **Check service status**: Verify Object Mount service is running
2. **Test mount creation**: Create a test mount with your credentials
3. **Browse files**: Navigate mounted storage in file manager
4. **Verify read/write**: Test file operations if you have write access

## Troubleshooting

**Installation fails with dependency errors**:
```bash
# Install missing dependencies manually
sudo apt install -f
```

**Permission denied during install**:
```bash
# Ensure you're using sudo
sudo apt install ./cuno_*_amd64.deb
```

**Application won't start**:
```bash
# Check if required dependencies are installed
dpkg -l | grep cuno

# Check system logs for errors
journalctl -u cuno*
```

**Mount not appearing**:
- Verify credentials are correct
- Check that buckets are accessible
- Ensure FUSE is available: `sudo apt install fuse`

## Uninstall (if needed)

```bash
# Remove Object Mount package
sudo apt remove cuno

# Remove configuration files (optional)
rm -rf ~/.config/Object Mount/
```

## Next steps

- [Configure POSIX permissions](docId:configure-posix-permissions) for advanced file system compatibility
- [Optimize for large files](docId:optimize-large-files) if working with media workflows
- [Set up Docker container](docId:setup-docker-container) for containerized environments