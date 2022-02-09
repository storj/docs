# How do I migrate my node to a new device?

To migrate your Node to a new drive or computer, you first need to copy both the contents of your storage folder, as well as your identity folder to the new location.

{% tabs %}
{% tab title="Windows" %}
Your default identity folder is located in: `%APPDATA%\Storj\Identity\storagenode`

Your default orders folder is located in `"%ProgramFiles%\Storj\Storage Node\orders"`

To migrate your Windows storage node you can follow this guide: [How to migrate the Windows GUI node from one physical location to another?](how-to-migrate-the-windows-gui-node-from-a-one-physical-location-to-other.md) The only difference - you do not need to share folders, since they are available locally, just use the local paths.

Also, you can [enable WSL, install Ubuntu from the Microsoft store](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and use the [Migrating with rsync](./#migrating-with-rsync) guide. In this case your drives are mounted automatically. For example, `D:` disk will be mounted to the `/mnt/d`.

To migrate from the Docker installation to a Windows GUI, please, follow this guide: [Migrating from Docker CLI to a GUI Install on Windows](migrating-from-docker-cli-to-a-gui-install-on-windows.md).

To migrate from the Windows GUI to the Docker installation, please, follow this guide: [Migrating from Windows GUI installation to a Docker CLI](migrating-from-windows-gui-installation-to-a-docker-cli.md).
{% endtab %}

{% tab title="Linux" %}
Your default identity folder is located in: `~/.local/share/storj/identity/storagenode`

Your default orders folder is located in the data location.

[Migrating with rsync](./#migrating-with-rsync)
{% endtab %}

{% tab title="ARM-based OS" %}
On Raspberry Pi, by default your identity folder is located in _(the path may be different for other ARM platforms)_: `/home/pi/.local/share/storj/identity/storagenode`

Your default orders folder is located in the data location.

[Migrating with rsync](./#migrating-with-rsync)
{% endtab %}

{% tab title="macOS" %}
Your default identity folder is located in: `"/Users/USER/Library/Application Support/Storj/identity/storagenode"`

Your default orders folder is located in the data location.

[Migrating with rsync](./#migrating-with-rsync)
{% endtab %}
{% endtabs %}

### Migrating with rsync

We will assume that your parameters look like this:

* the source folder where the existing identity is located is `/mnt/storj/identity/storagenode`;&#x20;
* the source folder where the existing stored data is located is `/mnt/storj/storagenode/storage`;
* the source folder where the existing orders folder is located is `/mnt/storj/storagenode/orders`;
* the destination folder the existing identity will be copied to is`/mnt/storj2/storagenode-new/identity`;
* the destination folder the existing stored data will be copied to is `/mnt/storj2/storagenode-new/storage`.
* the destination folder the existing orders will be copied to is `/mnt/storj2/storagenode-new/orders`.

To migrate your identity, orders and data to the new location, you can use the `rsync` command (please, replace the example paths mentioned above to your own!):

1. Open a new terminal
2. Keep your original storage node running
3. Copy the identity:

```
rsync -aP /mnt/storj/identity/storagenode/ /mnt/storj2/storagenode-new/identity/
```

4\. Copy the orders

```
rsync -aP /mnt/storj/storagenode/orders/ /mnt/storj2/storagenode-new/orders/
```

5\. Copy the data

```
rsync -aP /mnt/storj/storagenode/storage/ /mnt/storj2/storagenode-new/storage/
```

6\. Repeat running the orders (step 4.) and data copying command (step 5.) a few more times until the difference would be negligible, then

7\. Stop the storage node (see [How do I shutdown my node for system maintenance?](../system-maintenance.md))

8\. Remove the old container

```
docker rm storagenode
```

9\. Run the copying command with a `--delete` parameter to remove deleted files from the destination:

```
rsync -aP --delete /mnt/storj/storagenode/orders/ /mnt/storj2/storagenode-new/orders/
```

```
rsync -aP --delete /mnt/storj/storagenode/storage/ /mnt/storj2/storagenode-new/storage/
```

10\. Now you can copy `config.yaml` file and `revocation.db` to the new location:

```
cp /mnt/storj/storagenode/config.yaml /mnt/storj2/storagenode-new/
cp /mnt/storj/storagenode/revocation.db /mnt/storj2/storagenode-new/revocation.db
```

11\. After you copied over all the necessary files, update your `--mount` parameters in your [docker run command](../../../setup/cli/storage-node.md#running-the-storage-node). For our example, it will look like this (we only show a partial example of the new`--mount` parameter lines, not the entire `docker run` command!):

```
--mount type=bind,source=/mnt/storj2/storagenode-new/identity,destination=/app/identity \
--mount type=bind,source=/mnt/storj2/storagenode-new,destination=/app/config \
```

{% hint style="danger" %}
The network-attached storage location could work, but it is neither supported nor recommended!
{% endhint %}

{% hint style="warning" %}
Please, note - we intentionally specified`/mnt/storj2/storagenode-new` as the data source in the `--mount` parameter and not `/mnt/storj2/storagenode-new/storage` because the `storagenode` docker container will add a subfolder called`storage` to the path automatically. So please, make sure that your data folder contains a `storage` subfolder with all the data inside (`blobs` folder, database files, etc.), otherwise the node will start from scratch since it can't find the data in the right subfolder and will be disqualified in a few hours.
{% endhint %}
