# Linux Configuration for UDP

If you are running your node on Linux, you might see warnings about the receive buffer size.

UDP transfers on high-bandwidth connections can be limited by the size of the UDP receive buffer. This buffer holds packets that have been received by the kernel, but not yet read by the application. Once this buffer fills up, the kernel will drop any new incoming packet.

Our software attempts to increase the UDP receive buffer size. However, on Linux, an application is only allowed to increase the buffer size up to a maximum value set in the kernel, and the default maximum value is too small for high-bandwidth UDP transfers.

We recommend increasing the maximum buffer size by running the following to increase it to \~2.5MB.

```
sysctl -w net.core.rmem_max=2500000
```

To make this value persistent across reboots, run the following instead:

```
echo "net.core.rmem_max=2500000" >> /etc/sysctl.conf

sysctl -w net.core.rmem_max=2500000
```

_reference:_ [_udp receive buffer size in quic-go_](https://github.com/lucas-clemente/quic-go/wiki/UDP-Receive-Buffer-Size)__
