# Storage Node

Storage Node implements piece storing on the network.

## Sub-Systems

1. Kademlia
1. Piecestore
1. Pieces
1. Trust
1. Monitor
1. Orders
1. Bandwidth
1. Collector
1. Inspector

## Kademlia

Kademlia provides network discovery and broadcasting. It allows new peers to find information on the network and satellites to find new storage nodes.

Storage Node also uses Kademlia network to broadcast it's own status to satellites.

## Piecestore

Is the endpoint that implements data transfer protocol. It allows uplinks to upload and download data from the storage node.

Piecestore contains logic to validate order limits, orders and piece hashes.

Piecestore uses Pieces to store the data and [Trust](#Trust) to verify allowed peers. It updates [Bandwidth](#Bandwidth), [Orders](#Orders) and other databases while uploading/downloading.

## Pieces

Pieces system handles writing and reading pieces from the blob store. It also provides ways to keep track of pieces meta data.

## Trust

Trust system contains logic for trust logic. It contains the validation logic for satellites and uplinks.

## Monitor

Monitor checks every interval how much free disk space there actually is and updates Kademlia as necessary.

## Orders

Orders system keeps track of order limits and orders and every interval settles them with the Satellite.

## Bandwidth

Bandwidth system keeps track of bandwidth usage as reported by order limits and orders.

## Collector

Collector system implements expired piece deletion from storage node.

## Inspector

Inspector provides a private endpoint for monitoring status of the storage node.