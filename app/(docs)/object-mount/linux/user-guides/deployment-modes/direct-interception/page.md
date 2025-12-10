---
title: Direct Interception
hideTitle: false
docId: UHsd5HnesueQyhnZ
weight: 1
metadata:
  title: Configuring Direct Interception Modes
  description:
    Details on the use and configuration of Direct Interception Mode in Object Mount for Linux.
hidden: false
---

This article dives into the configuration and use of **Direct Interception Mode** in Object Mount for Linux.


## Overview

When running in **Direct Interception Mode**, Object Mount will insert itself between your applications and the operating system. It will dynamically redirect relevant file system calls made by shell commands and applications to the appropriate APIs of your object storage provider. This dynamic “mapping” between _file system concepts_ and _object storage interfaces_ gives your tools instant access to objects as files.

This direct interception means _any_ applications that can access file storage can now work with object storage. Object Mount intercepts I/O calls from any user binaries, including those written in C/C++, Rust, Go, Java, Python, etc. 

It’s built to work everywhere: It works with dynamic binaries and static binaries. It works inside unprivileged containerized environments.

{% callout type="note" %}
  **Support for Any Application**
  This includes applications you’ve written yourself &mdash; just treat the paths to object storage as local file system paths. Object Mount handles the rest.
{% /callout %}

Direct interception Mode uses the `LD_PRELOAD` environment variable so that Object Mount can capture and redirect storage access library and system calls to object storage APIs. 

  - If a static binary is intercepted, a JIT ELF binary translator will redirect relevant calls when the binary is loaded into memory.


## Highlights

  - Direct Interception offers the highest performance access to object storage that Object Mount provides.
  - Direct Interception Mode is the _default mode_ and the most common mode for Object Mount to be deployed in.
  - Unless otherwise noted, all documentation pages and installation instructions are written assuming you are using “Direct Interception Mode”.


## Example Use Cases

  - Direct Interception Mode is best suited for situations in which installed app compatibility is not an issue.
  - For example: When setting up a fixed workflow with Object Mount that can be tested and verified before putting it into production.

{% callout type="warning" %}
  **Direct Interception vs. Object Mount on Fuse**

  Direct Interception Mode does _not_ currently support SUID binaries, or certain packaged apps like 🌐 [Snap](https://ubuntu.com/core/services/guide/snaps-intro), 🌐 [AppImage](https://appimage.org/), or 🌐 [Flatpak](https://docs.flatpak.org/en/latest/introduction.html) applications. 
  
  See [Object Mount on FUSE](docId:ZdvWLcm9uFmM5HLk) and/or [Object Mount FlexMount](docId:cFUt9zgCRFFDk5Sq) to support these tools.
{% /callout %}


## Advantages and Disadvantages

| **Advantages**                   | **Disadvantages** |
|----------------------------------|---------------|
| **Speed:** Dynamic interception offers the best performance. | **Compatibility:** Direct interception does not currently support SUID binaries, [Snaps](https://ubuntu.com/core/services/guide/snaps-intro), [AppArmor](https://ubuntu.com/server/docs/security-apparmor), or [Flatpak](https://docs.flatpak.org/en/latest/introduction.html) applications.
| **Set up time:** This is the default mode &mdash; just launch an Object Mount shell with the `cuno` CLI command. | **Activation:** In some cases, it is difficult to enable direct interception or keep it enabled (because of environment variable clobbering or lack of privileges to set/use LD_PRELOAD). |
| **Linux native:** For users who are skilled with Linux, using the `cuno` CLI is quick, easy, and non-intrusive. | **Non-technical users:** If Object Mount is being used by team members with only minimal Linux skills, teaching them how to use the Object Mount shell and diagnose if it’s working correctly may be less desirable than setting up a Object Mount on FUSE on their behalf. |


## How to Enable

Direct Interception Mode can be enabled per-session or per-command. 

### Direct Interception: Per-Session

Enable Object Mount for a **single shell session** by calling `cuno` from a terminal command line:

```shell
# terminal
cuno
```

This will launch a new interactive “wrapped shell” with Object Mount acting in Direct Interception Mode. 

The wrapped shell itself has Object Mount monitoring all its I/O calls &mdash; so every command entered or application launched from within the wrapped shell will be monitored and intercepted by Object Mount

{% callout type="note" %}
  **Object Mount CLI `cuno` as a Wrapper**

  When `cuno` is used to launch a new shell, the shell is launched with `LD_PRELOAD` set to point at `cuno.so`. 

  - There is no Object Mount shell binary.
  - `cuno` only “wraps” existing shells (bash, zsh, etc.) with Object Mount pre-loaded.
{% /callout %}

### Direct Interception: Per-Command

To enable direct interception for a **single command**, use:

```console
cuno run bash -c "<your command and arguments>"
```

{% callout type="note" %}
  **Best Practice for Running Single Commands**

  It is recommended to execute one-time commands in this fashion to maintain support for Wildcard expansion (`*`) of filesystem and remote paths.
{% /callout %}


## Path Usage

Inside a `cuno`-wrapped shell session, object storage buckets can be accessed using either **path** or **URI** formats. 

The commands below provide examples of both path and URI usage within a `cuno`-launched shell:

{% tabs %}

{% tab label="AWS S3" %}
  ```shell
  # terminal
  cuno
  (cuno)$ ls s3://<bucket>/<path>
  (cuno)$ ls /cuno/s3/<bucket>/<path>
  ```
{% /tab %}

{% tab label="Storj" %}
  ```shell
  # terminal
  cuno
  (cuno)$ ls s3://<bucket>/<path>
  (cuno)$ ls /cuno/s3/<bucket>/<path>
  ```
{% /tab %}

{% tab label="Microsoft Azure" %}
  ```shell
  # terminal
  cuno
  (cuno)$ ls az://<account name>/<bucket>/<path>
  (cuno)$ ls /cuno/az/<account name>/<bucket>/<path>
  ```
{% /tab %}

{% tab label="Google Cloud" %}
   ```shell
  # terminal
  cuno
  (cuno)$ ls gs://<bucket>/<path>
  (cuno)$ ls /cuno/gs/<bucket>/<path>
   ```
{% /tab %}

{% tab label="Other S3 Compatible" %}
  ```shell
  # terminal
  cuno
  (cuno)$ ls s3://<bucket>/<path>
  (cuno)$ ls /cuno/s3/<bucket>/<path>
   ```
{% /tab %}

{% /tabs %}

{% callout type="info" %}
  **Cloud Paths**

  For additional information on specifying cloud paths using the Object Mount CLI, see the Linux User Guide article: [](docId:jieteeYeyievui9k).
{% /callout %}


## Shell Interaction

`bash` and `zsh` are fully supported when using the Object Mount CLI.

This includes support for:
  - Tab auto-completion of remote paths
  - Wildcard expansion (`*`) of filesystem and remote paths

In either of these fully-supported shells, the prompt will be prefixed with `(cuno)` to indicate that Direct Interception is enabled and that you are using an Object Mount CLI-wrapped shell::

```console
(cuno) user@host:~$
```

### Detecting Shells

To select between the two shells, Object Mount determines if either is present using the following methods (in order):

1. The shell used to launch Object Mount
2. The user’s preferred login shell
3. All installed shells

If neither `bash` nor `zsh` are found, then the first shell in this list is used. If no shell is set, then `/bin/sh` is used.

{% callout type="warning" %}
  **Processor Snapshot (`ps`) usage**

  The behavior described here relies on `ps`. 
  
  Depending on your method of installation, you may need to install `ps` manually. (For RedHat/RHEL derivatives, install package `procps`).
{% /callout %}

### Specifying Shells

To launch a **specific shell** with Object Mount enabled, use `cuno run`:

```console
cuno run <shell>
```
