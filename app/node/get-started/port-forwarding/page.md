---
title: Step 3. Setup Port Forwarding
docId: y0jltT-HzKPmDefi532sd
redirects:
  - /node/dependencies/port-forwarding
---

## Before starting

[](docId:hbCGTv1ZLLR2-kpSaGEXw)&#x20;

[](docId:v-fUvPqySvUwTMF-od6hD)&#x20;

{% callout type="warning"  %}
**Failure to complete these steps will prevent your storage node from working.**
{% /callout %}

## Introduction

How a Storage Node communicates with others on the Storj network, even though it is behind a router.

Most, if not all ISPs give a dynamic IP address, which means your IP can change at any time. As a work around, you need a dynamic DNS service to ensure your storage node is connected.

**Advanced: Already have a Static IP?** [](docId:y0jltT-HzKPmDefi532sd)\*\*\*\*

## Setup Dynamic DNS Service: Hostname Configuration

If you don't have a static IP, the first step is setting up a hostname.

There are various services available that allow you to set up a DDNS hostname. The following steps will guide you through doing this with one of the services, [NoIP](https://www.noip.com).

## Create a Free Hostname using NoIP

Add a free hostname using [NoIP](http://noip.com) which needs to be renewed every 30 days when using a free account. On the NoIP website, scroll down to _“Create Your Free Hostname now”_, then do the following:

- In the hostname input field, select a hostname of your liking (e.g. _mystoragenode_), it can contain letters and numbers.

- Next, select a hostname provider of your liking (e.g. _“._[_ddns_._net_](http://ddns.net)_”)_ in the box to the right.

- Click “_Sign Up"._

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/dbmW2zZComZnvZfiTlmTZ_image.png)

On the sign-up page, enter your email, username, and password. Make sure to write these details down, as you will need them later.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Xzp-7nDgdp0H2r60KmFvq_image.png)

Once you have created an account and clicked the confirmation link in the e-mail, scroll down to where it says _“How to remote access your device”_ and click _“Get started with Dynamic DNS.”_&#x20;

This will take you to the NoIP dashboard.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Od2QBn9eLu5_O8RpNC1GR_image.png)

## Setup Dynamic DNS Service: Dynamic Update Client Tool

You'll need to setup a dynamic update tool, which automatically tracks and assigns the IP address to your hostname. So, if your public IP changes, your node won’t get disconnected from the network.&#x20;

Please keep your hostname at hand as we will need it later.

{% callout type="warning"  %}
If your router supports NoIP's Dynamic DNS, we highly recommend configuring your router. [Here's how to do that](https://www.noip.com/support/knowledgebase/how-to-configure-ddns-in-router/).
{% /callout %}

{% tabs %}
{% tab label="Linux" %}

## Dynamic Update Client for Linux

First, open a new terminal window so you can type commands into Linux. Once you’ve opened your terminal window, log in as “root” user. You can become the root user from the command line by entering `sudo -s` followed by the root password on your machine.

Navigate to src folder:

```Text
cd /usr/local/src/
```

Download the necessary files:

```Text
wget http://www.no-ip.com/client/linux/noip-duc-linux.tar.gz
```

Extract the files using the following command:

```Text
tar xf noip-duc-linux.tar.gz
```

Navigate to the folder:

```Text
cd noip-2.1.9-1/
```

Once in the directory, type:

```Text
make install
```

You’ll then be prompted to log in with your NoIP account username and password.

{% callout type="info"  %}
If you get “make not found” or “missing gcc” then you don’t have the gcc compiler tools installed. Install the gcc compiler tools to proceed.
{% /callout %}

As root again (or with sudo) issue this command:

```Text
/usr/local/bin/noip2 -C
```

You’ll then be prompted for your NoIP username and password, as well as the hostnames you wish to update.&#x20;

{% callout type="info"  %}
**One of the questions is, “Do you wish to update ALL hosts?”** If answered incorrectly, this could affect hostnames in your account that are pointing at other locations.
{% /callout %}

Now that the client is installed and configured, you just need to launch it. Simply issue this final command to launch the client in the background:

```Text
/usr/local/bin/noip2
```

{% callout type="info"  %}
By default, the DUC software will not start when you reboot your system.
{% /callout %}

Check the README file in the `no-ip-2.1.9` folder for instructions on how to make the client run at startup. This varies depending on what Linux distribution you are running.
{% /tab %}

{% tab label="MacOS" %}

## [Dynamic Update Client for Mac](https://www.noip.com/download?page=mac)

1.Download the most recent version above.
2\. Open the downloaded file and drag the NoIP icon to the applications folder.
3.Open the applications folder and double-click on the NoIP DUC icon.
4\. Enter your NoIP username and password and Log In.
5\. Select the hostnames you would like updated.

Once complete, you can close the Select a Hostname window.
{% /tab %}

{% tab label="Windows" %}

## [Dynamic Update Client for Windows](https://www.noip.com/download?page=win)

1\. Download and install with link above.
2\. Enter your NoIP credentials.
3\. Select the hostname you created earlier and click "save".
{% /tab %}
{% /tabs %}

## Setup Port Forwarding: Router Port Forwarding Configuration

To set up port forwarding (TCP/UDP) on a router, we must first get the gateway IP address so we can access the router:

{% tabs %}
{% tab label="Linux" %}
Open the terminal app and run the following command

```Text
ip route | grep default
```

{% /tab %}

{% tab label="MacOS" %}
Open the terminal app and run the following command

```Text
 netstat -nr | grep default
```

{% /tab %}

{% tab label="Windows" %}
Open command prompt and run the following command

```none
ipconfig | findstr /i "Gateway"
```

{% /tab %}
{% /tabs %}

Once you have your gateway IP, open a browser and type it in.

You'll be forwarded to a login page of your router.&#x20;

If you don't know the login, try googling the default username and password for your router's make and model.

Once you are logged in to your router, find the port forwarding tab _(for some routers it's in "advanced settings")._

Now, you will need to get the local IP of your machine the node is running on:

{% tabs %}
{% tab label="Linux" %}
Open the terminal app and run the following command:

```Text
hostname -I
```

The local IP will be the first set of numbers.
{% /tab %}

{% tab label="MacOS" %}
Open the terminal app and run the following command:

If you are connected to a wireless network:

```Text
ipconfig getifaddr en0
```

If you are connected via Ethernet:

```Text
ipconfig getifaddr en1
```

{% /tab %}

{% tab label="Windows" %}
Open a command prompt and run the following command:

```none
ipconfig | findstr /i "IPv4"
```

{% /tab %}
{% /tabs %}

Next, go back to your router's port forward page and **add a new rule for port 28967** with the IPv4 address you just retrieved.

## Make Sure to Add a Firewall Rule

{% tabs %}
{% tab label="Linux" %}
Congratulations, you've setup port forwarding!
{% /tab %}

{% tab label="MacOS" %}
Congratulations, you've set up port forwarding!
{% /tab %}

{% tab label="Windows" %}
Your Node will most likely read offline if there is not a firewall rule set in place. To do that, run a Powershell as Administrator and execute:

```powershell
New-NetFirewallRule -DisplayName "Storj v3 TCP" -Direction Inbound -Protocol TCP -LocalPort 28967 -Action allow
New-NetFirewallRule -DisplayName "Storj v3 UDP" -Direction Inbound -Protocol UDP -LocalPort 28967 -Action allow
```

As an alternative, you can manually access it through Windows Firewall:

Search for "**firewall**" in your start bar on the lower left of your screen and click on "Windows Firewall with Advanced Security"

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/tK5oEbPCAmX7vI2qNh63T_image.png)

A new window will appear. On the left of the screen, select "Inbound Rules"

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/EHuGTy4YmZ8wbS5-c-pIk_image.png)

Once selected, on the right side of the screen click on "New Rule"

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/cwlvUSO7s8_QmR0lbmrts_image.png)

A new window will open. Under Rule Type select "Port" and click "Next"

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/lvCLPmXyF9-_DmaNMJ1Nl_image.png)

Select **TCP** and specify the port you wish to use (default is **28967**), then click "Next"

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/KxSWYj2UTUIW8H_0N1KRq_image.png)

Select "Allow the connection" then click "Next"

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/DkhYa8Qzs-yWd-p2oN-a1_image.png)

Leave all checkmarks checked, then click "Next"

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Nz0CZiyWkKnevlIqR7Op4_image.png)

Enter a name for the new rule, and description if you'd like, then click "Finish"

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/bzMP5TkA7B_AQ51IXp6EG_image.png)

Be sure to repeat the above steps to also create a new firewall rule for UDP. See[](docId:owZeAc56KSDnUzDhsBfB8)

Congratulations, you've set up port forwarding!
{% /tab %}
{% /tabs %}

### Have any difficulties? &#x20;

Search for port forwarding instructions for your exact router model.
