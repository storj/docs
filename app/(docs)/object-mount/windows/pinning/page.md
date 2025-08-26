---
title: Pinning on Windows
docId: pinning-windows
hideTitle: true
weight: 8
metadata:
  title: Pinning on Windows
  description:
    Explains how to use the file pinning feature in Object Mount for Windows to keep files cached and accessible offline.
---

# Pinning on Windows

As of **Object Mount v1.0.5**, you can now **pin files** on Windows to ensure they remain in your local cache even when offline or disconnected from cloud storage.

This is especially useful for:

- Preventing delays when reopening large media assets  
- Ensuring critical project files stay locally accessible  

---

## What Does Pinning Do?

When you **pin a file**, Object Mount:

- Downloads and stores the file in the local data cache  
- Prevents the file from being evicted due to cache size limits  
- Keeps the file available even when Object Mount is offline or disconnected from the cloud

{% callout type="info" %}
Pinning does *not* copy the file elsewhere. It simply ensures it's cached locally and won't be removed.
{% /callout %}

---

## How to Pin a File

1. Right-click any file inside an **Object Mount volume**  
2. Click **"Pin to Object Mount"** in the context menu  
   - You'll see the familiar white-and-blue cloud icon

To **unpin**, right-click the file again and select **"Unpin from Object Mount"**.

> You can pin individual files, but not entire folders (yet).

---

## 🔍 How to Tell if a File Is Pinned

Pinned files will:

- Remain accessible even when your network is disconnected  
- Be noted in log files when cache is managed  
- (Coming soon: visual indicators in File Explorer and gui)

---

## Managing Cache Space

Pinned files count toward your local **data cache size** (set in Preferences). If the cache is full:

- Non-pinned files may still be evicted  
- Pinned files are protected and persist

If you need to ensure space for pinning:

- Increase the **Maximum Cache Size** under  
  **Preferences → Data Cache**

---

## Best Use Cases

- Keeping frequently accessed reference files available offline  
- Working on shared cloud assets in bandwidth-constrained environments

---

## Related Settings

To further tune performance, see:

- [Performance Tuning](../faq/tuning/)

---
