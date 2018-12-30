# Uplink CLI tutorial

The Uplink CLI is our client-side application that supports interacting with
the Storj network. This tutorial assumes you have an account on a running
Satellite and uses a [test network](Test-network) Satellite by default.

## Installation and configuration

First, you'll need at least [Go 1.11](https://www.golang.org/). Once Go is
installed, you should be able to run:

```bash
go get -u storj.io/storj/cmd/uplink
```

This will install the `uplink` binary to wherever Go is configured to
output binaries on your system, by default `~/go/bin`.

To configure the Uplink for your Satellite, you'll need to make note of your
Satellite address and your account's API key. The [S3 gateway](S3-Gateway)
and the Uplink share a configuration file, so if your S3 gateway is configured
you can skip the remaining setup.

Next, you'll need to choose an encryption passphrase. Keep this secret and
safe. This passphrase will grant you access to all of your files, and if you
lose it, you will not be able to recover your files.

Then you'll need to configure the Uplink with these values. The below example
command uses the defaults for the test network:

```bash
~/go/bin/uplink setup --api-key abc123 --satellite-addr 127.0.0.1:7778 \
  --enc-key highlydistributedridiculouslyresilient
```

You are now ready to interact with your files in Storj!

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
