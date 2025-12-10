---
title: Adobe Premiere Pro
hideTitle: true
docId: fdz5QyWwRqaDFYS9
weight: 1
metadata:
  title: Object Mount with Adobe Premiere Pro
  description:
    Recommended workflow and setup for editing with Adobe Premiere Pro using Object Mount volumes.
hidden: false
---

# Using Object Mount with Adobe Premiere Pro

Object Mount makes it easy to browse, import, and edit footage directly from S3-compatible storage in Adobe Premiere Pro.

Whether you’re working with local proxies, editing remotely, or centralizing project media, Object Mount integrates smoothly into your editing pipeline.


## Recommended Setup

Once you’ve mounted your object storage with Object Mount, your volume will appear like a standard drive in **File Explorer (Windows)** or **Finder (macOS)**. 

From there, you can work as usual in Premiere Pro with just a few things to keep in mind.

**Importing Footage**
  - Select **File > Import** (or use the **Media Browser**).
  - Navigate to your **Object Mount** drive and select your files.
  - Footage can be previewed and scrubbed before importing.

{% callout type="info" %}
  **Large File Transfer Performance**

  If you notice slower performance with large files or over remote networks, consider using proxy workflows (see below).
{% /callout %}


## Recommended Proxy and Cache Settings

While Object Mount enables direct-from-cloud editing, Premiere Pro still benefits from local cache for smooth playback and faster timeline scrubbing.

**Suggested Settings:**

1. **File > Project Settings > Scratch Disks**:
    - Set **Media Cache** and **Previews** to a fast, local SSD.

2. **Preferences > Media Cache**:
    - Enable **Auto delete cache files older than X days** to keep things tidy.

3. **Create Proxies** via **Ingest Settings** or manually using the **Project panel**:
    - Store proxies on a local drive.
    - Set **Proxy File Format** to “ProRes Proxy” or “H.264 Low Res” for faster performance.

4. Enable **Toggle Proxies**:
    - Navigate to the Program Monitor.
    - Set **Toggle Proxies** to switch views on the fly.


## Relinking Media

If a project was opened on a different machine or the mount point has changed:

  - Go to **File > Link Media**.
  - Browse to your Object Mount volume.
  - Premiere will relink to all matching file paths automatically.

{% callout type="info" %}
  **Ease of File Management**

  Object Mount maintains consistent folder structures across platforms, which makes relinking straightforward.
{% /callout %}


## Performance Tips

- Stick to **List View** in Media Browser when browsing large folders.
- Use proxies for multicam or high-resolution editing (e.g. 4K, RAW).
- Avoid saving the Premiere project file directly to the Object Mount drive.
  - Store locally, and then backup to the cloud separately, if needed.


## Storage Visibility

Your Object Mount volume will show up:
  - On **macOS**: Under **Locations** in Finder.
  - On **Windows**: As a mapped drive under **This PC**.

Once mounted, there’s no need to sync or copy files &mdash; you’re working live from the source in the cloud.


## Reminder on Write Operations

Premiere Pro reads from cloud storage efficiently, but for best results:

  - Keep render outputs, scratch files, and auto-saves on a local drive.
  - Use Object Mount for **read access to source footage**.
  - Export final renders locally, then upload back to your storage if needed.
