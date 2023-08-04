---
title: How to migrate the Windows GUI node from one physical location to another?
docId: NGHe10jmn-kdgzTf3FUz0
redirects:
  - >-
    /node/resources/faq/migrate-my-node/how-to-migrate-the-windows-gui-node-from-a-one-physical-location-to-other
---

To be able to move an existing node to a different physical location (different PC) we should transfer both the node's identity and the data. It is neither sufficient to only migrate the identity nor to only move the data to the new location, we need to do both.

First, we need to know where the identity is currently stored on your original machine. If you didn't change the default path, your identity is usually located by default in `"%AppData%\Storj\Identity\storagenode"`. You can open this path in the Explorer or with `cmd`.

We will assume that you can connect to your node directly via the local network.

{% callout type="success"  %}
Please, read documentation about a `robocopy command:` [`https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/robocopy`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/robocopy)
{% /callout %}

## Both PCs at the local network location

Please create an identity folder on your new PC with the same name as the identity folder you had on your old PC, and share it to the network.

For example, assuming your new PC is called `PC2` and the user on it is called `user`, then you can open `cmd` on the first PC and execute the command:

```powershell
robocopy "%AppData%\Storj\Identity\storagenode" \\pc2\Users\user\AppData\Roaming\Storj\Identity\storagenode /MIR
```

Using the same approach, you should also transfer the data. We will assume that the storage folder on the second PC is called `storage`. You can share that folder the same way as you did for the identity.

Please run this command while your node is running:

```powershell
robocopy d:\storagenode \\pc2\storage /MIR
```

Using the same approach, you also transfer the orders folder. By default the `orders` folder is located in the setup location, i.e. `"%ProgramFiles%\Storj\Storage Node\orders"`. You need to share this folder on the destination PC in the same way as the previous folders.

Please run this command while your node is running:

```powershell
robocopy "%ProgramFiles%\Storj\Storage Node\orders" \\pc2\orders /MIR
```

While these commands are executing, you should make a port forwarding rule on your router for the future storagenode on the second PC, as described in [](docId:y0jltT-HzKPmDefi532sd).

After the above `robocopy` commands have finished executing for the first time, you should run them several more times until the difference will be negligible. Then you can stop the storagenode service on the first PC in the elevated `cmd`:

```shell
net stop storagenode
```

Then run the commands for copying the data and orders one last time.&#x20;

Now you should uninstall the storagenode Windows GUI version from your first PC and install it on the new PC following these instructions: [](docId:5shJebpS3baWj6LDV5ANQ), but please skip the steps for receiving the authorization token and generating the identity.

You must provide the correct path to the locations of your copied identity and to the copied data during the installation wizard.

{% callout type="danger"  %}
The network-attached storage location could work, but it is neither supported nor recommended!
{% /callout %}

### Remote location

There are plenty of options how to transfer the identity and data to the remote location, here are some examples:

- [Storj DCS](https://www.storj.io/)

- ftp service

- file sharing services&#x20;

- BitTorrent

- Resilio sync

- Team Viewer

Depending on what type of data transfer you have selected, you can transfer the data while your node is running, but you need to sync for a second time after you have shut down the source node to transfer the last-changed pieces (BitTorrent and Resilio Sync).

Unfortunately, most of these services will require you to first stop the source node while you transfer the data, in which case you should not run it again.

If your node would be offline to much (more than 288 hours) it can be suspended and if it would be offline more than 30 days it can be disqualified. So, you should try to bring your node online again as soon as possible.
