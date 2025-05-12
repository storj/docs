---
title: MacOS
docId: yoopieyewevei1Eo

metadata:
  title: MacOS
  description:
    MacOS Installation Instructions

---
A fully native Mac client is coming soon!

You can currently install Object Mount on your Mac directly, or inside a container. Installing Object Mount on your Mac directly will allow you to use `cuno-mac`, our handy tool for launching Linux containers that automatically have your local installation of Object Mount available inside them.

{% callout type="note"  %}
For those on Apple Silicon (ARM) Macs, macOS 13.0 Ventura or later is required.
{% /callout %}

1. *All* Mac users require a virtualisation/containerisation software to be installed and set up.
{% tabs %}
{% tab label="Intel" %}
## Intel
We fully support usage of [Docker](https://docs.docker.com/desktop/install/mac-install/) and [Rancher Desktop](https://rancherdesktop.io/). Docker is assumed in these guides.

Some settings should be changed to use Object Mount:
{% tabs %}
{% tab label="Docker" %}
## Docker

We recommend changing the file sharing implementation to VirtioFS:
- Open Docker Desktop's ``Settings`` panel
- Open the ``General`` section.
- For the setting ``Choose file sharing implementation for your containers`` select ``VirtioFS``.
- Use the ``Apply & Restart`` button to save the change.
{% /tab %}
{% tab label="Rancher" %}
## Rancher

We recommend using the Apple Virtualization Framework (VZ), and the VirtioFS file sharing implementation:
- Open Rancher Desktop's ``Preferences`` panel.
- Open the ``Virtual Machine`` section.
- Open the ``Emulation`` tab, and set ``Virtual Machine Type`` to ``VZ``.
- Open ``Volumes`` tab, and set the ``Mount Type`` to  ``virtiofs``.
- Use the ``Apply`` button to save the changes.

In order to use the ``cuno-mac`` utility with Rancher, the "dockerd" (moby) container engine must be used:
- Open Rancher Desktop's ``Preferences`` panel.
- Open the ``Container Engine`` section.
- In the ``General`` tab, set the ``Container Engine`` to ``dockerd (moby)``.
- Use the ``Apply`` button to save the change.
{% /tab %}
{% tab label="OrbStack" %}
## OrbStack

You may also use [OrbStack for Mac](https://orbstack.dev/)  and find it to be faster, but ``cuno-mac`` native support is not available in this case.

Unfortunately, [colima](https://github.com/abiosoft/colima) is not currently supported.
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="Apple Silicon (ARM)" %}
## Apple Silicon (ARM)
We assume usage of Docker in these guides, but any of following containerisation technologies is supported with some additional set up required for ARM Macs:
{% tabs %}
{% tab label="Docker" %}
## Docker

[Docker Desktop](https://docs.docker.com/desktop/install/mac-install/) version ``4.16.0`` or later is required.

Use Rosetta for hardware emulation:
- Open Docker Desktop's ``Settings`` panel
- Open the ``Features in development`` section.
- Open the ``Beta features`` tab, and enable the setting :code:`Use Rosetta for x86/amd64 emulation on Apple Silicon`.
- We recommend changing the file sharing implementation to VirtioFS:
- Open Docker Desktop's ``Settings`` panel
- Open the ``General`` section.
- For the setting ``Choose file sharing implementation for your containers`` select ``VirtioFS``.
- Use the ``Apply & Restart`` button to save the change.
- Restart the Docker Engine by clicking on the Docker icon in the menu bar and selecting :code:`Restart`.
{% /tab %}
{% tab label="Rancher" %}
## Rancher

Use Rosetta for emulation, and we recommend changing the file sharing implementation to VirtioFS:
- Open Rancher Desktop's ``Preferences`` panel.
- Open the ``Virtual Machine`` section.
- Open the ``Emulation`` tab
- Set ``Virtual Machine Type`` to ``VZ``.
- In the ``VZ`` suboption, enable ``Rosetta``.
- Open ``Volumes`` tab, and set the ``Mount Type`` to  ``virtiofs``.
- Use the ``Apply`` button to save the changes.
- In order to use the ``cuno-mac`` utility with Rancher, the "dockerd" (moby) container engine must be used:
- Open Rancher Desktop's ``Preferences`` panel.
- Open the ``Container Engine`` section.
- In the ``General`` tab, set the ``Container Engine`` to ``dockerd (moby)``.
- Use the ``Apply`` button to save the change.
{% /tab %}
{% tab label="OrbStack" %}
## OrbStack

Usage of Object Mount on [OrbStack for Mac](https://orbstack.dev/) containers works without any additonal set up required. 

OrbStack does not currently work with the  native/host ``cuno-mac`` utility.
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}

2. Download the installer. By downloading you are agreeing to the terms of the [End User License Agreement](https://www.storj.io/legal/terms-of-use). Click to download the [Scripted Installer](https://github.com/cunoFS/cunoFS/releases/latest/download/cuno-glibc-installer.run).

3. Install the package onto your Mac directly, or inside a Linux container:
{% tabs %}
{% tab label="Install on macOS" %}
## Install on macOS
Installing Object Mount on to your Mac directly will allow you to use ``cuno-mac``, our handy tool for launching Linux containers that automatically have your local installation of Object Mount installed inside them.

NB: To use ``cuno-mac``, you must also have Python 3 installed and available as ``python3`` in Terminal.

In a Terminal on your Mac, navigate to your download directory. If this was the default ``Downloads`` folder, you can run:
```shell
cd /Users/$USER/Downloads
```
Run the installer (without ``sudo``):
```shell
sh cuno-glibc-installer.run
```

Please follow the interactive steps, read the displayed end-user licence agreement (EULA) and agree to the terms to continue with the installation.
- Export the ``cuno-mac`` location to your ``PATH`` variable:
```shell
export PATH=$PATH:~/.local/opt/cuno/share/macos
```
- To have this persist and apply to new Terminal sessions, add this as a new line at the bottom of the file ``/Users/<your username>/.bash_profile`` using a text editor, or using the following command in a Terminal session:
```shell 
echo "PATH=\$PATH:~/.local/opt/cuno/share/macos" >> ~/.bash_profile
```
**WARNING:** Do not miss the ``\`` because otherwise your current ``PATH`` will be written literally into the profile and break future changes.
{% /tab %}
{% tab label="Install in Linux containers" %}
## Install in Linux containers
If installing on your Mac's local user is not preferred, you can install Object Mount within a container of your choice. 

We provide instructions here for installing within Docker containers using Ubuntu images. These instructions can be adapted to other Linux distributions, as well other virtualisation technologies such as Rancher, and OrbStack.

These instructions depend on the architecture of you Mac, please follow the appropriate guide:
{% tabs %}
{% tab label="Intel" %}
## Intel
- Run the following command to run a Docker container with the Object Mount installer made available at ``/tmp/cuno_install``:

**WARNING:** This command will download the latest stable Ubuntu image, which could be large.
```shell
docker run -it --rm --entrypoint /bin/bash \
-v <path_to_installation_script>/cuno-glibc-installer:/tmp/cuno_install \
--name cuno-container \
ubuntu:latest
```
- Within the Docker container (using ``docker exec -it cuno-container /bin/bash``), install Object Mount:
```shell
sh /tmp/cuno_install
```
- Please follow the interactive steps, read the displayed end-user licence agreement (EULA) and agree to the terms to continue with the installation.
{% /tab%}
{% tab label="Apple Silicon (ARM)" %}
## Apple Silicon (ARM)
- Run the following command to run a Docker container with the Object Mount installer made available at ``/tmp/cuno_install``:

**WARNING:** This command will download the latest stable Ubuntu image, which could be large.
```shell
docker run -it --rm --entrypoint /bin/bash \
-v <path_to_installation_script>:/tmp/cuno_install \
--name cuno-container \
--platform linux/amd64 ubuntu:latest
```

NB: The :code:`--platform linux/amd64` flag is *required* to run Object Mount on Macs with Apple Silicon.

- Within the Docker container (using ``docker exec -it cuno-container /bin/bash``), install Object Mount:
```shell
sh /tmp/cuno_install
```
- Please follow the interactive steps, read the displayed end-user licence agreement (EULA) and agree to the terms to continue with the installation.
{% /tab%}
{% /tabs %}
{% /tab %}
{% /tabs %}

4. The installation will prompt you to set the `CUNO_ROOT` environment variable to the installation directory. This is not always necessary when using Object Mount, but it will make it easier to follow the steps in this guide.
