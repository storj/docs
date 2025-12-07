---
title: POSIX Options
hideTitle: false
docId: cbm3PcQXmLpuYcbg
weight: 1
metadata:
  title: POSIX Options
  description:
    Technical Details on the POSIX Options for Object Mount for Linux.
hidden: false
---

## POSIX Compatibility

For Object Mount to function correctly, it needs to comply with the level of POSIX compatibility that your tools require.

Some Linux applications have only limited or minimal requirements from a POSIX perspective, and may only use the file system for basic operations like renaming, reading, or writing new data. 

Other applications may require a fully POSIX-compatible interface, which invokes additional services within Object Mount’s compatibility layer.

  - **Note:** Enabling full POSIX compatibility requires extra metadata to be written to object storage and may have a slight effect on performance.


## POSIX Modes

The levels of POSIX compatibility provided in Object Mount for Linux are:

- [Core File Access](#core-file-access) &mdash; no users/groups/symlinks/hardlinks/permissions control/file modes.
- [POSIX File Access](#posix-file-access) &mdash; POSIX-compatible access with users/groups/symlinks/hardlinks/permission control/file modes.
- [POSIX Enforced File Access](#posix-enforced-file-access) &mdash; Same as “POSIX File Access” above, but POSIX access control _is enforced_.

{% callout type="note" %}
**How to check if you need to enable “POSIX File Access”**

- Run your workload using a local file system volume. Then run the same workload using an Object Mount volume. Compare the outputs and results. If you find discrepancies, it is likely that POSIX File Access needs to be enabled.
- If Object Mount running with only **Core File Access** fails with an error `(134) ENOTSUP` (not supported) or `Operation not permitted` then it is likely that POSIX File Access needs to be enabled.
{% /callout %}


## Core File Access

**Core File Access** mode disables all POSIX compatibility features in Objecty Mount for linux. Core File Access mode does not support the persistence or modification of POSIX users, groups, symlinks, hard links, permissions control or file modes attributes on objects. This is the default mode.

  - Use “Core File Access” when you don’t have any metadata requirements and your tools don’t need any POSIX metadata persistence to function correctly.

  - Use “Core File Access” when you don’t have write access to the bucket in question, or you don’t want to create any Object Mount-generated objects there.

**Example use-cases:**

  - Use “Core File Access” when interacting with data you have already moved up to object storage and when you only require read-only access to the filenames and content of those objects. For example, if you have machine learning datasets in the cloud and you have previously configured your libraries to read them directly from object storage.

**How to enable:**

  - “Core File Access” is enabled as the default mode. No additional action is required.


## POSIX File Access

**POSIX File Access** mode will generate and maintain POSIX metadata for your objects, but it _will not_ enforce any permissions or modes set on the objects. This means any user can use Object Mount to read or write any file that their object storage credentials give them access to.

  - Use “POSIX File Access” when you need POSIX metadata but do _not_ need to enforce POSIX read/write/execute file permissions.

**Example use-cases:**

  - Use “POSIX File Access” when your applications are dependent on the preservation of POSIX metadata (owner/group permissions, change/modify times, etc.) or POSIX “links” (symlinks or hardlinks).

  - Use “POSIX File Access” if you are moving workflows from POSIX to object storage, such as workloads that were previously run on AWS EC2 with EFS.

    **Note:** Object Mount does not currently support POSIX ACLs or extended attributes in cloud object storage. Contact the 🌐 [Storj Support](https://supportdcs.storj.io/hc/en-us) team if you need assistance in providing these features.

**How to enable:**

There are two main ways to enable “POSIX File Access”:

  - If the object storage provider supports setting **tags** at the bucket level, then you can enable POSIX File Access mode for _all users_ using the command `cuno creds setposix s3://your_bucket_name true` from a command line/shell interface. This will affect _everyone_ using the bucket and will force all Object Mount users of that bucket into POSIX File Access mode. 

  - Otherwise, to enable POSIX File Access on an _individual workstation-basis_ you can set a local environment variable. Enter `export CUNO_POSIX=1` from a command line/shell interface. This setting is valid per-session. 

<!-- VALIDATE THE ABOVE "PER SESSION" NOTE -->



## POSIX _Enforced_ File Access

**POSIX Enforced File Access** mode will generate and maintain POSIX metadata for your objects (like “POSIX File Access” mode, above) but _will enforce_ POSIX access controls on those objects. 

  - Use “POSIX Enforced File Access” when you want to manage what users have access to, based on the UID/GID of their UNIX user and the corresponding POSIX metadata (owner, group, mode) on files. 
  - This means users will encounter `access denied` errors if they try to read or write to a file/directory they haven’t been given permission to (by a suitably privileged user/admin using: `chown`, `chgrp` or `chmod`).

**Example use-cases:**

  - Use “POSIX Enforced File Access” to host a website (using NGINX or other server technologies) entirely from object storage, without any attached storage device(s) (such as EFS). “POSIX Enforced File Access” mode lets you maintain control over which files/directories the web server process (e.g.: the `nginx` user) can access.

  - Use “POSIX Enforced File Access” to host an organization’s user filesystem in the cloud.

    **Note:** Object Mount does not currently support POSIX ACLs or extended attributes in cloud object storage. Contact the 🌐 [Storj Support](https://supportdcs.storj.io/hc/en-us) team if you need assistance in providing these features.

**How to enable:**

  - To enable and configure “POSIX Enforced File Access” see the detailed steps in the Configuration Guide article: [](docId:Eegoo1teiJ8eerae).
