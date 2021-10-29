---
description: >-
  When you request limit increases to your Project Limits, you may incur
  additional costs for the increased usage.
---

# Usage Limit Increases

If the default Project Limits do not appear to be appropriate for your use case, you may request a [Project Limit Increase form](https://supportdcs.storj.io/hc/en-us/requests/new?ticket\_form\_id=360000683212). Increases in Project Limits may result in increased costs associated with your usage of Storj DCS.

## Free Tier

The Free Tier is not eligible for Project Limit Increases.

## Object Storage&#x20;

When you request an increase to the Object Storage Project Limit, there is no additional fee beyond the cost for any incremental Object Storage utilized on Storj DCS.

## Egress Bandwidth&#x20;

When you request an increase to the Egress Bandwidth Project Limit, there is no additional fee beyond the cost for any incremental Egress Bandwidth utilized on Storj DCS.

## Project, Bucket, and API Rate Limits

When you request an increase to the Project, Bucket, and API Rate Limits, there are no additional fees at this time. Before requesting Rate Limit Increases for Projects or Buckets, please review the [Key Architecture Constructs](../../concepts/key-architecture-constructs.md) section of this Documentation under Concepts.

## Per Segment Fee&#x20;

When you request an increase to the Per Segment Project Limit, you may be charged a Per Segment Fee for all Segments over the Segment Project Limit. For most users and most usage patterns, we do not expect a Per Segment Fee to be charged. Only when large numbers of segments are stored relative to a disproportionately small amount of data do we expect there to be a Per Segment Fee. Only use cases with large numbers of very small files or large numbers of very small Multipart Upload Parts are expected to be subject to the Per Segment Fee.

Distributed object storage is optimized for large files (several MB or larger in size - the larger the better). Very small objects generate more overhead due to storage of the metadata for the file. This matters more than the actual size of the object stored when it comes to overhead. Consequently, we charge a nominal Per Segment Fee to account for that overhead. If a user is storing even large numbers of big files, the per segment fee will be inconsequential. If a user streams millions of small files, or configures an application to use Multipart Upload with a small part size, the Per Segment Fee will offset the cost associated with the greater metadata overhead and may significantly increase the overall fees charged.

‌Data stored on Storj DCS ordinarily does not incur any additional fees other than fees for Static Object Storage and Download Bandwidth. If you receive an increase in your Segment Project Limit, a Per Segment Fee will be applied to data stored on Storj DCS for all Segments above the default Segment Limit. This section describes how the Per Segment Fee is charged.  The Per Segment fee is $0.0000088 Per Segment per Month.&#x20;

## Per Segment Fee Calculation

Each Segment stored on the network in excess of the default Segment Project Limit is charged a nominal Per Segment fee. The Per Segment Fee is $0.0000088 Per Segment Per Month. Distributed object storage is optimized for large files (several MB or larger - the larger the better). Very small objects generate more overhead with the storage of the metadata for the file than the actual storage of the object. Consequently, we charge a small Per Segment Fee to account for that overhead. If a user is storing even large numbers of big files, the Per Segment Fee will be inconsequential. If a user streams millions of small files, the Per Segment Fee will offset the cost associated with the metadata overhead.

The Storj DCS Platform distinguishes between two types of object storage: remote and inline. Remote objects are large enough to erasure code and store the pieces of the file on storage nodes. Inline objects are smaller than the metadata associated with the actual object. In the case of objects that are smaller than the associated metadata, it is more efficient to store the object inline in the satellite metadata database. When storing a large number of tiny files, the best practice is to employ a packing strategy to store larger blocks of small files as a single object.

The Per Segment Fee is priced per Segment per month in increments of Segment hours. The calculation of per segment fees is based on a standard 720-hour month. Actual Per Segment Fees are metered in Segments uploaded. Per Segment Fee hours are calculated based on the number of hours Segments are stored on the Storj DCS Platform from when a Segment is uploaded to when it is deleted. The number of hours each Segment is stored on the platform during the month then is multiplied by the Segment hour price. The segment hour price is derived from the Segment month price divided by the standard 720-hour month.

The Paid Tier includes 50,000 Segments per month, which is represented as 36,000,000 Segment Hours. Any increase in Segment Limit will be billed at a rate of $0.0000088 per Segment per month, equivalent to a rate of $0.00000001222 per Segment Hour &#x20;

As described elsewhere in this documentation, objects stored on Storj DCS are encrypted and erasure coded, with the encrypted, erasure coded pieces stored on various Storage Nodes on the distributed and decentralized network. Each object stored on the network is represented as at least one Segment.&#x20;

A Segment is a single array of bytes, between 0 and a user-configurable maximum segment size. The default Segment size on Storj DCS Satellites is 64MB.  A File smaller than 64MB is stored as one segment.  Files larger than 64MB are stored in multiple 64MB Segments.  Each Segment is stored as 80 pieces on the network. Only 29 Pieces of the 80 are required to reconstitute a Segment.  All Segments are required to reconstitute a File.&#x20;

**Examples:**

* A single 1MB file is one segment
* A single 10MB file is 1 Segment
* A single 64MB file is 1 Segment
* A single 256Mb file is four 64MB Segments
* A single 300MB file is 5 Segments (four 64MB Segments, and one 44MB Segment)
* A single 1GB file is sixteen 64MB Segments

**Important:** Sixteen 1MB files use the same amount of metadata resources as a 1GB file.

The Cost examples below assume a Segment Limit Increase has been applied to a project and the Segment Project Limit is sufficient to provide for the usage as described. There is no charge for the first 50,000 Segments per month.

**Cost Example 1:**

A user uploads 100,000 one GB files, a total of 100TB. Half way through the month, the user deletes the files. The 100,000 files are stored as 1,600,000 Segments. The files are stored for 360 hours. The files are stored for 576,000,000 Segment hours. The default 36,000,000 Segment Hours for the Paid Tier are subtracted, leaving 540,000,000 Segment Hours. The price per Segment month is $0.0000088. The price per Segment hour at 720 hours per month is $0.00000001222. The total amount charged for the monthly Per Segment Fee would be $5.40.

**Cost Example 2:**

A user uploads 1,600,000 one MB files, a total of 1.6TB. Half way through the month, the user deletes the files. The 1,600,000 files are stored as 1,600,000 Segments. The files are stored for 360 hours. The files are stored for 576,000,000 Segment hours. The default 36,000,000 Segment Hours for the Paid Tier are subtracted, leaving 540,000,000 Segment Hours. The price per Segment month is $0.0000088. The price per Segment hour at 720 hours per month is $0.00000001222. The total amount charged for the per segment fee would be $5.40.&#x20;

Note that the number of segments  for 100TB of 1GB files and 1.6TB of 1MB files is the same.&#x20;

### Multipart Upload Impact on Segments

When an object is uploaded using Multipart Upload, a file is first broken into parts, each part of a Multipart Upload is also stored as one or more Segments. With Multipart Upload, a single object is uploaded as a set of parts. Each part is an integral portion of the data comprising the object. The object parts may be uploaded independently, in parallel, and in any order. Uploads may be paused and resumed by uploading an initial set of parts, then resuming and uploading the remaining parts. If the upload of any part fails, that part may be re-uploaded without impacting the upload of other parts. All of these parts are broken into one or more Segments by the Storj DCS Gateway based on whether the Part Size is smaller or larger than the default Segment size. While Multipart Upload is most appropriate for files larger than the 64MB default Segment size, the Part Size is configurable in applications that use Multipart Upload.&#x20;

**Examples:**

A single 128MB file using a 64MB Part Size is uploaded as 2 parts, with each part stored as one 64MB Segment

A single 128MB file using a 5MB Part Size is uploaded as 26 Parts (25 5MB Parts and one 3MB Part), with each part stored as one Segment, for a total of 26 Segments.

The default Part Size for Multipart Upload for some applications is 5MB. The difference between using the default 5MB Part Size instead of the default size of 64MB for Storj DCS is impactful.

Assuming a 1TB data set comprised of 1,000 1GB files is stored for an entire month, the difference between using 64MB Part Size vs. 5MB Part Size is described below:

| Part Size | Files | Parts/ S | Segment Hours | Chargeable Segment Hours | Monthly Cost of Per Segment Fee | Monthly cost of storage  |
| --------- | ----- | -------- | ------------- | ------------------------ | ------------------------------- | ------------------------ |
| 64MB      | 1,000 | 15,625   | 11.25M        | 0M                       | $0.00                           | $4.00                    |
| 5MB       | 1,000 | 200,000  | 144.0M        | 108.0M                   | $1.32                           | $5.32                    |

**Multipart Cost Example 1:**

A user uploads 100,000 one GB objects using multipart upload with a 64MB Part Size and 10,000 100MB objects using a 5MB Part Size. Half way through the month, the user deletes the files. The 100,000 one GB files are stored as 1,562,500 Segments. The 10,000 100MB files are stored as 200,000 Segments. The files are stored for 360 hours. The 100,000 one GB files in 64MB Segments are stored for 562,500,000 Segment hours. The 10,000 100 MB files in 5MB Segments are stored for 72,000,000 Segment hours. The total is 634,500,000 Segment Hours. The default 36,000,000 Segment Hours for the Paid Tier are subtracted, leaving 598,500,000 Segment Hours. The monthly Per Segment fee is $7.31.

**Multipart Cost Example 2:**

A user uploads 1PB of one GB objects using multipart upload with a 5MB Part Size . Half way through the month, the user deletes the files. The 1PB of one GB files (1 million files) are stored as 200,000,000 Segments. The files are stored for 360 hours. The data is stored for 72,000,000,000 Segment hours.  The price per Segment month is $0.0000088. The price per Segment hour at 720 hours per month is $0.00000001222. The monthly Per Segment Fee in this example would be $879.40.
