# Storj Test Network

The `storj-sim` tool enables you to run all the components of the Storj network (Satellite, Storage Nodes, Console and Gateway) and test them on your local machine.

![network components](assets/components.png)

In every day Storj usage, the Satellite, Storage Node, and Uplink are run
on separate servers and computers, but for the purposes of the test network,
all of the components are run locally.

# Installation and configuration

First, you'll need at least [Go 1.12](https://www.golang.org/). Once Go is
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

The port format is: "1PXXE", where P is the peer class, XX is the index of the instance, and E is the endpoint.

* Gateways start from port `11000`
* Version control is at port `12000`
* Bootstrap server is at port `13000`
* Satellites start from port `10000`
* Satellite Console starts on port `10002`
* Storage Nodes public ports start from port `14000`
* Storage Nodes private ports start from port `14001`

See [storj-sim network source code](https://github.com/storj/storj/blob/master/cmd/storj-sim/network.go#L36) for more details.

To get access to a gateway and test your keys, you open http://127.0.0.1:11000 in a web browser.

You can access a storage node dashboard using the storage command. For example for accessing storage node 4 dashboard using the default configuration:
```bash
storagenode dashboard --config-dir ~/.local/share/storj/local-network/storagenode/4/ --identity-dir ~/.local/share/storj/local-network/storagenode/4 --address :13004 --color
```

### Running Tests

`storj-sim network test <command>` can be used to run tests.

`storj-sim` will start up the network and once it's up and running it will execute the specified `<command>`.

The information about the network is exposed via environment flags. All the flags start with a prefix and an index.

* Address: `STORAGENODE_0_ADDR`, `SATELLITE_0_ADDR`, `GATEWAY_0_ADDR`
* Keys: `GATEWAY_0_ACCESS_KEY`, `GATEWAY_0_SECRET_KEY`
* Directory: `STORAGENODE_0_DIR`, `SATELLITE_0_DIR`, `GATEWAY_0_DIR`

You can obtain the list of environment flags by running:
```bash
storj-sim network env
```

For a real-world example you can take a look in [test-sim.sh](https://github.com/storj/storj/blob/master/scripts/test-sim.sh) and [test-sim-aws.sh](https://github.com/storj/storj/blob/master/scripts/test-sim-aws.sh).

### Wiping the Testnet

`storj-sim network destroy` can be used to wipe the network easily.

While developing it's often nice to be able to delete the network and set it up from scratch.

For convenience, you may run the command in a single line, like so:

`storj-sim network destroy && storj-sim network setup && storj-sim network test bash my-test-script.sh`

### Running Tests With Postgres

Here are the steps to run storj-sim with postgres instead of the default sqlite:

Step 1: Start a postgres instance.

One way to do this is to run a postgres container locally. For example, the following commands will run a postgres docker container locally:

```
// Setup: install docker and psql

// pull down official docker image
$ docker pull postgres

$ docker run --rm -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=<pw> postgres

// in a different tab run this command to log into the postgres
// interactive terminal
$ psql -h localhost -U postgres

// there will be a pw prompt

// once in the psql terminal, create the database
$ create database <dbName>;
```

Step 2: Run storj sim with postgres

```
// setup storj-sim network with postgres connection string. You can supply any password
// and database name as long as they match the postgres instance running above
$ storj-sim network --postgres=postgres://postgres:<pw>@localhost/<dbName>?sslmode=disable setup

$ storj-sim network run
```

***

## Next Steps
Please see the [Uplink CLI](https://github.com/storj/docs/blob/master/Uplink-CLI.md) or [S3 Gateway](https://github.com/storj/docs/blob/master/S3-Gateway.md)
tutorial for how to upload and download data to the test network.

Let's 'be the cloud' and decentralize all the things together!
