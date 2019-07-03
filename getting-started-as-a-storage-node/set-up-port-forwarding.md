# Set Up Port Forwarding

To successfully connect to the outside world, the storage node software is using TCP forwarded ports. The user must manually configure TCP port forwarding as it provides the most stable configuration possible.

**If your router does not support TCP port forwarding, have a look at chapter 5 of** [**Running a V3 Storage Node with PIA \(VPN\)**](https://storjlabs.atlassian.net/wiki/spaces/SCKB/pages/56164412) **guide to obtain a forwarded port.**

One of the main hurdles for setting up a good working node is the port forwarding step, which has been the cause for many bad performing farmers. In this section we will look how to configure TCP port forwarding for our 3x nodes.

Most consumer routers use DHCP.  DHCP gives your computers on the local network a new IP address after a certain amount of time \(normally 24 hours\). If our computer is given a new private IP address, it creates an issue - suddenly the specified Storage Node TCP port will not match the private IP address of our system any more in the router configuration. When this happens, our computer will not be able to access the port any more and the port will thus be closed. To prevent this from happening, you have to set up a _static private IP address_. There are plenty of tutorials on this topic on the internet, including:

* [HowToGeek](https://www.howtogeek.com/howto/19249/how-to-assign-a-static-ip-address-in-xp-vista-or-windows-7/)
* [PortForward](https://portforward.com/networking/static-ip-windows-10.htm)
* [HowToForge](https://www.howtoforge.com/linux-basics-set-a-static-ip-on-ubuntu)
* [Cyberciti](https://www.cyberciti.biz/faq/linux-configure-a-static-ip-address-tutorial/)

**When done, make sure to restart your computer and check if the private IP address is still static. If the IP address changes after a reboot, it means that the IP is not static.**

To be able to use TCP port forwarding in storagenode, it is necessary that the port you will forward is linked to a public IP or hostname. Although one can use his or her public IP, most internet providers \(ISPs\) do not assign static public IPs, meaning that at some point in time your public IP address will change. The consequence of this is that the port that you forwarded ceases to match to the IP address specified in the Storage Node configuration file and thus the port will be inaccessible/closed. You can protect yourself against public IP address change by assigning a hostname to your own local network with a service like [noip](http://noip.com/). If you are not sure if the public IP changes or not over time it is still a good idea to configure a hostname, just in case. Below we will walk through using both methods. If you plan to use a hostname please skip the _"Use a public IP address below"_ step.

If you are certain your public IP address is static, this is the way to go.

Open a browser and head over to Google, then type in “what’s my IP”.  Google will then return your public IP address. Keep this IP address at hand as we will need it later.



_Figure 1. Finding your public IP address._

**Note:** _You should only use one hostname for your entire local network_, even if you plan to configure multiple drives/nodes or run storagenode on multiple machines \(which will not be possible in the first SNO alpha release anyway\). This is true as long as all machines are connected to the same network and can thus be identified with the same public IP address. If you want to run one of the nodes behind a proxy or VPN on the same network, you would have to add another hostname. You will also need a new hostname if you want to run storagenode on another network.

When your public IP address is not static, your ISP will provide you with a new IP address after a certain amount of time. The consequence of this would be that when the IP address changes, the storage node would lose its connection to the network. Adding a hostname solves the issue of public IP change.  
We will add a free hostname using NoIP \([noip](http://www.noip.com/)\) which needs to be renewed for free every 30 days on a free account. On the NoIP website scroll down to _“Create Your Free Hostname now”_, then do the following \(Figure 2\):

1. In the hostname input field select a hostname of your liking \(e.g. _myhomestorjfarm_\), it can contain letters and numbers.
2. Next select a hostname provider of your liking \(e.g. _“._[_ddns.net_](http://ddns.net/)_”\)_ in the box to the right.
3. Click “_Sign Up_”



_Figure 2. Adding our own hostname._

1. On the sign-up page, enter your email, username and password. Make sure to write these details down, you will need them later \(Figure 3\).



_Figure 3. NoIP registration page._

1. When done, click on _“Create My Free Account”_. NoIP will now send you a confirmation email with an activation link to your email address. Once you click on the activation link it should take you to the NoIP website and confirm that your account is now active.
2. Now scroll down to where it says _“How to remote access your device”_ and click _“Get started with Dynamic DNS”_ \(Figure 4\).



_Figure 4. The activation page: click on the large blue box to go to the hostname setup page._

1. Clicking on the link should take us to our NoIP dashboard.
2. Now scroll down to _“Dynamic Update Client for Windows”_ \(DUC\) and click on_“Download”_ \(Figure 5\). This should take you to the download page where you can download the DUC tool. On the download page click  \_“Download Now”_.



_Figure 5. Dynamic Update Client download_

1. After the file has downloaded successfully, head over to the download folder and double click on the _“DUCSetup”_ executable.
2. On the resulting installation window, click on _“Agree” -&gt; “Install” -&gt; “Finish”_.



_Figure 6. DUC installation._

1. The Dynamic Update Client should now open. Enter the username and password from step \(4\) above and click on _“Sign In”_ \(Figure 7\).



_Figure 7. Dynamic Update Client \(DUC\)._

1. Once you've logged in successfully, the _“Edit groups/Hosts”_ menu should be displayed \(Figure 8\). If not already selected, choose the hostname box and click on _“Save”_.



_Figure 8. From the Edit groups/Hosts menu, select the hostname and click on save._

1. The DUC tool will now come to life \(Figure 9\). Next go to _“File” -&gt; “Preferences”_ and select _“Start this application automatically when the user logs on”_. In case your computer reboots, DUC will automatically start in the background. This is very handy because if Storage Node starts automatically, it will not run into a closed port as DUC is also already running.



_Figure 9. DUC once configured correctly._

You now have a hostname and a dynamic update tool that automatically tracks and assigns the IP address to your hostname. So if your public IP changes, Storage Node will not lose access to the TCP port. Please keep your hostname at hand as we will need it later.

**Note:** Some routers can also act as a DUC, in that case you can use the router directly instead of having to install the No-IP DUC. Search the router menus for _"hostname"_ or _"DDNS"_.

Now that we have our public IP address or hostname _\(kademlia.external-address\)_, it is necessary to link the kademlia.external-address to a specific TCP port by forwarding that port in your router. All communication to and from your node will pass through this port.

**Note:** Each drive/node should have its own TCP port, so in case you want to add multiple drives it would look like this:

First, before we can start our port forwarding journey, we need to know the _gateway \(router\)_ private IP address so that we can gain access to the router. This can be done in the following ways;

Your router IP address can be found by typing in `ipconfig` into a CMD window \(Figure 10\). Then scroll down to “_Default gateway_” and copy-paste the router’s private IP address into  
a browser window \(Figure 11\).



_Figure 10. Network settings._



_Figure 11. Router Login page._

We can now log into our router and configure the TCP ports. The router manufacturer and model will vary from user to user and thus the port-forwarding appearance and menu location within the router GUI will also differ.

Doing a quick Google or YouTube search for:

* `Port forwarding with <Your router brand and model>`

Should bring up enough information to successfully configure port forwarding for your router, alternatively the following website contains guides on how to port forward on most routers: [https://portforward.com/](https://portforward.com/).

**Note:** The port forwarding menu in most routers is under the _“Security”_ menu called _“Virtual server”_.

Now copy the IPv4 address from the command prompt \(CMD\) window in which we executed the `ipconfig` command. This IPv4 address is the private internal IP address of our computer and is required to set the port forwarding rule \(Figure 12\).

In the example below the ports for three nodes/drives were added to the  
router:

* _**Node 1:**_ 4000
* _**Node 2:**_ 4001
* _**Node 3:**_ 4002



_Figure 12. Port forwarding parameters for three nodes. Each row represents the forwarding parameters for a single node._

The first thing we have to do is find our default gateway \(router private IP address\). This can be accomplished by typing in the following command into a terminal \(Figure 13\):

or



_Figure 13. Find your router gateway IP address._

Now copy your _“Gateway”_ address as shown in red in the figure above \(Figure 13\). Paste the gateway address into a browser window \(Figure 14\). This should bring up the router login page.



_Figure 14. Router Login page._

We can now log into our router and configure the TCP ports. The router manufacturer and model will vary from user to user and thus the port-forwarding menu location within the router GUI will also differ.

Doing a quick google or YouTube search for:

* `Port forwarding with <Your router brand and model>`

_Should bring up enough information to open the ports. A_lternatively, the following website contains guides on how to port forward on most routers: [https://portforward.com/](https://portforward.com/).

The port forwarding menu in most routers is under the _“Security”_ menu called _“Virtual server”_.

Next, find the private IP address of the machine on which you want to run Storage Node,  by executing the following command:

_This should return your current static private IP address._

Now copy the IP address from the terminal window in which you executed the `hostname -I` command and use it to set the port forwarding rule in the router settings \(Figure 15\).

In the example below the ports for three nodes/drives were added to the router:

* **Node 1:** 4000
* **Node 2:** 4001
* **Node 3:** 400

_Figure 15. Port forwarding parameters for three nodes. Each row represents the forwarding parameters for a single node._

**Note:** The exact port numbers you want to forward are of your own choice. The ports in this guide are just suggestions.

_**After following all these steps you should have the following:**_

1. A configured hostname or knowledge of your static Public IP address.
2. A static private IP address.
3. Configured port forwarding for every node/drive you want to add to Storage Node.

_These are all the network tools and settings that have to be configured to successfully run Storage Node drives/nodes via TCP._

{% hint style="info" %}
For help with network configuration problems, please consult our [Storage Node Networking Basics Documentation](https://storjlabs.atlassian.net/wiki/spaces/SCKB/pages/57081939/Networking+101+for+Storage+Node+Operators) before submitting a [support ticket](https://storjlabs.atlassian.net/servicedesk/customer/portal/1/create/29).
{% endhint %}

## Related articles <a id="Needhelpport-forwarding?-Relatedarticles"></a>

