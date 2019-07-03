# Uplink CLI tutorial

Setup your uplink by running the following command and following the wizard:

The Uplink CLI is our client-side application that supports interacting with the Storj network. This tutorial assumes you have an account on a running Satellite and uses a [test network](https://github.com/storj/docs/tree/543f364e6ede7e9046e2dfc35ac55ce6df33dcc1/Test-network/README.md) Satellite by default.

## Installation and configuration

First, if you haven't already followed the preparation steps in [https://github.com/storj/storj/wiki/Vanguard-Release-Setup-Instructions](https://github.com/storj/storj/wiki/Vanguard-Release-Setup-Instructions), please do so.

Next, Download the correct binary for your operating system:

* Mac OS: [uplink\_darwin\_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/ab7f561-v0.14.4-go1.12.5/uplink_darwin_amd64.zip)
* Linux: [uplink\_linux\_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/ab7f561-v0.14.4-go1.12.5/uplink_linux_amd64.zip)
* Raspberry Pi: [uplink\_linux\_arm.zip](https://storj-v3-alpha-builds.storage.googleapis.com/ab7f561-v0.14.4-go1.12.5/uplink_linux_arm.zip)
* Windows Pro: [uplink\_windows\_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/ab7f561-v0.14.4-go1.12.5/uplink_windows_amd64.exe.zip)

Setup your uplink by running the following command and following the wizzard:

```bash
./uplink_darwin_amd64 setup
```

You will be prompted for:

* Satellite: The satellite you want to connect your uplink to. You can choose one from the list of type one eg. `us-central-1.tardigrade.io:7777` or `127.0.0.1:10000` if you are using the test network.
* API key: The API key that you generate for a project on the Satellite console. If you are using the test network, you can use the API key provided when you run it.
* Encryption passphrase: The passphrase you choose in order to encrypt your files. Keep this secret and safe. This passphrase will grant you access to all of your files, and if you lose it, you will not be able to recover your files. 

You are now ready to interact with your files on the Tardigrade Network!

## Usage

The `uplink` command has a number of operations that can be performed, such as:

* `cat` - output a file to standard out
* `cp` - copy a file from outside of Storj to inside or vice versa
* `ls` - list buckets or files in Storj
* `mb` - make a new bucket
* `mount` - mount a bucket to a location in your Linux filesystem for read-only access.
* `put` - writes data from standard in to a file in Storj
* `rb` - remove a bucket
* `rm` - remove a file.

More information for each command is provided in the command's `--help` documentation, but some example commands are listed below:

### Make a bucket

```bash
./uplink_darwin_amd64 mb sj://bucket-name
```

### Upload a file

```bash
./uplink_darwin_amd64 cp ~/Desktop/your-large-file.mp4 sj://bucket-name
```

### List files in a bucket

```bash
./uplink_darwin_amd64 ls sj://bucket-name/
```

### Download a file

```bash
./uplink_darwin_amd64 cp sj://bucket-name/your-large-file.mp4 ~/Desktop/your-large-file.mp4
```

### Delete a file

```bash
./uplink_darwin_amd64 rm sj://bucket-name/your-large-file.mp4
```

### Show files in filesystem

```bash
mkdir -p ~/bucket-name
uplink mount sj://bucket-name/ ~/bucket-name/
```

This only works well on Linux for now, but macOS and Windows support is planned!

## Conclusion

And that's it! You now know how to perform basic operations on a Storj bucket, and you've been able to get `uplink` working.

We also have a tutorial on [S3 integration](https://github.com/storj/docs/blob/master/S3-Gateway.md) which you could check out. Or, think this could be improved? Open a PR or file an issue.

Now go and decentralize all the things!

