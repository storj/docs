---
title: "Storage Node Configuration Reference"
docId: "node-config-ref-001"
metadata:
  title: "Storage Node Configuration Reference"
  description: "Complete reference for Storage Node configuration parameters, config.yaml options, and environment variables."
---

Complete reference for Storage Node configuration options and parameters.

## Configuration File Location

### Docker Installation
- **Path**: `$HOME/storj/storagenode/config.yaml`
- **Mount**: Bound to `/app/config/config.yaml` in container

### Native Installation

#### Linux
- **Path**: `~/.local/share/storj/storagenode/config.yaml`
- **System**: `/etc/storj/storagenode/config.yaml`

#### Windows  
- **Path**: `C:\Program Files\Storj\Storage Node\config.yaml`
- **User**: `%APPDATA%\Storj\Storage Node\config.yaml`

#### macOS
- **Path**: `~/Library/Application Support/storj/storagenode/config.yaml`

## Core Configuration Parameters

### Identity and Network

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `identity.cert-path` | string | Identity certificate path | `/app/identity/identity.cert` |
| `identity.key-path` | string | Identity private key path | `/app/identity/identity.key` |
| `server.address` | string | External address for node | `your-ddns-hostname:28967` |
| `server.private-address` | string | Internal listening address | `0.0.0.0:28967` |

### Storage Configuration

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `storage.allocated-disk-space` | string | Total allocated space | `1TB` |
| `storage2.allocated-disk-space` | string | Storage v2 allocated space | `1TB` |
| `storage.path` | string | Data storage directory path | `/app/config` |
| `storage2.path` | string | Storage v2 data path | `/app/config/storage2` |

### Bandwidth Allocation

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `storage.allocated-bandwidth` | string | Monthly bandwidth limit | `2TB` |
| `server.revocation-dburl` | string | Revocation database path | `bolt://path/to/revocations.db` |

### Satellite Configuration

| Parameter | Type | Description |
|-----------|------|-------------|
| `contact.external-address` | string | Node's external contact address |
| `storage2.trust.sources` | array | Trusted satellite URLs |

### Database Settings

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `pieces.database-url` | string | Pieces database connection | `bolt://path/to/piecestore.db` |
| `filestore.write-buffer-size` | string | Write buffer size | `128KB` |
| `storage2.database-url` | string | Storage v2 database URL | `bolt://path/to/storage2.db` |

### Network and Performance

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `server.use-peer-ca-whitelist` | boolean | Use peer CA whitelist | `true` |
| `console.address` | string | Web dashboard address | `127.0.0.1:14002` |
| `console.static-dir` | string | Web assets directory | `/app/static` |

## Docker Configuration Examples

### Basic Docker Command
```bash
docker run -d --restart unless-stopped \
  --stop-timeout 300 \
  -p 28967:28967/tcp \
  -p 28967:28967/udp \
  -p 14002:14002 \
  --name storagenode \
  --user $(id -u):$(id -g) \
  --mount type=bind,source=$HOME/storj/identity/storagenode,destination=/app/identity \
  --mount type=bind,source=$HOME/storj/storagenode,destination=/app/config \
  -e WALLET="your-wallet-address" \
  -e EMAIL="your-email@example.com" \
  -e ADDRESS="your-ddns-hostname:28967" \
  -e STORAGE="2TB" \
  storjlabs/storagenode:latest
```

### Docker Compose Configuration
```yaml
version: '3.8'
services:
  storagenode:
    image: storjlabs/storagenode:latest
    container_name: storagenode
    restart: unless-stopped
    stop_grace_period: 300s
    ports:
      - "28967:28967/tcp"
      - "28967:28967/udp" 
      - "14002:14002"
    volumes:
      - /home/user/storj/identity/storagenode:/app/identity
      - /home/user/storj/storagenode:/app/config
    environment:
      - WALLET=your-wallet-address
      - EMAIL=your-email@example.com
      - ADDRESS=your-ddns-hostname:28967
      - STORAGE=2TB
      - BANDWIDTH=2TB
    user: "${UID}:${GID}"
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `WALLET` | Ethereum wallet address for payments | `0x1234567890abcdef...` |
| `EMAIL` | Contact email address | `operator@example.com` |
| `ADDRESS` | External node address | `node.example.com:28967` |
| `STORAGE` | Allocated disk space | `2TB`, `500GB` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BANDWIDTH` | Monthly bandwidth allocation | `2TB` |
| `LOG_LEVEL` | Logging verbosity | `info` |
| `STORAGE2_TRUST_SOURCES` | Comma-separated satellite URLs | Default satellites |

## Advanced Configuration

### Custom Satellite Configuration
```yaml
storage2:
  trust:
    sources:
      - "12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFHpkmw2GT1RtLUod@satellite.example.com:7777"
    exclusions:
      sources: []
    cache-url: "trust://path/to/trust-cache.json"
```

### Database Tuning
```yaml
pieces:
  database-url: "postgres://user:pass@localhost/storagenode?sslmode=disable"
  
storage2:
  database-url: "postgres://user:pass@localhost/storage2?sslmode=disable"
  
# OR for SQLite with custom settings
pieces:
  database-url: "sqlite3://path/to/piecestore.db?cache=shared&mode=rwc&_journal_mode=WAL"
```

### Performance Tuning
```yaml
filestore:
  write-buffer-size: 256KB
  force-sync: true
  
storage2:
  monitor:
    minimum-disk-space: 500MB
    minimum-bandwidth: 1MB
```

## Network Configuration

### Port Configuration

| Port | Protocol | Purpose | Required |
|------|----------|---------|----------|
| `28967` | TCP/UDP | Storage node communication | Yes |
| `14002` | TCP | Web dashboard (local only) | Optional |

### Firewall Rules

#### Linux (iptables)
```bash
# Allow incoming storage node traffic
iptables -A INPUT -p tcp --dport 28967 -j ACCEPT
iptables -A INPUT -p udp --dport 28967 -j ACCEPT

# Allow outgoing traffic
iptables -A OUTPUT -p tcp --dport 28967 -j ACCEPT
iptables -A OUTPUT -p udp --dport 28967 -j ACCEPT
```

#### Router/Firewall Configuration
- **External Port**: 28967 (TCP/UDP)
- **Internal Port**: 28967 (TCP/UDP)
- **Protocol**: Both TCP and UDP required
- **Direction**: Bidirectional

## Logging Configuration

### Log Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| `debug` | Very verbose output | Development/troubleshooting |
| `info` | General information | Normal operation |
| `warn` | Warning messages | Monitoring issues |
| `error` | Error messages only | Production minimal |

### Log Configuration
```yaml
log:
  level: info
  output: stdout
  caller: false
  stack: false
  encoding: console
```

### Docker Logging
```bash
# View logs
docker logs storagenode

# Follow logs
docker logs -f storagenode

# View specific number of lines
docker logs --tail 100 storagenode
```

## Health Check Configuration

### Built-in Health Checks
```yaml
console:
  address: 127.0.0.1:14002
  
healthcheck:
  enabled: true
  interval: 30s
  timeout: 10s
```

### External Monitoring
```bash
# Health check endpoint
curl http://localhost:14002/api/sno

# Satellite status
curl http://localhost:14002/api/sno/satellites
```

## Configuration Validation

### Syntax Check
```bash
# Docker validation
docker run --rm -v $HOME/storj/storagenode:/app/config \
  storjlabs/storagenode:latest --config-dir /app/config --help

# Native installation
storagenode --config-dir ~/.local/share/storj/storagenode --help
```

### Common Configuration Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Identity verification failed | Wrong identity path | Check identity.cert-path and identity.key-path |
| Address not reachable | Firewall/NAT issues | Configure port forwarding |
| Disk space unavailable | Insufficient storage | Increase allocated-disk-space or free up space |
| Database corruption | Improper shutdown | Restore from backup or rebuild |

## Migration and Backup

### Configuration Backup
```bash
# Backup entire config directory
tar -czf storagenode-config-backup-$(date +%Y%m%d).tar.gz \
  -C $HOME/storj storagenode/

# Backup just configuration file
cp $HOME/storj/storagenode/config.yaml \
   $HOME/storj/storagenode/config.yaml.backup
```

### Configuration Migration
```bash
# Copy to new location
rsync -av $HOME/storj/storagenode/ /new/path/storagenode/

# Update docker mount points
docker run ... \
  --mount type=bind,source=/new/path/storagenode,destination=/app/config \
  ...
```

This reference covers all major Storage Node configuration options. For specific deployment scenarios, refer to the installation guides for your platform.