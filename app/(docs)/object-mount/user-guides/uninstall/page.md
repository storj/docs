---
title: Uninstallation
docId: Oochi9lee7ookaih

metadata:
  title: Uninstallation
  description: Uninstallation Guide

weight: 13    
---

Remove the directory pointed to by `CUNO_ROOT`.
Refer to [user-guide-install-locations]() for more information.

## User-local uninstallation

Remove the following additional files:

```
~/.local/lib/x86_64-linux-gnu/cuno.so
~/.local/bin/cuno
~/.local/share/man/man1/cuno.1
~/.local/share/man/man1/cuno-creds.1
~/.local/share/man/man1/cuno-mount.1
~/.local/share/man/man8/cuno.so.8
```

## System-wide uninstallation

Remove the following additional files:

```
/usr/lib/cuno.so
/usr/bin/cuno
/usr/share/man/man1/cuno.1
/usr/share/man/man1/cuno-creds.1
/usr/share/man/man1/cuno-mount.1
/usr/share/man/man8/cuno.so.8
```

## User-specific settings

User-specific configuration is stored in `~/.config/cuno`.
Remove this directory to remove all user-specific settings.

% .. only:: dev

% .. cssclass:: devnote

% .. note::

% TODO: create a uninstall-cuno.sh script
%
% Also, remove above subsections after uninstall.sh is created

% As an alternative, you can also run the uninstallation script to remove Object Mount::

% sh <path_to_cuno>/bin/uninstall-cuno.sh

{% callout type="note"  %}
Remove any customisations made to shell initialisation scripts such as `~/.bashrc`, `~/.profile`, `.zshrc`, `/etc/profile.d`, etc.
{% /callout %}

Please also remember to remove any customizations you might have made to your shell's runtime initialization command scripts, `.bashrc`, etc.

## Package manager uninstallation

Use the commands in the following sections to uninstall Object Mount for specific Linux distributions.

### Debian derivatives (e.g. Ubuntu)

```console
sudo apt-get remove cuno\*
```

### RedHat derivatives (e.g. CentOS)

```console
sudo yum remove cuno\*
```

### Alpine Linux derivatives

```console
sudo apk del cuno
```
