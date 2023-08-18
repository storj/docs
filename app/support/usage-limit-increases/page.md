---
title: Usage Limit Increases
docId: A4kUGYhfgGbVhlQ2ZHXVS
weight: 25
redirects:
  - /dcs/billing-payment-and-accounts-1/pricing/usage-limit-increases
---

If the default Project Limits do not appear to be appropriate for your use case, you may request a [Project Limit Increase form](https://supportdcs.storj.io/hc/en-us/requests/new?ticket_form_id=360000683212). Increases in Project Limits may result in increased costs associated with your usage of Storj DCS.

## Free Plan

The Free Tier is not eligible for Project Limit Increases.

## Object Storage&#x20;

When you request an increase to the Object Storage Project Limit, there is no additional fee beyond the cost for any incremental Object Storage utilized on Storj DCS.

## Egress Bandwidth&#x20;

When you request an increase to the Egress Bandwidth Project Limit, there is no additional fee beyond the cost for any incremental Egress Bandwidth utilized on Storj DCS.

## Project, Bucket, and API Rate Limits

When you request an increase to the Project, Bucket, and API Rate Limits, there are no additional fees at this time. Before requesting Rate Limit Increases for Projects or Buckets, please review the [](docId:M-5oxBinC6J1D-qSNjKYS) section of this Documentation under Concepts.

## Segment Limit

When you request an increase to the Per Segment Project Limit, you may be charged a Per Segment Fee for all Segments over the Segment Project Limit.

Distributed object storage is optimized for large files (several MB or larger in size - the larger the better). Very small objects generate more overhead due to storage of the metadata for the file. This matters more than the actual size of the object stored when it comes to overhead. Consequently, we charge a nominal Per Segment Fee to account for that overhead. If a user is storing even large numbers of big files, the per segment fee will be inconsequential. If a user streams millions of small files, or configures an application to use Multipart Upload with a small part size, the Per Segment Fee will offset the cost associated with the greater metadata overhead and may significantly increase the overall fees charged.

Data stored on Storj DCS ordinarily does not incur any additional fees other than fees for Static Object Storage and Download Bandwidth. If you receive an increase in your Segment Project Limit, a Per Segment Fee will be applied to data stored on Storj DCS for all Segments above the default Segment Limit.
