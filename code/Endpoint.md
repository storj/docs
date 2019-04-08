# Endpoint

Endpoint exposes services to the network. Endpoints use services and databases to fulfill the network requests. They smooth out any differences between transport protocol and the internal implementation.

Endpoints usually don't have a separate lifecycle. If something needs to happen in intervals, then that logic probably belongs into a service.

## Protocol

Currently there are three different protocols in use:

* Protobuf over GRPC/TCP - used in peer to peer communication
* GraphQL over HTTP - used for satellite frontend code to backend code
* REST over HTTP - used in places where we need a simple request & response

## Client

Usually endpoints have a corresponding client. When defining a client, do not define it in the same package as the endpoint implementation. This unfortunately makes the code less cohesive, however this avoids the problem of anybody importing the client pulling in all the dependencies of the endpoint.

## Adding a new endpoint

To add a new endpoint there are few steps:

1. ensure that the endpoint is actually necessary, every endpoint has a potential for abuse
2. define endpoint in an appropriate `.pb` file
3. [regenerate protobuf files](code/Protobuf.md)
4. add a new endpoint implementation
5. add a new config definition, if needed
6. add the endpoint to the corresponding peer
6.1. add it to the appropriate subsystem in the peer struct definition
6.2. wire it together in `New`
7. add config to testplanet

## GRPC Implementation

A basic grpc endpoint implementation looks like:

```
package kademlia

import (
    ...
)

// EndpointError defines errors class for Endpoint
var EndpointError = errs.Class("kademlia endpoint error")

// Endpoint implements the kademlia Endpoints
type Endpoint struct {
	// common fields
	log          *zap.Logger
	// dependencies: services, databases
	service      *Kademlia
	routingTable *RoutingTable
	// internal state
	connected    int32
}

// NewEndpoint returns a new kademlia endpoint
func NewEndpoint(log *zap.Logger, service *Kademlia, routingTable *RoutingTable) *Endpoint {
	return &Endpoint{
		log:          log,
		service:      service,
		routingTable: routingTable,
	}
}

// Query is a node to node communication query
func (endpoint *Endpoint) Query(ctx context.Context, req *pb.QueryRequest) (*pb.QueryResponse, error) {
	endpoint.service.Queried()

	nodes, err := endpoint.routingTable.FindNear(req.Target.Id, int(req.Limit))
	if err != nil {
		return &pb.QueryResponse{}, EndpointError.New("could not find near endpoint: %v", err)
	}

	return &pb.QueryResponse{Sender: req.Sender, Response: nodes}, nil
}
```

This is registered to a peer by using `pb.RegisterXyzServer(peer.Server.GRPC(), endpoint)`.