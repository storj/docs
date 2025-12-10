---
title: Deployment Mode Details
hideTitle: false
docId: jqySXsBfj5WGUjgs
weight: 3
redirects:
  - /object-mount/linux/user-guides/basic
metadata:
  title: Configuring Deployment Modes
  description:
    Details on the use and configuration of different Deployment Modes in Object Mount for Linux.
hidden: false
---

The articles in this section provide additional details on the different  Modes that Object Mount for Linux can be deployed in.

As was described in the **Getting Started Guide** article [](docId:bRnfbdNE6d5DaZzW), Object Mount for Linux can be used in several different modes:

1. [Direct Interception Mode](docId:UHsd5HnesueQyhnZ): In Direct Interception Mode, Object Mount inserts itself between your standard Linux applications and the host Operating System. Object Mount detects and intercepts file I/O calls, then translates and redirects them, as needed, to your object storage provider. The Object Mount Command Line Interface, `cuno`, is used to configure Direct Interception Mode.

2. [Object Mount on FUSE](docId:ZdvWLcm9uFmM5HLk): If Object Mount’s CLI cannot be used, or you require broader support for non-standard Linux applications, Object Mount on FUSE uses Linux FUSE (Filesystem in Userspace) to mount object storage within the native Linux file system environment. This increases compatibility but can reduce performance.

3. [Object Mount FlexMount](docId:cFUt9zgCRFFDk5Sq) combines the speed and performance of Direct Interception (#1) with the wide application support of Object Mount on FUSE (#2).

4. [Object Mount Fusion](docId:GVT7eXEaMSZCWESj) can be used to enhance high-performance _attached_ storage solutions (like Amazon’s Elastic File System - EFS) with the throughput of object storage.


## Enabling Object Mount in Other Environments

For information on setting up Docker containers with Object Mount pre-loaded, automatically setting up Object Mount on FUSE at boot, and other containerization and High-Performance Computing (HPC) use-cases, see Linux User Guide article: [](docId:airoogh4Waengi8u).
