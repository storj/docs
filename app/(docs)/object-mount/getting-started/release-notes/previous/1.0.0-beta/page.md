---
title: 1.0.0-beta
metadata:
  title: Object Mount Release Notes
  description:
    Object Mount 1.0.0-beta Release Notes
---
## Release Notes

Feature breakdown:
- Simple Single-User Edit from S3 Bucket
- Single-User Edit from S3 Bucket
- Read From S3 Bucket
- Write to S3 Bucket
- POSIX Timestamp Support
- POSIX Permissions Support
- Intelligent Prefetcher
- Adaptive/Intelligent Reader (pre-caching)
- File Cache Mode
- Multi-Mount Linux
- Object Rename
- Fusion Mode (Linux)
- Fast Copy Integration in Finder / MacOS
- Fast Copy Integration in Explorer / Windows
- Parallelised Delete Folder in MacOS/Windows
- Parallelised Rename Folder in MacOS/Windows
- NFS/SMB Gateway Setup
- Encrypted Credentials

Fixed in this release:
- Enhanced directory rename performance
- Resolved panic issue when activating licenses with invalid length
- Improved error reporting for invalid licenses in the app
- Fixed table usability issues (table scrolling on click, remove unused scroll bars)
- Ensure all mounts are accounted for when removing credentials, especially when multiple mounts rely on them
- Ensure the metadata cache directory is created in the correct location, respecting user preferences
- macOS: Add check for MacFUSE before allowing using the application
- macOS: Add ability to configure mount in read-only mode
- macOS: Fix inconsistent mount state when successfully unmounting a mount
- macOS: Fix force unmount rendering the application unusable
- macOS: Fix potentially allowing a mount in an invalid state causing random reads
- macOS: Addressed an upstream corner case that could lead to data corruption
-  Windows: Fixed RW mode readback issue returning bad data after upload
