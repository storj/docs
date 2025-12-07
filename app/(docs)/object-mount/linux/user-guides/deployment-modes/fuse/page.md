---
title: Object Mount on FUSE
hideTitle: false
docId: ZdvWLcm9uFmM5HLk
weight: 2
metadata:
  title: Configuring Object Mount on FUSE
  description:
    Details on the use and configuration of Object Mount on FUSE for Linux.
hidden: false
---

This article dives into the configuration and use of **Object Mount on FUSE** in Linux.

## Overview

**Object Mount on FUSE** allows you to mount an object storage path as a _directory_ within the local file system hierarchy.

This allows you (and any other user with access to the mount) to access object storage as if it were just another local directory.


## Highlights & Advantages

Object Mount on FUSE is a FUSE file system. FUSE routes calls through the Object Mount object storage back-end. 

  - **Compatibility:** Use Object Mount on FUSE when compatibility is a primary concern (e.g.: when using a variety of applications across multiple different operating systems).

  - **Interoperable:** Object Mount on FUSE can be used when launching the `cuno` binary is not possible (e.g. an automation engine without the required features).

  - **Simple Usage:** After a mount is set up, scripts only need to be changed to point at the new directory. No changes are needed to the workflow and no environment variables need to be set.

  - **Greater Administrative Control:** Object Mount on FUSE can be setup once, by an admin, without giving users any credentials. This removes the need to train users on object storage concepts.

{% callout type="info" %}
  **Performance vs. Compatibility**

  Due to the nature of FUSE file systems, Object Mount on FUSE can be slightly less performant than Object Mount in Direct Interception Mode.
  
  If speed is your primary objective, consider using Object Mount in [Direct Intercept Mode](docId:UHsd5HnesueQyhnZ) or via the [User-Mode Library](docId:airoogh4Waengi8u#user-mode-library).
{% /callout %}


## How to Enable

Create a FUSE-based object storage mount by entering:

```shell
# terminal
mkdir ~/my-object-storage
# terminal
cuno mount ~/my-object-storage
```

Any paired object storage buckets will now be accessible through the mount. 

Choose your storage provider below to see the commands to list files on your S3 mount:

{% tabs %}
{% tab label="AWS S3" %}
```shell
# terminal
ls ~/my-object-storage/s3/<bucket>/<path>
```
{% /tab %}

{% tab label="Storj" %}
```shell
# terminal
ls ~/my-object-storage/sj/<bucket>/<path>
```
{% /tab %}

<!-- S3 VS SJ
THIS IS THE FIRST MENTION OF `SJ` INSTEAD OF `S3.
VALID? OR NOT?
-->

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
{% tab label="Other S3 Compatible" %}
```shell
# terminal
ls ~/my-object-storage/s3/<bucket>/<path>
```
{% /tab %}
{% /tabs %}

{% callout type="info" %}
  **Mount Paths vs URI Paths**

  You cannot use URI paths like “s3://bucket1/foo” when using Object Mount on FUSE. 
  
  To be usable, replace the URI prefix (`s3://`) with the path to your mount.
{% /callout %}

{% callout type="note"  %}
  **POSIX Options**

  The `--posix` option requires that a FUSE package be installed on the system.
{% /callout %}


## Configuration Options

There are various options that can be specified from the command line:

```console
cuno [subsys-options] mount [mount-options] <mount-path>
```

These options include:

  - Object Mount --> Mount Options
  - Object Mount --> Subsystem Options
  - FUSE Options

### Object Mount: Mount Options

To _right_ of the `mount` verb, you can specify options that are specific to the mount operation:

```
cuno mount [option] ...
```

**Noteworthy Mount Options:**

| **Mount Option**      | **Description** |
|-----------------------|-----------------|
| `--root <cloud path>` | Specifies the root object storage path to be mounted. For example, to mount a single bucket, you would use `--root s3://<bucket>`. |
| `--posix` | Enables setting and enforcing access permissions, symbolic and hard links, users, groups, etc. Can be used with default permissions. Implicitly sets `-o allow_other`. This option is ideally used with a mount that is only on a single bucket, e.g. `cuno mount --root s3://<bucket> --posix <mount-path>`. You should also be using `cuno creds setposix s3://examplebucket true` to enable POSIX handling of the bucket consistently when Direct Interception or a FlexMount is used. |
| `<FUSE option>` | Options that are specific to the FUSE mount operation. These options are passed on to `fum` ([fusermount3](https://www.man7.org/linux/man-pages/man8/mount.fuse3.8.html)). Not to be confused with Object Mount subsystem options which use the same `-o` syntax. See below for some of these. See user-guide-cuno-mount-fuse-options. |
| `--no-allow-root` | Do not allow root to access the mount (allowed by default). Disables support for SUID binaries, Snap, AppArmor, and Flatpak applications. |
| `--auto-restart` | Automatically restarts Object Mount on FUSE if problems occur during execution. |
| `--mkdir` | Automatically creates the mount point directory if it does not exist. |
| `--debug` | Enables debug output (same as `cuno mount -o debug`). |
| `--dev-logs` | Enabled debug logging to `/tmp/fuse.logs` |
| `--verbose` | Enables verbose output. |

### Object Mount: Subsystem Options

To _left_ of the `mount` verb, you can specify options that are specific to the Object Mount subsystem:

```
cuno -o <Object Mount Subsystem Option> mount ...
```

Alternatively, these can be specific using a **system variable**:

```
export CUNO_OPTIONS="<Object Mount Subsystem Option>"
```

**Noteworthy Subsystem Options:**

Some relevant Object Mount Subsystem options are given in the table below. 

Refer to the Linux User Guide article [](docId:phohPoowequie5ji) for additional details.

| **Subsystem Option** | **Description** |
|----------------------|-----------------|
| `cachehome=<directory>` (default: `/cunodb;/dev/shm;/tmp/cache/cuno`) | This option allows you to set a semicolon-delimited list of directories to consider for caching. This is for the internal metadata cache of the Object Mount process behind the mount. Note that the FUSE cache is separate from this cache. Example: `cuno -o cachehome=/mnt/cache;/cunodb;/dev/shm mount <mount-path>` |
| `uid=<integer>` | Define the default user ownership of files and directories within a bucket. These are the UIDs that the Object Mount subsystem will feed to the FUSE mount for non-POSIX (core file access) buckets. Not recommended for most use cases, but may be useful if mounting non-POSIX buckets in the same mount as POSIX buckets. **Ignored** if the bucket has an enabled POSIX tag. Example: `cuno -o uid=$(id -u <username>) mount <mount-path>` To enforce these settings, use the FUSE mount option `-o default_permissions`. |
| `gid=<integer>` | Define the default group ownership of files and directories within a bucket. These are the GIDs that the Object Mount subsystem will feed to the FUSE mount for non-POSIX (core file access) buckets. Not recommended for most use cases, prefer to use POSIX file access. Not recommended for most use cases, but may be useful if mounting non-POSIX buckets in the same mount as POSIX buckets. **Ignored** if the bucket has an enabled POSIX tag. Example: `cuno -o gid=$(id -g <username>) mount <mount-path>` To enforce these settings, use the FUSE mount option `-o default_permissions`. |
| `filemode=<octal>` | Define the default file access permission bits of files within a bucket. Supply the octal (numeric) representation of the permissions you want to apply. These are the permissions that the Object Mount subsystem will feed to the FUSE mount for non-POSIX (core file access) buckets. Not recommended for most use cases, but may be useful if mounting non-POSIX buckets in the same mount as POSIX buckets. **Ignored** if the bucket has an enabled POSIX tag. For example, to set the default file access permission bits to 0770 (`-rwxrwx---`), use the following command: `cuno -o filemode=0770 mount <mount-path>` To enforce these settings, use the FUSE mount option `-o default_permissions`. |
| `dirmode=<octal>` | Define the default file access permission bits of directories within a bucket. Supply the octal (numeric) representation of the permissions you want to apply. These are the permissions that the Object Mount subsystem will feed to the FUSE mount for non-POSIX (core file access) buckets. Not recommended for most use cases, but may be useful if mounting non-POSIX buckets in the same mount as POSIX buckets. **Ignored** if the bucket has an enabled POSIX tag. For example, to set the default file access permission bits to 0770 (`drwx


### FUSE Options

Also on the _right hand-side_ of the `mount` verb, you can specify options that are specific to the FUSE mount operation. 

These options are passed to the FUSE User Mount process: `fum`. (Refer to the 🌐 [FUSE Mount Documentation](https://www.man7.org/linux/man-pages/man8/mount.fuse3.8.html).
```
cuno mount [FUSE option] ...
```

{% callout type="note"  %}
  **Object Mount Options vs. FUSE Options**

  As with the Mount Options, these FUSE options must come _after_ the verb `mount`.

  **Note:** Some of these FUSE options use a similar `-o` syntax as the Object Mount Subsystem options (e.g.: `cuno -o`), but they are _not_ the same.
{% /callout %}

**Noteworthy FUSE Options:**

| **Option** | **Description** |
|-----------------|-----------------|
| `-o allow_root` | Allows root access to the mount; required for [SUID](https://www.redhat.com/sysadmin/suid-sgid-sticky-bit) permissions. |
| `-o allow_other` | Allows other users to access the mount; requires `user_allow_other` in `/etc/fuse.conf`. |
| `-o default_permissions` | Enable permission checking by the kernel. To use Enforced POSIX, use `--posix`, which will set this internally. |
| `-o auto_unmount` | Automatically unmounts the mount when the process terminates. |
| `-o ro` | Mounts the file system read-only. To achieve a read-only mount through Object Mount, you can alternatively use `cuno mount --posix` and change the permissions on dirs/files in the mount manually to read-only using `chmod`. See [here](https://www.man7.org/linux/man-pages/man8/mount.8.html) for more on standard mount options like `ro`, `rw`, etc. |
| `-o rw` (default) | Mounts the file system read-write. |
| `-o exec` (default) | Allow execution of binaries on the file system. |
| `-o noexec` | Disallow execution of binaries on the file system. |
| `-o clone_fd` | Uses a separate fuse device fd for each thread (may improve performance). |
| `-o max_idle_threads` | The maximum number of idle worker threads allowed (default: 10). |
| `-s` | Run in single-threaded mode. |
| `-f` | Run in the foreground. |
| `-o debug` | Enable debug output (implies `-f`). |

**FUSE Kernel Default Attributes:**

| **Attribute** | **Description** |
|---------------------|-----------------|
| `-o uid=N` | Sets the file owner of all mounted files/dirs to the specified user ID. These are the UIDs that the FUSE mount will expose to the user. This will ignore any cuonFS POSIX settings including the bucket tag. To enforce these settings, use the FUSE mount option `-o default_permissions`. |
| `-o gid=N` | Sets the file group of all mounted files/dirs to the specified group ID. These are the GIDs that the FUSE mount will expose to the user. This will ignore any cuonFS POSIX settings including the bucket tag. To enforce these settings, use the FUSE mount option `-o default_permissions`. |
| `-o umask=M` | Sets the file permissions (octal) of all mounted files/dirs. These are the permissions that the FUSE mount will expose to the user. This will ignore any cuonFS POSIX settings including the bucket tag. To enforce these settings, use the FUSE mount option `-o default_permissions`. |

**FUSE Kernel Cache Configuration:**

| **Cache Config** | **Description** |
|-------------------------------------|-----------------|
| `-o kernel_cache` | This method caches file data across `open`; i.e. disables flushing of the file data cache on every `open`. Without this option (and neither `direct_io`), data is cached before the next `open` so a `read` syscall may not initiate a `read` operation. |
| `-o auto_cache` | Enables automatic flushing of the data cache on open(). The cache is only flushed if the modification based on modification times (off). |
| `-o entry_timeout=T` | Sets the kernel cache timeout for names (1.0s). |
| `-o negative_timeout=T` | Sets the kernel cache timeout for a negative lookup (file not found) (0.0s). |
| `-o attr_timeout=T` | Sets the kernel cache timeout for attributes (1.0s). |
| `-o ac_attr_timeout=T` | Sets the kernel cache timeout for checking if `-o auto_cache` should flush file data on `open`. |


### Object Mount on FUSE - Commands

Once you have configured a mount using Object Mount on FUSE, you can use the following commands to manage it.

```console
cuno mount [command]
```

**Noteworthy Object Mount on FUSE Commands:**

**List**
  - `--list`
  - Lists your active Object Mount on FUSE. 
  - You can also use the Linux utility `mount` directly.
  - Example:
    ```console
    cuno mount --list
    ```

**Unmount**
  - `--unmount` / `-u` 
  - Unmounts a mount from the specified mount path. 
  - You can also use the Linux utility `umount` directly.
  - Example:
    ```console
    cuno mount --unmount <path to mount>
    ```

**Unmount and end the `fum` process**
  - `--unmount-kill` / `-U`
  - Unmounts a mount from the specified mount path and kills the `fum` process. 
  - You can also use the Linux utility `umount` directly.
  - Example:
    ```console
    cuno mount --unmount-kill <path to mount>
    ```

### Mount on Boot

You can add mount commands to `/etc/fstab` to automatically mount an object storage path on start up.
