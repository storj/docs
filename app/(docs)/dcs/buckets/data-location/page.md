---
title: Data Location
weight: 4
docId: eem7iong0aSh7ahbich5
---

Storj is globally distributed by default and has [more consistent performance](https://www.storj.io/blog/why-todays-cloud-storage-has-inconsistent-performance-and-how-to-fix-it) than a single region on AWS S3 across many geographic locations.

When a download is requested on Storj, the segments located closest to the destination are typically used to satisfy the request as illustrated in the graphic below.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj_download_distributed_cloud.png)

## Setting the region

Most [S3 compatible tools](docId:REPde_t8MJMDaE2BU8RfQ) require setting a region in their configuration. For these tools, the region can be set to `global`.

```js
const s3Client = new S3.S3Client({ region: 'global' })
```
