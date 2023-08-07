---
title: Uplink CLI
docId: TbMdOGCAXNWyPpQmH6EOq
redirects:
  - /dcs/getting-started/quickstart-uplink-cli/prerequisites
  - /dcs/getting-started/quickstart-uplink-cli
pageTitle: Quickstart Uplink CLI
---

## Introduction

Set up your Uplink CLI in a 2-step process.

## Step 1. Create an Account

Go to storj.io, and [start for free](https://storj.io/signup).

## Step 2. Download and Install the binary for your OS

{% tabs %}
{% tab label="Windows" %}
Download the [Windows Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplink_windows_amd64.zip) zip file

In the Downloads folder, right-click and select "Extract all"

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/oKwJdejxfzapgH0sJBSaO_qsuplinkwindows01.png)

Extract to your user's folder ("**Alexey"** in this example):

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/okywjcPwdjfWjcUMWGKla_qsuplinkwindows02.png)

Once extracted, do not try to open the file, as it can only be accessed via the command line.

Open **Windows PowerShell** and continue on to the next step.
{% /tab %}

{% tab label="Linux" %}
AMD64

**Curl Download**

```shell
curl -L https://github.com/storj/storj/releases/latest/download/uplink_linux_amd64.zip -o uplink_linux_amd64.zip
unzip -o uplink_linux_amd64.zip
sudo install uplink /usr/local/bin/uplink
```

**Direct Download**

[Linux AMD64 Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplink_linux_amd64.zip)

**ARM**

Curl Download

```shell
curl -L https://github.com/storj/storj/releases/latest/download/uplink_linux_arm.zip -o uplink_linux_arm.zip
unzip -o uplink_linux_arm.zip
sudo install uplink /usr/local/bin/uplink
```

Direct Download

[Linux ARM Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplink_linux_arm.zip)

**ARM64**

Curl Download

```shell
curl -L https://github.com/storj/storj/releases/latest/download/uplink_linux_arm64.zip -o uplink_linux_arm64.zip
unzip -o uplink_linux_arm64.zip
sudo install uplink /usr/local/bin/uplink
```

Direct Download

[Linux ARM64 Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplink_linux_arm64.zip)

{% /tab %}

{% tab label="macOS" %}
**Curl Download**

```shell
curl -L https://github.com/storj/storj/releases/latest/download/uplink_darwin_amd64.zip -o uplink_darwin_amd64.zip
unzip -o uplink_darwin_amd64.zip
sudo install uplink /usr/local/bin/uplink
```

**Direct Download**

\*\*\*\*[macOS Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplink_darwin_amd64.zip)
{% /tab %}
{% /tabs %}
