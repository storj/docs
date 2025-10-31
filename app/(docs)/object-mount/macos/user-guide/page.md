---
title: User Guide
hideTitle: true
docId: QpBba8p4bMTXAkBK
redirects:
   - /object-mount/credentials/macos/import
weight: 2
metadata:
  title: Object Mount macOS User Guide
  description:
    A user guide for getting started with Object Mount on macOS.
hidden: false
---

# User Guide: macOS Native App

This guide walks you through the core steps to get started with **Object Mount** on macOS &mdash; including activation, importing credentials, and mounting your cloud-based object storage as a local volume.


## Step 1. Launch & Activate Object Mount

Once Object Mount and macFUSE are installed on your Mac (see the macOS [](docId:MyV4Bv3fKJEZucAb)), follow the steps below to launch and activate Object Mount:

- Run Object Mount from your **Applications** folder.
- You will be prompted to enter your Object Mount **License Key**.
    - _Contact your [Storj representative](https://www.storj.io/landing/get-in-touch) if you need to obtain an Object Mount License Key._

- Click **Renew License** and paste your Object Mount license key into the text box.
- Click **Activate**

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-license-key-valid.jpg)

- If prompted, click **OK** to allow Object Mount to access files on network volumes.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-permission.jpg)

Once activated, you can view your license key details by clicking the **About** tab in Object Mount.


## Step 2.Configure Object Storage Credentials & Create a Mount

Object Mount can connect to object storage from Storj as well as other major cloud storage providers.

Standard S3-compatible credentials from your cloud storage provider are required.

### Obtain your object storage credentials

See the [](docId:E4NhE5kPdjURRajJ) page in the **Concepts & Technical Details** section.

### Enter your object storage credentials and create a mount

There are two easy paths to create a mount:
- Click **Create New Mount** from the **Mounts** tab
- Click **Add New Credentials** from the **Credentials** tab 

Both paths achieve identical results and both require your object storage credentials and then allow you to select and configure one or more buckets to mount as a local drive.

The steps below follow the **Add New Credentials** path:

1. Select the **Credentials** tab in Object Mount.

2. Click the **Add New Credentials** button.
   - Give the credential set a clear name
   - Choose your provider tab (e.g.: AWS, Storj, etc.).
   - Enter the **Access key ID**, **Secret key**, and **Endpoint** (or Region, if applicable) that you obtained in the section above.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-new-credentials.jpg)

{% callout type="info"  %}
If you’re provider is not listed, select **Other S3** and choose the provider from the dropdown. Ensure the endpoint is accessible. Some providers may require extra compatibility settings like a defined region.
{% /callout %}

**Note:** For **Storj users**, we recommend using _lexicographically ordered buckets_ for the best listing performance.

3. Click **Next**.
   - Object Mount will authenticate to your cloud storage provider and attempt to discover any buckets your credentials can access.

4. Select **Mount all buckets** or choose one or more specific buckets to create a mount drive for.

5. Enter a **Mount name** and, if necessary, alter the path location for the local mount drive.

6. Tick the **Mount as read-only** box if all you need is to browse and copy content. Uncheck the box to enable **full read/write access**.

7. Tick the box to **Enable POSIX metadata** (recommended).
   - For more details, see the [POSIX Explained](docId:ySneAEd79CVewSSr) page in the **Concepts & Technical Details** section.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-configure-your-mount.jpg)

8. Click **Next** to create the mount. Then enable the mount.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-enable-your-mount.jpg)

{% callout type="info" %}
Depending on your Mac hardware and OS version, an **Extension blocked** message may be presented when Object Mount attempts to mount your new drive.

If so, perform the following steps:
- Open **System Settings**
- Navigate to **Privacy & Security**
- Scroll down to the **Security** section
- Click **Allow** to permit the macFUSE extension (from developer "Benjamin Fleischer") to be loaded

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-allow-macfuse.jpg)

{% /callout %}



***QUESTION: WHEN IN THE FLOW IS THE BELOW COMMENT TARGETED AT?***
**- When Object Mount uses new credentials to scan for buckets?**
**- When Object Mount "activates/enables" the mount for the first time?**


{% callout type="info"  %}
First-time access to a new mount may take a few moments if the bucket contains many files — performance improves after initial load.
{% /callout %}




Your newly mounted drive will appear on your Mac using a **FUSE** drive icon:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-fuse-drive-icon.jpg)

If there are multiple buckets accessible using the same credential set, those buckets will each appear as separate **Folders** within the single mounted drive icon:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-multiple-buckets.jpg)


## Preferences & Advanced Settings

Object Mount includes a flexible **Settings** panel where you can fine-tune caching, logging, and performance settings across all mounts. 

{% callout type="info" %}
- These settings are global and apply to every mount.
- These settings cannot be edited while any mount is active. You must disable all mounts before making changes.
{% /callout %}


Refer to the following sections for details on each setting.

### Data cache

The local **data cache** temporarily stores small portions of accessed files on your local disk &mdash; useful for repeated or random access operations.

- **Location:** The local path where data cache files are stored  
- **Maximum cache size:** The upper limit (in MB) for total cached data  
  - **Note:** This does *not* delay cloud writes — writing to the cloud happens immediately

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-settings-01.jpg)

{% callout type="info"  %}
Data Cache Recommendations:
- Use a fast local drive (SSD or NVMe) for best caching performance.
- If you are on a high-speed, low-latency network connected to your object storage, you may see improved performance by turning caching _off_.
{% /callout %}

### Metadata cache settings

Metadata caching helps Object Mount remember file structure, timestamps, and permissions more efficiently.

- **Location:** The local directory for storing metadata information  
- **Cache timeout:** The duration, in seconds, that metadata remains valid before being refreshing from the cloud (default: 60 seconds)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-settings-02.jpg)

### Advanced settings

These options let you further customize Object Mount’s performance and diagnostic behavior.

| **Setting**               | **Description** |
|---------------------------|-----------------|
| **S3 connections limit**  | Controls the number of concurrent S3 operations (default: 100) |
| **Log level**             | Adjusts logging detail. Options: `error`, `warning`, `debug`, or `trace` |
| **Single threaded mode**  | Runs the filesystem in single-threaded mode (rarely needed; leave `off` unless instructed by Storj Support) |
| **Debug logging**         | Enables extensive debug output to assist with support issues |
| **Custom Environment Variables** | Custom variables to modify Object Mount’s behavior, add variables when recommended by Storj Support |




***QUESTION: DO WE HAVE INFO ON WHAT COLD CACHE ON/OFF DOES??***




![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-settings-03.jpg)

{% callout type="info"  %}
**Log File Location**  
-`~/Library/Application Support/Object Mount/cunoFS.log`  
{% /callout %}

Click **Reset** to revert all settings back to their default values.


## Updating macFUSE

You can update and/or uninstall macFUSE within the Mac’s System Preference.

For **older macOS versions** (Monterey and prior) you will find the macFUSE extension at the bottom of the **System Preferences** window:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-macfuse-preferences-01.jpg)

Click the macFUSE icon to see options to update and/or uninstall macFUSE:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-macfuse-preferences-02.jpg)

For **newer macOS versions**, you will find the macFUSE kernel extension listed at the very bottom within **System Settings**:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-update-macfuse-m-chip.jpg)
