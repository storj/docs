---
title: Rclone Commands
docId: WayQo-4CZXkITaHiGeQF_
redirects:
  - /dcs/how-tos/sync-files-with-rclone/rclone-with-hosted-gateway
metadata:
  title: Rclone Command Guide
  description: Step-by-step guide to use Rclone with common commands.
---

{% callout type="info"  %}
Follow the [Getting Started guide](docId:AsyYcUJFbO1JI8-Tu8tW3) to setup Rclone.
{% /callout %}

The follow are additional commands and options you can consider when using Rclone.

## Configuration Password

For additional security, you should consider using the `s) Set configuration password` option. It will encrypt the `rclone.conf` configuration file. This way, secrets like the [](docId:OXSINcFRuVMBacPvswwNU), the encryption passphrase, and the access grant can't be easily stolen.

## Create a Bucket

Use the `mkdir` command to create new bucket, e.g., `mybucket`.

```bash
rclone mkdir waterbear:mybucket
```

## List All Buckets

Use the `lsf` command to list all buckets.

{% callout type="info"  %}
Note the colon (`:`) character at the end of the command line.
{% /callout %}

```bash
rclone lsf waterbear:
```

## Delete a Bucket

Use the `rmdir` command to delete an empty bucket.

```bash
rclone rmdir waterbear:mybucket
```

Use the `purge` command to delete a non-empty bucket with all its content.

```bash
rclone purge waterbear:mybucket
```

## Upload Objects

Use the `copy` command to upload an object.

```bash
rclone copy --progress ~/Videos/myvideo.mp4 waterbear:mybucket/videos/
```

{% callout type="info"  %}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
{% /callout %}

Use a folder in the local path to upload all its objects.

```bash
rclone copy --progress ~/Videos/ waterbear:mybucket/videos/
```

{% callout type="info"  %}
Only modified files will be copied.
{% /callout %}

## List Objects

Use the `ls` command to list recursively all objects in a bucket.

```bash
rclone ls waterbear:mybucket
```

Add the folder to the remote path to list recursively all objects in this folder.

```bash
rclone ls waterbear:mybucket/videos/
```

Use the `lsf` command to list non-recursively all objects in a bucket or a folder.

```bash
rclone lsf waterbear:mybucket/videos/
```

## Download Objects

Use the `copy` command to download an object.

{% callout type="info"  %}
The `--progress` flag is for displaying progress information.
{% /callout %}

{% callout type="info"  %}
Using `--disable-http2` with rclone for Storj is recommended for increased transfer speeds by avoiding HTTP/2 specific issues.
{% /callout %}

```bash
rclone copy --disable-http2 --progress waterbear:mybucket/videos/myvideo.mp4 ~/Downloads/
```

Use a folder in the remote path to download all its objects.

```bash
rclone copy --progress waterbear:mybucket/videos/ ~/Downloads/
```

## Delete Objects

Use the `deletefile` command to delete a single object.

```bash
rclone deletefile waterbear:mybucket/videos/myvideo.mp4
```

Use the `delete` command to delete all object in a folder.

```bash
rclone delete waterbear:mybucket/videos/
```

## Print the Total Size of Objects

Use the `size` command to print the total size of objects in a bucket or a folder.

```bash
rclone size waterbear:mybucket/videos/
```

## Sync Two Locations

Use the `sync` command to sync the source to the destination, changing the destination only. Doesn’t transfer unchanged files, testing by size and modification time or MD5SUM. Destination is updated to match source, including deleting files if necessary.

{% callout type="warning"  %}
Since this can cause data loss, test first with the `--dry-run` flag to see exactly what would be copied and deleted.
{% /callout %}

```bash
rclone sync --progress ~/Videos/ waterbear:mybucket/videos/
```

The sync can also be done from Storj to the local file system.

```bash
rclone sync --progress waterbear:mybucket/videos/ ~/Videos/
```

Or between two Storj buckets.

```bash
rclone sync --progress waterbear-us:mybucket/videos/ waterbear-europe:mybucket/videos/
```

Or even between another cloud storage (e.g., an AWS S3 connection names `s3`) and Storj.

```bash
rclone sync --progress s3:mybucket/videos/ waterbear:mybucket/videos/
```


## Mounting a Bucket

Use the `mount` command to mount a bucket to a folder (Mac, Windows and Linux) or as a disk drive (Windows). When mounted, you can use the bucket as a local folder (drive).
{% tabs %}
{% tab label="Windows" %}
```powershell
mkdir ~/mybucket
rclone mount waterbear:mybucket ~/mybucket --vfs-cache-mode full
```
{% /tab %}

{% tab label="Linux" %}

```bash
sudo mkdir /mnt/mybucket
sudo chown $USER: /mnt/mybucket
rclone mount waterbear:mybucket /mnt/mybucket --vfs-cache-mode full
```
{% /tab %}

{% tab label="macOS" %}
```shell
sudo mkdir /mnt/mybucket
sudo chown $USER: /mnt/mybucket
rclone mount waterbear:mybucket /mnt/mybucket --vfs-cache-mode full
```
{% /tab %}
{% /tabs %}
{% callout type="info"  %}
The `--vfs-cache-mode full` flag means that all reads and writes are cached to disk. Without it, reads and writes are done directly to the Storj bucket.
{% /callout %}

To unmount the bucket, use the `Ctrl-C` keystroke to stop rclone.
