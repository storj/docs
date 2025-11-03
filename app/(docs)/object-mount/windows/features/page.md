---
title: Feature Guide
hideTitle: true
docId: xMKcaWrTVK6QMD8h
redirects:
  - /object-mount/windows/pinning
weight: 3
metadata:
  title: Feature Guide for Windows
  description:
    Details on unique features of the Windows native app.
hidden: false
---

# Feature Guide: Windows Native App

This page provides details on unique and noteworthy features that are specific to the Object Mount **Windows Native App**.

Features that are global and apply to **all OS versions** of Object Mount (macOS, Windows, Linux) can be found in the [Global Features](#global-features) section below.


## Fast Paste on Windows

**Fast Paste** provide a much faster way to upload files to your object storage &mdash; ideal when working with large media assets or entire folder trees of content.

To use **Fast Paste**:

1. Copy a file or folder from your local drive as normal: using CTRL+C (or right-click + Copy)

2. Navigate to an Object Mount drive and directory

3. Right click and choose the **Fast Paste here** menu option (shown with a white and blue Object Mount icon)

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-fast-paste.jpg)

### When to Use Fast Paste

Using Fast Paste is ideal when you want to:

- Move large files or large folder trees (media footage, projects, renders, etc.) from a local disk to a mounted S3 bucket or Storj bucket
- Copy large files or folders from one Object Mount volume to another Object Mount volume
- Improve performance on high-latency networks (or slow remote S3 endpoints)
- Avoid the bottlenecks of Windows’ standard file operations

### How Fast Paste Works

Standard **copy & paste** actions performed by Windows (Ctrl+C then Ctrl+V, or right-click + Copy then right-click + Paste) invokes Windows’ built-in file I/O calls. These standard file operations copy data **one block** at a time, without any awareness of how cloud storage works. This can lead to slow performance &mdash; especially for large files or nested folder structures.

**Fast Paste** bypasses these standard read/write calls and instead:

- Reads the files from the Windows clipboard using native Windows I/O calls
- Streams files up to the mount using **multipart-aware** and **concurrent** upload operations tuned for S3-compatible storage

A live **progress indicator** will be displayed when you use Fast Paste:

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-fast-paste-progress.jpg)

Additionally, **Fast Paste**:

- Respects your mount settings (e.g.: POSIX mode, cache location)
- Applies performance and tuning options (cache settings & location, multipart thresholds, etc.)
- Logs operations to the standard Object Mount log file

### Best Practices for using Fast Paste

- Store original media locally, then copy and **Fast Paste** it to cloud when ready
- For large archive folders, use copy then **Fast Paste** to quickly duplicate them into your S3 bucket.


## Pinning on Windows

Starting with **Object Mount v1.0.5**, you can now **pin files** in Windows to ensure they remain in the **local Object Mount cache**.

This improves performance and is especially useful for:
- Preventing delays when re-opening large media assets
- Ensuring critical project files stay cached locally

### What does Pinning do?

When you **pin a file**, Object Mount:
  - Downloads and stores the file in Object Mount’s local data cache
  - Prevents the file from being _evicted_ due to cache size limitation settings
  - Flags the file for _persistent caching_ even across restarts

{% callout type="info" %}
**Note:** Pinning does *not* duplicate or move the file elsewhere. It simply marks the file as _persistent_ in the Object Mount local cache.

**Important:** Pinned files _do not remain accessible_ when Object Mount is off-line or when your mount is disabled or disconnected. An active, live connection is still required for access, even if the file is pinned.
{% /callout %}

### Pinning files

To Pin a file:

1. Right-click any file _stored within_ an **Object Mount volume**

2. Select the **Pin selected item** menu option (shown with a white and blue Object Mount icon)

3. A small icon overlay in File Explorer will indicate the file is pinned (✓)

To Unpin a file:

1. Right-click the file and choose **Unpin selected item**

**Note:** You can currently only pin individual files, not entire folders.

Pinned files can be identified by:
  - A visual "green dot" overlay indicator when view in **File Explorer**
  - Their status in the **Object Mount logs**

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-pinned-file-marker.jpg)

    **Note:** A restart may be necessary before you will see the "pinned FIle" indicator.

### Pinned Files & Cache Space

- Pinned files do _not_ count toward the maximum data cache size set in the Settings tab of Object Mount.
- However, pinning requires that the **Data cache** be enabled.
  - If the Data cache is disabled, the pinning menu items will no longer be displayed.
  - When the Data cache is re-enabled, any previously pinned files will retain their pinned status.

  {% callout type="warning" %}
  If you click **Clear Caches** in the Settings tab of Object Mount, all pinned files will be removed from the cache and will revert to an "unpinned" status.
  {% /callout %}

### Best Practices for Using Pinning

Use Pinning to:
  - Keep critical assets readily available without re-downloading
  - Avoid cache eviction for large files you frequently revisit
  - Preload media for use in slow-bandwidth environments


## Global Features

<!--
**STILL NEED TO REVIEW THESE LINKS**
-->

See the following pages for additional details on features that apply to Object Mount on all operating systems (macOS, Windows & Linux):

- [Performance Tuning](../faq/tuning/)
- [POSIX mode explained](../faq/POSIX-mode/)
