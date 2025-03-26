---
title: Alpine
docId: MeiPie8EDuo7eise

metadata:
  title: Alpine
  description:
    Alpine Installation Instructions


weight: 0
---

1. Download the installer. By downloading you are agreeing to the terms of the [End User License Agreement](https://cuno.io/cunoFS-EULA). Click to download the latest version of the [self-extracting package for Alpine](https://github.com/cunoFS/cunoFS/releases/latest/download/cuno_x86_64_musl_apk.run) from your browser, or run the command:

   ```console
   wget https://github.com/cunoFS/cunoFS/releases/latest/download/cuno_x86_64_musl_apk.run
   ```

2. Download the public key for package verification `cunoFS.rsa.pub`:

   ```console
   wget https://github.com/cunoFS/cunoFS/releases/latest/download/cunoFS.rsa.pub
   ```

   or create a file called `cunoFS.rsa.pub` with our public key using this "one-liner" (copy the whole thing, paste into your terminal, hit enter/return):

   ```console
   cat >cunoFS.rsa.pub <<EOF
   -----BEGIN PUBLIC KEY-----
   MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAl1TDuzTVhYkr8OPFqU4D
   r250/ESsKys92maH7NWC6tprLEaGoTUWi/7XMO33dOOnIuHqWctcxvG/V5sQTRem
   PmyozszYyAFNziSO8Wrp9kiCQZ72NyN00j3I+zKG3m/tQ6nVbl5JkWniuPhn6rKQ
   mHE72e07+aHGk6a8/cTbkvMe9DA61Uhgu3BOj5+S8ksQhc6k4SFTu3XfhOKu+pIR
   U0GJ+/ZtjagvDzwX6Ebf6YS+Skn1CCX4FrLC20CdyyIwf1qvKNG141ireaZlIdp8
   4GCOG0UkccAMrACNipRXYfE2/Cx6uiwnwCoqa095CPqPvVXWZY++IlFk/8qdsiJj
   FotKjfBd3H68UIMpZF+seIkT/NSIHkyViwUiwrfaMTrIfklZwer+dvVgYvN2M/K/
   Eq6QSu9ZzefcE605I14rHya6AnqSVyJx4GZ23tz1fT+l1qA7xC/jJ5jZ04Ni7y8Z
   CVEgn/9GD7hgZIc72bD4W8438oxhaALjbZadGz7mfmrp9j96w2pJzW59bpiT+f7I
   Kgg57/XM1fjrDQ3xopM5PDTHzxPiIpvMGLmPivvr9gt3L3PoHHjWj3veS34OVPot
   RnYU4SBGBHVq0sNZPkeaZpb1bpNyF4t7458F/+RWPVF3S+y0we1q0Q5O9yk6LIfp
   OOUcK6r8cF6LV+CdCEE9VbkCAwEAAQ==
   -----END PUBLIC KEY-----
   EOF
   ```

3. Move the rsa public key into the Alpine directory of trusted signatures `/etc/apk/keys` (may need `sudo`):

   ```console
   mv cunoFS.rsa.pub /etc/apk/keys/
   ```

4. Unpack the archive by running:

   ```console
   sh cuno_x86_64_musl_apk.run
   ```

5. Please follow the interactive steps, read the displayed end-user licence agreement ([EULA](https://cuno.io/cunoFS-EULA)) and agree to the terms to continue with the extraction. To automate this, you can set the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"` (this is equivalent to accepting the EULA).

6. The archive and its contents will be unpacked into a directory named {code}`cuno_{FULL-VERSION}_x86_64_musl` containing the package itself and additional documents:

   ```console
   $ ls cuno_{FULL-VERSION}_x86_64_musl
   cuno_{FULL-VERSION}_x84_64_.apk
   CUNO-Installation-and-User-Guide.pdf
   ```

7. Install Object Mount and its dependencies using `apk` (may need `sudo`):

   ```console
   apk add ./cuno_{FULL-VERSION}_x86_64_musl/cuno_{FULL-VERSION}_x86_64_musl.apk
   ```

8. The installation will prompt you to activate Object Mount by starting a trial or entering a license key. Follow the steps interactively, or automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.

9. The installation will prompt you to set the {code}`CUNO_ROOT` environment variable to the installation directory. This is not always necessary when using Object Mount, but it will make it easier to follow the steps in this guide.
