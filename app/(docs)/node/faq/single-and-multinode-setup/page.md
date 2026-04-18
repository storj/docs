---
title: Single and multi-node Port forwarding setup
docId: 52ea9ae6-74e2-41b4-88f1-4b1230ec27da
redirects:
  - /hc/en-us/articles/360042343052-Single-and-multi-node-Port-forwarding-setup
---

When the outside world is trying to reach a specific node, it basically has to go through a few steps. We are going to include the Docker setup steps in case you want to use it on the other system or in case someone else with a docker setup has the same question.

# Single node setup
outside world => 28967 => router => 28967 => node machine [ => 28967 => docker container]

For single node, you will use the same port number throughout, so you can just use port `28967` everywhere. This makes the settings easier. However, there are several places where you can adjust ports and forward ports to other ports. That will become relevant in multi-node setups.

# Multi-machine multi-node setup
In a multi-machine setup for example, it could look like this.

* node1: outside world => 28967 => router => 28967 => node machine1 [ => 28967 => docker container]
* node2: outside world => 28968 => router => 28967 => node machine2 [ => 28967 => docker container]

In this setup, your router translates external port `28968` to internal port `28967` on machine2. This means machine 2 is still listening on the default `28967` port, but if the outside world wants to reach it, it has to talk to external port `28968`.

# Single-machine multi-node setup
Only use this setup if you want to share multiple HDD’s on a single machine. There is no advantage to be gained from running multiple nodes on the same HDD or array. This would not result in your nodes getting more data than if you were running only one single node on your hard drive.

In a single-machine setup with multiple nodes, it could look like this.

* node1: outside world => 28967 => router => 28967 => node machine1 [ => 28967 => docker container]
* node2: outside world => 28968 => router => 28968 => node machine1 [ => 28967 => docker container]

In this setup your router forwards both ports to the same machine without changing them. That machine then has to deal with port `28968` for node2. There are two options.

1. On setups without Docker, make the node2 listen to port `28968` by changing the `config.yaml`
2. On Docker node setups, change the port forward parameter in the `docker run` command for node2 to `-p 28968:28967`. Please note that these port numbers are different, because traffic on the machine is received on external port `28968` but translated to internal port `28967` inside the container. Because of this translation, no change in the `config.yaml` is necessary for these setups.

## Related settings
For the second node in multi-node setups, this translates to the following settings in config.yaml:
```
# public address to listen on
server.address: :28967
```
This setting refers to the port the node is listening on.

Without Docker:
outside world => 28968 => router => **28967** => node machine

With Docker:
outside world => 28968 => router => 28967 => node machine => **28967** => docker container
```
# the public address of the node, useful for nodes behind NAT
contact.external-address: yourddns.domain.com:28968
```
This setting refers to where the outside world can contact the node.
outside world => **28968** => router => 28967 => node machine [ => 28967 => docker container]

Note: For Docker setups, this value is set through the `-e ADDRESS="yourddns.domain.com:28967"` parameter in the `docker run` command.

# Common mistakes
## Forwarding twice
Have the router forward `28968` to `28967`, but also do the same in your `docker run` command with `-p 28968:28967`

outside world => 28968 => router => **28967** / **28968** => node machine => 28967 => Docker container

The ports that the node machine receives traffic on and Docker expects traffic on no longer match, so it doesn’t go through.

## Changing the port your node listens to while also translating ports
```
# public address to listen on
server.address: :28968
```
With `-p 28968:28967` in the `docker run` command.

outside world => 28968 => router => 28968 => node machine => **28967** / **28968** => Docker container.

The Docker container gets traffic on `28967`, but the node listens on `28968`.

## Using the same port on the same machine for multiple nodes
Different nodes always need to use different ports. Traffic can’t go through one port and then be split up again. This is why when you use a single machine, you can’t have your router forward both port `28967` and `28968` to `28967` on the same machine, but you can use the same port on multiple machine setups. The same goes for containers with docker setups. Multiple nodes can all listen to port `28967` as long as they are in multiple containers.

## In general
Mistakes usually consist of anything that breaks this chain. It’s important that in every step, the port that traffic is being sent to is also the port the next element in the chain is listening to. This can be complicated even more if people run multiple NAT setups and when firewalls get in the way. But that’s out of scope for this post.


{% callout type="info"  %}
This article was adapted from the original forum post [by author René Smeekes (@BrightSilence)](https://forum.storj.io/t/setting-up-second-machine-with-storj-on-same-network/5953/4?u=alexey)
{% /callout %}
