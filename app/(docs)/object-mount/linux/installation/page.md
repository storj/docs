---
title: Installation Guides
hideTitle: true
docId: iethahkeeX5EiJoh
weight: 2
redirects:
  - /object-mount/linux/installation
  - /object-mount/linux/installation/mac  
metadata:
  title: Linux Installation Overview
  description:
    Overview of the installation next steps for Linux.
hidden: false
---

# Installation Overview

Storj’s Object Mount supports multiple flavors of Linux and can also run inside Docker and other virtual environments, such as Microsoft’s Hyper-V and Oracle’s VirtualBox.

Object Mount offers both **Scripted Installers** (which do _not_ require root privileges to install for a single user) as well as **Package Manager** installation files for different Linux platforms.


## General Installation Procedure

The general steps to install and activate Object Mount are the _same_ regardless of your specific Linux distribution.

A outline of these steps include:

1. **Obtain** an Object Mount license key.

    - **Note:** If you do not yet have a license key, you can install Object Mount for Linux in a fully-featured **Free Trial** mode. Reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch) for more details.

2. **Download** the latest scripted installer or installation package for your Linux distribution.

    - **Note:** If you do not have a download link, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).

3. **Install & Activate** Object Mount.

_Once Object Mount is installed_, proceed to the User Guide article: [](docId:JDK2ED8HGFmyaxk) to ensure you can access both public and private Object Storage buckets.


## OS-Specific Installation Procedures

Equipped with your installation download link and your Object Mount license key, proceed to the installation instructions for your specific OS and preferred installation method:

| **Scripted Installers**                 | **Installation Guide** |
|-----------------------------------------|------------------------|
| **glibc** (C standard library)          | [glibc Scripted Installer](docId:ahWohd5eegh6eizi)
| **musl** (C standard library)           | [musl Scripted Installer](docId:ao0yaeng2Aitheel)


| **Package Managers**                    | **Installation Guide** |
|-----------------------------------------|------------------------|
| **Debian** (& Ubuntu, etc.)             | [Debian Package Installer](docId:aemie9zeiP9Nie2k)
| **Red Hat** (& RPM, RHEL, CentOS, etc.) | [Red Hat Package Installer](docId:woosaugaiNohree9)
| **Alpine** (& APM, etc.)                | [APK Package Installer](docId:MeiPie8EDuo7eise)
| **Windows** (Linux)                     | [Windows (via Windows Subsystem for Linux [WSL])](docId:bekoo5aenePoo7Oh)

**Other? Not sure?** 

Most Linux distributions use either the GNU Project’s C standard library 🌐 [glibc](https://en.wikipedia.org/wiki/glibc) or the 🌐 [musl](https://en.wikipedia.org/wiki/musl) C standard library. 

Check your distribution, then follow instructions for either our [glibc Scripted Installer](docId:ahWohd5eegh6eizi) or our [musl Scripted Installer](docId:ao0yaeng2Aitheel).
