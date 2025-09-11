---
title: Pricing
docId: 59T_2l7c1rvZVhI8p91VX
redirects:
  - /dcs/billing-payment-and-accounts-1/pricing
  - /dcs/billing-payment-and-accounts-1/pricing/free-tier
metadata:
  title: Understanding Storj Pricing Structure
  description:
    Guides users on Storj's cost and billing system, explaining different
    metered services like object storage, egress bandwidth, segments, and their respective
    prices.
---

The price for Active Archive object storage begins at $6.00 per TB per month, with $20.00 per TB for egress. The price for Global Collaboration is $15 per TB with 1X egress included.

The following example table lists the types of metered services that appear in billing and usage user interfaces as well as invoices:

| **Metered Service Type** | **Metered Units** | **Increment** | **Pricing Unit** | **Price per Pricing Unit**   | **Description**                                                                                                                |
| :----------------------- | :---------------- | :------------ | :--------------- | :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| Active Archive           | Bytes             | GB Hour       | GB Month         | $0.006 per GB Month          | Storage is calculated based on bytes uploaded, including any encryption-based overhead                                         |
| Egress Bandwidth         | Bytes             | GB            | Total Volume     | $0.20 per GB                | Bandwidth related to object downloads calculated on bytes downloaded including long tail elimination-related bandwidth         |

Billing is aggregated at the project level. A project is the Storj service construct used for aggregating usage, calculating billing, invoicing fees, and collecting payment. Billing on a project begins when a user upgrades to a pro account (even if their free trial has not ended). Projects are created by a single user, then multiple users may be added to a project team, and one user may be on more than one project. Within a project, usage is tracked at the bucket level and aggregated for invoicing to the project. Project names are not client-side encrypted so that they may be rendered in the satellite user interface. For more information about Developer Accounts, Projects, Buckets, etc., please read [](docId:M-5oxBinC6J1D-qSNjKYS).

The following section describes how the charges listed in the table above are calculated to provide users detailed insights into their cloud storage usage, broken down by storage, egress bandwidth, and number of objects. Note that for billing purposes, usage data is continuously rolled up and aggregated. Billing data is not displayed in real-time in the satellite interface and some time lag should be expected.

## Object Storage

Object storage is priced per GB per month in increments of byte hours. The calculation of object storage fees is based on a standard 720-hour month. Actual storage is metered in bytes uploaded. Bytes uploaded include the bytes associated with actual objects plus any nominal overhead associated with encryption. Byte hours are calculated based on the number of hours bytes are stored on the Storj Platform from when an object is uploaded to when it is deleted. The calculated number of bytes is then multiplied by the byte hour price. The byte hour price is derived from the GB month price divided by the standard 720-hour month and base 10 conversion of GB to bytes.

**Example**

A user uploads a 1TB file. Half way through the month, the user deletes the file. With encryption overhead, the file is stored as 1.001TB. The 1.001TB is accounted for as 1,001,000,000,000 bytes. The file is stored for 360 hours. The file is stored for 360,360,000,000,000 byte hours. In this example, the price per GB month is $0.004 and per GB hour is $0.000005556. The price per byte hour is $0.000000000000005556. The total amount charged for the storage is $2.00.

## Bandwidth Fee

Download bandwidth, also referred to as egress bandwidth, is priced per GB in increments of bytes downloaded. The calculation of download bandwidth price per byte is derived from the GB download bandwidth divided by the base 10 conversion of GB to bytes. The calculated number of bytes is then multiplied by the byte download bandwidth per byte price.

When an object is downloaded, there are a number of factors that can impact the actual amount of bandwidth used. The download process includes requests for pieces from more than the minimum number of storage nodes required. While only a subset of pieces out of total are required to reconstitute an object, in order to avoid potential long-tail performance lag from a single storage node, uplink will try to retrieve an object from additional storage nodes. Uplink will terminate all incomplete downloads in process once the required pieces are successfully downloaded and the object can be re-encoded. For example, we may need 29 of the 80 pieces we uploaded. In addition, if a user terminates a download before completion, the amount of data that is transferred might exceed the amount of data that the customer’s application receives. This discrepancy can occur because a transfer termination request cannot be executed instantaneously, and some amount of data might be in transit pending execution of the termination request. This data that was transferred is billed as data download bandwidth.

**Example**

A user downloads one 1 TB file. Based on the long tail elimination, up to 1.3 TB of download bandwidth may be used. The 1.3 TB of download bandwidth is accounted for as 1,300,000,000 bytes. In this example, the price per GB is $0.007 and per byte is $0.000000045. The total amount charged for the egress is $9.10.

Unlike other cloud object storage vendors, we don't use high egress fees to create vendor lock-in. If you discover that Storj isn't a fit for your project or application and you transfer your data to another service, use our support portal to submit a ticket and let us know. As long as you follow the process, we won't charge you for that egress bandwidth.

The Storj Platform distinguishes between two types of object storage: remote and inline. Remote objects are large enough to erasure code and store the pieces of the file on storage nodes. Inline objects are smaller than the metadata associated with the actual object. In the case of objects that are smaller than the associated metadata, it is more efficient to store the object inline in the satellite metadata database. When storing a large number of tiny files, the best practice is to employ a packing strategy to store larger blocks of small files as a single object.

As described elsewhere in this documentation, objects stored on Storj are encrypted and erasure coded, with the encrypted, erasure-coded pieces stored on various Storage Nodes on the distributed and decentralized network. Each object stored on the network is represented as at least one Segment. 

## Minimum Monthly Billing

Storj has a **$5 minimum monthly usage fee**.

This helps cover the cost of payment processing and basic operations so we can continue offering fast, secure, and reliable storage—even for small accounts.

### What does this mean for you?

- Any monthly usage that results in an invoice less than $5 will result in the minimum usage fee.
- If your usage exceeds $5 per month, you will not be charged a minimum usage fee.
- If you bought a starter package via a partner before August 1, 2025, you will not be charged a minimum usage fee until your starter package expires. The starter package expires one year from purchase or when the starter package credits have been fully used.
- If you pay with STORJ token, you will not be charged a minimum usage fee.

## Project limits

All Projects have Project Limits on certain important constructs. Increases in Project Limits may impact the price of your use of Storj. To learn more, check out the [](docId:Zrbz4XYhIOm99hhRShWHg) and [](docId:A4kUGYhfgGbVhlQ2ZHXVS) sections of this Documentation.
