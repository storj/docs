---
title: Fix database corruption
docId: fix-database-corruption
metadata:
  title: How to Fix Database Corruption - Storage Node
  description: Repair SQLite database corruption on your Storj storage node
---

Fix SQLite database corruption that can occur during unplanned shutdowns or system issues.

## Prerequisites

- Storage node that's experiencing database corruption
- Administrative access to your system
- SQLite 3.25.2 or later
- Backup space for database files

## Identify database corruption

### Check for corruption errors

Look for these error messages in your storage node logs:
- "database disk image is malformed"
- Database integrity check failures
- SQLite corruption errors

### Stop the storage node

**Docker installation**:
```bash
docker stop storagenode
```

**Windows GUI**: Use the application interface to stop the node

**Linux service**:
```bash
sudo systemctl stop storagenode
```

## Install SQLite tools

### Option 1: Use Docker (recommended)

```bash
# Docker-based SQLite (x86_64 only)
# Replace ${PWD} with absolute path to database location
docker run --rm -it --mount type=bind,source=${PWD},destination=/data sstc/sqlite3 \
  find . -maxdepth 1 -iname "*.db" -print0 -exec sqlite3 '{}' 'PRAGMA integrity_check;' ';'
```

### Option 2: Install SQLite directly

**Linux (Debian/Ubuntu)**:
```bash
sudo apt update && sudo apt install sqlite3 -y
```

**Linux (CentOS/RHEL)**:
```bash
sudo yum install sqlite -y
```

**Windows**: Download from [SQLite Downloads](https://www.sqlite.org/download.html)

**Verify version**:
```bash
sqlite3 --version
# Should be 3.25.2 or later
```

## Check database integrity

### Locate database files

Find your storage node's database files:
- **Docker**: In your mounted storage directory
- **Windows GUI**: Usually `C:\Program Files\Storj\Storage Node\storage\`
- **Linux**: Configured in your `config.yaml` file

Common database files:
- `bandwidth.db`
- `piece_expiration.db`
- `piece_info.db`
- `reputation.db`
- `satellites.db`
- `storage_usage.db`

### Check all databases

**Linux/macOS**:
```bash
find /path/to/storage/ -maxdepth 1 -iname "*.db" -print0 -exec sqlite3 '{}' 'PRAGMA integrity_check;' ';'
```

**Windows PowerShell**:
```powershell
Get-ChildItem X:\storagenode\storage\*.db -File | %{$_.Name + " " + $(sqlite3.exe $_.FullName "PRAGMA integrity_check;")}
```

**Expected output**: "ok" for healthy databases

## Repair corrupted databases

### Create database backups

```bash
# Back up corrupted database
cp /storage/bandwidth.db /storage/bandwidth.db.bak
```

### Extract data from corrupted database

**Using Docker**:
```bash
# Open shell in container
docker run --rm -it --mount type=bind,source=/path/to/storage,destination=/storage sstc/sqlite3 sh
```

**Direct SQLite access**:
```bash
sqlite3 /storage/bandwidth.db
```

### Dump database contents

In the SQLite prompt:
```sql
.mode insert
.output /storage/dump_all.sql
.dump
.exit
```

### Clean the dump file

**Linux/Docker**:
```bash
{ echo "PRAGMA synchronous = OFF ;"; cat /storage/dump_all.sql; } | \
  grep -v -e TRANSACTION -e ROLLBACK -e COMMIT >/storage/dump_all_notrans.sql
```

**Windows PowerShell**:
```powershell
$(echo "PRAGMA synchronous = OFF ;"; Get-Content dump_all.sql) | \
  Select-String -NotMatch "TRANSACTION|ROLLBACK|COMMIT" | \
  Set-Content -Encoding utf8 dump_all_notrans.sql
```

### Recreate the database

```bash
# Remove corrupted database (backup exists!)
rm /storage/bandwidth.db

# Recreate database from dump
sqlite3 /storage/bandwidth.db ".read /storage/dump_all_notrans.sql"
```

### Verify repair

```bash
# Check file size (should be > 0)
ls -l /storage/bandwidth.db

# Test integrity
sqlite3 /storage/bandwidth.db "PRAGMA integrity_check;"
```

## Handle complete corruption

If the repair process fails:

### Follow database replacement guide

For databases that cannot be repaired, you'll lose historical statistics but can continue operating:

1. **Stop the storage node**
2. **Move corrupted database**: `mv corrupted.db corrupted.db.backup`
3. **Start storage node**: It will create a new, empty database
4. **Monitor for proper operation**

{% callout type="warning" %}
**Important**: Complete database replacement will reset your node's statistics but won't affect stored data or earnings.
{% /callout %}

## Restart storage node

After successful repairs:

**Docker**:
```bash
docker start storagenode
```

**Windows GUI**: Start through the application

**Linux service**:
```bash
sudo systemctl start storagenode
```

## Prevent future corruption

### Use proper shutdown procedures

- Always stop storage nodes gracefully before system shutdown
- Avoid force-killing processes or containers
- Use UPS for power protection

### Check storage configuration

**Avoid incompatible storage**:
- Don't use NFS or SMB for database storage
- Only network protocol that works with SQLite is iSCSI
- Use local storage or direct-attached drives when possible

**External drive considerations**:
- Ensure adequate power supply for USB drives
- Avoid drives that spin down during operation
- Prefer internal drives for database storage

### Update your setup

**Windows users**:
- Consider migrating to Windows GUI instead of Docker
- Disable write cache on external drives

**Docker users**:
- Use current docker run command from documentation
- Ensure proper volume mounting

**Unraid users**:
- Update to latest platform version (6.8.0+)
- Or use stable version 6.6.7 if corruption persists

## Verification

- [ ] Storage node starts without database errors
- [ ] Dashboard shows correct information  
- [ ] No corruption errors in logs
- [ ] Node successfully communicates with satellites
- [ ] Backup procedures are in place

## Troubleshooting

**Repair fails with "database is locked"**:
- Ensure storage node is completely stopped
- Check for background processes accessing the database
- Restart the system if necessary

**New database is empty after repair**:
- This is expected for completely corrupted databases
- Statistics will rebuild over time
- Stored data and earnings are not affected

**Repeated corruption**:
- Check storage hardware health
- Review power management settings
- Consider storage configuration changes
- Monitor system logs for hardware issues

## Next steps

- Set up [automated monitoring](docId:monitor-node-performance) to detect issues early
- Learn about [node updates](docId:handle-node-updates) to prevent corruption during updates
- Configure [proper backup strategies](docId:your-backup-guide) for critical data