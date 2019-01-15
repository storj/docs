# Storj Test Network

The Storj test network (storj-sdk) enables you to run all the components of the Storj platform (Satellite, Uplink client, and storage nodes) and test them on your local machine.

![network components](assets/components.png)

In every day Storj usage, the Satellite, Storage node, and Uplink are run
separately, but for the test network, all three components are set up and run
in the same process.

# Installation and configuration

First, you'll need at least [Go 1.11](https://www.golang.org/). Once Go is
installed run:

```bash
git clone https://github.com/storj/storj.git storj
cd storj
go install storj.io/storj/cmd/{storj-sdk,bootstrap,satellite,storagenode,uplink,gateway}
```

_Ensure that `storj` folder is outside of `GOPATH`, otherwise you may see errors._

This will install the storj-sdk satellite storage node gateway and uplink binaries to wherever Go is configured to output binaries on your system. By default, this is ~/go/bin.


Next, run setup:

```bash
storj-sdk network setup
```

You now have a configured Storj test network with default configuration options.

You might also want to take a look at the config by navigating to the root directory `--config-dir` where all the configs are specified.

You can use vim to tweak the default configuration settings. You can also see what is being overwritten on the command-line level with `storj-sdk -x network run`.

The next step is to run it!

# Running the test network

Now that the configuration has been completed, we can fire up the test network with:

```bash
storj-sdk network run
```

Your test network is now running. You should see output containing your
Amazon S3 gateway access and secret keys, which you will need to connect
Amazon S3 compatible clients.

Use --print-commands (or -x) to see the arguments it's using to run.

At the moment it's assinging ports in the following way:

Gateways start from port `9000`
Satellites start from port `10000`
Storage Nodes start from port `11000`
The first satellite is setup as the bootstrap node.

### Running Tests

`storj-sdk network test <command>` can be used to run a test-scenario.

`storj-sdk` will start up the network and once it's up and running it will execute the specified `<command>`.

The information about the network is exposed via environment flags. All the flags start with a prefix and an index.

* Address: `STORAGENODE_0_ADDR`, `SATELLITE_0_ADDR`, `GATEWAY_0_ADDR`
* Keys: `GATEWAY_0_ACCESS_KEY`, `GATEWAY_0_SECRET_KEY`
* Directory: `STORAGENODE_0_DIR`, `SATELLITE_0_DIR`, `GATEWAY_0_DIR`

_There's also `storj-sdk test` which runs the `testplanet`, intended for fast unit-test like things. It won't start separate binaries._

### Wiping the Testnet

`storj-sdk network destroy` can be used to wipe the network easily. e.g. it can be convenient to run the command in a single line, like so:

`storj-sdk network destroy && storj-sdk network setup && storj-sdk network test bash my-test-script.sh`


***

## Next Steps
Please see the [Uplink CLI](Uplink-CLI) or [S3 Gateway](S3-Gateway)
tutorial for how to upload and download data to the test network.

Let's 'be the cloud' and decentralize all the things together!
