---
title: Monitor node performance
docId: monitor-node-performance
metadata:
  title: How to Monitor Storage Node Performance
  description: Set up monitoring and alerting for your Storj storage node health and performance
---

Monitor your storage node's performance, health metrics, and operational status to ensure optimal operation and early problem detection.

## Prerequisites

- Running storage node with dashboard access
- Basic understanding of storage node metrics
- Command line access to your node system
- Optional: Monitoring tools installation permissions

## Monitor basic node health

### Use the web dashboard

**Access dashboard**:
- Local: `http://localhost:14002`
- Remote: Set up [remote access](docId:setup-remote-access)

**Key metrics to monitor**:
- **Online score**: Should stay above 95%
- **Audit score**: Should remain above 95%
- **Suspension score**: Should stay at 100%
- **Available disk space**: Monitor free space remaining
- **Bandwidth usage**: Track ingress/egress patterns
- **Earnings**: Monitor payout trends

### Check node status via command line

**Docker installation**:
```bash
# Check container status
docker ps -f name=storagenode

# View recent logs
docker logs --tail 100 storagenode

# Follow live logs
docker logs -f storagenode
```

**Windows GUI**:
- Use the built-in dashboard and logs viewer
- Check Windows Event Viewer for system events

**Linux binary**:
```bash
# Check service status
sudo systemctl status storagenode

# View logs
sudo journalctl -u storagenode -f
```

## Set up log monitoring

### Monitor critical log events

**Key log patterns to watch**:
```bash
# Connection issues
grep -i "dial" /path/to/node/logs

# Database errors
grep -i "database\|sqlite" /path/to/node/logs

# Disk space warnings  
grep -i "disk\|space" /path/to/node/logs

# Audit failures
grep -i "audit.*failed" /path/to/node/logs

# Suspension warnings
grep -i "suspend" /path/to/node/logs
```

### Automated log monitoring script

Create `monitor-node.sh`:
```bash
#!/bin/bash
LOG_FILE="/path/to/storagenode.log"
EMAIL="your-email@example.com"

# Check for critical errors in last 100 lines
ERRORS=$(tail -100 "$LOG_FILE" | grep -i "error\|failed\|suspend\|disqualify")

if [ ! -z "$ERRORS" ]; then
    echo "Critical errors detected in storage node:" | mail -s "Storage Node Alert" "$EMAIL"
    echo "$ERRORS" | mail -s "Storage Node Error Details" "$EMAIL"
fi

# Check disk space
DISK_USAGE=$(df /path/to/storage | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 90 ]; then
    echo "Disk usage is ${DISK_USAGE}% - critical level reached" | \
         mail -s "Storage Node Disk Alert" "$EMAIL"
fi
```

### Set up log rotation

**Linux logrotate configuration** (`/etc/logrotate.d/storagenode`):
```
/path/to/storagenode.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
}
```

## Monitor system resources

### Track resource usage

**CPU and Memory monitoring**:
```bash
# Check current resource usage
top -p $(pgrep storagenode)

# Get storage node process stats
ps aux | grep storagenode

# Monitor over time
htop -p $(pgrep storagenode)
```

**Disk I/O monitoring**:
```bash
# Monitor disk I/O
iostat -x 5

# Check specific storage device
iostat -x /dev/sda 5

# Monitor disk space
watch -n 30 'df -h /path/to/storage'
```

**Network monitoring**:
```bash
# Monitor network connections
netstat -tuln | grep 28967

# Track bandwidth usage
iftop -i eth0

# Monitor specific ports
ss -tuln | grep -E '(14002|28967)'
```

### Create resource monitoring script

Create `resource-monitor.sh`:
```bash
#!/bin/bash
NODE_PID=$(pgrep storagenode)

if [ -z "$NODE_PID" ]; then
    echo "$(date): Storage node process not found!" >> /var/log/node-monitor.log
    exit 1
fi

# Get resource usage
CPU_USAGE=$(ps -p $NODE_PID -o %cpu --no-headers)
MEM_USAGE=$(ps -p $NODE_PID -o %mem --no-headers)
DISK_FREE=$(df /path/to/storage | awk 'NR==2 {print $4}')

# Log metrics
echo "$(date): CPU: ${CPU_USAGE}% | Memory: ${MEM_USAGE}% | Disk Free: ${DISK_FREE}KB" \
     >> /var/log/node-monitor.log

# Alert thresholds
if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
    echo "High CPU usage: ${CPU_USAGE}%" | mail -s "Node CPU Alert" your-email@example.com
fi

if (( $(echo "$MEM_USAGE > 90" | bc -l) )); then
    echo "High memory usage: ${MEM_USAGE}%" | mail -s "Node Memory Alert" your-email@example.com
fi
```

## Set up automated health checks

### Node connectivity check

Create `health-check.sh`:
```bash
#!/bin/bash
DASHBOARD_URL="http://localhost:14002"
NODE_ADDRESS="your-node-external-address:28967"

# Check dashboard availability
if ! curl -s "$DASHBOARD_URL" > /dev/null; then
    echo "$(date): Dashboard unreachable" >> /var/log/health-check.log
    echo "Storage node dashboard is down" | mail -s "Node Dashboard Alert" your-email@example.com
fi

# Check external port connectivity (requires external monitoring)
# This would need to be run from external server
# if ! nc -z -v $NODE_ADDRESS 2>/dev/null; then
#     echo "External port not reachable"
# fi

# Check recent successful connections in logs
RECENT_SUCCESS=$(tail -1000 /path/to/node/logs | grep -c "download started\|upload started")
if [ "$RECENT_SUCCESS" -eq 0 ]; then
    echo "$(date): No recent activity detected" >> /var/log/health-check.log
fi
```

### Audit score monitoring

Create `audit-monitor.sh`:
```bash
#!/bin/bash
API_ENDPOINT="http://localhost:14002/api/sno"

# Get audit scores from dashboard API
AUDIT_DATA=$(curl -s "$API_ENDPOINT")

# Extract audit scores (requires jq)
AUDIT_SCORE=$(echo "$AUDIT_DATA" | jq '.audits.score')
SUSPENSION_SCORE=$(echo "$AUDIT_DATA" | jq '.audits.suspensionScore')

# Alert on low scores
if (( $(echo "$AUDIT_SCORE < 0.95" | bc -l) )); then
    echo "Audit score dropped to $AUDIT_SCORE" | \
         mail -s "Critical: Low Audit Score" your-email@example.com
fi

if (( $(echo "$SUSPENSION_SCORE < 1.0" | bc -l) )); then
    echo "Suspension score is $SUSPENSION_SCORE" | \
         mail -s "Critical: Suspension Risk" your-email@example.com
fi
```

## Schedule monitoring tasks

### Set up cron jobs

Edit crontab:
```bash
crontab -e
```

Add monitoring schedules:
```bash
# Check health every 15 minutes
*/15 * * * * /path/to/health-check.sh

# Monitor resources every 5 minutes
*/5 * * * * /path/to/resource-monitor.sh

# Check for critical log events every hour
0 * * * * /path/to/monitor-node.sh

# Check audit scores every hour
30 * * * * /path/to/audit-monitor.sh

# Daily summary report
0 9 * * * /path/to/daily-report.sh
```

### Windows Task Scheduler

For Windows nodes, set up scheduled tasks:
```powershell
# Create scheduled task for monitoring
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 15)
$action = New-ScheduledTaskAction -Execute "PowerShell" -Argument "-File C:\path\to\monitor-script.ps1"
Register-ScheduledTask -TaskName "StorageNodeMonitor" -Trigger $trigger -Action $action
```

## Advanced monitoring with external tools

### Using Grafana and Prometheus

**Install Prometheus node exporter**:
```bash
# Download and install node exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
tar xvfz node_exporter-*.*-amd64.tar.gz
sudo mv node_exporter-*.*-amd64/node_exporter /usr/local/bin/
```

**Create Storj-specific metrics script**:
```bash
#!/bin/bash
# storj-metrics.sh
METRICS_FILE="/var/lib/node_exporter/textfile_collector/storj.prom"

# Get node data from API
NODE_DATA=$(curl -s http://localhost:14002/api/sno)

# Extract metrics and write to Prometheus format
echo "# HELP storj_audit_score Current audit score" > "$METRICS_FILE"
echo "# TYPE storj_audit_score gauge" >> "$METRICS_FILE"
echo "storj_audit_score $(echo $NODE_DATA | jq '.audits.score')" >> "$METRICS_FILE"

echo "# HELP storj_suspension_score Current suspension score" >> "$METRICS_FILE"
echo "# TYPE storj_suspension_score gauge" >> "$METRICS_FILE"
echo "storj_suspension_score $(echo $NODE_DATA | jq '.audits.suspensionScore')" >> "$METRICS_FILE"
```

### Using Nagios/Icinga

Create Nagios check script:
```bash
#!/bin/bash
# check_storj_node.sh
DASHBOARD_URL="http://localhost:14002/api/sno"

# Get node status
RESPONSE=$(curl -s "$DASHBOARD_URL")
if [ $? -ne 0 ]; then
    echo "CRITICAL - Cannot connect to dashboard"
    exit 2
fi

# Check audit score
AUDIT_SCORE=$(echo "$RESPONSE" | jq '.audits.score')
if (( $(echo "$AUDIT_SCORE < 0.95" | bc -l) )); then
    echo "CRITICAL - Audit score is $AUDIT_SCORE"
    exit 2
elif (( $(echo "$AUDIT_SCORE < 0.98" | bc -l) )); then
    echo "WARNING - Audit score is $AUDIT_SCORE"
    exit 1
fi

echo "OK - Node is healthy, audit score: $AUDIT_SCORE"
exit 0
```

## Create alerting rules

### Email alerts setup

Configure mail system:
```bash
# Install mail utilities
sudo apt install mailutils postfix

# Configure for external SMTP (optional)
sudo dpkg-reconfigure postfix
```

### Slack/Discord notifications

Create webhook notification script:
```bash
#!/bin/bash
# send-alert.sh
WEBHOOK_URL="your-slack-webhook-url"
MESSAGE="$1"

curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"Storage Node Alert: $MESSAGE\"}" \
    "$WEBHOOK_URL"
```

### SMS alerts (using Twilio)

```bash
#!/bin/bash
# sms-alert.sh
ACCOUNT_SID="your-twilio-sid"
AUTH_TOKEN="your-twilio-token"
FROM="+1234567890"  # Your Twilio number
TO="+0987654321"    # Your phone number
MESSAGE="$1"

curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$ACCOUNT_SID/Messages.json" \
    --data-urlencode "From=$FROM" \
    --data-urlencode "To=$TO" \
    --data-urlencode "Body=Storage Node Alert: $MESSAGE" \
    -u "$ACCOUNT_SID:$AUTH_TOKEN"
```

## Verification checklist

- [ ] Dashboard is accessible and showing current data
- [ ] Log monitoring detects critical events
- [ ] Resource monitoring tracks CPU, memory, and disk usage
- [ ] Health checks verify node connectivity
- [ ] Audit score monitoring is working
- [ ] Automated alerts are configured and tested
- [ ] Monitoring scripts are scheduled to run regularly
- [ ] Alert notifications reach you successfully

## Next steps

- Set up [node optimization](docId:optimize-node-performance) based on monitoring insights
- Learn about [handling node updates](docId:handle-node-updates) safely
- Configure [backup and disaster recovery](docId:your-backup-guide) procedures