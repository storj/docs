---
title: Glibc
docId: ahWohd5eegh6eizi

metadata:
  title: Glibc
  description:
    Glibc Installation Instructions

---

The Scripted Installer allows you to install Object Mount without root privileges (no sudo).

{% callout type="note"  %}
For full details about user privileges for installation, see the {ref}`user guide <user-guide-scripted-install>`.
{% /callout %}

1. Download the installer. By downloading you are agreeing to the terms of the [End User License Agreement](https://cuno.io/cunoFS-EULA). Click to download the [latest version](https://github.com/cunoFS/cunoFS/releases/latest/download/cuno-glibc-installer.run) from your browser, or run the command:

   ```console
   wget https://github.com/cunoFS/cunoFS/releases/latest/download/cuno-glibc-installer.run
   ```

2. To install only for the current user, run the following terminal command:

   ```console
   sh cuno-glibc-installer.run
   ```

   To install system-wide, run:

   ```console
   sudo sh cuno-glibc-installer.run
   ```

3. The installation will prompt you to read the displayed end-user licence agreement (EULA) and agree to the terms to continue with the installation. To automate this, you can set the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"` (this is equivalent to accepting the EULA).

4. The installation will prompt you to activate Object Mount by starting a trial or entering a license key. Follow the steps interactively, or automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.

5. The installation will prompt you to set the `CUNO_ROOT` environment variable to the installation directory. This is not always necessary when using Object Mount, but it will make it easier to follow the steps in this guide.
