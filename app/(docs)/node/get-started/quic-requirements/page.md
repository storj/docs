---
title: Step 3. Configure QUIC
docId: owZeAc56KSDnUzDhsBfB8
redirects:
  - /node/dependencies/quic-requirements
---

## Before starting

{% callout type="warning"  %}
**Failure to complete these steps will prevent your storage node from working.**
{% /callout %}

[](docId:hbCGTv1ZLLR2-kpSaGEXw)

[](docId:y0jltT-HzKPmDefi532sd)

## What is QUIC?

QUIC is a protocol based on UDP which promises more efficient usage of the internet connection with parallel downloads and uploads. This is exactly how our software operates.

See <https://en.wikipedia.org/wiki/QUIC>

## How to configure QUIC?

You need to port forward not only TCP, but also UDP. You also need to allow the node's port for the UDP protocol in your firewall, see [](docId:y0jltT-HzKPmDefi532sd).

In case of Docker installation, you should use `tcp` and `udp` notations in the port mapping of your `docker run` command, see [](docId:HaDkV_0aWg9OJoBe53o-J)

## What else should be configured?

Linux users, please take a look at [](docId:uIbtSLgN6Ug86rBvFZQOB). macOS/FreeBSD users, plese take a look at [](docId:rw8hWAanflwtUVsu1jC5y).

Windows users, please take a look at the Firewall configuration instructions in the [](docId:y0jltT-HzKPmDefi532sd) section for Windows.

If you configured QUIC while your node was running, you need to restart it to apply the changes (the QUIC connectivity will be checked on startup and on every check-in on the satellite (1h by default)).

{% tabs %}
{% tab label="Docker" %}

```none
docker restart -t 300 storagenode
```

{% /tab %}

{% tab label="Windows" %}
To restart the `storagenode` service you can use either Services applet or elevated PowerShell:

```powershell
Restart-Service storagenode
```

{% /tab %}
{% /tabs %}
