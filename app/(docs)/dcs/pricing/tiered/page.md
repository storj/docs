---
title: "Storage: Tiered Pricing"
hideTitle: true
docId: mqRRgT,hL*dk3zNT
weight: 2
metadata:
  title: Object Storage Pricing
  description:
    Information on Storj's tiered pricing model for distributed cloud object storage.
---

# Object Storage: Tiered Pricing

{% callout type="info" %}
As of **November 1, 2025**, Storj has transitioned to a new **tiered pricing model**.

Projects created **before November 1, 2025** retain legacy pricing for **one calendar year** or until they **upgrade or migrate**, whichever comes first.

See [legacy pricing details](docId:59T_2l7c1rvZVhI8p91VX).
{% /callout %}



## Overview

Storj’s new pricing model introduces **three distinct storage tiers** designed to meet different performance, compliance, and cost needs:

| | **Global Collaboration** | **Regional Workflows** | **Active Archive** |
| :---- | :---- | :---- | :---- |
| **Best for** | Consistent performance for global teams. Powered by a globally distributed edge network and a redundant global region for low-latency anywhere. | Region-specific storage built for compliance and predictable performance. Keeps data local while meeting residency and regulatory requirements. | Cost-effective region for long-term retention. Archive and backup data are instantly accessible without paying for peak performance. |
| **Storage cost** | **$15/TB/month** | **$10/TB/month** | **$6/TB/month** |
| **Egress cost** | 1X included, $0.02/GB additional | 1X included, $0.01/GB additional | $0.02/GB |
| **Minimum Storage Duration** | None | None | 30 days |
| **Minimum Object Size** | 50 kB | 50 kB | 100 kB |

## Billing Units and Rounding Policy

Storj bills based on **GB and GB-months** (not MB or MB-months).  
To ensure consistency across all tiers, **usage is always rounded up to the nearest whole GB** before billing.

**Examples:**
- If usage is **500 MB**, it’s rounded up to **1 GB**.
- If usage is **1 byte**, it’s rounded up to **1 GB**.
- If usage is **1001 MB**, it’s rounded up to **2 GB**.

This rounding rule applies to **both storage and egress**.

---

## Storage Fees

Storage costs are calculated per GB per month, rounded up to the nearest GB.

**Example:**
- Storing **1 TB** in the **Regional Workflows** tier for a full month = **$10**.
- **Calculation:** 1 TB × 1 month × $10 / TB = $10.

Storage is measured continuously (per hour) throughout the month, based on the actual bytes stored.

---

## Egress Fees

Egress (download) bandwidth is billed per GB and rounded up to the nearest GB.

- **Global Collaboration:** 1X included; $0.02/GB additional  
- **Regional Workflows:** 1X included; $0.01/GB additional  
- **Active Archive:** $0.02/GB (no free allowance)

Bandwidth includes all data transferred out of the Storj network.

**Example:**  
Downloading 1 TB from the Global tier (after the 1× included egress) →  
**Price** = 1000 GB × $0.02 = **$20.00**.

---

## Minimums

Each tier has a few minimums that affect billing:

- **Minimum Object Size:** Objects smaller than the listed minimum (50–100 kB depending on tier) are billed as if they meet that threshold.  
- **Minimum Storage Duration (Archive tier only):** Data deleted before **30 days** will still be billed for the full period.  
- **Minimum Monthly Usage:** A **$5 minimum monthly fee** applies to all active accounts. You won’t be charged the minimum if:
  - Your usage exceeds $5,  
  - You pay with **STORJ token**, or  
  - You purchased a **starter package** prior to August 1, 2025 (valid until expiration).

---

## Project Limits
All Projects have Project Limits on certain important constructs. Increases in Project Limits may impact the price of your use of Storj. To learn more, check out the [](docId:Zrbz4XYhIOm99hhRShWHg) and [](docId:A4kUGYhfgGbVhlQ2ZHXVS) sections of the documentation.

---

**Effective Date:** November 1, 2025  
**Last Updated:** October 22, 2025