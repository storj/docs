# The Explorer Release has arrived!

Hello Storj Node Operators! First off, we want to say thank you for your patience. We know many of you have been waiting several months to join the V3 network. Your patience is being rewarded; you are the first nodes to be invited to the Explorer release. 

This release is gated, which means that we are controlling how many nodes are able to join the network and how quickly they are able to do so. We want to give our early adopters a chance to start earning reputation and STORJ tokens. 

If we allow too many nodes to join the network right away, you would be earning fewer STORJ tokens because the available data would naturally be spread over a larger number of nodes. Storj Labs is going to be uploading enough data to the network during this release to ensure all storage nodes get payouts.

The goal of this release is to begin building a reliable, long-term supply of storage nodes. The steps in the public alpha are complex and definitely targeted at a more technical audience.  

If these instructions are a little more complex than you can handle, don’t worry! As we progress from alpha to beta, we’ll continually make the process easier and more accessible for less technical users. 

Storage node set up tutorial [video](https://youtu.be/cd6gWMgSyqI)


#### Important security considerations

 * Our software serves requests from the internet, but not all software you may have installed is designed to be exposed to the internet directly! **Do not connect your computer directly to the internet without the assistance of a firewall.** This is especially true for users on Windows with applications responding to requests on all IPs.

#### Before you begin
Make sure you have an email with your personal single-use authorization token. Note that the format of the authorization token is `email:characterstring`. If you don’t have an authorization token yet, please join our [waitlist](https://storj.io/sign-up-farmer). 

*__Note:__ This early release has limited support for some operating systems. If your OS is not explicitly supported, please save your one-time-use authorization token and we will notify everyone when this is no longer an issue.*

Install the necessary dependencies and configure your network appropriately using the following steps: 

- Make sure your computer is *not* connected directly to the internet. If you already have a reasonable router you should be okay. See the Important security considerations section.
- Install `docker`. Please visit: [docker.com](https://docs.docker.com/install/) and follow the installation guide for your operating system. 
    - _**Note:** Docker Toolbox is not supported_
- Set up port forwarding & Dynamic DNS! The port you must specify is `28967`. Please visit our [knowledge base article](https://storjlabs.atlassian.net/wiki/spaces/SCKB/pages/4423868/Need+help+port-forwarding) or [portforward.com](https://portforward.com/) and follow the instructions for your router.

#### Setting up your Storage Node on the V3 Network!

*__Note:__ It is highly recommended to perform the following steps local to the machine, and not via a remote connection. If you must use a remote connection, due to the length of time it takes for some of the steps, it is highly recommended to run them inside a virtual console like [TMUX](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/) or [SCREEN](https://linuxize.com/post/how-to-use-linux-screen/).*

1) Download the Identity tool binary and create an Identity. The process of generating an identity could take several hours; it is dependent on your machine´s processing power & luck.

Download the correct binary for your operating system:
- Mac OS: [identity_darwin_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/5ac1622-heads-v0.10.1-go1.12.1/identity_darwin_amd64.zip)
- Linux: [identity_linux_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/5ac1622-heads-v0.10.1-go1.12.1/identity_linux_amd64.zip)
- Raspberry Pi: [identity_linux_arm.zip](https://storj-v3-alpha-builds.storage.googleapis.com/5ac1622-heads-v0.10.1-go1.12.1/identity_linux_arm.zip)
- Windows Pro: [identity_windows_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/5ac1622-heads-v0.10.1-go1.12.1/identity_windows_amd64.exe.zip)

*__Note:__ If you are using Synology NAS or other device with less computing power, you can create Identity on a more powerful machine and transfer it over to the smaller device.*

2) Unzip the file and run the following command to start creating an identity (this example is for Mac OS, substitute the appropriate identity binary for your OS):

```bash
$ ./identity_darwin_amd64 create storagenode
```

3) Sign the identity you created with your personal single-use authorization token by running the following command:
*By using the authorization token, you agree to be bound by the [Storage Sharing Terms and Conditions](https://storj.io/storj-share-terms/).*

```bash
$ ./identity_darwin_amd64 authorize storagenode <authorization-token>
```

*__Note:__ If you are using Synology you must add "sudo" in front of commands for creating and signing identity. Otherwise you will receive error. Default folder for created identity on Synology is /root/.local/share/storj/identity/storagenode/.*

*__Caution:__ Before proceeding to the next step, please be sure to back up your identity files located in the output path of the previous command. This will allow you to restore your node to working order in case of an unfortunate incident such as a hard drive crash.*

4) Download the docker container from docker hub: 

```bash
$ docker pull storjlabs/storagenode:alpha
```

_For Raspberry Pi and similar ARM-based platforms use:_

```bash
$ docker pull storjlabs/storagenode:arm
```

_For Synology NAS with Intel CPU use:_

```bash
$ sudo docker pull storjlabs/storagenode:alpha
```

5) Run storage node with the following command, after editing `WALLET`, `EMAIL`, `ADDRESS`, `BANDWIDTH`, `STORAGE`, `<identity-dir>`, and `<storage-dir>`.
    
- `WALLET`: ethereum address for payments
- `EMAIL`: email address so that we can notify you when a new version has been released (optional)
- `ADDRESS`: external IP address or the DDNS you configured and the port you opened on your router `<ip>:<port>`
   - Note: If you are using a custom port other than 28967, then you have to change the `-p 28967:28967` to `-p <port>:28967`
- `BANDWIDTH`: how much bandwidth you want to allocate to the Storj network
- `STORAGE`: how much disk space you want to allocate to the Storj network
- `<identity-dir>`: the location of your identity files. You can copy the absolute path from the output of the identity commands you ran earlier
- `<storage-dir>`: local directory where you want files to be stored on your hard drive for the network

```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    -v "<identity-dir>":/app/identity \
    -v "<storage-dir>":/app/config \
    --name storagenode storjlabs/storagenode:alpha
```

_For Raspberry Pi and similar ARM-based platforms use:_

```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    -v "<identity-dir>":/app/identity \
    -v "<storage-dir>":/app/config \
    --name storagenode storjlabs/storagenode:arm
```

_For Synology NAS use:_

```bash
$ sudo docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    -v "<identity-dir>":/app/identity \
    -v "<storage-dir>":/app/config \
    --name storagenode storjlabs/storagenode:alpha
```

_For Windows Operating Systems use the following line:_
```bash
$ docker run -d --restart unless-stopped -p 28967:28967 -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" -e EMAIL="user@example.com" -e ADDRESS="domain.ddns.net:28967" -e BANDWIDTH="2TB" -e STORAGE="2TB" -v "<identity-dir>":/app/identity -v "<storage-dir>":/app/config --name storagenode storjlabs/storagenode:alpha
```
- Note: On Windows you need to format the paths like this: `D:\\identity\\storagenode\\` or `D:\\data\\`

6) Start your storage node dashboard by running the following command:

```bash
$ docker exec -it storagenode /app/dashboard.sh
```

7) If step 5 or 6 failed for you, run: 

```bash
$ docker logs -t storagenode
```

- Note: If you are using Synology you must add "sudo" in front of commands.

*If you need help setting up your storage node, sign up for our [community chat](https://community.storj.io/home) and ask for assistance in the #storagenode channel. Provide your logs and stacktrace when requested by the community leader attending your issue.*

#### Short Maintenance Shutdown

In case you need to shutdown the storagenode for short maintenance on your system, you can shut it down safely with this command:
```bash
$ docker stop storagenode
```
After you finished your maintenance you can bring it back up like this:
```bash
$ docker start storagenode
```

#### Upgrading your Storage Node

You can set up automatic updates for your Storage Node docker container using watchtower with the command below. Watchtower will look for new updates to the docker container on docker hub and automatically update your Storage Node when it sees a new version. This is the best way to ensure your Storage Node stays up to date.

```bash
$ docker run -d --restart=always --name watchtower -v /var/run/docker.sock:/var/run/docker.sock storjlabs/watchtower
```


For manual updates run the following commands: 

1) Stop the running storagenode container by running the following command:
```bash
$ docker stop storagenode 
```

2) Remove the existing container by running the following command:
```bash
$ docker rm storagenode
```

3) Pull the latest image for docker by running the following command depending on your architecture:
```bash
$ docker pull storjlabs/storagenode:alpha
```
or
```bash
$ docker pull storjlabs/storagenode:arm
```

4) Start your Storage node again by running the following command after editing `WALLET`, `EMAIL`, `ADDRESS`, `BANDWIDTH`, `STORAGE`, `<identity-dir>`, and `<storage-dir>`.
```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="" \
    -e EMAIL="" \
    -e ADDRESS="" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    -v "<identity-dir>":/app/identity \
    -v "<storage-dir>":/app/config \
    --name storagenode storjlabs/storagenode:alpha
```
For ARM based machines use:
```bash
$ docker run -d --restart unless-stopped -p 28967:28967 \
    -e WALLET="" \
    -e EMAIL="" \
    -e ADDRESS="" \
    -e BANDWIDTH="2TB" \
    -e STORAGE="2TB" \
    -v "<identity-dir>":/app/identity \
    -v "<storage-dir>":/app/config \
    --name storagenode storjlabs/storagenode:arm
```
