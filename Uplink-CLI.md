# Uplink CLI tutorial

**Please check out our most up-to-date Storj DCS Uplink CLI documentation [here](https://docs.storj.io/dcs/getting-started/quickstart-uplink-cli/prerequisites).**

The Uplink CLI is our client-side application that supports interacting with
the Storj DCS network. This tutorial assumes you have an account on a running
Satellite and uses a [test network](Test-network) Satellite by default.

## Installation and configuration

Download the correct binary for your operating system:

- Mac OS: [uplink_darwin_amd64.zip](https://github.com/storj/storj/releases/latest/download/uplink_darwin_amd64.zip)
- Linux: [uplink_linux_amd64.zip](https://github.com/storj/storj/releases/latest/download/uplink_linux_amd64.zip)
- Raspberry Pi: [uplink_linux_arm.zip](https://github.com/storj/storj/releases/latest/download/uplink_linux_arm.zip)
- Windows: [uplink_windows_amd64.zip](https://github.com/storj/storj/releases/latest/download/uplink_windows_amd64.zip)


Setup your uplink by running the following command and following the wizard:

```bash
./uplink setup
```

You will be prompted for:

- Satellite: The satellite you want to connect your uplink to. You can choose one from the list of type one eg. `us1.storj.io:7777` or `127.0.0.1:10000` if you are using the test network.
- API key: The API key that you generate for a project on the Satellite console. If you are using the test network, you can use the API key provided when you run it.
- Encryption passphrase: The passphrase you choose in order to encrypt your objects. Keep this secret and safe. This passphrase will grant you access to all of your objects, and if you lose it, you will not be able to recover your objects. 


You are now ready to interact with your objects on the Storj DCS Network!

## Usage

The `uplink` command has a number of operations that can be performed, such as:

 * `cp` - copy an object from outside of Storj DCS to inside or vice versa or between Storj DCS buckets/prefixes
 * `ls` - list buckets or objects on your Storj DCS project
 * `mb` - make a new bucket
 * `mv` - move an object from one Storj DCS bucket to other (or rename an object)
 * `rb` - remove a bucket
 * `rm` - remove an object
 * `meta`   - object metadata related commands
 * `share`  - share an object
 * `access` - access related commands

More information for each command is provided in the command's `--help`
documentation, but some example commands are listed below:

#### Make a bucket

```bash
./uplink mb sj://bucket-name
```

#### Upload a file

```bash
./uplink cp ~/Desktop/your-large-file.mp4 sj://bucket-name
```

#### List files in a bucket

```bash
./uplink ls sj://bucket-name/
```

#### Download a file

```bash
./uplink cp sj://bucket-name/your-large-file.mp4 ~/Desktop/your-large-file.mp4
```

#### Delete a file

```bash
./uplink rm sj://bucket-name/your-large-file.mp4
```

## Conclusion

And that's it! You now know how to perform basic operations on a Storj bucket, and you've been able to get `uplink` working.

We also have a tutorial on [S3 integration](https://docs.storj.io/api-reference/s3-gateway).

Now go and decentralize all the things!
