# Storage Node

Storage Node implements piece storing on the network.

## Sub-Systems

1. Kademlia
1. Piecestore
1. Pieces
1. Trust
1. Monitor
1. Collector
1. Bandwidth
1. Orders
1. Inspector

## Kademlia

Kademlia provides network discovery and broadcasting. It allows new peers to find information on the network and satellites to find new storage nodes.

Storage Node also uses Kademlia network to broadcast it's own status to satellites.

## Piecestore

Is the endpoint that implements data transfer protocol. It allows uplinks to upload and download data from the storage node.

Piecestore contains logic to validate order limits, orders and piece hashes.

Piecestore uses Pieces to store the data and Trust to verify allowed peers.

## Trust

Trust system contains logic for trust logic. It contains the validation logic for satellites and uplinks.
