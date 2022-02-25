# How to use Plex and Storj DCS as a private streaming service

## Video Storage

Managing a multimedia library can be tedious and time-consuming. Organizing your saved movies and TV shows into a streamable format requires effort to index, sort, and optimize the video files for playback. Fortunately, programs like Plex exist to make this easier. Plex is a media player platform that provides clients for desktop, mobile, and TV devices. These clients can stream from online services or your own downloaded videos.

## Video Playback from Anywhere

With the Storj DCS decentralized video storage service, your multimedia objects are available anywhere, at any time. Decentralized video storage offers many advantages over traditional centralized storage. These include higher availability, better security, and a lower operating budget.

With decentralized storage, your videos are distributed across a global network of nodes. This ensures more reliable access with fewer single points of failure. For that same reason, your files are not vulnerable to the security measures that may or may not exist for one central data repository. Additionally, Storj's network eliminates many of the maintenance and engineering costs of centralized object storage services.

The ability to store and retrieve your video files from anywhere using Storj's global network is great for hosting the files. But what about streaming and playback? Connecting Storj as the multimedia backend to a service like Plex would give the advantages of both services. Specifically, that means we want reliable, decentralized storage _with_ convenient streaming playback. Thankfully this is all possible!

## Setting up Storj with Plex Using Rclone

[Rclone](https://rclone.org) is a program that helps with the management of files on various cloud storage services. It provides a command called [`rclone mount`](https://rclone.org/commands/rclone\_mount/) that allows files on cloud storage to be mounted as a local filesystem.

For this guide, we are going to show how to set up Rclone to sync your local files with Storj DCS. This can then serve as your storage backend for a service like Plex.

### Getting Started

You should start by reading the [Storj docs on setting up Rclone integration](sync-files-with-rclone/). Follow the steps to configure your Storj access credentials using the `rclone config` command.

These docs show how to run basic commands to sync files from your local system to Storj buckets, but we would like to go a step further and mount a Storj bucket as its own filesystem. This will provide persistent storage for our video streaming service.

### Mounting the Filesystem

The `rclone mount` command can be used to mount a cloud storage service as a local filesystem. With this enabled, Rclone can bidirectionally copy new files to Storj and read them from your buckets for playback in the Plex client.

Mount your file directories with this command:

```
rclone mount Storj:media X:\ --vfs-cache-mode full --dir-cache-time 1h --read-only --no-checksum --no-modtime --rc
```

This command does a few things:

* `rclone mount Storj:media X:\` maps to `rclone mount <remote>:<path/to/files> <path/to/local/mount>`, where `<remote>` is the Storj interface configured with Rclone following the steps in [**Getting Started**](how-to-use-plex-and-storj-dcs-as-a-private-streaming-service.md#getting-started), `<path/to/files>` is the location in the Storj bucket where media files will be hosted, and `<path/to/local/mount>` is the directory on your local system that the Storj service should be mounted as.
* `--vfs-cache-mode full` sets the [VFS file cache settings](https://rclone.org/commands/rclone\_mount/#vfs-file-caching) for optimal file cache buffering
* `--dir-cache-time 1h` sets the directory cache time to one hour
* `--read-only` specifies that the mount should be read-only
* `--no-checksum` disables checksums for better performance
* `--no-modtime` prevents modification times from being written so that Plex doesn't pick them up as changed files
* `--rc` enables remote control of Rclone via its API. This will be used to issue commands to sync the Rclone mount below.

### Syncing New Files to Storj With Rclone

Even though your Storj bucket is now mounted to your local filesystem, you may want to add new files to your Plex setup. In order to do this, we can move the files to the mounted buckets and tell Rclone to sync the entire system while it is running.

To move new files to your Storj bucket, we can use the [`rclone move`](https://rclone.org/commands/rclone\_move/) command like so:

```
rclone move -P D:\shows\ Storj:media/shows/ --delete-empty-src-dirs --fast-list --drive-chunk-size=64M --max-backlog=999999 --transfers=8 --checkers=4 --no-traverse
```

The flags in this command such as `--transfers` may require some tweaking to work best based on your available CPU and memory. But the command is essentially copying files from the local `D:\shows\` directory to the `media/shows/` folder in our Storj bucket.

### Refreshing the Local Sync Location

Now that the files have been copied, we need to notify the mounted Rclone directory to refresh its contents. We can issue commands directly to the Rclone mount while it is running thanks to the `--rc` flag that was passed to it when we set up the mount. This is done by running [`rclone rc`](https://rclone.org/rc/).

Sync your Rclone mount with this command:

```
rclone rc vfs/refresh -v --fast-list recursive=true
```

This recursively refreshes the root directory of the Rclone mount to pick up the newly uploaded files in Storj.

**Tip:** You can even run `rclone move` and `rclone rc vfs/refresh` on a script or job to automatically keep your multimedia service up-to-date.

## Wrapping Up

Now that you've set up Rclone to read and write to your Storj DCS buckets, you can configure Plex to use your mounted buckets as a storage location. Some tips for configuring Plex with this setup are:

* Under Settings > Library, uncheck "empty trash automatically after each scan"
* Check "use partial scan" so that Plex doesn't scan the entire Storj mount every time new content is discovered

These, along with the other steps we took while setting up the mount, will help optimize Plex performance when reading from Storj.

With Plex configured to use Storj DCS for storage, you now have a convenient streaming and organization platform backed by reliable, decentralized object storage.
