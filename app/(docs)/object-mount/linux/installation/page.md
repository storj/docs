---
title: Installation Guides
hideTitle: true
docId: iethahkeeX5EiJoh
weight: 2
redirects:
  - /object-mount/linux/installation
metadata:
  title: Linux Installation Overview
  description:
    Overview of the installation next steps for Linux.
hidden: false
---

# Installation Overview

Storj’s Object Mount supports multiple different flavors of Linux and can also run inside Docker and other virtual environments, such as Microsoft’s Hyper-V and Oracle’s VirtualBox.

Object Mount offers both **Scripted Installers** (which do _not_ require root privileges to install for a single user) as well as **Package Manager**-based installation files.


## General Installation Procedure

The general steps to install and activate Object Mount are the _same_ regardless of your specific Linux distribution.

A outline of these steps incude:

1. **Obtain** an Object Mount license key.

- **Note:** If you do not yet have a license key, you can install Object Mount for Linux in a fully-featured **Free Trial** mode. Reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch) for more details.

2. **Download** the latest scripted installer or installation package for your Linux distribution.

- **Note:** If you do not have a download link, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).

3. **Install & Activate** Object Mount.
4. **Validate connectivity** and the general functionality of Object Mount by accessing a public storage bucket.
5. **Configure and Mount** your private object storage bucket(s).


## OS-Specific Installation Procedures

Once you have your installation download link and your Object Mount license key, proceed to the installation instructions for your specific OS and preferred installation method:

| **Linux Platform**                      | **Installation Guide** |
|-----------------------------------------|------------------------|
| **glibc** (C standard library)          | [Scripted Installer](docId:ahWohd5eegh6eizi)
| **musl** (C standard library)           | [Scripted Installer](docId:ao0yaeng2Aitheel)
| **Debian** (& Ubuntu, etc.)             | [Debian Package Installer](docId:aemie9zeiP9Nie2k)
| **Red Hat** (& RPM, RHEL, CentOS, etc.) | [Red Hat Package Installer](docId:woosaugaiNohree9)
| **Alpine** (& APM, etc.)                  | [APK Package Installer](docId:MeiPie8EDuo7eise)
| **macOS**                               | [macOS (via Linux in containers)](docId:yoopieyewevei1Eo)
| **Windows**                             | [Windows (via Windows Subsystem for Linux [WSL])](docId:bekoo5aenePoo7Oh)

**Other? Not sure?** 

Most Linux distributions use either the GNU Project’s C standard library 🌐 ([glibc](https://en.wikipedia.org/wiki/glibc)) or the 🌐 [musl](https://en.wikipedia.org/wiki/musl) C standard library. 

Check your distribution, then follow instructions for either our [glibc scripted installer](docId:ahWohd5eegh6eizi) or our [musl scripted installer](docId:ao0yaeng2Aitheel).




<!-- COMMENTING OUT FOR NOW

>>> MOVE THE INFO BELOW TO ANOTHER SECTION

## Activating your license

If you have registered, you can activate your license by running the following command and following the interactive steps:

{% tabs %}
{% tab label="Linux" %}
   ```shell
   # terminal
   cuno creds activate
   ```
{% /tab %}
{% tab label="Mac" %}
   ```shell
   # terminal
   cuno-mac creds activate
   ```
   Note: Instructions for cuno-mac users:
    
   If any arguments are given to ``cuno-mac``, it starts a temporary container with your installation of cuno mounted into it, and runs the command inside the container.

   The first time ``cuno-mac`` is run, a Docker container will be created with Object Mount ready to use and a user set up within the container similar to your local user on your Mac.
{% /tab %}
{% /tabs %}


## Testing your installation

You should now be able to run Object Mount from the command line, which you can test out by running the following command:

{% tabs %}

{% tab label="Mac" %}    
   ```shell
   # terminal
   cuno-mac version
   ```
    Note:

    If you have installed Object Mount directly onto a Mac, you must choose between using ``cuno-mac`` and ``cuno`` depending on the environment you are currently in.

    If you're in a Mac Terminal session and have not run ``cuno-mac``, then you must replace ``cuno`` in any instructions with ``cuno-mac``.

    If you have already started a Object Mount container by calling ``cuno-mac``, you will see the ``(cuno)`` prefix on your command line so any instructions using ``cuno`` commands will work as-is.

    To return to macOS, run ``exit``.

    See [user-guide-cuno-mac](../installation/mac) for more information.
    
    If you have already started a ``cuno-mac`` session:
    
   ```shell
   # terminal
   cuno version
   ```

{% /tab %}
{% /tabs %}






{% /tab %}
{% tab label="Mac" %} 
   ```shell
   # terminal
   cuno-mac run sh -c "ls s3://stpubdata/"
   galex  hst  jwst  k2  kepler  panstarrs  tess
   ```
   ```shell
   # terminal
   cuno-mac run sh -c "ls s3://stpubdata/tess/public/*"
   's3://stpubdata/tess/public/ffi':
   s0001  s0005  s0009  s0013  s0017  s0021  s0025  s0029 ... [truncated]
   's3://stpubdata/tess/public/mast':
   tess-s0001-1-1-cube.fits  tess-s0012-1-4-cube.fits  tess-s0023-2-3-cube.fits ... [truncated]
   ... [truncated]
   ```
   Note that ``cuno-mac run`` is a way to run a single command within a Object Mount context. Most of the time, and for interactive usage, we recommend starting a container using the 
   command ``cuno-mac`` and running your commands directly inside it - see the [Loading Object Mount](../getting-started/enabling-object-mount#direct-interception-with-object-mount-cli) section of this guide for more information, or the [equivalent section](../user-guides/basic#direct-interception-with-object-mount-cli) from the full user guide for extra detail.

{% /tab %}
{% /tabs %}
-->
