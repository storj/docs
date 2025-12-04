---
title: Debian
hideTitle: false
docId: aemie9zeiP9Nie2k
weight: 3
metadata:
  title: Debian
  description:
    Debian Installation Instructions
hidden: false
---



{% callout type="note"  %}
**Package Manager Installations**

All package manager installations of Object Mount are always system-wide, regardless of the privileges of the user installing it.
{% /callout %}







Storj provides a package installer for Debian (and related) Linux distributions.

{% callout type="info" %}
- If you prefer to use a glibc-based scripted installer, refer to the [](docId:ahWohd5eegh6eizi) installation instructions.
{% /callout %}

Follow the steps below to install and configure Object Mount for **Debian** Linux.

## Step 1. Download the Installer Package Script

Use the latest link to download the scripted installer.

_**Note:** If you do not have a download link, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch)._


## Step 2. Unpack the Archive

Unpack the archive (using the installer's script) by running the following command from a terminal window

  ```console
  sh cuno_mne_amd64_glibc_deb.run
  ```

The unpacking process will prompt you to read and agree to the **end-user license agreement (EULA)**. 
- You can automate this step by setting the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"` (this is equivalent to accepting the EULA).

The archive and its contents will be unpacked into a directory named `cuno_{FULL-VERSION}_amd64_glibc` containing the package itself and additional files.

View the unpacked contents with the following `ls` command:

  ```console
  $ ls cuno_{FULL-VERSION}_amd64_glibc
  cuno_{FULL-VERSION}_amd64.deb
  CUNO-Installation-and-User-Guide.pdf
  ```


## Step 3. Install Object Mount and its dependencies using `apt`:

   {% callout type="note"  %}
   Be sure to use a relative path here, `./`, to instruct `apt` not to search its repositories.
   {% /callout %}

   ```console
   sudo apt update
   sudo apt install ./cuno_{FULL-VERSION}_amd64_glibc/cuno_{FULL-VERSION}_amd64_glibc.deb
   ```

6. The installation will prompt you to activate Object Mount by starting a trial or entering a license key. Follow the steps interactively, or automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.

7. The installation will prompt you to set the `CUNO_ROOT` environment variable to the installation directory. This is not always necessary when using Object Mount, but it will make it easier to follow the steps in this guide.
