# QUIC requirements

## What is QUIC?

See [https://en.wikipedia.org/wiki/QUIC](https://en.wikipedia.org/wiki/QUIC)

This is a protocol based on UDP which promises more efficient usage of the internet connection with parallel downloads and uploads. This is exactly how our software operates.

## How to configure Quic?

You need to port forward not only TCP, but also UDP. You also need to allow the node's port for the UDP protocol in your firewall, see[#setup-port-forwarding-router-port-forwarding-configuration](../port-forwarding.md#setup-port-forwarding-router-port-forwarding-configuration "mention").&#x20;

\
In case of Docker installation, you should use `tcp` and `udp` notations in the port mapping of your `docker run` command, see [#running-the-storage-node](../../setup/cli/storage-node.md#running-the-storage-node "mention").

## What else should be configured?

Linux users, please take a look at [linux-configuration-for-udp.md](linux-configuration-for-udp.md "mention")

Windows users, please take a look at the Firewall configuration instructions in the [#setup-port-forwarding-router-port-forwarding-configuration](../port-forwarding.md#setup-port-forwarding-router-port-forwarding-configuration "mention") section for Windows.
