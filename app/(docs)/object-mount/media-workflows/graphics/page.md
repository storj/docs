---
title: Object Mount with Graphics Applications
hideTitle: true
metadata:
  title: Object Mount with Graphics Applications
  description:
    Tips and best practices for using Object Mount with Blender, Unity, and Adobe After Effects.
---

# Using Object Mount with Graphics Applications

This guide outlines best practices for using **Object Mount** with common graphics and animation tools such as **Blender**, **Unity**, and **Adobe After Effects**. These applications all expect fast, local file access and Object Mount helps you work directly from the cloud while maintaining a smooth creative workflow.

---

## Blender

Blender works well with mounted cloud volumes, as long as you’re aware of how it handles linked assets:

- Save `.blend` files locally for best stability  
- Use Object Mount for linked assets such as textures, models, and simulations  
- Avoid opening or rendering directly to Object Mount volumes unless using proxy caching  
- Use **File > External Data > Pack Resources** before sharing a project across machines

{% callout type="info" %}
Enable data and metadata caching in Object Mount Preferences to speed up texture and geometry access.
{% /callout %}

---

## Unity

Unity projects can technically be stored on mounted cloud storage, but this is not recommended for live editing.

- Keep your Unity project folder on a **local drive**  
- Use Object Mount for:
  - Asset archives (e.g. large textures, sound libraries, HDRIs)
  - Downloadable content folders
  - Scripting or automation tools accessing external datasets

{% callout type="info" %}
If using Unity Cloud Build or version control (e.g. Git + LFS), Object Mount is a great place to store large binary files for later retrieval.
{% /callout %}

---

## Adobe After Effects

After Effects can read media files directly from Object Mount, but you’ll get the best experience when:

- Project files (`.aep`) are stored locally  
- Cloud storage is used for:
  - Footage libraries (video, audio, stills)
  - Linked compositions or archive material  
- Enable **“Cache frames to disk”** on a fast local drive to avoid render slowdowns

{% callout type="info" %}
For larger video files, consider using proxies or transcoded formats for previewing from the cloud.
{% /callout %}

---

## Summary

Object Mount makes it easy to integrate cloud storage into graphics workflows, especially for storing and retrieving large, reusable assets. For best results:

- Keep project files and cache folders local  
- Use cloud-mounted volumes for footage, libraries, textures, and external content  
- Enable prefetch and caching settings in Object Mount for faster first-time access

Need help tuning for your specific creative app? [Reach out to support](https://supportdcs.storj.io/hc/en-us/requests/new) — we’re happy to assist.

---
