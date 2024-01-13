---
title: Step 1. Understand Prerequisites
docId: hbCGTv1ZLLR2-kpSaGEXw
redirects:
  - /node/before-you-begin/prerequisites
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

✅ **Uptime (online and operational) of 99.5% per month**
Minimum uptime (online and operational) of 99.3% per month, max total downtime of 5 hours monthly

## System Requirements

{% tabs %}
{% tab label="Linux (Preferred)" %}
CentOS - A maintained version of CentOS 7

Debian - 64-bit version of one of these Debian or Raspbian versions:

- Buster 10

- Stretch 9 (stable) / Raspbian Stretch

Fedora - 64-bit version of one of these Fedora versions:

- 28

- 29

Ubuntu - 64-bit version of one of these Ubuntu versions:

- Cosmic 18.10

- Bionic 18.04 (LTS)

- Xenial 16.04 (LTS)

> **Make sure you use static mount for your hard drive via**
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

**If you are currently running a storage node on Windows using the Docker desktop, it will require good monitoring. If you are still running a node with Docker, your node may go offline randomly and require restarting your node, so it is recommended you switch to the** [](docId:5shJebpS3baWj6LDV5ANQ).
[](docId:jA6Jl8XzCR1nc4_WyJj1a)
{% /tab %}
{% /tabs %}

## Internet Connection

{% callout type="warning"  %}

## **Do not connect your computer directly to the internet without the assistance of a firewall.** {% anchor=false %}

**Make sure you’re connected to the Internet through a router and not through a modem without a firewall.**

Our software serves requests from the Internet, but not all software you may have installed is designed to be exposed to the Internet directly. This is especially true for users on Windows with applications responding to requests on all IPs.
{% /callout %}

It is highly recommended to have your Storage Node connected via LAN instead of WiFi to ensure a consistent and stable connection.

## Power Supply

If you live in a location where power outages or brownouts are a frequent occurrence, please consider protecting your hardware, including the equipment you run your node on, as well as your router/modem, with an Uninterrupted Power Supply (UPS). This would help protect against damage to your hardware and against the corruption of your database resulting from abrupt shutdowns, which could lead to the unrecoverable loss of your node.

## Information for consideration

We do not recommend to invest to anything with purpose only for Storj, it's better to use what you have now and what will be online with Storj or without.
The usage depends on the Customers, not on the hardware or configuration options, thus usage is not predictable.
However, it's not a requirement, make your own decision.

{% callout type="warning"  %}
A network-attached storage location may work, but this is neither supported nor recommended!
Please consider to run the node directly on your file server/NAS instead.
If that is not possible for some reason, then take into consideration, that the only working network protocol for storage is iSCSI.
{% /callout %}

* exFAT filesystem is better to be avoided, it has a big cluster size, so the actually used space will differ from the accounted used space, each file will consume at least 128kiB of disk space, so you may end with 50% of usage and full disk.
Please consider to backup all data and reformat this disk to a native filesystem for your OS (NTFS for Windows or ext4 for Linux) and restore your data back.
* The single BTRFS/zfs pool may work poorly without a proper tuning and caching (RAM or adding an SSD cache), you may also have issues with a [discrepancy between used and reported space](https://forum.storj.io/t/disk-usage-discrepancy/24715?u=alexey), however it's only information for consideration, not a requirement.
* If you use RAID, please consider to do not use RAID without a redundancy (RAID0, striped volume, concatenated volume, merged JBOD, MergeFS, simple LVM volume, simple MDRAID, simple MDRAID + BTRFS, simple zfs pool, simple Storage Space in Windows Storage Spaces, etc.) for storagenode data - with one disk failure the whole node is gone.
Please note, the RAID with parity usually works as slow as a slowest disk in the pool, so it's not advisable to run more than one node on such pool, they inevitable will affect each other, makes them all slow.
RAID with parity may be tuned and improved with RAM/SSD cache in expense of the additional costs.
You may also have a [usage discrepancy issue](https://forum.storj.io/t/disk-usage-discrepancy/24715?u=alexey) as well.
See also [**RAID vs No RAID choice** thread on the forum](https://forum.storj.io/t/raid-vs-no-raid-choice/6776).
However, all this is not a requirement.
* Using NTFS under Linux is not recommended - it works slowly in 2-3 times than ext4 and may be corrupted due to not fully compatibility of the NTFS implementation under Linux, you likely will need to re-attach it from time to time to the Windows PC to check and fix the corrupted file system (this check under Linux rarely can fix all issues), it may also have a [usage discrepancy issue](https://forum.storj.io/t/disk-usage-discrepancy/24715?u=alexey) as well.
So it's better to use a native filesystem for your OS: NTFS for Windows, ext4 for Linux.
In almost all cases you need to backup all data, reformat to the native filesystem and restore data back.
However, this is not a requirement.