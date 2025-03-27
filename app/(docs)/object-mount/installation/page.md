---
title: Installation Instructions
docId: doh9ma3vidoo4Eef
weight: 3
metadata:
  title: Installation
  description:
    Object Mount Installation Instructions
---
## Linux - Scripted Installer for distros using glibc (most)

Most Linux distributions (including Debian/Ubuntu, RedHat and its derivatives) use the GNU Project's C standard library (glibc). This installer/version is compatible with all such Linux distributions.

include:: common-scripted-installer-glibc-instructions.rst


## Linux - Scripted Installer for distros using musl (Alpine)

Some Linux distributions (Alpine) use the musl C standard library. This installer/version is compatible with all such Linux distributions.

include:: common-scripted-installer-musl-instructions.rst


## Linux - Debian (Ubuntu)

include:: common-debian-install-instructions.rst


## Linux - RedHat and derivatives


include:: common-redhat-install-instructions.rst


## Linux - Alpine


include:: common-alpine-install-instructions.rst


## Mac


include:: common-mac-install-instructions.rst


## Windows


include:: common-windows-install-instructions.rst

```
.. tabs::

    .. group-tab:: **Linux**

        .. tabs::

            .. tab:: **Debian/Ubuntu**

                .. tabs::

                    .. tab:: **Scripted Installer**

                        .. include:: common-scripted-installer-glibc-instructions.rst

                    .. tab:: **Package Manager**

                        .. include:: common-debian-install-instructions.rst

            .. tab:: **RedHat & derivatives**

                .. tabs::

                    .. tab:: **Scripted Installer**

                        .. include:: common-scripted-installer-glibc-instructions.rst

                    .. tab:: **Package Manager**

                        .. include:: common-redhat-install-instructions.rst

            .. tab:: **Alpine**

                .. tabs::

                    .. tab:: **Scripted Installer**

                        .. include:: common-scripted-installer-musl-instructions.rst

                    .. tab:: **Package Manager**

                        .. include::  common-alpine-install-instructions.rst

            .. tab:: **Any other distribution**

                .. tabs::

                    .. tab:: **Scripted Installer (glibc)**

                        Most Linux distributions use the GNU Project's C standard library (glibc). This installer/version is compatible with all such Linux distributions.

                        .. include:: common-scripted-installer-glibc-instructions.rst

                    .. tab:: **Scripted Installer (musl)**

                        Some Linux distributions use the musl C standard library. This installer/version is compatible with all such Linux distributions. These instructions will assume you are using Alpine or a derivative.

                        .. include:: common-scripted-installer-musl-instructions.rst

    .. group-tab:: **Mac**

        .. include:: common-mac-install-instructions.rst

    .. group-tab:: **Windows**

        .. include:: common-windows-install-instructions.rst
```
