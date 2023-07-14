---
title: Rclone Hosted Gateway
slug: how-tos/sync-files-with-rclone/rclone-with-hosted-gateway
createdAt: 2022-05-19T18:28:40.000Z
updatedAt: 2023-03-03T08:30:09.000Z
---

## Selecting an Integration Pattern

Use our S3-compatible Hosted Gateway integration pattern to increase upload performance and reduce the load on your systems and network. Uploads will be encrypted and erasure-coded server-side, thus a 1GB upload will result in only 1GB of data being uploaded from the client to the hosted gateway.

## Use this pattern for

*   Reduced upload time

*   Reduction in network load

:::hint{type="info"}
By selecting this integration pattern you are opting in to [Server-side Encryption](https://docs.storj.io/dcs/concepts/encryption-key/design-decision-server-side-encryption).
:::

## Prerequisites

### Generate Credentials to the Gateway MT

**Navigate to the Access** page within your project and then click on **Create S3 Credentials**. A modal window will pop up where you should enter a name for this access grant.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/U_P56dlNYzj-p7I4Ubsvj_rclone1.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/xTdExe6AA-ZbmJWOqNmSf_rclone2.png)

**Assign the permissions** you want this access grant to have, then click on **Encrypt My Access**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/m_NwIW3B7Rx5xOL1zRAwz_rclone3.png)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase. (The GUI automatically generates one on the client-side for you)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/JrZT5rCAHWkwTWMy-iJzE_rclone4.png)

:::hint{type="warning"}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!



Importantly, if you want two access grants to have access to the same data, **they must use the same passphrase**. You won’t be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.



Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
:::

Click either on the **Copy to clipboard** link or **Download .txt** and then confirm that you copied your Encryption Phrase to a safe place.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/1tsIfAbcVWQWViVWNSYF1_rclone5.png)

Click the **Create my Access** link to finish generating of S3 credentials.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/m4gl1YLwvpUBQ0DTu6mQe_rclone6.png)

Copy your **Access Key**, **Secret Key**, and **Endpoint** to a safe location or download them.

Now you are ready to **configure** Rclone

## Setup

First, [Download](https://rclone.org/downloads/) and extract the rclone binary onto your system.

Execute the config command:

```bash
rclone config
```

A text-based menu will prompt. Type `n` and hit `Enter` to create a new remote configuration, select n (New Remote).

```Text
e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> n
```

Enter a name for the new remote configuration, e.g. `waterbear`.

```none
name> waterbear
```

A long list of supported storage backends will prompt. Enter `s3` and hit `Enter`.

```none
Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
...
5 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, Ceph, China Mobile, Cloudflare, ArvanCloud, DigitalOcean, Dreamhost, Huawei OBS, IBM COS, IDrive e2, IONOS Cloud, Liara, Lyve Cloud, Minio, Netease, RackCorp, Scaleway, SeaweedFS, StackPath, Storj, Tencent COS, Qiniu and Wasabi
   \ (s3)
...
Storage> s3
```

A further list of S3 storage providers will prompt. Enter `Storj` and hit `Enter`.

```none
Option provider.
Choose your S3 provider.
Choose a number from below, or type in your own value.
Press Enter to leave empty.
...
21 / Storj (S3 Compatible Gateway)
   \ (Storj)
...
provider> Storj
```

A choice will be given on how you will enter credentials. Hit `Enter` for the default choice of `1 / Enter AWS credentials in the next step`.

```none
1 / Enter AWS credentials in the next step.
```

You will be asked for your Access Key ID followed by the Secret Access Key that you previously generated, follow the pattern in the code block below.

```none
Option access_key_id.
AWS Access Key ID.
Leave blank for anonymous access or runtime credentials.
Enter a value. Press Enter to leave empty.
access_key_id> your-access-key-id

Option secret_access_key.
AWS Secret Access Key (password).
Leave blank for anonymous access or runtime credentials.
Enter a value. Press Enter to leave empty.
secret_access_key> your-secret-access-key
```

You will be asked what Endpoint to connect to. Enter `1` to select the Global Hosted Gateway and hit `Enter`.

:::hint{type="warning"}
If you use an older Rclone release, you will see a list of regional gateway endpoints to select from. Ignore them and enter the global `gateway.storjshare.io` endpoint. Using the regional endpoints may cause performance issues.
:::

```dockerfile
Option endpoint.
Endpoint of the Shared Gateway.
Choose a number from below, or type in your own value.
Press Enter to leave empty.
 1 / Global Hosted Gateway
   \ (gateway.storjshare.io)
endpoint> 1
```

You will be asked if you want to edit the advanced config. Type `y` and hit `Enter`. Skip most of the questions by hitting `Enter`. The important ones to configure are `chunk_size` (64M) and `disable_checksum` (true).

```none
Edit advanced config?
y) Yes
n) No (default)
y/n> y
...
Option chunk_size.
Chunk size to use for uploading.
When uploading files larger than upload_cutoff or files with unknown
size (e.g. from "rclone rcat" or uploaded with "rclone mount" or google
photos or google docs) they will be uploaded as multipart uploads
using this chunk size.
...
Enter a size with suffix K,M,G,T. Press Enter for the default (5Mi).
chunk_size> 64M
...
Option disable_checksum.
Don't store MD5 checksum with object metadata.
Normally rclone will calculate the MD5 checksum of the input before
uploading it so it can add it to metadata on the object. This is great
for data integrity checking but can cause long delays for large files
to start uploading.
Enter a boolean value (true or false). Press Enter for the default (false).
disable_checksum> true
```

A summary of the remote configuration will prompt. Type `y`and hit `Enter` to confirm.

```none
[waterbear]
type = s3
provider = Storj
access_key_id = <AccessKey>
secret_access_key = <SecretAccessKey>
endpoint = gateway.storjshare.io
chunk_size = 64Mi
disable_checksum: true
---------------docId: WayQo-4CZXkITaHiGeQF_
-----
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y
```

Now you should see one remote configuration available. Enter `q` and hit `Enter` to quit the configuration wizard.

```none
Current remotes:

Name                 Type
====                 ====
waterbear            s3
```

:::hint{type="info"}
For additional security, you should consider using the `s) Set configuration password` option. It will encrypt the `rclone.conf` configuration file. This way secrets like the [](docId\:OXSINcFRuVMBacPvswwNU),  the encryption passphrase, and the access grant can't be stolen if an attacker gains access to your configuration file.
:::

## Create a Bucket

Use the `mkdir` command to create new bucket, e.g. `mybucket`.

```yaml
rclone mkdir waterbear:mybucket
```

## List All Buckets

Use the `lsf` command to list all buckets.

```yaml
rclone lsf waterbear:
```

:::hint{type="info"}
Note the colon (`:`) character at the end of the command line.
:::

## Delete a Bucket

Use the `rmdir` command to delete an empty bucket.

```yaml
rclone rmdir waterbear:mybucket
```

Use the `purge` command to delete a non-empty bucket with all its content.

```yaml
rclone purge waterbear:mybucket
```

## Upload Objects

Use the `copy` command to upload an object.

```yaml
rclone copy --progress ~/Videos/myvideo.mp4 waterbear:mybucket/videos/
```

:::hint{type="info"}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
:::

Use a folder in the local path to upload all its objects.

```yaml
rclone copy --progress ~/Videos/ waterbear:mybucket/videos/
```

:::hint{type="info"}
Only modified files will be copied.
:::

## List Objects

Use the `ls` command to list recursively all objects in a bucket.

```yaml
rclone ls waterbear:mybucket
```

Add the folder to the remote path to list recursively all objects in this folder.

```yaml
rclone ls waterbear:mybucket/videos/
```

Use the `lsf` command to list non-recursively all objects in a bucket or a folder.

```yaml
rclone lsf waterbear:mybucket/videos/
```

## Download Objects

Use the `copy` command to download an object.

```yaml
rclone copy --progress waterbear:mybucket/videos/myvideo.mp4 ~/Downloads/
```

:::hint{type="info"}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
:::

Use a folder in the remote path to download all its objects.

```yaml
rclone copy --progress waterbear:mybucket/videos/ ~/Downloads/
```

## Delete Objects

Use the `deletefile` command to delete a single object.

```yaml
rclone deletefile waterbear:mybucket/videos/myvideo.mp4
```

Use the `delete` command to delete all object in a folder.

```yaml
rclone delete waterbear:mybucket/videos/
```

## Print the Total Size of Objects

Use the `size` command to print the total size of objects in a bucket or a folder.

```yaml
rclone size waterbear:mybucket/videos/
```

## Sync Two Locations

Use the `sync` command to sync the source to the destination, changing the destination only. Doesn’t transfer unchanged files, testing by size and modification time or MD5SUM. Destination is updated to match source, including deleting files if necessary.

```yaml
rclone sync --progress ~/Videos/ waterbear:mybucket/videos/
```

:::hint{type="info"}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
:::

:::hint{type="info"}
Since this can cause data loss, test first with the `--dry-run` flag to see exactly what would be copied and deleted.
:::

The sync can be done also from Storj DCS to the local file system.

```yaml
rclone sync --progress waterbear:mybucket/videos/ ~/Videos/
```

Or between two Storj DCS buckets.

```yaml
rclone sync --progress waterbear-us:mybucket/videos/ waterbear-europe:mybucket/videos/
```

Or even between another cloud storage and Storj DCS.

```yaml
rclone sync --progress s3:mybucket/videos/ waterbear:mybucket/videos/
```

