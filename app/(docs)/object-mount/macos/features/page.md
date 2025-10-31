---
title: Feature Guide
hideTitle: true
docId: ehHbpq6KFndcVCgc
weight: 3
metadata:
  title: Feature Guide for macOS
  description:
    Details on unique features of the macOS native app.
hidden: false
---

# Feature Guide: macOS Native App

This page will provide details on unique and noteworthy features that are specific to the Object Mount **macOS Native App**.

Features that are global and apply to **all OS versions** of Object Mount (macOS, Windows, Linux) can be found in the [Global Features](#global-features) section below.


## Fast Copy & Fast Move on macOS

Starting with **Object Mount v1.0.4** Object Mount for macOS now supports **Fast Copy** and **Fast Move** options directly from the Mac Finder. 

**Note:** macOS 13 Ventura (or later) is required to use Fast Copy and Fast Move.

**Fast Copy** and **Fast Move** provide a much faster way to upload files to your object storage &mdash; ideal when working with large media assets or entire folder trees of content.

Once enabled, two new context-sensitive menu options will be displayed when you right-click on a file or folder in the Mac’s Finder:

- **Object Mount ➜ Fast Copy To...**
- **Object Mount ➜ Fast Move To...**

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-fast-copy.jpg)

### Enabling Fast Copy & Fast Move

Fast Copy and Fast Move are enabled through a Finder Extension that must be enabled.

Follow these steps to enable Fast Copy & Fast Move in **two** places within the Mac’s System Settings:

1. Open **System Settings**.

2. Navigate to **General → Login Items & Extensions**.

3. Scroll down until you see the **Extensions** section.

4. Click the **INFO CIRCLE** next to **File Providers**.
- Activate the slider for **Object Mount** and click **Done**.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-fast-copy-enable.jpg)

5. Click the **INFO CIRCLE** next to **File System Extensions**.
- Activate the slider for **macFuse** and click **Done**.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-enable-macfuse-sys-ext.jpg)

Once enabled, you will now see the new right-click options in the Finder.

{% callout type="info" %}
You may need to right-click more than once to activate the extension for the first time. If necessary, relaunch Finder (`Cmd + Option + Esc`) to see the new menu items.
{% /callout %}

### When to use Fast Copy or Fast Move

Using Fast Copy or Fast Move is ideal when you want to:

- Move large files or large folder trees (media footage, projects, renders, etc.) from a local disk to a mounted S3 bucket or Storj bucket
- Copy large files or folders from one Object Mount volume to another
- Improve performance on high-latency networks or slow remote S3 endpoints
- Avoid the bottlenecks of Finder’s standard file operations

### How Fast Copy and Fast Move work

Standard **copy & move** actions performed by the Finder use macOS file I/O calls. These standard file calls copy data **one block** at a time, without any awareness of how cloud storage works. This can lead to slow performance, especially for large files or nested folder structures.

**Fast Copy and Fast Move** bypass these standard read/write calls and instead:

- Use Object Mount’s **optimized S3 transfer logic**  
- Support **multipart and parallel uploads**  
- Automatically manage metadata and cloud layout  
- Integrate directly with your mount’s caching settings

Behind the scenes, Fast Copy and Fast Move:

- Leverage both the Finder Extension and Object Mount’s core engine
- Uses **direct S3 transfer** logic, not shell scripting or AppleScript
- Respects your mount settings (e.g.: POSIX mode, cache location)
- Logs operations to the standard Object Mount log file

### Best practices for Fast Copy or Fast Move

- Store original media locally, then **Fast Move** it to cloud when ready
- For large archive folders, use **Fast Copy** to quickly duplicate into your S3 bucket
- Use Fast Move to clear local storage while archiving to the cloud &mdash; in one step


## Global Features





**STILL NEED TO REVIEW THESE LINKS**




See the following pages for additional details on features that apply to Object Mount on all operating systems (macOS, Windows & Linux):

- [Performance Tuning](../faq/tuning/)
- [POSIX mode explained](../faq/POSIX-mode/)
