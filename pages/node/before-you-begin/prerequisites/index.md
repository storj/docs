---
title: Step 1. Understand Prerequisites
createdAt: 2022-05-24T20:53:36.000Z
updatedAt: 2023-07-24T22:23:03.497Z
docId: hbCGTv1ZLLR2-kpSaGEXw
redirects:
  - /dcs/before-you-begin/prerequisites
---

## Hardware Requirements (Recommended)

✅ **One (1) processor core dedicated to each node service**

✅ **8 TB and a maximum of 24 TB of available space per node**
Minimum of 550 GB with no maximum of available space per node

✅ **16+ TB of unmetered bandwidth available per month; unlimited preferred**
Minimum of 2 TB of bandwidth available per month

✅ **100 Mbps bandwidth upstream**
Minimum of 5 Mbps bandwidth upstream

✅ **100 Mbps bandwidth downstream**
Minimum of 25 Mbps bandwidth downstream

**✅ Uptime (online and operational) of 99.5% per month**
Minimum uptime (online and operational) of 99.3% per month, max total downtime of 5 hours monthly

## System Requirements

{% tabs %}
{% tab label="Linux (Preferred)" %}
CentOS - A maintained version of CentOS 7

Debian - 64-bit version of one of these Debian or Raspbian versions:

*   Buster 10

*   Stretch 9 (stable) / Raspbian Stretch

Fedora - 64-bit version of one of these Fedora versions:

*   28

*   29

Ubuntu - 64-bit version of one of these Ubuntu versions:

*   Cosmic 18.10

*   Bionic 18.04 (LTS)

*   Xenial 16.04 (LTS)

> **Make sure you use static mount for your hard drive via**
>
>  
>
> **/etc/fstab**




{% /tab %}

{% tab label="MacOs" %}
macOS Sierra 10.12 and newer macOS releases are supported

Mac hardware must be a 2010 or newer model

VirtualBox prior to version 4.3.30 cannot be installed. If you have a newer version of VirtualBox installed, it’s fine.

**Running a node on macOS will require good monitoring. Due to issues with Docker, your node may go offline randomly and require restarting your node.**
{% /tab %}

{% tab label="Windows" %}
Windows 8, Windows Server 2012 or later.

**If you are currently running a storage node on Windows using the Docker desktop, it will require good monitoring. If you are still running a node with Docker, your node may go offline randomly and require restarting your node, so it is recommended you switch to the **[](docId:5shJebpS3baWj6LDV5ANQ).&#x20;
[](docId\:jA6Jl8XzCR1nc4_WyJj1a)
{% /tab %}
{% /tabs %}

## Internet Connection

It is highly recommended to have your Storage Node connected via LAN instead of WiFi to ensure a consistent and stable connection.

## Power Supply

If you live in a location where power outages or brownouts are a frequent occurrence, please consider protecting your hardware, including the equipment you run your node on, as well as your router/modem, with an Uninterrupted Power Supply (UPS). This would help protect against damage to your hardware and against the corruption of your database resulting from abrupt shutdowns, which could lead to the unrecoverable loss of your node.

Sign up <https://www.storj.io/node>



{% callout type="warning"  %} 
## **Do not connect your computer directly to the internet without the assistance of a firewall.** 

**Make sure you’re connected to the Internet through a router and not through a modem without a firewall.**

Our software serves requests from the Internet, but not all software you may have installed is designed to be exposed to the Internet directly. This is especially true for users on Windows with applications responding to requests on all IPs.
{% /callout %}

