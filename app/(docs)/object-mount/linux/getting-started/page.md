---
title: Getting Started Guides
hideTitle: false
docId: xhNvtETAA6UBZVNH
weight: 1
metadata:
  title: Getting Started
  description:
    Gettings started with Object Mount for Linux.
hidden: false
---

The pages in these **Getting Started Guides** for Linux will introduce you to topics that should be understood _before_ installing and using Object Mount.


## Deployment & Configuration Options on Linux

When configuring Object Mount on Linux, it is important to understand the needs of the **tools** and **workloads** you plan to run. 

You can adapt settings for each workflow or tool, or you can set options at the bucket-level to impose a particular usage mode for all users.


## Deployment Considerations

There are two important, but independent, aspects to consider when configuring Object Mount for Linux:

1. The requirements for your tools and applications to work _correctly_:

    - For **correct operation**, you need to know what level of **POSIX Compatibility** your tools require in order to function.
    - Object Mount for Linux offers multiple POSIX compatibility options giving the end user a wide array of tools to fine-tune and tailor the functionality and performance of Object Mount for their specific use case and environment.
    - See the article on [POSIX Options](docId:cbm3PcQXmLpuYcbg) to understand the many different POSIX compatibility choices available to you.

2. Ensuring your specific tools and environment work _efficiently_:

    - For **efficient operation**, the bandwidth and latency between your compute resources and your object storage resources will help guide your selection of the best **Deployment Mode** for Object Mount.
    - Object Mount for Linux supports multiple Deployment Modes supporting a variety of unique bandwidth, user requirements, and environmental situations.
    - See the [Deployment Modes](docId:bRnfbdNE6d5DaZzW) article to understand the different deployment choices available to you.
