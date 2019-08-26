# Architecture

This document describes how different architectural concepts are defined and how they interact.

## Layers

The code-level architecture is categorized into a few layers:

* [Peer](code/Peer.md) - is a top-level concept that wires all dependencies together for Satellite, Storage Node or Uplink;
* Subsystem - is a collection of endpoints and services related to a single problem;
* [Endpoint](code/Endpoint.md) - responds to network requests, usually using grpc;
* [Chore](code/Chore.md) - contains business logic that needs to run intervals;
* [Service](code/Service.md) - contains business logic;
* [Database](code/Database.md) - contains peristence and data consistency logic.

## Interactions between layers

Peer wires together endpoints, services and databases. It does not create the database or it's own identity.

Peer is organized into subsystems (e.g. overlay, kademlia).

Endpoint can depend on services and databases, however it must not depend on endpoints nor chores.

Chore can depend on services and database, however it must not depend on endpoint nor chores.

Service can depend on other services and databases, however it must not depend on endpoints.

Databases must not depend on calling services nor endpoints.

## Peer Lifecycle

In principle we can think of the full flow of Storage Node and Satellite as:

<ol>
<li>Identity of the particular peer class is loaded. This is use to uniquely identify the peer on the network.</li>
<li>A connection(s) to the database is made.</li>
<li>Peer is created:<ol>
    <li>Creation takes identity and database as an argument</li>
    <li>Listeners and servers are started.</li>
    <li>Every subsystem is created one by one: <ol>
        <li>every sub-system consists of services, chores and endpoints</li>
        <li>uses other services or databases as dependencies</li>
        <li>endpoints register themselves to the server</li>
    </ol></li>
</ol></li>
<li>Peer is started using `Run`, which:<ol>
    <li>starts the services,</li>
    <li>starts waiting for network requests.</li>
</ol></li>
<li>Peer is running until,</li>
<li>Peer is stopped via canceling the context used for `Run`.<ol>
    <li>This cancels all subsystems in the reverse creation order.</li>
</ol></li>
<li>Peer is closed and all service and endpoint resources released.</li>
<li>Database is closed</li>
</ol>