---
title: "Storage: Simplified Pricing"
hideTitle: true
docId: 1ea1de87-5e14-402b-afb7-15d83c135563
weight: 3
metadata:
  title: Object Storage Pricing starting July 1, 2026
  description:
    Information on Storj’s Simplified pricing model for distributed cloud object storage.
---

# Object Storage: Simplified Pricing

{% callout type="info" %}
As of **July 1, 2026**, Storj is transitioned to a new **Simplified pricing model** for object storage.

Projects created **before November 1, 2025** retain [legacy pricing](docId:x3xPZJXCp!CB@spN) until July 1, 2026.

Projects created **after November 1, 2025** retain [tiered pricing](docId:mqRRgT,hL*dk3zNT) until July 1, 2026.

You will need to Opt-In for the [new pricing](docId:1ea1de87-5e14-402b-afb7-15d83c135563) or Opt-Out. An opt-in/out selection is in your [](docId:nGzxQBhV8nx5Pukj6O0zT). Make your selection before July 30, 2026.

If you opt-out, **your account will be frozen and data deleted within 45 days**.

EU customers must explicitly Opt-In by July 30, 2026, **otherwise their accounts will be frozen on July 31, 2026 and deleted 45 days later.**

US and AP customers who do not take action by July 30, 2026 **will be deemed to have accepted the Simplified pricing model, which is already in effect as of July 1, 2026.**

**_Customers with a custom contract are excluded._**

{% /callout %}


## Overview

Storj’s new simplified pricing model introduces **two distinct storage tiers** designed to meet different performance, compliance, and budget requirements:

| | **Standard** | **Advanced** |
| :---- | :---- | :---- |
| **Best for** | Consistent performance for global teams. Powered by a globally distributed edge network and a redundant global region for low-latency anywhere. | Region-specific storage built for compliance and predictable performance. Keeps data local while meeting residency and regulatory requirements. |
| **Storage cost** | **$7/TB/month** | **$10/TB/month** |
| **Egress cost** | $7/TB | $7/TB |
| **Minimum storage duration** | 30 days | 30 days |
| **Minimum object size** | 50 kB | 50 kB |
| [**Object Mount**](docId:b464fda8-9e3b-4417-aa64-2eb1efb69c39#pricing-starting-july-1-2026) | 2 free licenses included | 2 free licenses included |

## How the [Tiered pricing](docId:mqRRgT,hL*dk3zNT) and the [Legacy pricing](docId:x3xPZJXCp!CB@spN) transition to a new simplified pricing

| **Previous Tier** | **New Tier** | **New Storage Rate** | **New Egress Rate** |
| :--- | :--- | :--- | :--- |
| Global Collaboration | Standard | $7/TB | $7/TB |
| Regional Workflows | Advanced | $10/TB | $7/TB |
| Active Archive | Standard | $7/TB | $7/TB |
| Legacy Global | Standard | $7/TB | $7/TB |
| Legacy US Select | Advanced | $10/TB | $7/TB |

## Billing Units and Rounding Policy

Storj bills based on **GB** and **GB-months** (not MB or MB-months).  

Usage is rounded up to the nearest whole GB **per tier** (Standard, Advanced) for each usage type. Within a tier, Storj sums all storage usage across objects and rounds once for storage, and sums all egress usage and rounds once for egress.

{% callout type="info" %}
**Important:** Rounding is applied per tier total, not per object. You can store as many small objects as you want without each one being rounded up individually.

For example, if you store 1,000 objects of 1 MB each in a single tier, your total storage is 1,000 MB (~1 GB) and would be billed as 1 GB of storage—not 1,000 GB.

**Note:** Small objects below the [minimum object size](#minimums) threshold (50kB) are billed as if they meet that minimum. This is separate from the GB rounding policy described here.
{% /callout %}

**Examples:**
- If your storage usage for the month is **500 MB**, it is billed as **1 GB** of storage.
- If your egress usage for the month is **1001 MB**, it is billed as **2 GB** of egress.
- If you use **500 MB** of storage and **500 MB** of egress in a month, your invoice shows **1 GB** of storage and **1 GB** of egress (not a combined 1 GB line item).

This rounding rule applies separately to **storage and egress bandwidth totals within each tier**.

Also, Storj uses simple base 10 conversion to convert between Bytes, KB, GB, TB, etc. 

**Example:** 1 TB = 1,000 GB = 1,000,000 KBytes.


## Storage Fees

Storage costs are calculated per GB per month, rounded up to the nearest GB.

**Example:**
- Storing **1 TB** in the **Standard** tier for a full month = **$7**.
- **Calculation:** 1 TB × 1 month × $7 / TB = $7.

Storage is measured continuously (per hour) throughout the month, based on the actual bytes stored.


## Egress Fees

Egress (download) bandwidth is billed per GB and rounded up to the nearest GB.

- **Standard:** $7/TB
- **Advanced:** $7/TB

Bandwidth includes all data transferred out of the Storj network.

## Minimums

Each tier has a few minimums that affect billing:

- **Minimum Object Size:** Objects smaller than the listed minimum (50 kB) are billed as if they meet that minimum threshold.
- **Minimum Storage Duration:** Data deleted before **30 days** will still be billed for the full 1 month period. [Object Mount](docId:b464fda8-9e3b-4417-aa64-2eb1efb69c39#pricing-starting-july-1-2026) users are excluded.
- **Minimum Monthly Usage:** A **$5 minimum monthly fee** applies to all active storage accounts. The minimum fee applies as follows:
  - If your total usage for the month exceeds $5, no minimum fee is charged.
  - If your total usage is less than $5, you are charged $5 for that month.
  - Accounts paying with STORJ token are exempt from the minimum monthly fee.
  - Accounts on custom or negotiated contracts are not subject to the standard minimum fee. Your account team will communicate any applicable terms.
  - The minimum fee does not apply during the free trial period. It takes effect at the start of your first billing cycle after the trial ends.
  - Accounts with a $0 balance at the end of a billing cycle and no active storage will be suspended and then deleted. Free trial accounts are excluded from this.

## Project Limits
All Projects have Project Limits on certain important constructs. Increases in Project Limits may impact the price of your use of Storj services. 

To learn more, check out the [](docId:Zrbz4XYhIOm99hhRShWHg) and [](docId:A4kUGYhfgGbVhlQ2ZHXVS) sections of the documentation.

---

See our [Pricing Change FAQ](https://www.storj.io/pricing/change-faqs) for additional details.

**Effective Date:** July 1, 2026
**Last Updated:** July 15, 2026
