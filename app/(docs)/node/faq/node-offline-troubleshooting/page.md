---
title: Node offline troubleshooting
docId: b4b65d53-6782-4a74-b59a-3afa682240ab
redirects:
  - /hc/en-us/articles/360043987711-Node-offline-troubleshooting
  - /hc/en-us/articles/360043987711
---
If you have received a notification or email indicating that your node is offline, please do the following troubleshooting to bring it back online:

1. [Check your identity](docId:aT6VAB297OWLd4vqeXxf5#confirm-the-identity) 
2. Check your port forwarding rule on your router, it should forward TCP+UDP ports `28967` to your PC with storagenode. Make sure that the IP in the port forwarding rule is the same as the IP of your PC.

3. Check that your external address on [https://www.yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/) matches the WAN IP on your router, otherwise your port forwarding rule will not work.

4. Check your external IP/address in the node config:
   * If you are running a node with Docker, please make sure that your `ADDRESS` option in the docker run command includes the port, for example: `-e ADDRESS=external.address.tld:28967`
   * In case of Windows GUI node, it's `contact.external-address:` (or deprecated `kademlia.external-address:`) parameter in the `"%ProgramFiles%\Storj\Storage Node\config.yaml"` config file. To edit the configuration file please use the **Notepad++** text editor, do not use the usual Notepad.
   ```
   contact.external-address: external.address.tld:28967
   ```

5. If your public IP is not static, then you should register your own DDNS domain, for example on [NoIP](https://www.noip.com/), and then use this domain as your external address. You also need to configure the updating of this domain with the current public IP on your router (it's usually configured in the DDNS section of your router settings) or with a special application from the DDNS provider. If you use NoIP, this application is called DUC. Make sure to use only one of those methods - either directly in the router configuration, or with the DUC application (or equivalent application if you use a different DDNS service than NoIP).

6. If you have a firewall, make an inbound rule to allow any traffic from any source and TCP+UDP `28967` ports and your PC/NAS as a destination. If you have any outbound restricted rule, then make an outbound rule for any traffic from any port of your PC as a source and any host with any port as a destination
