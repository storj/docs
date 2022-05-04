---
description: >-
  The site of the Multipart Parts your application uploads can impact the
  performance and potentially the cost of your storage on Storj DCS.
---

# Multipart Part Size

{% hint style="info" %}
For best performance and cost with Storj DCS, you should plan to configure your AWS S3 client library to use a larger part size than standard. Not doing so could result in much higher fees.&#x20;

We recommend 64MB.
{% endhint %}

### Background

When an object is uploaded using Multipart Upload, a file is first broken into parts, each part of a Multipart Upload is also stored as one or more Segments. With Multipart Upload, a single object is uploaded as a set of parts.&#x20;

The ideal part size for large files is 64MB, so that there is one Segment per part. Using a smaller Part size will result in a significant increase in the number of segments stored on Storj DCS. At large scale, this could impact both the performance and cost of your storage.

Learn more about [how small Part sizes can impact your storage costs](../../../billing-payment-and-accounts-1/pricing/usage-limit-increases.md#per-segment-fee-calculation).

Each part is an integral portion of the data comprising the object. The object parts may be uploaded independently, in parallel, and in any order. Uploads may be paused and resumed by uploading an initial set of parts, then resuming and uploading the remaining parts. If the upload of any part fails, that part may be re-uploaded without impacting the upload of other parts.&#x20;

All of these parts are broken into one or more Segments by the Storj DCS Gateway based on whether the Part Size is smaller or larger than the default Segment size. While Multipart Upload is most appropriate for files larger than the 64MB default Segment size, the Part Size is configurable in applications that use Multipart Upload.&#x20;

### Configuration for the AWS CLI

If you are using the Amazon AWS CLI, you can configure it to use a larger part threshold as follows:

```
aws configure set default.s3.multipart_chunksize 64MB
```

