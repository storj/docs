---
title: Object Mount FlexMount
hideTitle: false
docId: cFUt9zgCRFFDk5Sq
weight: 3
metadata:
  title: Configuring Object Mount FlexMount
  description:
    Details on the use and configuration of Object Mount FlexMount for Linux.
hidden: false
---

This article dives into the configuration and use of **Object Mount FlexMount** in Linux.


## Overview

Use **Object Mount FlexMount** for the widest compatibility and support (including SUID binaries, Snap, AppImage and FlatPak applications using FUSE), combined with the speed of Direct Interception whenever possible.

Object Mount's FlexMount features are active when:

1. You set up Object Mount on FUSE, but ...

2. You access your cloud storage _always_ via the Object Mount CLI and _always_ by specifying your mount path via the `--flex` parameter. 

Object Mount will recognize that the path is a mount and use **Direct Interception Mode** whenever possible for faster access. 

Object Mount will fall back to using **Object Mount on FUSE** for anything that cannot be directly intercepted.


## Advantages

1. Speed: where interception is possible, Object Mount in FlexMount mode will be as fast as Object Mount

2. Support: support for all POSIX applications, as anything that cannot be directly intercepted falls through to the Object Mount on FUSE.


## Disadvantages

1. Set up time: a Object Mount on FUSE needs to be set up. Consider [setting up the mount at boot](#mount-on-boot).

2. Launch is more complicated: each time a Object Mount shell is launched it must be configured to use the mount. This can be worked around by setting up a Object Mount on FUSE on boot, and setting an alias to launch a Object Mount shell with the correct parameters.


## How to Enable

FlexMount is set up as follows:

1. First, set up a mount using Object Mount on FUSE:

   ```console
   $ mkdir "$HOME/my-object-storage"
   $ cuno mount "$HOME/my-object-storage"
   ```

2. Always use the Object Mount CLI to interact with your object storage. Every time the Object Mount CLI is launched, use the `--flex <full_path_to_mount>` parameter. For example:

   ```console
   $ cuno --flex "$HOME/my-object-storage"
   ```

3. Then reference your mount using the mount’s path:
   ```console
   (cuno) $ ls $HOME/my-object-storage/s3/<bucket>/<path>
   ```

{% callout type="note" %}
  You cannot use a tilde `~` in your `CUNO_OPTIONS` or `cuno -o` CLI options when setting up a FlexMount, as this is something that the shell needs to resolve. 
 
  You may still use it for your `cuno mount` commands, and subsequent FlexMount operations (such as `ls ~/my-object-storage`).
{% /callout %}

The same FlexMount can be re-used across multiple Object Mount-wrapped shells.

The `--flex` option can also be used with `cuno run` to run a single command/script with Object Mount enabled, for example:

```shell
# terminal
cuno run --flex "$HOME/my-object-storage" bash -c "touch $HOME/object_storage_mount/s3/<bucket>/newfile"
```


## FlexMount Interception Details

The `-flex` option is synonymous with the `-o cloudrootover=exact -o cloudroot="<mount point>"` option, which is used to tell Object Mount to intercept paths that exactly match the cloudroot setting, and to handle them using Object Mount on FUSE.

When using Object Mount Direct Interception in FlexMount Mode, most "local" paths are intercepted but not acted upon, because they can be handled by the local file system. 

The `cloudrootover` setting is telling Object Mount to intercept local paths that match the `cloudroot` setting, and to prioritize itself handling them over the mount. This means that whenever a path is recognized as the `cloudroot`, it can be more efficiently handled in user-space by the Direct Interception/`LD_PRELOAD` library. 

That path recognition can be done in two ways:

  - (default) Exact string matching (`exact`) will match the cloudroot setting exactly. This is faster, and will end up relying on the FUSE mount whenever the paths don't match the cloudroot - for example with symbolic links located outside the mount pointing into the mount.

  - Resolved path matching (`resolve`) will resolve the full path given in a file system call including symbolic links to check if the file is ultimately located inside the mount point. This requires more calls for every path-based file system call, so is slower when many files are being accessed. It is useful when symbolic links are used to point into the mount, and other cases where the path ultimately is inside the mount. This can be more efficient in some special cases (few files, large transfers, complex relationships between files) as `cuno.so` will intercept more calls without requiring them to go through the slower FUSE mount.

To use resolve mode use the parameters `-o cloudrootover=resolve -o cloudroot="<full path to mount point>"`, for example:

```console
$ cuno -o cloudrootover=resolve -o cloudroot="$HOME/my-object-storage"
(cuno) $ ls $HOME/object_storage_mount/s3/<bucket>/<path>
```