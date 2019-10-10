# Windows Installer Contributor Guide

## Setup Windows

You need a system running a Windows OS or run a Windows VM.

### Install VirtualBox

If you choose the option with Windows VM, it is easiest to run it in VirtualBox. Box is usually available in the package manager of major Linux distro. Alternatively, it can be downloaded and installed from the official web site: https://www.virtualbox.org/

### Install the Windows VM

Once Virtual Box is installed, you need to download a VM archive from the Microsoft web site and import it in VirtualBox:

1. Go to https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/
1. Select `MS Edge on Win 10 (x64)` for Virtual Machine
1. Select `VirtualBox` for Platform
1. Download the .ZIP archive
1. Extract the archive
1. Start VirtualBox
1. Select `File > Import Appliance...` from the main menu
1. Browse the location of the `.ova` file you extracted from the .ZIP archive
1. Click the `Next >` button
1. Review the Appliance Settings
1. Click the `Import` button
1. After import finishes, the new VM will appear in the main list of VirtualBox
1. Double click on it to start it
1. Use the default password `Passw0rd!` to login

### Setup Shared Folders

The easiest way to transfer file between the host system and the Windows VM is using Shared Folders.

To setup a shared folder:

1. Stop the Windows VM if it is already started 
1. Right-click on the Windows VM in VirtualBox
1. Select `Settings...`
1. Select `Shared Folder`
1. Click on the button with Plus sign
1. Browse a Folder Path from the host system
1. Enter a Folder Name
1. Select the `Auto-mount` checkbox
1. Click `OK` to add the shared folder
1. Click `OK` to close the Settings dialog
1. Start the Windows VM
1. Open Windows Explorer
1. Find the shared folder under `Network > VBOXSRV`
    * You may see an error dialog that the Network Discovery is turned off. Turn it on from the prompt in Windows Explorer and try again.


### Setup storage disk
The minimum size of the storage partition is set to 500 GB and the default allocated space is set to 1 TB. If you don't have a partition with enough space, you can create a dynamically-allocated VDI disk image and attach it your VM.

1. Right-click on the Windows VM in VirtualBox
1. Select `Settings...`
1. Select `Storage`
1. Click on the '+' icon to create a new controller
1. Right click on the newly created controller and select `add a hard drive`
1. Select "create a new disk"
1. As disk type, select VDI
1. Choose "dynamically allocated"
1. Select the desired size (2 TB) and confirm

To be able to use the disk, you need to create a NTFS partition using the windows disk management panel.

## Setup Dev Tools

On your Windows VM/system, install the following tools:

1. Latest WiX Toolset 3.x from https://wixtoolset.org/
1. Visual Studio 2019 Community: https://visualstudio.microsoft.com/downloads/
    * It comes with a free license. After the 30 days trial, you will be asked to sign-in with your Microsoft account (which is free to create) and you will be able to continue using it for free.
1. Wix Toolset Visual Studio 2019 Extension: https://marketplace.visualstudio.com/items?itemName=WixToolset.WixToolsetVisualStudio2019Extension
1. Git for Windows: https://git-scm.com/downloads

## Build Storage Node Binaries for Windows

You need to build the Storage Node Binaries for Windows to include them in the project of the Windows Installer.

The easiest way to do this is to execute the following two commands in the root of the locally cloned https://github.com/storj/storj repository:

```
make storagenode_windows_amd64
make storagenode-updater_windows_amd64
```

Rename the result binaries to `storagenode.exe` and `storagenode-updater.exe` respectively and copy them to the Windows VM.

## Setup the Windows Installer project

On the Windows VM:

1. Clone the https://github.com/storj/storj repository
1. Copy the `storagenode.exe` and `storagenode-updater.exe` to `installer\windows`
1. Open Visual Studio
1. Open the `installer/windows/windows.sln` solution file

## Build the Windows Installer

In Visual Studio:

1. Open the `installer\windows\windows.sln` solution file
1. Select `Build > Rebuild Solution` from the main menu
1. The result `storagenode.msi` can be found in `installer\windows\bin\Debug`

## Troubleshooting the Windows Installer

If anything fails while running the Windows Installer, the displayed error message is usually not helpful. It helps if running the installer with redirected logs to a file.

To do so, open a Command Prompt and run the installer with the following command:

```
msiexec /i storagenode.msi /l*v debug.log
```

The logs will be written to the `debug.log` file.

## Further Reading

- WiX Toolset Tutorial: https://www.firegiant.com/wix/tutorial/
- WiX Cookbook: https://www.allitebooks.in/wix-cookbook/
