---
title: Object Mount in Media Workflows
hideTitle: true
weight: 1
metadata:
  title: Object Mount in Media Workflows
  description:
    Overview of using Object Mount with creative tools like DaVinci Resolve and Adobe Premiere Pro
---

# Object Mount in Media Workflows

Object Mount is designed to make working with cloud storage as seamless as possible — especially in media production environments where performance, compatibility, and simplicity matter.

This page gives a quick overview of how Object Mount fits into post-production workflows, and where it works well with tools like **DaVinci Resolve** and **Adobe Premiere Pro**.

---

## What is Object Mount?

Object Mount is a native S3 mount tool that lets you treat remote object storage like a local drive. It works with **Storj**, **AWS S3**, and other compatible providers, and is available on **macOS** and **Windows**.

Once mounted, your object storage behaves like any other drive — you can browse, preview, and edit media directly from it using your preferred creative software.

---

## Object Mount Demo

{% youtube-embed videoId="Si__mi8HXPE" /%}

---

## DaVinci Resolve

Object Mount integrates cleanly into DaVinci Resolve workflows:

- Media can be accessed directly from your Object Mount volume  
- Stills, cache, and preview files are best kept on local SSD/NVMe to avoid bottlenecks  
- Direct I/O should be disabled for the Object Mount path  
- Optional settings like proxy mode and smart caching can improve playback on cloud-mounted media

See [Using Object Mount with DaVinci Resolve](./media-workflows/davinci-resolve) for the full setup guide.

---

## Adobe Premiere Pro

Premiere Pro users can also benefit from Object Mount in similar ways:

- Projects and source footage can be stored remotely and edited directly  
- Media can be linked and relinked to Object Mount volumes just like local storage  
- Proxies and cache files are recommended to remain on local disks for speed  

{% callout type="info" %}
Object Mount volumes appear like regular drives in Finder or File Explorer, making them easy to integrate with Premiere’s media browser and import panels.
{% /callout %}

---

## When to Use Object Mount

Object Mount is ideal for:

- Remote editing workflows  
- Team environments where storage is centralised  
- Archival footage access over cloud  
- High-speed read access (e.g. proxy editing or frame review)

It’s particularly well-suited for **hybrid workflows** where some assets live on fast local disks and others come in from the cloud — without needing clunky manual sync tools or complex workflows.

---

## Final Notes

Object Mount is not a replacement for all local workflows — cache files, renders, and scratch disks are still best kept local. But for accessing and working with cloud-hosted media, it bridges the gap between storage and usability beautifully.

For app-specific setup steps, visit:

- [Object Mount with DaVinci Resolve](./media-workflows/davinci-resolve/)  
- [Object Mount with Adobe Premiere Pro](./media-workflows/premiere-pro/)

Others: 

- [Object Mount with Final Cut Pro](./media-workflows/final-cut-pro/)
- [Object Mount with Avid Media Composer](./media-workflows/media-composer/)
- [Object Mount with Graphics Applications](./media-workflows/graphics/)
- [Object Mount with Digital Audio Workstations](./media-workflows/daw/)

---


