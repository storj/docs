---
title: Linux
hideTitle: true
docId: wxtofwqcb5f2
weight: 5
metadata:
  title: Linux Installation and Usage
  description:
    Home Page for guidance on installing and using Object Mount on various Linux OS versions.
hidden: false
---

# Linux Installation and Usage

This section contains everything you need to understand, install and use **Object Mount** on a Linux machine.

Whether you’re setting up for creative workflows, remote storage access, or team-based collaboration, these pages will walk you through installation, setup, and day-to-day use.


## Linux Package

Object Mount is a scalable, high-performance POSIX compatibility layer that lets you interact with files stored on object storage such as Amazon S3, Storj Object Storage, Azure Blob Storage, Google Cloud Storage, or any S3-compatible object store hosted in the cloud or locally.

**Object Mount for Linux** retains much of its original look and feel from its **cunoFS** heritage.

Object Mount for Linux includes an Object Mount Command Line Interface (CLI), `cuno`, providing the highest performance and most straightforward way to interact with object storage. You will encounter many `cuno`-related commands, settings, and custom variables throughout your configuration and daily use of Object Mount for Linux.

Object Mount functions via a user-mode library, `cuno.so`, which acts as a 🌐 [dynamic linker/loader](https://man7.org/linux/man-pages/man8/ld.so.8.html) intercepting applications (both dynamic and static) via fast, dynamic binary instrumentation.


## Object Mount: OS Version Differences

Storj’s Object Mount for Linux, with its CLI-heavy user interface, is in stark contrast to the Graphical User Interface (GUI) experience that Object Mount presents to Windows and macOS users.

Other OS differences include:

| **Object Mount Feature** | **For Linux**       | **For Windows & macOS** |
|--------------------------|---------------------|-------------------------|
| CLI-based                | 100%                | Limited CLI
| GUI-based                | No GUI available    | 100%
| POSIX Mode Features | Wide array of settings   | Either `on` or `off`
| `cuno`-based commands, settings, and variables | Large quantity of options | Limited options


## What’s Covered

The many articles in this Linux section will cover the installation, configuration, and use of Object Mount on multiple flavors of Linux. Navigate to what you need, when you need it.

Object Mount’s Linux-specific content includes: 
- Getting Started Guides
- Installation Guides
- User Guides
- Advanced Guides

Click below to access the content you are looking for:

### Getting Started Guides

_Prior to installing_ Object Mount for Linux, view the Linux-specific [Getting Started Guide](docId:xhNvtETAA6UBZVNH) articles to better understand the capabilities, options, and deployment choices available.

Getting Started topics include:
  - Understanding POSIX Compatibility and Options in Object Mount for Linux
  - Understanding Deployment Modes for Object Mount for Linux

### Installation Guides

When _ready to install_, view the Object Mount for Linux [Installation Guides](docId:iethahkeeX5EiJoh) for your particular Linux variant, including:

  - Alpine
  - Debian & Ubuntu
  - Red Hat
  - RHEL & CentOS
  - glibc (standard C library)
  - musl (standard C library)
  - Windows - via Windows Subsystem for Linux (WSL)

### User and Configuration Guides

_After installation_, read through the Linux [User Guides](docId:ohs0ailohSh0Vie3) to learn more about using and configuring Object Mount for Linux, including details on:

  - Validating Functionality & Access Object Storage
  - Activating License Keys
  - The different Linux Deployment Modes
    - Direct Interception Mode
    - Object Mount on FUSE
    - Object Mount FlexMount
    - Object Mount Fusion
  - Enabling Enforced POSIX File Access
  - Cloud Path Details
  - Application Tips
  - Media & Entertainment and High Performance COmputing Modes
  
### Advanced Guides

Once up and running, explore the Linux-specific _advanced configuration tips_ found in the Object Mount for Linux [Advanced Guides](docId:GeWpcQTuVpL6d3wU). These articles will help you fine-tune your deployment, improve Object Mount’s performance, and increase your productivity. 

Topics include:

  - Advanced Credential Options
  - Advanced Loading Options
  - Advanced Configuration Options
  - Server-Side Encryption
  - Kubernetes CSI Driver
  - Machine Learning Accelerator
  - Technical Limitations
  - Uninstalling Object Mount


## Additional Reference Material

Once your Linux deployment of Object Mount is up and running, there are several **Global Features** and **Media Workflow Guides** that you can reference, including:

**Global Features & Concepts:**

See the many articles in the [Appendix](docId:xzAqS9Um7xjQSbmD) for additional details on features that apply to Object Mount on _all_ operating systems (macOS, Windows, and Linux):

- Object Storage Core Concepts
- POSIX explained
- S3 Credential Management
- Supported S3 Providers
- Performance Tuning
- Troubleshooting Guide
- FAQ
- Release Notes

**Media Application & Workflow Guides:**

Detailed usage tips and recommendations for [Media Workflows](docId:JXF4_NLsV@nh9QcT), including:

  - Using Object Mount with Adobe Premiere Pro
  - Using Object Mount with Avid Media Composer
  - Using Object Mount with DaVinci Resolve
