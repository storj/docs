---
title: macOS User Guide
docId: macos-user-guide
hideTitle: true
weight: 1
metadata:
  title: Object Mount macOS User Guide
  description:
    A simple one-page user guide for getting started with Object Mount on macOS.
---

# Object Mount macOS User Guide

This guide walks you through the core steps to get started with **Object Mount** on macOS — including activation, importing credentials, and mounting your object storage as a local volume.

---

## 1. Initial Setup & Licence Activation

When you first launch Object Mount, you'll be prompted to enter your **licence key**. This should have been provided via email.

- Enter your activation key when prompted  
- To verify your licence period, go to the **About** tab in the top navigation — this displays your current licence status and expiry

---

## 2. Importing Cloud Credentials

Object Mount connects to major cloud storage providers using standard S3-compatible credentials.

### Steps:

1. Go to the **Credentials** tab  
2. Click the green **Import new credentials** button  
3. In the modal:
   - Give the credential set a clear name
   - Choose your provider tab (e.g., AWS, Storj, etc.)
   - Fill in the access key, secret, and (if applicable) region or endpoint

{% callout type="info"  %}
If you're using a different provider, select **S3-compatible**, choose the provider from the dropdown, and ensure the endpoint is accessible. Some providers may require extra compatibility settings like a defined region.
{% /callout %}


For **Storj users**, we recommend using **lexicographically ordered buckets** for the best listing performance.

4. Click **Import**  
   - Object Mount will attempt to discover any buckets your credentials can access
5. Select one or more buckets to create mount configurations

---

## 3. Creating and Managing Mounts

Once your credentials are active and buckets have been detected:

1. Go to the **Mounts** tab  
2. Click **Create new mount**  
3. Configure the mount:
   - Choose bucket and local mount path
   - Decide whether to enable **POSIX mode** (adds permission emulation)
   - Configure caching or advanced options if needed

4. Click **Add Mount** to save it  
5. On the Mounts page, toggle the mount to **activate** it  
6. Click the mount name to open it in **Finder**

{% callout type="info"  %}
First-time access may take a few seconds if the bucket contains many files — performance improves after initial load.
{% /callout %}



---

## 4. Preferences & Advanced Settings

Object Mount includes a flexible **Preferences** panel where you can fine-tune caching, logging, and performance settings across all mounts. These settings are global and apply to every active mount.

---

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

---

### Metadata Cache

Metadata caching helps Object Mount remember file structure, timestamps, and permissions more efficiently.

- **Location**: The local directory for storing metadata information  
- **Cache timeout (s)**: The duration metadata remains valid before refreshing from the cloud (default: 60 seconds)

---

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
-`~/Library/Application Support/Object Mount/cunoFS.log`  
{% /callout %}

Click **Reset** to revert changes to default settings.

---

## More Info

- [Performance Tuning](../faq/tuning/)
- [POSIX mode explained](../faq/posix-mode/)

---
