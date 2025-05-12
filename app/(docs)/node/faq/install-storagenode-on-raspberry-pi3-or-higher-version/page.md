---
title: Install storagenode on Raspberry Pi3 or higher version
docId: 50382094-408e-4ff7-bf42-22356de16303
redirects:
  - /hc/en-us/articles/360026612332-Install-storagenode-on-Raspberry-Pi3-or-higher-version
  - /hc/en-us/articles/360026612332
---
Raspberry Pi3 model B is a microcomputer for doing almost anything. Let's use it for installing storagenode for V3 of the Storj Network!

*In this guide we assume that you have a Raspberry Pi 3 (or higher), set up with Raspberry Pi OS Lite (without Graphical User Interface). [To set up Raspberry Pi OS Lite, please refer to the official documentation here.](https://www.raspberrypi.com/software/)*

 
# Prepare
Set up your Pi to [allow SSH](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh) (it will make your life a lot easier).

{% callout type="info" %}
Note. If you want to enable SSH on headless Pi, you can enable this checkbox during image customization or manually later: you should place an empty ssh file in the boot partition on your SD-card. This will enable the ssh daemon on your Pi after boot.
```
sudo touch /boot/firmware/ssh
```
{% /callout %}


Connect to the RPi via ssh and follow the steps below.

If your  SD card is big enough, you can extend the system to use the whole available space (by default you have only a few MB in the root partition).

Run the `raspi-config` to extend it:
```shell
sudo raspi-config
```
Navigate to the **Advanced Options**, then choose **Expand Filesystem**. After a while you should see a  screen like this:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/rpi3/mceclip0.png)

When you exit from the `raspi-config`, it will suggest you to reboot. Please do it.

{% callout type="warning" %}
It is recommended to replace the default password for the default user **pi** for security reasons. Please do so.
{% /callout %}

Please configure the [passwordless login via ssh](https://www.raspberrypi.com/documentation/computers/remote-access.html#configure-ssh-without-a-password) and after that, make sure that you can login with your public key, after which you can disable the password authentication completely.

To continue with this guide, please use the `screen` command, this will enable you to still reconnect to a disconnected session using the `screen -x` command after logging in via `ssh`.

```shell
sudo apt-get update
sudo apt-get install screen
screen
```
 
# Formatting and mounting your HDD

{% callout type="danger" %}
Please do not reformat your HDD if it already contains the storage node's data and you want only to mount it after an OS reinstall!
{% /callout %}

## Format your hard drive
If you just reinstalled the system on the SD card, you can skip this step and continue to [Mount your hard drive](#mount-your-hard-drive) below, otherwise, please proceed with:

```shell
sudo apt-get install gdisk -y
sudo gdisk /dev/sda
```

Then, type `n`, and press **Enter** until you exit out of the command. Write changes to the disk: `w`, confirm by `y`. 

Now we will format the drive to use the **ext4** filesystem

{% callout type="warning" %}
Do not try to use **btrfs** or **zfs** on models with RAM less than 4GiB! The **exFat** is strictly not recommended in any setup, the **ntfs** uses a lot of RAM on Linux and you can lose data, if this disk were used on Windows (modern Windows uses dedup and compress features by default and they are not fully supported under Linux).
{% /callout %}

```shell
sudo mkfs.ext4 /dev/sda1
```

## Mount your hard drive
```shell
sudo mkdir /mnt/storj
lsblk
```

Find your drive and request its `UUID`:

```shell
sudo blkid /dev/<location (example: sda1)>
```

Copy `UUID` and open the `/etc/fstab` file in a text editor:

```shell
sudo nano /etc/fstab
```

Then add the following  line to the end (replace `<your HD UUID>` with the copied `UUID`):

```
UUID=<your HD UUID> /mnt/storj ext4 defaults 0 2
```

Save the `/etc/fstab` (**Ctrl-O** and confirm saving, then exit with **Ctrl-X**)

Check your mount:

```shell
sudo mount -a
```

It should not print any errors. Otherwise - please, check the `UUID` and the filesystem type. Do not reboot until you fix the error, otherwise your Pi may stuck on boot.

To check that all ok:

```shell
df -HT
```

You should see your disk and free space on it, mounted to /mnt/storj.

If mount is ok, you can proceed further.

```shell
sudo chown -R pi:pi /mnt/storj
```

To add cgroup memory support (to prevent an OOM hang of your Pi 3 B/B+):

{% callout type="warning" %}
Note. This fix is tested only on Raspberry Pi 3 B/B+ models.
{% /callout %}

```shell
sudo nano /boot/cmdline.txt
```

If you are using a Pi3 B/B+ please add `cgroup_enable=memory cgroup_memory=1 swapaccount=1` to the end of the line. The resulting string should look like this:

```
dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=PARTUUID=XXXXXX-XX rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait cgroup_enable=memory cgroup_memory=1 swapaccount=1
```

Save the file (**Ctrl-X**, confirm saving) and reboot:

```shell
sudo reboot
```

# Create your node Identity
You can create an identity directly on your Pi. It will take at least 24 hours. But you may prefer to create the identity on a more powerful desktop or laptop where identity creation would take a lot less time, and then move the identity files to the Pi.

## Create a node Identity on your PI
Download the identity binary for the RPi: [identity_linux_arm.zip](https://github.com/storj/storj/releases/latest/download/identity_linux_arm.zip)

```shell
sudo apt-get install unzip curl -y
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_arm.zip -o identity_linux_arm.zip
unzip ~/identity_linux_arm.zip
```

Generate the Identity:

```shell
./identity_linux_arm create storagenode
```
Your identity will be generated here: `/home/pi/.local/share/storj/identity/storagenode`

## Create a node Identity on your desktop
Download the identity binary for your platform:

* Mac OS: [identity_darwin_amd64.zip](https://github.com/storj/storj/releases/latest/download/identity_darwin_amd64.zip)
* Linux: [identity_linux_amd64.zip](https://github.com/storj/storj/releases/latest/download/identity_linux_amd64.zip)
* Windows 10: [identity_windows_amd64.zip](https://github.com/storj/storj/releases/latest/download/identity_windows_amd64.zip)

Unpack the binary to the preferred folder. Let´s suppose it is your home folder.

Then generate the Identity (this example is for Windows):

```powershell
./identity_windows_amd64.exe create storagenode
```

Your Identity will be generated here:

* Windows: `$Env:APPDATA/Storj/Identity/storagenode` (Powershell) or `%APPDATA%\Storj\Identity\storagenode` if you use a `cmd.exe` or Explorer
* MacOS: `/Users/USER/Library/Application Support/Storj/identity/storagenode`
* Linux: `~/.local/share/storj/identity/storagenode`

{% callout type="info" %}
Note. You can also specify to place the identity files into another folder using the option `--identity-dir`
{% /callout %}

## Sign your node Identity
```powershell
./identity_windows_amd64.exe authorize storagenode user@example.com:ohihioHiohohIOhUyTUfyufVJHvufUyvJHvyFTYdhVJGionOoHib
```
Where `user@example.com:ohihioHiohohIOhUyTUfyufVJHvufUyvJHvyFTYdhVJGionOoHib` is your authorization token you [have generated](docId:v-fUvPqySvUwTMF-od6hD).

We recommend to move your signed identity from the SD card to the HDD with the storagenode data, so if the SD card fails, you will not lose your identity. In the event of a hard drive failure, your node would be lost anyway, so it is better to store identity and data together in different folders on the hard drive.

{% callout type="info" %}
Note: You cannot authorize your identity if you didn't get your authorization token.

Note: The email address is a part of the authorization token and should be copied including all characters.

Note: You can specify the identity folder with an `--identity-dir` option.
{% /callout %}

## Copy your node Identity to the RPi
In case you generated and authorized your node identity on a desktop/laptop computer instead of directly on the RPi to save time, you can copy it to the RPi afterward, as follows:

### Copy the Identity to the RPi from Linux or Mac
Copy your node identity from your desktop to the RPi: [https://unix.stackexchange.com/questions/106480/how-to-copy-files-from-one-machine-to-another-using-ssh](https://unix.stackexchange.com/questions/106480/how-to-copy-files-from-one-machine-to-another-using-ssh)

### Copy the Identity to the RPi from a Windows machine
Copy your node identity from your Windows machine to the RPi: [https://unix.stackexchange.com/questions/92715/can-i-transfer-files-using-ssh](https://unix.stackexchange.com/questions/92715/can-i-transfer-files-using-ssh)

 
# Install Docker
To install Docker on the RPi, be sure to use the following installation method:
```shell
curl -sSL https://get.docker.com | sh
```

To enable docker to start after reboot:
```shell
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

# Download Docker container with storagenode
```shell
docker pull storjlabs/storagenode:latest
```

# Port forwarding
In our example, we will need to have port no. `28967` forwarded to our RPi. Use the steps for Linux OS from the article [Port forwarding](docId:y0jltT-HzKPmDefi532sd) to perform port forwarding to your Raspberry Pi. 

You can take a look at [this article](https://www.noip.com/support/knowledgebase/install-linux-3-x-dynamic-update-client-duc) to learn how to install the no-ip software, if you have a dynamic public IP. Note that if you use the free version of no-ip, you will need to periodically renew it every month so it will continue working properly.

Please be sure to check that your port is open [here](https://www.yougetsignal.com/tools/open-ports/).

# Setup the storagenode before the run
Please setup your node first as described here.

```shell
docker run --rm -e SETUP="true" \
--mount type=bind,source="<identity-dir>",destination=/app/identity \
--mount type=bind,source="<storage-dir>",destination=/app/config \
--name storagenode storjlabs/storagenode:latest
```

For our example we will use these parameters:

* `/home/pi/.local/share/storj/identity/storagenode` is the location of your identity files. You can copy the absolute path from the output of the identity command you ran earlier (second to last line below). We recommend to move it to the HDD, for example, to `/mnt/storj/storagenode/identity`. In this case replace the string `/home/pi/.local/share/storj/identity/storagenode` with your actual path, e.g. `/mnt/storj/storagenode/identity`. It should contain 6 files belonging to the identity.
* `/mnt/storj/storagenode`: this is the local directory where you want files to be stored on your hard drive for the network.

So the initial setup command will looks like:

```shell
docker run --rm -e SETUP="true" \
--mount type=bind,source="/home/pi/.local/share/storj/identity/storagenode",destination=/app/identity \
--mount type=bind,source="/mnt/storj/storagenode",destination=/app/config \
--name storagenode storjlabs/storagenode:latest
```

# Run the Docker container with storagenode
We recommend to create a subfolder for the storagenode on your disk, as this would prevent your node from starting in the event that the mount accidentally fails for any reason. We will assume further that this subfolder is called `storagenode`.

Parameters used in the Docker run command:

* `WALLET`: ERC20 compatible ethereum address for STORJ token payments (use the same payout address for all nodes if you are running multiple nodes.) If you are opting in to zkSync L2 payouts, please use your zkSync wallet address. You can read more about choosing L1 or L2 payout options and how to configure zkSync [here](docId:6TX_ve1PyUrXuwax-mWWw).
* `EMAIL`: (optional) email address so that we can notify you when a new version has been released, or when the node goes offline and return online, about suspension and disqualification
* `ADDRESS`: external IP address or the DDNS you configured and the port you opened on your router.

{% callout type="info" %}
Note: If you are using a custom port other than `28967`, then you have to change the `-p 28967:28967` to `-p other_port:28967`
{% /callout %}

* `STORAGE`: How much disk space you want to allocate to the Storj network
* `/home/pi/.local/share/storj/identity/storagenode`: This is the location of your identity files. You can copy the absolute path from the output of the identity command you ran earlier (second to last line below). We recommend to move it to the HDD, for example, to the `/mnt/storj/storagenode/identity`. In this case replace the string `/home/pi/.local/share/storj/identity/storagenode` with your actual path, e.g. `/mnt/storj/storagenode/identity`. It should contain 6 files belonging to the identity.
* `/mnt/storj/storagenode`: local directory where you want files to be stored on your hard drive for the network.

Example of `docker run` command:

```shell
docker run -d --restart always --stop-timeout 300 \
-p 28967:28967/tcp \
-p 28967:28967/udp \
-p 127.0.0.1:14002:14002 \
-e WALLET="0x0000..." \
-e EMAIL="your@email.com" \
-e ADDRESS="externaladdress:28967" \
-e STORAGE="2TB" \
--memory=800m \
--log-opt max-size=50m \
--log-opt max-file=10 \
--mount type=bind,source=/home/pi/.local/share/storj/identity/storagenode,destination=/app/identity \
--mount type=bind,source=/mnt/storj/storagenode,destination=/app/config \
--name storagenode storjlabs/storagenode:latest
```

# Setup Watchtower to keep your storagenode updated
The storagenode software should be updated in a timely fashion to avoid node suspension or disqualification. Please follow the guide [here](docId:ojIatmeXyCN4rc-GPx8yW).
