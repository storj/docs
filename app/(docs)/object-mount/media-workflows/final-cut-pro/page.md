---
title: Object Mount with Final Cut Pro
hideTitle: true
docId: EwuncnHAbXKa7q8h
metadata:
  title: Object Mount with Final Cut Pro
  description:
    Recommended workflow and tips for using Object Mount with Final Cut Pro on macOS.
---

# Using Object Mount with Final Cut Pro

This guide outlines how to use **Object Mount** with **Final Cut Pro (FCP)** on macOS. While FCP doesn’t offer the same granular media storage configuration as other NLE software, Object Mount integrates cleanly into your workflow with a few key recommendations.

---

## Best Practices for Cloud-Mounted Media

Final Cut Pro expects media to be available on fast, local volumes. When using cloud-mounted storage (like Object Mount), you should consider:

1. **Always import media “without copying”** into the library  
   - When prompted during import, select:  
     **Leave files in place** (not “Copy to library”)  
   - This ensures media is read directly from your Object Mount volume without unnecessary duplication

2. **Store Libraries locally**  
   - Final Cut Pro libraries perform best when saved to a high-speed local disk  
   - We recommend saving your `.fcpbundle` file outside the Object Mount volume

3. **Use Proxy or Optimized Media for playback**  
   - FCP supports background generation of proxy media and optimised formats  
   - Go to **Preferences > Playback**, and set:  
     - **Playback Media** → **Use Proxy Media (if available)**  
     - Generate proxies for high-res footage when working remotely

---

## Importing from Object Mount

1. Mount your cloud bucket using Object Mount  
2. Open Final Cut Pro and create or open a library (stored locally)  
3. In the **Import Media** window, navigate to your Object Mount volume  
4. Select the footage you want, and ensure:
   - **Leave files in place** is checked  
   - (Optional) Enable **Create proxy media** on import for large or high-bitrate files

{% callout type="note" %}
Object Mount behaves like a local drive in Finder, so you can browse and import as usual — but behind the scenes, data is streamed directly from the cloud.
{% /callout %}

---

## Recommended System Preferences

- Object Mount’s **data cache** should be enabled (default)
- Place metadata and data caches on fast local storage (e.g. internal SSD)
- For large projects or remote assets, enable `CUNO_OPTIONS = -filePrefetch` via the Preferences tab to accelerate first access

---

## Performance Tips

- Avoid saving cache or render files inside the Object Mount volume — use local scratch disks  
- Enable Final Cut’s **background rendering** for smoother editing  
- Monitor network activity via **Activity Monitor > Network tab** to confirm streaming performance

---

## Known Nuances

- Final Cut Pro doesn’t show granular file I/O errors in the interface — if playback stalls or clips don't link, double-check:
  - Network status
  - Object Mount activity (log file or mount state)
  - File permissions if POSIX mode is enabled
- Finder may take longer to open cloud-mounted folders with thousands of files. Consider using subfolders or proxy workflows for better navigation.

---

## Summary

Using Object Mount with Final Cut Pro is straightforward when media is imported correctly and libraries are kept local. Proxy workflows and caching can significantly improve responsiveness, especially when working with large projects or slower connections.

If you're unsure whether a workflow is well suited to cloud-mounted editing, feel free to [reach out to support](https://supportdcs.storj.io/hc/en-us/requests/new).

