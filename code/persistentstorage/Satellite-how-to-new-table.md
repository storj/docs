# How to Add a New Table to SatelliteDB

The purpose of this document is to outline the steps to create a new table in the SatelliteDB.

## Background

[`DBX`](https://github.com/spacemonkeygo/dbx) is a tool to generate database schemas and code to operate with it. SatelliteDB  uses `DBX` to generate the database code for SQLite and PostgreSQL.

## Requirements

- [Storj](https://github.com/storj/storj) repo is cloned locally.

- Install `DBX` package.  `DBX` has a dependency on [Mercerial](https://www.mercurial-scm.org/wiki/), so you may need to install that if you get an error like `hg clone -U [...] "hg": executable file not found in $PATH`.

`$ go get -v gopkg.in/spacemonkeygo/dbx.v1`

## Steps to create a new table

Assumes all steps occur from the home directory of the [Storj](https://github.com/storj/storj) repo.

1. Add a table model in `satellite/satellitedb/dbx/satellitedb.dbx`. See `DBX` docs for details on creating a model: https://github.com/spacemonkeygo/dbx.

2. Generate the `*.dbx.go` code by running the following commands:

`$ cd satellite/satellitedb/dbx/`

`$ go generate`

4. Add a migration to `satellite/satellitedb/migrate.go`. The version must be incremented for each migration. You can add multiple migration queries in one migration.

5. Add new testdata file to `satellite/satellitedb/testdata/postgres.vX.sql`,where X matches the version of the migration. To create a new testdata file, copy the last testdata file and add the migration changes to this new copy.  If the migration adds a new table, use `-- NEW DATA --` at the end and add lines that insert data into the table (this is used for testing future migrations).
