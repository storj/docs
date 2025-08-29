---
title: "Dashboard Metrics Reference"
docId: "node-dashboard-ref-001"
metadata:
  title: "Storage Node Dashboard Metrics Reference"
  description: "Complete reference for all Storage Node dashboard metrics, monitoring data, and performance indicators."
---

Complete reference for Storage Node dashboard metrics and monitoring information.

## Accessing the Dashboard

### Local Dashboard
- **URL**: `http://localhost:14002` (default)
- **Access**: Local machine only (for security)
- **Port**: Configurable in `config.yaml` (`console.address`)

### External Dashboard Access

For remote monitoring, use SSH tunneling:
```bash
# SSH tunnel to access remote node dashboard
ssh -L 14002:localhost:14002 user@your-node-server
# Then access http://localhost:14002 locally
```

## Overview Metrics

### Node Status Indicators

| Metric | Description | Values |
|--------|-------------|--------|
| **Node Status** | Overall node health | Online, Offline, Disqualified |
| **Uptime** | Time since node started | Hours, days |
| **Last Ping** | Last successful satellite ping | Timestamp |
| **Node Version** | Storage node software version | e.g., `v1.95.1` |

### Suspension and Disqualification

| Status | Description | Impact |
|--------|-------------|--------|
| **Good Standing** | Node operating normally | Full participation |
| **Suspended** | Temporary suspension from satellite | No new data, existing data served |
| **Disqualified** | Permanent removal from satellite | Data deleted, no participation |

## Storage Metrics

### Disk Usage

| Metric | Description | Calculation |
|--------|-------------|-------------|
| **Used Space** | Currently stored data | Sum of all piece sizes |
| **Available Space** | Remaining allocated space | Allocated - Used |
| **Allocated Space** | Total space allocated to node | From configuration |
| **Trash** | Data marked for deletion | Pending garbage collection |

### Storage Breakdown by Satellite

| Field | Description |
|-------|-------------|
| **Satellite ID** | Unique satellite identifier |
| **Data Stored** | Amount of data from this satellite |
| **Percentage** | Portion of total storage from satellite |

## Bandwidth Metrics

### Current Period (Monthly)

| Metric | Description | Reset Period |
|--------|-------------|--------------|
| **Ingress** | Data uploaded to node | Monthly (satellite billing cycle) |
| **Egress** | Data downloaded from node | Monthly |
| **Total Bandwidth** | Ingress + Egress | Monthly |
| **Remaining Bandwidth** | Allocated - Used | Monthly |

### Bandwidth by Satellite

| Field | Description |
|-------|-------------|
| **Satellite** | Satellite name/ID |
| **Ingress** | Upload traffic from satellite |
| **Egress** | Download traffic to satellite |
| **Total** | Combined satellite bandwidth |

## Earnings Metrics

### Current Month

| Metric | Description | Currency |
|--------|-------------|----------|
| **Estimated Earnings** | Projected month earnings | STORJ tokens |
| **Disk Space Compensation** | Payment for storage | STORJ tokens |
| **Bandwidth Compensation** | Payment for traffic | STORJ tokens |
| **Payout Address** | Wallet receiving payments | Ethereum address |

### Earnings History

| Field | Description |
|-------|-------------|
| **Month** | Billing period |
| **Disk Average** | Average monthly disk usage |
| **Bandwidth** | Total monthly bandwidth |
| **Payout** | Amount paid |
| **Receipt** | Payment transaction ID |

## Reputation Metrics

### Audit Scores

| Metric | Range | Description |
|--------|-------|-------------|
| **Audit Score** | 0-100% | Success rate for audit requests |
| **Suspension Score** | 0-100% | Threshold: <60% triggers suspension |
| **Disqualification Score** | 0-100% | Threshold: <60% triggers disqualification |

### Online Score

| Metric | Range | Description |
|--------|-------|-------------|
| **Online Score** | 0-100% | Node availability percentage |
| **Downtime Events** | Count | Number of offline periods |
| **Last Offline** | Timestamp | Most recent offline event |

### Uptime Tracking

| Field | Description |
|-------|-------------|
| **Current Uptime** | Continuous online time |
| **Today** | Uptime percentage for current day |
| **This Month** | Uptime percentage for current month |
| **All Time** | Historical uptime average |

## Satellite-Specific Metrics

### Per-Satellite Data

| Satellite | Description |
|-----------|-------------|
| **12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFHpkmw2GT1RtLUod** | US Central |
| **12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs** | Europe North |
| **1wFTAgs9DP5RSnCqKV1eLf6N9wtk4EAtmN5DpSxcs8EjT69tGE** | Asia Pacific |

### Satellite Metrics

| Metric | Description |
|--------|-------------|
| **Node Age** | Time since first contact with satellite |
| **Vetted Status** | Whether node is vetted (trusted) |
| **Joined Date** | When node first connected |
| **Data Stored** | Current data volume |
| **Audit Success Rate** | Historical audit performance |

## System Performance

### Resource Utilization

| Metric | Description | Units |
|--------|-------------|-------|
| **CPU Usage** | Processor utilization | Percentage |
| **Memory Usage** | RAM consumption | MB/GB |
| **Disk I/O** | Read/write operations | IOPS |
| **Network I/O** | Network throughput | Mbps |

### Database Metrics

| Metric | Description |
|--------|-------------|
| **Pieces Database Size** | Piece metadata database size |
| **Info Database Size** | Node information database size |
| **Database Queries** | Query performance metrics |

## Notifications and Alerts

### Dashboard Notifications

| Type | Description | Action Required |
|------|-------------|----------------|
| **Version Update** | New software version available | Update recommended |
| **Low Disk Space** | Storage nearly full | Free up space or increase allocation |
| **Suspension Warning** | Reputation score declining | Investigate connectivity/performance |
| **Payment Info** | Payout information | Check wallet address |

### Health Indicators

| Indicator | Status | Meaning |
|-----------|--------|---------|
| 🟢 Green | Healthy | All systems normal |
| 🟡 Yellow | Warning | Attention needed |
| 🔴 Red | Critical | Immediate action required |

## API Endpoints for Monitoring

### Dashboard API

| Endpoint | Description | Response |
|----------|-------------|----------|
| `/api/sno` | Node overview data | JSON summary |
| `/api/sno/satellites` | Satellite-specific data | JSON per satellite |
| `/api/sno/estimated-payouts` | Earnings estimates | JSON payout data |

### Monitoring Script Example

```bash
#!/bin/bash
# Basic node health check
response=$(curl -s http://localhost:14002/api/sno)
status=$(echo $response | jq -r '.status')

if [ "$status" = "online" ]; then
    echo "Node is healthy"
else
    echo "Node issue detected: $status"
fi
```

## Historical Data Tracking

### Data Retention

| Metric | Retention Period | Purpose |
|--------|------------------|---------|
| **Bandwidth** | 12 months | Payout calculation |
| **Storage** | 12 months | Trend analysis |
| **Audit Results** | Permanent | Reputation tracking |
| **Uptime** | 12 months | Performance monitoring |

### Export Options

Dashboard data can be extracted via:
- **API endpoints** - Real-time data
- **Log files** - Historical events
- **Database queries** - Direct data access

## Performance Optimization

### Key Metrics to Monitor

1. **Audit Success Rate** - Should stay >95%
2. **Online Score** - Should stay >98%
3. **Bandwidth Utilization** - Higher is better
4. **Storage Growth** - Indicates network demand

### Warning Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| **Audit Score** | <85% | <60% |
| **Online Score** | <95% | <90% |
| **Disk Free** | <10% | <5% |
| **Version Behind** | >1 version | >3 versions |

## Troubleshooting Dashboard Issues

### Dashboard Not Accessible

1. **Check port binding**:
   ```bash
   netstat -tulnp | grep 14002
   ```

2. **Verify configuration**:
   ```yaml
   console:
     address: 127.0.0.1:14002
   ```

3. **Check firewall rules** (if accessing remotely)

### Missing Data

1. **Restart node** if metrics not updating
2. **Check database integrity**
3. **Verify satellite connectivity**

This reference covers all dashboard metrics for effective Storage Node monitoring and management. Use these metrics to ensure optimal node performance and maximize earnings.