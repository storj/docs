---
title: Windows User Guide
hideTitle: true
docId: windows-user-guide
weight: 1
metadata:
  title: Object Mount Windows User Guide
  description:
    A simple one-page user guide for getting started with Object Mount (formerly cunoFS) on Windows.
---

# Object Mount Windows User Guide

This guide walks you through the essential steps to get started with **Object Mount** on Windows — including activation, adding credentials, and mounting object storage as a local drive.

---

## 1. Initial Setup & Licence Activation

The first time you launch Object Mount, you’ll be prompted to enter your **licence key**. This should have been emailed to you at the time of setup.

- Enter the activation key when prompted  
- You can verify your licence at any time via the **About** tab, which shows your current licence details

---

## 2. Importing Cloud Credentials

Object Mount connects to most cloud providers using standard **S3-compatible credentials**.

### Steps:

1. Navigate to the **Credentials** tab  
2. Click the green **Import new credentials** button  
3. In the popup window:
   - Give the credential set a clear, recognisable name
   - Select the appropriate tab for your cloud provider (e.g., AWS, Storj, Backblaze)
   - Fill in your access key, secret, and any required region or endpoint

{% callout type="info" %}
If you're using an S3-compatible provider like Wasabi, choose the **S3-compatible** tab and select the provider from the dropdown. Make sure the endpoint is accessible from your system.
{% /callout %}

Storj users: Use **lexicographically ordered buckets** for best listing performance.

4. Click **Import** to verify the credentials and discover available buckets  
5. Select one or more buckets to begin creating mount configurations

---

## 3. Creating and Managing Mounts

After credentials have been successfully added:

1. Go to the **Mounts** tab  
2. Click **Create new mount**  
3. Choose:
   - The bucket to mount
   - The local drive letter to assign
   - Whether to enable **POSIX mode** (for permission support)
   - Any optional caching or mount parameters

4. Click **Add Mount** to save  
5. Back in the Mounts view, toggle the switch to **enable** the mount  
6. Click the mount name to open it in **File Explorer**

{% callout type="info" %}
On first access, loading may take a moment — especially for large buckets. Subsequent access will be faster thanks to internal caching.
{% /callout %}

---

## 4. Preferences & Advanced Settings

Object Mount includes a flexible **Preferences** panel where you can fine-tune caching, logging, and performance settings across all mounts. These settings are global and apply to every active mount.

### Data Cache

The **data cache** temporarily stores small portions of accessed files on your local disk — useful for repeated or random access operations.

- **Location**: The local path where data cache files are stored  
- **Maximum cache size**: The upper limit (in MB) for total cached data  
- **Note**: This does *not* delay cloud writes — writing to the cloud happens immediately

{% callout type="info"  %}
Use a fast local drive (SSD or NVMe) for best caching performance.
{% /callout %}

{% callout type="info"  %}
If you are on a high-speed, low-latency network connected to your object storage, you may see improved performance by turning caching off.
{% /callout %}

### Metadata Cache

Metadata caching helps Object Mount remember file structure, timestamps, and permissions more efficiently.

- **Location**: The local directory for storing metadata information  
- **Cache timeout (s)**: The duration metadata remains valid before refreshing from the cloud (default: 60 seconds)

### Advanced Settings

These options let you further customise Object Mount's performance and diagnostic behaviour:

| Setting                             | Description |
|-------------------------------------|-------------|
| **S3 Connections Limit**            | Controls the number of concurrent S3 operations (default: 100) |
| **Log Level**                       | Adjusts logging detail. Options: `error`, `warning`, `debug`, or `trace` |
| **Single Threaded Mode**            | Runs the filesystem in single-threaded mode (rarely needed; leave off unless instructed by Support) |
| **Debug Logging**                   | Enables detailed debug output to assist with support issues |
| **Environment Variables**           | Custom variables to modify Object Mount behaviour, adding variables may be recommended by Support |

{% callout type="info"  %}
**Log File Location**  
`C:\Users\%username%\AppData\Local\Object Mount\cunofs.log`
{% /callout %}

Click **Reset** to revert changes to default settings.

---

## More Info

- [Performance Tuning](../faq/tuning/)
- [POSIX mode explained](../faq/posix-mode/)

---
