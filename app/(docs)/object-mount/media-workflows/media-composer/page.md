---
title: Object Mount with Avid Media Composer
hideTitle: true
docId: eSTEd9V5JbexxYDQ
weight: 2
metadata:
  title: Object Mount with Avid Media Composer
  description:
    Recommended workflow and setup tips for using Object Mount with Avid Media Composer on macOS and Windows.
hidden: false
---

# Using Object Mount with Avid Media Composer

This guide walks you through how to use **Object Mount** with **Avid Media Composer**, including key setup considerations and workflow tips to ensure smooth media management when working with cloud-mounted storage.


## Recommended Setup

Avid Media Composer expects all media to reside on high-performance, locally-mounted storage paths.

Object Mount allows you to treat object storage as a native volume, but there are a few important things to keep in mind:

1. **Mount to a simple, short file path**
   - Avid prefers media directories without long paths or special characters.
   - Example: `D:\Avid_Mount` or `/Volumes/AvidMedia`.

2. **Ensure visibility using the `alldrive` Console command**
   - From within Avid Media Composer, open the Console from the Tools menu (CTRL+6 / CMD+6).
   - Type `AllDrives` and press Enter. This makes all mounted volumes visible to Avid.

3. **Save Avid project and bin files locally**
   - Save your `.avb`, `.avp`, and `.avf` files to a local volume.
   - Use Object Mount for read access to media assets (e.g., linked clips, raw footage).


## Media and Performance Tips

To ensure a smooth editing experience:

  - Enable **Object Mount caching** in the Preferences tab.
  - Store **data and metadata cache** on a fast, local volume.
  - If you’re working with large, high-resolution files (4K, RAW), enable the following:
    - Set `CUNO_OPTIONS = -filePrefetch` as a custom environment variable.
    - Increase **S3 connection pool size** in Advanced Settings (e.g., 150-200).
    - Use Avid’s **Background Bin Saving** to reduce interruptions.
  - **Avoid background virus scanning** or indexing on the mounted path (especially on Windows)


## Proxy & Optimized Workflows

Avid’s DNxHR LB and DNxHD LB proxy workflows are recommended when working with high resolution media on cloud storage. 

You may want to consider:

  - Using the **Create Proxies** command to generate proxy media and toggle between proxy and high-resolution clips via the **Play button drop menu**.
  - Or, transcode media to proxy formats such as **DNxHD LB** or **DNxHR LB** and later use **Relink** to conform back to high resolution for finishing.

In either case, **generating proxies to local storage** is recommended for optimal playback performance, especially when working over slower or high-latency connections.


## Monitoring Performance

Transfers via Object Mount may not show progress in Avid’s interface, so we suggest:

  - On **macOS**: Open **Activity Monitor > Network**.
  - On **Windows**: Use **Task Manager > Performance > Network**.
  - For detailed diagnostics, set the Object Mount log level to `debug` or `trace` in Preferences.

{% callout type="info" %}
  If Object Mount appears slow when linking large files, it’s can be due to first-time access from cloud storage. Performance improves after initial reads, thanks to caching and file prefetch.
{% /callout %}


## Known Considerations

  - Avid doesn’t natively understand cloud latency so playback may stutter if accessing un-transcoded high-resolution files over slower connections.
  - Ensure the mount path is stable and doesn’t unmount or disconnect mid-session.
  - POSIX mode can help with permission-sensitive environments, but is not required for typical read-only workflows.


## Summary

Avid Media Composer works effectively with Object Mount when media is properly organized and cache settings are optimized.

Local project files, proxy workflows, and sensible mount paths all contribute to a faster, more reliable experience.

For additional help tuning your Avid workflow with Object Mount, [contact our support team](https://supportdcs.storj.io/hc/en-us/requests/new) &mdash; we’re happy to assist.
