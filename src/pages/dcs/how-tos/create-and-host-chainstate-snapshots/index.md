---
title: Create and host Chainstate Snapshots
slug: how-tos/create-and-host-chainstate-snapshots
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-02-28T20:59:44.000Z
docId: 31PlH5QGjhv0HKIaLeU4t
---

Host snapshots at reduced cost when spinning up new node.

## Create Storj account

After [creating an account](https://www.storj.io/signup) on Storj DCS, you’ll need to setup the uplink cli.

## Setup uplink CLI

The uplink cli is a tool similar to aws cli that allows creation of buckets and uploading/downloading snapshots directly from the 15,000+ storage nodes. We also have an aws s3 compatible api as an alternative.

## Install uplink

Linux AMD64

```shell
curl -L https://github.com/storj/storj/releases/latest/download/uplink_linux_amd64.zip -o uplink_linux_amd64.zip
unzip -o uplink_linux_amd64.zip
sudo install uplink /usr/local/bin/uplink
```

For different uplink binaries see [](docId\:hFL-goCWqrQMJPcTN82NB)

## Create access grant and setup uplink

![Creating an access token in the Storj web console](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Eht5dlfTFplrWPyJxUHdi_screen-shot-2022-07-01-at-102352-am.png)

Click "Continue in CLI" after giving your access grant a name

:::hint{type="info"}
Keep the credential window open until you have completed the `uplink setup` command below
:::

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/faDJYPJEby6kdGKcDksq4_screen-shot-2022-07-01-at-103337-am.png)

Run `uplink setup` to start the credentials prompt&#x20;

```Text
uplink setup
```

Enter a name for the credential (default is "main")

Copy your "API Key" from the web console to the uplink cli "Enter API key or Access grant" prompt

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/4mOHJgqzt9R08zuY3CV6n_screen-shot-2022-07-01-at-104439-am.png)

Copy your "Satellite Address" from the web console to the uplink cli "Satellite address" prompt

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/JhvR4VSngd467LcZcyCFn_screen-shot-2022-07-01-at-104558-am.png)

Enter a passphrase to complete the setup

:::hint{type="info"}
Remember your **Passphrase** you will need it for future access of the data
:::

```Text
$ uplink setup
Enter name to import as [default: main]:
Enter API key or Access grant: <access grant>
Satellite address: <satellite address>
Passphrase:
```

## Create bucket

Create a bucket called `snapshots`

```Text
uplink mb sj://snapshots
```

## Upload snapshots

Compress small files/directories to a single compressed file (e.g use `tar`).&#x20;

```Text
tar cf snapshot.tar /path/to/snapshot
```

Use `uplink cp` to upload your snapshot to Storj DCS. Scale parallelism to at most 2x your thread count (16 threads = 32 parallelism)

```Text
uplink cp --parallelism 8 snapshot.tar sj://snapshots/snapshot.tar
```

## Create download access grant

For node operators in your community, you'll need to generate another access grant with limited permissions.

Create another access grant with the following limitations

1.  Check only 'Download'  (leave others deselected)

2.  Select `snapshots` as the bucket from the dropdown

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/2ie4QkrUL4spycgAYzVUy_screen-shot-2022-07-01-at-25604-pm-1.png)

Select "Continue in Browser"

Copy the access grant in file. You'll use it later in the template below.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/A0R9dXbDt5ZZcl8kusZNe_screen-shot-2022-07-01-at-30619-pm.png)

:::hint{type="warning"}
When populating the template, only publish the access grant that is limited to downloads. Do not use the access grant that was used to upload snapshots.
:::

Adapt the [Download blockchain snapshots template](https://github.com/storj/chainstate-snapshots/blob/main/download-chainstate-template.md), changing `<your_access_grant>` fields to the Download-only access grant. The commands from the template can be published to your communities.
