---
title: Tips for Apps
docId: lawaDooteicha9li

metadata:
  title: Tips for Apps
  description: Usage tips for some applications

weight: 12    
---

There are some general ideas presented in [user-guide-core-concepts](../user-guides/core-concepts) that should help inform usage of object storage with your software. For example, object storage is not very good for high IOPS work loads, so prefer to use [Object Mount Fusion](Object Mount-fusion-guide) for that use-case.

The following are some applications for which we have additional guidance when using then in combination with Object Mount. If you have more to add to the list, let us and the community know at our [help desk](https://supportdcs.storj.io/hc/en-us/requests/new).

## Applications

### Python

Python's `os.path.realpath(path)` is not supported for URI-based access like `xx://`. Use path-format instead (e.g. `/cuno/s3/bucket/path`).

### Rsync

We strongly recommend running `rsync` with the options `--inplace -W`. This makes rsync work more efficiently with object storage.

To use rsync options that preserve permissions (`-p`) and modification times (`-t`), such as when you want to update files only when the source has been updated, you must enable [POSIX File Access](../getting-started/configuration-modes#posix-file-access).

### Fpsync

When using `fpysync`, use the `-o` option to pass the options recommended for rsync down to the worker processes, e.g. `-o "--inplace -W"`. Further, because Object Mount is already parallelised, we recommend limiting the number of Fpsync worker processes using the `-n` option.

To use rsync options that preserve permissions (`-p`) and modification times (`-t`), such as when you want to update files only when the source has been updated, you must enable [POSIX File Access](../getting-started/configuration-modes#posix-file-access).

### FFmpeg

While ``ffmpeg`` works, it may be slow for the following use-cases:

- Writing to object storage, if the task requires many randomly-placed writes during an upload. For example, for a large mp4 file being written with the flags ``-movflags +faststart``.

- Reading from object storage, a complex filterchain where multiple subtitle streams are being read from the same input file. (This will be improved soon! Be the first to find out by contacting our [help desk](https://supportdcs.storj.io/hc/en-us/requests/new))

- Reading from object storage, files that contain title screen and extra credit scenes can be slow to start.

### sudo with Direct Interception

Using [Direct Interception](../user-guides/basic#direct-interception-with-object-mount-cli) (including when using the Object Mount CLI) requires the `LD_PRELOAD` environment variable to be set and maintained for all executed child processes. Since `sudo` usage by default does not preserve the environment variables set, the following requirements apply:

- `sudo` needs to be run with `--preserve-env` to preserve `CUNO_OPTIONS`
- `sudo` needs to launch a child shell that will then run the command, so that the `LD_PRELOAD` environment variable can be set before running the command to be intercepted.
- `LD_PRELOAD` needs to be manually set inside the child shell launched

To use `sudo` with Direct Interception, please do the following:

1. Start a wrapped-shell using Object Mount CLI: `cuno`

2. Run sudo in the following way:

   ```console
   sudo --preserve-env /bin/bash -c "export LD_PRELOAD=$LD_PRELOAD && <YOUR COMMAND HERE>"
   ```

### Locate

The `locate` application requires some heightened privileges to create the database, and also has some incompatibilities with Object Mount [Direct Interception](../user-guides/basic#direct-interception-with-object-mount-cli) .

#### Issues with Direct Interception

When using [Direct Interception](../user-guides/basic#direct-interception-with-object-mount-cli), note that `locate` and `updatedb` do not work with URI-style paths. Please use directory-style paths of the form `/cuno/xx/<bucket>`.

Furthermore, Direct Interception (even when using the Object Mount CLI) requires the `LD_PRELOAD` environment variable to be set and maintained for all executed child processes. Since `updatedb` typically needs to be run with `sudo`, the limitations specifed in [user-guide-limitations-sudo](#sudo-with-direct-interception) apply here.

#### Instructions for using Locate

To help work around these limitations, we provide steps below on how to use `locate`.

1. Create a new database, which we call `cunoloc.db`:
{% tabs %}
{% tab label="Using Object Mount on FUSE" %}
Assuming you have a Object Mount on FUSE set up at ``~/my-object-storage``, you can use ``updatedb`` directly to crawl all paired buckets from all your object storage providers:
```console
sudo updatedb -U ~/my-object-storage -o cunoloc.db
```
{% callout type="warning"  %}
The mount location should not change (``~/my-object-storage`` in the example above), because it will be written into the database created.
{% /callout %}
{% /tab %}
{% tab label="Using Direct Interception" %}
 Run ``updatedb`` with the workarounds for sudo:
 ```shell
 # terminal
 cuno
 ```
 
 Run ``updatedb`` inside the shell, using a cloud path in the directory format:
```console
(cuno) $ sudo --preserve-env /bin/bash -c "export LD_PRELOAD=$LD_PRELOAD && updatedb -U /cuno/<s3/az/gs>/<bucket> -o cunoloc.db"
```
{% /tab %}
{% /tabs %}

2. Change the database ownership back to your current user:

   ```console
   sudo chown $(whoami):$(whoami) cunoloc.db
   ```

3. Add the database to your `LOCATE_PATH` environment variable and use locate normally; or search within the database, as follows:

   ```console
   locate -d cunoloc.db myfile
   ```

#### Setting up the Locate cron job

By default, the global locate database is periodically updated by a cron job. To setup the cron job for Object Mount, you need to edit the file `/etc/cron.daily/mlocate`. The last line updates the global database:

```console
flock --nonblock /run/mlocate.daily.lock $NOCACHE $IONICE nice /usr/bin/updatedb.mlocate
```

This should be replaced with something like:

```console
LD_PRELOAD='/usr/lib/cuno.so' CUNO_OPTIONS='<your options>' CUNO_CREDENTIALS='<path to credentials usable by the root user>' flock --nonblock /run/mlocate.daily.lock $NOCACHE $IONICE nice /usr/bin/updatedb.mlocate
```

If you don't want to index all of your object storage, you can specify where `updatedb` does **not** look for files by adding paths to `PRUNEPATHS` in the file `/etc/updatedb.conf`.
