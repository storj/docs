---
title: Docker
docId: EW9B_0fJujL3Z5aTLUW7d
weight: 0
redirects:
  - /node/setup/cli/docker
---

## Install Docker

What we use to package the Storage Node software and push new updates. To set up a Storage Node, you first must have Docker installed. Install Docker by following the appropriate installation guide for your OS.

{% tabs %}
{% tab label="Linux" %}

[**Ubuntu Docker Installation**](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

[**CentOS Docker Installation**](https://docs.docker.com/install/linux/docker-ce/centos/)

[**Debian Docker Installation**](https://docs.docker.com/install/linux/docker-ce/debian/)

[**Fedora Docker Installation**](https://docs.docker.com/install/linux/docker-ce/fedora/)
{% /tab %}

{% tab label="macOS" %}
[**MacOS Docker Installation**](https://docs.docker.com/docker-for-mac/install/)

{% callout type="danger"  %}
Please, install version **2.1.0.5** if you have any issues with the newest version: [Docker Desktop Community 2.1.0.5 (for x86-64 processors only)](https://download.docker.com/mac/stable/40693/Docker.dmg).

As far as we know all newer versions have various issues, such as losing network connection, have false disk errors and so on as described in this thread: [Nodes offline for 3/4 days. Is it possible to recover?](https://forum.storj.io/t/nodes-offline-for-3-4-days-is-it-possible-to-recover/11697/16?u=alexey)
{% /callout %}

{% callout type="warning"  %}
**Docker Toolbox is not supported.**
{% /callout %}
{% /tab %}

{% tab label="Windows" %}

[Windows Docker Installation](https://docs.docker.com/docker-for-windows/install/#install-docker-desktop-for-windows-desktop-app)

{% callout type="danger"  %}
Please, install version **2.1.0.5** if your Windows doesn't support WSL2 and you have any issues in a newest version: [Docker Desktop Community 2.1.0.5](https://download.docker.com/win/stable/40693/Docker%20Desktop%20Installer.exe).

As far as we know all newer versions for Hyper-V have various issues, such as losing network connection as described in this thread:[ Latest Docker Desktop for Windows compatibility?](https://forum.storj.io/t/latest-docker-desktop-for-windows-compatibility/6045)
{% /callout %}

{% callout type="warning"  %}
**Docker Toolbox is not supported**
{% /callout %}

{% /tab %}
{% /tabs %}
