---
title: POSIX Mode Explained
docId: posix-mode
weight: 6
metadata:
  title: POSIX Mode in Object Mount
  description:
    Understand how POSIX mode works in Object Mount and when to enable or disable it.
---

**POSIX mode** in Object Mount provides additional compatibility for applications that rely on traditional UNIX-style file permissions and metadata.

This feature emulates POSIX behaviour on top of S3 object storage, which by default lacks concepts like file ownership, permissions, and modification timestamps in the same way as a local file system.

---

## What is POSIX Mode?

When enabled, POSIX mode adds a virtual layer that stores and retrieves metadata typically expected in Linux or macOS environments — including:

- File ownership (`uid`, `gid`)  
- Read/write/execute permissions  
- Timestamps (`mtime`, `ctime`, etc.)  
- Symbolic links and directory flags (where supported)

This metadata is stored in a hidden index file at the root of the bucket.

---

## When to Enable POSIX Mode

You should enable POSIX mode if:

- You’re working with software that checks for or enforces POSIX-style permissions  
- You require symbolic link emulation or fine-grained permission mapping  
- You're mounting object storage as a shared filesystem in team environments

---

## When Not to Enable POSIX Mode

- **Read-only access**:
 
  POSIX mode requires **write access** to the bucket in order to store the hidden metadata file. If your credentials are read-only, POSIX mode will not function and may prevent the mount from working correctly.

- **Lightweight access**:

  For read-only workflows or general browsing, POSIX mode is typically unnecessary and can be left disabled.

---

## Why Write Access is Required

The metadata file used for POSIX emulation needs to be written and maintained at the root of the bucket. This is why:

- Buckets must be writable  
- The credentials must allow `s3:PutObject` and `s3:DeleteObject` on that path  
- You should **not** enable POSIX mode with read-only credentials — it will fail silently or generate errors

---

## Enabling POSIX Mode

You can enable POSIX mode when creating a new mount:

- In the **Mounts** tab, select **Create new mount**
- Tick the checkbox for **Enable POSIX mode**
- Ensure your credentials and bucket support write access
- Save the mount and toggle it on

> Note: POSIX mode applies on a **per-mount basis**, so you can choose which mounts require it and which don’t.

---
