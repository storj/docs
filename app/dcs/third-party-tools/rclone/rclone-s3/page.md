---
title: Rclone additional commands
docId: WayQo-4CZXkITaHiGeQF_
redirects:
  - /dcs/how-tos/sync-files-with-rclone/rclone-with-hosted-gateway
metadata:
  title: Rclone with S3 Compatibility Guide
  description: Step-by-step guide to configure Rclone pointed to Storj's S3 compatible API, providing better upload performance and lower network load.
---

{% callout type="info"  %}
Follow the [Getting Started guide](docId:AsyYcUJFbO1JI8-Tu8tW3) to setup Rclone.
{% /callout %}

The follow are additional commands or options you can consider when using Rclone

## Configuration password

For additional security, you should consider using the `s) Set configuration password` option. It will encrypt the `rclone.conf` configuration file. This way secrets like the [](docId:OXSINcFRuVMBacPvswwNU), the encryption passphrase, and the access grant can't be easily stolen.

## Create a Bucket

Use the `mkdir` command to create new bucket, e.g., `mybucket`.

```yaml
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

The sync can also be done from Storj DCS to the local file system.

```bash
rclone sync --progress waterbear:mybucket/videos/ ~/Videos/
```

Or between two Storj DCS buckets.

```bash
rclone sync --progress waterbear-us:mybucket/videos/ waterbear-europe:mybucket/videos/
```

Or even between another cloud storage and Storj DCS.

```bash
rclone sync --progress s3:mybucket/videos/ waterbear:mybucket/videos/
```
