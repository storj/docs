# Storage Node Setup Instructions

#### [Storage Node Set up Video Tutorial](https://youtu.be/cd6gWMgSyqI)

## Before You Begin

#### Important Security Considerations

 * Our software serves requests from the internet, but not all software you may have installed is designed to be exposed to the internet directly! **Do not connect your computer directly to the internet without the assistance of a firewall.** This is especially true for users on Windows with applications responding to requests on all IPs.

Make sure you have an email with your personal single-use authorization token. Note that the format of the authorization token is `email:characterstring`. By using the authorization token, you agree to be bound by the [Storage Sharing Terms and Conditions](https://storj.io/storj-share-terms/). 

If you don’t have an authorization token yet, please join our [waitlist](https://storj.io/sign-up-farmer).

If these instructions are a little more complex than you can handle, don’t worry! As we progress from alpha to beta, we’ll continually make the process easier and more accessible for less technical users.

Our current release has limited support for operating systems. If your OS is not supported, save your one-time-use authorization token and we will notify everyone when this is no longer an issue.*

#### Install the necessary dependencies and configure your network appropriately using the following steps:

- Make sure your computer is *not* connected directly to the internet. If you already have a reasonable router you should be okay. See the Important security considerations section.
- Install Docker by following the [installation guide](https://docs.docker.com/install/) for your operating system. 
    - _**Note:** Docker Toolbox is not supported_
- Set up port forwarding & Dynamic DNS! The port you must specify is `28967`. Please visit our [knowledge base article](https://storjlabs.atlassian.net/wiki/spaces/SCKB/pages/4423868/Need+help+port-forwarding) or [portforward.com](https://portforward.com/) and follow the instructions for your router.

#### Notes
- It is highly recommended to perform the following steps local to the machine, and not via a remote connection. If you must use a remote connection, due to the length of time it takes for some of the steps, it is highly recommended to run them inside a virtual console like [TMUX](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/) or [SCREEN](https://linuxize.com/post/how-to-use-linux-screen/).
- If you are using Synology NAS or other device with less computing power, you can create Identity on a more powerful machine and transfer it over to the smaller device.
- If you are using Synology you must add "sudo" in front of commands.

## Setup

1. Download the Identity binary and unzip it.

Download the correct binary for your operating system:
- [Mac OS AMD64](https://storj-v3-alpha-builds.storage.googleapis.com/88653a3-v0.13.5-go1.12.5/identity_darwin_amd64.zip)
- [Linux AMD64](https://storj-v3-alpha-builds.storage.googleapis.com/88653a3-v0.13.5-go1.12.5/identity_linux_amd64.zip)
- [Raspberry Pi ARM](https://storj-v3-alpha-builds.storage.googleapis.com/88653a3-v0.13.5-go1.12.5/identity_linux_arm.zip)
- [Windows Pro AMD64](https://storj-v3-alpha-builds.storage.googleapis.com/88653a3-v0.13.5-go1.12.5/identity_windows_amd64.exe.zip)

2) Create an identity, this can take several hours depending on your machines processing power & luck. (this example is for Mac OS, substitute the appropriate identity binary for your OS)

```bash
$ ./identity_darwin_amd64 create storagenode
```

3) Sign the identity you created with your single-use authorization token.

```bash
$ ./identity_darwin_amd64 authorize storagenode <authorization-token>
```

*__Note:__ If you are using Synology you must add "sudo" in front of commands for creating and signing identity. Otherwise you will receive error. Default folder for created identity on Synology is /root/.local/share/storj/identity/storagenode/.*

*__Caution:__ Before proceeding to the next step, please be sure to back up your identity files located in the output path of the previous command. This will allow you to restore your node to working order in case of an unfortunate incident such as a hard drive crash.*

4) Download the Docker container (all non ARM based platforms).

```bash
$ docker pull storjlabs/storagenode:alpha
```

_ARM-based platforms use:_

```bash
$ docker pull storjlabs/storagenode:arm
```

5) Run storage node with the following command, after editing `WALLET`, `EMAIL`, `ADDRESS`, `BANDWIDTH`, `STORAGE`, `<identity-dir>`, and `<storage-dir>`.

- `WALLET`: ethereum address for payments
- `EMAIL`: email address so that we can notify you when a new version has been released (optional)
- `ADDRESS`: external IP address or the DDNS you configured and the port you opened on your router `<ip>:<port>`
   - Note: If you are using a custom port other than 28967, then you have to change the `-p 28967:28967` to `-p <port>:28967`
- `BANDWIDTH`: how much bandwidth you want to allocate to the Storj network
- `STORAGE`: how much disk space you want to allocate to the Storj network
- `<identity-dir>`: replace to the location of your identity files. You can copy the absolute path from the output of the identity commands you ran earlier
- `<storage-dir>`: replace to the local directory where you want files to be stored on your hard drive for the network
   - Note: the current database backend is [BoltDB](https://github.com/boltdb/bolt), which [requires _mmap_](https://github.com/boltdb/bolt/issues/704), hence you have use file system which supports _mmap_.

_All non ARM based platforms:_

```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:alpha
```

_ARM-based platforms use:_

```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:arm
```

_Windows Operating Systems:_
```bash
$ docker run -d --restart unless-stopped -p 28967:28967 -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" -e EMAIL="user@example.com" -e ADDRESS="domain.ddns.net:28967" -e BANDWIDTH="2TB" -e STORAGE="2TB" --mount type=bind,source="<identity-dir>",destination=/app/identity --mount type=bind,source="<storage-dir>",destination=/app/config --name storagenode storjlabs/storagenode:alpha
```
- Note: On Windows you need to format the paths like this: `D:\\identity\\storagenode\\` or `D:\\data\\`

6) Start your storage node dashboard.

```bash
$ docker exec -it storagenode /app/dashboard.sh
```

7) If step 5 or 6 failed for you, run:

```bash
$ docker logs -t storagenode
```

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

You can set up automatic updates for your Storage Node docker container using watchtower with the command below. Watchtower will look for new updates to the docker container on docker hub and automatically update your Storage Node when it sees a new version. This is the best way to ensure your Storage Node stays up to date. The commands below set up watchtower to only monitor the storagenode container and itself. If you want to use watchtower for other containers as well, please refer to the [watchtower documentation](https://hub.docker.com/r/containrrr/watchtower).

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

_ARM-based platforms use:_

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

## Execute Other Storage Node Commands

Run `help` to see other commands. 

```bash
$ docker exec -it storagenode /app/storagenode help
```

Run the following to execute other commands.

```bash
$ docker exec -it storagenode /app/storagenode <<command>>
```
