title: 1.0.2-beta
metadata:
  title: Object Mount Release Notes
  description:
    Object Mount 1.0.2-beta Release Notes
---
## Release Notes

Features
- [macOS] Finder Fast Copy Extension
- Timestamp Preservation in Rare Scenarios

Fixes
- [Windows] Installation Directory Relocated to Program Files
- Resolved Force Unmount Failure
- Fixed Excessive System Handle Generation
- [macOS] Fixed Empty Directory After Archive Extraction
- [Windows] Fixed Object Mount Shortcut with “Run As” Installer 

Improvements
- Reliability and Resource Optimization
- High-Resolution Display Readability
- Enhanced Bucket Detection 

Important Notes for Windows Users
- Must uninstall previous installations before installing this version due to relocation of the main directory to Program Files.
- If you are experiencing performance issues within Premiere Pro's Media Browser, please try disabling the Windows NFS client (found under "Services for NFS" > "Client for NFS" in Windows Features) as it causes conflicts with WinFSP and can severely impact performance.