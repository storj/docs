---
title: Linux Profile Mode (CUNO_PROFILE)
docId: linux-profile-mode
hideTitle: true
weight: 9
metadata:
  title: Object Mount on Linux – Profile Modes
  description:
    Explains the CUNO_PROFILE environment variable for Linux builds and how to choose the appropriate mode (M&E vs HPC).
---

# Linux Profile Mode: `CUNO_PROFILE`

Object Mount for Linux includes an environment variable called **`CUNO_PROFILE`** that configures internal behaviour for different types of workloads. This setting is **only applicable on Linux**, and helps Object Mount optimise itself for either:

- **Media & Entertainment workflows** (`CUNO_PROFILE=M&E`)  
- **High-performance computing environments** (`CUNO_PROFILE=hpc`)

Understanding which mode to use is important, the wrong setting can lead to suboptimal behaviour, especially for large-scale automated environments.

---

## What Does `CUNO_PROFILE` Do?

The `CUNO_PROFILE` variable adjusts how Object Mount behaves internally, including:

- How aggressively metadata is cached  
- Which filesystem features are exposed  
- Logging, debugging, and memory handling profiles  
- Compatibility expectations with the Linux userland and toolchains

{% callout type="info" %} 
If unset, the default is:  
`CUNO_PROFILE=M&E`
{% /callout %}

This is well-suited to desktop users, editors, and creative professionals using Object Mount interactively, but **not always suitable** for headless systems or scripted automation.

---

## Choosing the Right Profile

Before shipping or deploying the Linux version of Object Mount, ask the following:

### 1. **Is the user working interactively, or via headless automation?**
- `M&E` is tuned for interactive, graphical workflows  
- `hpc` is preferred for background tasks, CLI tools, and scripts

### 2. **Will the mount be used by creative software (e.g. Resolve, Premiere, FCP)?**
- If yes: `M&E`  
- If not (e.g. media transformation pipelines, backups): `hpc`

### 3. **Is the system a personal workstation or shared server node?**
- Workstation → `M&E`  
- Server node / render farm → `hpc`

### 4. **Is the mount expected to be long-lived and static, or frequently toggled?**
- Session-based, user-initiated mounts → `M&E`
- Long-lived, persistent mounts → `hpc`  

### 5. **Will users be working via GUI, or purely via CLI/API?**
- GUI or desktop usage → `M&E`  
- CLI tools, automation, batch jobs → `hpc`

### 6. **Is latency more important than throughput, or vice versa?**
- Low-latency I/O (desktop feel) → `M&E`  
- Bulk, high-throughput tasks (e.g. rendering, transcoding) → `hpc`

---

## Setting the Profile

To explicitly set the profile, define the environment variable before launching Object Mount:

```
bash
export CUNO_PROFILE=hpc
```

For permanent use, add this to:
- Your shell profile (`~/.bashrc`, `~/.zshrc`)
- A systemd service or login script
- Docker or container entrypoints (if applicable)

---

## Quick Reference

| Use Case                   | Recommended Profile |
|----------------------------|---------------------|
| Desktop video editing      | `M&E`               |
| Automated ingest pipeline  | `hpc`               |
| Interactive audio work     | `M&E`               |
| Render farm node           | `hpc`               |
| Remote headless access     | `hpc`               |
| Local workstation previews | `M&E`               |

---

## Summary

Choosing the right `CUNO_PROFILE` ensures Object Mount behaves appropriately for the workload. If in doubt:

- Start with `M&E` for creative users  
- Use `hpc` for background, server, or scripted automation

{% callout type="info" %}
Still unsure which profile to use? 🌐 [Reach out to our support team](https://supportdcs.storj.io/hc/en-us/requests/new) and we’ll help you pick the right configuration.
{% /callout %}
