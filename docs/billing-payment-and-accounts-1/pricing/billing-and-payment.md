---
description: How Billing & Payment works on Storj DCS
---

# How Billing is Calculated

Billing is aggregated at the project level.  A project is the Storj DCS service construct used for aggregating usage, calculating billing, invoicing fees, and collecting payment. Projects are created by a single user, then multiple users may be added to a project team, and one user may be on more than one project. Within a project, usage is tracked at the bucket level and aggregated for invoicing to the project. Project names are not client-side encrypted so that they may be rendered in the satellite user interface. For more information about Developer Accounts, Projects, Buckets, etc., please read the [Key Architecture Constructs](../../concepts/key-architecture-constructs.md) under the Concepts section of this Documentation.

The following table lists the types of metered services that appear in billing and usage user interfaces as well as invoices:\


| **Metered Service  Type** | **Metered Units** | **Increment** | **Pricing Unit** | **Price per Pricing Unit** | **Description**                                                                                                        |
| ------------------------- | ----------------- | ------------- | ---------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Object Storage            | Bytes             | GB Hour       | GB Month         | $0.004 per GB Month        | Storage is calculated based on bytes uploaded, including any encryption-based overhead                                 |
| Egress Bandwidth          | Bytes             | GB            | Total Volume     | $0.007 per GB              | Bandwidth related to object downloads calculated on bytes downloaded including long tail elimination-related bandwidth |

The following section describes how the charges listed in the table above are calculated to provide users detailed insights into their cloud storage usage, broken down by storage, egress bandwidth, and number of objects. Note that for billing purposes, usage data is continuously rolled up and aggregated. Billing data is not displayed in real-time in the satellite interface and some time lag should be expected.

## **Object Storage**

Object storage is priced per GB per month in increments of byte hours. The calculation of object storage fees is based on a standard 720-hour month. Actual storage is metered in bytes uploaded. Bytes uploaded include the bytes associated with actual objects plus any nominal overhead associated with encryption. Byte hours are calculated based on the number of hours bytes are stored on the Storj DCS Platform from when an object is uploaded to when it is deleted. The calculated number of bytes is then multiplied by the byte hour price. The byte hour price is derived from the GB month price divided by the standard 720-hour month and base 10 conversion of GB to bytes.\
****

**Example**

A user uploads a 1TB file. Half way through the month, the user deletes the file. With encryption overhead, the file is stored as 1.001TB. The 1.001TB is accounted for as 1,001,000,000,000 bytes. The file is stored for 360 hours. The file is stored for 360,360,000,000,000 byte hours. The price per GB month is $0.004. The price per GB hour is $0.000005556. The price per byte hour is $0.000000000000005556. The total amount charged for the storage is $2.00.

## **Bandwidth Fee**

Download bandwidth, also referred to as egress bandwidth, is priced per GB in increments of bytes downloaded. The calculation of download bandwidth price per byte is derived from the GB download bandwidth divided by the base 10 conversion of GB to bytes. The calculated number of bytes is then multiplied by the byte download bandwidth per byte price.&#x20;

When an object is downloaded, there are a number of factors that can impact the actual amount of bandwidth used. The download process includes requests for pieces from more than the minimum number of storage nodes required. While only 29 pieces out of 80 are required to reconstitute an object, in order to avoid potential long-tail performance lag from a single storage node, an Uplink will try to retrieve an object from 39 storage nodes.  The Uplink will terminate all incomplete downloads in process once 29 pieces are successfully downloaded and the object can be re-encoded. In addition, if a user terminates a download before completion, the amount of data that is transferred might exceed the amount of data that the customer’s application receives. This discrepancy can occur because a transfer termination request cannot be executed instantaneously, and some amount of data might be in transit pending execution of the termination request. This data that was transferred is billed as data download bandwidth.&#x20;

**Example**

A user downloads one 1 TB file. Based on the long tail elimination, up to 1.3 TB of download bandwidth may be used. The 1.3 TB of download bandwidth is accounted for as 1,300,000,000 bytes. The price per GB is $0.007. The price per byte is $0.000000045. The total amount charged for the egress is $9.10.

Unlike other cloud object storage vendors, we don't use high egress fees to create vendor lock-in.  If you discover that Storj DCS isn't a fit for your project or application and you transfer your data to another service, use our support portal to submit a ticket and let us know. As long as you follow the process, we won't charge you for that egress bandwidth. &#x20;

All Projects have Project Limits on certain important constructs. Increases in Project Limits may impact the price of your use of Storj DCS. To learn more, check out the [Project Limits](../../concepts/limits.md) and [Usage Limit Increases](usage-limit-increases.md) sections of this Documentation\
