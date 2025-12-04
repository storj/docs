---
title: How to migrate your node to a new device
docId: migrate-node
metadata:
  title: How to Migrate Your Storage Node to a New Device
  description: Complete step-by-step guide to safely migrate your Storj storage node to new hardware or storage location while preserving data and reputation.
---

This guide shows you how to migrate your storage node to a new device, drive, or location while preserving your node's reputation and stored data.

## Prerequisites

Before migrating your storage node, ensure you have:

- A running Storj storage node that you want to migrate
- Access to both the source and destination systems
- Sufficient storage space on the destination (at least equal to your current data)
- Network access between source and destination (if different machines)
- Administrative privileges on both systems
- Time to complete the migration (can take several hours for large datasets)

## Important considerations

**Downtime**: Plan for some downtime during the final migration steps. Minimize this by pre-copying data while your node is running.

**Reputation preservation**: Your node's identity must be preserved exactly to maintain your reputation and avoid disqualification.

**Platform compatibility**: If migrating across different architectures (x86 to ARM, etc.), additional steps are required.

**Network storage warning**: Network-attached storage is not supported and may cause performance issues or disqualification.

## Locate your current data

First, identify where your storage node data is currently located:

{% tabs %}

{% tab label="Windows GUI Install" %}

**Identity folder**: `%APPDATA%\Storj\Identity\storagenode`  
**Orders folder**: `%ProgramFiles%\Storj\Storage Node\orders`  
**Storage data**: The path specified in your configuration

**Find exact paths**:
```powershell
# Check configuration for data paths
Get-Content "C:\Program Files\Storj\Storage Node\config.yaml" | Select-String "storage-dir\|identity-dir"
```

{% /tab %}

{% tab label="Linux/macOS CLI Install" %}

**Linux identity**: `~/.local/share/storj/identity/storagenode`  
**macOS identity**: `~/Library/Application Support/Storj/identity/storagenode`  
**Data location**: Specified in your Docker run command or configuration

**Find exact paths**:
```bash
# Check your Docker run command or configuration
docker inspect storagenode | grep -E "Source|Destination"
```

{% /tab %}

{% /tabs %}

## Migration methods

Choose the migration method that matches your setup:

## Method 1: Same-platform migration (recommended)

This method works for migrating between systems with the same architecture (e.g., x86-64 to x86-64).

### Step 1: Prepare the destination

Set up the destination paths on your new system:

```bash
# Create destination directories (adjust paths as needed)
mkdir -p /mnt/storj-new/identity
mkdir -p /mnt/storj-new/storage  
mkdir -p /mnt/storj-new/orders
```

### Step 2: Copy identity files (critical first step)

**Important**: Copy identity files first while your node is running:

```bash
# Copy identity (must be exact - any corruption causes disqualification)
rsync -aP /source/identity/storagenode/ /mnt/storj-new/identity/
```

**Verify identity copy**:
```bash
# Compare file counts and sizes
find /source/identity/storagenode -type f | wc -l
find /mnt/storj-new/identity -type f | wc -l

# Files should match exactly
```

### Step 3: Pre-copy orders and data (while node running)

Start copying data while your node is still operational to minimize downtime:

```bash
# Copy orders folder
rsync -aP /source/orders/ /mnt/storj-new/orders/

# Copy storage data (this may take hours for large datasets)
rsync -aP /source/storage/ /mnt/storj-new/storage/
```

### Step 4: Repeat sync to minimize differences

Run the copy commands multiple times to reduce the amount of data to transfer during downtime:

```bash
# Repeat these commands until differences are minimal
rsync -aP /source/orders/ /mnt/storj-new/orders/
rsync -aP /source/storage/ /mnt/storj-new/storage/
```

### Step 5: Final migration (downtime required)

When you're ready for the final migration:

**Stop your storage node**:

{% tabs %}

{% tab label="CLI Install" %}

```bash
# Stop the container gracefully (allows up to 5 minutes for cleanup)
docker stop -t 300 storagenode
docker rm storagenode
```

{% /tab %}

{% tab label="Windows GUI Install" %}

```powershell
# Stop the Windows service
Stop-Service storagenode
```

{% /tab %}

{% /tabs %}

**Complete the final sync**:

```bash
# Final sync with --delete to ensure exact copy
rsync -aP --delete /source/orders/ /mnt/storj-new/orders/
rsync -aP --delete /source/storage/ /mnt/storj-new/storage/
```

**Copy configuration files**:

```bash
# Copy configuration and other important files
cp /source/config.yaml /mnt/storj-new/
cp /source/revocations.db /mnt/storj-new/

# Preserve any other important files in your config directory
```

### Step 6: Update your configuration

Update your node configuration to use the new paths:

{% tabs %}

{% tab label="CLI Install" %}

Update your Docker run command to use the new mount points:

```bash
# Example updated docker run command
docker run -d --restart unless-stopped \
  --name storagenode \
  -p 28967:28967/tcp \
  -p 28967:28967/udp \
  -p 14002:14002 \
  -e WALLET="0xYourWalletAddress" \
  -e EMAIL="your@email.com" \
  -e ADDRESS="your.external.address:28967" \
  -e STORAGE="2TB" \
  --mount type=bind,source=/mnt/storj-new/identity,destination=/app/identity \
  --mount type=bind,source=/mnt/storj-new,destination=/app/config \
  storjlabs/storagenode:latest
```

**Important mount point notes**:
- Use `/mnt/storj-new` as the config mount source (not `/mnt/storj-new/storage`)
- The container automatically creates a `storage` subdirectory
- Ensure your data is in `/mnt/storj-new/storage/` on the host

{% /tab %}

{% tab label="Windows GUI Install" %}

Update the configuration file:

```powershell
# Edit the config file with new paths
notepad++ "C:\Program Files\Storj\Storage Node\config.yaml"
```

Update paths in the configuration file:
```yaml
storage-dir: "C:\NewStorjLocation\storage"
identity-dir: "C:\NewStorjLocation\identity"
```

Start the service:
```powershell
Start-Service storagenode
```

{% /tab %}

{% /tabs %}

## Method 2: Cross-platform migration

If migrating between different architectures (x86-64 to ARM, Windows to Linux, etc.):

### Additional step: Remove platform-specific binaries

Before starting your migrated node, remove old binaries:

```bash
# Remove binaries from the storage location  
rm -rf /mnt/storj-new/storage/bin/

# The container will download appropriate binaries for the new platform
```

### Follow same process as Method 1

Complete all other steps from Method 1, but include the binary removal step before starting your node on the new platform.

## Verification

After migration, verify your node is working correctly:

### Check node startup

Monitor logs during startup:

{% tabs %}

{% tab label="CLI Install" %}

```bash
# Follow logs in real-time
docker logs storagenode -f

# Look for successful startup messages and no error about missing data
```

{% /tab %}

{% tab label="Windows GUI Install" %}

```powershell
# Check recent logs
Get-Content "C:\Program Files\Storj\Storage Node\logs\*" -Tail 50
```

{% /tab %}

{% /tabs %}

### Verify data integrity

Confirm your data migrated correctly:

1. **Check dashboard**: Access your node dashboard (usually `http://localhost:14002`)
2. **Verify storage usage**: Should match your previous usage amounts
3. **Monitor for errors**: Watch for any data corruption or missing file errors
4. **Check reputation**: Your reputation scores should remain unchanged

### Monitor for issues

Watch your node for the first 24-48 hours after migration:

- No disqualification warnings
- Normal audit success rates  
- Proper connectivity to all satellites
- Expected payout calculations

## Troubleshooting

**Node starts but shows empty storage**:
- Verify the mount paths in your Docker run command
- Ensure data is located in the correct subdirectories
- Check file permissions on the new location

**Identity-related errors**:
- Verify identity files copied completely and without corruption
- Check that identity directory permissions allow reading
- Ensure no extra or missing files in identity directory

**Performance issues after migration**:
- Verify the new storage location has adequate I/O performance
- Check network connectivity between node and satellites
- Monitor system resource usage (CPU, memory, disk I/O)

**Database errors**:
- Ensure all database files copied completely
- Verify database files are not corrupted (compare file sizes)
- Check that storage location has adequate free space

## Important warnings

**Critical identity preservation**: Any corruption or modification of identity files will result in immediate disqualification. Always verify identity files copied perfectly.

**Avoid network storage**: Network-attached storage can cause performance issues and potential disqualification due to latency and reliability concerns.

**Don't rush the process**: Take time to verify each step. A failed migration can result in permanent disqualification and loss of earnings.

**Test with a backup**: If possible, test the migration process with a copy of your data before migrating your production node.

## Next steps

After successful migration:

- [Set up monitoring for your node](#) to track performance
- [Optimize node configuration](#) for your new environment  
- [Plan for future backups](#) of your node data
- [Consider disaster recovery](#) planning for your infrastructure

For additional migration scenarios, see:
- [Migrate between Windows installations](#)
- [Migrate from CLI to GUI installation](#)
- [Set up redundant storage configurations](#)