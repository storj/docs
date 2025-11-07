---
title: Deployment Modes
hideTitle: false
docId: bRnfbdNE6d5DaZzW
weight: 1
metadata:
  title: Deployment Options for Linux
  description:
    Technical details on the multiple Deployment Options for Object Mount on Linux.
hidden: false
---

## Deployment Options on Linux

When configuring Object Mount, it is important to understand the needs of the tools and workloads you plan to run. 

You can change settings for each workflow or tool, or you can set options at the bucket-level to impose a particular usage mode for all users.

## Deployment Considerations

There are two important but independent aspects to consider when configuring Object Mount for Linux:

1. Ensuring your specific tools and environment work _efficiently_:

    - For **efficient operation**, your primary concerns are the bandwidth and latency between your compute resources and your object storage resources. 
    - **Object Mount for Linux** supports multiple **Deployment Modes** to support a variety of unique bandwidth, user requirements, and environmental situations.
    - Understanding the different deployment modes will be described below.

2. The requirements for your tools and applications to work _correctly_:

    - For **correct operation**, you need to know what level of POSIX compatibility your tools require in order to function.
    - **Object Mount for Linux** offers multiple **POSIX Options** and options giving the end user an array of tools to fine-tune and tailor the functionality and performance of Object Mount for their specific use case and environment.
    - Understanding the different [POSIX Options](docId:cbm3PcQXmLpuYcbg) will be covered in the next document.


## Deployment Modes

The purpose of Object Mount is to make working with object storage as fast and seamless as using a local drive.

But each user’s environment is unique &mdash; comprising different applications, workflows, teams, geography, bandwidth, access to local and remote storage options, etc. 

Therefore, Object Mount for Linux is fully configurable and can be deployed in a variety of modes to best fit your unique situation.

These deployment modes include:

1. **Direct Interception Mode**: In Direct Interception Mode, Object Mount inserts itself between your standard Linux applications and the host Operating System. Object Mount detects and intercepts file I/O calls, then translates and redirects them, as needed, to your object storage provider. The Object Mount Command Line Interface, `cuno`, is used to configure Direct Interception Mode.

2. **Object Mount on FUSE**: If Object Mount’s CLI cannot be used, or you require broader support for non-standard Linux applications, Object Mount on FUSE uses Linux FUSE (Filesystem in Userspace) to mount object storage within the Linux file system hierarchy. This increases compatibility but can reduce performance.

3. **Object Mount FlexMount** combines the speed and performance of Direct Interception (#1) with the wide application support of Object Mount on FUSE (#2).

4. Lastly, **Object Mount Fusion** can be used to enhance high-performance _attached_ storage solutions (like Amazon’s Elastic File System - EFS) with the throughput of object storage.


## Configuring Deployment Modes
After you have Object Mount for Linux installed and running, read through the detailed configuration and usage guidelines for these deployment modes in the [Configuration Guide: Deployment Modes](docId:jqySXsBfj5WGUjgs) article.
