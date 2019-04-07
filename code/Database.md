# Database

Database is responsible for providing data access, persistence and ensuring data-consistency. 

## Master Database

Every peer needs a collection of databases to work. This collection is called a master database.

It links together all the sub-system specific databases. It places no specific requirement how the databases are implemented. It can be one or multiple backends, whichever is more useful for a particular database.

```
// DB is the master database for the satellite
type DB interface {
	// CreateTables initializes the database
	CreateTables() error
	// Close closes the database
	Close() error

	// Overlay returns database for caching overlay information
	Overlay() overlay.DB
}
```

The interface definition is located in the specific peer folder `<peer>/peer.go`. As an example peer `satellite` has a master database with fully qualified name `satellite.DB`.

## Interface

Every sub-system declares an interface what it needs from persistence system. This is defined close to the sub-system using the database.

For example this is a partial declaration of overlay cache database:

```
// DB is for storing node information.
type DB interface {
	// Get looks up the node by nodeID
	Get(ctx context.Context, nodeID storj.NodeID) (*pb.Node, error)

    // SelectStorageNodes looks up nodes based on criteria
	SelectStorageNodes(ctx context.Context, count int, criteria *NodeCriteria) ([]*pb.Node, error)
}
```

_Database interfaces may implement domain specific concerns, if there's a significant performance benefit._

## Implementation

Each master database has an implementation. The master database and sub-databases are located in `<peer>/<peer>db`. As an example implementation for `satellite.DB` interface is at `satellite/satellitedb/*.go`.

Often the databases have in-memory variants, which are useful for testing. They can also support different backends, such as SQLite and Postgres. For satellite the function `satellite/satellitedb/satellitedbtest.Run` loops through different backends making testing easier. Storage Node has a similar func.

Master Database will return a specific struct to fulfill the specific database interfaces.

## dbx code generation

For satellite we also use [`dbx`](https://github.com/spacemonkeygo/dbx/) which helps to support Sqlite and Postgres at the same time. Of course, this complicates some of the queries as a result.

dbx file for satellite is located in `satellite/satellitedb/satellite.dbx`. To regenerate or modify it, run `go generate` in that folder.

## Migrations

Currently Storj uses minimal implementation for arbitrary migrations. It allows writing SQL queries and custom functions to update the database schema. The implementation is at `internal/migrate/versions.go`.

Implementation uses a `versions` table to track, at which version a specific database is at. Migrations are then defined as a sequence of functions or SQL queries:

```
m := migrate.Migration{
	Table: "versions",
	Steps: []*migrate.Step{
		{
			Description: "Initialize Table",
			Version:     1,
			Action: migrate.SQL{
				`CREATE TABLE users (id int)`,
				`INSERT INTO users (id) VALUES (1)`,
			},
		},
		{
			Description: "Move files",
			Version:     2,
			Action: migrate.Func(func(log *zap.Logger, _ migrate.DB, tx *sql.Tx) error {
				return os.Rename(ctx.File("alpha.txt"), ctx.File("beta.txt"))
			}),
		},
	},
}
// run the migration
err = m.Run(zap.NewNop(), testDB)
```

This offers a lot of flexibility and easy to integrate. Of course, the implementation doesn't cover all the needs and future implementation may significantly differ from this approach. To be specific, it does not handle: 1. rollbacks with multi-step migrations, 2. undoing migrations, 3. snapshotting of the whole state and 4. figuring out what the exact executed steps are.

### Testing

Migrations have a very basic testing code around them, to avoid accidentally writing broken migration code.

Let's take `satellite/satellitedb/migrate_test.go` as an example.

`satellite/satellitedb/testdata/*.sql` contains queries that creates the specific database version. Also it contains a keyword `-- NEW DATA --`, which indicates new data to be inserted into the database. Inserting new data ensures that we actually migrate columns refactorings properly.

For each migration step the test verifies that the database schema and data in the database matches the `testdata`.

Migration tests use `internal/dbutil/pgutil` and `internal/dbutil/sqliteutil` packages to load the schema and data from the database itself.


### Modifying database

To modify the database the following steps must be completed:

1. Modify `dbx` file and regenerate the model (only for satellite)
2. Add a new `migrate.Step` into the migrations list, modifying the previous database state to match the new one. The migration version must be incremented by `1` from previous.
3. Add a new `testdata/*.v<N>.sql`, where `N` is the specific migration step.
4. If there are new tables, then add a `-- NEW DATA --` and insert rows to the new tables.

See [How to add a new table to Satellite.DB](Satellite-how-to-new-table.md) for more detailed instructions.