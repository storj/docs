---
title: Object Mount Fusion
hideTitle: false
docId: GVT7eXEaMSZCWESj
weight: 4
metadata:
  title: Configuring Object Mount Fusion
  description:
    Details on the use and configuration of Object Mount Fusion for Linux.
hidden: false
---

{% callout type="warning" %}
  **Fusion Beta**

  Object Mount Fusion is currently in **Beta**. 
  
  Your feedback via our 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new) will help us improve it!
{% /callout %}


## Overview

**Object Mount Fusion** is designed to enhance local, LAN-based, high-performance, attached storage solutions (like Amazon’s Elastic File System, EFS) with the throughput of object storage. 

It is a **cheaper** and **faster** solution when compared to using EFS alone.

Object Mount Fusion takes an attached storage filesystem and an (initially) empty object storage bucket/directory and exposes a single interface for both. Object Mount Fusion will migrate files between the object storage location and the local filesystem location depending on their best fit for both performance and cost.


## How it Works

Object Mount Fusion combines both the **local** file storage and the **cloud** object storage into a single, virtual mount (a FUSE mount).

The files on object storage are represented as hidden links from the host filesystem to the object store. 

Unlike other solutions, Object Mount enables cloud-based object storage to be used as a first-class, high-throughput tier, rather than a traditional slow archival tier.

Object Mount Fusion automatically and dynamically migrates files between the two locations according to your application behavior and usage. New files may be written into either location depending on predicted and observed access properties. 

Object Mount Fusion supports multiple users, each simultaneously accessing files on multiple nodes, by combining and sharing the attached storage and mount locations.


## Setting up Object Mount Fusion

Object Mount Fusion should be used _within_ the same high-speed LAN as your object storage. 

For example: If you use AWS S3, Object Mount Fusion should _only_ be set up on EC2 nodes within the same 
[AWS Region](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) as the bucket to to be accessed. 

If you are using an S3-compatible on-premises object storage solution, Object Mount Fusion should be set up on a computer on the same high-speed local area network (LAN).

If you have already set up and are using an attached storage system (such as EFS), you may skip ahead to [Mounting a Object Mount Fusion filesystem](#mounting-a-object-mount-fusion-filesystem).

Otherwise, follow the steps below to configure Object Mount Fusion:

### Setup an Empty Bucket on Object Storage

To use the object storage location when running Object Mount Fusion mount, you will need a location on object storage that is **empty**.

This will be used as the location that the Fusion filesystem will dynamically migrate data to when it’s more suitably stored on object storage.

This can either be an **entirely empty bucket**, or an **empty directory** on an existing bucket. This location _must not_ be modified by anything but Object Mount Fusion’s filesystems.

Review the configuration steps below for your object storage provider:

{% tabs %}
{% tab label="AWS S3" %}
  **AWS S3**

  To create a new AWS empty bucket, follow the instructions for 🌐 [Creating a general purpose bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html).
{% /tab %}

{% tab label="Storj" %}
  **Storj**

  To create a new Storj empty bucket, follow the instructions to [Create buckets](docId:pxdnqsVDjCLZgeEXt2S6x).
{% /tab %}

{% tab label="Microsoft Azure" %}
  **Microsoft Azure**

  For a new empty container on Azure, follow the instructions to 🌐 [Create a container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container).
{% /tab %}

{% tab label="Google Cloud" %}
  **Google Cloud**

  For a new empty Google Cloud bucket, follow the instructions for 🌐 [Create a bucket](https://cloud.google.com/storage/docs/creating-buckets).
{% /tab %}

{% tab label="Other S3 Compatible" %}
  **Other S3 Compatible**

  For a new empty bucket, follow your storage provider’s instructions for setting up a new bucket.
{% /tab %}
{% /tabs %}

### Setup a New Compute Node

Object Mount Fusion needs to be set up on a compute node _within_ the same LAN/region as the object storage bucket to be used.

You will also need to attach a high-speed file storage solution to the instance. It is recommended to configure this while creating the new instance/image.

To set up a compute node in the same region as your bucket, follow the relevant steps below for your provider:

{% tabs %}
{% tab label="AWS S3" %}
  **AWS S3**

  Follow the AWS tutorial: 🌐 [Get started with Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html).
{% /tab %}

{% tab label="Storj" %}
  **Storj**

  Typically, you will need a physical or virtualized computer connected to the same LAN as both your object storage location and your file storage device.
{% /tab %}

{% tab label="Microsoft Azure" %}
  **Microsoft Azure**

  Follow the Azure Virtual Machine Guide: 🌐 [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).
{% /tab %}

{% tab label="Google Cloud" %}
  **Google Cloud**

  Follow the Google Clout Compute Engine Guide: 🌐 [Instance templates](https://cloud.google.com/compute/docs/instance-templates).
{% /tab %}

{% tab label="Other S3 Compatible" %}
  **Other S3 Compatible**

  Typically, you will need a physical or virtualized computer connected to the same LAN as both your object storage location and your file storage device.
{% /tab %}
{% /tabs %}

### Create an Empty Directory on Attached Storage

You will need an empty directory on your attached file storage that is writable by your user. 

If you don’t have this set up yet, follow the relevant steps for your platform to attach a writable storage device to your compute node:

{% tabs %}
{% tab label="AWS S3" %}
  **AWS S3**

  Follow the AWS guide: 🌐 [Getting started with Amazon EFS](https://docs.aws.amazon.com/efs/latest/ug/getting-started.html).
{% /tab %}

{% tab label="Storj" %}
  **Storj**

  You can use local storage, or attach an NFS/SMB mount to a file storage device in the same LAN.
{% /tab %}

{% tab label="Microsoft Azure" %}
  **Microsoft Azure**

  Follow the Azure documentation to 🌐 [Use the portal to attach a data disk to a Linux VM](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/attach-disk-portal).

  Additional information on Azure’s fully managed file shares can be found in the 🌐 [What is Azure Files?](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction) article.
{% /tab %}

{% tab label="Google Cloud" %}
  **Google Cloud**

  Choose an appropriate Google Cloud attached disk option be reading through the information in the 🌐 [Choose a disk type](https://cloud.google.com/compute/docs/disks) article. Then, attach your instance to it using the relevant guide.

  Follow the instructions enable to Filestore in the 🌐 [Install and enable components](https://cloud.google.com/filestore/docs/install) article.
{% /tab %}

{% tab label="Other S3 Compatible" %}
  **Other S3 Compatible**

  You can use local storage, or attach an NFS/SMB mount to a file storage device in the same LAN.
{% /tab %}
{% /tabs %}


## Mounting an Object Mount Fusion Filesystem

To set up Object Mount Fusion, you need Object Mount [installed](docId:iethahkeeX5EiJoh) on the compute node, and you need to [Import S3 Credentials](docId:JDK2ED8HGFmyaxk#step-2-import-s3-credentials) so that the bucket/container is accessible.

Your next steps depend on the filesystem you are using and the options used when mounting/attaching it. 

Refer to the relevant section below:
- Filesystems _without_ extended attribute support (e.g. EFS)
- Filesystems _with_ extended attribute support (e.g. NFSv4 with Linux Kernel 5.9+)

### Filesystems _Without_ Extended Attribute Support (e.g. EFS)

Object Mount Fusion is set up and accessed through Object Mount on FUSE. 

To do this, additional options must be passed to `cuno mount` when it is run. 

You will need to:
  - Use the `--fusion` option to specify the path to the associated attached storage directory
  - Use the `--root` option to specify the path to the object storage

Use a command similar to the one below to enable both these options:

```sh
cuno mount \
    --fusion "<path to attached-storage backing directory>" \
    --root "<path to object storage backing directory>" \
    "<mount location>"
```

Example: 

```sh
`cuno mount --fusion /dev/sdf/fusion-store --root s3://bucket/fusion-store $HOME/my-fusion-filesystem`
```

By running the above command, the `<mount location>` becomes the proper way to access the Fusion filesystem. 

All operations, workflows, pipelines, etc. should be pointed to `<mount location>`.

### Mounting the Filesystem

Refer to your environment for specific commands:

{% tabs %}
{% tab label="AWS S3" %}
  **AWS S3**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "/cuno/s3/<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose: 

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store"
  ```

  Mount the Object Mount Fusion volume:

  ```shell
  #terminal
  cuno mount --fusion "/mnt/fast/fusion-store" --root "/cuno/s3/<bucket>/fusion-store" "~/my-fusion-filesystem"
  ```
{% /tab %}

{% tab label="Storj" %}
  **Storj**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "/cuno/s3/<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store"
  ```

  Mount the Object Mount Fusion volume:

  ```shell
  #terminal
  cuno mount --fusion "/mnt/fast/fusion-store" --root "/cuno/s3/<bucket>/fusion-store" "~/my-fusion-filesystem"
  ```
{% /tab %}

{% tab label="Microsoft Azure" %}
  **Microsoft Azure**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "/cuno/az/<account-name>/<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store"
  ```

  Mount the Object Mount Fusion volume:

  ```shell
  #terminal
  cuno mount --fusion "/mnt/fast/fusion-store" --root "/cuno/az/<account-name>/<bucket>/fusion-store" "~/my-fusion-filesystem"
  ```
{% /tab %}

{% tab label="Google Cloud" %}
  **Google Cloud**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "/cuno/gs/<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store"
  ```

  Mount the Object Mount Fusion volume:

  ```shell
  #terminal
  cuno mount --fusion "/mnt/fast/fusion-store" --root "/cuno/gs/<bucket>/fusion-store" "~/my-fusion-filesystem"
  ```
{% /tab %}

{% tab label="Other S3 Compatible" %}
  **Other S3 Compatible**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "/cuno/s3/<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store"
  ```

  Mount the Object Mount Fusion volume:

  ```shell
  #terminal
  cuno mount --fusion "/mnt/fast/fusion-store" --root "/cuno/s3/<bucket>/fusion-store" "~/my-fusion-filesystem"
  ```
{% /tab %}
{% /tabs %}

_**Note:** See tables below for additional `cuno mount` parameters._

### Filesystems _With_ Extended Attribute Support (e.g. NFSv4 with Linux Kernel 5.9+)

When using a filesystem that supports extended attributes you should “bind” it to a cloud location first, as this does additional error checking and makes for a simpler mount/unmount procedure.

**Bind a Directory to a Cloud Location:**

To bind a local Fusion directory to a cloud location, use `cuno fusion`.

This command will configure a local pointer targeted at the cloud mount we will make later. It will also save any relevant options used at this stage as metadata; to be used by default by any mounts that use this fusion binding.

```shell
#terminal
cuno fusion "<path to attached storage backing directory>" "<path to object storage backing directory>"
```

Example: 

```shell
#terminal
cuno fusion /dev/sdf/fusion-store s3://bucket/fusion-store
```

### Mounting the Filesystem (After Binding)

Object Mount Fusion is set up and accessed through Object Mount on FUSE.

To do this, additional options must be used when configuring [Object Mount on FUSE](docId:ZdvWLcm9uFmM5HLk).

If you have already bound a directory to a cloud location, you only need to use the `--root` option to specify the path to the associated attached-storage directory in order to use the mount as a Fusion mount:

```shell
# terminal
cuno mount \
    --root "<path to attached-storage backing directory>" \
    "<mount location>"
```

Refer to your environment for specific commands:

{% tabs %}
{% tab label="AWS S3" %}
  **AWS S3**

  If the bucket is not empty, create a new empty directory on your bucket: 
  
  ```shell
  # terminal
  cuno run mkdir "s3://<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:
  
  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store"
  ```

  Create and mount the Object Mount Fusion volume:
  
  ```shell
  #terminal  
  cuno fusion "/mnt/fast/fusion-store" "s3://<bucket>/fusion-store"
  #terminal  
  cuno mount --root "/mnt/fast/fusion-store" "$HOME/my-fusion-filesystem"
  ```
{% /tab %}

{% tab label="Storj" %}
  **Storj**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "s3://<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store" 
  ```

  Create and mount the Object Mount Fusion volume:
  
  ```shell
  #terminal    
  cuno fusion "/mnt/fast/fusion-store" "s3://<bucket>/fusion-store"
  #terminal
  cuno mount --root "/mnt/fast/fusion-store" "$HOME/my-fusion-filesystem"
  ```
{% /tab %}

{% tab label="Microsoft Azure" %}
  **Microsoft Azure**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "az://<account-name>/<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store"
  ```

  Create and mount the Object Mount Fusion volume:
  
  ```shell
  #terminal  
  cuno fusion "/mnt/fast/fusion-store" "az://<account-name>/<bucket>/fusion-store"
  #terminal  
  cuno mount --root "/mnt/fast/fusion-store" "$HOME/my-fusion-filesystem"
  ```
{% /tab %}

{% tab label="Google Cloud" %}
  **Google Cloud**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "gs://<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store"
  ```

  Create and mount the Object Mount Fusion volume:
    
  ```shell
  #terminal  
  cuno fusion "/mnt/fast/fusion-store" "gs://<bucket>/fusion-store"
  #terminal  
  cuno mount --root "/mnt/fast/fusion-store" "$HOME/my-fusion-filesystem"
  ```
{% /tab %}

{% tab label="Other S3 Compatible" %}
  **Other S3 Compatible**

  If the bucket is not empty, create a new empty directory on your bucket:

  ```shell
  #terminal
  cuno run mkdir "s3://<bucket>/fusion-store"
  ```

  Create a directory on the attached-storage device (assuming you’ve mounted it at `/mnt/fast`) to use for this purpose:

  ```shell
  #terminal
  mkdir "/mnt/fast/fusion-store" 
  ```
  
  Create and mount the Object Mount Fusion volume:

  ```shell
  #terminal    
  cuno fusion "/mnt/fast/fusion-store" "s3://<bucket>/fusion-store"
  #terminal
  cuno mount --root "/mnt/fast/fusion-store" "$HOME/my-fusion-filesystem"
  ```
{% /tab %}
{% /tabs %}

_**Note:** See tables below for additional `cuno mount` and `cuno fusion` parameters._


## Using & Testing the Object Mount Fusion filesystem

All operations, workflows, pipelines, etc. should be pointed to your mount location.

### Usage Examples

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

Check that access, modification and migration are working as expected. 

We recommend measuring cost differences, and the overall time taken for equivalent jobs run on attached storage alone.

**Note:** You can set the `CUNO_DEBUG` environment variable to `trace`, or `debug` at the time of mounting for more details logging information.

Not seeing what you expect? Contact us at our 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new).


## APPENDIX TABLES: Parameters, Arguments & Options

**TABLE: `cuno fusion` Arguments**

| **Argument** | **Description** |
|--------------|-----------------|
| `<path to attached storage backing directory>` | Sets the location specified as the place to store file-storage data. This is where files that are migrated off the object store into local storage go. This can happen when access patterns suggest the file would benefit from higher IOPS, or when a file doesn’t meet the minimum size or age thresholds. |
| `<path to object storage backing directory>` | Text |

**TABLE: `cuno fusion` Options**

| **Option** | **Description** |
|------------|-----------------|
| `--fusion-size-threshold <size: default 10M>` (optional) | Define the minimum size that a file needs to be for it to be migrated from file storage to object storage. The argument value is of the form `<INTEGER>[UNIT]`. If no unit is given, the value is assumed to be in *bytes*. Valid units are `K` (Kilobytes), `M` (Megabytes), `G` (Gigabytes), `T` (Terabytes). |
| `--fusion-age-threshold <age: default 1h>` (optional) | Defines the minimum age requirement for files to be considered for migration from file storage to object storage. The age is measured as the time since the most recent of the POSIX creation time, modify time, access time, and change time - in other words, the time since each of these must be greater than the set threshold. The argument value is of the form  `<INTEGER>[UNIT]`. If no unit is given, the value is assumed to be in seconds. Valid units are `s` (seconds), `m` (minutes), `h` (hours), `d` (days). |

**TABLE: `cuno fusion` Subcommands**

| **Subcommand** | **Description** |
|----------------|-----------------|
| `cuno fusion bind <local> <cloud>` | Bind a local directory to a cloud directory. |
| `cuno fusion unbind <local>` | Unbind a local directory from a cloud directory. |
| `cuno fusion rebind <local> <cloud>` | Rebind a local directory to a cloud directory. |
| `cuno fusion info <local>` | Get information about the binding at the location. |

**TABLE: Relevant `cuno mount` Options for Object Mount Fusion:**

| **Argument/Option** | **Description** | **Example** |
|---------------------|-----------------|-------------|
| `<mount location>` | The location from which the Fusion filesystem will be accessed. | `$HOME/my-fusion-filesystem` |
| `--fusion "<path to attached storage backing directory>"` | Enables Fusion for this mount, and sets it to use the location specified to store file-storage data. This is where files that are migrated off the object store into local storage go. This can happen when access patterns suggest the file would benefit from higher IOPS, or when a file doesn’t meet the minimum size or age thresholds. | `/dev/sdf/fusion-store` |
| `--root "<path to object storage backing directory>"` | Sets the object storage location to be used as the place to store data that is better suited to be stored on object storage rather than on the file storage. | `/cuno/s3/bucket/fusion-store` |
| `--fusion-size-threshold <size: default 10M>` (optional) | Defines the minimum size that a file needs to be for it to be migrated from file storage to object storage. The argument value is of the form `<INTEGER>[UNIT]`. If no unit is given, the value is assumed to be in *bytes*. Valid units are `K` (Kilobytes), `M` (Megabytes), `G` (Gigabytes), `T` (Terabytes). | |
| `--fusion-age-threshold <age: default 1h>` (optional) | Defines the minimum age requirement for files to be considered for migration from file storage to object storage. The age is measured as the time since the most recent of the POSIX creation time, modify time, access time, and change time - in other words, the time since each of these must be greater than the set threshold. The argument value is of the form  `<INTEGER>[UNIT]`. If no unit is given, the value is assumed to be in seconds. Valid units are `s` (seconds), `m` (minutes), `h` (hours), `d` (days). | |
