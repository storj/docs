---
title: Migrating from Windows GUI installation to Docker CLI
slug: resources/faq/migrate-my-node/migrating-from-windows-gui-installation-to-a-docker-cli
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-05-04T03:07:22.000Z
docId: 0hRbBFe-ESCkfSeIEQwCW
---

## Preparing the destination system

[](docId\:hbCGTv1ZLLR2-kpSaGEXw)&#x20;

[](docId\:rz3s9lC3qAQHYSl37ngBN)&#x20;



{% callout type="info"  %} 
If your Windows doesn't support WSL2 we recommend to install version 2.1.0.5. We do not recommend using later versions with Hyper-V as [a lot of bugs](https://forum.storj.io/t/latest-docker-desktop-for-windows-compatibility/6045) have been reported.
{% /callout %}

3\. The difference between the Windows GUI and the Docker CLI is where each system stores the data. The Windows GUI version stores data in the path specified in the `storage.path` parameter of the configuration file `"%ProgramFiles%\Storj\Storage Node\config.yaml"`, while the Docker version stores data in the subfolder called `storage`, which is automatically (silently) added to the specified path through the `--mount` option.

The same applies for the `orders` folder. In the Windows GUI version it's stored in the installation location (`"%ProgramFiles%\Storj\Storage Node\orders"` by default), the docker version stores orders alongside with data in the data location.

For example, if the storage folder specified in the Windows GUI is `D:\STORJ`, then for the Docker version you should move the content of the `D:\STORJ` folder to the subfolder `storage`, i.e. `D:\STORJ\storage`, the orders should be moved from the `"%ProgramFiles%\Storj\Storage Node\orders"` to the `D:\STORJ\orders`.

The same applies for Linux/MacOS systems. How do we accomplish that?

{% callout type="info"  %} 
We will use the `D:\STORJ` path of the source Windows system as an example. The destination path depends on OS:
{% /callout %}

:::::tabs
::::tab{label="Windows"}
{% callout type="info"  %} 
In Windows, we will use the same folder`D:\STORJ` and PowerShell as a terminal.

We will assume that your Windows user is called `user` and it has full access to the `D:\STORJ` folder.

If you are moving the identity and data to the new Windows CLI host, you need to share the destination folder on that host and follow the guide [](docId\:NGHe10jmn-kdgzTf3FUz0)&#x20;
{% /callout %}
::::

::::tab{label="Linux"}
{% callout type="info"  %} 
In Linux, we will use the `/mnt/storj/storagenode`folder, where`/mnt/storj` is the [](docId\:nZeFxmawYPdgkwUPy6f9s).

We will assume that your Linux host has IP address `192.168.1.68`, the Linux user is called `user` and it has full access to the `/mnt/storj/storagenode` folder.

Please replace `/mnt/storj` with your actual path. Open a terminal on your Linux system and execute:

```Text
mkdir -p /mnt/storj/storagenode/storage
```
{% /callout %}

To be able to copy the identity and data from Windows to Linux, we need to have a SSH server enabled on your Linux system. You can google how to do this for your specific Linux distro. For example, for a Debian-based OS it can be done as follows:

```Text
sudo apt update && sudo apt install ssh -y
```
::::

::::tab{label="MacOS"}
{% callout type="info"  %} 
In MacOS, we will use the`/Volumes/Storj/storagenode`folder, where `/Volumes/Storj` is the path where the disk is mounted.

We will assume that your MacOS host has IP address `192.168.1.69`, the MacOS user is called `macuser` and it has full access to the `/Volumes/Storj/storagenode` folder.

Please replace `/Volumes/Storj` with your actual path. Open a terminal window (you can find it with the global search function in your MacOS) and execute:

```Text
mkdir -p /Volumes/Storj/storagenode/storage
```
{% /callout %}

To be able to copy files from the Windows OS, we will use a SSH session to your MacOS. To accomplish this, you need to [configure the remote access to your MacOS](https://osxdaily.com/2016/08/16/enable-ssh-mac-command-line/)
::::
:::::



Then, [](docId\:y0jltT-HzKPmDefi532sd)&#x20;



## Preparing the source Windows system

The configuration steps are different depending on the destination OS.

:::::tabs
::::tab{label="Windows"}
{% callout type="info"  %} 
If your source and destination OSes are both Windows, you can use the integrated `robocopy` command-line utility to copy your files across the network or local system: [](docId\:NGHe10jmn-kdgzTf3FUz0)



If your source and destination is the same Windows, stop and disable storagenode service to avoid disqualification. Execute in the elevated PowerShell:

```powershell
Stop-Service storagenode
Set-Service storagenode -StartupType Disabled
```

And rename folders to use with docker. Please replace `D:\STORJ` with your actual path (PowerShell):

```powershell
mv D:\STORJ D:\storage
mkdir D:\STORJ
mv D:\storage D:\STORJ\storage
```
{% /callout %}
::::

:::tab{label="Linux"}
Since your source OS is Windows, and the destination OS is Linux, you need to have some Linux-compatible utilities to migrate the identity and data.

We will use WSL and [Ubuntu package](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
:::

:::tab{label="MacOS"}
Since your source OS is Windows, and the destination OS is MacOS, you need to have some MacOS-compatible utilities to migrate the identity and data.

We will use WSL and [Ubuntu package](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
:::
:::::



## Copy identity, orders and data from the Windows GUI storagenode

You can use this guide to migrate the identity, orders and data to a different device: [](docId\:jEntWNvi2M6Eo74NICIJg)

:::::tabs
::::tab{label="Windows"}
{% callout type="info"  %} 
We will assume that your identity is placed in the default location, i.e. `%APPDATA%\Storj\Identity\storagenode`and you used the default setup location, i.e. orders are located there: `"C:\Program Files\Storj\Storage Node\orders"`
{% /callout %}

```powershell
robocopy /MIR /MOVE $env:AppData\Storj\Identity\storagenode D:\STORJ\identity
```

The storage data has already been migrated in the previous step.&#x20;

&#x20;

Now move orders to the data location:

```powershell
robocopy /MIR /MOVE "$env:ProgramFiles\Storj\Storage Node\orders" D:\STORJ\orders
```
::::

::::tab{label="Linux"}
{% callout type="info"  %} 
We will assume that your identity is placed in the default location, i.e. `%APPDATA%\Storj\Identity\storagenode`and you used the default setup location, i.e. orders are located there: `"C:\Program Files\Storj\Storage Node\orders"`
{% /callout %}

Run an Ubuntu shell, which you have installed in the [](docId\:aKZt7A92CnGjPy1JY1YpF) step above, and run the command:

```shell
rsync -aP /mnt/d/Users/user/AppData/Roaming/Storj/Identity/storagenode/ user@192.168.1.68:/mnt/storj/storagenode/identity/
```

Since you are migrating to Linux, you can still continue running the source Windows GUI node, and while the migration is happening, run these commands in the Ubuntu shell to migrate the orders and data:

```shell
rsync -aP "/mnt/c/Program Files/Storj/Storage Node/orders" user@192.168.1.68:/mnt/storj/storagenode/orders/
```

```shell
rsync -aP /mnt/d/STORJ/ user@192.168.1.68:/mnt/storj/storagenode/storage/
```

When each command completes, run them a few more times until the difference is negligible, then stop the Windows GUI storagenode service from the elevated PowerShell:

```powershell
Stop-Service storagenode
Set-Service storagenode -StartupType Disabled
```

Now return to the Ubuntu shell and execute `rsync` one last time:

```shell
rsync -aP --delete /mnt/d/STORJ/ user@192.168.1.68:/mnt/storj/storagenode/storage/
```

and for orders:

```shell
rsync -aP --delete "/mnt/c/Program Files/Storj/Storage Node/orders" user@192.168.1.68:/mnt/storj/storagenode/orders/
```
::::

::::tab{label="MacOS"}
{% callout type="info"  %} 
We will assume that your identity is placed in the default location, i.e. `%APPDATA%\Storj\Identity\storagenode`and you used the default setup location, i.e. orders are located there: `"C:\Program Files\Storj\Storage Node\orders"`
{% /callout %}

Run an Ubuntu shell, which you have installed in the [](docId\:aKZt7A92CnGjPy1JY1YpF) step above, and run the command:

```shell
rsync -aP /mnt/d/Users/user/AppData/Roaming/Storj/Identity/storagenode/ macuser@192.168.1.69:/Volumes/Storj/storagenode/identity/
```

Since you are migrating to MacOS, you can still continue running the source Windows GUI node, and while the migration is happening, run these commands in the Ubuntu shell to migrate the orders and data:

```shell
rsync -aP "/mnt/c/Program Files/Storj/Storage Node/orders" macuser@192.168.1.69:/Volumes/Storj/storagenode/orders/
```

```shell
rsync -aP /mnt/d/STORJ/ macuser@192.168.1.69:/Volumes/Storj/storagenode/storage/
```

When each command completes, run them a few more times until the difference is negligible, then stop the Windows GUI storagenode service from the elevated PowerShell:

```powershell
Stop-Service storagenode
Set-Service storagenode -StartupType Disabled
```

Now return to the Ubuntu shell and execute `rsync` one last time:

```shell
rsync -aP --delete /mnt/d/STORJ/ macuser@192.168.1.69:/Volumes/Storj/storagenode/storage/
```

and for orders:

```shell
rsync -aP --delete "/mnt/c/Program Files/Storj/Storage Node/orders" macuser@192.168.1.69:/Volumes/Storj/storagenode/orders/
```
::::
:::::

When the data migration is completed, you should remove the storagenode Windows GUI version from the source Windows.

{% callout type="warning"  %} 
If you did not remove the Windows GUI storagenode instance, it could be automatically started by `storagenode-updater` service resulting in two copies of the same node in the network. It will be disqualified within a hour because it will not have all pieces since after the migration.
{% /callout %}

## Running storagenode in Docker

Now you can run the storagenode container following this guide: [](docId\:HaDkV_0aWg9OJoBe53o-J).

