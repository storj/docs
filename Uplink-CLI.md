# Uplink CLI tutorial

The Uplink CLI is our client-side application that supports interacting with
the Storj network. This tutorial assumes you have an account on a running
Satellite and uses a [test network](Test-network) Satellite by default.

## Installation and configuration 

First, Download the correct binary for your operating system:

- Mac OS: [uplink_darwin_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/fc611d6-release-alpha6-go1.11/uplink_darwin_amd64.zip)
- Linux: [uplink_linux_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/fc611d6-release-alpha6-go1.11/uplink_linux_amd64.zip)
- Raspberry Pi: [uplink_linux_arm.zip](https://storj-v3-alpha-builds.storage.googleapis.com/fc611d6-release-alpha6-go1.11/uplink_linux_arm.zip)
- Windows Pro: [uplink_windows_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/fc611d6-release-alpha6-go1.11/uplink_windows_amd64.zip)


Run the Uplink setup command after editing `client.api-key`, `satellite-addr`, `enc.key`. 

- `client.api-key`: API key that you generate for a project on the Satellite console.
- `satellite-addr`: The satellite you want to connect your uplink to is mars.tardigrade.io:7777.
- `enc.key`: The passphrase you choose in order to encrypt your files. Keep this secret and
safe. This passphrase will grant you access to all of your files, and if you
lose it, you will not be able to recover your files. 

```bash
./uplink_darwin_amd64 setup --client.api-key <<apikey>> --satellite-addr mars.tardigrade.io:7777 \
  --enc.key <<passphrase>>
```

You are now ready to interact with your files on the Taridgrade Network!

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

More information for each command is provided in the command's `--help`
documentation, but some example commands are listed below:

#### Make a bucket

```bash
uplink mb sj://bucket-name
```

#### Upload a file

```bash
uplink cp ~/Desktop/your-large-file.mp4 sj://bucket-name
```

#### List files in a bucket

```bash
uplink ls sj://bucket-name/
```

#### Download a file

```bash
uplink cp sj://bucket-name/your-large-file.mp4 ~/Desktop/your-large-file.mp4
```

#### Delete a file

```bash
uplink rm sj://bucket-name/your-large-file.mp4
```

#### Show files in filesystem

```bash
mkdir -p ~/bucket-name
uplink mount sj://bucket-name/ ~/bucket-name/
```

This only works well on Linux for now, but macOS and Windows support is planned!

## Conclusion

And that's it! You now know how to perform basic operations on a Storj bucket, and you've been able to get `uplink` working.

We also have a tutorial on [S3 integration](S3-Gateway) which you could check out. Or, think this could be improved? Open a PR or file an issue.

Now go and decentralize all the things!
