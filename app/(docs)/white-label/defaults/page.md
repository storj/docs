---
title: Defaults & Limits
docId: white-label-defaults
weight: 4
metadata:
  title: White Label Defaults & Limits
  description: Understand default limits and customization options for white-label deployments.
---

This page explains the default limits for white-label deployments and how they can be customized.

## Overview

Unless explicitly customized, white-label deployments use **Storj default free-tier limits** as global defaults.

{% callout type="warning" %}
There is **no self-serve upgrade path** for end users. Every user receives the same default limits unless the satellite-wide defaults are changed or limits are adjusted for a specific customer on request.
{% /callout %}

---

## Region / Tier Defaults

### Default Behavior

- **Default tier/region:** Global
- **User experience:** When only Global is enabled, users will **not** be prompted to choose a region when creating buckets—new buckets inherit the Global default automatically.

### Available Tiers/Regions

| Tier | Description | Default |
|------|-------------|---------|
| Global | Multi-region, globally distributed storage | Enabled |
| Regional – US | US-only storage nodes | Optional |
| Archive | Cold storage tier | Optional |

Additional regions can be enabled upon request.

---

## Account / Project Defaults

### Project Limits (per end user)

| Limit | Default Value |
|-------|---------------|
| Projects per user | 1 |
| Buckets per project | 100 |

### Usage Limits (per project)

| Limit | Default Value |
|-------|---------------|
| Storage | 25 GB |
| Bandwidth / Egress | 25 GB |
| Segments | 10,000 |

---

## Customizing Limits

There are two ways to change limits:

### 1. Change Global Defaults (Satellite-wide)

Different global defaults can be configured for your white-label satellite. This affects **all new users** on the satellite.

**Use case:** You want all your customers to have higher (or lower) default limits than the Storj standard.

**Process:** Request the change through your Storj account representative.

### 2. Adjust Limits for a Specific Customer

Limits can be increased for a specific end customer on a case-by-case basis.

**Use case:** A particular customer needs more storage or bandwidth than the default limits allow.

**Process:** Submit a support request to the Storj team with:
- Customer email/account identifier
- Requested limit increases
- Business justification (optional but helpful)

---

## Segment Limits Explained

Segments are the internal units Storj uses to store data. Understanding segments helps set appropriate limits:

- **Small files** (< 64 MB): 1 segment per file
- **Large files** (> 64 MB): Multiple segments (1 segment per 64 MB)

**Example:** A 200 MB file uses approximately 4 segments.

The default limit of 10,000 segments allows for:
- 10,000 small files, or
- Fewer large files totaling ~640 GB of data, or
- A mix of both

{% callout type="note" %}
If your users will store many small files, you may want to request a higher segment limit than the default.
{% /callout %}

---

## Billing & Upgrades

White-label deployments do not include self-serve billing or upgrade functionality in the UI. All billing UI elements and payment references are removed from the console.

Billing for white-label usage is handled directly between Storj and the white-label partner, not with end users.

---

## Support

To request limit changes or discuss customization options, contact your Storj account representative or email support@storj.io.
