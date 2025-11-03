---
title: Object Mount Fusion
docId: duac8aixa9oPiw4u
weight: 7
metadata:
  title: Object Mount Fusion
  description: Getting started with Object Mount Fusion
---

## Overview
{% callout type="warning"  %}
Object Mount Fusion is currently in `BETA`. Your feedback via our 🌐 [help desk](https://supportdcs.storj.io/hc/en-us/requests/new) will help us improve it.
{% /callout %}

Object Mount Fusion is way to upgrade high-performance attached storage solutions like Amazon Elastic File System (EFS) with the throughput of object storage. 
It is a **cheaper** and **faster** solution compared to using EFS alone.

Object Mount Fusion takes an attached storage filesystem and an initially empty object storage bucket/directory and exposes a single interface for both. 
Object Mount Fusion will migrate files between object storage and local filesystem depending on where they are best for performance/cost.


{% callout type="note"  %}
This feature is available only to Professional and Enterprise Tier customers.
For licensing, please schedule a 🌐 [discovery call](https://www.storj.io/landing/get-in-touch).
{% /callout %}

## How it works

Object Mount Fusion combines both into a virtual mount or a FUSE mount. The files on object storage are represented as hidden links from the host filesystem to the object store. 
Unlike other solutions, the object store is a first-class high throughput tier, rather than a slow archival tier. 
Object Mount Fusion automatically migrates files between the two according to application behaviour on such files. 
New files may be written in either tier, depending on predicted and observed access properties. 
Object Mount Fusion supports multiple users simultaneously accessing files on multiple nodes by sharing the attached storage and mount location.


## Setting up Object Mount Fusion

Object Mount Fusion is expected to be used within the same high-speed LAN as your object storage. For example, if you use AWS S3, Object Mount Fusion should only be set up on EC2 nodes within the same 
[AWS Region](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) as the bucket to accessed. If you are using an S3-compatible on-premises object storage solution, 
then Object Mount Fusion should be set up on a computer on the same high-speed local network.

If you're already set up and using an attached storage system, such as EFS, you may skip ahead to [Mounting a Object Mount Fusion filesystem](#mounting-a-object-mount-fusion-filesystem).

### Set up an empty bucket or directory on object storage

For use as the object storage half of a running Object Mount Fusion mount, you will need a location on object storage that is empty. 
This will be used as the location that the Fusion filesystem will migrate data to when it's more suitably stored on object storage. 
This can either be an entirely empty bucket, or an empty directory on an existing bucket. This location must not be modified by anything but Object Mount Fusion filesystems.

{% tabs %}
{% tab label="AWS S3" %}
    For a new empty bucket, follow the instructions for [setting up a new bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html)
{% /tab %}
{% tab label="Microsoft Azure" %}
    For a new empty container, follow the instructions for [setting up a new storage container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container).
{% /tab %}
{% tab label="Google Cloud Storage" %}
    For a new empty bucket, follow the instructions for [setting up a new GCS bucket](https://cloud.google.com/storage/docs/creating-buckets).
{% /tab %}
{% tab label="S3-compatible" %}
    For a new empty bucket, follow your storage provider's instructions for setting up a new bucket.
{% /tab %}
{% /tabs %}


### Set up a new compute node

Object Mount Fusion needs to be set up on a compute node in the same LAN/region as the object storage bucket to be used.

You will also need to attach a high-speed file storage solution to the instance. If convenient or if this is not possible later, please do it while creating the new instance/image.

To set up a compute node in the same region as your bucket, follow the relevant steps:

{% tabs %}
{% tab label="AWS S3" %}
    Follow the guide [Tutorial: Get started with Amazon EC2 Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html).
{% /tab %}
{% tab label="Microsoft Azure" %}
    Follow the guide [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).
{% /tab %}
{% tab label="Google Cloud Storage" %}
    Follow the instructions for creating [Instance templates](https://cloud.google.com/compute/docs/instance-templates).
{% /tab %}
{% tab label="S3-compatible" %}
    Typically, you will need a computer connected to the same LAN as your object storage and your file storage device.
{% /tab %}
{% /tabs %}

### Attach a file storage device

You will need an empty directory on your attached file storage that is writable by your user. If don't have this set up already, follow the relevant steps to attach a writable storage device to your compute node:


{% tabs %}
{% tab label="AWS S3" %}
    Follow the guide [Getting started with Amazon Elastic File System (EFS)](https://docs.aws.amazon.com/efs/latest/ug/getting-started.html).
{% /tab %}
{% tab label="Microsoft Azure" %}
    Follow the documentation to [Use the portal to attach a data disk to a linux VM](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/attach-disk-portal).
    Follow the Microsoft documentation for [setting up Azure Files](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction).
{% /tab %}
{% tab label="Google Cloud Storage" %}
    Use the information available on the [Storage options](https://cloud.google.com/compute/docs/disks) to choose an appropriate attached disk option. Then, attach your instance to it using the relevant guide.
    Follow the instructions for [setting up Filestore](https://cloud.google.com/filestore/docs/install)
{% /tab %}
{% tab label="S3-compatible" %}
    You can use local storage, or attach an NFS/SMB mount to a file storage device in the same LAN.
{% /tab %}
{% /tabs %}

## Mounting a Object Mount Fusion filesystem

To set up Object Mount Fusion, you need Object Mount [installed](../getting-started/download-install) on the compute node, and you need to set up [credentials](../getting-started/configuring-credentials) so that the bucket/container is accessible.

Your next steps depend on the filesystem you are using and the options used when mounting/attaching it. Please see the relevant section below:
- [Filesystems without extended attribute support (e.g. EFS)](#filesystems-without-extended-attribute-support-e-g-efs)
- [Filesystems with extended attribute support (e.g. NFSv4 with Linux Kernel 5.9+)](#filesystems-without-extended-attribute-support-e-g-efs)

### Filesystems without extended attribute support (e.g. EFS)

Object Mount Fusion is set up and accessed through a Object Mount on FUSE. To do this, additional options must be passed to `cuno mount` when it is run. You will need to use the `--fusion` option to specify the path to the attached storage backing directory, and the `--root` option to specify the path to the object storage:

```sh
cuno mount \
    --fusion "<path to attached-storage backing directory>" \
    --root "<path to object storage backing directory>" \
    "<mount location>"
```

Example: `cuno mount --fusion /dev/sdf/fusion-store --root s3://bucket/fusion-store $HOME/my-fusion-filesystem`

By running the above command, the `<mount location>` becomes the way to access the Fusion filesystem. All operations, workflows, pipelines, etc. should therefore be pointed to `<mount location>`.

#### cuno mount options relevant to Object Mount Fusion
| Argument/Option | Description | Example |
| ----------- | ----------- | ----------- |
| ``<mount location>`` | The location from which the Fusion filesystem will be accessed. | ``$HOME/my-fusion-filesystem`` |
| ``--fusion "<path to attached storage backing directory>"`` | Enables Fusion for this mount, and sets it to use the location specified to store file-storage data. This is where files that are migrated off the object store into local storage go. This can happen when access patterns suggest the file would benefit from higher IOPS, or when a file doesn't meet the minimum size or age thresholds. | ``/dev/sdf/fusion-store`` |
| ``--root "<path to object storage backing directory>"`` | Sets the object storage location to be used as the place to store data that is better suited to be stored on object storage rather than on the file storage. | ``/cuno/s3/bucket/fusion-store`` |
| ``--fusion-size-threshold <size: default 10M>`` (optional) | Defines the minimum size that a file needs to be for it to be migrated from file storage to object storage. The argument value is of the form ``<INTEGER>[UNIT]``. If no unit is given, the value is assumed to be in *bytes*. Valid units are ``K`` (Kilobytes), ``M`` (Megabytes), ``G`` (Gigabytes), ``T`` (Terabytes). | |
| ``--fusion-age-threshold <age: default 1h>`` (optional) | Defines the minimum age requirement for files to be considered for migration from file storage to object storage. The age is measured as the time since the most recent of the POSIX creation time, modify time, access time, and change time - in other words, the time since each of these must be greater than the set threshold. The argument value is of the form  ``<INTEGER>[UNIT]``. If no unit is given, the value is assumed to be in seconds. Valid units are ``s`` (seconds), ``m`` (minutes), ``h`` (hours), ``d`` (days). | |

{% tabs %}
{% tab label="AWS S3" %}
If the bucket is not empty, create a new empty directory on your bucket:

```shell
#terminal
cuno run mkdir "/cuno/s3/<bucket>/fusion-store"
```

Create a directory on the attached-storage device (assuming you've mounted it at ``/dev/sdf``) to use for this purpose: 

```shell
#terminal
mkdir "/dev/sdf/fusion-store"
```

Create the Object Mount Fusion mount:

```shell
#terminal
cuno mount --fusion "/dev/sdf/fusion-store" --root "/cuno/s3/<bucket>/fusion-store" "~/my-fusion-filesystem"
```
{% /tab %}
{% tab label="Microsoft Azure" %}
If the bucket is not empty, create a new empty directory on your bucket:

```shell
#terminal
cuno run mkdir "/cuno/az/<account-name>/<bucket>/fusion-store"
```

Create a directory on the attached-storage device (assuming you've mounted it at ``/mnt/fast``) to use for this purpose:

```shell
#terminal
mkdir "/mnt/fast/fusion-store"
```

Create the Object Mount Fusion mount:

```shell
#terminal
cuno mount --fusion "/mnt/fast/fusion-store" --root "/cuno/az/<account-name>/<bucket>/fusion-store" "~/my-fusion-filesystem"
```
{% /tab %}
{% tab label="Google Cloud Storage" %}
If the bucket is not empty, create a new empty directory on your bucket:

```shell
#terminal
cuno run mkdir "/cuno/gs/<bucket>/fusion-store"
```

Create a directory on the attached-storage device (assuming you've mounted it at ``/mnt/fast``) to use for this purpose:

```shell
#terminal
mkdir "/mnt/fast/fusion-store"
```

Create the Object Mount Fusion mount:

```shell
#terminal
cuno mount --fusion "/mnt/fast/fusion-store" --root "/cuno/gs/<bucket>/fusion-store" "~/my-fusion-filesystem"
```
{% /tab %}
{% tab label="S3-compatible" %}
If the bucket is not empty, create a new empty directory on your bucket:

```shell
#terminal
cuno run mkdir "/cuno/s3/<bucket>/fusion-store"
```

Create a directory on the attached-storage device (assuming you've mounted it at ``/mnt/fast``) to use for this purpose:

```shell
#terminal
mkdir "/mnt/fast/fusion-store"
```

Create the Object Mount Fusion mount:

```shell
#terminal
cuno mount --fusion "/mnt/fast/fusion-store" --root "/cuno/s3/<bucket>/fusion-store" "~/my-fusion-filesystem"
```
{% /tab %}
{% /tabs %}


### Filesystems with extended attribute support (e.g. NFSv4 with Linux Kernel 5.9+)

When using a filesystem that supports extended attributes please "bind" it to a cloud location first as this does additional error checking and makes for a simpler mount/unmount procedure.

#### Bind a directory to a cloud location

To bind a local Fusion directory to a cloud location, use `cuno fusion`.
This command will make a note locally of where the mount we make later will point to.
It will also save any relevant options used at this stage as metadata, to be used by default by any mounts that use this fusion binding.

```shell
#terminal
cuno fusion "<path to attached storage backing directory>" "<path to object storage backing directory>"
```

Example: `cuno fusion /dev/sdf/fusion-store s3://bucket/fusion-store`

#### cuno fusion arguments
| Argument | Description |
| ----------- | ----------- |
| ``<path to attached storage backing directory>`` | Sets the location specified as the place to store file-storage data. This is where files that are migrated off the object store into local storage go. This can happen when access patterns suggest the file would benefit from higher IOPS, or when a file doesn't meet the minimum size or age thresholds. |
| ``<path to object storage backing directory>`` | Text |


#### cuno fusion options
| Option | Description |
| ----------- | ----------- |
| ``--fusion-size-threshold <size: default 10M>`` (optional) | Define the minimum size that a file needs to be for it to be migrated from file storage to object storage. The argument value is of the form ``<INTEGER>[UNIT]``. If no unit is given, the value is assumed to be in *bytes*. Valid units are ``K`` (Kilobytes), ``M`` (Megabytes), ``G`` (Gigabytes), ``T`` (Terabytes). |
| ``--fusion-age-threshold <age: default 1h>`` (optional) | Defines the minimum age requirement for files to be considered for migration from file storage to object storage. The age is measured as the time since the most recent of the POSIX creation time, modify time, access time, and change time - in other words, the time since each of these must be greater than the set threshold. The argument value is of the form  ``<INTEGER>[UNIT]``. If no unit is given, the value is assumed to be in seconds. Valid units are ``s`` (seconds), ``m`` (minutes), ``h`` (hours), ``d`` (days). |


#### cuno fusion subcommands
| Subcommand | Description |
| ----------- | ----------- |
| ``cuno fusion bind <local> <cloud>`` | Bind a local directory to a cloud directory. |
| ``cuno fusion unbind <local>`` | Unbind a local directory from a cloud directory. |
| ``cuno fusion rebind <local> <cloud>`` | Rebind a local directory to a cloud directory. |
| ``cuno fusion info <local>`` | Get information about the binding at the location. |


#### Mount the Object Mount Fusion filesystem after binding

Object Mount Fusion is set up and accessed through a Object Mount on FUSE. To do this, additional options must be used when creating a [Object Mount on FUSE](../user-guides/basic#object-mount-on-fuse).

If you have already bound a directory to a cloud location, you only need to use the `--root` option to specify the path to the attached-storage backing directory in order to use the mount as a Fusion mount:

```shell
# terminal
cuno mount \
    --root "<path to attached-storage backing directory>" \
    "<mount location>"
```

#### cuno mount arguments/options relevant to Object Mount Fusion
| Argument | Description |
| ----------- | ----------- |
| ``<mount location>`` | The location from which the Fusion filesystem will be accessed. |
| ``--root "<path to bound attached-storage backing directory>"`` | Sets the path that the mount will look for a directory that has been set up for Object Mount Fusion. This means that you must previously have run ``cuno fusion`` with the same path, so that Fusion Mount can see which object storage path it is bound to. If your filesystem does not support extended attributes, you should use --root as specified. Example: ``/dev/sdf/fusion-store`` |


{% tabs %}
{% tab label="AWS S3" %}
    If the bucket is not empty, create a new empty directory on your bucket: 
```shell
# terminal
cuno run mkdir "s3://<bucket>/fusion-store"
```

    Create a directory on the attached-storage device (assuming you've mounted it at ``/dev/sdf``) to use for this purpose:
```shell
#terminal
mkdir "/dev/sdf/fusion-store"
```

    Create the Object Mount Fusion mount:
```shell
#terminal  
cuno fusion "/dev/sdf/fusion-store" "s3://<bucket>/fusion-store"
#terminal  
cuno mount --root "/dev/sdf/fusion-store" "$HOME/my-fusion-filesystem"
```
{% /tab %}
{% tab label="Microsoft Azure" %}
    If the bucket is not empty, create a new empty directory on your bucket:
```shell
#terminal
cuno run mkdir "az:///<account-name>/<bucket>/fusion-store"
```
Create a directory on the attached-storage device (assuming you've mounted it at ``/mnt/fast``) to use for this purpose:

```shell
#terminal
mkdir "/mnt/fast/fusion-store"
```

    Create the Object Mount Fusion mount:
```shell
#terminal  
cuno fusion "/mnt/fast/fusion-store" "az:///<account-name>/<bucket>/fusion-store"
#terminal  
cuno mount --root "/mnt/fast/fusion-store" "$HOME/my-fusion-filesystem"
```
{% /tab %}
{% tab label="Google Cloud Storage" %}
    If the bucket is not empty, create a new empty directory on your bucket:
```shell
#terminal
cuno run mkdir "gs:///<bucket>/fusion-store"
```

    Create a directory on the attached-storage device (assuming you've mounted it at ``/mnt/fast``) to use for this purpose:
```shell
#terminal
mkdir "/mnt/fast/fusion-store"
```

    Create the Object Mount Fusion mount:
    
```shell
#terminal  
cuno fusion "/mnt/fast/fusion-store" "gs:///<bucket>/fusion-store"
#terminal  
cuno mount --root "/mnt/fast/fusion-store" "$HOME/my-fusion-filesystem"
```
{% /tab %}
{% tab label="S3-compatible" %}
    If the bucket is not empty, create a new empty directory on your bucket:
```shell
#terminal
cuno run mkdir "s3://<bucket>/fusion-store"
```

    Create a directory on the attached-storage device (assuming you've mounted it at ``/mnt/fast``) to use for this purpose:
```shell
#terminal
mkdir "/mnt/fast/fusion-store" 
```
    Create the Object Mount Fusion mount:
```shell
#terminal    
cuno fusion "/mnt/fast/fusion-store" "s3://<bucket>/fusion-store"
#terminal
cuno mount --root "/mnt/fast/fusion-store" "$HOME/my-fusion-filesystem"
```
    
{% /tab %}
{% /tabs %}

For instructions on unmounting, see [user-guide-unmount](../user-guides/basic#object-mount-on-fuse-commands).

## Using the Object Mount Fusion filesystem

All operations, workflows, pipelines, etc. should be pointed to your mount location.

### Examples

The following examples assume you have mounted a Fusion filesystem at `$HOME/my-fusion-filesystem`.

- Download data from the web into the Fusion filesystem:

  ```shell
  #terminal
  cd $HOME/my-fusion-filesystem
  #terminal
  wget http://vision.stanford.edu/aditya86/ImageNetDogs/images.tar
  ```

- List the files in the Fusion filesystem:

  ```shell
  #terminal
  ls $HOME/my-fusion-filesystem/
  ```

- Unpack a tar archive:

  ```shell
  #terminal
  cd $HOME/my-fusion-filesystem
  #terminal
  tar -xf images.tar
  ```

### Testing

Check that access, modification and migration are working as expected. We recommend measuring cost differences, and the overall time taken for equivalent jobs run on attached storage alone.

NB: You can set the ``CUNO_DEBUG`` environment variable to ``trace``, or ``debug`` at the time of mounting.

Not seeing what you expect? Contact us at our 🌐 [help desk](https://supportdcs.storj.io/hc/en-us/requests/new).
