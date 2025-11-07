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

This article dives deep into configuring and using Direct Interception Mode in Object Mount for Linux.


## Direct Interception Mode

When running in **Direct Interception Mode**, Object Mount will insert itself between your applications and the operating system. It will dynamically redirect relevant file system calls made by shell commands and applications to the appropriate APIs of your object storage provider. This dynamic “mapping” between _file system concepts_ and _object storage interfaces_ gives your tools instant access to objects as files.

This dynamic “mapping” means any applications that can access file storage (including ones you’ve written yourself) can work with object storage as well. Object Mount intercepts any user binaries, including those written in C/C++, Rust, Go, Java, Python, etc. It’s built to work everywhere: It works with dynamic binaries and static binaries. It works inside unprivileged containerized environments.

{% callout type="note"  %}
  This includes applications you've written yourself &mdash; just treat the paths to object storage as local file system paths, and Object Mount handles the rest.
{% /callout %}

Direct interception uses the `LD_PRELOAD` environment variable so that Object Mount can capture and redirect storage access library and system calls through object storage APIs. 

  - If a static binary is intercepted, a JIT ELF binary translator will redirect relevant calls when the binary is loaded into memory.


## Highlights

  - Direct Interception offers the highest performance access to object storage that Object Mount provides.
  - Direct Interception Mode is the default mode and the most common mode for Object Mount to be deployed in.
  - Unless otherwise noted, all documentation pages and installation instructions are written assuming you are using “Direct Interception Mode”.


## Example Use Cases

  - Direct Interception Mode is best suited for situations in which installed app compatibility is not a primary concern.
  - For example, when setting up a fixed workflow with Object Mount that can be tested and verified before putting it into production.

{% callout type="warning"  %}
  Direct Interception Mode does _not_ currently support SUID binaries, or certain packaged apps like 🌐 [Snap](https://ubuntu.com/core/services/guide/snaps-intro), 🌐 [AppImage](https://appimage.org/), or 🌐 [Flatpak](https://docs.flatpak.org/en/latest/introduction.html) applications. 
  
  See [Object Mount on FUSE](docId:ZdvWLcm9uFmM5HLk) and/or [Object Mount FlexMount](docId:cFUt9zgCRFFDk5Sq) to support these tools.
{% /callout %}


## Advantages and Disadvantages

| **Advantages** | **Disadvantages** |
|----------------|---------------|
| **Speed:** Dynamic interception offers the best performance. | **Compatibility:** Direct interception does not currently support SUID binaries, [Snaps](https://ubuntu.com/core/services/guide/snaps-intro), [AppArmor](https://ubuntu.com/server/docs/security-apparmor), or [Flatpak](https://docs.flatpak.org/en/latest/introduction.html) applications. |
| **Set up time:** This is the default mode - all you have to do is launch an Object Mount shell with the `cuno` CLI. | **Activation:** In some cases, it is difficult to enable direct interception or keep it enabled (because of environment variable clobbering or lack of privileges to set/use LD_PRELOAD). |
| **Linux Native:** For users who are skilled with Linux, using the `cuno` CLI is quick, easy, and effortless. | **Non-technical users:** If Object Mount is being used people with minimal Linux skills, teaching them how to use the Object Mount shell and diagnose if it’s working correctly may be less desirable than setting up a Object Mount on FUSE on their behalf. |


## How to Enable

Direct Interception Mode can be enabled per-session or per-command. 

### Direct Interception: Per-Session

Enable it for a single shell session by calling `cuno` from a terminal command line:

```shell
# terminal
cuno
```

This will launch a new interactive "wrapped" shell with Object Mount acting in Direct Interception Mode. The shell itself has Object Mount monitoring its I/O calls, so every command entered or application launched from within the wrapped shell will be monitored and intercepted by Object Mount

{% callout type="note"  %}
  When `cuno` is used to launch a new shell, the shell is launched with `LD_PRELOAD` set to point at `cuno.so`. 

  - There is no Object Mount shell binary.
  - `cuno` only wraps existing shells (bash, zsh, etc.) with Object Mount pre-loaded.
{% /callout %}

### Direct Interception: Per-Command

To enable direct interception for a single command, use:

```console
cuno run bash -c "<your command and arguments>"
```

{% callout type="note"  %}
It is recommended to execute one-time commands in this fashion to maintain support for wildcard expansion (`*`) .
{% /callout %}


## Usage

Inside the shell, object storage buckets can be accessed using either **path** or **URI** formats.  

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

{% tab label="Google Cloud Storage" %}
   ```shell
  # terminal
  cuno
  (cuno)$ ls gs://<bucket>/<path>
  (cuno)$ ls /cuno/gs/<bucket>/<path>
   ```
{% /tab %}

{% tab label="S3-compatible" %}
  ```shell
  # terminal
  cuno
  (cuno)$ ls s3://<bucket>/<path>
  (cuno)$ ls /cuno/s3/<bucket>/<path>
   ```
{% /tab %}

{% /tabs %}


## Shell Interaction

`bash` and `zsh` are fully supported when using the Object Mount CLI.

This includes support for:
  - Tab auto-completion of remote paths
  - Wildcard expansion (`*`) of filesystem and remote paths

In either of these fully-supported shells, the prompt will be prefixed with `(cuno)` to indicate that Direct Interception is enabled and that you are using an Object Mount CLI shell::

```console
(cuno) user@host:~$
```

### Detecting Shells

To select between the two shells, Object Mount determines if either is present in one of the following, _in order_:

1. The shell used to launch Object Mount
2. The user’s preferred login shell
3. All installed shells.

If neither `bash` nor `zsh` are found, then the first shell in this list is used. If no shell is set, then `/bin/sh` is used.

{% callout type="warning" %}
  The behavior described here relies on `ps`. Depending on your method of installation, you may need to install `ps` manually (RHEL derivatives install package ``procps``).
{% /callout %}

### Specifying Shells

To launch a specific shell with Object Mount enabled, use `cuno run`:

```console
cuno run <shell>
```


## Additional Reference Material

  - See [user-guide-cloud-paths](../user-guides/access) for additional info on specifying cloud paths using the Object Mount CLI.
