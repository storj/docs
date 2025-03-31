---
title: Enabling Object Mount
docId: ooceeNge9iig6uSe
weight: 5
metadata:
  title: Enabling Object Mount
  description:
    Object Mount Fusion is way to upgrade high-performance attached storage solutions like Amazon Elastic File System (EFS) with the throughput of object storage. It is a **cheaper** and **faster** solution compared to using EFS alone.
---

## How to use Object Mount

By default, Object Mount is configured for [Core File Access](../getting-started/configuration-modes#core-file-access) which does not write additional Object Mount metadata to your buckets. Once you’re up and running, you can change the mode of operation to better suit your requirements.

For program calls to be routed through Object Mount, they must be either [directly intercepted](#direct-interception-with-object-mount-cli) using the `cuno` command line; or pointed at a [Object Mount on FUSE](#object-mount-on-fuse) (a custom FUSE mount) set up using `cuno mount`. 
There is also [Object Mount FlexMount](#object-mount-flex-mount), which makes use of both Direct Interception and a Object Mount on FUSE as a fallback.

{% callout type="note"  %}
If you have a specialised use case, follow the relevant quick start guide:

- High-performance attached storage upgrade (EFS upgrade): [Object Mount Fusion](../getting-started/object-mount-fusion)
- Strict POSIX-controlled access to object storage: [Enforced Posix Access](../getting-started/enforced-posix-access)

{% /callout %}



## Direct Interception with Object Mount CLI

When running in Direct Interception mode, Object Mount will insert itself between your applications and the operating system. It will dynamically redirect relevant filesystem calls made by the application through the API of your object storage solution. As a result, our mapping between filesystem concepts and object storage gives any application instant access to objects as files.

{% callout type="note"  %}
This includes applications you've written yourself - just treat the paths to object storage as local filesystem paths, and Object Mount handles the rest.
{% /callout %}


Direct Interception offers the highest performance access to object storage that Object Mount provides.

{% callout type="warning"  %}
Direct interception does not currently support SUID binaries, or certain packaged apps like [Snap](https://ubuntu.com/core/services/guide/snaps-intro), [AppImage](https://appimage.org/), or [Flatpak](https://docs.flatpak.org/en/latest/introduction.html) applications. Future updates are planned to address this.
{% /callout %}

This mode is best suited for situations in which installed app compatibility is not a concern - for example, when setting up a fixed workflow with Object Mount that can be tested and verified before putting it into production.

### Usage

Direct Interception can be enabled per-session or per-command. Enable it for a session by calling `cuno` on the command line:

```shell
# terminal
cuno
```

This will launch a new interactive "wrapped" shell with Object Mount acting in Direct Interception mode. The shell itself has Object Mount intercepting its calls, so every application launched from within it can be intercepted as well as the command line arguments being used.

{% callout type="note"  %}
When the Object Mount CLI is used to launch a new shell, the primary purpose is to start a new shell (whether that's bash, zsh, or whatever else) with `LD_PRELOAD` set to point at `cuno.so`. There is no Object Mount shell binary - it only wraps existing shells with Object Mount pre-loaded.
{% /callout %}

Inside the shell, object storage is accessed either in path or URI formats:

{% tabs %}
{% tab label="AWS S3" %}
   ```shell
    # focus(1)
    # terminal
    cuno
    (cuno)$ ls s3://<bucket>/<path>
    (cuno)$ ls /cuno/s3/<bucket>/<path>
   ```
{% /tab %}
{% tab label="Microsoft Azure" %}
   ```shell
    # terminal
    # focus(1)
    cuno
    (cuno)$ ls az://<account name>/<bucket>/<path>
    (cuno)$ ls /cuno/az/<account name>/<bucket>/<path>
   ```
{% /tab %}
{% tab label="Google Cloud Storage" %}
   ```shell
    # terminal
    # focus(1)
    cuno
    (cuno)$ ls gs://<bucket>/<path>
    (cuno)$ ls /cuno/gs/<bucket>/<path>
   ```
{% /tab %}
{% tab label="S3-compatible" %}
   ```shell
    # focus(1)
    # terminal
    cuno
    (cuno)$ ls s3://<bucket>/<path>
    (cuno)$ ls /cuno/s3/<bucket>/<path>
   ```
{% /tab %}
{% /tabs %}

See [user-guide-cloud-paths](../user-guides/access) for more information, options and examples of specfiying cloud paths using Object Mount CLI.

See [User Guide: Direct Interception with Object Mount CLI](../user-guides/basic#direct-interception-with-object-mount-cli) for additional information, including [how it works](../user-guides/basic#how-it-works), 
as well as the [benefits and drawbacks](../user-guides/basic#advantages-and-disadvantages) of using Object Mount in this way.

## Object Mount on FUSE

Object Mount on FUSE allows you to mount an object storage path in a directory within the local file system hierarchy. This allows you (and any other user with access to the mount) to access object storage as if it were just another local directory.

Object Mount on FUSE is a FUSE file system that routes calls through the Object Mount object storage back-end. Due to the nature of FUSE file systems, this is usually less performant than Direct Interception. However, you can still expect great performance.

### Usage

A default mount can be achieved using:

```shell
# terminal
mkdir ~/my-object-storage
# terminal
cuno mount ~/my-object-storage
```

Any paired object storage buckets will now be accessible through the mount:

{% tabs %}
{% tab label="Storj" %}
```shell
# terminal
ls ~/my-object-storage/sj/<bucket>/<path>
```
{% /tab %}
{% tab label="AWS S3" %}
```shell
# terminal
ls ~/my-object-storage/s3/<bucket>/<path>
```
{% /tab %}
{% tab label="Microsoft Azure" %}
```shell
# terminal
ls ~/my-object-storage/az/<account-name>/<bucket>/<path>
```
{% /tab %}
{% tab label="Google Cloud Storage" %}
```shell
# terminal
ls ~/my-object-storage/gs/<bucket>/<path>
```  
{% /tab %}
{% tab label="S3-compatible" %}
```shell
# terminal
ls ~/my-object-storage/s3/<bucket>/<path>
```
{% /tab %}
{% /tabs %}


For directions on unmounting, configuration options and further information, see the [user guide section on Object Mount on FUSE](../user-guides/basic#object-mount-on-fuse).

## Object Mount FlexMount

Use Object Mount FlexMount for the widest compatibility and support (including SUID binaries, Snap, AppImage and FlatPak applications using FUSE), combined with the speed of Direct Interception when possible.

FlexMount is used by setting up a Object Mount on FUSE and then accessing the cloud using Object Mount CLI always "through" the mount path. Object Mount will recognise that the path is a mount and use direct interception where possible for faster access. It will naturally fall back to the Object Mount on FUSE for anything that cannot be directly intercepted.

### Usage

A FlexMount is set up as follows:

1. First, set up a Object Mount on FUSE:

   ```console
   $ mkdir "$HOME/my-object-storage"
   $ cuno mount "$HOME/my-object-storage"
   ```

2. Each time the Object Mount CLI is launched, use the `--flex <full path to mountpoint>"` parameter, for example:

   ```console
   $ cuno --flex "$HOME/my-object-storage"
   (cuno) $ ls $HOME/my-object-storage/s3/<bucket>/<path>
   ```

   {% callout type="warning"  %}
   You cannot use a tilde `~` in your `CUNO_OPTIONS` or `cuno -o` CLI options when setting up a FlexMount as this is something that the shell needs to resolve. You may still use it for your `cuno mount` commands, and subsequent FlexMount operations (such as `ls ~/my-object-storage`).
   {% /callout %}

The same FlexMount can be re-used across multiple Object Mount wrapped shells.

The `--flex` option can also be used with `cuno run` to run a single command/script with Object Mount enabled, for example:

```shell
# terminal
cuno run --flex "$HOME/my-object-storage" bash -c "touch $HOME/object_storage_mount/s3/<bucket>/newfile"
```

For more information and configuration options, see the [user guide section on Object Mount FlexMount](../user-guides/basic#object-mount-flex-mount).

## Enabling Object Mount in other environments

For information on setting up Docker containers with Object Mount pre-loaded, automatically setting up a Object Mount on FUSE at boot, and other containerisation and HPC use-cases, see [Advanced Loading](../user-guides/advanced).
