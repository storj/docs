---
title: Object Mount with Avid Media Composer
hideTitle: true
metadata:
  title: Object Mount with Avid Media Composer
  description:
    Recommended workflow and setup tips for using Object Mount with Avid Media Composer on macOS and Windows.
---

# Using Object Mount with Avid Media Composer

This guide walks through how to use **Object Mount** with **Avid Media Composer**, including key setup considerations and workflow tips to ensure smooth media management when working with cloud-mounted storage.

---

## Recommended Setup

Avid Media Composer expects all media to reside on high-performance, locally mounted storage paths. Object Mount allows you to treat object storage as a native volume, but there are a few important things to keep in mind:

1. **Mount to a simple, short file path**  
   - Avid prefers media directories without long paths or special characters  
   - Example: `D:\Avid_Mount` or `/Volumes/AvidMedia`

2. **Do not place Avid project or bin files in the mounted volume**  
   - Save your `.avb`, `.avp`, and `.avf` files to a local disk  
   - Use Object Mount for read access to media assets (e.g., linked clips, raw footage)

3. **Use AMA (Link to Media) instead of Import**  
   - Go to **File > Input > Link to Media**  
   - Browse to your Object Mount volume and select your media  
   - Do *not* use **Import**, as this attempts to copy files locally and may introduce delays or unexpected results

---

## Media and Performance Tips

To ensure a smooth editing experience:

- Enable **Object Mount caching** in the Preferences tab  
- Store **data and metadata cache** on a fast internal SSD  
- If you’re working with large high-resolution files (4K, RAW), enable the following:

  - Set `CUNO_OPTIONS = -filePrefetch` as a custom environment variable  
  - Increase **S3 connection pool size** in Advanced Settings (e.g., 150–200)  
  - Use Avid’s **Background Bin Saving** to reduce interruptions

- **Avoid background virus scanning** or indexing on the mounted path (especially on Windows)

---

## Proxy & Optimized Workflows

Avid’s DNxHR and DNxHD proxy workflows are recommended when editing from cloud storage:

- Transcode linked media to proxy formats into **local drives**  
- Use **Relink** or **Consolidate** when you're ready to finalise offline-to-online workflows  
- Use **Media Tool** to manage and track linked vs transcoded files

---

## Monitoring Performance

Transfers via Object Mount may not show progress in Avid’s interface, so we suggest:

- On **macOS**: Open **Activity Monitor > Network**  
- On **Windows**: Use **Task Manager > Performance > Network**  
- For detailed diagnostics, set the Object Mount log level to `debug` or `trace` in Preferences

{% callout type="info" %}
If Object Mount appears slow when linking large files, it's often due to first-time access from cloud storage. This improves after initial reads thanks to caching and file prefetch.
{% /callout %}

---

## Known Considerations

- Avid doesn’t natively understand cloud latency — playback may stutter if accessing untranscoded high-resolution files over slower connections  
- Ensure the mount path is stable and doesn’t unmount or disconnect mid-session  
- POSIX mode can help with permission-sensitive environments, but is not required for typical read workflows

---

## Summary

Avid Media Composer can work effectively with Object Mount when media is linked (not imported) and cache settings are optimised. Local project files, proxy workflows, and sensible mount paths all contribute to a faster, more reliable experience.

For help tuning your Avid workflow with Object Mount, [contact our support team](https://supportdcs.storj.io/hc/en-us/requests/new) — we’re happy to assist.

