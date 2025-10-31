---
title: POSIX Explained
hideTitle: false
docId: ySneAEd79CVewSSr
weight: 2
metadata:
  title: POSIX Explained
  description:
    Understanding POSIX and using Object Mount in POSIX Mode.
hidden: false
---

## What is POSIX?

The Portable Operating System Interface (POSIX) is a set of IEEE specifications intended to maintain compatibility between disparate Linux/UNIX flavors through standardized definitions of APIs, shells, interfaces, commands, etc.

Writing an application (or binary) which meets POSIX standards means that the program is “portable,” and is more likely to run correctly no matter what UNIX-based OS it is installed on.

Some applications or programs may (or may not) require _strict_ POSIX-compliant interfaces. 


## Object Mount’s POSIX Mode

To support those programs and applications that require POSIX-compliant interfaces, access-control and metadata, Object Mount includes **POSIX Mode**. When activated, POSIX Mode enables the necessary additional features to support those applications that rely on the rigid, traditional UNIX-style file permissions and metadata.

Object storage, by default, lacks concepts like file ownership, permissions, and modification timestamps that are normal features of most local file systems. Object Mount’s POSIX Mode recreates these features and behaviors in the object storage world.

When enabled, POSIX mode generates, stores, and maintains the metadata that is typically expected in a local file system, including:
- File ownership (uid, gid)
- Read/Write/Execute permissions
- Timestamps (mtime, ctime, etc.)
- Symbolic links and directory flags (where supported)

To retain this metadata, Object Mount creates and writes to a hidden index file that is stored at the root of your object storage bucket.

{% callout type="info" %}
Ensure your credentials and your bucket support write access. Your credentials must allow `s3:PutObject` and `s3:DeleteObject` on that path.

**Important:** You cannot change the POSIX mode setting after a mount has been created.
{% /callout %}

**Be advised:** Using any non-Object Mount tool to rename, move or copy your files will result in those objects losing their POSIX metadata. You should use Object Mount to manage POSIX-enabled files in order to preserve their metadata and attributes.


## When to Enable Object Mount’s POSIX Mode

You should enable POSIX mode in Object Mount if:

- You are working with software that checks for or enforces POSIX-style permissions
- You require symbolic link emulation or fine-grained permission mapping
- You are mounting object storage as a shared filesystem in team environments

Enabling POSIX mode is recommended for:

- Media Production
- Backup Solutions
- Archive Systems
- File Synchronization
- File Manager/Tools


## When NOT to Enable Object Mount’s POSIX Mode

You should not enable POSIX mode in Object Mount for:

- **Read-only bucket credentials**: POSIX mode requires _write_ access to the object storage bucket in order to create and write to the hidden metadata file. If your credentials are read-only, POSIX mode will not function and may prevent the mount from working correctly.

- **Lightweight access:** For read-only workflows or general content browsing, POSIX mode is typically unnecessary and can be left disabled.


## Enabling POSIX Mode

POSIX mode is enabled on a mount-by-mount basis: You can choose which mounts require it and which don’t.

You enable POSIX mode when **creating** a new mount within Object Mount. Once a mount is created, you cannot add or remove POSIX mode.

Enabling POSIX mode in Windows or macOS environments is done through Object Mount's graphical user interface (GUI). See the associated installation pages for your operating system:

- Enabling POSIX Mode when [creating a mount in macOS](docId:QpBba8p4bMTXAkBK#2-enter-your-object-storage-credentials-and-create-a-mount)
- Enabling POSIX Mode [creating a mount in Windows] <<LINK>>

Enabling POSIX mode in Linux is done through the command line interface (CLI). See the following installation page for Linux commands:

- Enabling POSIX Mode in Linux <<LINK>>









## MOVE TO WINDOWS SECTION >>> Enabling POSIX Mode (Windows)

POSIX mode is enabled on a mount-by-mount basis: You can choose which mounts require it and which don’t.

In Windows environments, you enable POSIX mode when **creating** a new mount in the Object Mount user interface:

- Launch the Object Mount Application
- From the Mounts tab, select **Create New Mount**
- Select your Object Storage Provider, Credentials, Bucket and Access Mode as normal
- When prompted, tick the checkbox for **Enable POSIX metadata**

![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-win-enable-posix-mode.jpg)

- Create the mount, then enable the mount

{% callout type="info" %}
Ensure your credentials and bucket support write access. Your credentials must allow `s3:PutObject` and `s3:DeleteObject` on that path.

**Note:** You cannot change the POSIX mode setting after a mount has been created.
{% /callout %}


## MOVE TO LINUX SECTION >>> Enabling POSIX Mode (Linux)

### Levels of POSIX Compatibility & Enforcement



ADD: UNLIKE MAC/WIN, LINUS OM GIVES YOU MORE GRANULAR CONTROL OVER SETTINGS FOR POSIX MODE AND SUPPORT.



Some UNIX/Linux applications have only limited or minimal requirements from a POSIX perspective and only need the file system for basic operations like renaming, reading, or writing new data. 

Other applications may require a fully POSIX-compatible interface, which requires activating additional services within Object Mount’s compatibility layer. (Note: Full POSIX compatibility requires extra metadata to be written to object storage and may affect performance slightly when enabled.)

The levels of POSIX compatibility provided in Object Mount are:

- **Core File Access**: No users/groups/symlinks/hardlinks/permissions control/file modes
- **POSIX File Access**: POSIX-compatible access with users/groups/symlinks/hardlinks/permission control/file modes
- **POSIX Enforced File Access**: Same as “POSIX File Access” above, but POSIX access control _is enforced_

**How to check if you need to enable “POSIX File Access”:**

- Check the outputs correspond to the same workload when run on the local file system. If there are randomized elements to workload (such as sampling in machine learning use cases), then the seeds need to be fixed to make such a comparison. ?????

- If the application running under Object Mount with Core File Access fails with (134) ENOTSUP (not supported) or Operation not permitted then it is likely that POSIX File Access needs to be enabled.


#### Core File Access

Objects as files, files as objects. This is the default mode. 

**Core File Access** mode does not support the persistence or modification of POSIX users, groups, symlinks, hard links, permissions control or file modes attributes on objects. 

- Use “Core File Access” when you don’t have any metadata requirements and your tools don’t need any POSIX metadata persistence to function correctly.
- Use “Core File Access” when you don’t have write access to the bucket in question, or you don’t want to create any Object Mount-internal objects there.

**Example use-cases:**

- Use “Core File Access” when interacting with data you have already moved up to object storage and when you only require access to the names and data of those objects. For example, if you have machine learning datasets in the cloud and you have previously configured your libraries to read them directly from object storage.

**How to enable:**

- “Core File Access” is the default mode. No action is required.

#### POSIX File Access

**POSIX File Access** mode will generate and maintain POSIX metadata for your objects, but it _will not_ enforce any permissions or modes set on the objects. This means any user can use Object Mount to read or write any file that their object storage credentials give them access to.

- Use “POSIX File Access” when you need POSIX metadata but do _not_ need to enforce POSIX read/write/execute file permissions.

**Example use-cases:**

- Use “POSIX File Access” when your applications are dependent on the preservation of POSIX metadata (owner/group permissions, change/modify times, etc.) or POSIX "links" (symlinks or hardlinks).
- Use “POSIX File Access” if you are moving workflows from POSIX to object storage, such as workloads that were previously run on AWS EC2 with EFS.

**Note:** Object Mount does not currently support POSIX ACLs or extended attributes in cloud object storage. Please contact Storj support <<LINK>> if you need these features.

**How to enable:**

There are two main ways to enable “POSIX File Access”:

- If the object storage provider supports setting **tags** at the bucket level, then you can enable POSIX File Access mode for all users using the command `cuno creds setposix s3://your_bucket_name true` from a command line/shell interface. This will affect _everyone_ using the bucket and will force all Object Mount users of that bucket into POSIX File Access mode. 

- Otherwise, to enable POSIX File Access on an individual workstation you can set a local environment variable. Enter `export CUNO_POSIX=1` from a command line/shell interface. This setting is valid per-session. ????? 

<< INSERT SCREEN SHOT OF EXPORT CMD >>


#### POSIX Enforced File Access

**POSIX Enforced File Access** mode will maintain POSIX metadata for your objects, and **will** enforce POSIX access controls on those objects. 

- Use “POSIX Enforced File Access” when you want to manage what users have access to, based on the UID/GID of their UNIX user and the corresponding POSIX metadata (owner, group, mode) on files. This means users will encounter `access denied` errors if they try to read or write to a file/directory they haven’t been given permission to (by a suitably privileged user using: chown, chgrp or chmod).

Note: This is **client-side** rather than **server-side** enforcement, and is not enforced using server-side IAM roles or ACL lists. If the user has access to object storage credentials with server-side privileges beyond this, then the user can potentially access or modify objects outside of these POSIX access controls. Contact the Storj our <<LINK>> help desk for how to setup ACL Policies to enforce server-side access control that reflects POSIX access controls.

<< CAN THE ABOVE ^^^ CONTRADICT the NOTE above??? >>>
