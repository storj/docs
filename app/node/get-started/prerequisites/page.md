---
title: Step 1. Understand Prerequisites
docId: hbCGTv1ZLLR2-kpSaGEXw
redirects:
  - /node/before-you-begin/prerequisites
---

Proceeding constitutes acceptance of our [Terms and conditions](https://www.storj.io/legal/supplier-terms-conditions). Please read carefully before continuing.

## Hardware Requirements (Recommended)

✅ **One (1) processor core for each storage node instance**

✅ **8 TB and a maximum of 24 TB of available space per node**
Minimum of 550 GB with no maximum of available space per node.

✅ **1.5 TB of transit per TB of capacity; unlimited preferred**

✅ **3 Mbps bandwidth upload per TB of capacity (from storage node to the Internet)**
Minimum of 1 Mbps bandwidth upload

✅ **5 Mbps bandwidth download per TB of capacity (from the Internet to the storage node)**
Minimum of 3 Mbps bandwidth downstream

✅ **Uptime (online and operational) of 99.5% per month**
Minimum uptime (online and operational) of 99.3% per month, max total downtime of 5 hours monthly

## System Requirements

{% tabs %}
{% tab label="Linux (Preferred)" %}
CentOS - A maintained version of CentOS 7

Debian - 64-bit version of one of these Debian or Raspbian versions:

- Stretch 9 (stable) / Raspbian Stretch or later

Fedora - 64-bit version of one of these Fedora versions:

- 28 or later

Ubuntu - 64-bit version of one of these Ubuntu versions:

- Bionic 18.04 (LTS) or later

> **Make sure you use static mount for your hard drive via**
> **/etc/fstab**:
> See [](docId:nZeFxmawYPdgkwUPy6f9s).

{% /tab %}

{% tab label="MacOs" %}
macOS Sierra 10.12 and newer macOS releases are supported

Mac hardware must be a 2010 or newer model

VirtualBox is supported (version 4.3.30 and up) 

**Running a node on macOS will require monitoring. Due to issues with Docker, your node may go offline randomly and require restarting your node.**
{% /tab %}

{% tab label="Windows" %}
Windows 8, Windows Server 2012 or later.

**If you are currently running a storage node on Windows using the Docker desktop, it will require monitoring. If you are still running a node with Docker, your node may go offline randomly and require restarting your node, so it is recommended you switch to the** [](docId:5shJebpS3baWj6LDV5ANQ).
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

If you live in a location where power outages or brownouts are a frequent occurrence, please consider protecting your hardware with an Uninterrupted Power Supply (UPS). This will help protect against damage to your hardware and against the corruption of databases resulting from abrupt shutdowns, which could lead to the unrecoverable loss of your node.

## Information for consideration

We do not recommend purchasing anything specifically for use with Storj alone. It's better to use what you already own and have online.
Node usage depends on customer activity, and not on the hardware or configuration options.  Node usage is not predictable.

Please try to avoid using [SMR drives](https://forum.storj.io/t/psa-beware-of-hdd-manufacturers-submarining-smr-technology-in-hdds-without-any-public-mention/6003), they can work but may require additional tuning and additional hardware resources. If it's not avoidable, please use the [search function on our forum](https://forum.storj.io/search?q=smr) to find an appropriate solution.

{% callout type="warning"  %}
A network-attached storage location may work, but this is neither supported nor recommended!
Please consider running the node locally on your file server/NAS instead.
If that is not possible, then the only working network protocol for network storage is iSCSI.
{% /callout %}

exFAT file system should be avoided. It has a big cluster size, so the actual used space will differ from the accounted used space. Each file will consume at least 128kiB of disk space. You may end up only storing half as much data as you could with an alternative file system.

Please consider backing up your data and reformat the disk to a native filesystem for your OS (NTFS for Windows or ext4 for Linux) and then perform a restore to place your data back on the drive.

A single BTRFS/zfs pool may work poorly without proper tuning and caching (RAM or adding an SSD cache). You may also have issues with a [discrepancy between used and reported space](https://forum.storj.io/t/disk-usage-discrepancy/24715?u=alexey). This is only information for your consideration, it is not a requirement.

If you use RAID for the storage node data, please consider using it with redundancy.  Avoid RAID0, striped volume, concatenated volume, merged JBOD, MergeFS, simple LVM volume, simple MDRAID, simple MDRAID + BTRFS, simple ZFS pool, simple Storage Space in Windows Storage Spaces, etc.  With one disk failure, the node will be unrecoverable.

Please note, RAID with parity usually works as slow as the slowest disk in the pool, so it's not advisable to run more than one node on such a pool. They will affect each other, making them all perform slowly.

RAID with parity may be tuned and improved with RAM/SSD.

You may also have a [usage discrepancy issue](https://forum.storj.io/t/disk-usage-discrepancy/24715?u=alexey) as well.
See also [**RAID vs No RAID choice** thread on the forum](https://forum.storj.io/t/raid-vs-no-raid-choice/6776).

Using NTFS under Linux is not recommended.  It works slower (2-3 times) than ext4 and may cause corruption due to not being a fully compatible implementation of NTFS under Linux. You will likely need to re-attach it from time to time to a Windows PC to check and fix a corrupted file system.  This check under Linux rarely fixes all issues. It may also have a [usage discrepancy issue](https://forum.storj.io/t/disk-usage-discrepancy/24715?u=alexey).

It's better to use a native filesystem for your OS: NTFS for Windows, ext4 for Linux.

In almost all cases you will need to backup all of the data, reformat the partition to the native filesystem, and then restore the data back.
However, this is not a requirement.
