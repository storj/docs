# Storage Node Setup Instructions

#### [Storage Node Set up Video Tutorial](https://youtu.be/cd6gWMgSyqI)

## Before You Begin

#### Important Security Considerations

 * Our software serves requests from the internet, but not all software you may have installed is designed to be exposed to the internet directly! **Do not connect your computer directly to the internet without the assistance of a firewall.** This is especially true for users on Windows with applications responding to requests on all IPs.

Make sure you have an email with your personal single-use authorization token. Note that the format of the authorization token is `email:characterstring`. You must include the entire string, including the email address, and not just the part  after the colon. By using the authorization token, you agree to be bound by the [Storage Sharing Terms and Conditions](https://storj.io/storj-share-terms/). 

If you don’t have an authorization token yet, please join our [waitlist](https://storj.io/sign-up-farmer).

If these instructions are a little more complex than you can handle, don’t worry! As we progress from alpha to beta, we’ll continually make the process easier and more accessible for less technical users.

Our current release has limited support for operating systems. If your OS is not supported, save your one-time-use authorization token and we will notify everyone when this is no longer an issue.*

#### Install the necessary dependencies and configure your network appropriately using the following steps:

- Make sure your computer is *not* connected directly to the internet. If you already have a reasonable router, you should be okay. See the Important security considerations section.
- To use the Alpha version of `storagenode` for Storage Node Operators, you first must have Docker installed. Install Docker by following the appropriate installation guide for your operating system. 
    - For Windows: https://docs.docker.com/docker-for-windows/install/ 
       Note: *Please be sure to use the default setting of Linux containers, otherwise `storagenode` will not work properly.*
    - For MacOS: https://docs.docker.com/docker-for-mac/install/
    - For Linux: 
      - Ubuntu: https://docs.docker.com/install/linux/docker-ce/ubuntu/
      - CentOS: https://docs.docker.com/install/linux/docker-ce/centos/
      - Debian: https://docs.docker.com/install/linux/docker-ce/debian/
      - Fedora: https://docs.docker.com/install/linux/docker-ce/fedora/
    - _**Note:** Docker Toolbox is not supported_ - This means that currently, you cannot run `storagenode` on Windows Home Edition.
- Set up port forwarding & Dynamic DNS! The port you must specify is `28967`. Please visit our [knowledge base article](https://storjlabs.atlassian.net/wiki/spaces/SCKB/pages/4423868/Need+help+port-forwarding) or [portforward.com](https://portforward.com/) and follow the instructions for your router.

#### Notes
- It is highly recommended to have your Storage Node connected via LAN instead of wifi to ensure you have a consistent and stable connection.
- If you live in a location where power outages or brownouts are a frequent occurance, please consider protecting your hardware, including the equipment you run your node on, as well as your router/modem, with an Uninterrupted Power Supply (UPS). This would help protect against damage to your hardware as well as against corruption of your database resulting from abrupt shutdowns which could lead to unrecoverable loss of your node.
- It is recommended to perform the following steps local to the machine, and not via a remote connection. If you must use a remote connection, due to the length of time it takes for some of the steps, it is highly recommended to run them inside a virtual console like [TMUX](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/) or [SCREEN](https://linuxize.com/post/how-to-use-linux-screen/).
- If you are using Synology, you must add "sudo" in front of the commands.

## Setup

1. Download the correct Identity binary for your operating system and unzip it.

    - [Mac OS AMD64](https://storj-v3-alpha-builds.storage.googleapis.com/3cc13da-heads-v0.11.7-go1.12.1/identity_darwin_amd64.zip)
    - [Linux AMD64](https://storj-v3-alpha-builds.storage.googleapis.com/3cc13da-heads-v0.11.7-go1.12.1/identity_linux_amd64.zip)
    - [Raspberry Pi ARM](https://storj-v3-alpha-builds.storage.googleapis.com/3cc13da-heads-v0.11.7-go1.12.1/identity_linux_arm.zip)
    - [Windows Pro AMD64](https://storj-v3-alpha-builds.storage.googleapis.com/3cc13da-heads-v0.11.7-go1.12.1/identity_windows_amd64.exe.zip)


2) Create an identity, this can take **several hours or even days**, depending on your machines processing power & luck. If you are planning to run your node on a Synology NAS, Raspberry Pi or other device with less computing power, you can create your Identity on a more powerful machine and then transfer it over to the device you will run your node on. The following example is for Mac OS, substitute the appropriate identity binary for your own OS:

```bash
$ ./identity_darwin_amd64 create storagenode
```


3) Sign the identity you created with your single-use authorization token (again, use the appropriate identity binary for your own OS). 

```bash
$ ./identity_darwin_amd64 authorize storagenode <authorization-token>
```

- Note: *Auth tokens do not have an expiration date. You can save an unused auth token and use it to sign an identity later, when you are ready with your hardware. A valid, signed identity is also reuseable indefinitely, to set up the same node again on a different hard drive or computer, as long as the user has not lost any of the data the node had already stored in its storage folder. On the other hand, you cannot use the same Auth token again to sign a new identity once you already used it once for your a node.*

- **Caution**: Before proceeding to the next step, please be sure to **back up your identity files** located in the output path of the previous command. This will allow you to restore your node to working order in case of an unfortunate incident such as a hard drive crash.* **FAILURE TO CREATE A COMPLETE BACKUP OF ALL FILES CONTAINED IN YOUR IDENTITY FOLDER CAN RESULT IN NOT BEING ABLE TO RECOVER A DAMAGED NODE LATER.**


4) Download the Docker container:
 - _all non-ARM based platforms use:_

```bash
$ docker pull storjlabs/storagenode:alpha
```

 - _ARM-based platforms use:_

```bash
$ docker pull storjlabs/storagenode:arm
```


5) Before running `storagenode` for the first time, please note the definitions of the parameters to be used with the `docker run` command:

- `WALLET`: this is your address to receive STORJ token payouts for running the node. Learn how to obtain a valid payout address [here](https://storjlabs.atlassian.net/wiki/spaces/SCKB/pages/4489285/How+do+I+hold+STORJ+What+is+a+valid+address+or+compatible+wallet).
- `EMAIL`: email address so that we can notify you when a new version has been released (optional)
- `ADDRESS`: external IP address or the DDNS you configured and the port you opened on your router `<ip>:<port>`
   - Note: If you are using a custom port other than 28967, then you have to change the `-p 28967:28967` to `-p <port>:28967`
- `BANDWIDTH`: how much bandwidth you can allocate to the Storj network. Be sure to allow for other use cases you have for your internet connection, and do not allocate more than your ISP supplied up and download speed can physically supply. To calculate the maximum monthly BANDWIDTH you can enter here, follow instructions [here](https://storjlabs.atlassian.net/wiki/spaces/SCKB/pages/64323607/How+do+I+calculate+my+Total+monthly+bandwidth+from+my+Mbit+s+up-+and+download+speed). 
- `STORAGE`: how much disk space you want to allocate to the Storj network. Be sure to not over-allocate space! **Allow at least 10% extra for overhead.** While we don't have garbage collection implemented yet, you should also reduce total allocated space on your disk sufficiently to have enough space for storing garbage data until it can be purged in a later release. If you over-allocate space, **you may corrupt your database** when the system attempts to store pieces when no more physical space is actually available on your drive.
- `<identity-dir>`: this is the path to the location of your identity files. You can copy the absolute path from the output of the identity commands you ran earlier. 
    - Note: If you created your identity on a Windows machine, using PowerShell, you can find the path to the default identity folder where your identity files were stored typing at the command prompt: 
 `"$env:AppData\Storj\Identity\storagenode"` 
- `<storage-dir>`: this is the path to the local directory where you want files to be stored on your hard drive for the network.
   - Note: the current database backend is [BoltDB](https://github.com/boltdb/bolt), which [requires _mmap_](https://github.com/boltdb/bolt/issues/704), hence you have to use a file system which supports _mmap_.

Now, you are ready to run `storagenode` with the following command, after editing `WALLET`, `EMAIL`, `ADDRESS`, `BANDWIDTH`, `STORAGE`, `<identity-dir>`, and `<storage-dir>` parameters. Please use the command format appropriate for your own Operating System, as shown below: 

_Windows Operating Systems:_
```bash
$ docker run -d --restart unless-stopped -p 28967:28967 -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" -e EMAIL="user@example.com" -e ADDRESS="domain.ddns.net:28967" -e BANDWIDTH="2TB" -e STORAGE="2TB" --mount type=bind,source="<identity-dir>",destination=/app/identity --mount type=bind,source="<storage-dir>",destination=/app/config --name storagenode storjlabs/storagenode:alpha
```
- Note: On Windows, you need to format the paths using double backslashes: `D:\\identity\\storagenode\\` or `D:\\data\\`


_All non ARM based platforms:_

```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e BANDWIDTH="20TB" \
    -e STORAGE="2TB" \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:alpha
```

_ARM-based platforms:_

```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e BANDWIDTH="20TB" \
    -e STORAGE="2TB" \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:arm
```


6) In order to monitor the functioning of your node, you can start the storage node dashboard as follows.
   - Note: *Depending on how much data you already have stored on your node, the dashboard may not load instantly. Give it some time to fully load before you file a support ticket. Also, it is not necessary to keep the dashboard constantly running. You can exit the dashboard with `Ctrl-C` and the `storagenode` container will continue running in the background.*

```bash
$ docker exec -it storagenode /app/dashboard.sh
```


7) With the command `docker logs -t storagenode`, you can look at your logs to see if you have some errors indicating that something is not functioning properly.
    - Log too big? Use this command if you just want to see the last 20 lines of the log: `docker logs --tail 20 storagenode`
    - To redirect the logs to a file, stop your node: `docker stop storagenode`, edit your config.yaml and add `log.output: "/app/config/node.log"` then start your node again with the usual `docker run` command. 
    - Also, you can redirect logs to a file like this: `docker logs storagenode 2>&1 > d:\file.txt`

*If you need help setting up your storage node, sign up for our [community chat](https://community.storj.io/home) and ask for assistance in the #storagenode channel. Provide your logs and stacktrace when requested by the community leader attending your issue.*


## Short Maintenance Shutdown

If you need to shutdown the storagenode for maintenance on your system, run:
```bash
$ docker stop storagenode
```

After you finished your maintenance, start it with:
```bash
$ docker start storagenode
```


## Upgrading Your Storage Node

You can set up automatic updates for your Storage Node docker container using Watchtower with the command below. Watchtower will look for new updates to the docker container on docker hub and automatically update your Storage Node when it sees a new version. This is the best way to ensure your Storage Node stays up to date. The commands below set up watchtower to only monitor the storagenode container and itself. If you want to use watchtower for other containers as well, please refer to the [watchtower documentation](https://hub.docker.com/r/containrrr/watchtower).

```bash
$ docker run -d --restart=always --name watchtower -v /var/run/docker.sock:/var/run/docker.sock storjlabs/watchtower storagenode watchtower
```

For ARM based machines use:
```bash
$ docker run -d --restart=always --name watchtower -v /var/run/docker.sock:/var/run/docker.sock storjlabs/watchtower:latest-arm32v6 storagenode watchtower
```

For manual updates run the following commands:

1) Stop the running storagenode container.
```bash
$ docker stop storagenode
```


2) Remove the existing container.
```bash
$ docker rm storagenode
```


3) Pull the latest image from docker.

_All non ARM based platforms:_

```bash
$ docker pull storjlabs/storagenode:alpha
```

_ARM-based platforms use:_

```bash
$ docker pull storjlabs/storagenode:arm
```


4) Start your Storage node again by running the following command after editing `WALLET`, `EMAIL`, `ADDRESS`, `BANDWIDTH`, `STORAGE`, `<identity-dir>`, and `<storage-dir>`.

Windows Operating Systems:
```bash
$ docker run -d --restart unless-stopped -p 28967:28967 -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" -e EMAIL="user@example.com" -e ADDRESS="domain.ddns.net:28967" -e BANDWIDTH="2TB" -e STORAGE="2TB" --mount type=bind,source="<identity-dir>",destination=/app/identity --mount type=bind,source="<storage-dir>",destination=/app/config --name storagenode storjlabs/storagenode:alpha
```

_All non ARM based platforms:_

```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="" \
    -e EMAIL="" \
    -e ADDRESS="" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:alpha
```

_ARM-based platforms:_

```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="" \
    -e EMAIL="" \
    -e ADDRESS="" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:arm
```


## Migrating your Node to a new Drive or Computer

If you want to migrate your node to a new drive/computer,  you need to migrate both the contents of your storage folder and your identity folder to the new location and change the corresponding paths for both storage and identity folders `--mount` parameters in your `docker run storagenode` command.


## Execute Other Storage Node Commands

Run `help` to see other commands. 

```bash
$ docker exec -it storagenode /app/storagenode help
```

Run the following to execute other commands.

```bash
$ docker exec -it storagenode /app/storagenode <<command>>
```
