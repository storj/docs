---
title: Set up remote access
docId: setup-remote-access  
metadata:
  title: How to Set Up Remote Access - Storage Node Dashboard
  description: Configure secure remote access to your storage node dashboard using SSH tunneling
---

Set up secure remote access to your storage node dashboard from anywhere using SSH tunneling and port forwarding.

## Prerequisites

- Storage node with web dashboard enabled
- SSH server installed on the node system
- SSH client on your remote device
- Basic networking knowledge
- Router access for port forwarding (optional)

## Enable the web dashboard

### Configure dashboard access

**Docker installation**:
Ensure dashboard port is exposed in your docker run command:
```bash
docker run -d --restart unless-stopped -p 14002:14002 \
  -e WALLET="your-wallet-address" \
  -e EMAIL="your-email" \
  -e ADDRESS="your-external-address:28967" \
  -e STORAGE="2TB" \
  --mount type=bind,source="path-to-identity",destination=/app/identity \
  --mount type=bind,source="path-to-storage",destination=/app/config \
  --name storagenode storjlabs/storagenode:latest
```

**Windows GUI**: Dashboard is automatically available at `http://localhost:14002`

**Linux binary**: Configure in `config.yaml`:
```yaml
console.address: 127.0.0.1:14002
```

## Install SSH server

### Linux (Ubuntu/Debian)

```bash
# Install SSH server
sudo apt update && sudo apt install openssh-server -y

# Enable and start SSH service
sudo systemctl enable ssh
sudo systemctl start ssh

# Check SSH status
sudo systemctl status ssh
```

### Linux (CentOS/RHEL)

```bash
# Install SSH server
sudo yum install openssh-server -y

# Enable and start SSH service
sudo systemctl enable sshd
sudo systemctl start sshd

# Check SSH status
sudo systemctl status sshd
```

### Windows

Enable OpenSSH Server:
```powershell
# Install OpenSSH Server (Windows 10+)
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# Start SSH service
Start-Service sshd

# Set to auto-start
Set-Service -Name sshd -StartupType 'Automatic'
```

### macOS

```bash
# Enable SSH (Remote Login)
sudo systemsetup -setremotelogin on

# Check status
sudo systemsetup -getremotelogin
```

## Configure SSH security

### Generate SSH key pair

On your client device:

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "storagenode-access"

# Accept default location or specify custom path
# Enter passphrase for added security (optional but recommended)
```

### Copy public key to server

**Linux/macOS**:
```bash
# Copy public key to server
ssh-copy-id -i ~/.ssh/id_rsa.pub username@your-node-server

# Alternative method if ssh-copy-id not available
cat ~/.ssh/id_rsa.pub | ssh username@your-node-server "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

**Windows**:
```powershell
# Copy public key content
Get-Content ~/.ssh/id_rsa.pub | ssh username@your-node-server "cat >> ~/.ssh/authorized_keys"
```

### Secure SSH configuration

Edit SSH server configuration:

**Linux**: Edit `/etc/ssh/sshd_config`
**Windows**: Edit `%programdata%\ssh\sshd_config`

```bash
# Recommended security settings
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin no
Port 2222  # Use non-standard port for additional security
MaxAuthTries 3
```

Restart SSH service:
```bash
# Linux
sudo systemctl restart ssh

# Windows  
Restart-Service sshd
```

## Set up local SSH tunneling

### Basic port forwarding

From your client device:

```bash
# Forward local port 14002 to remote dashboard
ssh -L 14002:localhost:14002 username@your-node-server

# Keep connection open and access dashboard at:
# http://localhost:14002
```

### Advanced tunneling options

**Background tunnel**:
```bash
# Run tunnel in background
ssh -f -N -L 14002:localhost:14002 username@your-node-server

# Kill background tunnel later
pkill -f "ssh.*14002:localhost:14002"
```

**Auto-reconnect tunnel**:
```bash
# Create persistent tunnel with autossh (install autossh first)
autossh -M 20000 -f -N -L 14002:localhost:14002 username@your-node-server
```

**Multiple port forwarding**:
```bash
# Forward multiple services
ssh -L 14002:localhost:14002 -L 8080:localhost:8080 username@your-node-server
```

## Configure router port forwarding

### Set up external access (optional)

For direct external access without local tunneling:

1. **Log in to your router's admin interface**
2. **Navigate to Port Forwarding settings**
3. **Create new forwarding rule**:
   - External Port: 2222 (custom SSH port)
   - Internal Port: 2222  
   - Internal IP: Your node server's local IP
   - Protocol: TCP
4. **Save and apply settings**

**Security note**: Only forward SSH port, NOT the dashboard port directly.

## Mobile access setup

### Using Termius (Android/iOS)

**Install Termius app** and configure:

1. **Create new host**:
   - Hostname: Your public IP or domain
   - Port: 2222 (your SSH port)
   - Username: Your SSH username

2. **Add your SSH key**:
   - Go to Keychain
   - Import or generate SSH key
   - Associate key with your host

3. **Set up port forwarding**:
   - Go to Port Forwarding
   - Create new rule:
     - Port forward from: 14002
     - Host to: 127.0.0.1
     - Port to: 14002
     - Address: 127.0.0.1

4. **Connect and access dashboard**:
   - Connect to your host
   - Enable port forwarding
   - Open browser to `http://localhost:14002`

## Create connection scripts

### Automated connection script

**Linux/macOS** (`connect-node.sh`):
```bash
#!/bin/bash
echo "Connecting to storage node dashboard..."
ssh -L 14002:localhost:14002 username@your-node-server -N &
SSH_PID=$!

echo "SSH tunnel established (PID: $SSH_PID)"
echo "Dashboard available at: http://localhost:14002"
echo "Press Ctrl+C to disconnect"

# Wait for user interrupt
trap "kill $SSH_PID; exit" INT
wait $SSH_PID
```

**Windows** (`connect-node.bat`):
```batch
@echo off
echo Connecting to storage node dashboard...
start "SSH Tunnel" ssh -L 14002:localhost:14002 username@your-node-server -N
echo Dashboard available at: http://localhost:14002
echo Press any key to disconnect...
pause
taskkill /F /IM ssh.exe
```

Make scripts executable:
```bash
chmod +x connect-node.sh
```

## Test and verify access

### Verify SSH connection

```bash
# Test SSH connection
ssh username@your-node-server

# Should connect without password (using key)
```

### Test dashboard access

1. **Establish SSH tunnel**
2. **Open browser to `http://localhost:14002`**
3. **Verify dashboard loads correctly**
4. **Check all dashboard functions work**

### Test from different networks

- Connect from different WiFi networks
- Test mobile access
- Verify connection stability

## Troubleshooting

### SSH connection issues

**Permission denied**:
```bash
# Check SSH key permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Verify public key is on server
ssh username@server "cat ~/.ssh/authorized_keys"
```

**Connection timeout**:
- Check firewall settings on server
- Verify SSH service is running
- Confirm correct IP address and port

**Port forwarding not working**:
```bash
# Check if port is in use locally
netstat -an | grep 14002

# Try different local port
ssh -L 14003:localhost:14002 username@server
```

### Dashboard access issues

**Dashboard not loading**:
- Verify storage node is running
- Check dashboard is enabled in configuration
- Confirm port 14002 is correct

**Partial functionality**:
- Check browser console for errors
- Try different browser
- Clear browser cache

### Mobile app issues

**Termius connection fails**:
- Verify host configuration
- Check SSH key is properly imported
- Test connection without port forwarding first

**Port forwarding doesn't work**:
- Ensure rule is enabled
- Check local port isn't in use
- Try refreshing the connection

## Security best practices

### Secure your setup

- Use strong SSH key passphrases
- Disable password authentication
- Use non-standard SSH ports
- Implement fail2ban for brute force protection
- Regular security updates

### Monitor access

```bash
# Monitor SSH login attempts
sudo tail -f /var/log/auth.log | grep ssh

# Check active SSH connections
who
```

### Firewall configuration

```bash
# Allow SSH on custom port
sudo ufw allow 2222/tcp

# Block dashboard port from external access
sudo ufw deny 14002/tcp
```

## Next steps

- Set up [monitoring and alerts](docId:monitor-node-performance) for your storage node
- Learn about [node optimization](docId:optimize-node-performance) for better performance
- Configure [automated backups](docId:your-backup-guide) for important node data