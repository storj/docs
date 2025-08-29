---
title: How to troubleshoot an offline node
docId: troubleshoot-offline-node-how-to
metadata:
  title: How to Troubleshoot Storage Node Offline Issues
  description: Step-by-step guide to diagnose and fix storage node connectivity issues when your node appears offline or unreachable.
---

This guide helps you diagnose and resolve issues when your storage node appears offline or unreachable to the Storj network.

## Prerequisites

Before troubleshooting, ensure you have:

- Access to your storage node system and configuration
- Administrative privileges on your router/firewall
- Basic understanding of port forwarding concepts
- Your node's external address and port information

## Identify the problem

**Signs your node is offline**:
- Email notifications about node being offline
- Dashboard warnings about connectivity issues
- Low audit success rates or failed audits
- Reduced earnings or payout warnings

**Common causes**:
- Port forwarding issues
- Firewall blocking connections
- Dynamic IP address changes
- Node configuration errors
- Internet connectivity problems

## Step-by-step troubleshooting

Follow these steps in order to diagnose and fix offline issues:

### Step 1: Verify node identity

Ensure your node identity is intact and valid:

```bash
# For CLI installations - check identity files exist
ls -la /path/to/identity/storagenode/

# Should show files like: ca.cert, identity.cert, ca.key, identity.key
# If any files are missing or corrupted, your node will be offline
```

**For Windows GUI installations**:
```powershell
# Check identity folder contents
Get-ChildItem "$env:APPDATA\Storj\Identity\storagenode"
```

**If identity files are missing**: You cannot recover - this results in permanent disqualification. You'll need to create a new node with a new identity.

### Step 2: Check port forwarding configuration

Verify your router forwards the correct port to your node:

**Required port forwarding**:
- **Port**: 28967 
- **Protocol**: Both TCP and UDP
- **Destination**: Internal IP of your node system
- **External IP**: Should match your public IP

**Test port forwarding**:

1. **Find your public IP**:
   ```bash
   curl ifconfig.me
   ```

2. **Test port accessibility**:
   - Visit [https://www.yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/)
   - Enter your public IP and port 28967
   - Click "Check" - should show "Open" if working correctly

### Step 3: Verify external address configuration

Check that your node is configured with the correct external address:

{% tabs %}

{% tab label="CLI Install (Docker)" %}

**Check your Docker run command**:
```bash
# View your container configuration
docker inspect storagenode | grep -A5 -B5 ADDRESS

# Should show something like:
# "ADDRESS=your.external.address:28967"
```

**If ADDRESS is incorrect, update it**:
```bash
# Stop and remove container
docker stop -t 300 storagenode
docker rm storagenode

# Restart with correct ADDRESS
docker run -d --restart unless-stopped \
  --name storagenode \
  -p 28967:28967/tcp \
  -p 28967:28967/udp \
  -p 14002:14002 \
  -e ADDRESS="your.correct.external.address:28967" \
  # ... other parameters
```

{% /tab %}

{% tab label="Windows GUI Install" %}

**Check configuration file**:
```powershell
# View current external address setting
Get-Content "C:\Program Files\Storj\Storage Node\config.yaml" | Select-String "external-address"
```

**Update if incorrect**:
1. Stop the service: `Stop-Service storagenode`
2. Edit config with Notepad++: `notepad++ "C:\Program Files\Storj\Storage Node\config.yaml"`
3. Update the line:
   ```yaml
   contact.external-address: your.correct.external.address:28967
   ```
4. Save and restart: `Start-Service storagenode`

{% /tab %}

{% /tabs %}

### Step 4: Handle dynamic IP addresses

If your internet connection has a dynamic IP that changes:

**Set up Dynamic DNS (DDNS)**:

1. **Register with a DDNS provider** (e.g., [NoIP](https://www.noip.com/), DynDNS)
2. **Create a domain** (e.g., `mynode.ddns.net`)
3. **Configure automatic updates**:

   **Option A: Router configuration**:
   - Access router admin panel
   - Find DDNS section
   - Enter your DDNS provider credentials
   - Enable automatic IP updates

   **Option B: Client software**:
   - Download provider's update client (e.g., NoIP DUC)
   - Configure with your credentials
   - Install and run on your node system

4. **Update node configuration** to use your DDNS domain instead of IP address

**Important**: Only use ONE update method (router OR client software), not both.

### Step 5: Configure firewall rules

Ensure your firewall allows storage node traffic:

{% tabs %}

{% tab label="Windows Firewall" %}

**Add inbound rule**:
```powershell
# Allow inbound traffic on port 28967
New-NetFirewallRule -DisplayName "Storj Node Inbound" -Direction Inbound -Protocol TCP -LocalPort 28967 -Action Allow
New-NetFirewallRule -DisplayName "Storj Node Inbound UDP" -Direction Inbound -Protocol UDP -LocalPort 28967 -Action Allow
```

**Add outbound rule** (if you have restrictive outbound rules):
```powershell
# Allow outbound traffic from storage node
New-NetFirewallRule -DisplayName "Storj Node Outbound" -Direction Outbound -Action Allow
```

{% /tab %}

{% tab label="Linux Firewall (UFW)" %}

**Allow required ports**:
```bash
# Allow inbound traffic on port 28967
sudo ufw allow 28967/tcp
sudo ufw allow 28967/udp

# Reload firewall
sudo ufw reload
```

{% /tab %}

{% tab label="Linux Firewall (iptables)" %}

**Add rules**:
```bash
# Allow inbound traffic
sudo iptables -A INPUT -p tcp --dport 28967 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 28967 -j ACCEPT

# Allow outbound traffic (if you have restrictive rules)
sudo iptables -A OUTPUT -j ACCEPT

# Save rules (method varies by distribution)
sudo iptables-save > /etc/iptables/rules.v4
```

{% /tab %}

{% /tabs %}

### Step 6: Test connectivity

After making changes, test your node's connectivity:

**Check dashboard**:
1. Access your node dashboard (usually `http://localhost:14002`)
2. Look for connectivity status indicators
3. Check for error messages or warnings

**Monitor logs**:

{% tabs %}

{% tab label="CLI Install" %}

```bash
# Follow logs in real-time
docker logs storagenode -f

# Look for connection success/failure messages
# Should see successful communication with satellites
```

{% /tab %}

{% tab label="Windows GUI Install" %}

```powershell
# Check recent logs
Get-Content "C:\Program Files\Storj\Storage Node\logs\*" -Tail 100 | Select-String "error\|offline\|connection"
```

{% /tab %}

{% /tabs %}

**Use external tools**:
```bash
# Test from external system (if available)
telnet your.external.address 28967

# Should connect successfully
```

## Verification checklist

After troubleshooting, verify these items are correct:

- [ ] **Identity files**: Present and intact
- [ ] **Port forwarding**: 28967 TCP+UDP forwarded to correct internal IP
- [ ] **External address**: Correct IP/domain and port in node configuration
- [ ] **DDNS**: Configured and updating if using dynamic IP
- [ ] **Firewall**: Allows inbound traffic on port 28967
- [ ] **Router firewall**: Not blocking the storage node traffic
- [ ] **Network connectivity**: Node can reach the internet
- [ ] **Dashboard**: Shows node as online and connected

## Common issues and solutions

**Port still shows closed after forwarding**:
- Verify internal IP hasn't changed (DHCP reassignment)
- Check router has correct port forwarding syntax
- Some routers require reboot after port forwarding changes
- Verify no double-NAT situation (router behind another router)

**Node works intermittently**:
- Usually indicates dynamic IP issues
- Set up DDNS as described above
- Consider static IP from ISP if available

**Firewall software blocks despite rules**:
- Some antivirus software includes firewalls that override system settings
- Check antivirus software firewall settings
- Consider temporarily disabling to test (remember to re-enable)

**ISP blocks or throttles traffic**:
- Some ISPs block or limit certain ports
- Contact ISP to verify no restrictions on port 28967
- Consider using a VPN as a workaround (though this may impact performance)

**Double-NAT situation**:
- Occurs when your router is behind another router/modem
- Both devices need port forwarding configuration
- Consider setting upstream device to bridge mode if possible

## Advanced troubleshooting

If basic steps don't resolve the issue:

**Check for IP conflicts**:
```bash
# Verify no other device uses same internal IP
nmap -sP your.network.range.0/24
```

**Test from different networks**:
- Use mobile hotspot to test external connectivity
- Helps identify ISP-specific issues

**Check satellite connectivity**:
```bash
# Test connectivity to known Storj satellites (example)
ping satellite.address.storj.io
```

**Review detailed logs**:
```bash
# Enable debug logging (if supported in your version)
# Look for specific error patterns
```

## When to seek help

Contact support if:

- You've followed all steps but node remains offline
- Your ISP confirms no restrictions but connectivity fails
- Hardware appears to be failing
- You suspect account or identity issues

**Provide this information when seeking help**:
- Your node ID
- External IP address and port
- Router make/model
- Operating system details
- Relevant log entries showing errors
- Results of port forwarding tests

## Prevention tips

To avoid future offline issues:

- Set up monitoring alerts for your node status
- Use DDNS from the start if you have dynamic IP
- Document your port forwarding configuration
- Regularly backup your identity and configuration files
- Monitor router firmware updates that might reset configurations
- Consider uninterruptible power supply (UPS) for stability

## Next steps

Once your node is back online:

- [Monitor node performance](#) to ensure stable operation
- [Set up automated monitoring](#) to detect future issues quickly
- [Optimize node configuration](#) for better reliability
- [Plan backup strategies](#) to prevent data loss