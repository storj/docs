---
title: Media & HPC Modes
hideTitle: true
docId: linux-profile-mode
weight: 9
metadata:
  title: Linux Profile Mode (CUNO_PROFILE)
  description:
    Explains the CUNO_PROFILE environment variable for Linux builds and how to choose the appropriate mode (M&E vs HPC).
---

# Media & Entertainment and HPC Modes 

Object Mount for Linux includes an environment variable called `CUNO_PROFILE` that modifies internal application behavior for different types of workloads. 

This setting only applies to Object Mount on Linux and helps Object Mount optimize itself for Media & Entertainment (M&E) and High-Performance Computing (HPC) workflows:

| **CUNO Profile Setting**  | **Workflow** |
|---------------------------|--------------|
| `CUNO_PROFILE=M&E`        | Media & Entertainment workflows
| `CUNO_PROFILE=hpc`        | High-Performance Computing environments

Understanding the behavior of each mode is important. 

Setting the wrong mode can negatively impact expected performance, especially in large-scale automated environments.


## Purpose of CUNO_PROFILE

The `CUNO_PROFILE` variable adjusts how Object Mount behaves internally, including:

  - How aggressively metadata is cached  
  - Which filesystem features are exposed  
  - Logging, debugging, and memory handling profiles  
  - Compatibility expectations with the Linux **UserLAnd** and **toolchain** tools

{% callout type="info" %}
  **Default Profile Mode**
  
  If unset, the default is for Media & Entertainment workflows: `CUNO_PROFILE=M&E`.
{% /callout %}

Media & Entertainment Mode is well-suited to desktop users, editors, and creative professionals using Object Mount interactively, but less appropriate for headless systems or scripted automations.


## Choosing the Right Profile

Before installing or configuring Object Mount for Linux, consider the following questions:

1. **Is the user working interactively? Or via headless automation?**

    - `M&E` Mode is tuned for interactive, graphical workflows  
    - `hpc` Mode is preferred for background tasks, CLI tools, and scripts

2. **Will the mount be used by creative software applications?**

    - If using Apps such as Avid Media Composer, DaVinci Resolve, Apple Final Cut Pro, Adobe Premiere Pro, etc.:
      - Set: `CUNO_PROFILE=M&E` 
    - If running scripted automation tools, media transformation pipelines, background archive/backup jobs, etc.:
      - Set: `CUNO_PROFILE=hpc`

3. **Is the system a personal workstation? Or shared server node?**

    - Personal Workstation &mdash;  Set: `CUNO_PROFILE=M&E`  
    - Server node / render farm &mdash; Set: `CUNO_PROFILE=hpc`

4. **Is the mount expected to be long-lived and static? Or frequently toggled?**

    - Session-based, user-initiated mounts &mdash; Set: `CUNO_PROFILE=M&E`  
    - Long-lived, persistent mounts &mdash; Set: `CUNO_PROFILE=hpc`

5. **Will users be working via GUI, or purely via CLI/API?**

    - GUI or desktop usage &mdash; Set: `CUNO_PROFILE=M&E`  
    - CLI tools, automation, batch jobs &mdash; Set: `CUNO_PROFILE=hpc`

6. **Which is more important: latency or throughput?**

    - Low-latency I/O, fast response time “desktop feel” &mdash; Set: `CUNO_PROFILE=M&E`  
    - Bulk, high-throughput, background tasks (e.g.: rendering, transcoding) &mdash; Set: `CUNO_PROFILE=hpc`


## Setting the Profile

To explicitly set the profile, define the environment variable _before_ launching Object Mount.

For example:

```
bash
export CUNO_PROFILE=hpc
```

For permanent use, add the environment variable setting to:
  - Your shell profile (`~/.bashrc`, `~/.zshrc`)
  - A systemd service or login script
  - Docker or container entrypoints (if applicable)


## Table: Use Case Quick Reference 

| **Use Case**                         | **Recommended Profile** |
|--------------------------------------|-------------------------|
| **Media & Entertainment Workflows:**         |
| • Desktop video editing              | `M&E`               |
| • Interactive audio work             | `M&E`               |
| • Local workstation media previews   | `M&E`               |
| **High-Performance Computing Environments:** |
| • Automated ingest pipelines         | `hpc`               |
| • Render farm nodes                  | `hpc`               |
| • Remote headless access             | `hpc`               |
