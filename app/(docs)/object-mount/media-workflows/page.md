---
title: Media Workflow Guides
hideTitle: true
docId: JXF4_NLsV@nh9QcT
weight: 6
metadata:
  title: Media Workflow Guides
  description:
    Overview of using Object Mount with creative tools like DaVinci Resolve and Adobe Premiere Pro.
hidden: false
---

# Object Mount in Media Workflows

Object Mount is designed to make working with cloud storage as seamless as possible &mdash; especially in media production environments where performance, compatibility, and simplicity matter.

{% youtube-embed videoId="Si__mi8HXPE" /%}

The articles in this **Media Workflow Guides** section will provide an overview of how Object Mount fits into post-production workflows, as well as configuration tips for tools like **Adobe Premiere Pro**, **Avid Media Composer** and **DaVinci Resolve**.


## Adobe Premiere Pro

Premiere Pro users benefit from Object Mount:

  - Projects and source footage can be stored remotely and edited directly.
  - Media can be linked and relinked to Object Mount volumes just like local storage.
  - Assign proxies and cache files to local disks for the best performance.
  - Object Mount volumes appear like regular drives in Finder or File Explorer, making them easy to integrate with Premiere’s media browser and import panels.

See [Using Object Mount with Premiere Pro](docId:fdz5QyWwRqaDFYS9) for complete configuration tips.


## Avid Media Composer

Object Mount integrates cleanly into Avid Media Composer workflows:

  - Preview and scrub footage before importing.
  - Store Scratch Disks and Proxies on local, fast volumes.
  - Adjust Proxy file formats to improve performance.

See [Using Object Mount with Avid Media Composer](docId:eSTEd9V5JbexxYDQ) for full setup and setting guidelines.


## DaVinci Resolve

Object Mount interacts seamlessly with DaVinci Resolve:

  - Media can be accessed directly from your Object Mount volume.
  - Stills, cache, and preview files are fastest when stored on local SSD/NVMe volumes.
  - Direct I/O should be disabled for the Object Mount path.
  - Optional settings like proxy mode and smart caching can improve playback on cloud-mounted media.

See [Using Object Mount with DaVinci Resolve](docId:xZ5tdyuyYGM8Lrfp) for more details.


## When to Use Object Mount

Object Mount is ideal for:

  - Remote editing workflows  
  - Team environments where storage is centralized  
  - Archival footage access directly from the cloud  
  - High-speed read access (e.g.: proxy editing or frame review)

Object Mount is particularly well-suited for **hybrid workflows** where some assets live on fast local disks, while other content comes in from the cloud &mdash; with no need for manual sync tools or complex workflows.


## Final Notes

Object Mount is not a replacement for all local workflows &mdash; cache files, renders, and scratch disks are still best kept on local volumes. 

But for accessing and working with cloud-hosted media, Object Mount bridges the gap between cloud storage and simplified usability beautifully.
