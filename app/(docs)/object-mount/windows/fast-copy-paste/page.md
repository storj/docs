---
title: Fast Paste on Windows
docId: fast-copy-paste
hideTitle: true
weight: 7
metadata:
  title: Fast Paste on Windows
  description:
    A semi-technical explanation of how Object Mount’s “Fast Paste” feature works and why it’s faster than standard Windows file operations.
---

# Fast Copy + Paste on Windows

**Fast Copy + Paste** is feature in Object Mount that significantly improves file copy performance when pasting data into an Object Mount mounted drive.  This page walks through how to leverage this feature on Windows.

Once you have copied a file, you’ll see this option when you right-click on a folder within an Object Mount volume, look for the menu item **Fast Paste here** with a white and blue cloud icon.

{% callout type="info" %}
You may need to press **Show more options** on the right-click menu to see this option!
{% /callout %}

---

## How It Works

When you use standard Windows copy/paste (Ctrl+C then Ctrl+V, or right-click Copy + right-click Paste), Windows uses its own built-in file I/O logic.  It handles cloud storage just like any other drive, moving files one block at a time, often with less awareness of cloud-specific behaviour like multipart uploads, data layout, or server-side copy capabilities.

**Fast Paste**, by contrast, uses a custom, optimised transfer path built into Object Mount. It directly:

- Reads the files from the Windows clipboard using native Windows APIs  
- Bypasses generic shell copy routines  
- Streams files into the mount using **multipart-aware**, **concurrent** upload operations tuned for S3-compatible storage

---

## Why It’s Faster

| Feature                     | Standard Paste         | Fast Paste in Object Mount        |
|-----------------------------|------------------------|----------------------------------|
| Uses Windows shell I/O      | ✅ Yes                 | ❌ No                             |
| Streams via S3 multipart    | ❌ No                 | ✅ Yes                            |
| Uploads in parallel         | ❌ Single-threaded     | ✅ Parallel with tuning options   |
| Respects Object Mount cache  | ❌ Not aware           | ✅ Integrated                     |
| POSIX metadata support      | ❌ No                 | ✅ Optional                       |

---

## When to Use It

Fast Paste is ideal when:

- Copying large files (e.g. media assets, backups)  
- Copying folder(s) with lots of files
- Copying content already inside a Object Mount directory
- Pasting **from** or **into** a mounted S3 bucket or Storj bucket 
- Using slow or high-latency networks where traditional paste stalls  

{% callout type="info" %}
If you’ve copied files locally and are pasting them into an Object Mount drive, **Fast Paste** ensures they reach the cloud using the most efficient method available.
{% /callout %}

{% callout type="info" %}
If you want to copy a whole file from your Object Mount drive, **Fast Paste** ensures they pull from the cloud using the most efficient method available.
{% /callout %}

---

## Behind the Scenes

Fast Paste integrates tightly with:

- Object Mount’s data cache (if enabled)  
- Multipart thresholds defined by the mount configuration  
- Active logging (you’ll see Fast Paste operations noted in **log files**)

It avoids unnecessary disk I/O and background indexing that can affect standard clipboard operations on cloud-mapped drives.

---

## Related Settings

To further tune Fast Paste performance, adjust:

- [Performance Tuning](../faq/tuning/)

---
