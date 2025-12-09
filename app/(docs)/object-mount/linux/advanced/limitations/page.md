---
title: Technical Limitations
hideTitle: false
docId: Chiec3aS2eizieng
weight: 7
metadata:
  title: Technical Limitations
  description: 
    Technical Limitations in Object Mount for Linux
hidden: false
---

{% callout type="note" %}
  **Local File Access Unaffected**

  Object Mount imposes no restrictions on local file accesses. 
  
  The limitations listed in this section only apply to data stored on object storage.
{% /callout %}

{% callout type="note" %}
  **Technical vs. License-based Limitations**

  This document contains technical limitations applying to all Object Mount for Linux users. 
  
  There are additional limitations dictated by your license tier - set up a [discovery call](https://www.storj.io/landing/get-in-touch) for more information on licensing and pricing.
{% /callout %}


## Direct Interception

Direct Interception (using either Object Mount CLI or `LD_PRELOAD`) does not currently support SUID binaries, or certain packaged applications like 🌐 [Snap](https://ubuntu.com/core/services/guide/snaps-intro), 🌐 [AppImage](https://appimage.org/), or 🌐 [Flatpak](https://docs.flatpak.org/en/latest/introduction.html). 

Future updates are planned to improve this.

If you need to use such applications you should deploy either [Object Mount on FUSE](docId:ZdvWLcm9uFmM5HLk) or [Object Mount FlexMount](docId:cFUt9zgCRFFDk5Sq).


## Maximum Object Size

Depending on your Object Storage provider, Object Mount has a limitation on the maximum file size it can store on a remote location. 

The following table indicates the maximum file sizes per provider:

| **Cloud Provider**   | **Maximum File Size** |
|----------------------|-----------------------|
| AWS S3               | 5 TB
| Google Cloud Storage | 5 TB
| Azure Storage        | 4.77 TB


## Ownership and Permissions

If left at the default, file ownership, permissions and timestamps are set as follows when using POSIX [Core File Access](docId:cbm3PcQXmLpuYcbg#core-file-access) Mode:

  - The owner of the remote objects will be reported as the **current user**, and remote file permissions will be set to `777`. 
  - The creation time of directories is displayed as the Unix Epoch (00:00:00 UTC on 1 January 1970). 

These can be overridden using `CUNO_OPTIONS`. See the [Ownership and Permissions](docId:phohPoowequie5ji) section in the Advance Guide article: Advanced Configuration Options for details.


## Directories in Azure

Creating a directory in Azure Storage (using `mkdir`) will result in a remote blob called `\<no name>` to be displayed inside the created directory when the user is using the GUI/File Explorer that the Azure Portal provides. 

However, `ls` and all CLI commands will behave as expected, showing the correct directory name.


## Tab Auto-Completion

Tab-based auto-completion and wildcard characters are fully supported within Object Mount-wrapped shells.

Wrapped-shell can be launched using either the `cuno` command or using `LD_PRELOAD` (e.g. `LD_PRELOAD=/usr/lib/cuno.so bash`). 

In the latter, paths containing colons (such as `s3://bucket`) on cloud paths will only succeed if `:` is removed from the separator list variable `COMP_WORDBREAKS`. 

For example:

```bash
"$LD_PRELOAD" =~ cuno ]] && export COMP_WORDBREAKS=${COMP_WORDBREAKS/:/}
```


## Memory Mapping

Currently, only read-only private file memory mapping is supported.
