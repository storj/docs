---
title: musl
hideTitle: true
docId: ao0yaeng2Aitheel
weight: 2
metadata:
  title: musl
  description:
    musl Scripted Installer Instructions
hidden: false
---

# musl Scripted Installer

Some Linux distributions (including Alpine) use the musl C standard library: 🌐 [musl](https://en.wikipedia.org/wiki/musl).

Storj’s Object Mount **musl scripted installer** (a `.run` file) is compatible with all such Linux distributions.

This installer shell script allows you to install Object Mount (for the current user) _without_ needing root privileges &mdash; no `sudo` required.

{% callout type="info" %}
  **Optional: Package Installer**

  If you prefer a **full installer** for use with package managers (i.e.: Alpine, etc.) refer to the [](docId:MeiPie8EDuo7eise) installation instructions.
{% /callout %}

Follow the steps below to install and configure Object Mount for **musl** platforms.

{% callout type="warning" %}
  **`libgcc` Dependency**

  The `musl` Scripted Installer instructions below assume you have the `libgcc` package installed (due to a dependency on `libgcc_s.so`). 

  If necessary, run the following command on your Alpine distro to add the `libgcc` package (may require `sudo`):

  ```console
  apk add libgcc
  ```
{% /callout %}


## Step 1. Download the Install Script

Download the latest scripted installer.

- **Note:** If you do not have a download link, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).

- **Note:** The musl scripted installer is named `cuno-<version>-x86_64-musl-installer.run`. It runs on 64-bit Intel and AMD (x86_64) processors, not on ARM-based CPUs.


## Step 2. Install & Activate Object Mount

- **Note:** If you do not yet have a license key, ask your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch) for a trial key.

**2a.** To install Object Mount for use _only_ by the **current user**, run the following command from a terminal window:

```shell
# terminal
sh cuno-<version>-x86_64-musl-installer.run
```

**2b.** To install Object Mount to be used by **all users** system-wide, add `sudo` to the _front_ of the command:

```shell
# terminal
sudo sh cuno-<version>-x86_64-musl-installer.run
```

**2c.** The installation process will prompt you to read and agree to the Object Mount **end-user license agreement (EULA)**. 

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-eula.jpg)

- **Note:** You can automate this step by setting the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"`. (This is equivalent to accepting the EULA).

**2d.** The installer then activates Object Mount if the environment variable `CUNO_INSTALL_LICENSE` is set to your license key or to the full path of a license key file. Set it to `none`, or leave it unset, to skip activation. With `sudo`, set `CUNO_INSTALL_LICENSE` and `CUNO_INSTALL_ACCEPT_EULA` after `sudo` (for example `sudo CUNO_INSTALL_LICENSE=/path/to/license.txt <install command>`); `sudo` drops variables set before it.

If Object Mount is not activated, the installer prints the next steps. Activate it afterwards with `cuno creds activate`; see [](docId:BN6yJrwasPnZsaf).


## Installation Locations: Scripted Installers

When Object Mount is installed via a **Scripted Installer** (e.g.: glibc or musl), components are installed to different locations depending on whether it was installed by a root, or by a non-root user.

| Install Method     | Install directory    | Symlinks created                                                     |
|--------------------|----------------------|----------------------------------------------------------------------|
| Non-Root User      | `~/.local/opt/cuno/` | `~/.local/bin/cuno`
|                    |                      | `~/.local/lib/x86_64-linux-gnu/cuno.so`
|                    |                      | bash completions in `~/.local/share/bash-completion/completions/`
| Root User (`sudo`) | `/opt/cuno/`         | `/usr/bin/cuno`
|                    |                      | `/usr/lib/cuno.so`
|                    |                      | bash completions in the system bash-completion directory
|                    |                      | zsh completions in `/usr/share/zsh/vendor-completions/`


## Next Steps

_Once Object Mount is installed_, proceed to the Linux User Guide article: [](docId:JDK2ED8HGFmyaxk) to ensure you can access both public and private Object Storage buckets.
