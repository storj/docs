---
title: musl
hideTitle: false
docId: ao0yaeng2Aitheel
weight: 2
metadata:
  title: musl
  description:
    musl Scripted Installer Instructions
hidden: false
---

Some Linux distributions (including Alpine) use the musl C standard library: 🌐 [musl](https://en.wikipedia.org/wiki/musl).

Storj’s Object Mount **musl scripted installer** (a `.run` file) is compatible with all such Linux distributions.

This installer shell script allows you to install Object Mount (for the current user) _without_ needing root privileges &mdash; no `sudo` required.

{% callout type="info" %}
**Optional: Package Installer**

If you prefer a **full installer** for use with package managers (i.e.: Alpine, etc.) refer to the [](docId:MeiPie8EDuo7eise) installation instructions.
{% /callout %}

Follow the steps below to install and configure Object Mount for **musl** platforms.

{% callout type="warning"  %}
**`libgcc` Dependency**

The Scripted Installer instructions below assume you have the `libgcc` package installed (due to a dependency on `libgcc_s.so`). 

If necessary, run the following command on your Alpine distro to add the `libgcc` package (may require `sudo`):

```console
apk add libgcc
```
{% /callout %}


## Step 1. Download the Install Script

Download the latest scripted installer.

- **Note:** If you do not have a download link, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).

- **Note:** Although the Object Mount `musl` scripted installer file is named `cuno-mne-amd64-musl-installer.run`, it is designed to run on _both_ AMD64 and Intel x86_64 processors (although not ARM-based CPUs).


## Step 2. Install & Activate Object Mount

- **Note:** If you do not yet have a license key, you can install Object Mount for Linux in a fully-featured **Free Trial** mode. Reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch) for more details.

**2a.** To install Object Mount for use _only_ by the **current user**, run the following command from a terminal window (select your processor type):

```shell
# terminal
sh cuno-mne-amd64-musl-installer.run
```

**2b.** To install Object Mount to be used by **all users** system-wide, add `sudo` to the _front_ of the run command:

```shell
# terminal
sudo sh cuno-mne-amd64-musl-installer.run
```

**2c.** The installation process will prompt you to read and agree to the Object Mount **end-user license agreement (EULA)**. 

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

When Object Mount is installed via a **Scripted Installer** (e.g.: glibc or musl), components are installed to different locations depending on whether it was installed by a root, or by a non-root user.

| Install Method     | Location (`CUNO_ROOT`) | Symlinks created in            |
|--------------------|------------------------|--------------------------------|
| Non-Root User      | `~/.local/opt/cuno/`   | `~/.local/bin/`
|                    |                        | `~/.local/lib/x86_64-linux-gnu`
|                    |                        | `~/.local/share/man/`
| Root User (`sudo`) | `/opt/cuno/`           | `/usr/bin/` 
|                    |                        | `/usr/lib/`
|                    |                        | `/usr/share/man/`


## Next Steps

Once Object Mount is installed, proceed to the User Guide article: [](docId:JDK2ED8HGFmyaxk) to ensure you can access both public and private Object Storage buckets.
