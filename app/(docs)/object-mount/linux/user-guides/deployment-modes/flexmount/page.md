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

This article dives into the configuration and use of **Object Mount FlexMount** for Linux.


## Overview

**Object Mount FlexMount** combines the wide compatibility and support for Linux Apps via FUSE (including SUID binaries, Snap, AppImage and FlatPak applications) plus all the speed & benefits of Direct Interception Mode whenever possible.

With Object Mount in FlexMount Mode, Object Mount will recognize that the mount path is an Object Storage mount and use **Direct Interception Mode** whenever possible for the fastest access. Object Mount will fall back to using **Object Mount on FUSE** for anything that cannot be directly intercepted. THis provides both the **best performance** and the **broadest compatibility**.

Object Mount’s FlexMount benefits are leveraged by:

  1. Configuring **Object Mount on FUSE**, and
  2. Accessing your cloud storage via the **Object Mount CLI** by specifying your mount path via the **`--flex` parameter**. 

### Advantages

1. **Speed:** Where possible, Object Mount in FlexMount Mode will operate as fast as possible, using Direct Interception Mode.

2. **Compatibility:** Support for all POSIX applications: Anything that cannot be directly intercepted will pass through and be handled by Object Mount on FUSE.

### Disadvantages

1. **Set up time:** Object Mount on FUSE needs to be configured.

2. **Shell launch is more complicated:** Each time an Object Mount shell is launched it must be configured to use the mount. This can be worked around by setting up a Object Mount on FUSE [on boot](docId:ZdvWLcm9uFmM5HLk#mount-on-boot), and setting an alias to launch a Object Mount shell with the correct parameters.


## How to Enable

FlexMount is set up as follows:

1. First, set up a mount using [Object Mount on FUSE](docId:ZdvWLcm9uFmM5HLk):

    ```console
    $ mkdir "$HOME/my-object-storage"
    $ cuno mount "$HOME/my-object-storage"
    ```

2. Always use the Object Mount CLI to interact with your object storage. 

    Every time the Object Mount CLI is launched, use the `--flex <full_path_to_mount>` parameter. 
    
    For example:

    ```console
    $ cuno --flex "$HOME/my-object-storage"
    ```

3. Then reference your mount using the mount’s path:

    ```console
    (cuno) $ ls $HOME/my-object-storage/s3/<bucket>/<path>
    ```

{% callout type="note" %}
  **FlexMount Tilde (~) Use**

  You cannot use a tilde `~` in your `CUNO_OPTIONS` or `cuno -o` CLI options when setting up a FlexMount, as this is something that the shell needs to resolve. 
 
  You may still use it for your `cuno mount` commands, and subsequent FlexMount operations (such as `ls ~/my-object-storage`).
{% /callout %}

The same FlexMount can be re-used across multiple Object Mount-wrapped shells.

The `--flex` option can also be used with `cuno run` to run a single command or script with Object Mount enabled.

For example:

```shell
# terminal
cuno run --flex "$HOME/my-object-storage" bash -c "touch $HOME/object_storage_mount/s3/<bucket>/newfile"
```


## FlexMount Interception Details

The `--flex` option is synonymous with the `-o cloudrootover=exact -o cloudroot="<mount point>"` option, which is used to tell Object Mount to intercept paths that exactly match the `cloudroot` setting, and to handle them using Object Mount on FUSE.

When using Object Mount Direct Interception in FlexMount Mode, most “local” paths are intercepted but not acted upon as they are handled by the local file system. 

The `cloudrootover` setting tells Object Mount to intercept local paths that match the `cloudroot` setting, and to prioritize itself handling them via the mount. This means that whenever a path is recognized as the `cloudroot`, it will be more efficiently handled in user-space by the Direct Interception/`LD_PRELOAD` library. 

That path recognition can be done in two ways:

  - **Exact String Matching:** (`exact`) This method will match the `cloudroot` setting exactly. This is faster, and will end up relying on the FUSE mount whenever the paths don’t match the `cloudroot` &mdash; for example with symbolic links located outside the mount pointing into the mount. 
  
    Exact String Matching is the default method. No additional configuration is needed to enable.

  - **Resolved Path Matching:** (`resolve`) This method will resolve the full path given in a file system call, including symbolic links, to check if the file is ultimately located inside the mount point. 
  
    This requires more calls for every path-based file system call, so is slower when many files are being accessed. It is useful when symbolic links are pointed to the mount, and other cases where the path ultimately is inside the mount. 
    
    This can be more efficient in some special cases (few files, large transfers, complex relationships between files) as `cuno.so` will intercept more calls without requiring them to go through the slower FUSE mount.

    To use Resolved Path Matching Mode, use the parameters `-o cloudrootover=resolve -o cloudroot="<full path to mount point>"`.

    For example:

    ```console
    $ cuno -o cloudrootover=resolve -o cloudroot="$HOME/my-object-storage"
    (cuno) $ ls $HOME/object_storage_mount/s3/<bucket>/<path>
    ```
