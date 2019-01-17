# Architecture

This document describes code architecture of Storj and how things are implemented.

## Concepts

The code-level architecture is categorized into a few concepts:

* [Peer](code/Peer.md) - which is a top-level concept that wires all dependencies together for Satellite, Storage Node or Uplink;
* [Endpoint](code/Endpoint.md) - responds to network requests, usually using grpc;
* [Service](code/Service.md) - contains business logic for different parts;
* [Database](code/Database.md) - contains peristence and data consistency logic.

In principle we can think of the full flow of Storage Node and Satellite as:

1. Identity of the particular peer class is loaded. This is the public and private key.
2. A connection(s) to the database is made.
3. Peer is created:
3.1. Creation takes identity and database as an argument
3.2. Listeners and servers are started.
3.3. Every subsystem is created one by one:
3.3.1. every sub-system consists of services and endpoints
3.3.2. uses other services or databases as dependencies
3.3.3. endpoints register themselves to the server.
4. Peer is started using `Run`, which:
4.1. starts the services,
4.2. starts waiting for network requests.
5. Peer is running until,
6. Peer is stopped via canceling the context used for `Run`.
6.1. This cancels all subsystems in the reverse creation order.
7. Peer is closed and all service and endpoint resources released.
8. Database is closed
