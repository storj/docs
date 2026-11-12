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

Object Mount for Linux reads the environment variable `CUNO_PROFILE` to choose how it downloads data from object storage. It does not change any other behavior.

| **CUNO Profile Setting**  | **Download Behavior** |
|---------------------------|--------------|
| unset (default)           | The default reader, suited to interactive and Media & Entertainment (M&E) workflows
| `CUNO_PROFILE=hpc`        | A reader tuned for High-Performance Computing (HPC) throughput
| `CUNO_PROFILE=direct`     | Direct reads from object storage

The value is not case-sensitive. Any other value, including `M&E`, uses the default reader.

## Choosing the Right Profile

Leave `CUNO_PROFILE` unset for interactive and creative workloads, such as desktop video editing and media previews.

Set `CUNO_PROFILE=hpc` for bulk, high-throughput workloads, such as automated ingest pipelines, render farm nodes and batch jobs.

Measure your own workload with each setting if you are unsure.

## Setting the Profile

Define the environment variable _before_ launching Object Mount.

For example:

```bash
export CUNO_PROFILE=hpc
```

For permanent use, add the environment variable setting to:
  - Your shell profile (`~/.bashrc`, `~/.zshrc`)
  - A systemd service or login script
  - Docker or container entrypoints (if applicable)
