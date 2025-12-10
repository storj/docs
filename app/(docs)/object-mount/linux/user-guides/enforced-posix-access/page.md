---
title: Enable Enforced POSIX File Access
hideTitle: false
docId: Eegoo1teiJ8eerae
weight: 4
redirects:
  - /object-mount/linux/getting-started/enforced-posix-access
metadata:
  title: Enable Enforced POSIX File Access
  description:
    This guide represents the general process for setting up Enforced POSIX File Access. The specific steps may vary depending on your object storage provider.
hidden: false
---

This guide represents the general process for setting up “Enforced POSIX File Access” mode in Object Mount for Linux. 

“Enforced POSIX File Access” mode will maintain POSIX metadata for your objects, and will enforce POSIX access controls on those objects. Use this when you want to manage what users have access to based on the UID/GID of their UNIX user and the corresponding POSIX metadata (owner, group, mode) on files.

Users will encounter `access denied` errors if they try to read or write to a file/directory they haven’t been given permission to (by a suitably privileged user doing `chown`, `chgrp` or `chmod`). Note that this is client-side rather than server-side enforcement, and is not enforced using server-side IAM roles or ACL lists.

The specific steps may vary depending on your object storage provider. Please contact the Storj 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new) if this is a use-case that you are interested in and these instructions don’t match your expectations or preferences.

{% callout type="note" %}
  **Hybrid Deployment for ACL Support**

  We can also provide a hybrid-approach, which does both client-side access management and server-side access management through ACLs. If you need server-side ACL policies to reflect POSIX access controls, contact the Storj 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new).
{% /callout %}


## Configuration Overview

From your object storage provider’s dashboard, generate access credentials with the highest level of permissions that any user or admin could need, including permissions to [edit bucket tags](../user-guides/configuration#using-a-bucket-tag). 
  - On a public cloud supporting IAM, you set up an `admin` IAM user with such credentials.
  - The admin credentials are stored privately and are used to set up a Object Mount on FUSE in an accessible location.
  - Users are only told the path to the mount; they are not given access to `cuno` nor to the admin credentials.

{% callout type="warning" %}
  **Security Considerations**
  
  The approach given here is not suitable if users have the ability to create their own VMs/instances where they can set any POSIX uid/gid. In that case, consider using server-side IAM roles or ACL lists to enforce access controls, and contacting us at our 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new) for advice on how this integrates with Object Mount.
{% /callout %}


## Key Considerations

1. If multiple machines or locations are being used, it is important that user and group IDs are controlled and consistent across all machines. This is because the POSIX metadata is stored in the object storage, and Object Mount will use the same user and group IDs to present the files on all machines. If you require assistance with managing user and group IDs across multiple machines, contact our 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new).

2. Independent IAM roles or credentials for each user are not required. The admin credentials are used to set up the mount, and the users are only given access to the mount. If the user has access to object storage credentials with server-side privileges beyond this, then the user can potentially access or modify objects outside of these POSIX access controls.

3. This guide assumes that the bucket to use is empty initially. If you are switching from an ACL-based approach to access management, then you will need to map existing rules to POSIX uids/gids and “apply” those ACLs through POSIX commands like `chown` and `chmod`.

**Note:** Object Mount does not currently support POSIX ACLs or extended attributes in cloud object storage. Contact 🌐 [Storj Support](https://supportdcs.storj.io/hc/en-us) if you need these features.


## How to Enable POSIX Enforced File Access

Assuming you have already [installed](../getting-started/download-install) Object Mount for Linux, the following steps will guide you through setting up enforced POSIX access for the users in a generic POSIX-based system.

### Step 1.Import your Admin Credentials

Follow the steps in [user-guide-import-credentials](../user-guides/credentials#import-credentials) to import your admin credentials.

You will need to have run `cuno creds import <file containing admin credentials>`. After importing, you should ensure that any credentials files have been created (usually in `${XDG_CONFIG_HOME}"/cuno/creds` or `~/.config/cuno/creds`) with appropriately strict permissions so that non-admin cannot read them.

### Step 2. Tag the Bucket

We check a [bucket tag](../user-guides/configuration#using-a-bucket-tag) when Object Mount tries to access a bucket to check the POSIX enforcement settings. If your bucket or object storage provider does not support tags on buckets, you can skip this step and proceed to [enforced-posix-mounting](../getting-started/enforced-posix-access#mount-the-bucket).

NB: You will need to set the ``--posix`` flag every time you run ``cuno mount``.

Use `cuno creds setposix <uri of bucket> true` to set the bucket tag which will automatically enable POSIX File Access whenever this bucket is accessed by any Object Mount installation. This will affect everyone using the bucket and force all Object Mount users of that bucket into enforced POSIX compatibility mode. Example:

```shell
# terminal
cuno creds setposix s3://mybucket true
```

On the `true` setting, this mode stores hidden subdirectories inside your object storage directories describing the POSIX metadata (owner/group permissions, change/modify times, etc.) for each file in the directory. This allows Object Mount to present the files in a way that is compatible with POSIX file access semantics.

If you are on S3, to additionally store the POSIX metadata as object metadata on each individual file in the bucket, use `cuno creds setposix <uri of bucket> metadata`. We don’t normally recommend this, 
as it will slow down Object Mount. For more information, see [user-guide-posix-file-access](../user-guides/configuration#posix-file-access)

{% callout type="note" %}
  **Bucket Tags**

  When a bucket tag enabling POSIX File Access is set, Object Mount Direct Interception, along with any Object Mount on FUSEs/FlexMounts are compelled to operate in POSIX mode while accessing the bucket. However, the mounts will not be able to enforce POSIX access without the additional `--posix` flag at mount time.

  However, Object Mount Direct Interception necessitates read access to object storage credentials, or some other user-accessible way to authenticate with the object storage (e.g. an IAM role on EC2). This implies that Direct Interception is not appropriate for enforcing POSIX, as users can easily circumvent this by using the accessible credentials or IAM role with a tool other than Object Mount (such as `awscli` or directly through an S3 API library). Since FlexMounts are dependent on Object Mount Direct Interception, they are also unsuitable for use-cases that require POSIX enforcement.
{% /callout %}

### Step 3. Mount the Bucket

Mount a bucket in a location that is accessible to the users who need access to the files. This can be a shared location, or a location that is only accessible to the user who needs access. In this guide, we will use a shared location, `/mnt/cloud/bucket`, as the mount point.

When setting up the mount as an admin user, to allow for sudo access, use the `-o allow_root` flag. 

To allow other users to access the mount as themselves, use `-o allow_other`.

```console
$ cuno mount --posix -o allow_root -o allow_other --root s3://mybucket /mnt/cloud/bucket
```

Users will now be able to see the files in the bucket at `/mnt/cloud/bucket`, and POSIX permissions persisted by Object Mount for files in that bucket will be respected. You should now treat this as any other POSIX file system, and set permissions as you need to control access.


## Common Patterns

Below are some common behaviors and patterns that you might want to implement when using enforced POSIX access. For more examples, see [user-guide-posix-examples](../user-guides/configuration#usage-examples).

### Setting Default Permissions for New Files

On POSIX systems, you would normally do this using `umask`. 

To determine the umask value you want to set, subtract the value of the permissions you want from `666` (for a file) or `777` (for a directory).

For example, if `user1` wants the default permissions on new files to be `rw-r--r-- 644`, they would subtract `644` from `666`, giving `022`.

```console
$ umask 022
$ touch /mnt/cloud/bucket/user1/newfile
$ ls -l /mnt/cloud/bucket/user1/newfile
-rw-r--r-- 1 user1 group1 0 Mar  1 12:00 /mnt/cloud/bucket/user1/newfile
```

If you want to set the umask for all users, you can set it in the system-wide profile, or in the user’s profile. For example, to set it for all users, you could add the umask command to `/etc/profile`.

See the Advanced Guides article on [Advanced Configuration Options](docId:phohPoowequie5ji#ownership-and-permissions) fpr additional details on File and directory ownership and permissions.

### Converting a Bucket to “POSIX Enforced File Access” Mode

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

### Setting Inherited Permissions on a Directory

{% callout type="warning" %}
  **POSIX ACL Support**

  Work to support POSIX ACLs is scheduled for a future release. 

  If this is a feature you need, please contact our 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new).
{% /callout %}

Use [setfacl](https://linux.die.net/man/1/setfacl) to define additional default permissions to be applied to files in a directory when they are created.

For example, an admin could create a shared space, `/mnt/cloud/bucket/shared`, for users to collaborate, and set the default permissions to allow all users and groups to read and write files in the directory:

```console
$ setfacl -m u::rwX,g::rwX,o::- /mnt/cloud/bucket/shared
```

This will result in the following behavior:

```console
$ touch /mnt/cloud/bucket/shared/newfile
$ mkdir /mnt/cloud/bucket/shared/newdir
$ ls -l /mnt/cloud/bucket/shared/
drwxrwxr-x 1 user1 group1 0 Mar  1 12:00 /mnt/cloud/bucket/shared/newdir
-rw-rw-r-- 1 user1 group1 0 Mar  1 12:00 /mnt/cloud/bucket/shared/newfile
```
