---
title: Rclone
tags:
  - large-file
docId: LdrqSoECrAyE_LQMvj3aF
redirects:
  - /dcs/how-tos/sync-files-with-rclone
  - /how-tos/sync-files-with-rclone
metadata:
  title: Getting Started with Rclone Configuration
  description:
    A beginner's guide to setting up and using Rclone with Storj, including
    different integration patterns for optimized performance and security.
---

Follow the [Getting Started guide](docId:AsyYcUJFbO1JI8-Tu8tW3) to setup Rclone.

There are 2 ways to use Rclone with Storj:

1. **S3 Compatible:** Connect to the Storj network via the S3 protocol/S3 gateway.
2. **Native:** Connect over the Storj protocol to access your bucket.

## S3 Compatible

Use our [S3 compatible API](docId:eZ4caegh9queuQuaazoo) to increase upload performance and reduce the load on your systems and network. A 1GB upload will result in only 1GB of data being uploaded.

- Faster upload
- Reduction in network load
- Server-side encryption

[See common commands](docId:AsyYcUJFbO1JI8-Tu8tW3) to get started!

## Native

Use our native Rclone integration to take advantage of client-side encryption, and to achieve the best possible download performance. Note that uploads will be erasure-coded locally [](docId:Pksf8d0TCLY2tBgXeT18d); thus, uploading a 1GB file will result in 2.68GB uploaded data out of your network (to storage nodes across the network).

- End-to-end encryption
- Faster download speed

[See common commands](docId:Mk51zylAE6xmqP7jUYAuX) to get started!

{% quick-links %}
{% quick-link title="Rclone - S3 Compatible" href="docId:AsyYcUJFbO1JI8-Tu8tW3" /%}
{% quick-link title="Rclone - Native" href="docId:Mk51zylAE6xmqP7jUYAuX" /%}
{% /quick-links %}
