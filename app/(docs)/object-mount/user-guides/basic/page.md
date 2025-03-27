---
title: Basic Loading
docId: aiShu0aaruaceidi

metadata:
  title: Basic Loading
  description: Basic Loading

weight: 6    
---

(user-guide-basic-loading)=

# Basic loading

Object Mount may be loaded in a number of ways, depending on user requirements and environment.

For program calls to be routed through Object Mount, they must use

- {ref}`Directly Intercepted <user-guide-direct-interception>` using the `cuno` command line or `LD_PRELOAD` environment variable;
- or the program must be pointed to a {ref}`Object Mount Mount <user-guide-Object Mount-mount>` (a custom FUSE mount) set up using `cuno mount`.

There is also {ref}`Object Mount FlexMount <user-guide-Object Mount-flexmount>`, which makes use of both Direct Interception and a Object Mount Mount as a fallback.

(user-guide-direct-interception)=

## Direct Interception with Object Mount CLI

When running in Direct Interception mode, Object Mount will insert itself between your applications and the operating system. It will dynamically redirect relevant filesystem calls made by the application through the API of your object storage solution. As a result, our mapping between filesystem concepts and object storage gives any application instant access to objects as files.

:::{note}
This includes applications you've written yourself - just treat the paths to object storage as local filesystem paths, and Object Mount handles the rest.
:::

Direct Interception offers the highest performance access to object storage that Object Mount provides.

:::{warning}
Direct interception does not currently support SUID binaries, or certain packaged apps like [Snap](https://ubuntu.com/core/services/guide/snaps-intro), [AppImage](https://appimage.org/), or [Flatpak](https://docs.flatpak.org/en/latest/introduction.html) applications. Future updates are planned to address this.
:::

This mode is best suited for situations in which installed app compatibility is not a concern - for example, when setting up a fixed workflow with Object Mount that can be tested and verified before putting it into production.

Direct Interception can be enabled per-session or per-command. Enable it for a session by calling `cuno` on the command line:

```console
cuno
```

This will launch a new interactive "wrapped" shell with Object Mount acting in Direct Interception mode. The shell itself has Object Mount intercepting its calls, so every application launched from within it can be intercepted as well as the command line arguments being used.

:::{note}
When the Object Mount CLI is used to launch a new shell, the primary purpose is to start a new shell (whether that's bash, zsh, or whatever else) with `LD_PRELOAD` set to point at `cuno.so`. There is no Object Mount shell binary - it only wraps existing shells with Object Mount pre-loaded.
:::

To enable direct interception of a single command, use:

```console
cuno run bash -c "<your command and arguments>"
```

:::{note}
Always execute one-time commands this way to maintain support for wildcard expansion ({code}`*`) .
:::

(user-guide-direct-interception-how-it-works)=

:::{note}
How it works

Direct interception uses the `LD_PRELOAD` environment variable so that Object Mount can capture and redirect storage access library and system calls through object storage APIs. If a static binary is intercepted, a JIT ELF binary translator will redirect relevant calls when the binary is loaded into memory.
:::

(user-guide-direct-interception-advantages-disadvantages)=

### Advantages and Disadvantages

``` 
.. list-table:: Direct Interception - Advantages and Disadvantages
    :header-rows: 1
    :widths: 1 1

   * - Advantages
     - Disadvantages
   * - **Speed**: Dynamic interception offers the best performance.

     - **Compatibility**: Direct interception does not currently support SUID binaries, `Snaps <https://ubuntu.com/core/services/guide/snaps-intro>`_, `AppArmor <https://ubuntu.com/server/docs/security-apparmor>`_, or `Flatpak <https://docs.flatpak.org/en/latest/introduction.html>`_ applications.

   * - **Set up time**: This is the default; all you have to do is launch a Object Mount shell with the ``cuno`` command line utility. No FUSE mount set up is required.

     - **Activation**: In some cases, it is difficult to enable direct interception or keep it enabled (because of environment variable clobbering or lack of privileges to set use LD_PRELOAD).

   * - _

     - **Non-technical users**: If Object Mount is being used by many people in an organization, teaching people how to use the Object Mount shell and diagnose if it's working correctly may be less desirable than setting up a Object Mount Mount on their behalf.
```

### Usage

When Direct Interception is enabled using `cuno` or `cuno run <command>`, object storage is accessed either in path or URI formats:

```console
$ cuno
(cuno) $ ls s3://<bucket>/<path>
(cuno) $ ls /cuno/s3/<bucket>/<path>
```

See {ref}`user-guide-cloud-paths` for more information, options and examples of using Direct Interception with the Object Mount CLI.

#### Fully supported shells

{code}`bash` and {code}`zsh` are fully supported when using Object Mount CLI.
This includes support for:

- tab auto-completion of remote paths;
- wildcard expansion ({code}`*`) of filesystem and remote paths.

In either of these fully-supported shells, the prompt will be prefixed with {code}`(cuno)` to indicate that Direct Interception is enabled and that you are using a Object Mount CLI shell, like so:

```console
(cuno) user@host:~$
```

:::{note}
To select between the two shells, Object Mount detects if either is present in one of the following, {emphasis}`in order`:

1. the shell used to launch Object Mount;
2. the user's preferred login shell;
3. all installed shells.

If neither {code}`bash` nor {code}`zsh` are found, then the first shell in this list is used.
If no shell is set, then {code}`/bin/sh` is used.

% warning:
%
% The behaviour described here relies on ``ps``. If you installed with the :ref:`Scripted Installer <user-guide-scripted-install>`, you may need to install `ps` manually (RHEL derivatives install package ``procps``).
:::

To launch a specific shell with Object Mount enabled, use {code}`cuno run`:

```console
cuno run <shell>
```

(user-guide-Object Mount-mount)=

## Object Mount Mount

Object Mount Mount allows you to mount an object storage path in a directory within the local file system hierarchy. This allows you and any other user of the mount to access object storage as if it were just another directory.

Object Mount Mount uses Linux FUSE (Filesystem in Userspace) v3 to mount an object storage path in a directory within the file system hierarchy.
Due to the nature of FUSE file systems, Object Mount Mount is usually less performant than Direct Interception using Object Mount CLI. Consider using Object Mount CLI or the userspace library (described in {ref}`user-guide-ldpreload`) if speed is the primary objective.

:::{note}
The {code}`--posix` option requires that a FUSE package be installed on the system.
:::

### Advantages

1. **Compatibility:** use a Object Mount Mount when extensively using Object Mount with a variety of operating systems, applications or when compatibility is a particular concern.
2. **Simple usage:** after a mount is set up, scripts only need to be changed to point at it, without any further changes to the workflow. No environment variables need to be set, and no Object Mount-wrapped shell has to be launched.
3. **Greater admin control:** a centralised Object Mount Mount can be set up by an admin, without giving users any credentials. This allows the admin to abstract away the concepts of object storage entirely from users.
4. When launching the `cuno` binary is not possible (limited cases, e.g. an automation engine without the required features).

### Disadvantages

1. You cannot use URI paths like "s3://bucket1/foo" directly when using a Object Mount mount. To convert such a path to be usable, you need to replace the URI prefix (`s3://`) with the path to your mount.

(user-guide-cuno-mount-options)=

### Usage and options

```console
cuno [cuno-options] mount [mount-options] <mount-path>
```

There are various options that can be specified, including

- {ref}`Object Mount Mount options <user-guide-cuno-mount-operation-options>`
- {ref}`Object Mount options for the mount's Object Mount subsystem <user-guide-cuno-mount-subsystem-options>`
- {ref}`FUSE options <user-guide-cuno-mount-fuse-options>`

(user-guide-cuno-mount-operation-options)=

#### Mount options

On the right hand-side of the `mount` verb, you can specify options that are specific to the mount operation.

```
cuno mount [option] ...
```

:::{note}
These options must come AFTER the verb `mount`.
:::

``` 
.. list-table:: Object Mount Mount options
   :widths: 40 60
   :header-rows: 1

   * - Option
     - Description
   * - ``--root <cloud path>``
     - Specifies the root object storage path to be mounted. For example, to mount a single bucket, you would use ``--root s3://<bucket>``.
   * - ``--posix``
     - Enables setting and enforcing access permissions, symbolic and hard links, users, groups, etc. Can be used with default permissions. Implicitly sets :code:`-o allow_other`.

       This option is ideally used with a mount that is only on a single bucket, e.g. ``cuno mount --root s3://<bucket> --posix <mount-path>``. You should also be using ``cuno creds setposix s3://examplebucket true`` to enable POSIX handling of the bucket consistently when Direct Interception or a FlexMount is used.
   * - ``<FUSE option>``
     - Options that are specific to the FUSE mount operation. These options are passed on to ``fum`` ( `fusermount3 <https://www.man7.org/linux/man-pages/man8/mount.fuse3.8.html>`_). Not to be confused with Object Mount subsystem options which use the same ``-o`` syntax. See below for some of these. See :ref:`user-guide-cuno-mount-fuse-options`.
   * - ``--no-allow-root``
     - Do not allow root to access the mount (allowed by default). Disables support for SUID binaries, Snap, AppArmor, and Flatpak applications.
   * - ``--auto-restart``
     - Automatically restarts Object Mount Mount if problems occur during execution.
   * - ``--mkdir``
     - Automatically creates the mount point directory if it does not exist.
   * - ``--debug``
     - Enables debug output (same as ``cuno mount -o debug``).
   * - ``--dev-logs``
     - Enabled debug logging to ``/tmp/fuse.logs``
   * - ``--verbose``
     - Enables verbose output.
```

(user-guide-cuno-mount-subsystem-options)=

#### Options to configure the mount's Object Mount subsystem

On the left hand-side of the `mount` verb, you can specify options that are specific to the Object Mount subsystem.

```
cuno -o <Object Mount option> mount ...
```

```
export CUNO_OPTIONS="<Object Mount option>"
```

Some relevant Object Mount options are given below. Refer to {ref}`user-guide-config-options` for more information.

:::{note}
These options must come BEFORE the verb `mount`.
:::

``` 
.. list-table:: Object Mount options relevant to mount
   :widths: 40 60
   :header-rows: 1

   * - Object Mount option
     - Description
   * - ``cachehome=<directory>`` (default: :code:`/cunodb;/dev/shm;/tmp/cache/cuno`)
     - This option allows you to set a semicolon-delimited list of directories to consider for caching. This is for the internal metadata cache of the Object Mount process behind the mount. Note that the FUSE cache is separate from this cache.

       Example:

       .. code-block:: console

          cuno -o cachehome=/mnt/cache;/cunodb;/dev/shm mount <mount-path>

   * - ``uid=<integer>``
     -  Define the default user ownership of files and directories within a bucket. These are the UIDs that the Object Mount subsystem will feed to the FUSE mount for non-POSIX (core file access) buckets. Not recommended for most use cases, but may be useful if mounting non-POSIX buckets in the same mount as POSIX buckets. **Ignored** if the bucket has an enabled POSIX tag.

        Example:

        .. code-block:: console

          cuno -o uid=$(id -u <username>) mount <mount-path>

        To enforce these settings, use the FUSE mount option ``-o default_permissions``.
   * - ``gid=<integer>``
     - Define the default group ownership of files and directories within a bucket. These are the GIDs that the Object Mount subsystem will feed to the FUSE mount for non-POSIX (core file access) buckets.  Not recommended for most use cases, prefer to use POSIX file access. Not recommended for most use cases, but may be useful if mounting non-POSIX buckets in the same mount as POSIX buckets. **Ignored** if the bucket has an enabled POSIX tag.

       Example:

       .. code-block:: console

         cuno -o gid=$(id -g <username>) mount <mount-path>

       To enforce these settings, use the FUSE mount option ``-o default_permissions``.
   * - ``filemode=<octal>``
     - Define the default file access permission bits of files within a bucket. Supply the octal (numeric) representation of the permissions you want to apply. These are the permissions that the Object Mount subsystem will feed to the FUSE mount for non-POSIX (core file access) buckets.  Not recommended for most use cases, but may be useful if mounting non-POSIX buckets in the same mount as POSIX buckets. **Ignored** if the bucket has an enabled POSIX tag.

       For example, to set the default file access permission bits to 0770 (``-rwxrwx---``), use the following command:

       .. code-block:: console

         cuno -o filemode=0770 mount <mount-path>

       To enforce these settings, use the FUSE mount option ``-o default_permissions``.
   * - ``dirmode=<octal>``
     - Define the default file access permission bits of directories within a bucket. Supply the octal (numeric) representation of the permissions you want to apply. These are the permissions that the Object Mount subsystem will feed to the FUSE mount for non-POSIX (core file access) buckets. Not recommended for most use cases, but may be useful if mounting non-POSIX buckets in the same mount as POSIX buckets. **Ignored** if the bucket has an enabled POSIX tag.

       For example, to set the default file access permission bits to 0770 (``drwxrwx---``), use the following command:

       .. code-block:: console

         cuno -o filemode=0770 mount <mount-path>

       To enforce these settings, use the FUSE mount option ``-o default_permissions``.

```

(user-guide-cuno-mount-fuse-options)=

#### FUSE options

On the right hand-side of the `mount` verb, you can also specify options that are specific to the FUSE mount operation. These options are passed on to `fum` ( [fusermount3](https://www.man7.org/linux/man-pages/man8/mount.fuse3.8.html)).

```
cuno mount [FUSE option] ...
```

:::{note}
These options must come AFTER the verb `mount`.

Some of these are provided using the same `-o` syntax as the `cuno -o` options, but they are not the same.
:::

``` 
.. list-table:: FUSE mount options
   :widths: 40 60
   :header-rows: 1

   * - FUSE option
     - Description
   * - ``-o allow_root``
     - Allows root access to the mount; required for `SUID <https://www.redhat.com/sysadmin/suid-sgid-sticky-bit>`_ permissions.
   * - ``-o allow_other``
     - Allows other users to access the mount; requires ``user_allow_other`` in ``/etc/fuse.conf``.
   * - ``-o default_permissions``
     - Enable permission checking by the kernel. To use Enforced POSIX, use ``--posix``, which will set this internally.
   * - ``-o auto_unmount``
     - Automatically unmounts the mount when the process terminates.
   * - ``-o ro``
     - Mounts the file system read-only.

       To achieve a read-only mount through Object Mount, you can alternatively use ``cuno mount --posix`` and change the permissions on dirs/files in the mount manually to read-only using ``chmod``.

       See `here <https://www.man7.org/linux/man-pages/man8/mount.8.html>`_ for more on standard mount options like ``ro``, ``rw``, etc.
   * - ``-o rw`` (default)
     - Mounts the file system read-write.
   * - ``-o exec`` (default)
     - Allow execution of binaries on the file system.
   * - ``-o noexec``
     - Disallow execution of binaries on the file system.
   * - ``-o clone_fd``
     - Uses a separate fuse device fd for each thread (may improve performance).
   * - ``-o max_idle_threads``
     - The maximum number of idle worker threads allowed (default: 10).
   * - ``-s``
     - Run in single-threaded mode.
   * - ``-f``
     - Run in the foreground.
   * - ``-o debug``
     - Enable debug output (implies ``-f``).
   * - **FUSE kernel default attributes**
     -
   * - ``-o uid=N``
     - Sets the file owner of all mounted files/dirs to the specified user ID. These are the UIDs that the FUSE mount will expose to the user. This will ignore any cuonFS POSIX settings including the bucket tag. To enforce these settings, use the FUSE mount option `-o default_permissions`.
   * - ``-o gid=N``
     - Sets the file group of all mounted files/dirs to the specified group ID. These are the GIDs that the FUSE mount will expose to the user. This will ignore any cuonFS POSIX settings including the bucket tag. To enforce these settings, use the FUSE mount option `-o default_permissions`.
   * - ``-o umask=M``
     - Sets the file permissions (octal) of all mounted files/dirs. These are the permissions that the FUSE mount will expose to the user. This will ignore any cuonFS POSIX settings including the bucket tag. To enforce these settings, use the FUSE mount option `-o default_permissions`.
   * - **FUSE kernel cache configuration**
     -
   * - ``-o kernel_cache``
     - This method caches file data across ``open``; i.e. disables flushing of the file data cache on every ``open``. Without this option (and neither ``direct_io``), data is cached before the next ``open`` so a ``read``  syscall may not initiate a ``read`` operation.
   * - ``-o auto_cache``
     - Enables automatic flushing of the data cache on open(). The cache is only flushed if the modification  based on modification times (off).
   * - ``-o entry_timeout=T``
     - Sets the kernel cache timeout for names (1.0s).
   * - ``-o negative_timeout=T``
     - Sets the kernel cache timeout for a negative lookup (file not found) (0.0s).
   * - ``-o attr_timeout=T``
     - Sets the kernel cache timeout for attributes (1.0s).
   * - ``-o ac_attr_timeout=T``
     - Sets the kernel cache timeout for checking if ``-o auto_cache`` should flush file data on ``open``.
```

% * - ``-o max_read=N``

% - Set maximum size of read requests (default is infinite).

% * - ``-o hard_remove``

% - Immediate removal (don't hide files).

% * - ``-o use_ino``

% - Use inode numbers.

% * - ``-o readdir_ino``

% - Try to fill in d_ino in readdir.

% * - ``-o direct_io``

% - Use direct I/O.

(user-guide-unmount)=

#### Object Mount Mount commands

Once a Object Mount Mount is set up, you can use the following commands to manage it.

``` 
.. list-table:: Object Mount Mount commands
   :widths: 40 60
   :header-rows: 1

   * - Command
     - Description
   * - ``--list``
     - Lists your active Object Mount Mounts. You can also the use the Linux utility ``mount`` directly.

       Example usage:

       .. code-block:: console

          cuno mount --list
   * - ``--unmount`` / ``-u``
     - Unmounts a Object Mount Mount from the specified mount path. You can also use the Linux utility ``umount`` directly.

       Example usage:

       .. code-block:: console

          cuno mount --unmount <path to mount>
   * - ``--unmount-kill`` / ``-U``
     - Unmounts a Object Mount Mount from the specified mount path and kills the fum process. You can also use the Linux utility ``umount`` directly.

       Example usage:

       .. code-block:: console

          cuno mount --unmount-kill <path to mount>
```

(user-guide-mount-on-boot)=

#### Mount on boot

You can add mount commands to `/etc/fstab` to automount on start up.

(user-guide-Object Mount-flexmount)=

## Object Mount FlexMount

Object Mount FlexMount is for when the speed of direct interception is preferred whenever it is possible to use, but wider-support for different contexts and types of applications is also required.

FlexMount is used by setting up a Object Mount Mount and then accessing the cloud using Object Mount CLI always "through" the mount path. Object Mount will recognise that the path is a mount and use direct interception where possible for faster access. It will naturally fall back to the Object Mount Mount for anything that cannot be directly intercepted.

### Usage

A FlexMount is set up as follows:

1. First, set up a Object Mount Mount, with a `cloudroot` set:

   ```console
   $ mkdir "$HOME/my-object-storage"
   $ cuno mount "$HOME/my-object-storage"
   ```

2. Each time a Object Mount CLI is launched, use the parameters `--flex ="<full path to mountpoint>"`, for example:

   ```console
   $ cuno --flex "$HOME/my-object-storage"
   (cuno) $ ls $HOME/object_storage_mount/s3/<bucket>/<path>
   ```

   :::{warning}
   You cannot use a tilde `~` in your `CUNO_OPTIONS` or `cuno -o` CLI options when setting up a FlexMount as this is something that the shell needs to resolve. You may still use it for your `cuno mount` commands, and subsequent FlexMount operations (such as `ls ~/my-object-storage`).
   :::

The same FlexMount can be re-used across multiple Object Mount wrapped shells.

The `-flex` option can also be used with `cuno run` to run a single command/script with Object Mount enabled, for example:

```console
cuno run --flex "$HOME/my-object-storage" bash -c "touch $HOME/object_storage_mount/s3/<bucket>/newfile"
```

The `-flex` option is synonymous with the `-o cloudrootover=exact -o cloudroot="<mountpoint>"` option, which is used to tell Object Mount to intercept paths that exactly match the cloudroot setting, and to handle them using the Object Mount Mount.

When using Object Mount Direct Inteception in FlexMount mode, most "local" paths are intercepted but not actioned upon, because they can be handled by the local file system. The `cloudrootover` setting is telling Object Mount to intercept local paths that match the cloudroot setting, and to prioritise itself handling them over the mount. This means that whenever a path is recognised as the cloudroot, it can be more efficiently handled in user-space by the Direct Inteception/`LD_PRELOAD` library. That path recognition can be done in two ways:

- (default) Exact string matching (`exact`) will match the cloudroot setting exactly. This is faster, and will end up relying on the FUSE mount whenver the paths don't match the cloudroot - for example with symbolic links located outside the mount pointing into the mount.

- Resolved path matching (`resolve`) will resolve the full path given in a file system call including symbolic links to check if the file is ultimately located inside the mount point. This requires more calls for every path-based file system call, so is slower when many files are being accessed. It is useful when symbolic links are used to point into the mount, and other cases where the path ultimately is inside the mount. This can be more efficient in some special cases (few files, large transfers, complex relationships between files) as `cuno.so` will intercept more calls without requiring them to go through the slower FUSE mount.

  To use resolve mode use the parameters `-o cloudrootover=resolve -o cloudroot="<full path to mountpoint>"`, for example:

  ```console
  $ cuno -o cloudrootover=resolve -o cloudroot="$HOME/my-object-storage"
  (cuno) $ ls $HOME/object_storage_mount/s3/<bucket>/<path>
  ```

% You can also use the ``--flex`` option when *mounting* to both mount and launch a Object Mount-enabled shell with the correct options/parameters. This can be helpful when repeatedly using the same mount location, as the mount will be created if it's not already present, but the mount will not be re-created if it already exists.

% .. warning::

% The mount is not unmounted when the shell is exited, so this method is not suitable for arbitrary use.

% .. code-block:: console

% $ cuno mount --flex "$HOME/my-object-storage"

% (cuno) $ ls ``$HOME/my-object-storage/s3/<bucket>/<path>``

### Advantages

1. Speed: where interception is possible, Object Mount in FlexMount mode will be as fast as Object Mount
2. Support: support for all POSIX applications, as anything that cannot be directly intercepted falls through to the Object Mount Mount.

### Disadvantages

1. Set up time: a Object Mount Mount needs to be set up. Consider {ref}`setting up the mount at boot <user-guide-mount-on-boot>`.
2. Launch is more complicated: each time a Object Mount shell is launched it must be configured to use the mount. This can be worked around by setting up a Object Mount mount on boot, and setting an alias to launch a Object Mount shell with the correct parameters.
