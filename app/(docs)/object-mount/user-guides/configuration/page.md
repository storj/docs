(user-guide-config-options)=

# Configuration options

## CUNO_OPTIONS

### Overview

Setting the environment variable {code}`CUNO_OPTIONS` can be used to further configure cunoFS. The -o option on the {code}`cuno` command can also be used to specify these options.

Options available for {code}`CUNO_OPTIONS`:

@CUNO_OPTIONS@

:::{note}
Individual options must be separated by spaces. Don't forget to enclose multiple options in quotes ({code}`"` or {code}`'`), or to escape spaces.
:::

(cunostaticconf)=

### The static option

To use cunoFS with static binaries, the *parent process* needs to be intercepted in static mode. Interception of static binaries is enabled by default; to disable it requires setting both `CUNO_OPTIONS="-static"` and starting a new cunoFS wrapped shell.

(cunouricompatconf)=

### The uricompat option

cunoFS can override the handling of URI-style paths ({code}`xx://`) in applications that attempt to provide internal handling of such URIs. Users may provide the {code}`+uricompat` option to add similar patching for further applications.

To specify any applications to be patched, specify them as a colon-separated list:

```console
+uricompat=<executable 1>:<exectuable 2>:< ... >
```

To limit the cases in which this patching occurs, you can filter interceptions to only occur when certain command-line arguments match specified keywords. This may be useful for certain code interpreters/executors (see the {ref}`example <user-guide-uricompat-java>` below). To do this, in place of an executable name, use a slash-separated list of the name, a 1-based index of the argument to be matched (or any using `*`), and a value to match against:

```console
+uricompat=<name of binary>/<index of argument to be matched>/<argument value to match>
```

:::{note}
The {code}`+uricompat` option only works on URIs that have been paired.

If you are working with a public access bucket, you will need to run the {code}`cuno creds pair` command (see {ref}`user-guide-pair-containers`) against it for the {code}`+uricompat` to take effect.
:::

#### Applications with patched URI handling

By default, cunoFS will attempt to override the internal URI handling of popular tools, such as:

- `rsync`
- `ffmpeg`
- `tar`

And some genomics tools:

- `samtools`
- `igv`
- `fastQC`

This means that when a URI-style path (corresponding to a {ref}`paired bucket or container <user-guide-pair-containers>`) is passed to any of the applications above, cunoFS will prevent the application from handling the path in a special way.

For example, `fmpeg` has special handling for some [protocols](http://ffmpeg.org/ffmpeg-protocols.html#Protocols) which they specify in a similar URI format to cunoFS URI cloud paths (e.g. `ftp://example.foo`). As a result, cunoFS needs to prevent {code}`ffmpeg` from failing (when given a path like `s3://bucket/file`) because `s3`, `az` and `gs` are not protocols it supports.

(user-guide-uricompat-java)=

#### Example

To override a Java application’s handling of URI-style paths, we may use:

```console
export CUNO_OPTIONS="+uricompat=java/2/appname.jar:java/*/org.name.main.Class"
```

This will intercept any invocation of `java` with {code}`appname.jar` as its second argument, e.g. {code}`java -jar appname.jar s3://bucketname/file.bam`. It will also intercept invocations of Java where any argument is equal to {code}`org.name.main.Class`, e.g. {code}`java org.name.main.Class s3://bucketname/file.bam`.

(user-guide-cloudroot)=

### The cloudroot option

You may define a custom directory path prefix to replace the default {code}`/cuno` path (see :ref:\`\` ). Once defined, the path specified will be made available at the root of the file system. For example, if you configure the following:

```console
export CUNO_OPTIONS='+cloudroot=my-object-storage'
```

You will then be able to list your configured S3 buckets with:

```console
ls /my-object-storage/s3/<bucket>
```

:::{warning}
We strongly recommend that the cloudroot path does not exist locally, because it can confuse cunoFS's ability to distinguish whether a path refers to the local file system or to the cloud.

If you specify a cloudroot which conflicts with an existing directory, then it must not contain directories or files named `s3`, `az` or `gs`.
:::

:::{note}
In order for the "cd to cloud" functionality to see this option, you will need to spawn a new shell after {code}`CUNO_OPTIONS`.
:::

#### FlexMount usage

Setting a cloudroot during the mounting process can affect the options required to be set when using it as a FlexMount.

**Recommended option** If cloudroot was not set when creating the mount (e.g. `cuno mount ~/my-object-storage`), then cloudroot needs to be set as the path to the mountpoint when launching cunoFS CLI in order to use that mount as a FlexMount (e.g. `cuno -o cloudrootover -o cloudroot="<full-path-to-mountpoint>"`).

In some circumstances, you may need to set a cloudroot when creating the mount (for example, if a `/cuno` directory already exists on your systems). In these cases, we strongly recommend migrating or removing any such physical directory so that you can continue to use the default settings. If this is not possible, there are a number of options available.

**Recommended option if cloudroot must be changed** If a cloudroot needs to be set when creating the mount, then you should set the `--root` option to the same cloudroot to get expected behaviour when using cunoFS FlexMount (e.g. `cuno -o cloudroot=/altcloudroot mount $HOME/my-object-storage --root /altcloudroot`). In this case, continue to use the same options when launching cuno (e.g. `cuno -o cloudrootover -o cloudroot="<full-path-to-mountpoint>"`) to access the mount as a FlexMount.

In very limited circumstances, it is not possible to choose a cloudroot that can also be used as the `--root` of the mount point (for example, if the cloudroot is chosen to be somewhere that is not mountable). In this case, we would advise you to choose a different cloudroot, one that can be mounted (such as a position within your user home directory e.g. `cuno -o cloudroot=$HOME/mycloudroot mount $HOME/my-object-storage --root $HOME/mycloudroot`). If this is not possible, then there are two options:

**Highly discouraged** If a cloudroot needs to be set when creating the mount, and the `--root` option is set to a path within the cloudroot (e.g. `cuno -o cloudroot=/altcloudroot mount $HOME/my-object-storage --root /altcloudroot/s3/mybucket`), then, when using the FlexMount later, one must set the 'cloudrootover' path as so: `cuno -o cloudroot=/altcloudroot -o cloudrootover=$HOME/my-object-storage`. Important: always check that the mount point exposes the cloud at the same point when used directly as a cunoFS Mount (so outside of a cunoFS CLI instance) and when accessed as a FlexMount.

:::{warning}
cunoFS behaviour will be broken and dangerous if you do not set the correct options when launching cunoFS CLI to this type of FlexMount. For example, in this case if the default parameters for launching a FlexMount are used, namely `cuno -o cloudrootover -o cloudroot=$HOME/my-object-storage`, then applications that are intercepted directly will see `$HOME/my-object-storage` as the cloudroot (so the immediate children are `az gs s3`) whereas any applications that fall through to the cunoFS Mount (static binaries, cloud binaries, SUID binaries, Snap apps, AppImage apps, and Flatpak apps) will see `$HOME/my-object-storage` as the bucket or directory specified as the `--root`. This could cause a loss of data, accidentally expose data in the wrong place or other misbehaviour when running scripts.
:::

**HIGHLY discouraged** If a cloudroot needs to be set when creating the mount, and it is not possible for '--root' to be set to a path within the cloudroot (i.e. `cuno -o cloudroot=/altroot mount $HOME/my-object-storage --root /`), then, when using the FlexMount later, one must set the cloudroot as so: `cuno -o cloudrootover -o cloudroot=$HOME/my-object-storage/my/cloud/root`.

:::{warning}
cunoFS behaviour will be broken and dangerous if you do not set the correct options when launching cunoFS CLI to this type of FlexMount. For example, in this case if the default parameters for launching a FlexMount are used, namely `cuno -o cloudrootover -o cloudroot=$HOME/my-object-storage`, then applications that are intercepted directly will see `$HOME/my-object-storage` as the cloudroot (so the immediate children are `az gs s3`) whereas any applications that fall through to the cunoFS Mount (static binaries, cloud binaries, SUID binaries, Snap apps, AppImage apps, and Flatpak apps) will see `$HOME/my-object-storage` as `/` - the root of your local filesystem. This could cause a loss of data, accidentally expose data in the wrong place or other misbehaviour when running scripts.
:::

(user-guide-ownership-and-permissions)=

## Ownership and Permissions

### Core File Access

In {ref}`Core File Access <getting-started-core-file-access>` mode, and for files in object storage uploaded using tools other than cunoFS, we have some dynamic defaults set for ownership and permissions. In these circumstances, the owner of cloud objects is always reported to be the current user, the directory mode is reported as `0777`, and the file mode is reported as `0666`.

The defaults can be overridden by using the {code}`uid`, {code}`gid`, {code}`filemode` and {code}`dirmode` options within the {code}`CUNO_OPTIONS` environment variable. By doing so, an administrator can set the default UID/GID and access mode permissions that apply to all files and directories of cloud storage accessed by cunoFS. This might be considered in circumstances where an application starts as one user, but mid-process switches context to run as another; services like web-servers often function in this way.

To demonstrate this in action, you could run the following:

```console
$ cuno -o 'uid=0 gid=0 filemode=0444 dirmode=0447' \
  mount --root s3://examplebucket/directory/ /mnt/s3-bucket

$ ls -l /mnt/s3-bucket
dr--r--rwx  1 root root 0 Jan  1  1970 directory
-r--r--r--  1 root root 0 Nov 10 11:16 file
```

While the default UID/GID and access mode permissions can be set ahead of time, they cannot be later modified.

(user-guide-posix-file-access)=

### POSIX File Access

To persist and modify file system metadata, {ref}`POSIX File Access <getting-started-posix-file-access>` must be enabled. This allows the virtual files presented by cunoFS to have their system metadata modified by tools such as {code}`chown`, {code}`chmod`, and {code}`touch`.

:::{note}
The system metadata is stored as objects within your object storage system within hidden subdirectories where the data resides. The name of that subdirectory is a period followed by a unicode U+FBF80 `󻾀` character.

From within cunoFS you will not see that directory or objects inside of it, as cunoFS filters them from view; however, accessing your object storage using other tools, they will be visible.

Non-cunoFS access which renames, moves or copies objects with cunoFS file attributes, will result in those objects losing their system metadata. You will need to use cunoFS to manage those files and preserve their attributes.
:::

#### Enabling for Direct Interception

There are two ways to enable POSIX File Access when using {ref}`Direct Interception via cunoFS CLI <user-guide-direct-interception>`:

(user-guide-using-a-bucket-tag)=

##### Using a bucket tag

:::{note}
The following permissions are required to use the {code}`cuno creds setposix` command:

- S3-compatible: {code}`s3:PutBucketTagging` and {code}`s3:GetBucketTagging`
- Google Cloud Storage: {code}`storage.buckets.update` and {code}`storage.buckets.get` IAM permissions
- Azure Blob Storage: Only the container owner may set labels
:::

This setting toggles POSIX mode on for the bucket and takes precedence over the {code}`CUNO_POSIX` environment variable.

```console
cuno creds setposix s3://examplebucket true
```

Valid options are:

- `true` - enable posix in enforcing mode, preventing unauthorized access.
- `false` - disable posix
- `permissive` - enable posix in permissive mode, where object attributes like uid, gid, mode, timestamps are stored but user access privilege is not checked
- `metadata` - enable posix in enforcing mode and store posix attributes as object metadata (only on S3)
- `permissive-with-metadata` - enable posix in permissive mode and store posix attributes as object metadata
- `unset` - remove posix configuration from the bucket

The {code}`cuno creds setposix` command writes a tag to the bucket's metadata on the bucket store. The setting set by this command applies to all users using the bucket through cunoFS.

:::{warning}
Some S3-compatible stores may not support setting custom metadata flags required for this feature to function. If this is the case for you, you can still use the `--posix` flag to enable POSIX enforcement when starting a cunoFS Mount. You can also still use the `CUNO_POSIX` environment variable to enable it for a Direct Interception session. If these methods are not satisfactory or preferable, please get in contact at [support@cuno.io](mailto:support@cuno.io).
:::

To unset the bucket-level setting and allow controlling POSIX mode using either the {code}`CUNO_POSIX` environment variable or the {code}`--posix` command line flag, use {code}`cuno creds setposix` with a setting of `unset`:

```
cuno creds setposix s3://examplebucket unset
```

##### Using the CUNO_POSIX environment variable

If POSIX mode is not set at the bucket level, it may be enabled by setting the environment variable {code}`CUNO_POSIX` to `1`. If POSIX is enabled for the bucket via a tag, it cannot be overridden with this environment variable.

For example, to enable POSIX mode for a Direct Interception session via cunoFS CLI, do:

```
$ export CUNO_POSIX=1
$ cuno
```

This mode is suitable for when you need deeper POSIX compatibility in order to correctly run applications or workflows. For example, a tool such as `rsync` may be checking `mtime` in order to check for updates to a file so you will need to be preserving such attributes on the object storage side.

:::{note}
This is not "secure" in the sense that Direct Interception mode requires the user to have access to object storage credentials so they can work around any access limitations by using the credentials directly with other tools (such as awscli).
:::

(cunopermissionctl)=

#### Enabling POSIX for a cunoFS Mount

If a bucket doesn't have POSIX mode already set, you can use the option {code}`--posix` when mounting a {ref}`cunoFS Mount <user-guide-cunofs-mount>` to enable fine-grained control over ownership and permissions and have them enforced. If a bucket's POSIX mode tag is set, but the {code}`--posix` flag is not, the bucket's setting will apply but the permissions will not be enforced by the mount.

If you are mounting for yourself and others, mount the bucket in a location that is accessible to the users who need access to the files. This can be a shared location, or a location that is only accessible to the user who needs access.

If setting up the mount as an admin user, to allow for sudo access, please use the `-o allow_root` flag, and to allow other users to access the mount as themselves plase use `-o allow_other`.

```console
$ cuno mount --posix -o allow_root -o allow_other --root s3://mybucket /mnt/cloud/bucket
```

Users will now be able to see the files in the bucket at `/mnt/cloud/bucket`. You should now treat this as any other POSIX file system, and set permissions as you need to control access.

(user-guide-posix-examples)=

#### Usage examples

Assuming a mount location of `/mnt/s3-bucket`:

- Change permissions on the object/file:

  ```console
  $ chmod 0770 /mnt/s3-bucket/file
  $ ls -l /mnt/s3-bucket/file
  -rwxrwx---  1 root  root 0 Nov 10 11:16 file
  ```

- Change the owner of the object/file:

  ```console
  $ chown alice /mnt/s3-bucket/file
  $ ls -l /mnt/s3-bucket/file
  -rwxrwx---  1 alice root 0 Nov 10 11:16 file
  ```

% #. Add an additional access control entry to the object:

% .. code-block:: console

% $ setfacl --modify bob:rwx /mnt/s3-bucket/file

% $ ls -l /mnt/s3-bucket/file

% -rwxrwx---+ 1 alice root 0 Nov 10 11:16 file

% $ getfacl /mnt/s3-bucket/file

% # file: file

% # owner: alice

% # group: root

% user::rwx

% user:bob:rwx

% group::rwx

% other::---

- Alter the modify time:

  ```console
  $ echo "Hello" > /mnt/s3-bucket/file
  $ ls -l /mnt/s3-bucket/file
  -rwxrwx---+ 1 alice root 6 Nov 10 11:32 file
  ```

- Alter the change time:

  ```console
  $ chmod +x /mnt/s3-bucket/file
  $ stat /mnt/s3-bucket/file
  File: /mnt/s3-bucket/file
  Size: 6               Blocks: 1          IO Block: 65536  regular file
  Device: 49h/73d Inode: 4           Links: 1
  Access: (0770/-rwxrwx---)  Uid: ( 1009/   alice)   Gid: ( 0/    root)
  Access: 2021-11-10 11:32:59.185000000 +0000
  Modify: 2021-11-10 11:32:59.185000000 +0000
  Change: 2021-11-10 11:47:21.846000000 +0000
  ```

```{raw} pdf
PageBreak oneColumn
```

:::{only} dev
```{eval-rst}
.. cssclass:: devnote

    Hardlink Options

    .. note::

      Currently the feature is disabled at startup.

      The feature is enabled by :code:`CUNO_OPTIONS=+hardlink` which enables local-local and local-cloud features for virtualized genomic file types.

    The following options allow more fine-grained control:

    .. cssclass:: listtable43mm

      .. list-table::
        :header-rows: 0

        * - :code:`-hardlink` / :code:`+hardlink=off`
          - Turns off the feature.
        * - :code:`+hardlink=virtual`
          - Attempts to hardlink local drive virtual files are supported by creating hard links to the backing files that echo the request.
        * - :code:`+hardlink=copyvirt`
          - Performs as :code:`+hardlink=virtual` and in addition virtual files instanced on a different device (e.g. NAS) will be copied if the hardlink fails. Symlink targets are reinstanced.
        * - :code:`+hardlink=symcloudvirt` (default)
          - Performs as :code:`+hardlink=copyvirt` and in addition attempts to hardlink virtual file from local to assets on the cloud are implemented as softlinks.
        * - :code:`+hardlink=symcloudall`
          - Performs as :code:`+hardlink=symcloudvirt` and in addition attempts to hardlink any other file from local to cloud will be implemented as softlinks even if the type is not recognised.
        * - :code:`+hardlink=copycloudvirt`
          - Performs as :code:`+hardlink=symcloudall` and in addition attempts to hardlink virtual file from a cloud location to another cloud location (on the same device) cause a copy of the backing files to be made.
        * - :code:`+hardlink=copycloudall`
          - Performs as :code:`+hardlink=copycloudvirt` and in addition attempts to hardlink any other file from a cloud location to another cloud location (on the same device) cause a copy to be made.
```
:::

## Other Environment Variables

### CUNO_CREDENTIALS

The environment variable {code}`CUNO_CREDENTIALS` allows you to customise the location of the cunoFS credentials store, and is elaborated upon in {ref}`user-guide-credentials-management`.

### Proxy server tunneling

cunoFS supports HTTP and HTTPS proxying access through to your cloud object storage.

Provide the environment variable {code}`http_proxy` or {code}`https_proxy` with your gateway and cunoFS will tunnel all transactions through your designated proxy.

### Verbose Debug Output

There are rare occasions where cunoFS will output to the command line, and this will generally indicate a fault.
All messages will be prefixed with {code}`cuno:` and these will always be sent a to the standard error stream ({code}`stderr`).

The options available for {code}`CUNO_LOG` are cumulative and build on the previous level:

> ```{eval-rst}
> .. cssclass:: listtable43mm
>
>   .. list-table::
>     :header-rows: 0
>
>     * - :code:`error`
>       - At this level, only critical failures are output. (Default)
>     * - :code:`warning`
>       - At this level, errors and warnings are output.
>     * - :code:`debug`
>       - At this level, information relevant to debugging will be output.
>     * - :code:`trace`
>       - At this level, a verbose logging of all steps will be output.
> ```

For example, a directory listing with the trace level set, can output similar to the below:

```
$ CUNO_LOG=trace ls s3://example-bucket
cuno: [TRACE][01/02/21 08:39:07.39][Thread: 3817873920] Trying bucket store at: /home/user/.config/cuno/creds/...
cuno: [TRACE][01/02/21 08:39:07.40][Thread: 3817873920] Loading S3Client
cuno: [DEBUG][01/02/21 08:39:07.40][Thread: 3817873920] Not On EC2
cuno: [TRACE][01/02/21 08:39:07.40][Thread: 3817873920] Attempting to find CaCerts.
cuno: [DEBUG][01/02/21 08:39:07.40][Thread: 3817873920] Using Certs: /etc/ssl/certs/ca-certificates.crt
cuno: [TRACE][01/02/21 08:39:07.40][Thread: 3817873920] Attempting to load PGMAN
cuno: [DEBUG][01/02/21 08:39:07.40][Thread: 3817873920] Using custom Endpoint: http://127.0.0.1:8080
cuno: [DEBUG][01/02/21 08:39:07.40][Thread: 3817873920] Using custom pathstyle
```

There is a separate option: {code}`access` that enables detailed logging of the file access performed by cunoFS, which includes read, write, open, close, seek and similiar.
{code}`access` can be combined with the other log levels to log both file access and the desired logs. For example:

```
$ CUNO_LOG=trace,access ls s3://example-bucket
cuno: [DEBUG][07/17/23 13:59:03.287][P/T: 296181:2897806400] Not On EC2
cuno: [DEBUG][07/17/23 13:59:03.287][P/T: 296181:2897806400] Using Certs: /etc/ssl/certs/ca-certificates.crt
cuno: [ACCESS][07/17/23 13:59:03.355][P/T: 296181:2897806400] s3://example-bucket/file write() 12 @ 0
```

```{raw} pdf
PageBreak oneColumn
```
