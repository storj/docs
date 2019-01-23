# Storj Test Network

The `storj-sim` tool enables you to run all the components of the Storj network (Satellite, Storage Nodes, Console and Gateway) and test them on your local machine.

![network components](assets/components.png)

In every day Storj usage, the Satellite, Storage Node, and Uplink are run
on separate servers and computers, but for the purposes of the test network,
all of the components are run locally.

# Installation and configuration

First, you'll need at least [Go 1.11](https://www.golang.org/). Once Go is
installed run:

```bash
git clone https://github.com/storj/storj.git storj
cd storj
make install-sim
```

_Ensure that `storj` folder is outside of `GOPATH`, otherwise you may see errors._

This will install the storj-sim satellite storage node gateway and uplink binaries to wherever Go is configured to output binaries on your system. By default, this is `~/go/bin`.


Next, run setup:

```bash
storj-sim network setup
```

You now have a configured Storj test network with default configuration options.

You might also want to take a look at the config by navigating to the root 
directory `--config-dir` where all the configs are specified.
You can tweak the configuration settings there as needed.

For insight into what is happening under the hood you can use `-x` or `--print-commands` to see how the processes are started.

The next step is to run it!

# Running the test network

Now that the configuration has been completed, we can fire up the test network with:

```bash
storj-sim network run
```

Your test network is now running. You should see output containing your
Amazon S3 gateway access and secret keys, which you will need to connect
Amazon S3 compatible clients.

At the moment it's assinging ports in the following way:

* Gateways start from port `9000`
* Bootstrap server is at port `9999`
* Satellites start from port `10000`
* Storage Nodes start from port `11000`

### Running Tests

`storj-sim network test <command>` can be used to run tests.

`storj-sim` will start up the network and once it's up and running it will execute the specified `<command>`.

The information about the network is exposed via environment flags. All the flags start with a prefix and an index.

* Address: `STORAGENODE_0_ADDR`, `SATELLITE_0_ADDR`, `GATEWAY_0_ADDR`
* Keys: `GATEWAY_0_ACCESS_KEY`, `GATEWAY_0_SECRET_KEY`
* Directory: `STORAGENODE_0_DIR`, `SATELLITE_0_DIR`, `GATEWAY_0_DIR`

For a real-world example you can take a look in [test-sim.sh](https://github.com/storj/storj/blob/master/scripts/test-sim.sh) and [test-sim-aws.sh](https://github.com/storj/storj/blob/master/scripts/test-sim-aws.sh).

### Wiping the Testnet

`storj-sim network destroy` can be used to wipe the network easily.

While developing it's often nice to be able to delete the network and set it up from scratch.

For convenience, you may run the command in a single line, like so:

`storj-sim network destroy && storj-sim network setup && storj-sim network test bash my-test-script.sh`

***

## Next Steps
Please see the [Uplink CLI](Uplink-CLI) or [S3 Gateway](S3-Gateway)
tutorial for how to upload and download data to the test network.

Let's 'be the cloud' and decentralize all the things together!
