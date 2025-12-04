---
title: glibc
hideTitle: false
docId: ahWohd5eegh6eizi
weight: 1
metadata:
  title: Glibc
  description:
    glibc Installation Instructions
hidden: false
---

Many Linux distributions use the GNU Project’s C standard library: 🌐 [glibc](https://en.wikipedia.org/wiki/glibc).

This includes: Debian/Ubuntu, RedHat and their derivatives.

Storj’s Object Mount **glibc scripted installer** (a `.run` file) is compatible with all such Linux distributions.

This installer shell script allows you to install Object Mount (for the current user) _without_ needing root privileges &mdash; no `sudo` required.

{% callout type="info" %}
**Package Installer**

If you prefer a **full installer** for use with package managers (i.e.: Debian, Ubuntu, etc.) refer to the [](docId:aemie9zeiP9Nie2k) installation instructions.
{% /callout %}

Follow the steps below to install and configure Object Mount for **glibc** platforms.


## Step 1. Download the Install Script

Download the latest scripted installer.

- **Note:** If you do not have a download link, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).

Be sure to download the correct script file for your specific chip architecture:

| **Chip Type** | **Scripted Installer Filename**    |
|---------------|------------------------------------|
| AMD x64       | cuno-mne-amd64-glibc-installer.run
| Intel x86     | cuno-mne-x86_64-glibc-installer.run


## Step 2. Install & Activate Object Mount

- **Note:** If you do not yet have a license key, you can install Object Mount for Linux in a fully-featured **Free Trial** mode. Reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch) for more details.

**2a.** To install Object Mount for use _only_ by the **current user**, run the following command from a terminal window (select your processor type):

{% tabs %}

{% tab label="AMD x64" %}
  ```shell
  # terminal
  sh cuno-mne-amd64-glibc-installer.run
  ```
{% /tab %}

{% tab label="Intel x86" %}
  ```shell
  # terminal
  sh cuno-mne-x86_64-glibc-installer.run
  ```
{% /tab %}

{% /tabs %}

**2b.** To install Object Mount to be used by **all users** system-wide, add `sudo` to the _front_ of the run command:

{% tabs %}

{% tab label="AMD x64" %}
  ```shell
  # terminal
  sudo sh cuno-mne-amd64-glibc-installer.run
  ```
{% /tab %}

{% tab label="Intel x86" %}
  ```shell
  # terminal
  sudo sh cuno-mne-x86_64-glibc-installer.run
  ```
{% /tab %}

{% /tabs %}

**2c.** The installation process will prompt you to read and agree to the **end-user license agreement (EULA)**. 

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-eula.jpg)

- **Note:** You can automate this step by setting the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"`. (This is equivalent to accepting the EULA).

**2d.** The installation process will then prompt you to **activate Object Mount**. 

- Press 1 to activate a **free trial**:
  - This will activate a fully-featured 14-day free trial.
- Press 2 if you already have a **license key**:
  - Paste your license key or enter a full path to a license key file.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-enter-license-key.jpg)

- **Note:** You can automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.


## Installation Locations: Scripted Installers

When Object Mount is installed via a **Scripted Installer** (e.g.: glibc or musl), it gets installed to different locations depending on whether it was installed by root, or by a non-root user.

| Install Method  | Location (`CUNO_ROOT`) | Symlinks created in            |
|-----------------|------------------------|--------------------------------|
| Non-Root User   | `~/.local/opt/cuno/`   | `~/.local/bin/`
|                 |                        | `~/.local/lib/x86_64-linux-gnu`
|                 |                        | `~/.local/share/man/`
| Root User       | `/opt/cuno/`           | `/usr/bin/` 
|                 |                        | `/usr/lib/`
|                 |                        | `/usr/share/man/`

## Next Steps

Once Object Mount is installed, proceed to the User Guide article: [](docId:JDK2ED8HGFmyaxk) to ensure you can access both public and private Object Storage buckets.
