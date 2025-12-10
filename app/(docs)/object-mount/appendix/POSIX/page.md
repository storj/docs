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

The Portable Operating System Interface (🌐 [POSIX](https://en.wikipedia.org/wiki/POSIX)) is a set of IEEE specifications intended to encourage compatibility between disparate Linux/UNIX flavors through standardized definitions of APIs, shells, interfaces, commands, etc.

Writing an application (or binary) which meets POSIX standards means that the program is “portable,” and is more likely to run correctly no matter what UNIX-based OS it is installed on.

Some applications may (or may not) require _strict_ POSIX-compliance to work properly. 


## Object Mount’s POSIX Mode

To support those programs and applications that require POSIX-compliant interfaces, access-control, and metadata, Object Mount includes **POSIX Mode**. 

When activated, POSIX Mode enables the necessary additional features to support applications that rely on the rigid, traditional UNIX-style file permissions and metadata.

Object storage, by default, lacks concepts like file ownership, permissions, and modification timestamps that are normal features of most local drives and file system calls. Object Mount’s POSIX Mode recreates these features and behaviors in the object storage world.

When enabled, POSIX Mode generates, stores, and maintains the metadata that is typically expected in a local file system, including:
- File ownership (uid, gid)
- Read/Write/Execute permissions
- Timestamps (mtime, ctime, etc.)
- Symbolic links and directory flags (where supported)

To retain this metadata, Object Mount creates and writes to a hidden index file that is stored at the root of your object storage bucket.

{% callout type="info" %}
  **POSIX Mode Requirements**

  To support POSIX Mode, ensure your S3 credentials allow, and your bucket supports, write access. Your credentials must allow `s3:PutObject` and `s3:DeleteObject`.
{% /callout %}

{% callout type="warning" %}
  **Accessing Content Outside of Object Mount**

  Using any non-Object Mount tool to rename, move, or copy your files will result in those objects _losing_ their POSIX metadata. You should only use Object Mount to manage POSIX-enabled files in order to preserve their metadata and attributes.
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

You should _not_ enable POSIX Mode in Object Mount for:

- **Read-only Bucket Credentials**

  POSIX Mode requires _write_ access to the object storage bucket in order to create and write to the hidden metadata file. If your credentials are read-only, POSIX mode will not function and may prevent the mount from working correctly.

- **Lightweight Access** 

  For read-only workflows or general content browsing, POSIX mode is typically unnecessary and can be left disabled.


## Enabling POSIX Mode: macOS and Windows

POSIX mode is enabled on a mount-by-mount basis: You can choose which mounts require it and which don’t.

You enable POSIX mode when **creating a new mount** within Object Mount for macOS or Windows.

{% callout type="warning" %}
  **Important:** You cannot change the POSIX Mode setting after a mount has been created in Object Mount for macOS or Windows.
{% /callout %}

Enabling POSIX mode in **macOS** and **Windows** environments is done through Object Mount’s graphical user interface (GUI). 

See the associated page for your operating system:

- Enabling POSIX Mode when [creating a mount in macOS](docId:QpBba8p4bMTXAkBK#step-2-configure-s3-credentials-and-create-a-mount)
- Enabling POSIX Mode [creating a mount in Windows](docId:khHGfZsyY9NJ2uGK#step-2-configure-s3-credentials-and-create-a-mount)

{% callout type="info" %}
  **POSIX Feature Support on Mac & Windows**

  User and Group identity features are not supported on Mac and Windows platforms:
  - The owner of cloud objects is always reported to be the current user.
  - The directory mode is reported as `0777` and the file mode is reported as `0666`.

  Also, POSIX access controls are not enforced by Object Mount on Mac and Windows.

  For a deeper understanding of the full suite of POSIX Mode Features see the Linux Getting Started Guide article: [](docId:cbm3PcQXmLpuYcbg) and the Linux User Guide article: [](docId:Eegoo1teiJ8eerae).
{% /callout %}


## Enabling POSIX Mode: Linux

POSIX support in Object Mount for Linux includes more options, more modes, and offers more controls for the end user to configure their environment according to their unique needs and use cases.

Configuration of POSIX options in Object Mount for Linux is achieved:
  - Via the command line interface (the Object Mount CLI)
  - Through the setting of environment variables
  - Applying “tags” directly to cloud buckets using your object storage provider’s dashboard

Use the links below to **learn** about the many POSIX Modes, options, and settings &mdash; and then **enable** the correct POSIX Mode for you use case:

| **Linux Next Steps** | **Description** |
|----------------------|-----------------|
| **Learn about** [POSIX Options](docId:cbm3PcQXmLpuYcbg) | Understanding POSIX Modes in Object Mount for Linux |
| **Enable** [POSIX File Access](docId:cbm3PcQXmLpuYcbg#posix-file-access) | Enabling POSIX File Access Mode in Object Mount for Linux |
| **Enable** [Enforced POSIX File Access](docId:Eegoo1teiJ8eerae) | Enabling _Enforced_ POSIX File Access Mode in Object Mount for Linux |
