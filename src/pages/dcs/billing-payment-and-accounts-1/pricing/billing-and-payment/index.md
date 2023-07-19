---
title: How Billing is Calculated
slug: billing-payment-and-accounts-1/pricing/billing-and-payment
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-04-21T02:54:57.000Z
docId: 59T_2l7c1rvZVhI8p91VX
---

Billing is aggregated at the project level.  A project is the Storj DCS service construct used for aggregating usage, calculating billing, invoicing fees, and collecting payment. Projects are created by a single user, then multiple users may be added to a project team, and one user may be on more than one project. Within a project, usage is tracked at the bucket level and aggregated for invoicing to the project. Project names are not client-side encrypted so that they may be rendered in the satellite user interface. For more information about Developer Accounts, Projects, Buckets, etc., please read the [](docId\:M-5oxBinC6J1D-qSNjKYS) under the Concepts section of this Documentation.

The following table lists the types of metered services that appear in billing and usage user interfaces as well as invoices:

| **Metered Service  Type** | **Metered Units** | **Increment** | **Pricing Unit** | **Price per Pricing Unit**   | **Description**                                                                                                                |
| :------------------------ | :---------------- | :------------ | :--------------- | :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| Object Storage            | Bytes             | GB Hour       | GB Month         | $0.004 per GB Month          | Storage is calculated based on bytes uploaded, including any encryption-based overhead                                         |
| Egress Bandwidth          | Bytes             | GB            | Total Volume     | $0.007 per GB                | Bandwidth related to object downloads calculated on bytes downloaded including long tail elimination-related bandwidth         |
| Segments                  | Segments          | Segment Hour  | Segment Month    | $0.0000088 per Segment Month | Segments usage depends on Storage. The default size for the Segment is 64MB (or less), i.e. smaller objects uses more Segments |

The following section describes how the charges listed in the table above are calculated to provide users detailed insights into their cloud storage usage, broken down by storage, egress bandwidth, and number of objects. Note that for billing purposes, usage data is continuously rolled up and aggregated. Billing data is not displayed in real-time in the satellite interface and some time lag should be expected.

## Object Storage

Object storage is priced per GB per month in increments of byte hours. The calculation of object storage fees is based on a standard 720-hour month. Actual storage is metered in bytes uploaded. Bytes uploaded include the bytes associated with actual objects plus any nominal overhead associated with encryption. Byte hours are calculated based on the number of hours bytes are stored on the Storj DCS Platform from when an object is uploaded to when it is deleted. The calculated number of bytes is then multiplied by the byte hour price. The byte hour price is derived from the GB month price divided by the standard 720-hour month and base 10 conversion of GB to bytes.

**Example**

A user uploads a 1TB file. Half way through the month, the user deletes the file. With encryption overhead, the file is stored as 1.001TB. The 1.001TB is accounted for as 1,001,000,000,000 bytes. The file is stored for 360 hours. The file is stored for 360,360,000,000,000 byte hours. The price per GB month is $0.004. The price per GB hour is $0.000005556. The price per byte hour is $0.000000000000005556. The total amount charged for the storage is $2.00.

## Bandwidth Fee

Download bandwidth, also referred to as egress bandwidth, is priced per GB in increments of bytes downloaded. The calculation of download bandwidth price per byte is derived from the GB download bandwidth divided by the base 10 conversion of GB to bytes. The calculated number of bytes is then multiplied by the byte download bandwidth per byte price.&#x20;

When an object is downloaded, there are a number of factors that can impact the actual amount of bandwidth used. The download process includes requests for pieces from more than the minimum number of storage nodes required. While only 29 pieces out of 80 are required to reconstitute an object, in order to avoid potential long-tail performance lag from a single storage node, an Uplink will try to retrieve an object from 39 storage nodes.  The Uplink will terminate all incomplete downloads in process once 29 pieces are successfully downloaded and the object can be re-encoded. In addition, if a user terminates a download before completion, the amount of data that is transferred might exceed the amount of data that the customer’s application receives. This discrepancy can occur because a transfer termination request cannot be executed instantaneously, and some amount of data might be in transit pending execution of the termination request. This data that was transferred is billed as data download bandwidth.&#x20;

**Example**

A user downloads one 1 TB file. Based on the long tail elimination, up to 1.3 TB of download bandwidth may be used. The 1.3 TB of download bandwidth is accounted for as 1,300,000,000 bytes. The price per GB is $0.007. The price per byte is $0.000000045. The total amount charged for the egress is $9.10.

Unlike other cloud object storage vendors, we don't use high egress fees to create vendor lock-in.  If you discover that Storj DCS isn't a fit for your project or application and you transfer your data to another service, use our support portal to submit a ticket and let us know. As long as you follow the process, we won't charge you for that egress bandwidth.

## Per Segment Fee

For most users and most usage patterns, we do not expect a Per Segment Fee to be charged. Only when large numbers of segments are stored relative to a disproportionately small amount of data do we expect there to be a Per Segment Fee. Only use cases with large numbers of very small files or large numbers of very small Multipart Upload Parts are expected to be subject to the Per Segment Fee.

Each Segment stored on the network in excess of the default Segment Project Limit is charged a nominal Per Segment fee. The Per Segment Fee is $0.0000088 Per Segment Per Month. Distributed object storage is optimized for large files (several MB or larger - the larger the better). Very small objects generate more overhead with the storage of the metadata for the file than the actual storage of the object. Consequently, we charge a small Per Segment Fee to account for that overhead. If a user is storing even large numbers of big files, the Per Segment Fee will be inconsequential. If a user streams millions of small files, the Per Segment Fee will offset the cost associated with the metadata overhead.

The Paid Tier includes 50,000 Segments per month, which is represented as 36,000,000 Segment Hours. Any increase in Segment Limit will be billed at a rate of $0.0000088 per Segment per month, equivalent to a rate of $0.00000001222 per Segment Hour.

The Storj DCS Platform distinguishes between two types of object storage: remote and inline. Remote objects are large enough to erasure code and store the pieces of the file on storage nodes. Inline objects are smaller than the metadata associated with the actual object. In the case of objects that are smaller than the associated metadata, it is more efficient to store the object inline in the satellite metadata database. When storing a large number of tiny files, the best practice is to employ a packing strategy to store larger blocks of small files as a single object.

The Per Segment Fee is priced per Segment per month in increments of Segment hours. The calculation of per segment fees is based on a standard 720-hour month. Actual Per Segment Fees are metered in Segments uploaded. Per Segment Fee hours are calculated based on the number of hours Segments are stored on the Storj DCS Platform from when a Segment is uploaded to when it is deleted. The number of hours each Segment is stored on the platform during the month then is multiplied by the Segment hour price. The segment hour price is derived from the Segment month price divided by the standard 720-hour month.

As described elsewhere in this documentation, objects stored on Storj DCS are encrypted and erasure coded, with the encrypted, erasure coded pieces stored on various Storage Nodes on the distributed and decentralized network. Each object stored on the network is represented as at least one Segment.&#x20;

A Segment is a single array of bytes, between 0 and a user-configurable maximum segment size. The default Segment size on Storj DCS Satellites is 64MB.  A File smaller than 64MB is stored as one segment.  Files larger than 64MB are stored in multiple 64MB Segments.  Each Segment is stored as 80 pieces on the network. Only 29 Pieces of the 80 are required to reconstitute a Segment.  All Segments are required to reconstitute a File.&#x20;

**Examples:**

*   A single 1MB file is one segment

*   A single 10MB file is 1 Segment

*   A single 64MB file is 1 Segment

*   A single 256Mb file is four 64MB Segments

*   A single 300MB file is 5 Segments (four 64MB Segments, and one 44MB Segment)

*   A single 1GB file is sixteen 64MB Segments

**Important:** Sixteen 1MB files use the same amount of metadata resources as a 1GB file.

The Cost examples below assume a Segment Limit Increase has been applied to a project and the Segment Project Limit is sufficient to provide for the usage as described. There is no charge for the first 50,000 Segments per month.

**Cost Example 1:**

A user uploads 100,000 one GB files, a total of 100TB. Half way through the month, the user deletes the files. The 100,000 files are stored as 1,600,000 Segments. The files are stored for 360 hours. The files are stored for 576,000,000 Segment hours. The default 36,000,000 Segment Hours for the Paid Tier are subtracted, leaving 540,000,000 Segment Hours. The price per Segment month is $0.0000088. The price per Segment hour at 720 hours per month is $0.00000001222. The total amount charged for the monthly Per Segment Fee would be $5.40.

**Cost Example 2:**

A user uploads 1,600,000 one MB files, a total of 1.6TB. Half way through the month, the user deletes the files. The 1,600,000 files are stored as 1,600,000 Segments. The files are stored for 360 hours. The files are stored for 576,000,000 Segment hours. The default 36,000,000 Segment Hours for the Paid Tier are subtracted, leaving 540,000,000 Segment Hours. The price per Segment month is $0.0000088. The price per Segment hour at 720 hours per month is $0.00000001222. The total amount charged for the per segment fee would be $5.40.&#x20;

Note that the number of segments  for 100TB of 1GB files and 1.6TB of 1MB files is the same.&#x20;

## Multipart Upload Impact on Segments

When an object is uploaded using Multipart Upload, a file is first broken into parts, each part of a Multipart Upload is also stored as one or more Segments. With Multipart Upload, a single object is uploaded as a set of parts. Each part is an integral portion of the data comprising the object. The object parts may be uploaded independently, in parallel, and in any order. Uploads may be paused and resumed by uploading an initial set of parts, then resuming and uploading the remaining parts. If the upload of any part fails, that part may be re-uploaded without impacting the upload of other parts. All of these parts are broken into one or more Segments by the Storj DCS Gateway based on whether the Part Size is smaller or larger than the default Segment size. While Multipart Upload is most appropriate for files larger than the 64MB default Segment size, the Part Size is configurable in applications that use Multipart Upload.&#x20;

**Examples:**

A single 128MB file using a 64MB Part Size is uploaded as 2 parts, with each part stored as one 64MB Segment

A single 128MB file using a 5MB Part Size is uploaded as 26 Parts (25 5MB Parts and one 3MB Part), with each part stored as one Segment, for a total of 26 Segments.

The default Part Size for Multipart Upload for some applications is 5MB. The difference between using the default 5MB Part Size instead of the default size of 64MB for Storj DCS is impactful.

Assuming a 1TB data set comprised of 1,000 1GB files is stored for an entire month, the difference between using 64MB Part Size vs. 5MB Part Size is described below:

| Part Size | Files | Parts/ S | Segment Hours | Chargeable Segment Hours | Monthly Cost of Per Segment Fee | Monthly cost of storage |
| :-------- | :---- | :------- | :------------ | :----------------------- | :------------------------------ | :---------------------- |
| 64MB      | 1,000 | 15,625   | 11.25M        | 0M                       | $0.00                           | $4.00                   |
| 5MB       | 1,000 | 200,000  | 144.0M        | 108.0M                   | $1.32                           | $5.32                   |

**Multipart Cost Example 1:**

A user uploads 100,000 one GB objects using multipart upload with a 64MB Part Size and 10,000 100MB objects using a 5MB Part Size. Half way through the month, the user deletes the files. The 100,000 one GB files are stored as 1,562,500 Segments. The 10,000 100MB files are stored as 200,000 Segments. The files are stored for 360 hours. The 100,000 one GB files in 64MB Segments are stored for 562,500,000 Segment hours. The 10,000 100 MB files in 5MB Segments are stored for 72,000,000 Segment hours. The total is 634,500,000 Segment Hours. The default 36,000,000 Segment Hours for the Paid Tier are subtracted, leaving 598,500,000 Segment Hours. The monthly Per Segment fee is $7.31.

**Multipart Cost Example 2:**

A user uploads 1PB of one GB objects using multipart upload with a 5MB Part Size . Half way through the month, the user deletes the files. The 1PB of one GB files (1 million files) are stored as 200,000,000 Segments. The files are stored for 360 hours. The data is stored for 72,000,000,000 Segment hours.  The price per Segment month is $0.0000088. The price per Segment hour at 720 hours per month is $0.00000001222. The monthly Per Segment Fee in this example would be $879.40.

## Project limits

All Projects have Project Limits on certain important constructs. Increases in Project Limits may impact the price of your use of Storj DCS. To learn more, check out the [](docId\:Zrbz4XYhIOm99hhRShWHg) and [](docId\:A4kUGYhfgGbVhlQ2ZHXVS) sections of this Documentation.

