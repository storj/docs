---
title: Supported S3 Providers
hideTitle: false
docId: xCjeasn8SLQn2vfd
weight: 4
metadata:
  title: Supported S3 Providers
  description:
    List of tested and supported s3 Providers.
hidden: false
---

Object Mount can be used with any S3-compatible object storage provider, including these **S3 Primary Providers**:

  - 🌐 [Storj’s Object Storage](https://www.storj.io/cloud-object-storage)
  - 🌐 [Amazon Web Services S3](https://aws.amazon.com/s3/)
  - 🌐 [Microsoft Azure Blob Storage](https://azure.microsoft.com/en-gb/services/storage/blobs/)
  - 🌐 [Google Cloud Platform](https://cloud.google.com/storage/) 
    - **Note:** For best GCP performance, we currently recommend using S3 with their 🌐 [S3 accesspoint](https://cloud.google.com/storage/docs/interoperability)

    <!-- Check the above GCP NOTE and LINK -->




## Tested Storage Providers

In theory, Storj’s Object Mount works with _any_ S3-compatible object storage provider. 

In practice, each provider’s “S3-compatible API” implementation can have slightly different nuances and behaviors &mdash; some additional configuration may be necessary. 

Object Mount has been successfully tested with the **S3 Compatible Providers** below:

  - 🌐 [Oracle Cloud Infrastructure (OCI) Object Storage](https://www.oracle.com/cloud/storage/object-storage)
  - 🌐 [Wasabi Cloud Object Storage](https://wasabi.com/cloud-object-storage)
  - 🌐 [Min.IO AIStor](https://www.min.io/product/aistor)
  - 🌐 [NetApp StorageGRID](https://www.netapp.com/data-storage/storagegrid)
  - 🌐 [Dell ECS Object Storage](https://www.dell.com/en-us/lp/dt/elastic-cloud-storage)


## Additional S3 Providers

The following S3 storage providers have not yet been validated by Storj &mdash; however, users have reported success with the **Additional S3 Providers** below:

  - 🌐 [IBM Cloud Object Storage](https://www.ibm.com/cloud/object-storage)
  - 🌐 [Backblaze B2 Cloud Storage](https://www.backblaze.com/cloud-storage)
  - 🌐 [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces)
  - 🌐 [Cloudflare R2](https://www.cloudflare.com/en-gb/developer-platform/r2)
  - 🌐 [Scality](https://www.scality.com)
  - 🌐 [DataDirect Networks (DDN) Storage](https://www.ddn.com)
