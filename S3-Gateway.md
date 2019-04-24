# S3 gateway tutorial

The Storj S3 gateway is our service that mimics the Amazon S3 API using the
Storj network. This tutorial assumes you have an account on a running
Satellite and use a [test network](Test-network) Satellite by default.

One gateway is already included in the [test network](Test-network), so you need to go through this tutorial only if you want to add another gateway.

## Installation and configuration

First, if you haven't already followed the preparation steps in https://github.com/storj/storj/wiki/Vanguard-Release-Setup-Instructions, please do so.

Next, Download the correct binary for your operating system:

- Mac OS: [gateway_darwin_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/5ac1622-heads-v0.10.1-go1.12.1/gateway_darwin_amd64.zip)
- Linux: [gateway_linux_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/5ac1622-heads-v0.10.1-go1.12.1/gateway_linux_amd64.zip)
- Raspberry Pi: [gateway_linux_arm.zip](https://storj-v3-alpha-builds.storage.googleapis.com/5ac1622-heads-v0.10.1-go1.12.1/gateway_linux_arm.zip)
- Windows Pro: [gateway_windows_amd64.zip](https://storj-v3-alpha-builds.storage.googleapis.com/5ac1622-heads-v0.10.1-go1.12.1/gateway_windows_amd64.exe.zip)

To configure the Gateway for your Satellite, you'll need to make note of your
Satellite address and your account's API key. 

Next, you'll need to choose an encryption passphrase. This needs to be the same
encryption passphrase any other tools that want to access these files will use.
Keep this secret and safe. This passphrase will grant you access to all of 
your files, and if you lose it, you will not be able to recover your files.

Then you'll need to configure the Gateway with these values. The below example
command uses the defaults for the alpha network:

```bash
~/go/bin/gateway setup --api-key abc123 --satellite-addr mars.tardigrade.io:7777 \
  --enc.key highlydistributedridiculouslyresilient
```

You are now ready to interact with your files in Storj!

## Running

The `gateway` command functions as a daemon. You'll want to start it running
and leave it running. If you're using the test network, a gateway is already
running, and you'll want to select a different port for this new one.

```bash
~/go/bin/gateway run --server.address :7776
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

You could also check out the tutorial on [Uplink](Uplink-CLI).

Now go and decentralize all the things!
