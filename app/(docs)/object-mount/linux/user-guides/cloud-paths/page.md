---
title: Cloud Path Details
hideTitle: false
docId: jieteeYeyievui9k
weight: 5
redirects:
  - /object-mount/linux/user-guides/access
metadata:
  title: Cloud Path Details
  description: Cloud Paths Guide
hidden: false
---

When using Object Mount for linux from the Object Mount CLI

## Specifying Cloud Paths

When accessing cloud-based, object storage volumes using the Object Mount CLI, there are two primary ways of interacting with the remote files and directories:

- The URI format, e.g.: `s3://my-bucket/dir/file.txt`
- The directory format, e.g.: `/cuno/s3/my-bucket/dir/file.txt`

### URI Format

The following table describes **URI prefixes** for supported cloud providers:

| **Cloud Provider**   | **URI Format**                         |
|----------------------|----------------------------------------|
| AWS S3               | `s3://<bucket_name>`                   |
| Storj                | `s3://<bucket_name>`                   |
| Google Cloud Storage | `gs://<bucket_name>`                   |
| Azure Blob Storage   | `az://<account_name>/<container_name>` |
| Other S3 Compatible  | `s3://<bucket_name>`                   |

### Directory Format

The following table describes **directory format** for supported cloud providers:

| **Cloud Provider**   | **Directory Format**                       |
|----------------------|--------------------------------------------|
| AWS S3               | `/cuno/s3/<bucket_name>`                   |
| Storj                | `/cuno/s3/<bucket_name>`                   |
| Google Cloud Storage | `/cuno/gs/<bucket_name>`                   |
| Azure Blob Storage   | `/cuno/az/<account_name>/<container_name>` |
| Other S3 Compatible  | `/cuno/s3/<bucket_name>`                   |

{% callout type="warning" %}
  **URI Format Support**

  Some software tools cannot process the URI format. Use the directory format instead in such cases.
{% /callout %}

### Examples

Some examples of using Object Mount are given below:

1. List the contents of a remote container `my-bucket` on AWS S3:

    ```sh
    (cuno) $ ls s3://my-bucket
    ```

    or

    ```sh
    (cuno) $ ls /cuno/s3/my-bucket
    ```

2. Move a text file `sample.txt` from the local filesystem to a remote Google Cloud Storage container `my-bucket`:

    ```sh
    (cuno) $ mv ./sample.txt gs://my-bucket/dir/sample.txt
    ```

    or

    ```sh
    (cuno) $ mv ./sample.txt /cuno/gs/my-bucket/dir/sample.txt
    ```

3. List the contents of a subdirectory `dir` in a remote Google Cloud Storage container `my-bucket`:

    ```sh
    (cuno) $ ls gs://my-bucket/dir
    ```

    or

    ```sh
    (cuno) $ ls /cuno/gs/my-bucket/dir
    ```

4. Use UNIX coreutils (e.g. `head`) on a remote file `sample.txt` on AWS S3:

    ```sh
    (cuno) $ head s3://my-bucket/dir/sample.txt
    ```


## Microsoft Azure Blob Storage Usage

When using Microsoft’s Azure Storage, the associated **Account Name** must be included in both the URI and directory format:

```sh
(cuno) $ ls az://my-account-name/my-container
```

or:

```sh
(cuno) $ ls /cuno/az/my-account-name/my-container
```


## AWS S3 Access Point Support

Object Mount supports using an **AWS S3 Access Point** instead of a bucket as an endpoint. 

Access Points are unique addresses that customers can create to enforce distinct permissions and network controls for requests made through that Access Point.

To use an Access Point instead of a container, provide the full **Amazon Resource Name (ARN)** in place of the bucket name:

```
s3://arn:aws:s3:us-east-1:999999999999:accesspoint:my-access-point-name
```

This applies to all places a container can be specified, such as within `cuno creds` or console commands:

```sh
(cuno) $ cuno creds -i pair s3://arn:aws:s3:us-east-1:999999999999:accesspoint:my-access-point-name
(cuno) $ ls s3://arn:aws:s3:us-east-1:999999999999:accesspoint:my-access-point-name/<remote-path>
(cuno) $ ls /cuno/s3/arn:aws:s3:us-east-1:999999999999:accesspoint:my-access-point-name/<remote-path>
```


## File System Behaviors When Using Object Mount

### Symbolic Links

WHen not using POSIX Mode, symbolic links can **only** be created (via `ln --symbolic` or `ln -s`) to point **from** a local system **to** a cloud location. Either URI or directory format can be used.

### Hard Links and Server-Side Copy

Conversely, hard links **cannot** be created from the local system to a remote cloud location.

Use hard-linking to trigger a more efficient cloud-only copy mechanism within a cloud region.

`mv` or `cp` within a single cloud vendor will trigger a **server-side copy**, which is more efficient than a download followed by an upload.

### POSIX Mode

**Symbolic links** can be created (via `ln --symbolic` or `ln -s`) between local and cloud objects in **either direction** when POSIX mode in enabled. 

**Hard links** can be created (using `ln`) between cloud objects in the `same` bucket when POSIX mode in enabled.

See the Getting Started Guide article [POSIX File Access](docId:cbm3PcQXmLpuYcbg#posix-file-access) for more details.

{% callout type="warning" %}
  **HardLinks and SymLink on File Deletion**

  If the target file/object is deleted or moved, both symbolic and hard links will break.
{% /callout %}

### File Metadata

`ls --long` (or `ls -l`) will list **the current user** as the owner of the remote objects, and the permissions will be `777`.

The creation date of a remote directory is not always available to system calls.

### Performance Optimizations

Object Mount uses multiple concurrent connections to remote objects to achieve the highest performance.

It can also execute operations on objects entirely remotely where possible.

Some optimized operations provided by Object Mount are listed below:

  - `mv` commands between locations **within the same object storage provider** will invoke a server-side remote-copy operation to avoid streaming through the client.
  - `ln` hard links between locations **within the same object storage provider** will invoke a server-side remote-copy operation to avoid streaming through the client.
  - Hard links between objects **in the same bucket** will work like local hard links when POSIX mode in enabled.
