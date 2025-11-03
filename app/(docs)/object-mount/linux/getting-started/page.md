---
title: Getting Started
hideTitle: false
docId: xhNvtETAA6UBZVNH
weight: 1
metadata:
  title: Getting Started
  description:
    Gettings started with Object Mount for Linux.
hidden: false
---

Storj’s Object Mount for Linux is a scalable, high-performance POSIX compatibility layer that lets you interact with files stored on object storage such as Storj Object Storage, Amazon S3, Azure Blob Storage, Google Cloud Storage &mdash; or any other S3-compatible object store hosted in the cloud (or locally).

## Overview

Object Mount is Linux software: there’s an Object Mount Command Line Interface (Object Mount CLI), `cuno`, providing the most direct way to interact with object storage. This works through a user-mode library, `cuno.so`, which intercepts applications (both dynamic and static) using [LD_PRELOAD](https://man7.org/linux/man-pages/man8/ld.so.8.html) functionality and fast dynamic binary instrumentation.

Object Mount can also be used with our modified [FUSE](https://www.kernel.org/doc/html/next/filesystems/fuse.html) solution, [Object Mount on FUSE](./user-guides/basic#object-mount-on-fuse), providing wider support for applications when the Object Mount CLI cannot be used. (See [Direct Interception](./user-guides/limitations#direct-interception)).

Combining the best performance with the widest support, Storj offers a hybrid solution: [Object Mount FlexMount](./user-guides/basic#object-mount-flex-mount).


## Wide Support for Object Storage Providers

Object Mount has native support for:

- [Storj Object Storage](https://www.storj.io/cloud-object-storage)
- [Amazon Web Services S3](https://aws.amazon.com/s3/)
- [Microsoft Azure Blob Storage](https://azure.microsoft.com/en-gb/services/storage/blobs/)
- [Google Cloud Platform](https://cloud.google.com/storage/) 
  - **Note:** For best GCP performance, we currently recommend using S3 with their [S3 accesspoint](https://cloud.google.com/storage/docs/interoperability)

In theory, Storj’s Object Mount supports any S3-compatible object storage provider. In practice, each “S3 API” implementation can behave between providers &mdash; so some additional configuration is sometimes necessary. 

Object Mount has been tested on the above major providers and:
- [Oracle Cloud Infrastructure Object Storage](https://www.oracle.com/cloud/storage/object-storage.html)
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
