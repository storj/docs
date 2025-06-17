---
title: Object Mount with DaVinci Resolve
metadata:
  title: Object Mount with DaVinci Resolve
  description:
    Recommended settings and tips for using Object Mount with DaVinci Resolve
---

# 🎬 Using Object Mount with DaVinci Resolve

This guide walks you through the best setup for using Object Mount with **DaVinci Resolve**, along with a few optional tweaks and performance tips that may help smooth things out depending on your system and workflow.

---

## ⚙️ Recommended Settings (Per Project)

After opening or importing your Resolve project, please check the following:

1. From the top menu bar, go to:  
   **Preferences > System > Media Storage**

2. Add your **Object Mount** volume as a **Media Storage Location**  
   - The Object Mount volume **should not** be first in the list  
   - Resolve uses the top location for gallery stills and cache files, so keep this separate  

3. Disable **Direct I/O** for the Object Mount path  
   - This helps ensure better compatibility and smoother read/write behaviour  

---

## 🧪 Optional Performance Tweaks

These settings aren’t required, but can improve responsiveness or playback performance — especially on larger projects or when working over cloud storage.

### Playback and Caching

- **Playback > Render Cache** → Set to **Smart**
- **Playback > Timeline Proxy Resolution** → Set to **Half** or **Quarter**
- **Playback > Proxy Handling** → Set to **Prefer Proxies**
- **Playback > Use Optimized Media if Available** → Enable

### Preview Panels and Navigation

- In the **Edit** tab:
  - Use the **Timeline View Options** (top-left of the timeline)
    - Set **Thumbnail View** to **Thumbnail** or **None**
    - Disable **Display Audio Waveform**

- In the **Media** tab:
  - Switch **Timelines panel** to **List View** (top right)
  - Open the overflow menu:
    - Disable **Film Strip**
    - Disable **Audio Waveforms**

- In **Media Storage**, switching from **Thumbnail View** to **List View** can also help when browsing through folders over Object Mount.

---

## 📊 Monitoring Performance

Because of how Object Mount optimises transfers, the built-in file copy progress indicators (in Finder or File Explorer) may not accurately reflect what's happening behind the scenes.

For a better view of performance:

- On **macOS**: Open **Activity Monitor > Network tab**
- On **Windows**: Go to **Task Manager > Performance > Network**

If Object Mount is saturating the network connection, that’s a good sign — it’s doing what it’s designed to do. Transfers may still appear idle in the UI, but they are active under the hood.

> ⏳ **Tip:** Don’t cancel a transfer just because the Finder or Explorer bar seems stuck — always check your system’s network usage first.

---
