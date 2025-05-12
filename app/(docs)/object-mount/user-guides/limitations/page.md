---
title: Limitations
docId: Chiec3aS2eizieng

metadata:
  title: Limitations
  description: Limitations

weight: 13    
---

{% callout type="note"  %}
Object Mount imposes no restrictions on local file accesses. The limitations listed in this section only apply to data stored on object-storage.
{% /callout %}

{% callout type="note"  %}
This document contains technical limitations applying to all Object Mount users. There are additional limitations dictated by your licence tier - set up a [discovery call](https://meetings.hubspot.com/tom1581/storj-object-mount-discovery-meeting?uuid=7d69a8eb-87d2-4971-aef9-9ea2b1073e7a) 
for more information on licensing and pricing.
{% /callout %}


## Direct interception

Direct interception (using Object Mount CLI or `LD_PRELOAD`) does not currently support SUID binaries, or certain packaged apps like [Snap](https://ubuntu.com/core/services/guide/snaps-intro), [AppImage](https://appimage.org/), or [Flatpak](https://docs.flatpak.org/en/latest/introduction.html) applications. Future updates are planned to address this.
If you need to use such apps, prefer to use [user-guide-object-mount-on-fuse](../user-guides/basic#object-mount-on-fuse) or [user-guide-object-mount-flexmount](../user-guides/basic#object-mount-flex-mount).

## Maximum object size

Depending on the solution provider, Object Mount has a limitation on the maximum file size it can store on a remote location. The following table indicates the maximum file sizes per provider.

| Cloud provider       | Maximum file size |
| -------------------- | ----------------- |
| AWS S3               | 5 TB              |
| Google Cloud Storage | 5 TB              |
| Azure Storage        | 4.77 TB           |

## Ownership, permissions and file metadata

* In the results of the command `ls` the owner of the remote objects is always the current user. Furthermore, remote file permissions are always set to `777`.

* The creation date of a remote directory is not always available to the system calls.

In Core File Access mode, the owner of the remote objects is by default always reported as the current user, and remote file permissions are always `777`. Also, the creation time of directories is always displayed as the Unix Epoch (00:00:00 UTC on 1 January 1970). These can be overridden using `CUNO_OPTIONS` ([user-guide-ownership-and-permissions](../user-guides/configuration#ownership-and-permissions)).

### Directories in Azure

Creating a directory in Azure Storage (using `mkdir`) will result in a remote blob called \<no name> to be displayed inside the created directory when the user is using the GUI/file explorer that Azure portal provides. However, `ls` and all CLI commands will behave as expected.

### Auto-completion

Auto-completion and wildcard characters are fully supported on a Object Mount active shell. This can be created either using the `cuno` command or using `LD_PRELOAD` (e.g. `LD_PRELOAD=/usr/lib/cuno.so bash`). In the latter, paths containing colons such as `s3://bucket` on cloud paths will only succeed if `:` is removed from the separator list variable `COMP_WORDBREAKS`. For example:

```bash
[[ "$LD_PRELOAD" =~ cuno ]] && export COMP_WORDBREAKS=${COMP_WORDBREAKS/:/}
```

### Memory-mapping

Currently, only read-only private file memory mapping is supported.

### Applications

You may want to check the secton [user-guide-tips-for-apps](../user-guides/tips).
