---
title: "Object Mount CLI Reference"
docId: "object-mount-cli-ref-001"
metadata:
  title: "Object Mount CLI Commands Reference"
  description: "Complete reference for Object Mount CLI commands, options, and usage patterns."
---

Complete reference for Object Mount CLI commands and options.

## Core Commands

### cuno

Main command for Object Mount CLI operations.

**Basic Usage:**
```bash
# Launch interactive Object Mount shell
cuno

# Run single command with Object Mount
cuno run <command>

# Mount Object Mount FUSE filesystem
cuno mount <mountpoint> [options]
```

### Command Modes

#### Interactive Shell Mode
```bash
cuno
```
Launches an interactive shell with Object Mount interception enabled. The shell prompt will show `(cuno)` to indicate Object Mount is active.

**Supported shells:** `bash` and `zsh` (full tab completion and wildcard support)

#### Single Command Execution
```bash
cuno run bash -c "ls s3://mybucket/"
cuno run python script.py
```
Runs a single command with Object Mount interception enabled.

#### FUSE Mount Mode
```bash
cuno mount ~/my-mount-point
cuno mount ~/my-mount-point --root s3://mybucket/
```
Creates a FUSE filesystem mount at the specified location.

## Command Options

### Global Options

| Option | Description | Example |
|--------|-------------|---------|
| `-o <options>` | Specify configuration options | `cuno -o "uid=1000 gid=1000"` |
| `--help` | Show help information | `cuno --help` |

### Mount-Specific Options

| Option | Description | Example |
|--------|-------------|---------|
| `--root <path>` | Set root directory for mount | `--root s3://mybucket/folder/` |
| `--foreground` | Run mount in foreground | `cuno mount ~/mnt --foreground` |

## Configuration Options (`CUNO_OPTIONS`)

Set via environment variable or `-o` flag:

```bash
export CUNO_OPTIONS="uid=1000 gid=1000 filemode=0644"
# OR
cuno -o "uid=1000 gid=1000 filemode=0644"
```

### Core Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `uid=<id>` | integer | Set file owner UID | Current user |
| `gid=<id>` | integer | Set file owner GID | Current group |
| `filemode=<mode>` | octal | Default file permissions | `0666` |
| `dirmode=<mode>` | octal | Default directory permissions | `0777` |

### Advanced Options

| Option | Type | Description |
|--------|------|-------------|
| `+static` | flag | Enable static binary interception (default) |
| `-static` | flag | Disable static binary interception |
| `+uricompat[=apps]` | string | Enable URI compatibility for apps |
| `cloudroot=<path>` | string | Custom cloud root path (default: `/cuno`) |
| `cloudrootover` | flag | Override cloud root for FlexMount |

### URI Compatibility (`+uricompat`)

Enable URI handling override for specific applications:

```bash
# Default supported apps (automatic)
+uricompat  # rsync, ffmpeg, tar, samtools, igv, fastQC

# Custom application list
+uricompat=myapp:otherapp

# Conditional matching (app/arg_index/match_value)
+uricompat=java/2/app.jar:python/*/script.py
```

### Cloud Root Customization

```bash
# Custom cloud root
export CUNO_OPTIONS="cloudroot=/my-storage"
ls /my-storage/s3/mybucket/  # Instead of /cuno/s3/mybucket/
```

## Path Formats

Object Mount supports multiple path formats for accessing cloud storage:

### URI Format
```bash
s3://bucket/path/file.txt
az://container/path/file.txt  
gs://bucket/path/file.txt
```

### Filesystem Format
```bash
/cuno/s3/bucket/path/file.txt
/cuno/az/container/path/file.txt
/cuno/gs/bucket/path/file.txt
```

### Custom Cloud Root
```bash
# With cloudroot=/storage
/storage/s3/bucket/path/file.txt
```

## Credential Management

### cuno creds

Manage cloud storage credentials.

```bash
# Pair bucket with credentials
cuno creds pair s3://mybucket

# List paired credentials  
cuno creds list

# Remove credential pairing
cuno creds unpair s3://mybucket
```

## Access Modes

### Direct Interception
- **Default mode** when using `cuno` or `cuno run`
- **Highest performance** access method
- **Works with:** Dynamically linked binaries
- **Limitations:** No support for SUID, Snap, AppImage, Flatpak applications

### FUSE Mount
- **Compatibility mode** using `cuno mount`
- **Works with:** All application types including static binaries
- **Trade-off:** Lower performance than direct interception

### FlexMount
- **Hybrid approach** combining both modes
- **Fallback strategy:** Direct interception with FUSE fallback
- **Setup:** Mount FUSE filesystem, then use with Object Mount CLI

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CUNO_OPTIONS` | Configuration options | `"uid=1000 filemode=0644"` |
| `LD_PRELOAD` | Manual library preload | Set automatically by `cuno` |

## Usage Examples

### Basic File Operations
```bash
cuno
(cuno) $ ls s3://mybucket/
(cuno) $ cp local-file.txt s3://mybucket/remote-file.txt  
(cuno) $ cat s3://mybucket/data.csv | head -10
```

### Application Integration
```bash
# Python script with cloud paths
cuno run python -c "import pandas as pd; df = pd.read_csv('s3://bucket/data.csv')"

# rsync with cloud storage
cuno run rsync -av s3://source-bucket/ s3://dest-bucket/

# Media processing
cuno run ffmpeg -i s3://bucket/input.mp4 s3://bucket/output.mp4
```

### FUSE Mount Usage
```bash
# Mount entire cloud storage
cuno mount ~/cloud-storage

# Mount specific bucket
cuno mount ~/my-bucket --root s3://mybucket/

# Use mounted storage
ls ~/cloud-storage/s3/mybucket/
cp ~/cloud-storage/s3/mybucket/file.txt .
```

## Troubleshooting Commands

### Check Object Mount Status
```bash
# Verify Object Mount is active (should show (cuno) in prompt)
cuno
(cuno) $ echo $LD_PRELOAD  # Should show cuno.so path
```

### Debug Mode
```bash
# Enable verbose logging
export CUNO_DEBUG=1
cuno run ls s3://mybucket/
```

### Mount Debugging
```bash
# Check mount status
mount | grep cuno

# Unmount if needed  
fusermount -u ~/mount-point

# Foreground mode for debugging
cuno mount ~/test-mount --foreground
```

## Performance Tuning

### Parallelism
Object Mount automatically optimizes for parallel operations. For custom tuning:

```bash
# Set via application-specific options
cuno run rsync -av --progress s3://source/ s3://dest/
```

### Memory Usage
```bash
# Adjust for large file operations
export CUNO_OPTIONS="cache_size=1GB"
```

This reference covers all major Object Mount CLI commands and configuration options. Use `cuno --help` for additional details on specific commands.