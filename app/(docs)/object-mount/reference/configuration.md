---
title: "Configuration Reference"
docId: "object-mount-config-ref-001"
metadata:
  title: "Object Mount Configuration Reference"
  description: "Complete reference for Object Mount configuration parameters, environment variables, and advanced settings."
---

Complete reference for Object Mount configuration options and parameters.

## Configuration Methods

Object Mount can be configured through:

1. **Environment Variables** - `CUNO_OPTIONS`
2. **Command Line Options** - `cuno -o "option=value"`
3. **Configuration Files** - Platform-specific locations

## Environment Variables

### Primary Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `CUNO_OPTIONS` | Main configuration options string | `"uid=1000 gid=1000 filemode=0644"` |
| `CUNO_DEBUG` | Enable debug output | `1` or `true` |
| `LD_PRELOAD` | Library preload (set automatically) | `/path/to/cuno.so` |

### Usage Examples

```bash
# Single option
export CUNO_OPTIONS="uid=1000"

# Multiple options (space-separated, quoted)
export CUNO_OPTIONS="uid=1000 gid=1000 filemode=0644"

# Debug mode
export CUNO_DEBUG=1
```

## Core Configuration Options

### File System Permissions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `uid=<id>` | integer | current user | File owner user ID |
| `gid=<id>` | integer | current group | File owner group ID |
| `filemode=<mode>` | octal | `0666` | Default file permissions |
| `dirmode=<mode>` | octal | `0777` | Default directory permissions |

**Examples:**
```bash
# Set all files to be owned by root with read-only permissions
export CUNO_OPTIONS="uid=0 gid=0 filemode=0444 dirmode=0555"

# Web server configuration
export CUNO_OPTIONS="uid=33 gid=33 filemode=0664 dirmode=0775"
```

### Static Binary Handling

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `+static` | flag | enabled | Enable static binary interception |
| `-static` | flag | disabled | Disable static binary interception |

**Usage:**
```bash
# Disable static binary support
export CUNO_OPTIONS="-static"

# Explicitly enable (default behavior)
export CUNO_OPTIONS="+static"
```

### Cloud Root Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cloudroot=<path>` | string | `/cuno` | Custom cloud storage root path |
| `cloudrootover` | flag | disabled | Override cloud root for FlexMount |

**Examples:**
```bash
# Custom cloud root
export CUNO_OPTIONS="cloudroot=/my-cloud-storage"
# Access: /my-cloud-storage/s3/bucket/

# FlexMount override
export CUNO_OPTIONS="cloudrootover cloudroot=/home/user/mount"
```

### URI Compatibility

| Option | Format | Description |
|--------|--------|-------------|
| `+uricompat` | flag | Enable default URI overrides |
| `+uricompat=<apps>` | string | Enable for specific applications |
| `+uricompat=<app>/<arg>/<value>` | string | Conditional URI override |

**Default Supported Applications:**
- `rsync`
- `ffmpeg` 
- `tar`
- `samtools`
- `igv`
- `fastQC`

**Custom Application Examples:**
```bash
# Enable for custom applications
export CUNO_OPTIONS="+uricompat=myapp:otherapp"

# Java application with specific JAR
export CUNO_OPTIONS="+uricompat=java/2/myapp.jar"

# Python script with conditional matching
export CUNO_OPTIONS="+uricompat=python/*/myscript.py"
```

## Advanced Configuration

### Memory and Performance

| Option | Type | Description |
|--------|------|-------------|
| `cache_size=<size>` | string | Set cache size (e.g., `1GB`, `500MB`) |
| `max_connections=<n>` | integer | Maximum concurrent connections |

### Network Configuration

| Option | Type | Description |
|--------|------|-------------|
| `timeout=<seconds>` | integer | Network request timeout |
| `retry_count=<n>` | integer | Number of retry attempts |

### Debug and Logging

| Option | Type | Description |
|--------|------|-------------|
| `debug=<level>` | integer | Debug verbosity level (0-5) |
| `log_file=<path>` | string | Log file path |

## Access Mode Configuration

### Core File Access Mode

Default mode with basic file operations:

```bash
# Default configuration (no special options needed)
cuno
```

**Characteristics:**
- Dynamic ownership (current user)
- Standard permissions (`0666` files, `0777` directories)
- No persistent metadata

### POSIX File Access Mode

Enable persistent file system metadata:

```bash
# Enable POSIX mode during mount
cuno mount ~/mount-point --posix
```

**Capabilities:**
- Persistent file ownership
- Modifiable permissions via `chmod`, `chown`
- File timestamps via `touch`
- Extended attributes support

## Configuration File Locations

### Linux
- User config: `~/.config/cuno/config.yaml`
- System config: `/etc/cuno/config.yaml`

### macOS
- User config: `~/Library/Preferences/cuno/config.yaml`
- System config: `/etc/cuno/config.yaml`

### Windows
- User config: `%APPDATA%\cuno\config.yaml`
- System config: `%PROGRAMDATA%\cuno\config.yaml`

## Configuration Examples

### Development Environment
```bash
export CUNO_OPTIONS="uid=1000 gid=1000 filemode=0644 dirmode=0755 +uricompat=python:node:java"
cuno
```

### Production Web Server
```bash
export CUNO_OPTIONS="uid=33 gid=33 filemode=0644 dirmode=0755 cloudroot=/var/cloud"
cuno mount /var/www/cloud --root s3://web-assets/
```

### Media Processing Workflow
```bash
export CUNO_OPTIONS="+uricompat=ffmpeg:handbrake:mkvtoolnix cache_size=2GB"
cuno
```

### Data Science Environment
```bash
export CUNO_OPTIONS="+uricompat=python:R:jupyter filemode=0664 dirmode=0775"
cuno
```

## FlexMount Configuration

FlexMount combines direct interception with FUSE fallback:

### Basic FlexMount Setup
```bash
# 1. Create FUSE mount
cuno mount ~/cloud-storage

# 2. Use with Object Mount CLI
cuno -o "cloudrootover cloudroot=$(realpath ~/cloud-storage)"
```

### Advanced FlexMount Configuration
```bash
# Custom cloud root FlexMount
cuno -o "cloudroot=/alt-root" mount ~/storage --root /alt-root
cuno -o "cloudrootover cloudroot=$(realpath ~/storage)"
```

## Troubleshooting Configuration

### Verify Current Configuration
```bash
# Check environment variables
env | grep CUNO

# Test configuration
cuno run bash -c 'echo "Config test successful"'
```

### Common Configuration Issues

**Permission Problems:**
```bash
# Fix: Set appropriate uid/gid
export CUNO_OPTIONS="uid=$(id -u) gid=$(id -g)"
```

**Path Resolution Issues:**
```bash
# Fix: Use absolute paths for cloudroot
export CUNO_OPTIONS="cloudroot=$(realpath ~/cloud-storage)"
```

**Application Compatibility:**
```bash
# Fix: Add specific application to uricompat
export CUNO_OPTIONS="+uricompat=myapp"
```

## Validation and Testing

### Configuration Validation
```bash
# Test basic functionality
cuno run ls /cuno/

# Test specific path format
cuno run ls s3://test-bucket/

# Test FUSE mount
ls ~/mount-point/s3/test-bucket/
```

### Performance Testing
```bash
# Benchmark file operations
time cuno run cp large-file.bin s3://bucket/
time cuno run rsync -av directory/ s3://bucket/backup/
```

This reference covers all Object Mount configuration options. For platform-specific configuration details, refer to the installation guides for your operating system.