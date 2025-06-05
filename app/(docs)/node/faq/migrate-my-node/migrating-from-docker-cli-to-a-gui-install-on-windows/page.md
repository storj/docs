---
title: Migrating from Docker CLI to a GUI Install on Windows
docId: PsB_5Yp43KeN0DszuE2DN
redirects:
  - >-
    /node/resources/faq/migrate-my-node/migrating-from-docker-cli-to-a-gui-install-on-windows
---

## Migrating from Docker CLI to a GUI Install on Windows

1\. Make sure the Docker version is stopped and removed.

2\. Move orders from the data location to the installation folder location (`"%ProgramFiles%\Storj\Storage Node\orders"` by default) (PowerShell):

```powershell
robocopy /MIR /MOVE D:\Storj\orders "$env:ProgramFiles\Storj\Storage Node\orders"
```

3\. Point to the same exact **storage** folder where you were previously storing the data.

{% callout type="warning"  %}
Do NOT copy the path from the old `config.yaml` or `source` part of the `--mount` option of your Docker node where the **storage** subfolder was not explicitly included in the path.

It is better to specify the path to the **storage** subfolder with the **Browse...** button.
{% /callout %}

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/1ObCw2xLut_f0t9c1E9Jl_image.png)

4\. Verify the complete path to the correct **storage** folder on your hard drive.

{% callout type="danger"  %}
**If you choose a different folder, your previously stored data will not be recognized, and your node will be disqualified**.
{% /callout %}

## Migrating from Docker CLI on Linux to a GUI install on Windows

First you need to transfer both the identity and the data from the Linux installation to the new Windows device: [](docId:jEntWNvi2M6Eo74NICIJg)

Then you can follow the instructions in this guide.
