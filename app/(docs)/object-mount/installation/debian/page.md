---
title: Debian Installation Instructions
docId: aemie9zeiP9Nie2k

metadata:
  title: Debian Installation Instructions
  description:
    Debian Installation Instructions


weight: 0
---

1. Download the installer. By downloading you are agreeing to the terms of the [End User License Agreement](https://cuno.io/cunoFS-EULA). Click to download the latest version of the [self-extracting package for Debian](https://github.com/cunoFS/cunoFS/releases/latest/download/cuno_amd64_glibc_deb.run) from your browser, or run the command:

   ```console
   wget https://github.com/cunoFS/cunoFS/releases/latest/download/cuno_amd64_glibc_deb.run
   ```

2. Unpack the archive by running:

   ```console
   sh cuno_amd64_glibc_deb.run
   ```

3. Please follow the interactive steps, read the displayed end-user licence agreement (EULA) and agree to the terms to continue with the extraction. To automate this, you can set the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"` (this is equivalent to accepting the EULA).

4. The archive and its contents will be unpacked into a directory named {code}`cuno_{FULL-VERSION}_amd64_glibc` containing the package itself and additional documents:

   ```console
   $ ls cuno_{FULL-VERSION}_amd64_glibc
   cuno_{FULL-VERSION}_amd64.deb
   CUNO-Installation-and-User-Guide.pdf
   ```

5. Install Object Mount and its dependencies using `apt`:

   {% callout type="note"  %}
   Be sure to use a relative path here, `./`, to instruct `apt` not to search its repositories.
   {% /callout %}

   ```console
   sudo apt update
   sudo apt install ./cuno_{FULL-VERSION}_amd64_glibc/cuno_{FULL-VERSION}_amd64_glibc.deb
   ```

6. The installation will prompt you to activate Object Mount by starting a trial or entering a license key. Follow the steps interactively, or automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.

7. The installation will prompt you to set the {code}`CUNO_ROOT` environment variable to the installation directory. This is not always necessary when using Object Mount, but it will make it easier to follow the steps in this guide.
