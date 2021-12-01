---
description: Using the S3 compatible hosted gateway
---

# Rclone with Hosted Gateway

## Selecting an Integration Pattern

Use our S3 compatible Hosted Gateway integration pattern to increase upload performance and reduce the load on your systems and network. Uploads will be encrypted and erasure-coded server-side, thus a 1GB upload will result in only in 1GB of data being uploaded to storage nodes across the network.

### Use this pattern for

* Reduced upload time
* Reduction in network load

{% hint style="info" %}
By selecting this integration pattern you are opting in to [server-side encryption](../../concepts/encryption-key/design-decision-server-side-encryption.md)
{% endhint %}

## Prerequisites

### Generate Credentials to the Gateway MT

**Navigate to the Access** page within your project and then click on **Create Access Grant +**. A modal window will pop up and you can enter a name for this access grant.

![](<../../.gitbook/assets/image (152).png>)

![](<../../.gitbook/assets/image (156).png>)

**Assign the permissions** you want this access grant to have, then click on **Continue in Browser**:

![](<../../.gitbook/assets/image (181).png>)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase. (The GUI automatically generates one on the client-side for you)

![](<../../.gitbook/assets/image (157).png>)

**Click on the Generate S3 Gateway Credentials** link **** and then click on the 'Generate Credentials' button.&#x20;

![](<../../.gitbook/assets/image (164).png>)

![](<../../.gitbook/assets/image (137).png>)

**Copy your Access Key, Secret Key, and Endpoint** to a safe location.&#x20;

![](<../../.gitbook/assets/image (160).png>)

Now you are ready to **configure** Rclone

## Setup

First, [Download](https://rclone.org/downloads/) and extract the rclone binary onto your system.

Execute the config command:

```bash
rclone config
```

A text-based menu will prompt. Type `n` and hit `Enter` to create a new remote configuration, select n (New Remote).

```
e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q>
```

`Enter a name` for the new remote configuration, e.g. `waterbear`.

```yaml
waterbear
```

A long list of supported storage backends will prompt. `Select` 4 (4 / Amazon S3 Compliant Storage Provider)  and hit `Enter`.

```yaml
4 / Amazon S3 Compliant Storage Provider
```

A further list of S3 storage providers will prompt. `Select` 13 (13 / Any other S3 compatible provider) and hit `Enter`.

```yaml
13 (13 / Any other S3 compatible provider)
```

A choice will be given on how you will enter credentials. `Strike Enter` for the default choice of 1 (Enter AWS credentials in the next step).

```yaml
1 / Enter AWS credentials in the next step
```

You will be asked for your Access Key ID followed by the Secret Access Key that you previously generated, follow the pattern in the code block below.

```yaml
# AWS Access Key ID
# Enter your <AccessKeyId>
<AccessKeyId>
Strike Enter

# AWS Secret Access Key
# Enter your <SecretAccessKeyId>
<SecretAccessKeyId>
Strike Enter
```

You will be asked for what Region to connect to, Endpoint, and Location Constraint.

```yaml
# Region to connect to
Strike enter for default 
# (1 / Use this if unsure. Will use v4 signatures and an empty region)

# Endpoint for S3 API
# Enter the Storj DCS Gateway URL
https://gateway.storj.io
Strike Enter

# Location Constraint
Strike enter for default 
# ("")
```

A list of Canned Access Control Lists used when creating buckets will be presented.

```yaml
# Canned ACL used when creating buckets and storing or copying objects
# Select your prefured option, otherwise strike enter for the most secure default
Strike enter for default or enter your prefured number followd by enter
```

You will be asked if you want to edit the advanced config.

```yaml
# Edit Advanced Config? (y/n)
Strike enter for default
# y) Yes
# n) No (Default)
y/n> y
# Value "bucket_acl" = ""
# Edit? (y/n)>
# y) Yes
# n) No (Default)
Strike enter for default until reach the "chunk_size"
# Value "chunk_size" = "5M"
# Edit? (y/n)>
# y) Yes
# n) No (default)
y/n> y
# Chunk size to use for uploading.
#
# When uploading files larger than upload_cutoff or files with unknown
# size (e.g. from "rclone rcat" or uploaded with "rclone mount" or google
# photos or google docs) they will be uploaded as multipart uploads
# using this chunk size.
#
# Note that "--s3-upload-concurrency" chunks of this size are buffered
# in memory per transfer.
#
# If you are transferring large files over high-speed links and you have
# enough memory, then increasing this will speed up the transfers.
# 
# Rclone will automatically increase the chunk size when uploading a
# large file of known size to stay below the 10,000 chunks limit.
#
# Files of unknown size are uploaded with the configured
# chunk_size. Since the default chunk size is 5MB and there can be at
# most 10,000 chunks, this means that by default the maximum size of
# a file you can stream upload is 48GB.  If you wish to stream upload
# larger files then you will need to increase chunk_size.
# Enter a size with suffix k,M,G,T. Press Enter for the default ("5M").
chunk_size> 64M
Hit enter for default until end of advanced configuration
```

A summary of the remote configuration will prompt. Type `y`and hit `Enter` to confirm.

```yaml
[waterbear]
type = s3
provider = Other
env_auth = false
access_key_id = <AccessKey>
secret_access_key = <SecretAccessKey>
endpoint = https://gateway.storj.io
chunk_size = 64M
--------------------
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d>
```

Now you should see one remote configuration available. Enter `q` and hit `Enter` to quit the configuration wizard.

```yaml
Current remotes:

Name                 Type
====                 ====
waterbear            s3
```

{% hint style="info" %}
For additional security, you should consider using the `s) Set configuration password` option. It will encrypt the `rclone.conf` configuration file. This way secrets like the [access token](../../getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md), the encryption passphrase, and the access grant can't be stolen if an attacker gains access to your configuration file.
{% endhint %}

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

{% hint style="info" %}
Note the colon (`:`) character at the end of the command line.
{% endhint %}

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

{% hint style="info" %}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
{% endhint %}

Use a folder in the local path to upload all its objects.

```yaml
rclone copy --progress ~/Videos/ waterbear:mybucket/videos/
```

{% hint style="info" %}
Only modified files will be copied.
{% endhint %}

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

{% hint style="info" %}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
{% endhint %}

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

{% hint style="info" %}
The `--progress` flag is for displaying progress information. Remove it if you don't need this information.
{% endhint %}

{% hint style="info" %}
Since this can cause data loss, test first with the `--dry-run` flag to see exactly what would be copied and deleted.
{% endhint %}

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
