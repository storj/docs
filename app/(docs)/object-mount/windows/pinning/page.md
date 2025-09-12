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

As of **Object Mount v1.0.5**, you can **pin files** on Windows to ensure they remain in your local cache.

This is especially useful for:

- Preventing delays when reopening large media assets  
- Ensuring critical project files stay cached locally

---

## What Does Pinning Do?

When you **pin a file**, Object Mount:

- Downloads and stores the file in the local data cache  
- Prevents it from being evicted due to cache size limits  
- Flags it for persistent caching even across restarts

{% callout type="info" %}
Pinning does *not* duplicate or move the file elsewhere. It simply marks the file as persistent in cache.
{% /callout %}

{% callout type="warning"  %}
**Important:** Pinned files **do not remain accessible** when Object Mount is offline or disconnected. A live connection is still required for access, even if the file is cached.
{% /callout %}

---

## How to Pin a File

1. Right-click any file inside an **Object Mount volume**  
2. Select **"Pin to Object Mount"** from the context menu  
3. A small icon overlay in File Explorer will indicate the file is pinned (✓)

To **unpin**, right-click the file again and choose **"Unpin from Object Mount"**.

> You can currently pin individual files, not entire folders.

---

## How to Tell if a File Is Pinned

Pinned files can be identified by:

- A visual overlay icon in **File Explorer**  
- Their status in the **Object Mount logs** and future GUI updates

---

## Managing Cache Space

- **Pinned files do *not* count toward the cache size limit** set in Preferences  
- However, pinning requires the **Data Cache** to be enabled  
- If you **clear the Data Cache**, all pinned files will be removed from disk and lose their pinned status

To retain pinned files:

- Keep the **Data Cache** enabled under  
  **Preferences → Data Cache**

---

## Best Use Cases

- Keeping critical assets readily available without re-download  
- Avoiding cache eviction for large files you frequently revisit  
- Preloading media for use in bandwidth-limited environments (while online)

---

## Related Settings

See also:

- [Performance Tuning](../faq/tuning/)
