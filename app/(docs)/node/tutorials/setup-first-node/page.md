---
title: Setup your first node
docId: setup-first-node
metadata:
  title: Setup Your First Storage Node Tutorial
  description: Complete 60-minute tutorial to set up your first Storj storage node from start to finish with step-by-step instructions.
---

This comprehensive tutorial walks you through setting up your first Storj storage node from start to finish. By the end, you'll have a running node that earns STORJ tokens for providing storage and bandwidth to the network.

## What you'll build

In this 60-minute hands-on tutorial, you'll:

- Set up the necessary hardware and network infrastructure
- Create a unique node identity for network participation
- Configure port forwarding and firewall settings
- Install and configure the storage node software
- Connect to the Storj network and begin earning rewards
- Set up monitoring and maintenance procedures

**Expected time to complete**: 60-90 minutes

## Prerequisites

Before starting your storage node, ensure you have:

### Hardware requirements (minimum)
- **CPU**: 1 processor core dedicated to your node
- **Storage**: 500 GB available disk space (non-SMR hard drive recommended)
- **RAM**: 2 GB available (4 GB recommended)
- **Network**: Stable internet connection with minimum 1 Mbps upload, 3 Mbps download per TB capacity

### Hardware requirements (recommended)  
- **CPU**: 1 processor core per TB of storage
- **Storage**: 2 TB+ available space on dedicated drive
- **RAM**: 8 GB+ for optimal performance
- **Network**: 3 Mbps upload, 5 Mbps download per TB capacity
- **Uptime**: 99.5%+ monthly (maximum 3.6 hours downtime/month)

### System requirements
- **Operating System**: Linux (Ubuntu 18.04+, Debian 9+), Windows 10+, or macOS 10.15+
- **Administrative privileges**: Ability to install software and configure network settings
- **Router access**: Administrative access to configure port forwarding
- **Static IP or DDNS**: Consistent external address (dynamic DNS acceptable)

### Important considerations

**Network setup**: You must be behind a router/firewall, never connect directly to the internet.

**Power stability**: Consider UPS (Uninterrupted Power Supply) if you experience frequent power outages.

**Drive selection**: Avoid SMR drives, RAID 0, or network-attached storage for best performance.

## Step 1: Assess your setup

Before proceeding, verify your environment meets the requirements:

### Check your internet connection

Test your connection speed and stability:

```bash
# Test connection speed
speedtest-cli

# Test connection stability (run for several minutes)
ping -c 100 8.8.8.8

# Check your public IP
curl ifconfig.me
```

**Expected outcome**: Your connection should meet the minimum bandwidth requirements with stable ping times.

### Verify hardware compatibility

**Check available disk space**:

{% tabs %}

{% tab label="Linux" %}

```bash
# Check disk space and filesystem
df -h
lsblk -f

# Verify filesystem type (ext4 recommended for Linux)
mount | grep "your-storage-drive"
```

{% /tab %}

{% tab label="Windows" %}

```powershell
# Check disk space
Get-WmiObject -Class Win32_LogicalDisk | Select-Object DeviceID,Size,FreeSpace

# Check filesystem (NTFS recommended for Windows)
Get-Volume
```

{% /tab %}

{% /tabs %}

**Expected outcome**: You should have adequate free space on a native filesystem (ext4 for Linux, NTFS for Windows).

## Step 2: Configure network access

Set up network infrastructure to make your node accessible from the internet:

### Set up port forwarding

Configure your router to forward port 28967 to your node system:

1. **Find your internal IP address**:

   {% tabs %}

   {% tab label="Linux" %}
   ```bash
   ip addr show
   # Look for your primary network interface IP
   ```
   {% /tab %}

   {% tab label="Windows" %}
   ```powershell
   ipconfig /all
   # Look for your primary network adapter IP
   ```
   {% /tab %}

   {% /tabs %}

2. **Access router admin panel**:
   - Open web browser to your router's IP (usually 192.168.1.1 or 192.168.0.1)
   - Log in with admin credentials

3. **Configure port forwarding**:
   - Navigate to Port Forwarding or Virtual Servers section
   - Add new rule:
     - **Service Name**: Storj Node
     - **Port Range**: 28967-28967
     - **Local IP**: Your computer's internal IP
     - **Local Port**: 28967
     - **Protocol**: Both TCP and UDP
   - Save and apply settings

### Configure dynamic DNS (if needed)

If your ISP assigns dynamic IP addresses:

1. **Sign up for DDNS service** (e.g., NoIP.com)
2. **Create a domain** (e.g., mynode.ddns.net)  
3. **Configure auto-update**:
   - **Option A**: Configure in router DDNS settings
   - **Option B**: Install DDNS client software on your system

### Test port accessibility

Verify your port forwarding works:

1. **Get your public IP**: `curl ifconfig.me`
2. **Test port**: Visit [https://www.yougetsignal.com/tools/open-ports/]
3. **Enter your public IP and port 28967**
4. **Result should show "Open"**

**Expected outcome**: Port 28967 should be accessible from the internet on both TCP and UDP.

## Step 3: Configure firewall settings

Ensure your system firewall allows storage node traffic:

{% tabs %}

{% tab label="Linux (UFW)" %}

```bash
# Allow storage node port
sudo ufw allow 28967/tcp
sudo ufw allow 28967/udp

# Allow dashboard port (optional, for local access only)
sudo ufw allow from 192.168.0.0/16 to any port 14002

# Reload firewall
sudo ufw reload

# Check status
sudo ufw status
```

{% /tab %}

{% tab label="Windows Defender" %}

```powershell
# Allow inbound traffic on storage node port
New-NetFirewallRule -DisplayName "Storj Node TCP" -Direction Inbound -Protocol TCP -LocalPort 28967 -Action Allow
New-NetFirewallRule -DisplayName "Storj Node UDP" -Direction Inbound -Protocol UDP -LocalPort 28967 -Action Allow

# Allow dashboard port for local access
New-NetFirewallRule -DisplayName "Storj Dashboard" -Direction Inbound -Protocol TCP -LocalPort 14002 -Action Allow
```

{% /tab %}

{% /tabs %}

**Expected outcome**: Firewall should allow traffic on port 28967 and optionally 14002 for the dashboard.

## Step 4: Create your node identity

Generate a unique cryptographic identity for your storage node:

{% tabs %}

{% tab label="Linux" %}

### Install identity creation tools

```bash
# Download identity creation binary
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_amd64.zip -o identity_linux_amd64.zip
unzip identity_linux_amd64.zip
sudo mv identity /usr/local/bin/
chmod +x /usr/local/bin/identity
```

### Create identity

```bash
# Create identity (this may take several hours)
identity create storagenode

# Check progress (in another terminal)
identity status storagenode
```

**Identity creation time varies**:
- Fast CPU: 2-8 hours
- Slower CPU: 8-24+ hours
- Raspberry Pi: 1-3+ days

{% /tab %}

{% tab label="Windows" %}

### Download and install identity tools

1. **Download**: Go to [Storj releases page](https://github.com/storj/storj/releases)
2. **Download**: `identity_windows_amd64.zip` 
3. **Extract**: To a folder like `C:\storj-identity\`
4. **Add to PATH**: Or use full path in commands

### Create identity

```powershell
# Open PowerShell as Administrator
# Navigate to identity tool location
cd C:\storj-identity\

# Create identity (this may take several hours)
.\identity.exe create storagenode

# Check progress (in another PowerShell window)
.\identity.exe status storagenode
```

{% /tab %}

{% /tabs %}

**Expected outcome**: After completion, you should have identity files in your identity directory. The process generates cryptographic keys that uniquely identify your node.

**Important**: Never share or modify your identity files. Losing them means losing your node reputation permanently.

## Step 5: Install storage node software

Choose the installation method that works best for your system:

{% tabs %}

{% tab label="Linux CLI (Docker)" %}

### Install Docker

```bash
# Update package index
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in, then verify
docker --version
```

### Create storage directories

```bash
# Create directories for node data
mkdir -p $HOME/storj/storagenode
mkdir -p $HOME/storj/identity/storagenode

# Copy identity files
cp -r ~/.local/share/storj/identity/storagenode/* $HOME/storj/identity/storagenode/
```

### Run storage node

```bash
# Replace values with your actual information
docker run -d --restart unless-stopped \
  --name storagenode \
  -p 28967:28967/tcp \
  -p 28967:28967/udp \
  -p 14002:14002 \
  -e WALLET="0xYOUR_WALLET_ADDRESS_HERE" \
  -e EMAIL="your-email@example.com" \
  -e ADDRESS="your.ddns.domain:28967" \
  -e STORAGE="2TB" \
  --mount type=bind,source=$HOME/storj/identity/storagenode,destination=/app/identity \
  --mount type=bind,source=$HOME/storj/storagenode,destination=/app/config \
  storjlabs/storagenode:latest
```

{% /tab %}

{% tab label="Windows GUI" %}

### Download Windows installer

1. **Download**: [Storage Node Windows Installer](https://github.com/storj/storj/releases)
2. **Run installer**: `storagenode_windows_amd64.msi`
3. **Follow wizard**: Accept defaults or customize installation path

### Configure the node

1. **Copy identity files**:
   ```powershell
   # Copy identity to program directory (adjust paths as needed)
   Copy-Item -Recurse "C:\Users\$env:USERNAME\.local\share\storj\identity\storagenode\*" "C:\Program Files\Storj\Storage Node\identity\"
   ```

2. **Edit configuration**:
   ```powershell
   # Edit config file (use Notepad++ or similar)
   notepad++ "C:\Program Files\Storj\Storage Node\config.yaml"
   ```

   **Update these values**:
   ```yaml
   operator:
     email: "your-email@example.com"
     wallet: "0xYOUR_WALLET_ADDRESS_HERE"
   contact:
     external-address: "your.ddns.domain:28967"
   storage:
     allocated-bandwidth: "2TB"
     allocated-disk-space: "2TB"
   ```

3. **Start the service**:
   ```powershell
   # Start service
   Start-Service storagenode
   
   # Verify it's running
   Get-Service storagenode
   ```

{% /tab %}

{% /tabs %}

**Replace these placeholders**:
- `0xYOUR_WALLET_ADDRESS_HERE`: Your Ethereum wallet address for payments
- `your-email@example.com`: Your contact email  
- `your.ddns.domain:28967`: Your external address (IP or domain + port)
- `2TB`: Your desired storage allocation

**Expected outcome**: Your storage node should start successfully and begin connecting to the Storj network.

## Step 6: Verify node operation

Confirm your storage node is working correctly:

### Check the dashboard

1. **Open browser**: Navigate to `http://localhost:14002`
2. **Review status**: Should show "Node" connected and stats
3. **Check connectivity**: All satellites should show green status

### Monitor logs

{% tabs %}

{% tab label="Linux CLI" %}

```bash
# View real-time logs
docker logs storagenode -f

# Check for errors
docker logs storagenode 2>&1 | grep -i error

# Look for successful startup messages
docker logs storagenode 2>&1 | grep -i "started"
```

{% /tab %}

{% tab label="Windows GUI" %}

```powershell
# View recent logs
Get-Content "C:\Program Files\Storj\Storage Node\logs\*" -Tail 50

# Follow logs in real-time (PowerShell 7+)
Get-Content "C:\Program Files\Storj\Storage Node\logs\*" -Wait
```

{% /tab %}

{% /tabs %}

**Good log messages to look for**:
- "Server started" or similar startup confirmation
- Successful connections to satellites
- No persistent error messages
- Initial storage and bandwidth allocations

### Test external connectivity

Verify your node is reachable from outside your network:

```bash
# From another computer/network, test connectivity
telnet your.external.address 28967

# Should connect successfully
```

**Expected outcome**: Your node should be accessible externally, showing successful connections in logs and dashboard.

## Step 7: Monitor initial operation

During your node's first days of operation:

### Understand the vetting process

**New node behavior**:
- Initial uploads will be limited (vetting process)
- Storage usage grows slowly over first few months
- Earnings start small and increase over time
- Node reputation builds gradually through successful audits

**Typical timeline**:
- **Days 1-7**: Very limited activity, system testing
- **Weeks 2-8**: Gradual increase in storage uploads
- **Months 2-12**: Continued growth, reputation building
- **After 12 months**: Full earning potential unlocked

### Monitor key metrics

**Daily checks** (first week):
- Node uptime and connectivity
- Log files for errors or warnings
- Dashboard showing satellite connections
- Gradual increase in storage usage

**Weekly checks** (ongoing):
- Storage utilization trends
- Bandwidth usage patterns
- Audit success rates (should stay >95%)
- Payout predictions and actual earnings

### Common first-week issues

**Node appears offline**:
- Verify port forwarding configuration
- Check firewall settings
- Confirm external address is correct
- Test connectivity from external network

**Low activity/earnings**:
- Normal for new nodes during vetting period
- Ensure node has consistent uptime
- Verify sufficient available storage space
- Be patient - growth takes time

**Database or storage errors**:
- Check disk space and filesystem health
- Verify permissions on storage directories  
- Monitor system resources (CPU, RAM, disk I/O)

**Expected outcome**: Your node should show stable operation with gradually increasing activity over the first weeks.

## Step 8: Set up ongoing maintenance

Establish procedures to keep your node healthy long-term:

### Automated monitoring

Set up basic monitoring:

{% tabs %}

{% tab label="Linux" %}

```bash
# Create monitoring script
cat > $HOME/check-storj-node.sh << 'EOF'
#!/bin/bash
# Check if container is running
if ! docker ps | grep -q storagenode; then
  echo "ERROR: Storage node container not running"
  # Add notification/restart logic here
fi

# Check disk space
USAGE=$(df $HOME/storj/storagenode | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $USAGE -gt 90 ]; then
  echo "WARNING: Storage directory $USAGE% full"
fi
EOF

# Make executable
chmod +x $HOME/check-storj-node.sh

# Add to crontab (run every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * $HOME/check-storj-node.sh") | crontab -
```

{% /tab %}

{% tab label="Windows" %}

```powershell
# Create monitoring script
@'
# Check if service is running
$service = Get-Service storagenode -ErrorAction SilentlyContinue
if ($service.Status -ne "Running") {
    Write-Host "ERROR: Storage node service not running"
    # Add notification/restart logic here
}

# Check disk space
$disk = Get-WmiObject -Class Win32_LogicalDisk | Where-Object { $_.DeviceID -eq "C:" }
$usage = [math]::Round(($disk.Size - $disk.FreeSpace) / $disk.Size * 100, 2)
if ($usage -gt 90) {
    Write-Host "WARNING: Disk ${usage}% full"
}
'@ | Out-File -FilePath "$env:USERPROFILE\check-storj-node.ps1"

# Set up scheduled task (run every 5 minutes)
schtasks /create /tn "Storj Node Monitor" /tr "powershell.exe -File $env:USERPROFILE\check-storj-node.ps1" /sc minute /mo 5
```

{% /tab %}

{% /tabs %}

### Update procedures

**Software updates**:
- Storage node software updates automatically
- Monitor for update announcements in Storj community
- Plan maintenance windows for major updates

**System maintenance**:
- Regular system updates and security patches
- Periodic filesystem checks and optimization
- Monitor and clean up log files
- Backup identity files securely

### Performance optimization

As your node matures:

**Storage optimization**:
- Monitor disk I/O performance
- Consider SSD caching for better performance
- Ensure adequate free space (10%+ recommended)

**Network optimization**:
- Monitor bandwidth utilization
- Optimize router QoS settings if needed
- Consider dedicated internet connection for large nodes

**Expected outcome**: You should have monitoring and maintenance procedures in place to ensure long-term reliable operation.

## What you've accomplished

Congratulations! You've successfully set up your first Storj storage node. You now have:

- A fully configured storage node connected to the Storj network
- Proper network infrastructure with port forwarding and firewall rules
- Monitoring systems to track node health and performance  
- Understanding of the vetting process and earnings timeline
- Maintenance procedures for long-term operation

## Understanding your node's journey

**The vetting period**: Your node is now in a 9-month vetting process where Storj gradually increases your allowed storage and bandwidth based on performance.

**Reputation building**: Your node builds reputation through successful audits, uptime, and reliable service. Better reputation leads to higher earnings.

**Earnings timeline**: 
- Month 1-9: Held amount (50% of earnings held as insurance)
- Month 9+: Held amount returned, full earnings for ongoing service
- Full earning potential: Typically achieved after 12+ months of operation

## What's next

Now that your storage node is running:

### Optimize your setup
- [Monitor and optimize node performance](#)
- [Set up advanced monitoring and alerting](#)
- [Plan for scaling to multiple nodes](#)
- [Implement backup and disaster recovery](#)

### Join the community
- [Join the Storj community forum](https://forum.storj.io) for support and updates
- [Follow best practices](#) from experienced node operators  
- [Stay updated](#) on network changes and opportunities

### Advanced topics
- [Understanding storage node economics](#) - detailed earnings analysis
- [Multi-node deployment strategies](#) - scaling your operation  
- [Hardware optimization](#) - improving performance and efficiency

### Troubleshooting resources
- [Troubleshoot offline node issues](../how-to/troubleshoot-offline-node)
- [Migrate node to new hardware](../how-to/migrate-node)
- [Change payout address](../how-to/change-payout-address)

Your storage node is now contributing to the decentralized cloud and you're earning STORJ tokens for providing valuable storage and bandwidth resources to the network. Welcome to the Storj community!