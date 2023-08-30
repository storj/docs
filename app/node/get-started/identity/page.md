---
title: Step 5. Create an Identity
docId: aT6VAB297OWLd4vqeXxf5
redirects:
  - /node/dependencies/identity
---

## Before starting

[](docId:hbCGTv1ZLLR2-kpSaGEXw)

[](docId:v-fUvPqySvUwTMF-od6hD)

[](docId:y0jltT-HzKPmDefi532sd)

[](docId:owZeAc56KSDnUzDhsBfB8)

{% callout type="warning"  %}
**Failure to complete these steps will prevent your storage node from working.**
{% /callout %}

## Introduction

Every node is required to have a unique identifier on the network.

## 1. Download the Identity Binary

Open a terminal window as a usual user (not administrator or root) and paste the command for your OS:

{% tabs %}
{% tab label="Linux" %}

```bash
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_amd64.zip -o identity_linux_amd64.zip
unzip -o identity_linux_amd64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

ARM-based OS

Raspberry PI:

```bash
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_arm.zip -o identity_linux_arm.zip
unzip -o identity_linux_arm.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

Devices Capable of the AARCH64 Instruction Set:

```bash
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_arm64.zip -o identity_linux_arm64.zip
unzip -o identity_linux_arm64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

{% /tab %}

{% tab label="Windows" %}
PowerShell:

```powershell
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
**This can take several hours or days, depending on your machines processing power and luck.**

Plan to run your Node on a NAS, Raspberry Pi or similar? Create your identity on a more powerful machine and transfer it over.
{% /callout %}

## 2. Create an identity

{% tabs %}
{% tab label="Linux" %}

```shell
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

{% tab label="macOS" %}

```shell
identity create storagenode
```

{% /tab %}
{% /tabs %}

This process will continue until it reaches a difficulty of at least 36. On completion, it will look something like this:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/ziCJkaXYzJYBRuLl0vyA2_image.png)

## 3. Authorize the identity

Authorize your Storage Node identity using your single-use authorization token (please, replace the placeholder **email\:characterstring** to your actual authorization token):

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Yi1FdCqXE0mIbsiwMDtDr_image.png)

Authorize your Storage Node identity using your [](docId:v-fUvPqySvUwTMF-od6hD) (_please, replace the placeholder to your actual authorization token_):

{% tabs %}
{% tab label="Linux" %}

```shell
identity authorize storagenode <email:characterstring>
```

{% /tab %}

{% tab label="Windows" %}

```powershell
./identity.exe authorize storagenode <email:characterstring>
```

```shell
identity.exe authorize storagenode <email:characterstring>
```

{% /tab %}

{% tab label="macOS" %}

```shell
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

```shell
grep -c BEGIN ~/.local/share/storj/identity/storagenode/identity.cert
```

{% /tab %}

{% tab label="Windows" %}

```powershell
(sls BEGIN "$env:AppData\Storj\Identity\storagenode\ca.cert").count
```

```powershell
(sls BEGIN "$env:AppData\Storj\Identity\storagenode\identity.cert").count
```

```powershell
findstr "BEGIN" "%APPDATA%\Storj\Identity\storagenode\ca.cert" | find /c /v ""
```

```powershell
findstr "BEGIN" "%APPDATA%\Storj\Identity\storagenode\identity.cert" | find /c /v ""
```

{% /tab %}

{% tab label="macOS" %}

```macos
grep -c BEGIN ~/Library/Application\ Support/Storj/identity/storagenode/ca.cert
grep -c BEGIN ~/Library/Application\ Support/Storj/identity/storagenode/identity.cert
```

{% /tab %}
{% /tabs %}

The first command should return **2**, and the second command should return **3**:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/GlTZ8mJI50FN4_AMDPri-_image.png)

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

{% tab label="macOS" %}
Your identity folder is located in:

`/Users/USER/Library/Application Support/Storj/identity/storagenode`
{% /tab %}
{% /tabs %}

## Optional: Move the identity to the subfolder in the storage location

It's not required, but could prevent the storagenode from start, if the mounted disk is inaccessible.

Unfortunately this trick will not help, if the disk would disappear while the storagenode running.

##
