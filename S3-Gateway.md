# S3 gateway tutorial

The Storj S3 gateway is our service that mimics the Amazon S3 API using the
Storj network. This tutorial assumes you have an account on a running
Satellite and use a [test network](Test-network.md) Satellite by default.

One gateway is already included in the [test network](Test-network.md), so you need to go through this tutorial only if you want to add another gateway.

## Installation and configuration

First, if you haven't already followed the preparation steps in https://github.com/storj/storj/wiki/Vanguard-Release-Setup-Instructions, please do so.

Next, Download the correct binary for your operating system:

- Mac OS: [gateway_darwin_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/17c224f-heads-v0.11.2-go1.12.1/gateway_darwin_amd64.zip)
- Linux: [gateway_linux_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/17c224f-heads-v0.11.2-go1.12.1/gateway_linux_amd64.zip)
- Raspberry Pi: [gateway_linux_arm.zip](https://storj-v3-alpha-builds.storage.googleapis.com/17c224f-heads-v0.11.2-go1.12.1/gateway_linux_arm.zip)
- Windows Pro: [gateway_windows_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/17c224f-heads-v0.11.2-go1.12.1/gateway_windows_amd64.exe.zip)

Setup your gateway by running the following command and following the wizzard:

```bash
./gateway_darwin_amd64 setup
```
You will be prompted for:

- Satellite: The satellite you want to connect your uplink to. You can choose one from the list of type one eg. `mars.tardigrade.io:7777` or `127.0.0.1:10000` if you are using the test network.
- API key: The API key that you generate for a project on the Satellite console. If you are using the test network, you can use the API key provided when you run it.
- Encryption passphrase: The passphrase you choose in order to encrypt your files. Keep this secret and safe. This passphrase will grant you access to all of your files, and if you lose it, you will not be able to recover your files. 

## Running

The gateway functions as a daemon. You'll want to start it and leave it running. If you're using the test network, and a gateway is already running, and you'll want to select a different port for this new one.

```bash
./gateway_darwin_amd64 run
```

The gateway should output your S3-compatible endpoint, access key, and secret
key.

## Using the AWS S3 commandline interface

To show that this gateway is working, first make sure you have the [AWS S3 CLI
installed](https://docs.aws.amazon.com/cli/latest/userguide/installing.html).

Once you do, in a new terminal session, configure it with your Gateway's
credentials:

```
$ aws configure
AWS Access Key ID [None]: eUXZt66VWTTpcwgBazQnPsuSYri
AWS Secret Access Key [None]: xDkJKUqJVhAj69CGH1VPqDPi47Q
Default region name [None]: us-east-1
Default output format [None]:
```

Then, test out some AWS S3 CLI commands!

#### Create a bucket

```bash
aws s3 --endpoint=http://localhost:7777/ mb s3://bucket-name
```

#### Upload an object

```bash
aws s3 --endpoint=http://localhost:7777/ cp ~/Desktop/your-large-file.mp4 s3://bucket-name
```

#### List objects in a bucket

```bash
aws s3 --endpoint=http://localhost:7777/ ls s3://bucket-name/
```

#### Download an object

```bash
aws s3 --endpoint=http://localhost:7777/ cp s3://bucket-name/your-large-file.mp4 ~/Desktop/your-large-file.mp4
```

#### Generate a URL for an object

```bash
aws s3 --endpoint=http://localhost:7777/ presign s3://bucket-name/your-large-file.mp4
```

(This URL will allow live video streaming through your browser or VLC)

#### Delete an object

```bash
aws s3 --endpoint=http://localhost:7777/ rm s3://bucket-name/your-large-file.mp4
```

## Conclusion

And that's it! You've learned how to use our S3-compatible Gateway. Ideally,
you'll see how easy it is to swap out AWS for Storj, going forward. Feel that
this could be easier, or maybe just that this tutorial could be improved?
Open an issue or file a PR!

You could also check out the tutorial on [Uplink](Uplink-CLI.md).

Now go and decentralize all the things!
