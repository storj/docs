---
title: POSIX Explained
hideTitle: false
docId: ySneAEd79CVewSSr
weight: 2
redirects:
  - /object-mount/faq/posix-mode
metadata:
  title: POSIX Explained
  description:
    Understanding POSIX and using Object Mount in POSIX Mode.
hidden: false
---

## What is POSIX?

The Portable Operating System Interface (POSIX) is a set of IEEE specifications intended to encourage compatibility between disparate Linux/UNIX flavors through standardized definitions of APIs, shells, interfaces, commands, etc.

Writing an application (or binary) which meets POSIX standards means that the program is “portable,” and is more likely to run correctly no matter what UNIX-based OS it is installed on.

Some applications or programs may (or may not) require _strict_ POSIX-compliant interfaces. 


## Object Mount’s POSIX Mode

To support those programs and applications that require POSIX-compliant interfaces, access-control and metadata, Object Mount includes **POSIX Mode**. 

When activated, POSIX Mode enables the necessary additional features to support applications that rely on the rigid, traditional UNIX-style file permissions and metadata.

Object storage, by default, lacks concepts like file ownership, permissions, and modification timestamps that are normal features of most local file systems. Object Mount’s POSIX Mode recreates these features and behaviors in the object storage world.

When enabled, POSIX Mode generates, stores, and maintains the metadata that is typically expected in a local file system, including:
- File ownership (uid, gid)
- Read/Write/Execute permissions
- Timestamps (mtime, ctime, etc.)
- Symbolic links and directory flags (where supported)

To retain this metadata, Object Mount creates and writes to a hidden index file that is stored at the root of your object storage bucket.

{% callout type="info" %}
Ensure your credentials and your bucket support write access. Your credentials must allow `s3:PutObject` and `s3:DeleteObject` on that path.
{% /callout %}

{% callout type="warning" %}
**Be advised:** Using any non-Object Mount tool to rename, move, or copy your files will result in those objects _losing_ their POSIX metadata. You should only use Object Mount to manage POSIX-enabled files in order to preserve their metadata and attributes.
{% /callout %}


## When to Enable Object Mount’s POSIX Mode

You should enable POSIX mode in Object Mount if:

- You are working with software that checks for or enforces POSIX-style permissions
- You require symbolic link emulation or fine-grained permission mapping
- You are mounting object storage as a shared filesystem in team environments

Enabling POSIX mode is recommended for workflows such as:

- Media Production
- Backup Solutions
- Archive Systems
- File Synchronization
- File Manager/Tools


## When NOT to Enable Object Mount’s POSIX Mode

You should not enable POSIX Mode in Object Mount for:

- **Read-only bucket credentials**: POSIX Mode requires _write_ access to the object storage bucket in order to create and write to the hidden metadata file. If your credentials are read-only, POSIX mode will not function and may prevent the mount from working correctly.

- **Lightweight access:** For read-only workflows or general content browsing, POSIX mode is typically unnecessary and can be left disabled.


## Enabling POSIX Mode: Windows and macOS

POSIX mode is enabled on a mount-by-mount basis: You can choose which mounts require it and which don’t.

You enable POSIX mode when **creating** a new mount within Object Mount. 

{% callout type="warning" %}
**Important:** You cannot change (add or remove) the POSIX Mode setting after a mount has been created.
{% /callout %}

Enabling POSIX mode in **Windows** and **macOS** environments is done through Object Mount’s graphical user interface (GUI). 

See the associated installation pages for your operating system:

- Enabling POSIX Mode when [creating a mount in macOS](docId:QpBba8p4bMTXAkBK#step-2-configure-object-storage-credentials-and-create-a-mount)
- Enabling POSIX Mode [creating a mount in Windows](docId:khHGfZsyY9NJ2uGK#step-2-configure-object-storage-credentials-and-create-a-mount)


## Enabling POSIX Mode: Linux

POSIX support in Object Mount for Linux comes with more options, more modes, and offers more controls for the end user to configure according to their unique needs and use case.

Configuration of POSIX options in Object Mount for Linux is achieved:
  - Via the command line interface (the Object Mount CLI)
  - Through the setting of environment variables
  - Applying “tags” directly to cloud buckets using your object storage provider’s dashboard

Use the links below to **learn** about the many POSIX modes, options and settings &mdash; and then **enable** the correct POSIX Mode for you use case:

| **Linux Next Steps** | **Description** |
|----------------------|-----------------|
| **Learn about** [POSIX Options](docId:cbm3PcQXmLpuYcbg)    | Understanding POSIX Modes in Object Mount for Linux |
| **Enable** [Enforced POSIX Access](docId:Eegoo1teiJ8eerae) | Enabling POSIX Modes in Object Mount for Linux |
