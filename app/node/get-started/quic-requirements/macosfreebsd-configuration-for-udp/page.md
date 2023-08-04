---
title: macOS/FreeBSD Configuration for UDP
docId: rw8hWAanflwtUVsu1jC5y
redirects:
  - /node/macosfreebsd-configuration-for-udp
---

If you are running your node on macOS/FreeBSD (Darwin/BSD), you might see warnings about the receive buffer size.
UDP transfers on high-bandwidth connections can be limited by the size of the UDP receive buffer. This buffer holds packets that have been received by the kernel, but not yet read by the application. Once this buffer fills up, the kernel will drop any new incoming packet.

Our software attempts to increase the UDP receive buffer size. However, on macOS/FreeBSD, an application is only allowed to increase the buffer size up to a maximum value set in the kernel, and the default maximum value is too small for high-bandwidth UDP transfers.

We recommend increasing the maximum buffer size by running the following to increase it to \~2.5MB. Accordingly [article of Cameron Sparr](https://medium.com/@CameronSparr/increase-os-udp-buffers-to-improve-performance-51d167bb1360), on BSD/Darwin systems you need to add about a 15% padding to the kernel limit socket buffer, i.e. `2.5MB * 1.15 = 2.875MB`.&#x20;

You may check the current UDP/IP buffer limit by typing the following command:

```shell
sysctl kern.ipc.maxsockbuf
```

If the value is less than 2875000 bytes you should add the following lines to the `/etc/sysctl.d/udp_buffer.conf` file (execute as root):

```shell
echo "kern.ipc.maxsockbuf=2875000" >> /etc/sysctl.d/udp_buffer.conf
```

Changes to `/etc/sysctl.d/udp_buffer.conf` do not take effect until reboot. To update the values immediately, type the following commands as root:

```shell
sudo sysctl -w kern.ipc.maxsockbuf=2875000
```
