---
title: Installation
weight: 1
hideTitle: true
metadata:
  title:  macOS Native Installation
  description:
    Details about installing Object Mount on macOS
---
# macOS Native Installation Guide

This section covers how to install the app on macOS using the standard `.dmg` installer. The process is quick and straightforward, with just a couple of setup steps to ensure everything works smoothly on both Intel and Apple Silicon (M1/M2/M3/M4) machines.

---

## System Requirements

Before you begin, make sure your system meets the following:

- macOS 12.0 Monterey or later  
- At least 300MB of free disk space  
- Internet connection for mounting cloud-hosted buckets, or LAN connection for mounting local buckets
- **macFUSE 4.8.2 or later** must be installed (we’ll walk you through it)

---

## Step 1: Download the Installer

Download the correct `.dmg` file for your system. 

{% callout type="info" %}
Choose the version that matches your chip architecture: x86 for Intel or arm64 for Apple Silicon).
{% /callout %}

If you're unsure which chip you have:
- Click the Apple  menu in the top left  
- Select **About This Mac**  
- Look for **Processor** (Intel) or **Chip** (Apple M1, M2, etc.)

---

## Step 2: Install the App

1. Double-click the `.dmg` file to mount it  
2. Drag the app into your **Applications** folder

---

## Step 3: Install macFUSE (Required)

The app uses **macFUSE** to handle filesystem mounting. If you don’t have it already:

1. Download the latest version from the [macFUSE releases page](https://osxfuse.github.io/)  
2. Open the `.dmg` and run the installer  
3. You’ll likely be prompted to allow a System Extension in **System Settings → Privacy & Security**  
4. Click “Allow” and restart your Mac into Recovery Mode if prompted

{% callout type="warning" %}
You must allow macFUSE in System Settings, or the app won't be able to mount.
{% /callout %}

---

## Step 4: Launch the App

Once installed:

- Open the app from your **Applications** folder
- You will be prompted to enter your **Licence Key** automatically    
- You may be prompted to grant access to removable volumes or network locations — click **Allow**

---
