# The Explorer Release has arrived!

Hello Storj Node Operators! First off, we want to say thank you for your patience. We know many of you have been waiting several months to join the V3 network. Your patience is being rewarded; you are the first nodes to be invited to the Explorer release. 

This release is gated, which means that we are controlling how many nodes are able to join the network and how quickly they are able to do so. We want to give our early adopters a chance to start earning reputation and STORJ tokens. 

If we allow too many nodes to join the network right away, you would be earning fewer STORJ tokens because the available data would naturally be spread over a larger number of nodes. Storj Labs is going to be uploading enough data to the network during this release to ensure all storage nodes get payouts.

The goal of this release is to begin building a reliable, long-term supply of storage nodes. The steps in the public alpha are complex and definitely targeted at a more technical audience.  

If these instructions are a little more complex than you can handle, don’t worry! As we progress from alpha to beta, we’ll continually make the process easier and more accessible for less technical users. 

Storage node set up tutorial [video](https://youtu.be/cd6gWMgSyqI)


#### Before you begin
Make sure you have an email with your personal single-use authorization token. Note that the format of the authorization token is `email:characterstring`. If you don’t have an authorization token yet, please join our [waitlist](https://storj.io/sign-up-farmer). 

*__Note:__ This early release has limited support for some operating systems. If your OS is not explicitly supported, please save your one-time-use authorization token and we will notify everyone when this is no longer an issue.*

Install the necessary dependencies and configure your network appropriately using the following steps: 

- Install `docker` please visit: [docker.com](https://docs.docker.com/install/) and follow the installation guide for your operating system. 
- Set up port forwarding & Dynamic DNS! The port you must specify is `28967`. Please visit our [knowledge base article](https://storjlabs.atlassian.net/wiki/spaces/SCKB/pages/4423868/Need+help+port-forwarding) or [portforward.com](https://portforward.com/) and follow the instructions for your router.

#### Setting up your Storage Node on the V3 Network!

1) Download the Identity tool binary and create an Identity. The process of generating an identity could take several hours; it is dependent on your machine´s processing power & luck.

Download the correct binary for your operating system:
- Mac OS: [identity_darwin_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/0f662b8-go1.11/identity_darwin_amd64.zip)
- Linux: [identity_linux_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/0f662b8-go1.11/identity_linux_amd64.zip)
- Raspberry Pi: [identity_linux_arm.zip](https://storj-v3-alpha-builds.storage.googleapis.com/0f662b8-go1.11/identity_linux_arm.zip)
- Windows Pro: [identity_windows_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/0f662b8-go1.11/identity_windows_amd64.zip)

2) Unzip the file and run the following command to start creating an identity (this example is for Mac OS, substitute the appropriate identity binary for your OS):

```bash
$ ./identity_darwin_amd64 create storagenode
```

3) Sign the identity you created with your personal single-use authorization token by running the following command:
*By using the authorization token, you agree to be bound by the [Storage Sharing Terms and Conditions](https://storj.io/storj-share-terms.html).*

```bash
$ ./identity_darwin_amd64 authorize storagenode <authorization-token>
```

*__Caution:__ Before proceeding to the next step, please be sure to back up your identity files located in the output path of the previous command. This will allow you to restore your node to working order in case of an unfortunate incident such as a hard drive crash.*

4) Download the docker container from docker hub: 

```bash
$ docker pull storjlabs/storagenode:alpha
```

_For Raspberry Pi and similar ARM-based platforms use:_

```bash
$ docker pull storjlabs/storagenode:arm
```

5) Run storage node with the following command, after editing `WALLET`, `EMAIL`, `ADDRESS`, `BANDWIDTH`, `STORAGE`, `<identity-dir>`, and `<storage-dir>`.
    
- `WALLET`: ethereum address for payments
- `EMAIL`: email address so that we can notify you when a new version has been released (optional)
- `ADDRESS`: external IP address or the DDNS you configured and the port you opened on your router `<ip>:<port>`
- `BANDWIDTH`: how much bandwidth you want to allocate to the Storj network
- `STORAGE`: how much disk space you want to allocate to the Storj network
- `<identity-dir>`: the location of your identity files. You can copy the absolute path from the output of the identity commands you ran earlier
- `<storage-dir>`: local directory where you want files to be stored on your hard drive for the network

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

_For Raspberry Pi and similar ARM-based platforms use:_

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

6) Start your storage node dashboard by running the following command:

```bash
$ docker exec -it storagenode /app/dashboard.sh
```

7) If step 5 or 6 failed for you, run: 

```bash
$ docker logs -t storagenode
```

*If you need help setting up your storage node, sign up for our [community chat](https://community.storj.io/home) and ask for assistance in the #storagenode channel. Provide your logs and stacktrace when requested by the community leader attending your issue.*

#### Upgrading your Storage Node

1) Stop the running storagenode container by running the following command:
```bash
$ docker kill storagenode 
```

2) Remove the existing container by running the following command:
```bash
$ docker rm storagenode
```

3) Pull the latest image for docker by running the following command:
```bash
$ docker pull storjlabs/storagenode:alpha
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
