---
title: Fast Copy and Move on macOS
docId: fast-copy-paste
hideTitle: true
weight: 7
metadata:
  title: Fast Copy and Move on macOS
  description:
    A semi-technical explanation of how Object Mount’s Fast Copy and Move Finder integration works on macOS.
---

# Fast Copy and Move on macOS

As of Object Mount **v1.0.4-beta**, macOS now supports **Fast Copy** and **Fast Move** options directly from Finder. This provides a much faster way to send files to your mounted S3 or Storj storage which ideal for working with large media assets or entire folders.

You'll see new right-click options called:

- **Fast Copy To Object Mount**
- **Fast Move To Object Mount**

These options appear in Finder when you right-click a file or folder.

---

## How to Enable Fast Copy / Move

Fast Copy and Fast Move are powered by a Finder Extension and must be enabled manually the first time.

### Steps:

1. Open **System Settings**  
2. Navigate to **General → Login Items**  
3. Scroll to the bottom to find **Extensions**  
4. Click **File Provider Extensions**  
5. Enable the checkbox for **Object Mount**

Once enabled, you’ll see the new right-click options in Finder.

{% callout type="info" %}
You may need to right-click again or relaunch Finder (`Cmd + Option + Esc`) to see the new menu items.
{% /callout %}

---

## When to Use Fast Copy or Move

These options are ideal when:

- Moving footage, projects, or renders from a local disk into the cloud  
- Copying large files or folders from one Object Mount volume to another  
- Working with high-latency networks or remote S3 endpoints  
- Avoiding bottlenecks from Finder’s standard file operations

---

## Why It’s Faster

Standard Finder copy/move uses macOS file APIs that copy data one block at a time, without any awareness of how cloud storage works. This can lead to slower performance, especially for large files or nested folder structures.

Fast Copy and Fast Move bypass these routines and instead:

- Use Object Mount’s **optimised S3 transfer logic**  
- Support **multipart, parallel uploads**  
- Automatically manage metadata and cloud layout  
- Integrate directly with your mount’s caching settings

---

## Behind the Scenes

Fast Copy / Move:

- Leverages the Finder Extension and Object Mount’s core engine  
- Uses **direct S3 transfer** logic, not shell scripting or AppleScript  
- Respects your mount settings (e.g. POSIX mode, cache location)  
- Logs operations in your standard Object Mount log file

---

## Best Practices

- Store original media locally, then **Fast Move** it to cloud when ready  
- For large archive folders, use **Fast Copy** to quickly duplicate into your S3 bucket  
- Use Fast Move to clear local storage while archiving to the cloud in one step

{% callout type="info" %}
Unlike drag-and-drop or standard Copy + Paste, **Fast Copy / Move** ensures optimal use of bandwidth and avoids unnecessary local I/O.
{% /callout %}

{% callout type="info"  %}
**Log File Location**  
-`~/Library/Application Support/Object Mount/cunoFS.log`  
{% /callout %}

---

## Related Settings

For further tuning, see:  
- [Performance Tuning](../faq/tuning/)

---

Need help getting Fast Copy or Move working? [Contact support](https://supportdcs.storj.io/hc/en-us/requests/new) — we’re happy to help.

---
