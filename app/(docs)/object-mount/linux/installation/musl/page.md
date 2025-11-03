---
title: musl
hideTitle: false
docId: ao0yaeng2Aitheel
weight: 5
metadata:
  title: Musl
  description:
    Musl Installation Instructions
hidden: false
---


The Scripted Installer allows you to install Object Mount without root privileges (no sudo).

{% callout type="note"  %}
This installation method assumes you have the `libgcc` package installed (due to a dependency on `libgcc_s.so`). On Alpine you can do (may require `sudo`):

```console
apk add libgcc
```
{% /callout %}

1. Download the installer. By downloading you are agreeing to the terms of the 🌐 [End User License Agreement](https://www.storj.io/legal/terms-of-use). Click to download the 🌐 [latest musl version](https://github.com/cunoFS/cunoFS/releases/latest/download/cuno-musl-installer.run) from your browser, or run the command:

   ```console
   wget https://github.com/cunoFS/cunoFS/releases/latest/download/cuno-musl-installer.run
   ```

2. To install only for the current user, run the following terminal command:

   ```console
   sh cuno-musl-installer.run
   ```

   To install system-wide, run:

   ```console
   sudo sh cuno-musl-installer.run
   ```

3. The installation will prompt you to read the displayed end-user licence agreement (EULA) and agree to the terms to continue with the installation. To automate this, you can set the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"` (this is equivalent to accepting the EULA).

4. The installation will prompt you to activate Object Mount by starting a trial or entering a license key. Follow the steps interactively, or automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.

5. The installation will prompt you to set the `CUNO_ROOT` environment variable to the installation directory. This is not always necessary when using Object Mount, but it will make it easier to follow the steps in this guide.
