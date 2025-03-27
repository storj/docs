---
title: User Guides
docId: ohs0ailohSh0Vie3

metadata:
  title: User Guides
  description:
    User Guides Overview
weight: 4
---

Object Mount is a scalable, high-performance POSIX compatibility layer that lets you interact with files stored on object storage such as Amazon S3, Azure Blob Storage, Google Cloud Storage, or any S3-compatible object store hosted in the cloud or locally.

## The package

Object Mount is Linux software: there's a Object Mount Command Line Interface (Object Mount CLI), `cuno`, providing the highest performance and most straightforward way to interact with object storage. This works through a user-mode library, `cuno.so`, which intercepts (both dynamic and static) applications using [LD_PRELOAD] functionality and fast dynamic binary instrumentation.

Object Mount can also be used with our modified [FUSE] mount solution, {ref}`Object Mount Mount <user-guide-Object Mount-mount>`, providing wider support for applications where the {ref}`Object Mount CLI cannot be used <user-guide-limitations-direct-interception>`.

To match the best performance with the widest support, consider the hybrid solution: {ref}`Object Mount FlexMount <user-guide-Object Mount-flexmount>`.

Access credentials can also be optionally managed by Object Mount.

## Wide support for object storage providers

Object Mount has native support for:

- [Amazon Web Services S3](https://aws.amazon.com/s3/)
- [Microsoft Azure Blob Storage](https://azure.microsoft.com/en-gb/services/storage/blobs/)
- [Google Cloud Storage](https://cloud.google.com/storage/) (however for best performance we currently recommend using S3 with their [S3 accesspoint](https://cloud.google.com/storage/docs/interoperability))

In theory, Object Mount supports any S3-compatible object storage provider. In practice, the "S3 API" implementation can have differences in behaviour between providers, so some additional configuration is sometimes necessary. Object Mount has been tested on:

% TODO: make this a table, with links to additional config sections for each of these providers (if any is necessary)

- [Oracle Cloud Infrastructure Object Storage](https://www.oracle.com/cloud/storage/object-storage.html)
- [Storj](https://storj.io/)
- [Wasabi](https://wasabi.com/)
- [MinIO](https://min.io/)
- [NetApp StorageGRID](https://www.netapp.com/data-storage/storagegrid/)
- [Dell ECS Object Storage](https://www.delltechnologies.com/en-gb/storage/ecs/index.htm)

The following providers have not yet been validated; however, users have reported success with:

- [IBM Cloud Object Storage](https://www.ibm.com/cloud/object-storage)
- [Backblaze B2 Cloud Storage](https://www.backblaze.com/cloud-storage)
- [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/)
- [Cloudflare R2](https://www.cloudflare.com/en-gb/developer-platform/r2/)
- [Scality](https://www.scality.com/)
- [DataDirect Networks (DDN) Storage](https://www.ddn.com)

[fuse]: https://www.kernel.org/doc/html/next/filesystems/fuse.html
[ld_preload]: https://man7.org/linux/man-pages/man8/ld.so.8.html
