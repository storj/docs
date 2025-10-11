---
title: "Compatibility Reference"
docId: compatibility
metadata:
  title: "Object Mount Compatibility Reference"
  description: "Complete reference for Object Mount compatibility with operating systems, applications, and cloud storage providers."
---

Complete reference for Object Mount compatibility across platforms and applications.

## Operating System Compatibility

### Linux Distributions

| Distribution | Versions | Support Level | Installation Method |
|--------------|----------|---------------|-------------------|
| **Ubuntu** | 18.04+ | Full | DEB package, binary |
| **Debian** | 10+ | Full | DEB package, binary |
| **CentOS/RHEL** | 7+ | Full | RPM package, binary |
| **Fedora** | 30+ | Full | RPM package, binary |
| **openSUSE** | 15+ | Full | RPM package, binary |
| **Alpine Linux** | 3.12+ | Full | Binary (musl) |
| **Arch Linux** | Latest | Full | Binary, AUR |

### Architecture Support

| Architecture | Support Level | Notes |
|--------------|---------------|-------|
| **x86_64** | Full | Primary support |
| **ARM64** | Full | Native ARM64 builds |
| **ARMv7** | Limited | Select distributions only |

### Kernel Requirements

| Component | Minimum Version | Recommended |
|-----------|----------------|-------------|
| **Linux Kernel** | 3.10+ | 4.0+ |
| **FUSE** | 2.6+ | 3.0+ |
| **glibc** | 2.17+ | 2.27+ |
| **musl** | 1.1.24+ | 1.2.0+ |

## Application Compatibility

### Fully Compatible Applications

Applications that work seamlessly with Object Mount:

#### Development Tools
- **Python** - All versions, pip, conda
- **Node.js** - npm, yarn, all frameworks  
- **Java** - JVM applications, Maven, Gradle
- **Go** - go build, go mod
- **Rust** - cargo, rustc
- **Docker** - Container builds and runtime

#### Data Processing
- **pandas** - DataFrame operations
- **NumPy** - Array operations
- **Apache Spark** - Distributed processing
- **Dask** - Parallel computing
- **Jupyter** - Notebook operations

#### Media Processing
- **FFmpeg** - Video/audio transcoding
- **ImageMagick** - Image manipulation
- **Handbrake** - Video encoding
- **Blender** - 3D rendering (with setup)

#### File Management
- **rsync** - File synchronization
- **tar** - Archive operations
- **zip/unzip** - Compression
- **find/grep** - File search

### Limited Compatibility Applications

Applications with known limitations:

| Application Type | Limitation | Workaround |
|------------------|------------|------------|
| **SUID Binaries** | Security restrictions prevent interception | Use FUSE mount mode |
| **Snap Applications** | Sandboxing prevents LD_PRELOAD | Use FUSE mount, configure permissions |
| **AppImage** | Self-contained prevents interception | Use FUSE mount mode |
| **Flatpak** | Sandboxing restrictions | Use FUSE mount with portal access |
| **Static Binaries** | Limited interception capability | Enable with `+static` flag |

### Database Compatibility

| Database | Direct Support | Recommended Approach |
|----------|----------------|---------------------|
| **SQLite** | Yes | Direct file access |
| **PostgreSQL** | No | Use backup/restore workflows |
| **MySQL** | No | Use mysqldump to cloud storage |
| **MongoDB** | Partial | Use mongodump to cloud storage |

## Cloud Storage Provider Support

### Supported Providers

| Provider | Protocol | Authentication | Features |
|----------|----------|----------------|----------|
| **Amazon S3** | `s3://` | Access keys, IAM roles | Full S3 API compatibility |
| **Microsoft Azure** | `az://` | Account keys, SAS tokens | Blob storage support |
| **Google Cloud** | `gs://` | Service accounts, OAuth | Cloud Storage API |
| **Storj DCS** | `s3://` | Access grants, S3 gateway | Native decentralized support |
| **MinIO** | `s3://` | Access keys | Self-hosted S3-compatible |
| **Wasabi** | `s3://` | Access keys | S3-compatible hot storage |

### Authentication Methods

#### S3-Compatible Providers
```bash
# AWS credentials file
~/.aws/credentials

# Environment variables
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"

# Storj access grants
cuno creds pair s3://bucket
```

#### Azure Blob Storage
```bash
# Connection string
export AZURE_STORAGE_CONNECTION_STRING="your-connection-string"

# Account key
export AZURE_STORAGE_ACCOUNT="account-name"
export AZURE_STORAGE_KEY="account-key"
```

#### Google Cloud Storage
```bash
# Service account key
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"

# gcloud authentication
gcloud auth application-default login
```

## Shell and Terminal Compatibility

### Fully Supported Shells

| Shell | Tab Completion | Wildcard Expansion | Prompt Indication |
|-------|----------------|-------------------|-------------------|
| **bash** | ✅ Full | ✅ Full | ✅ `(cuno)` prefix |
| **zsh** | ✅ Full | ✅ Full | ✅ `(cuno)` prefix |

### Partially Supported Shells

| Shell | Basic Usage | Limitations |
|-------|-------------|-------------|
| **fish** | ✅ Yes | No tab completion for cloud paths |
| **tcsh** | ✅ Yes | Limited wildcard support |
| **dash** | ✅ Yes | No advanced features |

## Container and Virtualization

### Docker Compatibility

**Supported Scenarios:**
```bash
# Host-mounted Object Mount
docker run -v ~/cloud-storage:/data ubuntu ls /data/s3/bucket/

# Object Mount inside container
docker run -it --privileged ubuntu
# Install Object Mount inside container
```

**Known Limitations:**
- Requires `--privileged` for full functionality
- FUSE support needed in container

### Kubernetes Compatibility

**CSI Driver Support:**
- Object Mount can be integrated as CSI driver
- Supports persistent volumes backed by cloud storage
- Requires cluster-level FUSE support

**Pod-level Usage:**
```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: app
    securityContext:
      privileged: true  # Required for FUSE
    volumeMounts:
    - name: cloud-storage
      mountPath: /mnt/cloud
```

## Programming Language Integration

### Python
```python
import pandas as pd

# Direct file path usage
df = pd.read_csv('s3://bucket/data.csv')
df.to_parquet('s3://bucket/output.parquet')
```

**Libraries with confirmed compatibility:**
- pandas, NumPy, SciPy
- scikit-learn, TensorFlow, PyTorch
- Pillow, OpenCV, matplotlib
- boto3 (when using FUSE paths)

### R
```r
# Direct file operations
data <- read.csv('s3://bucket/data.csv')
write.csv(data, 's3://bucket/output.csv')
```

### Node.js
```javascript
const fs = require('fs');

// Direct file system operations
const data = fs.readFileSync('s3://bucket/config.json');
fs.writeFileSync('s3://bucket/output.json', JSON.stringify(result));
```

## Performance Characteristics

### Access Method Performance

| Method | Throughput | Latency | CPU Usage | Memory Usage |
|--------|------------|---------|-----------|-------------|
| **Direct Interception** | Highest | Lowest | Low | Low |
| **FUSE Mount** | Moderate | Moderate | Moderate | Moderate |
| **FlexMount** | High | Low | Low-Moderate | Low-Moderate |

### File Operation Performance

| Operation | Direct | FUSE | Notes |
|-----------|--------|------|-------|
| **Sequential Read** | Excellent | Good | Optimized for streaming |
| **Random Read** | Good | Fair | Caching helps small reads |
| **Sequential Write** | Excellent | Good | Buffered writes |
| **Random Write** | Good | Fair | May trigger uploads |
| **Metadata Operations** | Excellent | Good | Cached when possible |

## Known Issues and Limitations

### General Limitations

1. **Symbolic Links** - Limited cross-boundary support
2. **Hard Links** - Not supported across cloud boundaries  
3. **File Locking** - Advisory locking only
4. **Extended Attributes** - Limited support
5. **Special Files** - No device files, named pipes, sockets

### Platform-Specific Issues

#### Linux
- SELinux may require policy adjustments
- AppArmor profiles may need modification
- systemd services require special configuration

#### Container Environments
- Requires privileged mode for full FUSE support
- Some container runtimes limit LD_PRELOAD usage
- Networking policies may affect cloud storage access

## Troubleshooting Compatibility

### Application Not Working

1. **Check interception status:**
   ```bash
   echo $LD_PRELOAD  # Should show cuno.so
   ```

2. **Try FUSE mode:**
   ```bash
   cuno mount ~/cloud-storage
   # Use ~/cloud-storage/s3/bucket/ instead of s3://bucket/
   ```

3. **Enable compatibility flags:**
   ```bash
   export CUNO_OPTIONS="+uricompat=myapp"
   ```

### Permission Issues

1. **Set appropriate ownership:**
   ```bash
   export CUNO_OPTIONS="uid=$(id -u) gid=$(id -g)"
   ```

2. **Adjust file permissions:**
   ```bash
   export CUNO_OPTIONS="filemode=0664 dirmode=0775"
   ```

### Container Issues

1. **Enable privileged mode:**
   ```bash
   docker run --privileged myapp
   ```

2. **Mount host Object Mount:**
   ```bash
   docker run -v ~/cloud:/mnt/cloud myapp
   ```

This compatibility reference helps determine the best approach for your specific environment and applications. For unlisted applications, test with FUSE mode first, then try direct interception with appropriate compatibility flags.