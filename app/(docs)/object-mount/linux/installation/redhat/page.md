---
title: Red Hat
hideTitle: false
docId: woosaugaiNohree9
weight: 4
metadata:
  title: Red Hat
  description:
    Red Hat Installation Instructions
hidden: false
---

1. Donwload the installer. By downloading you are agreeing to the terms of the 🌐 [End User License Agreement](https://www.storj.io/legal/terms-of-use). Click to download the latest version of the 🌐 [self-extracting package for RHEL](https://github.com/cunoFS/cunoFS/releases/latest/download/cuno_x86_64_glibc_rpm.run) from your browser, or run the command:

   ```console
   wget https://github.com/cunoFS/cunoFS/releases/latest/download/cuno_x86_64_glibc_rpm.run
   ```

2. Unpack the archive by running:

   ```console
   sh cuno_x86_64_glibc_rpm.run
   ```

3. Please follow the interactive steps, read the displayed end-user licence agreement (EULA) and agree to the terms to continue with the extraction. To automate this, you can set the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"` (this is equivalent to accepting the EULA).

4. The archive and its contents will be unpacked into a directory named `cuno_{FULL-VERSION}_x86_64_glibc` containing the package itself and additional documents:

   ```console
   $ ls cuno_{FULL-VERSION}_x86_64_glibc
   cuno_{FULL-VERSION}_x84_64_.rpm
   CUNO-Installation-and-User-Guide.pdf
   ```

5. Install Object Mount and its dependencies using `yum`:

   ```console
   sudo yum makecache
   sudo yum install ./cuno_{FULL-VERSION}_x86_64_glibc/cuno_{FULL-VERSION}_x86_64_glibc.rpm
   ```

6. The installation will prompt you to activate Object Mount by starting a trial or entering a license key. Follow the steps interactively, or automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.

7. The installation will prompt you to set the `CUNO_ROOT` environment variable to the installation directory. This is not always necessary when using Object Mount, but it will make it easier to follow the steps in this guide.
