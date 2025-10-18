---
title: "System Requirements Reference"
docId: system-requirements
metadata:
  title: "Storage Node System Requirements Reference"
  description: "Complete reference for Storage Node hardware, software, and network requirements for optimal performance."
---

{% callout type="warning" %}
**Reference** - Authoritative specification and lookup information
{% /callout %}

Complete reference for Storage Node system requirements and specifications.

## Hardware Requirements

### Minimum Requirements

| Component | Requirement | Notes |
|-----------|-------------|-------|
| **CPU** | 1 core, 1 GHz | ARM or x86_64 |
| **RAM** | 1 GB | Minimum for basic operation |
| **Storage** | 500 GB available | Dedicated to Storj (not OS) |
| **Network** | 1 Mbps up/down | Sustained bandwidth |

### Recommended Requirements

| Component | Requirement | Benefit |
|-----------|-------------|---------|
| **CPU** | 2+ cores, 2+ GHz | Better concurrent processing |
| **RAM** | 4+ GB | Improved caching and performance |
| **Storage** | 2+ TB available | Higher earning potential |
| **Network** | 10+ Mbps up/down | Faster data transfers |

### Optimal Performance Configuration

| Component | Specification | Purpose |
|-----------|---------------|---------|
| **CPU** | 4+ cores, modern architecture | Handle multiple satellite operations |
| **RAM** | 8+ GB | Large cache for frequently accessed data |
| **Storage** | 8+ TB, SSD or NVMe | Maximum storage capacity and speed |
| **Network** | 50+ Mbps symmetric | High-throughput data transfers |

## Storage Requirements

### Storage Types

| Type | Performance | Reliability | Cost | Recommendation |
|------|-------------|-------------|------|----------------|
| **HDD (7200 RPM)** | Good | Good | Low | ✅ Recommended for most setups |
| **SSD (SATA)** | Excellent | Excellent | Medium | ⭐ Optimal for performance |
| **NVMe SSD** | Outstanding | Excellent | High | 🚀 Best performance |
| **USB/External** | Poor | Variable | Low | ❌ Not recommended |

### Storage Considerations

| Factor | Requirement | Rationale |
|--------|-------------|-----------|
| **Dedicated Drive** | Highly recommended | Prevents OS disk space conflicts |
| **File System** | NTFS, ext4, XFS | Reliable journaling file systems |
| **Available Space** | 90% of drive or less | Leave space for metadata and growth |
| **SMART Monitoring** | Essential | Early failure detection |

### Storage Allocation Guidelines

```
Example for 2TB drive:
├── OS/System: 100 GB (separate drive preferred)
├── Storj Data: 1,800 GB (allocated to node)
└── Free Space: 100 GB (buffer for operations)
```

## Network Requirements

### Internet Connection

| Requirement | Specification | Purpose |
|-------------|---------------|---------|
| **Connection Type** | Residential/Business | Stable, always-on connection |
| **Bandwidth** | 1+ Mbps sustained | Handle storage/retrieval requests |
| **Data Cap** | Unlimited preferred | Monthly bandwidth usage varies |
| **Latency** | <100ms to satellites | Responsive to network requests |

### Network Specifications

| Metric | Minimum | Recommended | Optimal |
|--------|---------|-------------|---------|
| **Upload Speed** | 1 Mbps | 5 Mbps | 25+ Mbps |
| **Download Speed** | 1 Mbps | 5 Mbps | 25+ Mbps |
| **Monthly Data** | 2+ TB | 5+ TB | Unlimited |
| **Uptime** | 95% | 98% | 99.5%+ |

### Port and Protocol Requirements

| Protocol | Port | Direction | Purpose |
|----------|------|-----------|---------|
| **TCP** | 28967 | Inbound/Outbound | Primary communication |
| **UDP** | 28967 | Inbound/Outbound | QUIC protocol |
| **HTTP** | 14002 | Localhost only | Dashboard access |

## Operating System Support

### Linux Distributions

| Distribution | Version | Support Level | Installation Method |
|--------------|---------|---------------|-------------------|
| **Ubuntu** | 18.04+ | Full | Docker, Native |
| **Debian** | 10+ | Full | Docker, Native |
| **CentOS/RHEL** | 7+ | Full | Docker, Native |
| **Fedora** | 30+ | Full | Docker |
| **openSUSE** | 15+ | Full | Docker |
| **Arch Linux** | Latest | Community | Docker |

### Other Operating Systems

| OS | Support | Method | Notes |
|----|---------|--------|-------|
| **Windows** | Full | Native installer, Docker | Windows 10/11, Server 2016+ |
| **macOS** | Limited | Docker | Intel and Apple Silicon |
| **FreeBSD** | Community | Docker/Ports | Limited testing |
| **Synology DSM** | Community | Docker | Package available |
| **QNAP** | Community | Docker | Container station |

## Virtualization and Containers

### Docker Requirements

| Component | Requirement | Notes |
|-----------|-------------|-------|
| **Docker Version** | 19.03+ | Supports required features |
| **Docker Compose** | 1.25+ | For compose deployments |
| **Host OS** | Linux, Windows, macOS | Docker Desktop or native |
| **Container Runtime** | Docker or compatible | Podman, containerd support |

### Virtual Machine Specifications

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| **vCPU** | 1 core | 2+ cores |
| **vRAM** | 1 GB | 4+ GB |
| **vDisk** | 500 GB | 2+ TB |
| **Network** | Bridged mode | Direct external access |

### Hardware Pass-through

| Component | Benefit | Requirement |
|-----------|---------|-------------|
| **Disk Pass-through** | Better performance | Direct disk access |
| **Network Pass-through** | Lower latency | Dedicated network interface |
| **CPU Pinning** | Consistent performance | Multi-core host system |

## Network Architecture

### Home Network Setup

```
Internet -> Router -> Storage Node
              ↓
          Port Forward
          28967 TCP/UDP
```

### Advanced Network Configuration

```
Internet -> Firewall -> DMZ -> Storage Node
                       ↓
                   Dedicated VLAN
                   QoS Priority
```

### Dynamic DNS Requirements

| Scenario | Solution | Purpose |
|----------|----------|---------|
| **Dynamic IP** | DDNS service | Maintain consistent address |
| **Multiple Nodes** | Subdomain per node | Unique addressing |
| **IPv6** | DDNS with AAAA records | Future-proofing |

## Platform-Specific Requirements

### Raspberry Pi

| Model | Minimum | Recommended | Notes |
|-------|---------|-------------|-------|
| **Pi 3B+** | Marginal | Not recommended | Limited performance |
| **Pi 4 (4GB)** | Workable | Entry level | USB 3.0 for storage |
| **Pi 4 (8GB)** | Good | Recommended | Better caching |

**Pi-Specific Considerations:**
- Use USB 3.0 SSD for storage
- Ensure adequate power supply (3A+)
- Monitor CPU temperature
- Use quality SD card for OS

### Synology NAS

| Series | Support | Method |
|--------|---------|--------|
| **Plus Series** | Full | Docker package |
| **Value Series** | Limited | Manual Docker setup |
| **J Series** | Not recommended | Insufficient resources |

**NAS-Specific Requirements:**
- DSM 6.0+ with Docker support
- Dedicated volume for Storj data
- SSH access for advanced configuration

### QNAP NAS

| Architecture | Support | Notes |
|--------------|---------|-------|
| **x86_64** | Full | Container Station |
| **ARM** | Limited | Performance considerations |

## Power and Environmental

### Power Requirements

| Component | Consumption | Annual Cost* |
|-----------|-------------|-------------|
| **Raspberry Pi 4** | 15W | $13 |
| **Mini PC** | 30W | $26 |
| **Desktop PC** | 100W | $88 |
| **Server** | 300W | $263 |

*Based on $0.10/kWh electricity rate

### Environmental Considerations

| Factor | Requirement | Rationale |
|--------|-------------|-----------|
| **Temperature** | 10-35°C (50-95°F) | Component longevity |
| **Humidity** | 20-80% RH | Prevent corrosion |
| **Ventilation** | Adequate airflow | Heat dissipation |
| **Power Stability** | UPS recommended | Prevent data corruption |

## Security Requirements

### Network Security

| Component | Requirement | Purpose |
|-----------|-------------|---------|
| **Firewall** | Port 28967 only | Limit attack surface |
| **Router Security** | WPA3, strong passwords | Secure network access |
| **VPN** | For remote management | Secure administrative access |

### System Security

| Component | Requirement | Purpose |
|-----------|-------------|---------|
| **OS Updates** | Regular patching | Security vulnerabilities |
| **User Accounts** | Non-root operation | Principle of least privilege |
| **File Permissions** | Proper ownership | Data protection |

## Performance Monitoring

### Key Metrics to Monitor

| Metric | Tool | Threshold |
|--------|------|-----------|
| **CPU Usage** | htop, Task Manager | <80% sustained |
| **RAM Usage** | free, Task Manager | <90% |
| **Disk I/O** | iostat, Performance Monitor | <80% utilization |
| **Network Usage** | iftop, Resource Monitor | Within bandwidth limits |

### Monitoring Tools

| Platform | Tools | Purpose |
|----------|-------|---------|
| **Linux** | htop, iotop, iftop | Real-time monitoring |
| **Windows** | Task Manager, perfmon | System monitoring |
| **Cross-platform** | Grafana, Prometheus | Advanced monitoring |

## Upgrade Considerations

### Hardware Upgrade Path

1. **RAM** - Easy upgrade, immediate benefit
2. **Storage** - Add drives or upgrade to SSD
3. **Network** - Faster internet connection
4. **CPU** - Usually requires new system

### Capacity Planning

| Growth Rate | Hardware Planning |
|-------------|------------------|
| **Monthly** | Monitor storage usage trends |
| **Quarterly** | Evaluate performance metrics |
| **Annually** | Plan major upgrades |

This reference ensures your Storage Node meets all requirements for reliable operation and optimal earnings potential. Regularly review system performance and upgrade components as needed.