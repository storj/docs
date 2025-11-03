---
title: Performance Tuning
docId: tuning
weight: 1
metadata:
  title: Performance Tuning
  description:
    Guidance on how to optimise Object Mount performance across platforms and environments.
---

There are many variables to consider when tuning **Object Mount** for the best performance, including operating system behaviour, network speed, and the characteristics of your storage provider.

Use the tabs below to explore optimisation tips for different platforms and configurations.

---

## Operating System

{% tabs %}
{% tab label="Linux" %}
- Use a recent kernel (5.10+ preferred) for improved FUSE performance  
- Ensure `fuse3` and required kernel modules are installed  
- Run Object Mount as a systemd user service if mounting on login  
- Place cache directories (`data cache`, `metadata cache`) on a fast SSD or NVMe volume  
- Adjust `ulimit -n` if handling many open files (e.g. `ulimit -n 65535`)
{% /tab %}

{% tab label="MacOS" %}
- Use macOS Monterey (12.0) or later for best compatibility  
- Make sure **macFUSE 4.8.2 or newer** is installed and authorised in **System Settings > Privacy & Security**  
- Disable Spotlight indexing on mount paths to reduce background load  
- Cache directories should be located on fast internal storage (not external or network drives)  
- POSIX mode can add overhead. Enable only if required by your workflow
{% /tab %}

{% tab label="Windows" %}
- Use Windows 10 (21H2+) or Windows 11 for best driver support   
- Place cache folders on fast local drives (e.g. `C:\Temp\Object MountCache`)  
- Disable antivirus scanning on mount points if performance is impacted  
- Run the app with administrator rights if mounting to system-level paths
{% /tab %}
{% /tabs %}

---

## Connection Speed

Object Mount adapts well to different network conditions, but optimal performance depends on the speed and reliability of your connection to cloud storage.

{% tabs %}
{% tab label="Fast" %}
**10 Gbps or faster**

- Enable **file prefetching** via `CUNO_OPTIONS = -filePrefetch`  
- Increase **S3 connections limit** (e.g. 200+)  
- If Client and Storage are on same **Local Area Network (LAN)** switch off **Data cache**
- Consider setting **metadata cache timeout** to a lower value for frequent sync  
{% /tab %}

{% tab label="Medium" %}
**1 Gbps to 10 Gbps**

- Set **S3 connections limit** between 100–150  
- Avoid enabling POSIX mode unless needed  
- Use smart caching strategies if accessing large numbers of small files
{% /tab %}

{% tab label="Slow" %}
**100 Mbps to 1 Gbps**

- Keep metadata **cache timeout** higher (e.g. 300–600 seconds)  
- Lower **S3 connections limit** (e.g. 50 or fewer) to prevent throttling  
- Limit the number of simultaneous mounts or background operations
- Use proxy editing in creative apps only if working with very large assets
{% /tab %}
{% /tabs %}

---

## Storage Provider Optimisation

Each storage backend behaves slightly differently depending on API responsiveness, region latency, and compatibility mode.

{% tabs %}
{% tab label="Storj" %}
- Use [Storj-managed encryption](docId:aitie6rohXai9uuv) projects (alternatively - [**lexicographically ordered buckets**](docId:eZ4caegh9queuQuaazoo#unencrypted-object-keys)) for faster directory listings
- Enable `-filePrefetch` for large file reads  
- Ensure your satellite and uplink are in the same region as your client when possible  
- POSIX mode is supported but not required for most workflows
{% /tab %}

{% tab label="AWS S3" %}
- Set an appropriate **region** to avoid cross-region latency  
- Use multipart uploads for large file writes (default behaviour in Object Mount)  
- Enable caching and proxy workflows for high-resolution media  
- Monitor AWS rate limits if using a high connection pool size
{% /tab %}

{% tab label="Other S3" %}
- Use the **S3-compatible** provider tab when importing credentials  
- Always test the endpoint and region for compatibility  
- Providers like Wasabi may require explicitly setting the region  
- Avoid POSIX mode if write operations to root are not supported
{% /tab %}

{% tab label="Google Cloud" %}
- Use the XML S3 API compatibility layer (via interoperability settings)  
- Latency-sensitive: caching strongly recommended  
- Consider using a regional GCS bucket near your compute node  
- POSIX emulation may be limited by object store behaviour
{% /tab %}

{% tab label="Azure" %}
- Use a compatibility layer or gateway if not directly S3-compatible  
- Access tiers (e.g. Hot, Cool) may affect read latency  
- Monitor API throttling if using many simultaneous requests  
- Proxy editing recommended over direct edit for best responsiveness
{% /tab %}
{% /tabs %}

---

## Just Ask

Need help tuning for a specific workflow, app, or storage provider?

Reach out via our 🌐 [help desk](https://supportdcs.storj.io/hc/en-us/requests/new) and our team will be happy to assist.

---
