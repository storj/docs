# Database

Well database is a database. It is responsible for providing persistence for subsystems.

## Master Database

Every peer needs a collection of databases to work. This collection is called an master database.

It links together all the sub-system specific databases. It places no specific requirement how the databases are implemented. It can be one or multiple backends, which ever seems reasonable.

```
// DB is the master database for the satellite
type DB interface {
	// CreateTables initializes the database
	CreateTables() error
	// Close closes the database
	Close() error

	// OverlayCache returns database for caching overlay information
	OverlayCache() overlay.DB
}
```

It is located in the specific peer folder `<peer>/peer.go`. As an example `satellite` peers master database full name is `satellite.DB`.

## Interface

Every sub-system declares an interface what it needs from persistence system. This is defined close to the sub-system using the database.

For example this is a partial declaration of overlay cache database:

```
// DB is for storing node information.
type DB interface {
	// Get looks up the node by nodeID
	Get(ctx context.Context, nodeID storj.NodeID) (*pb.Node, error)
	// Delete deletes node based on id
	Delete(ctx context.Context, id storj.NodeID) error

    // SelectStorageNodes looks up nodes based on criteria
	SelectStorageNodes(ctx context.Context, count int, criteria *NodeCriteria) ([]*pb.Node, error)
}
```

_Database interfaces may implement domain specific concerns, if there's a significant performance benefit._

## Implementation

Of course there need to be implementations that satisfy these interfaces.