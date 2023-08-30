---
title: Rclone Native Integration
docId: Mk51zylAE6xmqP7jUYAuX
redirects:
  - /dcs/how-tos/sync-files-with-rclone/rclone-with-native-integration
metadata:
  title: Configure Rclone Natively
  description:
    Guide on how to natively configure Rclone with Storj for optimal download
    performance and client-side encryption. Explains the setup process including configuration
    and authentication.
---

## Selecting an Integration Pattern

Use our native integration pattern to take advantage of client-side encryption as well as to achieve the best possible download performance. Uploads will be erasure-coded locally, thus a 1GB upload will result in 2.68GB of data being uploaded to storage nodes across the network.

## Use this pattern for

- The strongest security

- The best download speeds

## Setup

First, [Download](https://rclone.org/downloads/) and extract the rclone binary onto your system.

Execute the config command:

```bash
rclone config
```

A text-based menu will prompt. Type `n` and hit `Enter` to create a new remote configuration.

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

Enter a name for the new remote configuration, e.g., `waterbear`.

```Text
name> waterbear
Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
```

A long list of supported storage backends will prompt. Enter `storj` and hit `Enter`.

```Text
Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
...
41 / Storj Decentralized Cloud Storage
   \ (storj)
...
Storage> storj
```

Choose your authentication method: existing access grant or new access grant from [](docId:OXSINcFRuVMBacPvswwNU) (access token).

```Text
Storage> storj
Option provider.
Choose an authentication method.
Choose a number from below, or type in your own string value.
Press Enter for the default (existing).
 1 / Use an existing access grant.
   \ (existing)
 2 / Create a new access grant from satellite address, API key, and passphrase.
   \ (new)
provider>
```

If you selected to authenticate with an existing access grant, enter the serialized access grant you have received by someone else.

```Text
provider> 1
Option access_grant.
Access grant.
Enter a value. Press Enter to leave empty.
access_grant> 1cC...
--------------------
[waterbear]
type = storj
access_grant = 1cC...
--------------------
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d>
```

If you selected to authenticate with a new access grant, first enter the satellite address by selecting one from the list or enter the address of a 3rd-party satellite.

```Text
provider> 2
Option satellite_address.
Satellite address.
Custom satellite address should match the format: `<nodeid>@<address>:<port>`.
Choose a number from below, or type in your own string value.
Press Enter for the default (us-central-1.storj.io).
 1 / US Central 1
   \ (us-central-1.storj.io)
 2 / Europe West 1
   \ (europe-west-1.storj.io)
 3 / Asia East 1
   \ (asia-east-1.storj.io)
satellite_address>
```

{% callout type="info"  %}
If you enter a 3rd-party satellite, the address must also include the node ID of the satellite. This is required to establish a secure connection with the satellite.
{% /callout %}

The second step of creating a new access grant is to enter your generated [](docId:OXSINcFRuVMBacPvswwNU).

```Text
Option api_key.
API key.
Enter a value. Press Enter to leave empty.
api_key> 1Cjfjf...
```

The final step of creating a new access grant is to enter your encryption passphrase.

```Text
Option passphrase.
Encryption passphrase.
To access existing objects enter passphrase used for uploading.
Enter a value. Press Enter to leave empty.
passphrase> your-secret-encryption-phrase
```

{% callout type="info"  %}
The passphrase is used for encrypting and decrypting the data stored on Storj DCS (formerly known as Tardigrade). If you have any data previously uploaded to this project, you must enter the same passphrase in order to download it successfully.
{% /callout %}

A summary of the remote configuration will prompt. Type `y`and hit `Enter` to confirm it.

```Text
[waterbear]
type = storj
satellite_address = 121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6@asia-east-1.tardigrade.io:7777
api_key = 1Cjfjf...
passphrase = your-secret-encryption-phrase
access_grant = 1E1F...
--------------------
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y
```

Now you should see one remote configuration available. Enter `q` and hit `Enter` to quit the configuration wizard.

```Text
Current remotes:

Name                 Type
====                 ====
waterbear            storj

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
```

{% callout type="info"  %}
For additional security, you should consider using the (s) option

`Set configuration password` option. It will encrypt the `rclone.conf` configuration file. This way secrets like the [](docId:OXSINcFRuVMBacPvswwNU) (access token), the encryption passphrase, and the access grant won't be stolen if an attacker get access to your configuration file.
{% /callout %}

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

{% callout type="info"  %}
Note the colon (`:`) character at the end of the command line.&#x20;
{% /callout %}

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

{% callout type="info"  %}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
{% /callout %}

Use a folder in the local path to upload all its objects.

```yaml
rclone copy --progress ~/Videos/ waterbear:mybucket/videos/
```

{% callout type="info"  %}
Only modified files will be copied.
{% /callout %}

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

{% callout type="info"  %}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
{% /callout %}

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

{% callout type="info"  %}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
{% /callout %}

{% callout type="info"  %}
Since this can cause data loss, test first with the `--dry-run` flag to see exactly what would be copied and deleted.
{% /callout %}

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
