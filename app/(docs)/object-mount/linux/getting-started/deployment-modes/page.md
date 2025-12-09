---
title: Deployment Modes
hideTitle: false
docId: bRnfbdNE6d5DaZzW
weight: 3
metadata:
  title: Deployment Options for Linux
  description:
    Technical details on the multiple Deployment Options for Object Mount on Linux.
hidden: false
---

## Deployment Modes

The purpose of Object Mount is to make working with object storage as fast and seamless as using a local drive.

But each user’s environment is unique &mdash; comprising different applications, workflows, teams, geography, bandwidth, access to local and remote storage options, etc. 

Therefore, Object Mount for Linux is fully configurable and can be deployed in a variety of different modes to best fit your unique situation.

These deployment modes include:

1. **Direct Interception Mode**

    In Direct Interception Mode, Object Mount inserts itself between your standard Linux applications and the host Operating System. Object Mount detects and intercepts file I/O calls, then translates and redirects them, as needed, to your object storage provider. 
    
    The Object Mount Command Line Interface (CLI), `cuno`, is used to configure Direct Interception Mode.

2. **Object Mount on FUSE**

    If Object Mount’s CLI cannot be used, or you require broader support for non-standard Linux applications, Object Mount on FUSE uses Linux FUSE (Filesystem in Userspace) to mount object storage within the Linux file system hierarchy. 
    
    This increases compatibility but can reduce performance.

3. **Object Mount FlexMount** 

    Object Mount FlexMount combines the speed and performance of Direct Interception (#1, above) with the widest compatibility and application support of Object Mount on FUSE (#2, above).

4. **Object Mount Fusion**

    Object Mount Fusion is used to enhance high-performance, LAN-based _attached_ storage solutions (like Amazon’s Elastic File System - EFS) with the throughput of object storage.

    Examples include:
    - The client is a cloud-hosted EC2 instance or virtual machine within the same **region** as the cloud data.
    - The client is in the same LAN network as an on-premises object storage cluster and has a high-speed, low-latency connection linking the client to the storage.


## Configuring Deployment Modes
_After you have installed_ Object Mount for Linux, read through the detailed configuration and usage guidelines for these different deployment modes in the Linux User Guide article: [](docId:jqySXsBfj5WGUjgs).
