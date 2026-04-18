---
title: Uninstalling Object Mount
hideTitle: false
docId: Oochi9lee7ookaih
weight: 13
metadata:
  title: Uninstallation
  description: 
    Uninstallation Guide
hidden: false
---

To remove Object Mount for Linux from a workstation, follow one of these two uninstall procedures depending on how Object Mount was originally installed.

For **Scripted Installations** (`glibc` and `musl`):

  1. Determine the installation root folder
  2. Remove files for either one user or all users
  3. Remove any shell customizations

For **Package Manager Installations** (Debian, Red Hat, Alpine):

  1. Run the appropriate package manager uninstallation command (see below).


## Uninstall for: Scripted Installations

If Object Mount was installed using a Scripted Installer, follow the steps below to uninstall Object Mount.

### Step 1: Determine the Installation Root

The `CUNO_ROOT` environment variable should be set to wherever your Object Mount installation is. 

This directory is usually:

  - `/opt/cuno` for a system-wide installation
  - `$HOME/.local/opt/cuno` for a user-local installation (generally)

Display your `CUNO_ROOT` variable:

```sh
echo $CUNO_ROOT
```

If it is blank or not set, locate your deployment by running:
  
```sh
ls /opt/cuno
ls $HOME/.local/opt/cuno
```

One of those directories should display multiple cuno-related files.

**See:** [Installation Locations](docId:ahWohd5eegh6eizi#installation-locations-scripted-installers) for more information on installation locations.

## Step 2: Remove the CUNO_ROOT Directory

Delete the CUNO_ROOT directory and all files and subfolders within that CUNO_ROOT directory.

In addition, you can remove the following added files:

**For Single User/Local Uninstallation:**

Remove the following additional files:

```
~/.local/lib/x86_64-linux-gnu/cuno.so
~/.local/bin/cuno
~/.local/share/man/man1/cuno.1
~/.local/share/man/man1/cuno-creds.1
~/.local/share/man/man1/cuno-mount.1
~/.local/share/man/man8/cuno.so.8
```

**For System-wide/Global Uninstallation:**

Remove the following additional files:

```
/usr/lib/cuno.so
/usr/bin/cuno
/usr/share/man/man1/cuno.1
/usr/share/man/man1/cuno-creds.1
/usr/share/man/man1/cuno-mount.1
/usr/share/man/man8/cuno.so.8
```

### Step 3: Shell Customization Removal

Remove any customizations made to shell initialization scripts such as

  - `~/.bashrc`
  - `~/.profile`
  - `.zshrc`
  - `/etc/profile.d`
  - etc.


## Uninstall for: Package Managers

If Object Mount was installed using a Package Manager, use the commands in the following sections to uninstall Object Mount for specific Linux distributions.

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
