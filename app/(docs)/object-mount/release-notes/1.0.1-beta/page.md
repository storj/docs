---
title: 1.0.1-beta
metadata:
  title: Object Mount Release Notes
  description:
    Object Mount 1.0.1-beta Release Notes
---
## Release Notes

Feature breakdown:
- Windows Read-only Mode
- Close-to-tray notification to inform the user the application is still running in the background
- Non-empty Directory Mount Warning (MacOS)
- Removal of Unused Legacy Directory
- Proxy Support (Windows)
- Fast Copy Functionality (Windows)
- Application Instance Handling
- Credential-Bucket Pairing Update

Fixed in this release:
- Adobe Premiere ProRes HQ 422 4K Unresponsive Issue
- Adobe Premiere Project Lock Support
- Momentary Unresponsiveness While Pairing Bucket to Credential
- Momentary Unresponsiveness During Credential Import
- Incorrectly Disabled 'Import' Button in Credentials Modal
- GUI Freeze with Invalid License File
- Credential Clipping Issue
- Cloud Request Error Handling
- POSIX File Modification Dates
- Browser Download Issue in Object Mount
- Adobe Premiere Cloud Project Compatibility

Errata:
- The CSI driver does not support IAM roles for accessing buckets in Amazon EKS.
- Improve compatibility with Snap Assist (Windows) and Window Tiling (macOS)
- The CSI driver crashes when ReadWriteMany is used on static volumes (reported by eisler, still waiting for clarification on this - we couldn’t reproduce)
- Mounts' states can become out of sync with the backend process after a mount failure
- Issues enabling mount when credentials are expired
- Local to cloud copy which involves merging directories performs poorly on Windows
- Trying to mount to an unavailable drive letter breaks layout on Windows
- Bucket versioning and locking are not currently supported
- Premiere's Media Browser performs slowly when accessing Object Mount locations
- Detection of invalid endpoints is slow
- Imported credentials are not refreshed to capture new buckets
- Long lived open handles fail with IAM in Linux
- DaVinci Resolve: Waveform generation for audio tracks slows transcoding performance when video files are first added to the timeline
- Multiple mount support on Windows and MacOS
- Issue creating new folder using Finder when mounting a bucket with large number of objects
- Adobe Premiere Pro: Shared Projects/Project locking feature is not fully supported
- Application crash on attempt to set mount to the same folder
- Application crash on attempt to set mount to working remote volume
- QuickTime Player playback stutters on Macs with touchbar
- Sparse file uploads will time out after 20 minutes
- The maximum file upload size is capped at 1.5 TiB by default
- Http proxy support is limited on macOS (works but not thoroughly tested)
- Http proxy with authentication is not currently supported on Windows
- [MacOS] Fast copy is not available in finder
- [MacOS] Text Edit
- Error detection during credential import may experience delays
- Ghost OM mount: Unmounted but still displayed as disconnected
- [Windows] System handles increasing over time
- Conditional writes are not support for Storj
- [Windows] Object mount shortcut doesn’t work when installer was executed with “Run As”
- [Windows] Installer fails to close explorer and crashes the taskbar
- [Windows] Mount issue: “Run as” local admin vs. logged-on as local admin
- Invalid credentials are still imported
- Tray notification window scaling issues in high dpi modes
