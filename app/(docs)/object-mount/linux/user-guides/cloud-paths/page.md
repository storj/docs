---
title: Cloud Paths
hideTitle: false
docId: jieteeYeyievui9k
weight: 9   
redirects:
  - /object-mount/linux/user-guides/access
metadata:
  title: Cloud Paths
  description: Cloud Paths Guide
hidden: false
---
## Transparent access to object storage

Object Mount provides transparent access to remote cloud objects.
Users can continue using their favorite software tools, pipelines and filesystem commands without any modifications.
Object Mount offers virtual versions of the original files that are streamed in real-time.
Object Mount also supports random access reads and writes of any length, minimizing network bandwidth usage and processing time.

## Specifying cloud paths

There are two ways of interacting with the remote files and directories:

- the URI format, e.g. `s3://my-bucket/dir/file.txt`
- the directory format, e.g. `/cuno/s3/my-bucket/dir/file.txt`

The following table describes URI prefixes for supported cloud providers.

| Cloud provider       | URI format                                   |
| -------------------- | -------------------------------------------- |
| AWS S3               | `s3://<bucket_name>`                   |
| Google Cloud Storage | `gs://<bucket_name>`                   |
| Azure Blob Storage   | `az://<account_name>/<container_name>` |

{% callout type="warning"  %}
Some software tools cannot process the URI format.
Use the directory format instead in such cases.
{% /callout %}

### Examples

Some examples of using Object Mount are given below.

1. List the contents of a remote container `my-bucket` on AWS S3:

   ```console
   ls s3://my-bucket
   ```

   or

   ```console
   ls /cuno/s3/my-bucket
   ```

2. Move a text file `sample.txt` from the local filesystem to a remote Google Cloud Storage container `my-bucket`:

   ```console
   mv ./sample.txt gs://my-bucket/dir/sample.txt
   ```

   or

   ```console
   mv ./sample.txt /cuno/gs/my-bucket/dir/sample.txt
   ```

3. List the contents of a subdirectory `dir` in a remote Google Cloud Storage container `my-bucket`:

   ```console
   ls gs://my-bucket/dir
   ```

   or

   ```console
   ls /cuno/gs/my-bucket/dir
   ```

4. Use UNIX coreutils (e.g. `head`) on a remote file `sample.txt` on AWS S3:

   ```console
   head s3://my-bucket/dir/sample.txt
   ```

## Microsoft Azure Blob Storage usage

The associated Account Name must be provided in the corresponding URI:

```console
ls az://my-account-name/my-container
```

or, equally:

```console
ls /cuno/az/my-account-name/my-container
```

## AWS S3 Access Point support

Object Mount supports using an AWS S3 Access Point instead of a bucket as an endpoint. Access points are unique addresses that customers can create to enforce distinct permissions and network controls for any request made specifically through that access point.

To use an Access Point instead of a container, provide the full Amazon Resource Name (ARN) in place of the bucket name:

```
s3://arn:aws:s3:us-east-1:999999999999:accesspoint:my-access-point-name
```

This applies to all places a container can be specified, such as within `cuno creds`, or on the command line:

```console
$ cuno creds -i pair s3://arn:aws:s3:us-east-1:999999999999:accesspoint:my-access-point-name
$ ls s3://arn:aws:s3:us-east-1:999999999999:accesspoint:my-access-point-name/<remote-path>
```

## File system behaviours when using Object Mount

### Symbolic links

By default, symbolic links can `only` be created (using `ln --symbolic` or `ln -s`) to point `from` a local system `to` a cloud location using either the URI or directory format.

### Hard links and Server-side copy

Hard links cannot be created from the local system to a remote cloud location.

Use hard-linking to trigger a more efficient cloud-only copy mechanism within a cloud region.
`mv` or `cp` within a single cloud vendor will trigger a server-side copy, which is more efficient than a download and upload.

### POSIX mode

Symbolic links can be created (using `ln --symbolic` or `ln -s`) between local and cloud objects in either direction under POSIX mode (see [user-guide-object-mount-on-fuse](../user-guides/basic#object-mount-on-fuse)).

Hard links can be created (using `ln`) between cloud objects in the `same` bucket under POSIX mode.

{% callout type="warning"  %}
If the target is deleted or moved, then both symbolic and hard links will break.
{% /callout %}

### File metadata

`ls --long` (or `ls -l`) will list the current user as the owner of the remote objects, and the permissions will be `777`.
The creation date of a remote directory is not always available to system calls.

### Performance

Object Mount uses multiple concurrent connections to remote objects to achieve the highest performance.
It can also execute operations on objects entirely remotely where possible.
Some optimised operations are listed below.

- `mv` between locations within the same object storage provider uses remote-copy operations to avoid streaming through the client.
- `ln` hard links between locations within the same object storage provider use remote-copy operations to avoid streaming through the client.
  : Hard links between objects in the same bucket will work like local hard links when in POSIX mode.
