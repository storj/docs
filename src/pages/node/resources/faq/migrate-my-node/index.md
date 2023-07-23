---
title: How do I migrate my node to a new device?
slug: resources/faq/migrate-my-node
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-05-04T03:01:13.000Z
docId: jEntWNvi2M6Eo74NICIJg
---

To migrate your Node to a new drive or computer, you first need to copy both the contents of your storage folder, as well as your identity folder to the new location.

::::::tabs
:::::tab{label="Windows"}
Your default identity folder is located in: `%APPDATA%\Storj\Identity\storagenode`

Your default orders folder is located in `"%ProgramFiles%\Storj\Storage Node\orders"`



To migrate your Windows storage node you can follow this guide: [](docId\:NGHe10jmn-kdgzTf3FUz0) The only difference - you do not need to share folders, since they are available locally, just use the local paths.



Also, you can [enable WSL, install Ubuntu from the Microsoft store](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and use the [](docId\:jEntWNvi2M6Eo74NICIJg) guide. In this case your drives are mounted automatically. For example, `D:` disk will be mounted to the `/mnt/d`.



::::link-array
:::link-array-item{headerImage}
💻

[](docId\:PsB_5Yp43KeN0DszuE2DN)
:::

:::link-array-item{headerImage}
✍🏼

[](docId\:aKZt7A92CnGjPy1JY1YpF)&#x20;
:::
::::


:::::

:::tab{label="Linux"}
Your default identity folder is located in: `~/.local/share/storj/identity/storagenode`

Your default orders folder is located in the data location.

&#x20;[](docId\:jEntWNvi2M6Eo74NICIJg)
:::

:::tab{label="macOS"}
Your default identity folder is located in: `"/Users/USER/Library/Application Support/Storj/identity/storagenode"`

Your default orders folder is located in the data location.

[](docId\:jEntWNvi2M6Eo74NICIJg)
:::
::::::

## Migrating with rsync

We will assume that your parameters look like this:

*   the source folder where the existing identity is located is `/mnt/storj/identity/storagenode`;&#x20;

*   the source folder where the existing stored data is located is `/mnt/storj/storagenode/storage`;

*   the source folder where the existing orders folder is located is `/mnt/storj/storagenode/orders`;

*   the destination folder the existing identity will be copied to is`/mnt/storj2/storagenode-new/identity`;

*   the destination folder the existing stored data will be copied to is `/mnt/storj2/storagenode-new/storage`.

*   the destination folder the existing orders will be copied to is `/mnt/storj2/storagenode-new/orders`.

To migrate your identity, orders and data to the new location, you can use the `rsync` command (please, replace the example paths mentioned above to your own!):

1.  Open a new terminal

2.  Keep your original storage node running

3.  Copy the identity:

```shell
rsync -aP /mnt/storj/identity/storagenode/ /mnt/storj2/storagenode-new/identity/
```

4\. Copy the orders

```shell
rsync -aP /mnt/storj/storagenode/orders/ /mnt/storj2/storagenode-new/orders/
```

5\. Copy the data

```shell
rsync -aP /mnt/storj/storagenode/storage/ /mnt/storj2/storagenode-new/storage/
```

6\. Repeat running the orders (step 4.) and data copying command (step 5.) a few more times until the difference would be negligible, then

7\. Stop the storage node (see [](docId\:Zh_lD6UPciHT53wOWuAoD) )

8\. Remove the old container

```shell
docker rm storagenode
```

9\. Run the copying command with a `--delete` parameter to remove deleted files from the destination:

```shell
rsync -aP --delete /mnt/storj/storagenode/orders/ /mnt/storj2/storagenode-new/orders/
```

```shell
rsync -aP --delete /mnt/storj/storagenode/storage/ /mnt/storj2/storagenode-new/storage/
```

10\. Now you can copy `config.yaml` file and `revocation.db` to the new location:

```shell
cp /mnt/storj/storagenode/config.yaml /mnt/storj2/storagenode-new/
cp /mnt/storj/storagenode/revocation.db /mnt/storj2/storagenode-new/revocation.db
```

11\. After you copied over all the necessary files, update your `--mount` parameters in your[](docId\:HaDkV_0aWg9OJoBe53o-J). For our example, it will look like this (we only show a partial example of the new`--mount` parameter lines, not the entire `docker run` command!):

```shell
--mount type=bind,source=/mnt/storj2/storagenode-new/identity,destination=/app/identity \
--mount type=bind,source=/mnt/storj2/storagenode-new,destination=/app/config \
```

{% callout type="danger"  %} 
The network-attached storage location could work, but it is neither supported nor recommended!
{% /callout %}

{% callout type="warning"  %} 
Please, note - we intentionally specified`/mnt/storj2/storagenode-new` as the data source in the `--mount` parameter and not `/mnt/storj2/storagenode-new/storage` because the `storagenode` docker container will add a subfolder called`storage` to the path automatically. So please, make sure that your data folder contains a `storage` subfolder with all the data inside (`blobs` folder, database files, etc.), otherwise the node will start from scratch since it can't find the data in the right subfolder and will be disqualified in a few hours.
{% /callout %}

