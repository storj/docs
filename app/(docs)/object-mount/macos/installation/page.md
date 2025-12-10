---
title: Installation Guide
hideTitle: true
docId: MyV4Bv3fKJEZucAb
weight: 1
metadata:
  title: Installation Guide for Native macOS App
  description:
    Details about installing Object Mount on macOS
hidden: false
---

# Installation Guide: macOS Native App

This section covers how to install the Object Mount native application for macOS using a standard `.dmg` image. 

The steps below work for Macs with either Intel processors or Apple Silicon (M1-M5) chips.


## System Requirements

Before you begin, make sure your Mac meets the following system requirements:

- macOS 12 Monterey or later

  (Note: macOS 13 Ventura or later is required for advanced features such as Fast Copy & Fast Move.)

- At least 300MB of free disk space
- Internet connection for mounting cloud-hosted buckets, or LAN connection for mounting local S3 buckets
- macFUSE 4.8.2 or later must be installed (see instructions below)

{% callout type="note" %}
  **S3 Provider Support:**

  Object Mount for Mac fully supports S3 container services from Amazon Web Services, Storj, and other fully S3-compatible Object Storage providers. 
  
  - See the [Supported S3 Providers](docId:xCjeasn8SLQn2vfd) article in the Appendix for a complete S3 provider list.

  **Azure & GCS Support:** 
  
  - Support for _Native_ Microsoft Azure Storage and _Native_ Google Cloud Storage services are still under development in Object Mount for Mac.
  - For Google Cloud access: Using GCS _S3_ is recommended instead of using GCS _S3 Gateways_.
  - Native Azure and Native GCS (S3 Gateways) should be considered “experimental” at this time.
{% /callout %}


## Step 1: Download the latest Installation Image

Download the correct macOS `.dmg` disk image file for your system. 

**Note:** Contact your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch) if you need access to the most up-to-date disk image.

{% callout type="info" %}
  **Mac Chip Types**

  Be sure to choose the disk image that matches your chip architecture: 
  - **x86** for Intel processors
  - **arm64** for Apple Silicon/chips (M1-M5).

  To determine which chip you have:
  - Click the Apple  menu in the top left  
  - Select **About This Mac**  
  - Look for **Processor** (Intel) or **Chip** (Apple M1, M2, etc.)
{% /callout %}


## Step 2: Install the Object Mount App

1. Double-click the `.dmg` file to mount it  
2. Drag the Object Mount app into your **Applications** folder

    ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/on-mac-drag-to-install.jpg)


## Step 3: Install macFUSE (Required)

The native macOS Object Mount app requires the **macFUSE** system extension. 

macFuse, on both Intel and Apple silicon Macs, provides system-level volume mounting extensions that Object Mount leverages.

Download and install macFUSE following the steps below for your Mac hardware type:

{% tabs %}

{% tab label="Intel Processor" %}
  1. Download the **latest** version (not pre-release) `.dmg` image from the [macFUSE releases page](https://macfuse.github.io/).

  2. Open the macFUSE `.dmg` and run the **Install macFUSE.pkg**.
      - As prompted, click **Allow**, **Continue** and/or **Agree** to install the package

  3. As a new System Extension, the package will generate a “System Extension Blocked” message.
    
      - Open **System Settings**
      - Open **Security & Privacy**
      - Click the **lock** 🔒 icon to allow changes
      - Click the **Allow** button to permit the installation

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-macfuse-01.jpg)

  4. Restart your Mac when prompted.
{% /tab %}

{% tab label="Apple Silicon (M Chip)" %}
  1. Download the **latest** version (not pre-release) `.dmg` image from the [macFUSE releases page](https://macfuse.github.io/).

  2. Open the macFUSE `.dmg` and run the **Install macFUSE.pkg**.
      - As prompted, click **Allow**, **Continue** and/or **Agree** to install the package

  3. As a new System Extension, the package will generate a “System Extension Blocked” message.
      - Open **System Settings**
      - Open **Privacy & Security**
      - Scroll down to the **Security** section
      - Find and click the **Enable System Extensions...** button

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-fuse-install-01-enable.jpg)

  4. You will then be prompted to **Shut Down** and restart your Mac into its **Recovery Mode**
      -Save any work you have in progress
      - Click **Shut Down**

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-fuse-install-02-shut-down.jpg)

  5. With your Mac powered off, **PRESS AND HOLD** your power button (or Touch ID button) for 3-5+ seconds.
      - You should see an Apple message that says **Continue holding for startup options...**

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-recovery-mode-01-hold.jpg)

      - Continue holding the power button until the message changes to **Loading startup options...**

  6. In the modified boot screen, click the gear icon labeled **Options** then click **Continue**

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-recovery-mode-02-gear.jpg)

      - Select your admin user, click **Next** and enter your password to view the **Recovery Mode** screen and its menu options

  7. From the **Recovery** menu, select the **Utilities** drop-down menu and choose **Startup Security Utility** 

  8. Select your primary hard drive and click **Unlock...**

      - Enter your Admin password and click **Unlock**

  9. Once unlocked, click the **Security Policy...** button

  10. Click the **Reduced Security** radio button

      - Then, tick the first box for **Allow user management of kernel extensions from identified developers**

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-mac-recovery-mode-03-reduced-security.jpg)

      - Click **OK** and enter your admin password one last time

  11. Lastly, from the **Startup Disk** Menu, choose **Shut Down**

  Restart your Mac as normal.
{% /tab %}

{% /tabs %}


## Next Steps

Proceed to the macOS [User Guide](docId:QpBba8p4bMTXAkBK) to **activate** your Object Mount installation, **configure** your object storage credentials, and **create** your first mount.

Then review the macOS [Feature Guide](docId:ehHbpq6KFndcVCgc).

Finally, read through the usage tips for your specific [Media Workflows](docId:JXF4_NLsV@nh9QcT) and Applications.
