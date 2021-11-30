---
description: Understanding Your Storj DCS Billing and Usage for Your Satellite Account
---

# Billing, Payment and Accounts

## **Understanding Your Storj DCS Billing and Usage for Your Satellite Account**&#x20;

This document explains how registered Storj DCS users are billed for the data they store and the bandwidth they use on Storj DCS. The information provided in the documentation below is not intended to modify or supersede the [Terms of Service](https://www.storj.io/terms-of-service). In the event of a conflict between this documentation and [Terms of Service](https://www.storj.io/terms-of-service), the [Terms of Service](https://www.storj.io/terms-of-service) shall govern.

All examples of price calculations provided in this Documentation are specific to the usage exactly as described in the example. The examples are meant to illustrate how billing is calculated and your actual bill will be based on your actual usage pattern.

## **Overview**

The Storj DCS service provides secure, private and reliable cloud object storage at a much lower cost than the cost of the big cloud providers.  Billing is simple. We charge for we will call  “metered service types.” The metered service types are: static object storage, download bandwidth, and, under some circumstances, a [per-segment fee](usage-limit-increases.md#per-segment-fee).

### **Static Object Storage**&#x20;

Static object storage is charged at $4 per terabyte per month, or $0.004 per gigabyte. Static object storage is calculated in “terabyte months,” which is a prorated calculation of how much storage is used throughout the month, broken down by hour. Storing one terabyte of data for 30 days, two terabytes of data for 15 days, or three terabytes of data for 10 days, would each be the equivalent of one terabyte month.

### **Download Bandwidth**&#x20;

Download bandwidth is charged at $7 per terabyte, or $0.007 per gigabyte of bandwidth consumed. There is no charge for ingress bandwidth, so uploading files to the network doesn’t incur any cost.&#x20;

### Segments

With default usage limits, there is no per-segment fee. If you [request a usage limit increase](usage-limit-increases.md#per-segment-fee) for segments, you may be charged an additional fee.

### **Usage Limits**

[Usage Limits](../../concepts/limits.md) allow us to set boundaries on the amount of data users can upload to the Storj network and the amount of download bandwidth available to users. We have separate limits for storage and egress bandwidth per project on all Storj DCS Satellites. All limits are set to the Free Tier level until a method of payment is added. If you would like to increase your limits to higher values, you can always [contact our support team through the Storj DCS support portal.​](https://supportdcs.storj.io/hc/en-us/requests/new?ticket\_form\_id=360000683212)

Storage and bandwidth limits are imposed by most cloud infrastructure providers as a normal part of capacity planning and to ensure the achievement of SLAs. In distributed and decentralized storage systems they are equally important, if not more so. Just like any provider, the aggregate amount of available storage and bandwidth must be shared across all users. With a distributed and decentralized storage system like Storj, the storage and bandwidth are provided by a network of third parties running storage node software. One of the key drivers of the success of the Storj DCS service is the balance of supply and demand. If there are too many users over-utilizing available resources, the user experience will be poor.

Similarly, if there are too many storage nodes, there won’t be enough use to provide a meaningful ROI for Storage Node Operators. This can lead to storage node churn, increasing load on the network, and potentially impacting durability. Usage limits are one part of the toolkit that allows us to maintain the balance.

We introduced rate limits between the uplink and the satellite to ensure a good quality of service for all uplink users. Without the rate limit, it would be possible for users to inadvertently consume most of the database resources available on the satellite and cause issues for other users. The intention was to pick a default limit that would remain mostly unnoticed by end users (as the typical use case shouldn’t hit the limit).&#x20;

We also have usage limits for some other platform features or constructs, including projects, buckets and segments.\
\
Customers can request a usage limit increase when needed by filling out the [limit increase request form](https://supportdcs.storj.io/hc/en-us/requests/new?ticket\_form\_id=360000683212) on our Storj DCS support portal. Please only make such requests if your use case really requires more than the current default limits. Requests will be evaluated taking into account the intended use case and availability on the network.

Read more about [Usage Limits](../../concepts/limits.md) under Concepts.

{% content-ref url="billing-and-payment.md" %}
[billing-and-payment.md](billing-and-payment.md)
{% endcontent-ref %}

{% content-ref url="../storj-token/" %}
[storj-token](../storj-token/)
{% endcontent-ref %}
