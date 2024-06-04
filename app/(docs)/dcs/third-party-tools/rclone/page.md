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

The following is more details about the 2 ways you can use Rclone with Storj.

## S3 Compatible

Use our [S3 compatible API](docId:eZ4caegh9queuQuaazoo) to increase upload performance and reduce the load on your systems and network. A 1GB upload will result in only 1GB of data being uploaded

- Faster upload
- Reduction in network load
- Server-side encryption

## Native

Use our native integration pattern to take advantage of client-side encryption as well as to achieve the best possible download performance. Uploads will be erasure-coded [](docId:Pksf8d0TCLY2tBgXeT18d), thus a 1GB upload will result in 2.68GB of data being uploaded to storage nodes across the network.

- End-to-end encryption
- Faster download speed

{% quick-links %}
{% quick-link title="Rclone S3 compatible" href="docId:AsyYcUJFbO1JI8-Tu8tW3" /%}
{% quick-link title="Rclone native" href="docId:Mk51zylAE6xmqP7jUYAuX" /%}
{% /quick-links %}
