---
title: Application Tips
hideTitle: false
docId: lawaDooteicha9li
weight: 6
redirects:
  - /object-mount/linux/user-guides/tips
metadata:
  title: Application Tips
  description: 
    Application Tips when using Object Mount for Linux.
hidden: false
---

This article provides additional recommendations and guidance when using Object Mount for Linux with the following applications:


## Python

Python’s `os.path.realpath(path)` does not support [URI formatted](docId:jieteeYeyievui9k) cloud paths (e.g.: `s3://<bucket_name>/path`).

Use directory formatted cloud paths instead (e.g.: `/cuno/s3/<bucket_name>/path`).


## Rsync

We strongly recommend running `rsync` with the options `--inplace -W`. This makes Rsync work more efficiently with object storage.

To use Rsync options that preserve permissions (`-p`) and modification times (`-t`), such as when you want to update files _only_ when the source has been updated, you must enable POSIX File Access.

See the Getting Started Guide: [POSIX File Access](docId:xhNvtETAA6UBZVNH#posix-file-access) for details.


## Fpsync

When using `fpsync`, use the `-o` option to pass the options recommended for `rsync` down to the worker processes (e.g.: `-o "--inplace -W"`).

Further, because Object Mount is already parallelized, we recommend limiting the number of Fpsync worker processes using the `-n` option.


## FFmpeg

While `ffmpeg` works, it may be slow in the following use-cases:

  - Writing to object storage: If the task requires many randomly-placed writes during an upload. For example, for a large mp4 file being written with the flags `-movflags +faststart`.

  - Reading from object storage: A complex filter chain, where multiple subtitle streams are being read from the same input file. 
    - Improvements in this area are being developed.

  - Reading from object storage: Files that contain title screen and extra credit scenes can be slow to start.


## Using sudo with Direct Interception

Using [Direct Interception](docId:UHsd5HnesueQyhnZ) requires the `LD_PRELOAD` environment variable to be set and maintained for all executed child processes. 

Since `sudo` usage, by default, does not preserve the environment variables set, the following requirements apply:

  - `sudo` needs to be run with `--preserve-env` to preserve `CUNO_OPTIONS`.
  - `sudo` needs to launch a child shell that will then run the command, so that the `LD_PRELOAD` environment variable can be set _before_ running the command to be intercepted.
  - `LD_PRELOAD` needs to be manually set inside the child shell launched.

To use `sudo` with Direct Interception, please do the following:

  1. Start a wrapped-shell using the Object Mount CLI: `cuno`

  2. Run `sudo` in the following way:

      ```console
      sudo --preserve-env /bin/bash -c "export LD_PRELOAD=$LD_PRELOAD && <YOUR COMMAND HERE>"
      ```


## Locate and UpdateDB

The `locate` command requires some heightened privileges to create the file path database. It also has some incompatibilities with Object Mount [Direct Interception](docId:UHsd5HnesueQyhnZ) Mode.

When using Direct Interception Mode, both `locate` and `updatedb` will not work with [URI formatted](docId:jieteeYeyievui9k) cloud paths (e.g.: `s3://<bucket_name>/path`).

Use directory formatted cloud paths instead (e.g.: `/cuno/s3/<bucket_name>/path`).

Furthermore, Direct Interception (even when using the Object Mount CLI) requires the `LD_PRELOAD` environment variable to be set and maintained for all executed child processes. 

**Note:** Since `updatedb` typically needs to be run with `sudo`, the limitations specified for **`sudo` with Direct Interception** (above) apply here as well.

### Instructions for Running UpdateDB

To help work around these limitations, follow the guidance below when using `locate` and `updatedb`:

1. **Create a New Database**

    {% tabs %}
    {% tab label="Direct Interception Mode" %}
      Run the Object Mount CLI by entering the `cuno` command:
      
      ```console
      # terminal
      cuno
      ```
      
      Then run `updatedb` inside the Object Mount-wrapped shell, using the `sudo` recommendations with cloud paths specified in the directory format. (We use an example database name of: `cunoloc.db`).
        
      ```console
      (cuno) $ sudo --preserve-env /bin/bash -c "export LD_PRELOAD=$LD_PRELOAD && updatedb -U /cuno/<s3/az/gs>/<bucket> -o cunoloc.db"
      ```
    {% /tab %}

    {% tab label="Object Mount on FUSE" %}
      Assuming you have abject Mount on FUSE set up at `~/my-object-storage`, you can use `updatedb` _directly_ to crawl all paired buckets from all your object storage providers:

      ```console
      sudo updatedb -U ~/my-object-storage -o cunoloc.db
      ```

      {% callout type="note" %}
        **Mount Location Consistency**

        The mount location (`~/my-object-storage` in the example above) should not be change after running `updatedb` as the mount details are written into the file path database.
      {% /callout %}
    {% /tab %}
    {% /tabs %}

2. **Change the Database Ownership**

    The newly created database needs to have its ownership changed back to the current user:

    ```console
    sudo chown $(whoami):$(whoami) cunoloc.db
    ```

3. **Add the Database to Your `LOCATE_PATH`**

    Update the `LOCATE_PATH` environment variable to include the database. 
   
    Then use locate normally, or search within the database, as follows:

    ```console
    locate -d cunoloc.db myfile
    ```

### Modify the Locate cron Job

By default, the global locate database is periodically updated by a cron job. 

To setup the cron job to work properly with Object Mount, you need to edit the file `/etc/cron.daily/mlocate`. 

The last line of that file is used to update the global database:

```console
flock --nonblock /run/mlocate.daily.lock $NOCACHE $IONICE nice /usr/bin/updatedb.mlocate
```

Modify that line, replacing it with something similar to the line below:

```console
LD_PRELOAD='/usr/lib/cuno.so' CUNO_OPTIONS='<your options>' CUNO_CREDENTIALS='<path to credentials usable by the root user>' flock --nonblock /run/mlocate.daily.lock $NOCACHE $IONICE nice /usr/bin/updatedb.mlocate
```

If you prefer not to index _all_ of your object storage files, you can specify where `updatedb` does _not_ look for files by adding paths to `PRUNEPATHS` in the file `/etc/updatedb.conf`.
