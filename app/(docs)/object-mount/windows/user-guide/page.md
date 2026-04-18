---
title: User Guide
hideTitle: true
docId: khHGfZsyY9NJ2uGK
redirects:
   - /object-mount/credentials/windows/import
weight: 2
metadata:
  title: Object Mount User Guide for Windows
  description:
    A user guide for getting started with Object Mount on Windows.
hidden: false
---

# User Guide: Windows Native App

This guide walks you through the core steps to get started with **Object Mount** on Windows, including: activation, adding credentials, and mounting your cloud-based object storage as a local drive.


## Step 1. Launch & Activate Object Mount

- Run Object Mount from the Start Menu or Desktop shortcut.

- You will be prompted to enter your Object Mount **License Key**.
  - Contact your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch) if you need to obtain an Object Mount License Key.

- Click **Install New License** and paste your Object Mount license key into the text box.

- Click **Activate**.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-license-key-valid.jpg)

- If prompted, click **Allow Access** to permit firewall changes.

Once activated, you can view your license key details in the **About** tab within Object Mount.


## Step 2. Configure S3 Credentials & Create a Mount

Object Mount can connect to object storage from Storj as well as other major cloud storage providers. Standard S3-compatible credentials from your cloud storage provider are required.

### Obtain your Object Storage Credentials

- See the Appendix article [](docId:E4NhE5kPdjURRajJ#obtaining-your-s3-credentials) for instructions.

### Enter Your Credentials and Create a Mount

There are two easy paths to create a mount &mdash; both paths achieve identical results and both require your object storage credentials:

- Click **Create New Mount** from the **Mounts** tab, or
- Click **Add New Credentials** from the **Credentials** tab 
- Then select and configure one or more buckets to mount as a local drive

Follow the steps below to create a new mount using  the **Add New Credentials** path:

1. Select the **Credentials** tab in Object Mount.

2. Click the **Add New Credentials** button.
    - Give the credential set a clear name
    - Choose your provider tab (e.g.: Storj, AWS, etc.).
    - Enter the **Access key ID**, **Secret key**, and **Endpoint** (or Region, if applicable) that you obtained earlier.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-new-credentials.jpg)

    {% callout type="info" %}
      **S3 Compatible Providers**

      If your provider is not listed, select **Other S3** and choose the provider from the dropdown. 
      
      - Ensure the endpoint is accessible from the Internet. 
      - Some providers may require extra compatibility settings like a defined region.

      Below is an example of providing an additional S3 Compatibility Setting for region:

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-custom-s3-region.png)
    {% /callout %}

3. Click **Next**.
    - Object Mount will authenticate to your cloud storage provider and attempt to discover any buckets your credentials have access to.

4. Select **Mount all buckets** or choose one or more specific buckets to create a mounted drive for. Click **Next**.

5. Enter a **Display name** for your mount.
    - Make note of the drive letter that Windows initially assigns to the new mount.
    - If this drive letter is in use when you enable your mount, you will be prompted to select a new drive letter (see step 8, below).
    - **Note:** You can also set a **Preferred drive letter** to use under the **Settings** tab.

6. Tick the **Mount as read-only** box if all you need is to browse and copy content. 
    - Uncheck the box to enable **full read/write access**.

7. Tick the box to **Enable POSIX metadata** (recommended).
    - For more details, see the Appendix article: [POSIX Explained](docId:ySneAEd79CVewSSr).

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-configure-your-mount.jpg)

8. Click **Next** to create the mount. Then enable the mount from the **Mounts** tab.

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-enable-your-mount.jpg)

    - If the drive letter assigned by Windows is already in use, you will be prompted to select a new drive letter:

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-drive-assignment.jpg)

**Note:** First-time access to a new mount may take a few moments if the bucket contains many files &mdash; performance improves after the initial mount.


## Newly Mounted Drive & Buckets

Your newly mounted drive will appear on your PC using the assigned drive letter:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-new-drive-01.jpg)

If there are multiple buckets accessible using the same credential set, those buckets will each appear as separate **folders** within the single mounted drive letter:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-new-drive-02.jpg)


## Preferences & Advanced Settings

Object Mount includes a flexible **Settings** panel where you can fine-tune caching, logging, and performance settings across all mounts. 

{% callout type="info" %}
  **Settings**

  - These settings are global and apply to all mounts.
  - These settings cannot be edited while a mount is active. Disable all mounts before making changes.
{% /callout %}

Refer to the following sections for details on each setting:

### General

Select a **Preferred drive letter** for Object Mount to use.

- **Note:** Object Mount only allows for a single mount to be active at any time. This preferred drive letter will be used for that one, active mount.

### Data Cache

The local **Data Cache** temporarily stores small portions of accessed cloud files on your local disk &mdash; useful for repeated or random access operations.

- **Location:** The local path where data cache files are stored  
- **Maximum cache size:** The upper limit (in MB) for total cached data  
  - **Note:** This feature does *not* delay cloud writes &mdash; writing to the cloud happens immediately.

  ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-settings-01.jpg)

{% callout type="info" %}
  **Data Cache Recommendations**

  - Use a fast local drive (SSD or NVMe) for best caching performance.
  - If the connection to your object storage is on a high-speed, low-latency network, you may see improved performance by turning caching _off_.
{% /callout %}

### Metadata Cache Settings

Metadata caching helps Object Mount load and retain file structure, timestamps, and permissions more efficiently.

- **Location:** The local directory for storing metadata information  
- **Cache timeout:** The duration, in seconds, that metadata remains valid before being refreshing from the cloud (default: 60 seconds)

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-settings-02.jpg)

### Advanced Settings

These options let you further customize Object Mount’s performance and diagnostic behavior.

| **Setting**              | **Description** |
|--------------------------|-----------------|
| **S3 connections limit** | Controls the number of concurrent S3 operations (default: 100).
| **Log level**            | Adjusts logging detail. Options: `error`, `warning`, `debug`, or `trace`.
| **Single threaded mode** | Runs the filesystem in single-threaded mode (rarely needed; leave `off` unless instructed by Storj Support).
| **Debug logging**        | Enables extensive debug output to assist with support issues.
| **Custom Environment Variables** | Custom variables to modify Object Mount’s behavior, add variables when recommended by Storj Support

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-settings-03.jpg)

{% callout type="info" %}
  **Log File Location**

  On Windows the default location for storing the log file is:
  
  `C:\Users\%username%\AppData\Local\Object Mount\cunofs.log`.
{% /callout %}

Click **Apply** to save any changes. Then re-enable your mount.

Click **Reset** to revert all settings back to their default values.
