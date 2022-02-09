---
description: What we use to package the Storage Node software and push new updates.
---

# Docker

### Install Docker

To setup a Storage Node, you first must have Docker installed. Install Docker by following the appropriate installation guide for your OS.

{% tabs %}
{% tab title="Windows" %}
## [Windows Docker **Installation**](https://docs.docker.com/docker-for-windows/install/#install-docker-desktop-for-windows-desktop-app)****

{% hint style="danger" %}
Please, install version **2.1.0.5**: [https://docs.docker.com/docker-for-windows/release-notes/#docker-desktop-community-2105](https://docs.docker.com/docker-for-windows/release-notes/#docker-desktop-community-2105)

All newer versions have various issues, such as losing network connection as described in this thread: [https://forum.storj.io/t/latest-docker-desktop-for-windows-compatibility/6045](https://forum.storj.io/t/latest-docker-desktop-for-windows-compatibility/6045)
{% endhint %}

{% hint style="warning" %}
**Docker Toolbox is not supported**
{% endhint %}
{% endtab %}

{% tab title="Linux" %}
[**Ubuntu Docker Installation**](https://docs.docker.com/install/linux/docker-ce/ubuntu/)****\
****[**CentOS Docker Installation**](https://docs.docker.com/install/linux/docker-ce/centos/)****\
****[**Debian Docker Installation**](https://docs.docker.com/install/linux/docker-ce/debian/)****\
****[**Fedora Docker Installation**](https://docs.docker.com/install/linux/docker-ce/fedora/)****
-------------------------------------------------------------------------------------------------
{% endtab %}

{% tab title="macOS" %}
## ****[**MacOS Docker Installation**](https://docs.docker.com/docker-for-mac/install/)****

{% hint style="danger" %}
Please, install version **2.1.0.5**: [https://docs.docker.com/docker-for-windows/release-notes/#docker-desktop-community-2105](https://docs.docker.com/docker-for-mac/release-notes/#docker-desktop-community-2105)

All newer versions have various issues, such as losing network connection, have false disk errors and so on as described in this thread: [https://forum.storj.io/t/nodes-offline-for-3-4-days-is-it-possible-to-recover/11697/16](https://forum.storj.io/t/nodes-offline-for-3-4-days-is-it-possible-to-recover/11697/16?u=alexey)
{% endhint %}

{% hint style="warning" %}
**Docker Toolbox is not supported.**
{% endhint %}
{% endtab %}
{% endtabs %}
