---
title: Setting up Enforced POSIX Access
docId: Eegoo1teiJ8eerae
weight: 6
metadata:
  title: Setting up Enforced POSIX Access
  description:
    This guide represents the general process for setting up enforced POSIX access. The specific steps may vary depending on your object storage provider.
---

This guide represents the general process for setting up enforced POSIX access. The specific steps may vary depending on your object storage provider. Please contact us at [supportdcs@storj.io](mailto:supportdcs@storj.io) if this is a use-case that you are interested in and these instructions don't match your expectations or preferences.

This mode will maintain POSIX metadata for your objects, and will enforce POSIX access controls on those objects. Use this when you want to manage what users have access to based on the UID/GID of their UNIX user and the corresponding POSIX metadata (owner, group, mode) on files.

Users will encounter `access denied` errors if they try to read or write to a file/directory they haven't been given permission to (by a suitably privileged user doing `chown`, `chgrp` or `chmod`). Note that this is client-side rather than server-side enforcement, and is not enforced using server-side IAM roles or ACL lists.

See [metadata warning](../installation/enforced-posix)


{% callout type="note"  %}
We can also provide a hybrid-approach, which does both client-side access management and server-side access management through ACLs. If you need server-side ACL policies to reflect POSIX access controls, [contact us](mailto:supportdcs@storj.io).
{% /callout %}

## Key steps

1. Through your object storage provider, generate access credentials with the highest level of permissions that any user or admin could need, including permissions to [edit bucket tags](../user-guides/configuration#using-a-bucket-tag). On a public cloud supporting IAM, you set up an `admin` IAM user with such credentials.
2. The admin credentials are stored privately and are used to set up a Object Mount Mount in an accessible location.
3. Users are only told the path to the mount; they are not given access to `cuno` nor to the admin credentials.

{% callout type="warning"  %}
The approach given here is not suitable if users have the ability to create their own VMs/instances where they can set any POSIX uid/gid. In that case, consider using server-side IAM roles or ACL lists to enforce access controls, and contacting us at [supportdcs@storj.io](mailto:supportdcs@storj.io) for advice on how this integrates with Object Mount.
{% /callout %}

## Key considerations

- If multiple machines or locations are being used, it is important that user and group IDs are controlled and consistent across all machines. This is because the POSIX metadata is stored in the object storage, and Object Mount will use the same user and group IDs to present the files on all machines. If you require assistance with managing user and group IDs across multiple machines, [contact us](mailto:supportdcs@storj.io).
- Independent IAM roles or credentials for each user are not required. The admin credentials are used to set up the mount, and the users are only given access to the mount. If the user has access to object storage credentials with server-side privileges beyond this, then the user can potentially access or modify objects outside of these POSIX access controls.
- This guide assumes that the bucket to use is empty initially. If you are switching from an ACL-based approach to access management, then you will need to map existing rules to POSIX uids/gids and "apply" those ACLs through POSIX commands like `chown` and `chmod`.

{% callout type="note"  %}
We don't currently support POSIX ACLs or extended attributes on the cloud. Please get in contact with us at [supportdcs@storj.io](mailto:supportdcs@storj.io) if you need these features.
{% /callout %}

## How to set up enforced POSIX access

Assuming you have already [installed](../getting-started/download-install) Object Mount, the following steps will guide you through setting up enforced POSIX access for the users in a generic POSIX-based system.

### Import your admin credentials

Follow the steps in [user-guide-import-credentials](../user-guides/credentials#import-credentials) to import your admin credentials.

You will need to have run `cuno creds import <file containing admin credentials>`. After importing, you should ensure that any credentials files have been created (usually in `${XDG_CONFIG_HOME}"/cuno/creds` or `~/.config/cuno/creds`) with appropriately strict permissions so that non-admin cannot read them.

### Tag the bucket

We check a [bucket tag](../user-guides/configuration#using-a-bucket-tag) when Object Mount tries to access a bucket to check the POSIX enforcement settings. If your bucket or object storage provider does not support tags on buckets, 
you can skip this step and proceed to [enforced-posix-mounting](../getting-started/enforced-posix-access#mount-the-bucket).

NB: You will need to set the ``--posix`` flag every time you run ``cuno mount``.

Use `cuno creds setposix <uri of bucket> true` to set the bucket tag which will automatically enable POSIX File Access whenever this bucket is accessed by any Object Mount installation. This will affect everyone using the bucket and force all Object Mount users of that bucket into enforced POSIX compatability mode. Example:

```shell
# terminal
cuno creds setposix s3://mybucket true
```

On the `true` setting, this mode stores hidden subdirectories inside your object storage directories describing the POSIX metadata (owner/group permissions, change/modify times, etc.) for each file in the directory. This allows Object Mount to present the files in a way that is compatible with POSIX file access semantics.

If you are on S3, to additionally store the POSIX metadata as object metadata on each individual file in the bucket, use `cuno creds setposix <uri of bucket> metadata`. We don't normally recommend this, 
as it will slow down Object Mount. For more information, see [user-guide-posix-file-access](../user-guides/configuration#posix-file-access)

{% callout type="note"  %}
When a bucket tag enabling POSIX File Access is set, Object Mount Direct Interception, along with any Object Mount Mounts/FlexMounts are compelled to operate in POSIX mode while accessing the bucket. However, the mounts will not be able to enfroce POSIX access without the additional `--posix` flag at mount time.

However, Object Mount Direct Interception necessitates read access to object storage credentials, or some other user-accessible way to authenticate with the object storage (e.g. an IAM role on EC2). This implies that Direct Interception is not appropriate for enforcing POSIX, as users can easily circumvent this by using the accessible credentials or IAM role with a tool other than Object Mount (such as awscli or directly through an S3 API library). Since FlexMounts are dependent on Object Mount Direct Interception, they are also unsuitable for use-cases that require POSIX enforcement.
{% /callout %}

### Mount the bucket

Mount a bucket in a location that is accessible to the users who need access to the files. This can be a shared location, or a location that is only accessible to the user who needs access. In this guide, we will use a shared location, `/mnt/cloud/bucket`, as the mount point.

When setting up the mount as an admin user, to allow for sudo access, please use the `-o allow_root` flag, and to allow other users to access the mount as themselves plase use `-o allow_other`.

```console
$ cuno mount --posix -o allow_root -o allow_other --root s3://mybucket /mnt/cloud/bucket
```

Users will now be able to see the files in the bucket at `/mnt/cloud/bucket`, and POSIX permissions persisted by Object Mount for files in that bucket will be respected. You should now treat this as any other POSIX file system, and set permissions as you need to control access.

## Common patterns

Below are some common behaviours and patterns that you might want to implement when using enforced POSIX access. For more examples, see [user-guide-posix-examples](../user-guides/configuration#usage-examples).

### Setting default permissions for new files

On POSIX systems, you would normally do this using `umask`. To determine the umask value you want to set, subtract the value of the permissions you want from `666` (for a file) or `777` (for a directory).

For example, if `user1` wants the default permissions on new files to be `rw-r--r-- 644`, they would subtract `644` from `666`, giving `022`.

```console
$ umask 022
$ touch /mnt/cloud/bucket/user1/newfile
$ ls -l /mnt/cloud/bucket/user1/newfile
-rw-r--r-- 1 user1 group1 0 Mar  1 12:00 /mnt/cloud/bucket/user1/newfile
```

If you want to set the umask for all users, you can set it in the system-wide profile, or in the user's profile. For example, to set it for all users, you could add the umask command to `/etc/profile`.

### Converting a bucket to POSIX enforced mode

If you have an existing storage location, for which you now need to implement POSIX-based access controls, you can simply set the bucket tag as in [enforced-posix-guide-tag-bucket](../getting-started/enforced-posix-access#tag-the-bucket). This will not affect any existing files until they or their directories are accessed, and will ensure that any new files are stored with POSIX metadata.

To control access to any particular files or directories, proceed with `chown`, `chgrp` and `chmod` as you would on a POSIX file system. For example, to limit access to `/mnt/cloud/bucket/directory` to only allow `user1`, you could do:

```console
$ chown -R user1 /mnt/cloud/bucket/directory
$ chgrp -R group1 /mnt/cloud/bucket/directory
$ chmod -R 700 /mnt/cloud/bucket/directory
```

As a result of these commands, only `user1` will be able to access the directory and its contents across all systems using Object Mount.

You can check the POSIX metadata for a file or directory using `ls -l` or `stat`. For example:

```console
$ ls -l /mnt/cloud/bucket/directory
drwx------ 1 user1 group1 0 Mar  1 12:00 /mnt/cloud/bucket/directory
$ stat /mnt/cloud/bucket/directory
File: /mnt/cloud/bucket/directory
Size: 0             Blocks: 0          IO Block: 4096   directory
Device: 1ch/28d     Inode: 123456      Links: 1
Access: (0700/drwx------)  Uid: ( 1000/  user1)   Gid: ( 1000/  group1)
Access: 2022-03-01 12:00:00.000000000 +0000
Modify: 2022-03-01 12:00:00.000000000 +0000
Change: 2022-03-01 12:00:00.000000000 +0000
 Birth: -
```

### Setting inherited permissions on a directory

{% callout type="warning"  %}
Support for POSIX ACLs is coming soon. If this is a feature you need, please contact us at [supportdcs@storj.io](mailto:supportdcs@storj.io).
{% /callout %}


Use [setfacl](https://linux.die.net/man/1/setfacl) to define additional default permissions to be applied to files in a directory when they are created.

For example, an admin could create a shared space, `/mnt/cloud/bucket/shared`, for users to collaborate, and set the default permissions to allow all users and groups to read and write files in the directory:

```console
$ setfacl -m u::rwX,g::rwX,o::- /mnt/cloud/bucket/shared
```

This will result in the following behaviour:

```console
$ touch /mnt/cloud/bucket/shared/newfile
$ mkdir /mnt/cloud/bucket/shared/newdir
$ ls -l /mnt/cloud/bucket/shared/
drwxrwxr-x 1 user1 group1 0 Mar  1 12:00 /mnt/cloud/bucket/shared/newdir
-rw-rw-r-- 1 user1 group1 0 Mar  1 12:00 /mnt/cloud/bucket/shared/newfile
```
