---
title: Object Mount with Digital Audio Workstations
hideTitle: true
metadata:
  title: Object Mount with Digital Audio Workstations (DAWs)
  description:
    Best practices for using Object Mount with audio software including Pro Tools, Logic Pro X, Ableton Live, and more.
---

# Using Object Mount with Digital Audio Workstations (DAWs)

Object Mount works well alongside many industry-standard audio tools by offering high-performance access to cloud-based sample libraries, project archives, and media assets. This guide offers high-level advice for working with **Pro Tools**, **Logic Pro X**, **Ableton Live**, **Cubase**, **FL Studio**, **Reaper**, **Studio One**, and **Adobe Audition**.

---

## Recommended Workflow

While Object Mount behaves like a local drive, most DAWs perform best when:

- **Project/session files** are saved to a **local SSD**  
- **Media and asset libraries** (e.g. sample packs, stems, field recordings) are stored on Object Mount  
- **Render/export targets** are local, then archived to cloud storage after completion

{% callout type="info" %}
In all cases, placing scratch/cache folders on fast internal drives is strongly recommended.
{% /callout %}

---

## Tool-Specific Tips

{% tabs %}
{% tab label="Avid Pro Tools" %}
- Store `.ptx` session files and audio files on **local volumes**  
- Use Object Mount for **archived session material**, bounced stems, or loop/sample libraries  
- Avoid using cloud storage for active playback/editing unless the session is fully loaded into RAM  
{% /tab %}

{% tab label="Logic Pro X" %}
- Store your `.logicx` project files locally  
- Link external media (samples, bounces, multis) from Object Mount  
- Enable **Project > Consolidate** to pull linked cloud assets into local sessions if needed  
{% /tab %}

{% tab label="Reaper" %}
- Reaper is flexible and lightweight and can often read directly from mounted cloud volumes  
- Recommended: use **Save project with media** to consolidate sessions if moving between machines
{% /tab %}

{% tab label="Adobe Audition" %}
- Keep `.sesx` project files local  
- Use Object Mount for access to broadcast archives, interview audio, and backing tracks  
- When exporting long sessions, render to a local path before uploading to cloud
{% /tab %}

{% tab label="Ableton Live / FL Studio / Cubase / Studio One" %}
- Save `.als`, `.flp`, `.cpr`, and `.song` project files locally  
- Use Object Mount to organise reusable assets like:
  - Drum kits  
  - Sound packs  
  - Rendered stems  
  - Collab folders  
- Consider using proxies or pre-rendered versions of multi-track material stored on the cloud.
{% /tab %}
{% /tabs %}

---

## Summary

DAWs are highly sensitive to disk latency. For best results:

- Store active sessions and renders locally  
- Use Object Mount for assets, libraries, and archives  
- Enable caching in Preferences for faster access to large sample sets  
- Avoid real-time recording or playback **to** Object Mount volumes

Looking to integrate Object Mount into a studio or broadcast pipeline? [Contact support](https://supportdcs.storj.io/hc/en-us/requests/new) for advice on multi-user and high-throughput setups.

---
