---
title: Troubleshooting Guide
docId: troubleshooting
weight: 8
hideTitle: true
metadata:
  title: Troubleshooting Object Mount
  description:
    Common issues and solutions when using Object Mount, plus known limitations to be aware of.
---

# Troubleshooting Guide

This guide covers common issues encountered when using **Object Mount**, along with clear steps to resolve them. If you're stuck, this is a good first place to check before reaching out to support.

---

## Mount Won’t Appear or Activate

**Possible Causes:**

- Incorrect credentials  
- No accessible buckets  
- macFUSE or WinFsp not installed or authorised  
- POSIX mode enabled without write access

**What to check:**

- Verify your licence is active (`About` tab)  
- Re-import your credentials and confirm bucket visibility  
- Ensure dependencies are installed:
  - **macOS**: [macFUSE](https://osxfuse.github.io/)
  - **Windows**: [WinFsp](https://github.com/billziss-gh/winfsp)
- For read-only mounts, disable POSIX mode

---

## Credentials Work Elsewhere but Fail in Object Mount

**What’s happening:**

Some S3-compatible providers require custom regions, endpoints, or flags.

**What to try:**

- Use the **S3-Compatible** tab when importing  
- Select your provider from the dropdown  
- Set an explicit region (e.g. `us-east-1`)  
- Ensure the endpoint is reachable from your network

> For Storj: make sure the bucket is **lexicographically ordered** for best results

---

## Mount Is Very Slow or Freezes

**Common causes:**

- High latency to cloud provider  
- File system operations triggering too many API calls  
- No caching or prefetch enabled

**Suggested steps:**

- Enable **data cache** and **metadata cache** in Preferences  
- Set `CUNO_OPTIONS = -filePrefetch`  
- Increase S3 connection pool (e.g. 150–200 for 1Gbps+)  
- Avoid using POSIX mode unless required  
- Place cache directories on an internal SSD

---

## “Leave Files in Place” Doesn’t Work in Creative App

Some NLE Applications may try to verify write access or expect native macOS behaviour.

**Check:**

- Are you trying to import from a mounted Object Mount volume?  
- Is POSIX mode conflicting with permission checks?  
- Try relinking or using proxy workflows instead

---

## Logs Don’t Show Much Info

By default, logging is set to `error` only.

**To enable detailed logging:**

1. Go to **Preferences > Advanced Settings**  
2. Set **Log Level** to `debug` or `trace`  
3. Reproduce the issue  
4. Check the logs at:

- **macOS**: `~/Library/Application Support/Object Mount/cunoFS.log`  
- **Windows**: `C:\Users\%username%\AppData\Local\Object Mount\cunofs.log`

---

## Files Are Stalling on Paste

If files are stuck during paste, and you're on **Windows**:

- Try using the **Fast Paste Here** right-click option  
- This bypasses Windows shell copy and uses Object Mount’s optimised transfer logic

---

## Still Not Working?

Reach out via our [help desk](https://supportdcs.storj.io/hc/en-us/requests/new) and include:

- OS and Object Mount version  
- Cloud provider and bucket name  
- Screenshots or log excerpts  
- Steps to reproduce the issue

---

## Known Limitations

Here are a few current limitations to be aware of:

- POSIX mode requires write access and may silently fail if credentials are read-only  
- Finder/Explorer progress bars may not reflect real transfer status — check network activity instead  
- Avid Media Composer has limited tolerance for long mount paths or non-local scratch files  
- Some S3-compatible providers require manual configuration (e.g. region or endpoint overrides)  
- Mounts cannot currently be shared across users on the same machine (per-user context only)

---

Let us know if you’d like to contribute improvements or suggest workarounds — we're always refining based on real-world feedback.
