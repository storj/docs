---
title: Limitations
docId: Chiec3aS2eizieng

metadata:
  title: Limitations
  description: Limitations

weight: 13    
---

(user-guide-limitations)=

# Limitations

:::{note}
Object Mount imposes no restrictions on local file accesses. The limitations listed in this section only apply to data stored on object-storage.
:::

:::{note}
This document contains technical limitations applying to all Object Mount users. There are additional limitations dictated by your licence tier, see [Pricing](https://cuno.io/pricing).
:::

(user-guide-limitations-direct-interception)=

## Direct interception

Direct interception (using Object Mount CLI or `LD_PRELOAD`) does not currently support SUID binaries, or certain packaged apps like [Snap](https://ubuntu.com/core/services/guide/snaps-intro), [AppImage](https://appimage.org/), or [Flatpak](https://docs.flatpak.org/en/latest/introduction.html) applications. Future updates are planned to address this.

If you need to use such apps, prefer to use {ref}`user-guide-Object Mount-mount` or {ref}`user-guide-Object Mount-flexmount`.

## Maximum object size

Depending on the solution provider, Object Mount has a limitation on the maximum file size it can store on a remote location. The following table indicates the maximum file sizes per provider.

| Cloud provider       | Maximum file size |
| -------------------- | ----------------- |
| AWS S3               | 5 TB              |
| Google Cloud Storage | 5 TB              |
| Azure Storage        | 4.77 TB           |

## Ownership, permissions and file metadata

% In the results of the command :code:`ls` the owner of the remote objects is always the current user. Furthermore, remote file permissions are always set to :code:`777`.

% The creation date of a remote directory is not always available to the system calls.

In Core File Access mode, the owner of the remote objects is by default always reported as the current user, and remote file permissions are always {code}`777`. Also, the creation time of directories is always displayed as the Unix Epoch (00:00:00 UTC on 1 January 1970). These can be overridden using {code}`CUNO_OPTIONS` ({ref}`user-guide-ownership-and-permissions`).

### Directories in Azure

Creating a directory in Azure Storage (using {code}`mkdir`) will result in a remote blob called \<no name> to be displayed inside the created directory when the user is using the GUI/file explorer that Azure portal provides. However, {code}`ls` and all CLI commands will behave as expected.

### Auto-completion

Auto-completion and wildcard characters are fully supported on a Object Mount active shell. This can be created either using the {code}`cuno` command or using {code}`LD_PRELOAD` (e.g. {code}`LD_PRELOAD=/usr/lib/cuno.so bash`). In the latter, paths containing colons such as {code}`s3://bucket` on cloud paths will only succeed if `:` is removed from the separator list variable {code}`COMP_WORDBREAKS`. For example:

> {code}`[[ "$LD_PRELOAD" =~ cuno ]] && export COMP_WORDBREAKS=${COMP_WORDBREAKS/:/}`

### Memory-mapping

Currently, only read-only private file memory mapping is supported.

### Applications

You may want to check the secton {ref}`user-guide-tips-for-apps`.

% MinIO

% -----

% We have discovered an incompatibility with MinIO; when using the remote move S3 API functionality to achieve server-side object copying MinIO can become unresponsive. This feature works for relatively small files (for example, 5GB) but it fails for larger (16GB) files.

% These operations are S3-compatible, and work as expected against the AWS implementation, but can fail against MinIO.

% This affects :code:`mv` operations, where both the source and target are a single MinIO system.
