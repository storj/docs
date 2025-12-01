---
title: "Storage: Tiered Pricing"
hideTitle: true
docId: mqRRgT,hL*dk3zNT
weight: 3
metadata:
  title: Object Storage Pricing
  description:
    Information on Storj’s tiered pricing model for distributed cloud object storage.
---

# Object Storage: Tiered Pricing

{% callout type="info" %}
As of **November 1, 2025**, Storj has transitioned to a new **tiered pricing model** for object storage.

Projects created **before November 1, 2025** retain legacy pricing for **one calendar year** or until they **upgrade or migrate**, whichever comes first.

See details on our [legacy pricing model](docId:x3xPZJXCp!CB@spN).
{% /callout %}


## Overview

Storj’s new pricing model introduces **three distinct storage tiers** designed to meet different performance, compliance, and budget requirements:

| | **Global Collaboration** | **Regional Workflows** | **Active Archive** |
| :---- | :---- | :---- | :---- |
| **Best for** | Consistent performance for global teams. Powered by a globally distributed edge network and a redundant global region for low-latency anywhere. | Region-specific storage built for compliance and predictable performance. Keeps data local while meeting residency and regulatory requirements. | Cost-effective region for long-term retention. Archive and backup data are instantly accessible without paying for peak performance. |
| **Storage cost** | **$15/TB/month** | **$10/TB/month** | **$6/TB/month** |
| **Egress cost** | 1X included, $0.02/GB additional | 1X included, $0.01/GB additional | $0.02/GB |
| **Minimum storage duration** | None | None | 30 days |
| **Minimum object size** | 50 kB | 50 kB | 100 kB |


## Billing Units and Rounding Policy

Storj bills based on **GB** and **GB-months** (not MB or MB-months).  

To ensure consistency across all tiers, **your total usage is rounded up to the nearest whole GB** when your invoice is generated. This rounding applies to the **sum of all your usage**—not to each individual object.

{% callout type="info" %}
**Important:** Rounding is applied to your total usage, not per object. You can store as many small objects as you want without each one being rounded up individually. For example, if you store 1,000 objects of 1 MB each, your total storage is 1,000 MB (~1 GB), which would be billed as 1 GB—not 1,000 GB.

Note: Small objects below the [minimum object size](#minimums) threshold (50-100 kB depending on tier) are billed as if they meet that minimum. This is separate from the GB rounding policy described here.
{% /callout %}

**Examples:**
- If your total usage is **500 MB**, it is rounded up to **1 GB**.
- If your total usage is **1 byte**, it is rounded up to **1 GB**.
- If your total usage is **1001 MB**, it is rounded up to **2 GB**.

This rounding rule applies to **both storage and egress bandwidth**.

Also, Storj uses simple base 10 conversion to convert between Bytes, KB, GB, TB, etc. 

**Example:** 1 TB = 1,000 GB = 1,000,000 KBytes.


## Storage Fees

Storage costs are calculated per GB per month, rounded up to the nearest GB.

**Example:**
- Storing **1 TB** in the **Regional Workflows** tier for a full month = **$10**.
- **Calculation:** 1 TB × 1 month × $10 / TB = $10.

Storage is measured continuously (per hour) throughout the month, based on the actual bytes stored.


## Egress Fees

Egress (download) bandwidth is billed per GB and rounded up to the nearest GB.

- **Global Collaboration:** 1X included; $0.02/GB additional  
- **Regional Workflows:** 1X included; $0.01/GB additional  
- **Active Archive:** $0.02/GB (no free allowance)

Bandwidth includes all data transferred out of the Storj network.

**Example:**  
- Downloading 1 TB from the Global Collaboration tier (after the 1× included egress)
- **Calculation** = 1000 GB × $0.02 = **$20.00**.


## Minimums

Each tier has a few minimums that affect billing:

- **Minimum Object Size:** Objects smaller than the listed minimum (50-100 kB, depending on tier) are billed as if they meet that minimum threshold.  
- **Minimum Storage Duration (Active Archive tier only):** Data deleted before **30 days** will still be billed for the full 1 month period.  
- **Minimum Monthly Usage:** A **$5 minimum monthly fee** applies to all active storage accounts. You won’t be charged the minimum if:
  - Your usage exceeds $5
  - You pay with **STORJ token**
  - You purchased a **starter package** prior to August 1, 2025 (valid until expiration).


## Project Limits
All Projects have Project Limits on certain important constructs. Increases in Project Limits may impact the price of your use of Storj services. 

To learn more, check out the [](docId:Zrbz4XYhIOm99hhRShWHg) and [](docId:A4kUGYhfgGbVhlQ2ZHXVS) sections of the documentation.

---

**Effective Date:** November 1, 2025  
**Last Updated:** October 22, 2025