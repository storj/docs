---
author:
  name: @Odmin
title: Getting started with Storj Testnet on FreeNAS (freeBSD)
docId: c1df00c3-9e22-43fe-9590-6157c88d2f20
metadata:
  title: Getting started with Storj Testnet on FreeNAS (freeBSD)
  description: Would you like to build an app with the Storj network as backend? Let's create a local test network with Storj-Sim on your freeBSD powered FreeNAS!
redirects:
  - /hc/en-us/articles/360028417332-Getting-started-with-Storj-Testnet-on-FreeNAS-freeBSD
  - /hc/en-us/articles/360028417332
---
If you want to try it on Linux, you can read the article [https://github.com/storj/storj/wiki/Test-network](https://github.com/storj/storj/wiki/Test-network)

In addition, you can try it on Windows: [Getting started with Storj Testnet on Windows](docId:a1b98770-bb79-4a9d-b0e0-8d3d57106a4d).

Author: Our fellow Community member @Odmin


FreeNAS® is an embedded open-source network-attached storage (NAS) operating system based on FreeBSD and released under a [2-clause BSD license](https://opensource.org/licenses/BSD-2-Clause). A NAS has an operating system optimized for file storage and sharing.

FreeNAS® provides a browser-based, graphical configuration interface. The built-in networking protocols provide storage access to multiple operating systems. A plugin system is provided for extending the built-in features by installing additional software.

FreeNAS has independent [hardware recommendations](https://ixsystems.com/documentation/freenas/11.2/intro.html#hardware-recommendations) for newly built system, so before you begin, please make sure that you meet **at least the minimum hardware requirements**.

Once your hardware is ready you can [move forward with installation](https://ixsystems.com/documentation/freenas/11.2/install.html).

# Install Storj inside a FreeNAS Jail
We will create a ZFS dataset and create a new FreeNAS Jail to run a local Storj test network (Storj-Sim), following the steps outlined below.
 

## Create a new ZFS dataset for store Storj data:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip0.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip1.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip2.png)

***Figure 1.** Creating a new dataset for storage*

### Specify options for a new dataset - see **Figure 2**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip3.png)

***Figure 2.** Options of the new dataset*

Please make sure you have the following settings configured:

* **Name** - `Stojv3_data`
* **Compression** - `lz4`
* **Share Type** - `Unix`
* **Enable atime** - `OFF`
* **ZFS Deduplication** - `OFF`

Then click on **Advanced Mode**.

Depend on your HDD pool configuration, you can see the default value for Record Size (in our case 32K) - see **Figure 3**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip4.png)

***Figure 3.** Record Size for the Pool*

## Create a new FreeNAS Jail
To activate Pool for Jail Manager, just click **CONFIG**. See **Figure 4**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip5.png) ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip6.png)

***Figure 4.** Creation of a new Jail*

Then click **ADD**. Fill in a new Jail name and select the latest FreeBSD release (**Figure 5**)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip7.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip8.png) ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip9.png)

***Figure 5.** Adding a new Jail with parameters*

Select both options - **DHCP Autoconfiguration IPv4** and **VNET** (**Figure 6**)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip10.png)

***Figure 6.** DHCP Autoconfiguration IPv4 and VNET*

Check configuration and click **SUBMIT** (**Figure 7**)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip11.png)

***Figure 7.** Submit configuration of a new Jail*

Wait until the new Jail has been created, then click the three dots on the right side and specify the mount point inside a Jail to store data (**Figure 8**)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip12.png)
![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip13.png) ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip14.png) ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip15.png)

***Figure 8.** Mount point*

Select our dataset (we created it earlier with name `Storjv3_data`) as a source and mount point inside a Jail (which will be `storj_data`) as a destination - see **Figure 9**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip16.png)

***Figure 9.** Options of mountpoint*

Here is an example - see **Figure 10**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip17.png)

***Figure 10.** Example of options for the mountpoint*

Now you can start a Jail - see **Figure 11**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip18.png) ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip19.png)

***Figure 11.** Starting a Jail*

## Configure the FreeNAS Jail
Select the three dots on the right side and select **Shell** to access the Jail console - see **Figure 12**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip20.png)

***Figure 12.** Starting a Jail shell*

Let’s enable SSH access and allow connections to the Jail for your favorite SSH client. See example on **Figure 13**.

```shell
sysrc sshd_enable="YES"
```

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip21.png)

***Figure 13.** Example of the command execution*

## Install useful packages

```shell
pkg install nano git bash
```

Set `PermitRootLogin` to `yes` in the `/etc/ssh/sshd_config`:

```shell
nano /etc/ssh/sshd_config
```

Uncomment `PermitRootLogin` and set to `yes` (see **Figure 14**), then save the file (Press **Ctrl+X** for exit and **Y** for save changes).

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip22.png)

***Figure 14.** Changing PermitRootLogin option in the text editor*

Start the SSH service:

```shell
service sshd start
```

Set a new password for root user:

```shell
passwd
```

Now you can log in via SSH using login: `root` and **your password** (check the Jail section for the IP address) - see **Figure 15**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip23.png) ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip24.png)

***Figure 15.** IP address for connections to the Jail*

## Install the latest Go package

```shell
pkg install go
```

Check Go version (**Figure 16**)

```shell
go version
```

***Figure 16.** Check Go version*

```shell
go env
```

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip25.png)

***Figure 17.** Example of environment variables for Go*

Add a new user for Storj with Username `storj` and set shell: `bash` - see **Figure 18**.

```shell 
adduser storj
```

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip26.png)

***Figure 18.** Adding a new storj user*

Become a storj user:

```shell
sudo su storj
```

### Setup Go Environment
Open your `.profile` file and add a global variables as follows at the end of the file. See **Figure 19**.

```shell
nano /home/storj/.profile
```

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip27.png)

***Figure 19.** Adding a global variables to the `.profile`*

Press **Ctrl+X** for exit and **Y** for save changes

### Update the current shell session

```shell
source ~/.profile
```

# Compile Storj from Source
Connect to the Jail shell and execute:

```shell
git clone https://github.com/storj/storj.git storj
cd storj
go install -race -v storj.io/storj/cmd/storj-sim storj.io/storj/cmd/bootstrap storj.io/storj/cmd/satellite storj.io/storj/cmd/storagenode storj.io/storj/cmd/uplink storj.io/storj/cmd/gateway storj.io/storj/cmd/identity storj.io/storj/cmd/certificates
```

check the binary folder

```shell
ls /home/storj/go/bin/
```

Let´s create a local test network, containing the Satellite, Uplink, S3 gateway and 10 storage nodes and run it.

```shell
storj-sim network setup
storj-sim network run
```

Now the test network is ready and you can see the output like this - see **Figure 20**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/storj-sim/freeBSD/mceclip28.png)

***Figure 20.** Example of the output of a local test network*

More information - [Test network](https://github.com/storj/storj/wiki/Test-network)

# See also
* [S3 Gateway](docId:EGM8O-1xt2Az03eBWT8Rf)
* [Uplink CLI](docId:TbMdOGCAXNWyPpQmH6EOq)
* [Libuplink Walkthrough](https://github.com/storj/storj/wiki/Libuplink-Walkthrough)
