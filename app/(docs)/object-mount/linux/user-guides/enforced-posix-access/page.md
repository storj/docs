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

**Enforced POSIX File Access** mode will maintain POSIX metadata for your objects, and will enforce POSIX access controls on those objects. Use this when you want to manage what users have access to based on the UID/GID of their UNIX user and the corresponding POSIX metadata (owner, group, mode) on files.

Users will encounter `access denied` errors if they try to read or write to a file/directory they haven’t been given permission to (by a suitably privileged user doing `chown`, `chgrp` or `chmod`). Note that this is _client-side_ rather than _server-side_ enforcement, and is not enforced using server-side IAM roles or ACL lists.

The specific steps may vary depending on your object storage provider. Contact the Storj 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new) if this is a use-case that you are interested in and these instructions don’t match your expectations or preferences.

{% callout type="note" %}
  **Hybrid Deployment for ACL Support**

  We can also provide a hybrid-approach, which does _both_ client-side access management and server-side access management through ACLs. 
  
  If you need server-side ACL policies to reflect POSIX access controls, contact the Storj 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new) for assistance.
{% /callout %}


## Configuration Overview

From your object storage provider’s dashboard, generate access credentials with the most complete set of access permissions that any user or admin could need, including permissions to _edit bucket tags_.

  - On a public cloud supporting IAM, you should set up an `admin` IAM user with such credentials.
  - The admin credentials are stored privately and are used to set up Object Mount on FUSE in an accessible location.
  - Users are only told the path to the mount &mdash; they are not given access to `cuno` nor to the admin credentials.

{% callout type="warning" %}
  **Security Considerations**
  
  The approach given here is **not suitable** if users have the ability to create their own VMs/instances where they can set any POSIX uid/gid. 
  
  In that case, consider using server-side IAM roles or ACL lists to enforce access controls. Contact our 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new) for advice on how this integrates with Object Mount.
{% /callout %}


## Key Considerations

1. If multiple machines or locations are being used, it is important that user and group IDs are controlled and consistent across all machines. 

    This is because the POSIX metadata is stored in the object storage, and Object Mount will use the same user and group IDs to present the files on all machines. If you require assistance with managing user and group IDs across multiple machines, contact our 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new).

2. Independent IAM roles or credentials for each user are not required. The admin credentials are used to set up the mount, and the users are only given access to the mount (not the credentials). 

    If the user has access to object storage credentials with server-side privileges beyond this, then the user can potentially access or modify objects outside of these POSIX access controls.

3. This guide assumes that the _bucket to use is empty_ initially. If you are switching from an ACL-based approach to access management, then you will need to map existing rules to POSIX uids/gids and “apply” those ACLs through POSIX commands like `chown` and `chmod`.

**Note:** Object Mount does not currently support POSIX ACLs or extended attributes in cloud object storage. Contact 🌐 [Storj Support](https://supportdcs.storj.io/hc/en-us) if you need these features.


## How to Enable POSIX Enforced File Access

Assuming you have already [installed](docId:iethahkeeX5EiJoh) Object Mount for Linux, the following steps will guide you through setting up enforced POSIX access for the users in a generic POSIX-based system.

### Step 1. Import your Admin Credentials

Follow the steps in [](docId:JDK2ED8HGFmyaxk#step-2-import-s3-credentials) to obtain, save and import your admin credentials.

You will need to have run `cuno creds import <file containing admin credentials>`. 

After importing, you should ensure that any credentials files (usually in `${XDG_CONFIG_HOME}"/cuno/creds` or `~/.config/cuno/creds`) have been created with, or assigned the, appropriately strict permissions so that non-admin users cannot read them.

### Step 2. Tag the Bucket

We check a [bucket tags](docId:phohPoowequie5ji#posix-file-access) when Object Mount tries to access a bucket to assess the POSIX enforcement settings. 

If your bucket or object storage provider does _not support tags_ on buckets, you can skip this step and proceed to [Step 3. Mount the Bucket](#step-3-mount-the-bucket).

**Note:** You will need to set the `--posix` flag every time you run `cuno mount`.

Use `cuno creds setposix <uri of bucket> true` to set the bucket tag which will automatically enable POSIX File Access whenever this bucket is accessed by any Object Mount installation. 

This will affect _everyone_ using the bucket and force all Object Mount users of that bucket into “Enforced POSIX File Access” mode. 

Example:

```shell
  # terminal
  cuno creds setposix s3://mybucket true
```

By setting this to `true`, Object Mount stores hidden subdirectories inside your object storage directories describing the POSIX metadata (owner/group permissions, change/modify times, etc.) for each file in the directory. This allows Object Mount to present the files in a way that is compatible with POSIX file access semantics.

{% callout type="note" %}
  **File-Based Metadata**

  If you are using S3 buckets, it is possible to set `cuno creds setposix <uri of bucket> metadata`. This will store POSIX metadata as object metadata _on each individual file_ in the bucket, 

  We do not normally recommend this, as it will slow down Object Mount. For more information, see [](docId:phohPoowequie5ji#posix-file-access).
{% /callout %}


{% callout type="warning" %}
  **Inability to Enforce File Access**

  When a bucket tag enabling POSIX File Access is set, Object Mount Direct Interception, along with any Object Mount on FUSEs/FlexMounts, are compelled to operate in POSIX mode while accessing the bucket. 
  
  However, the mounts will _not be able to enforce POSIX access_ without the additional `--posix` flag at mount time.

  Object Mount Direct Interception Mode necessitates read access to object storage credentials (or some other user-accessible way to authenticate with the object storage (e.g. an IAM role on EC2)]. 
  
  This implies that Direct Interception Mode _is not appropriate for enforcing POSIX_, as users can easily circumvent this by using the accessible credentials or IAM role with a tool other than Object Mount (such as AWS CLI, or directly through an S3 API library). 
  
  Since Object Mount FlexMounts are dependent on Object Mount Direct Interception Mode, they are also unsuitable for use-cases that require POSIX enforcement.
{% /callout %}

### Step 3. Mount the Bucket

Mount a bucket in a location that is accessible to the users. 

In this guide, we will use a shared location of `/mnt/cloud/bucket` as the mount point.

When setting up the mount as an admin user, allow for sudo access using the `-o allow_root` flag. 

To allow other users to access the mount as themselves, use `-o allow_other`.

```console
$ cuno mount --posix -o allow_root -o allow_other --root s3://mybucket /mnt/cloud/bucket
```

Users will now be able to see the files in the bucket at `/mnt/cloud/bucket`, and POSIX permissions persisted by Object Mount for files in that bucket will be respected. 

_You should treat this as any other POSIX file system and set permissions as you need to control access._


## Common Patterns

Below are some common behaviors and recommendations that you might want to implement when using enforced POSIX access. 

For more examples, see the **Usage Examples** section in the Advanced Guide article [](docId:phohPoowequie5ji#usage-examples).

### Setting Default Permissions for New Files

On POSIX systems, you would normally set default permissions using `umask`. 

To determine the umask value you want to set, subtract the value of the permissions you want from `666` (for a file) or `777` (for a directory).

For example, if `user1` wants the default permissions on new files to be `rw-r--r-- 644`, they would subtract `644` from `666`, giving `022`.

```console
$ umask 022
$ touch /mnt/cloud/bucket/user1/newfile
$ ls -l /mnt/cloud/bucket/user1/newfile
-rw-r--r-- 1 user1 group1 0 Mar  1 12:00 /mnt/cloud/bucket/user1/newfile
```

If you want to set the umask for **all users**, you can set this in the system-wide profile, or in the user’s profile. 

For example, to set it for all users, you could add the umask command to `/etc/profile`.

See the **Ownership and Permissions** section in the Advanced Guides article [](docId:phohPoowequie5ji#ownership-and-permissions) for additional details on file and directory ownership and permissions.

### Converting a Bucket to “POSIX Enforced File Access” Mode

If you have a pre-existing storage location for which you now need to implement POSIX-based access controls, you can simply set the bucket tag as [shown above](#step-2-tag-the-bucket). This will ensure that any _new files_ are stored with POSIX metadata.

**Note:** This will _not_ affect any _existing files_ until they (or their directories) are accessed. 

To control access to any particular files or directories, proceed with the use of `chown`, `chgrp` and `chmod` as you would normally on a POSIX file system. 

For example, to limit access to `/mnt/cloud/bucket/directory` to only allow `user1`, you could do the following:

```console
$ chown -R user1 /mnt/cloud/bucket/directory
$ chgrp -R group1 /mnt/cloud/bucket/directory
$ chmod -R 700 /mnt/cloud/bucket/directory
```

As a result of the above commands, only `user1` will be able to access the directory and its contents across all systems using Object Mount.

You can check the POSIX metadata for a file or directory using `ls -l` or `stat`. 

For example:

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

  Work to support POSIX ACLs is under development. 

  If this is a feature you need, please contact our 🌐 [Support Team](https://supportdcs.storj.io/hc/en-us/requests/new).
{% /callout %}

Use the [set file access control lists (setfacl)](https://linux.die.net/man/1/setfacl) command to define additional default permissions to be applied to files in a directory when they are created.

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
