---
title: Alpine
hideTitle: false
docId: MeiPie8EDuo7eise
weight: 5
metadata:
  title: Alpine
  description:
    Alpine Package Installer Instructions
hidden: false
---

Storj provides an Object Mount package installer for the Alpine Linux distribution.

This installer can be used with any musl-based Linux distribution.

{% callout type="info" %}
**Optional: Scripted Installer**

If you prefer to use a musl-based **scripted installer**, refer to the [](docId:ao0yaeng2Aitheel) installation instructions.
{% /callout %}

Follow the steps below to install and configure Object Mount for **Alpine**-based Linux platforms.


## Step 1. Download the Installer Package

Download the latest package installer.

- **Note:** If you do not have a download link, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).


## Step 2. Unpack the Archive

Use the installer’s `.run` script to unpack the archive by entering the following command from a terminal window:

```console
sh cuno_mne_x86_64_musl_apk.run
```

{% callout type="info" %}
**Processor Compatibility**

Although the Object Mount Package Installer’s file is named `cuno_mne_x86_64_musl_apk.run`, it is designed to run on _both_ AMD64 and Intel x86_64 processors (although not ARM-based CPUs).
{% /callout %}

The unpacking process will prompt you to read and agree to the Object Mount **end-user license agreement (EULA)**. 

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-eula.jpg)

- **Note:** You can automate this step by setting the environment variable `CUNO_INSTALL_ACCEPT_EULA="yes"`. (This is equivalent to accepting the EULA).

The archive and its contents will be unpacked into a directory named 
`cuno_{VERSION}_x86_64_musl_apk` containing the package itself plus some additional files.

View the unpacked contents with the following `ls` command (substituting your version number):

```console
$ ls cuno_1.2.8.8_x86_64_musl_apk
cuno_1.2.8.8_x86_64_musl.apk
CUNO-Installation-and-Usage-Guide.pdf
```


## Step 3. Install Object Mount and its dependencies using `apk`

**3a.** Install the Object Mount package (substituting your version number):

```console
sudo apk add ./cuno_1.2.8.8_x86_64_musl_apk/cuno_1.2.8.8_x86_64_musl.apk
```

The installer will fetch and install any necessary additional packages (such as `libfuse`, etc.).

**3b.** Next, the installation process will prompt you to **activate Object Mount**. 

- Press 1 to activate a **free trial**:
  - This will activate a fully-featured 14-day free trial.
- Press 2 if you already have a **license key**:
  - Paste your license key or enter a full path to a license key file.

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-linux-cuno-enter-license-key.jpg)

- **Note:** You can automate this step by setting the environment variable `CUNO_INSTALL_LICENSE` to one of `trial | none | <your license key> | <full path to your license key file>`.

{% callout type="note"  %}
**Access for: All-Users**

Due to the use of `sudo`, all package manager installations install Object Mount for use by _all users_ of the system, not just the user that initiated the install process.
{% /callout %}


## Next Steps

Once Object Mount is installed, proceed to the User Guide article: [](docId:JDK2ED8HGFmyaxk) to ensure you can access both public and private Object Storage buckets.
