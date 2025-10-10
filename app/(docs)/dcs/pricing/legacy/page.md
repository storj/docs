---
title: "Storage: Legacy Pricing"
hideTitle: true
docId: x3xPZJXCp!CB@spN
weight: 1
metadata:
  title: Object Storage Legacy Pricing
  description:
    Information on Storj's legacy pricing model for distributed cloud object storage.
---

# Object Storage: Legacy Pricing

## Overview

Storj's Object Storage Legacy Pricing Model charges fees based on three types of metered services: 
- Object Storage
- Egress Bandwidth
- Segments

| **Service Type** | **Metered Units** | **Billed Increment** | **Pricing Unit** | **Pricing** | **Description** |
| :---------- | :---------------- | :------------ | :--------------- | :---------- | :-------------- |
| **Object Storage**   | Bytes     | GB Hour      | GB Month      | $0.004 per GB Month          | Storage is calculated based on bytes uploaded, including encryption-based overhead. |
| **Egress Bandwidth** | Bytes     | GB           | Total Volume  | $0.007 per GB                | Bandwidth is calculated based on bytes downloaded, including long-tail elimination-related bandwidth. |
| **Segments**         | Segments  | Segment Hour | Segment Month | $0.0000088 per Segment Month | Segment usage depends on storage and file sizes. The default minimum size per segment is 64MB. |

For object storage, billing is aggregated at the **project** level. Within a project, usage is tracked at the bucket level and aggregated for invoicing to the project.

The following sections describe how charges are calculated for each type of service.


## Object Storage Fees

Object storage is priced per GB per month.

**Simple example:**

A 1 TB file, stored for a full month, would cost approximately $4.00.

- **Calculation** = Size x Time Stored x Price
- **Price** = 1,000 Mb x 1 Month x $0.004 = $4.00

In actuality, the Storj platform tracks things in much finer detail: calculating size using the actual bytes uploaded and calculating time based on hours stored in the Platform.

- **Bytes uploaded** include the bytes associated with actual objects, plus any nominal overhead associated with encryption. For example, a 1 TB file, after encryption, might actually consume 1,001 GB of storage.

- **Byte hours** are calculated based on the number of hours bytes are stored on the Platform: from the time when an object is uploaded to when it is deleted. Storj uses a standardized 720-hour month (30 days x 24 hours) and byte hours are measured in 1 hour increments.

**Note:** Storj uses simple base 10 conversion to convert between Bytes, GB, TB, etc. 

Example: 1 TB = 1,000 GB = 1,000,000 Bytes.


## Egress Bandwidth Fees

Egress Bandwidth, also referred to as Download Bandwidth, is priced per GB. All data that is transferred is billed as Egress Bandwidth. Egress Bandwidth is measured in increments of bytes. 

**Note:** When an object is downloaded, there are a number of factors that can impact the actual amount of bandwidth used:

- Storj's file retrieval process includes requests for pieces from _more_ than the minimum number of storage nodes required. While only a subset of pieces are necessary to reconstitute an object, in order to avoid potential long-tail performance lag from a single slow storage node, the Storj Platform will request retrieval from a few additional storage nodes. The Platform will terminate all incomplete downloads once the required quantity of pieces are successfully downloaded and the object can be completely re-encoded. (For more detail, review our [Product Overview](docId:2npG1YD8Y7JH9UiENkMqR#what-happens-when-you-upload).)

- In addition, if a user terminates a download before completion, the amount of data transferred might exceed the amount of data that the customer's application receives. This may create minor discrepancies between the total size of downloaded files vs. the actual bandwidth consumed to retrieve those files.

**Example:**

A user downloads a single 1 TB file. To improve performance (and eliminate long-tail lag), up to 1.3 TB of download bandwidth may be used.

- **Calculation** = Size x Price
- **Price** = 1,300 Mb x $0.007 = $9.10.

**Note:** If you ever decide the Storj Platform is no longer the best fit for your company and you wish to extract your data and move to another provider, contact us (submit a ticket on our [support portal](https://supportdcs.storj.io/)). 

We can assist with the migration and, by following this process, the Egress fees associated with your migration can be waived.


## Segment Fees

Storj's distributed object storage is optimized for large files &mdash; those that are many MB or larger. On the other end of the spectrum, very small files can actually generate more storage overhead (to maintain the file's metadata) than for the file itself. 

Consequently, Storj charges a small fee "Per Segment" to better accommodate small-file overhead. If a user is storing mostly large files, the segment fee will be inconsequential. The segment fee is priced per segment per month, in increments of segment hours. The calculation of segment fees is based on a standard 720-hour month (30 days x 24 hours).

The default segment size on Storj Satellites is 64MB (but is configurable).

Any file smaller than 64MB (by default) is stored as one segment. Files larger than 64MB are stored in multiple 64MB segments. Each segment is stored as pieces on the network. Only a subset of pieces of the total (e.g.: 29 of the 80) are required to reconstitute any given segment. All segments are required to reconstitute a file.

### File Size and Segment Consumption

Using the default segment size of 64 MB:

| **File Qty. & Size** | **Will Consume** |
| :------------------- | :--------------- |
| A single 1 MB file   | One segment |
| A single 10 MB file  | One segment |
| A single 64 MB file  | One segment |
| A single 256 Mb file | Four segments (four 64 MB segments) |
| A single 300 MB file | Five segments (four 64 MB segments plus one more for the remaining 44 MB) |
| A single 1 GB file   | Sixteen 64 MB segments |

**Note:** Every object stored on the Storj network is represented by _at least_ one segment.

**Note:** Be aware that sixteen 1 MB files use the same amount of metadata resources as a 1 GB file.

### Segment Cost Examples

**Note:** The examples below assume a Segment Limit increase has been applied to a project. Contact Storj Support for assistance with Segment Limit increases. 

**Example - Large Files:** 

A user uploads 100,000 files, each with a size of one GB, for a total of 100 TB. Each 1 GB file consumes sixteen 64MB segments, so the 100,000 files are stored as 1,600,000 segments. 

Halfway through the month, the user deletes the files. 

- **Calculation** = Segments x Time Stored x Price
- **Price** = 1.6M Segments x 1/2 Month x $0.0000088 = $7.04

**Example - Small Files:**

A user uploads 1,600,000 files, each with a size of just one MB, for a total of 1,600 GB (1.6 TB). The 1,600,000 files are stored as 1,600,000 segments. 

Halfway through the month, the user deletes the files. 

- **Calculation** = Segments x Time Stored x Price
- **Price** = 1.6M Segments x 1/2 Month x $0.0000088 = $7.04

**Take Note:** The Segment Fees for storing just 1.6 TB of small files *is the same* as for storing 100 TB of large files!

### Additional Object Details

The Storj Platform distinguishes between two types of objects: **Remote** and **Inline** objects.

- **Remote objects** are files _large_ enough to slice, erasure-code, and then store the many pieces of the file across multiple (up to 80) storage nodes.

- **Inline objects** are those _small_ files where the file itself is smaller than the metadata associated with it. To improve efficiency, the Storj Platform stores these small objects "inline" in the satellite metadata database. 

_**Tip:** If needing to store a large number of small files, a best practice is to employ a packing strategy (e.g.: .zip, .rar, archive, etc.) to combine the many small files into one or more larger files before uploading._


## Project Limits

All Projects have Project Limits on certain important constructs. Increases in Project Limits may impact the price of your use of Storj. To learn more, check out the [](docId:Zrbz4XYhIOm99hhRShWHg) and [](docId:A4kUGYhfgGbVhlQ2ZHXVS) sections of the documentation.


## Additional Pricing Notes

Storj has a $5 minimum monthly usage fee for all object storage accounts.

This helps cover the cost of payment processing and basic operations so we can continue offering fast, secure, and reliable storage &mdash; even for small accounts.

**What does this mean for you?**

- Any monthly usage that results in an invoice less than $5 will result in the minimum usage fee.
- If your usage exceeds $5 per month, you will not be charged a minimum usage fee.
- If you bought a starter package via a partner before August 1, 2025, you will not be charged a minimum usage fee until your starter package expires. The starter package expires one year from purchase or when the starter package credits have been fully used.
- If you pay with STORJ token, you will not be charged a minimum usage fee.
