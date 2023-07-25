---
title: Migrating from Docker CLI to a GUI Install on Windows
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-05-04T03:01:55.000Z
docId: PsB_5Yp43KeN0DszuE2DN
redirects:
  - >-
    /dcs/resources/faq/migrate-my-node/migrating-from-docker-cli-to-a-gui-install-on-windows
---

## Migrating from Docker CLI to a GUI Install on Windows

1\. Make sure the Docker version is stopped and removed.

2\. Move orders from the data location to the installation folder location (`"%ProgramFiles%\Storj\Storage Node\orders"` by default) (PowerShell):

```powershell
robocopy /MIR /MOVE D:\Storj\orders "$env:ProgramFiles\Storj\Storage Node\orders"
```

3\. Point to the same exact **storage** folder where you were previously storing the data.&#x20;

{% callout type="warning"  %} 
Do NOT copy the path from the old `config.yaml` or `source` part of the `--mount` option of your Docker node where the **storage** subfolder was not explicitly included in the path.

It is better to specify the path to the **storage** subfolder with the **Browse...** button.
{% /callout %}

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/1ObCw2xLut_f0t9c1E9Jl_image.png)

4\. Verify the complete path to the correct **storage** folder on your hard drive.

{% callout type="danger"  %} 
**If you choose a different folder, your previously stored data will not be recognized, and your node will be disqualified**.
{% /callout %}

## Migrating from Docker CLI on Linux to a GUI install on Windows

First you need to transfer both the identity and the data from the Linux installation to the new Windows device: [](docId\:jEntWNvi2M6Eo74NICIJg)&#x20;

Then you can follow the instructions in this guide.
