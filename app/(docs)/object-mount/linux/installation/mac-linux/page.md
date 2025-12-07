---
title: macOS (Linux Container)
hideTitle: false
docId: yoopieyewevei1Eo
weight: 6
redirects:
  - /object-mount/linux/installation/mac
metadata:
  title: macOS
  description:
    Installation Instructions for running Object Mount for Linux in a container on a Mac.
hidden: false
---

Storj provides a full-featured, native version of [Object Mount for macOS](docId:apog2ij9jk6f).

If you are unable to use that native Mac app, you can run a **Linux version** of Object Mount on a Mac by using a container environment such as 🌐 [Docker](https://www.docker.com/products/docker-desktop/) or 🌐 [Rancher Desktop](https://rancherdesktop.io/).

{% callout type="warning" %}
  **Macs with Apple Silicon (M-Chips)**

  **Important:** When creating a virtualized or containerized environment on an Apple Silicon (M-Chip)-based Mac, the operating system _within_ the VM/Container likely needs to be an ARM/M-Chip compatible version of the OS. 
  
  Consequently, any Apps (such as Object Mount) installed _within_ that VM/Containerized OS _also_ need to be written to conform to the underlying chip architecture.

  As of this writing, Storj does _not_ provide any ARM-based versions of Object Mount for Linux.

  This may prevent successful installation of Object Mount for Linux in _any_ VM/Container running _any_ OS or distribution on an Apple Silicon (M-Chip)-based Mac.

  **Using the Native Mac Object Mount client is strongly recommended.**
{% /callout %}


## macOS - Using Linux Containers

Running Object Mount for Linux on a Mac **requires** the use of containers. Although modern macOS versions are derived from a BSD Unix kernel, you _cannot_ install or run any version of Object Mount for Linux directly within a standalone Mac Terminal window.

The instructions for installing Object Mount for Linux in a container on a Mac are broken down into two separate steps:

  - **Step 1: Container Prep**
    - Debian/Ubuntu Linux distribution within Docker
    - Settings changes for proper functionality
  - **Step 2: Download, Install & Activate Object Mount**
    - Download the Object Mount Installer
    - Install & Activate Object Mount

These options are described in detail below.

{% callout type="note"  %}
  **macOS Version requirements**

  For Macs using Apple Silicon (ARM/M1-M5 chips) macOS 13.0 Ventura or later is required.
{% /callout %}


## Step 1: Container Prep

[Object Mount for Linux](docId:iethahkeeX5EiJoh) can be installed on a wide variety of Linux distributions. 

For simplicity sake, we will assume installation on an **Ubuntu Linux** deployment within a **Docker container**. 

Adjust these instructions as needed for your specific OS and container platform.

The details provided below are separated into two parts: 
  - Specifics for Intel processor-based Macs
  - Specifics for Apple Silicon-based (M1-M5 chip) Macs

Within each division you will find details and setting recommendations for **Docker** and **Rancher**.

**Note:** If unspecified, instructions will presume Docker as your containerization platform.

{% tabs %}
{% tab label="Intel Processor" %}
**Setting Changes when using: Intel Processor Macs**

Some container settings should be changed prior to installing and using Object Mount.

{% tabs %}
{% tab label="Docker" %}
**Setting Changes for: Docker on Intel Processor Macs**

We recommend changing the file sharing implementation to **VirtioFS**:
  - Open Docker Desktop’s `Settings` panel.
  - Open the `General` section.
  - For the setting `Choose file sharing implementation for your containers` select **“VirtioFS”**.
  - Use the `Apply & Restart` button to save the change.
{% /tab %}

{% tab label="Rancher" %}
**Setting Changes for: Rancher on Intel Processor Macs**

We recommend using the Apple **Virtualization Framework (VZ)**, and the **VirtioFS** file sharing implementation:
  - Open Rancher Desktop's `Preferences` panel.
  - Open the `Virtual Machine` section.
  - Open the `Emulation` tab, and set `Virtual Machine Type` to **“VZ”**.
  - Open `Volumes` tab, and set the `Mount Type` to **“virtiofs”**.
  - Use the `Apply` button to save the changes.

In order to use the `cuno-mac` CLI utility with Rancher, the **“dockerd (moby)”** container engine must be used:
  - Open Rancher Desktop's `Preferences` panel.
  - Open the `Container Engine` section.
  - In the `General` tab, set the `Container Engine` to **“dockerd (moby)”**.
  - Use the `Apply` button to save the change.
{% /tab %}
{% /tabs %}

{% /tab %}
{% tab label="Apple Silicon (M Chip)" %}
**Setting Changes when using: Apple Silicon (M Chip) Macs**

**Important:** _As stated at the top of this article, Object Mount for Linux does not support ARM processors. **Using the Native Mac Object Mount client is strongly recommended**._

Some container settings should be changed prior to installing and using Object Mount.

{% tabs %}
{% tab label="Docker" %}
**Setting Changes for: Docker on Apple Silicon (M Chip) Macs**

Docker Desktop version `4.16.0` or later is required.

Use **Rosetta** for hardware emulation:
  - Open Docker Desktop’s `Settings` panel.
  - Open the `Features in development` section.
  - Open the `Beta features` tab, and enable the setting **“Use Rosetta for x86/amd64 emulation on Apple Silicon”**.

We recommend changing the file sharing implementation to **VirtioFS**:
  - Open Docker Desktop’s `Settings` panel.
  - Open the `General` section.
  - For the setting `Choose file sharing implementation for your containers` select **“VirtioFS”**.
  - Use the `Apply & Restart` button to save the change.

Restart the Docker Engine by clicking on the Docker icon in the menu bar and selecting **“Restart”**.
{% /tab %}

{% tab label="Rancher" %}
**Setting Changes for: Rancher on Apple Silicon (M Chip) Macs**

We recommend using the Apple **Virtualization Framework (VZ)** and **Rosetta** for emulation:
  - Open Rancher Desktop’s `Preferences` panel.
  - Open the `Virtual Machine` section.
  - Select the `Emulation` tab.
  - Set `Virtual Machine Type` to **“VZ”**.
  - In the `VZ` sub-option, enable **“Rosetta”**.

We recommend using the **VirtioFS** file sharing implementation:
  - Select the `Volumes` tab, and set the `Mount Type` to **“virtiofs”**.

Use the `Apply` button to save the changes.

In order to use the `cuno-mac` CLI utility with Rancher, the **“dockerd (moby)”** container engine must be used:
  - Open Rancher Desktop’s `Preferences` panel.
  - Open the `Container Engine` section.
  - In the `General` tab, set the `Container Engine` to **“dockerd (moby)”**.

Use the `Apply` button to save the change.
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}

{% callout type="warning" %}
  **Alternate Container Platforms**

  **OrbStack:**

  - You _can_ use 🌐 [OrbStack](https://orbstack.dev/) for Mac and may find it to be faster. 
  - But `cuno-mac` CLI support is not provided when using OrbStack.
  - No additional settings changes are required for OrbStack usage.

  **colima:**

  - 🌐 [colima](https://github.com/abiosoft/colima) is not supported at this time.
{% /callout %}


## Step 2: Download, Install & Activate Object Mount

Once your container is up and running with a Linux distribution, you can install the appropriate version of Object Mount for Linux within that containerized OS.

The specific installation instructions for each Linux flavor (Package installer or Scripted Installer) can be followed verbatim:

| **Scripted Installers**                 | **Installation Guide** |
|-----------------------------------------|------------------------|
| **glibc** (C standard library)          | [glibc Scripted Installer](docId:ahWohd5eegh6eizi)
| **musl** (C standard library)           | [musl Scripted Installer](docId:ao0yaeng2Aitheel)


| **Package Managers**                    | **Installation Guide** |
|-----------------------------------------|------------------------|
| **Debian** (& Ubuntu, etc.)             | [Debian Package Installer](docId:aemie9zeiP9Nie2k)
| **Red Hat** (& RPM, RHEL, CentOS, etc.) | [Red Hat Package Installer](docId:woosaugaiNohree9)
| **Alpine** (& APM, etc.)                | [APK Package Installer](docId:MeiPie8EDuo7eise)
| **macOS** (Linux)                       | [macOS (via Linux in containers)](docId:yoopieyewevei1Eo)
| **Windows** (Linux)                     | [Windows (via Windows Subsystem for Linux [WSL])](docId:bekoo5aenePoo7Oh)

Be sure to obtain an installer package/script that corresponds to your Mac’s processor.

{% callout type="warning" %}
  **Macs with Apple Silicon (M-Chips)**

  **Important:** _As stated at the top of this article, Object Mount for Linux does not support ARM processors. **Using the Native Mac Object Mount client is strongly recommended**._
{% /callout %}


## Using Object Mount for Linux within your Container

Object Mount can now be used from your Mac within the containerized Linux OS environment.

You can use Object Mount with any Linux applications also installed in the Linux container.

{% callout type="info" %}
  **`cuno-mac` CLI utility**

  The `cuno-mac` CLI utility (referenced above) allows for the launching and controlling of containerized Linux instances from within a native Mac Terminal Window. Linux containers are still required but can be interacted with from the Mac’s command line.

  **Note:** Use of `cuno-mac` requires the installation of Python 3 on your Mac.

  Detailed usage of the **`cuno-mac` CLI utility** is beyond the scope of this article.
{% /callout %}
