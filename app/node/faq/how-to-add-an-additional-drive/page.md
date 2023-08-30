---
title: How to add an additional drive?
metadata:
  description: Run multiple nodes
docId: NX30Zzpr870-px_UDpHvu
redirects:
  - /node/resources/faq/how-to-add-an-additional-drive
---

We recommend to run a new node, if you want to add an additional hard drive.

{% callout type="info"  %}
All nodes behind the same subnet /24 of a public IP are treated as a single node for ingress traffic and as separate ones for egress traffic (to the customers, repair and audit) - this is because we want to be decentralized as much as possible.

Adding more drives/nodes will not increase the ingress traffic, only usage by customers can do this.
{% /callout %}

You can, of course, use RAID instead, but this reduncancy not required for the network's operation - the network itself has a built-in redundancy due to the usage of erasure codes: the customer needs only 29 pieces out of 80 to reconstruct the whole file.

If you would like to use RAID anyway, please note - your node will not receive more customer data only because you use RAID, this will not affect the node selection.

Using RAID0 (LVM, spanned drives, JBOD, etc.) is not recommended - with only one disk failure the whole node is lost.

Even using RAID5/6 with today's disks is too risky due to bit failure rate on disks with high capacity: [High risk to lose a RAID5 volume during rebuild](https://forum.storj.io/t/hardware-configuration-and-receiving-mail-with-token/6445/4?u=alexey).

You can also read the discussion [RAID vs No RAID on our forum](https://forum.storj.io/t/raid-vs-no-raid-choice/6776).

{% callout type="danger"  %}
Each node must have its own generated unique identity signed with a new authorization token. Using a copy of the same identity but different tokens will result in disqualification as it is the same identity but with missing data.
{% /callout %}

## General rules to run multiple nodes in the same network

If you have only one external address, then you need to have a unique port for each storagenode. The default port for storagenode is `28967`, protocols `TCP+UDP`.

```Text
# the public address of the node, useful for nodes behind NAT
contact.external-address: "my.ddns.tld:28967"
```

If you want to add an additional new node, you can use the next free port or simply increase the previous used port by 1, for example - `28968`.

If you run multiple nodes on the same device, you will need a unique port for the dashboard too. The default port for the dashboard is `14002` TCP.

```Text
# server address of the api gateway and frontend app
# console.address: 127.0.0.1:14002
```

You can use the same rule as for the node's port to select any free port or simply increase the port number by 1, for example - `14003`. Don't forget to uncomment the parameter in your config (remove `#` with space after, each option should be started without spaces)!

{% callout type="warning"  %}
You need to forward only the external node's port. Please, do not forward the dashboard's port - it has no protection and anyone on the internet can see your private information. See [](docId:mZulkrp1H1Igv1BBTPsTC) guide to connect to your dashboard remotely.
{% /callout %}

If you run a binary version of storagenode ([](docId:5shJebpS3baWj6LDV5ANQ) for example) or a docker version with `--network host` option, you also need to have unique internal ports.

For the node's CLI dashboard, the default internal address and port is `127.0.0.1:7778`, it is specified in the `server.private-address` option.

```Text
# private address to listen on
server.private-address: 127.0.0.1:7778
```

For the second and any further nodes, you need to specify a unique port for each node there, too.

The next parameter to change the port is `server.address`, it contains an internal listen node's address and port, specified as `:28967` (this is equivalent to `0.0.0.0:28967`, i.e. it will bind to any local IP) by default.

```Text
# public address to listen on
server.address: :28967
```

You need to make these changes for the second and any further additional nodes as well.

## Forwarding options

For example, you decided to configure your second node with port `28968`. Then you can forward this port to the internal `28967` port, if the destination local IP is different from the first node. If both nodes are running on the same host, then you need to forward `28968` to `28968` and use this port in the `contact.external-address:` option of the `config.yaml` (in case of binary) or `-e ADDRESS` parameter of `docker run` in case of docker. If you use a binary version (or `docker run` with `--network host`), you also need to specify this port in the `server.address:` too.

In summary:

1.  you need to change the `contact.external-address:` option in `config.yaml` in case of binary or `-e ADDRESS` parameter of `docker run` in case of docker to use the external address and port, i.e. `my.ddns.tld:28968`.

2.  if the second node is running on another device, you can forward `28968` to `28967`, nothing else is needed to change in the second node configuration except the external address above;

3.  if the second node is running on the same device as the first one, you need to forward `28968` to `28968`, change the `server.address:` option in the `config.yaml` (in case of binary or `docker run` with `--network host`) or `-p 28968:28967` parameter in `docker run` command (in case of docker without `--network host`).

{% callout type="info"  %}
See KB article [Single and multi-node Port forwarding setup](https://support.storj.io/hc/en-us/articles/360042343052-Single-and-multi-node-Port-forwarding-setup) for details.

See [](docId:y0jltT-HzKPmDefi532sd) section for general port forwarding configuration.
{% /callout %}

## Docker version

We assume that the second node would be run on the same device as a first one.

1.  Go to your router and forward port `28968` to `28968` and the IP of your device.

2.  `docker run` will contain:

```Text
docker run .... -p 28968:28967/tcp -p 28968:28967/udp -p 172.0.0.1:14003:14002 -e ADDRESS=my.ddns.tld:28968 ....
```

_Please, use the full command from_ [](docId:HaDkV_0aWg9OJoBe53o-J)_, the above is an excerpt showing only the changed parts._

{% callout type="info"  %}
[](docId:bMlttgapdFJxCNAULJDIv)&#x20;
{% /callout %}

## Binary version

We assume that the second node would be run on the same device as the first one.

{% callout type="info"  %}
The Windows GUI installer can install only one node on the same Windows PC. For the second and next nodes we support only the docker version: [](docId:rz3s9lC3qAQHYSl37ngBN).

The alternative is to use the unofficial, Community supported Windows Toolbox made by @Vadim: [Win GUI Storj Node Toolbox](https://forum.storj.io/t/win-gui-storj-node-toolbox/4381), it allows you to set up more than one Windows node on the same PC.
{% /callout %}

1.  Go to your router and forward port `28968` to `28968` and IP of your device.

Change parameters in your `config.yaml` (see [](docId:gDXZgLlP_rcSW8SuflgqS)):

```Text
# the public address of the node, useful for nodes behind NAT
contact.external-address: "my.ddns.tld:28968"
```

```Text
# public address to listen on
server.address: :28968
```

```Text
# private address to listen on
server.private-address: 127.0.0.1:7779
```

```Text
# server address of the api gateway and frontend app
console.address: 127.0.0.1:14003
```

3\. Save the `config.yaml` and restart the `storagenode` service (see [](docId:Zh_lD6UPciHT53wOWuAoD)).
