---
title: Step 5. Create an Identity
createdAt: 2022-05-24T21:20:52.000Z
updatedAt: 2023-07-25T17:45:35.823Z
docId: aT6VAB297OWLd4vqeXxf5
redirects:
  - /dcs/dependencies/identity
---

## Before starting

[](docId:hbCGTv1ZLLR2-kpSaGEXw)&#x20;

[](docId:v-fUvPqySvUwTMF-od6hD)&#x20;

[](docId:y0jltT-HzKPmDefi532sd)&#x20;

[](docId:owZeAc56KSDnUzDhsBfB8)&#x20;

{% callout type="warning"  %}
**Failure to complete these steps will prevent your storage node from working.**
{% /callout %}

## Introduction

Every node is required to have a unique identifier on the network.

## 1. Download the Identity Binary

Open a terminal window as a usual user (not administrator or root) and paste the command for your OS:

{% tabs %}
{% tab label="Linux" %}

```Text
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_amd64.zip -o identity_linux_amd64.zip
unzip -o identity_linux_amd64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

ARM-based OS

Raspberry PI:

```Text
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_arm.zip -o identity_linux_arm.zip
unzip -o identity_linux_arm.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

Devices Capable of the AARCH64 Instruction Set:

```Text
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_arm64.zip -o identity_linux_arm64.zip
unzip -o identity_linux_arm64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

{% /tab %}

{% tab label="Windows" %}
PowerShell:

```Text
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; curl https://github.com/storj/storj/releases/latest/download/identity_windows_amd64.zip -o identity_windows_amd64.zip; Expand-Archive ./identity_windows_amd64.zip . -Force
```

{% /tab %}

{% tab label="macOS" %}

```shell
curl -L https://github.com/storj/storj/releases/latest/download/identity_darwin_amd64.zip -o identity_darwin_amd64.zip
unzip -o identity_darwin_amd64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

ARM-based macOS

```shell
curl -L https://github.com/storj/storj/releases/latest/download/identity_darwin_arm64.zip -o identity_darwin_arm64.zip
unzip -o identity_darwin_arm64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

{% /tab %}
{% /tabs %}

{% callout type="info"  %}
**This can take several hours or days, depending on your machines processing power and luck.**&#x20;

Plan to run your Node on a NAS, Raspberry Pi or similar? Create your identity on a more powerful machine and transfer it over.
{% /callout %}

## 2. Create an identity

{% tabs %}
{% tab label="Linux" %}

```Text
identity create storagenode
```

If you are unable to execute the command, be sure that you set your file permission to executable: `chmod +x identity`
{% /tab %}

{% tab label="Windows" %}
PowerShell:

```powershell
./identity.exe create storagenode
```

Command Prompt:

```shell
identity.exe create storagenode
```

{% /tab %}

{% tab label="all macOS" %}

```shell
identity create storagenode
```

{% /tab %}
{% /tabs %}

4\. This process will continue until it reaches a difficulty of at least 36. On completion, it will look something like this:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/ziCJkaXYzJYBRuLl0vyA2_image.png)

## 3. Authorize the identity

Authorize your Storage Node identity using your single-use authorization token (please, replace the placeholder **email\:characterstring** to your actual authorization token):

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Yi1FdCqXE0mIbsiwMDtDr_image.png)

Authorize your Storage Node identity using your [](docId:v-fUvPqySvUwTMF-od6hD) (_please, replace the placeholder to your actual authorization token_):

{% tabs %}
{% tab label="Linux" %}

```Text
identity authorize storagenode <email:characterstring>
```

{% /tab %}

{% tab label="Windows" %}

```powershell
./identity.exe authorize storagenode <email:characterstring>
```

```Text
identity.exe authorize storagenode <email:characterstring>
```

{% /tab %}

{% tab label="all macOS" %}

```macos
identity authorize storagenode <email:characterstring>
```

{% /tab %}
{% /tabs %}

Confirm the identity

Run the following command to confirm you have the required identity files:

{% tabs %}
{% tab label="Linux" %}

```shell
grep -c BEGIN ~/.local/share/storj/identity/storagenode/ca.cert
```

```text

```

{% /tab %}

{% tab label="Windows" %}

```powershell
(sls BEGIN "$env:AppData\Storj\Identity\storagenode\ca.cert").count
```

```powershell
(sls BEGIN "$env:AppData\Storj\Identity\storagenode\identity.cert").count
```

```Text
findstr "BEGIN" "%APPDATA%\Storj\Identity\storagenode\ca.cert" | find /c /v ""
```

```Text
findstr "BEGIN" "%APPDATA%\Storj\Identity\storagenode\identity.cert" | find /c /v ""
```

{% /tab %}

{% tab label="all macOS" %}

```macos
grep -c BEGIN ~/Library/Application\ Support/Storj/identity/storagenode/ca.cert
grep -c BEGIN ~/Library/Application\ Support/Storj/identity/storagenode/identity.cert
```

{% /tab %}
{% /tabs %}

The first command should return **2**, and the second command should return **3**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/GlTZ8mJI50FN4_AMDPri-_image.png)

If your numbers are different, then [](docId:aT6VAB297OWLd4vqeXxf5) was not successful. Please try again.

Might move your storage node to another machine in the future? Back up your identity folder.

## 4. Backup the identity

{% callout type="danger"  %}
**Backup before you continue, it should be quick! 🙏**

This allows you to restore your Node in case of an unfortunate hardware or OS incident.
{% /callout %}

Use an external device and backup your identity folder:

{% tabs %}
{% tab label="Linux" %}
Your identity folder is located in:`~/.local/share/storj/identity/storagenode`

On Raspberry Pi, your identity folder is located in: `/home/pi/.local/share/storj/identity/storagenode`
{% /tab %}

{% tab label="Windows" %}
Your identity folder is located in (PowerShell): `start "$Env:APPDATA/Storj/Identity/storagenode"`

In Command Prompt or Windows Explorer: `start "%APPDATA%\Storj\Identity\storagenode"`
{% /tab %}

{% tab label="all macOS" %}
Your identity folder is located in: `/Users/USER/Library/Application Support/Storj/identity/storagenode`
{% /tab %}
{% /tabs %}

## Optional: Move the identity to the subfolder in the storage location

It's not required, but could prevent the storagenode from start, if the mounted disk is inaccessible.

Unfortunately this trick will not help, if the disk would disappear while the storagenode running.

##
