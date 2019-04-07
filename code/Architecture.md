# Architecture

This document describes how different architectural concepts are defined and how they interact.

## Layers

The code-level architecture is categorized into a few layers:

* [Peer](code/Peer.md) - is a top-level concept that wires all dependencies together for Satellite, Storage Node or Uplink;
* Subsystem - is a collection of endpoints and services related to a single problem;
* [Endpoint](code/Endpoint.md) - responds to network requests, usually using grpc;
* [Service](code/Service.md) - contains business logic;
* [Database](code/Database.md) - contains peristence and data consistency logic.

## Interactions between layers

Peer wires together endpoints, services and databases. It does not create the database or it's own identity.

Peer is organized into subsystems (e.g. overlay, kademlia).

Endpoint can depend on services and databases, however it must not depend on endpoints.

Service can depend on other services and databases, however it must not depend on endpoints.

Databases must not depend on calling services nor endpoints.

## Peer Lifecycle

In principle we can think of the full flow of Storage Node and Satellite as:

1. Identity of the particular peer class is loaded. This is use to uniquely identify the peer on the network.
2. A connection(s) to the database is made.
3. Peer is created:
3.1. Creation takes identity and database as an argument
3.2. Listeners and servers are started.
3.3. Every subsystem is created one by one:
3.3.1. every sub-system consists of services and endpoints
3.3.2. uses other services or databases as dependencies
3.3.3. endpoints register themselves to the server
4. Peer is started using `Run`, which:
4.1. starts the services,
4.2. starts waiting for network requests.
5. Peer is running until,
6. Peer is stopped via canceling the context used for `Run`.
6.1. This cancels all subsystems in the reverse creation order.
7. Peer is closed and all service and endpoint resources released.
8. Database is closed
