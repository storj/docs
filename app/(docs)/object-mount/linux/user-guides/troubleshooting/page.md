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

This guide covers common issues encountered when using **Object Mount**, along with clear steps to resolve them. If you’re stuck, this is a good first place to check before reaching out to support.

---

## Mount Won’t Appear or Activate

**Possible Causes:**

- Incorrect credentials  
- No accessible buckets  
- macFUSE or WinFsp not installed or authorized  
- POSIX mode enabled without write access

**What to check:**

- Verify your license is active (`About` tab)  
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
- Increase S3 connection pool (e.g. 150-200 for 1Gbps+)  
- Avoid using POSIX mode unless required  
- Place cache directories on an internal SSD

---

## “Leave Files in Place” Doesn’t Work in Creative App

Some NLE Applications may try to verify write access or expect native macOS behavior.

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

If files are stuck during paste, and you’re on **Windows**:

- Try using the **Fast Paste Here** right-click option  
- This bypasses Windows shell copy and uses Object Mount’s optimized transfer logic

---

## Still Not Working?

If you still need assistance in resolving your issue, follow the steps below to enable detailed logging and send the log files to the Storj Support team.

For macOS and Windows environments: 

1. Run Object Mount, choose the **Settings** tab, and scroll down to **Advanced Settings**:

    - Change the “Object Mount log level” to `Trace`.
    - Set “Filesystem debug logging” to `On`.
    - Click the **Apply** button.

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-enable-trace-logs-01.jpg)

2. Choose the **About** Tab:

    - Click **Report Issue**.
    - Enter a **Title**.
    - Enter details and/or **Steps to Reproduce** the issue.
    - Ensure that **Include my system information** is checked.
    - Click the **Continue** button.

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-enable-trace-logs-02.jpg)

3. Save the Issue Report:

    - Name your `.zip` file.
    - Click **Save** to store a `.zip` file on your local drive.

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-enable-trace-logs-03.jpg)

4. Attach the `.zip` file and send the report:

    - Click the **Submit Via Email** button:

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-enable-trace-logs-04.jpg)

    - Your default Email application will load with content preloaded.
    - **IMPORTANT**: You must _manually_ attach the `.zip` file to the email!

      ![](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/om-docs/om-enable-trace-logs-05.jpg)

    - _Once attached_, click to **Send** the message to the Storj Object Mount support team.

Alternatively you can open a [support ticket](https://supportdcs.storj.io/hc/en-us/requests/new) and include:

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

Let us know if you’d like to contribute improvements or suggest workarounds — we’re always refining based on real-world feedback.
