---
title: How to change your payout address
docId: change-payout-address-how-to
metadata:
  title: How to Change Your Storage Node Payout Address
  description: Step-by-step guide to update the wallet address where you receive payments for your storage node operations.
---

{% callout type="info" %}
**How-to Guide** - Problem-solving guide for specific tasks
{% /callout %}

This guide shows you how to change the wallet address where you receive payments for operating your storage node.

## Prerequisites

Before changing your payout address, ensure you have:

- A running Storj storage node (CLI or Windows GUI installation)
- Administrative access to the system running your node
- A valid wallet address that supports the payment tokens you'll receive
- Backup of your current configuration (recommended)

## Important considerations

**Timing**: You can change your payout address at any time, but changes only affect future payments. Any pending payments will still be sent to your previous address.

**Wallet compatibility**: Ensure your new wallet address supports the token types used for payouts (currently STORJ tokens and other cryptocurrencies).

**Verification**: Double-check your new wallet address is correct - incorrect addresses may result in lost payments.

## Change payout address

Choose the method that matches your storage node installation:

{% tabs %}

{% tab label="CLI Install (Docker)" %}

### Step 1: Stop the storage node

Stop your running storage node container safely:

```bash
docker stop -t 300 storagenode
docker rm storagenode
```

The `-t 300` flag allows the node 5 minutes to gracefully shut down and complete any ongoing operations.

### Step 2: Update configuration

Edit your configuration file to add or update the wallet address. The location depends on how you set up your node:

**If using config.yaml file:**

```bash
# Edit the config file (adjust path as needed)
nano /path/to/your/storagenode/config.yaml
```

Find the `operator.wallet` section and update it:

```yaml
operator:
  wallet: "0xYourNewWalletAddressHere"
```

**If using environment variables or command-line parameters:**

Update your docker run command to include the new wallet address:

```bash
# Example docker run with new wallet address
docker run -d --restart unless-stopped \
  --name storagenode \
  -p 28967:28967/tcp \
  -p 28967:28967/udp \
  -p 14002:14002 \
  -e WALLET="0xYourNewWalletAddressHere" \
  -e EMAIL="your@email.com" \
  -e ADDRESS="your.external.address:28967" \
  -e STORAGE="1TB" \
  -v /path/to/identity:/app/identity \
  -v /path/to/storage:/app/config \
  storjlabs/storagenode:latest
```

### Step 3: Restart the storage node

Start your storage node with the updated configuration:

```bash
# If using config.yaml, use your standard docker run command
# If using the command above with updated parameters, run it now
```

{% /tab %}

{% tab label="Windows GUI Install" %}

### Step 1: Stop the storage node service

Open an elevated PowerShell window (Run as Administrator) and stop the service:

```powershell
Stop-Service storagenode
```

Alternatively, you can use the Windows Services applet:
1. Press `Win + R`, type `services.msc`, and press Enter
2. Find "Storj V3 Storage Node" in the list
3. Right-click and select "Stop"

### Step 2: Edit configuration file

Open the configuration file with a text editor. **Important**: Use Notepad++ or another advanced text editor - the regular Windows Notepad may not work properly with the file format.

```powershell
# Open the config file location
notepad++ "C:\Program Files\Storj\Storage Node\config.yaml"
```

Find the `operator.wallet` line and update it with your new wallet address:

```yaml
operator:
  wallet: "0xYourNewWalletAddressHere"
```

Save the file.

### Step 3: Restart the storage node service

Restart the service to apply the changes:

```powershell
Start-Service storagenode
```

Or using the Windows Services applet:
1. Right-click "Storj V3 Storage Node" 
2. Select "Start"

{% /tab %}

{% /tabs %}

## Verify the change

After restarting your storage node, verify the new payout address is configured correctly:

### Check the dashboard

1. Access your node's web dashboard (usually at `http://localhost:14002`)
2. Log in with your authentication credentials
3. Look for the wallet address displayed in the node information section
4. Confirm it matches your new address

### Check the logs

Review your storage node logs to confirm successful startup with the new configuration:

{% tabs %}

{% tab label="CLI Install" %}

```bash
# View recent logs
docker logs storagenode --tail 50

# Look for lines confirming the wallet address
# Should not show any errors about invalid wallet format
```

{% /tab %}

{% tab label="Windows GUI Install" %}

Check the logs in the installation directory:

```powershell
# View recent log entries
Get-Content "C:\Program Files\Storj\Storage Node\logs\*" -Tail 50
```

{% /tab %}

{% /tabs %}

Look for log entries that confirm your node started successfully without wallet-related errors.

## Troubleshooting

**Service won't start after change**:
- Verify the wallet address format is correct (typically starts with "0x" for Ethereum addresses)
- Check that you saved the configuration file properly
- Review logs for specific error messages

**Dashboard shows old address**:
- Clear your browser cache and reload the dashboard
- Wait a few minutes for the dashboard to update
- Verify you restarted the service completely

**Invalid wallet address format errors**:
- Confirm your wallet address is valid for the payment system
- Check for extra spaces or characters in the configuration
- Ensure you're using the correct address format (e.g., Ethereum format for STORJ tokens)

**Configuration file changes not taking effect**:
- Verify you have write permissions to the configuration file
- Confirm you're editing the correct configuration file path
- Make sure the service completely stopped before making changes

## Important notes

**Payment timing**: The address change takes effect immediately for new payments, but any payments already processed will still go to your previous address.

**Multiple nodes**: If you operate multiple storage nodes, you'll need to update each one individually following these steps.

**Backup configuration**: Always keep a backup of your working configuration before making changes.

**Address validation**: Some storage node software versions may validate wallet addresses. If you receive validation errors, double-check your address format.

## Next steps

After successfully changing your payout address:

- Monitor your node's operation to ensure it continues running normally
- [Set up monitoring for your node performance](#)
- [Learn about payment schedules and amounts](#)
- [Configure additional node settings](#)

For other storage node configuration changes, see the [complete configuration guide](#).