---
author:
  name: Egon Elbre
date: '2023-03-20 00:00:00'
heroimage: ./2aaa5a3adcf49612.jpeg
layout: blog
metadata:
  description: When writing server side projects in Go, at some point you will also
    need to test against a database. Let's take a look at different ways of using
    Postgres with different performance characteristics. The final approach shows
    how you can set up a clean database in 20ms (there are a few caveats).
  title: Go Integration Tests with Postgres
title: Go Integration Tests with Postgres

---

When writing server side projects in Go, at some point you will also need to test against a database. Let's take a look at different ways of using Postgres with different performance characteristics. The final approach shows how you can set up a clean database in 20ms (there are a few caveats).

We're not going to cover the "how should you use a real database in your tests" debate. At some point you'll need to test your database layer, so, we'll cover those cases.

## Using containers

If you have searched a bit on how to set up a clean test environment, you've probably come across [github.com/ory/dockertest](https://github.com/ory/dockertest) package. There's also [testcontainers](https://golang.testcontainers.org) for setting up containers. Alternatively, you could even invoke docker as a command and use that. Whichever your poison, the approach will look similar. We'll use *dockertest* for our examples.

Usually, the first thing you do is set up something to act as the client. With *dockertest* it means creating a *dockertest.Pool*. And we need to set it up in our *TestMain*:

```go
var dockerPool *dockertest.Pool

func TestMain(m *testing.M) {
	var err error
	pool, err = dockertest.NewPool("")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	// Set a time for our retries. A lower value probably makes more sense.
	pool.MaxWait = 120 * time.Second
	code := m.Run()
	os.Exit(code)
}
```

If we are writing tests, then using a specific helper is going to be very convenient.

```go
func TestCreateTable(t *testing.T) {
	ctx := context.Background()
	WithDatabase(ctx, t, func(t *testing.TB, db *pgx.Conn) {
		_, err := db.Exec(ctx, `
			CREATE TABLE accounts ( user_id serial PRIMARY KEY );
		`)
		if err != nil {
			t.Fatal(err)
		}
	})
}

func WithDatabase[TB testing.TB](ctx context.Context, tb TB,
test func(t TB, db *pgx.Conn)) {
	// < snip >
}
```

This approach creates a docker image and calls *test* callback whenever it's ready.

The callback based approach is especially helpful if you need to test with multiple backends such as Cockroach and Postgres. In your own codebase you probably would return the data layer interface rather than *\*pgx.Conn* directly. For example:

```go
func TestCreateTable(t *testing.T) {
	ctx := context.Background()
	db := NewDatabase(ctx, t)
	_, err := db.Exec(ctx, `
		CREATE TABLE accounts ( user_id serial PRIMARY KEY );
	`)
	if err != nil {
		t.Fatal(err)
	}
}

func NewDatabase(ctx context.Context, tb testing.TB) *pgx.Conn {
	// create the database resource
	tb.Cleanup(func() {
		err := db.Close(ctx)
		if err != nil {
			tb.Logf("failed to close db: %v", err)
		}
	})
	return conn
}
```

A single table migration isn't indicative of a proper database layer, but it's sufficient for seeing the best-case scenario. Adding more tables didn't seem to affect things that much.

Let's get back on track and see how you can implement the first approach. It's should be trivial to convert one to the other:

```go
func WithDatabase[TB testing.TB](ctx context.Context, tb TB,
test func(t TB, db *pgx.Conn)) {

	// First we need to specify the image we wish to use.
	resource, err := dockerPool.RunWithOptions(&dockertest.RunOptions{
		Repository: "postgres",
		Tag:        "15",
		Env: []string{
			"POSTGRES_PASSWORD=secret",
			"POSTGRES_USER=user",
			"POSTGRES_DB=main",
			"listen_addresses = '*'",
		},
	}, func(config *docker.HostConfig) {
		// set AutoRemove to true so that stopped container goes away by itself
		config.AutoRemove = true
		config.RestartPolicy = docker.RestartPolicy{Name: "no"}
	})
	if err != nil {
		tb.Fatalf("Could not start resource: %s", err)
	}
	defer func() {
		if err := dockerPool.Purge(resource); err != nil {
			tb.Logf("failed to stop: %v", err)
		}
	}()

	// Construct our connection string.
	hostAndPort := resource.GetHostPort("5432/tcp")
	databaseConnstr := fmt.Sprintf("postgres://user:secret@%s/main?sslmode=disable", hostAndPort)

	err = resource.Expire(2 * 60) // hard kill the container after 2 minutes, just in case.
	if err != nil {
		tb.Fatalf("Unable to set container expiration: %v", err)
	}

	// Finally, try to connect to the container.
	// We need to retry, because it might take some time until the container becomes available.
	var db *pgx.Conn
	err = dockerPool.Retry(func() error {
		db, err = pgx.Connect(ctx, databaseConnstr)
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		tb.Fatal("unable to connect to Postgres", err)
	}

	defer func() {
		err := db.Close(ctx)
		if err != nil {
			tb.Logf("failed to close db: %v", err)
		}
	}()

	// Finally call our test code.
	test(tb, db)
}
```

Let's look at the performance:

```
Environment                   Test        Time
Windows Threadripper 2950X    Container   2.86s ± 6%
MacOS M1 Pro                  Container   1.63s ± 16%
Linux Xeon Gold 6226R         Container   2.24s ± 10%
```

## Using DATABASE

In most cases, creating a new postgres instance per test isn't necessary. It'll be entirely sufficient to have a database per test. If we have SUPERUSER permissions in postgres we can create them dynamically.

To contrast with the previous approach, let's use a locally installed Postgres instance. This can be helpful, if you want to run tests against a remote database or want to avoid the container startup time.

```go
var pgaddr = flag.String("database", os.Getenv("DATABASE_URL"), "database address")
```

Let's rewrite the function to create a new database per test:

```go
func WithDatabase[TB testing.TB](ctx context.Context, tb TB, test func(t TB, db *pgx.Conn)) {
	if *pgaddr == "" {
		tb.Skip("-database flag not defined")
	}
	dbaddr := *pgaddr

	// We need to create a unique database name so that our parallel tests don't clash.
	var id [8]byte
	rand.Read(id[:])
	uniqueName := tb.Name() + "/" + hex.EncodeToString(id[:])

	// Create the main connection that we use to create the database.
	maindb, err := pgx.Connect(ctx, dbaddr)
	if err != nil {
		tb.Fatalf("Unable to connect to database: %v", err)
	}

	// Run the database creation query and defer the database cleanup query.
	if err := createDatabase(ctx, maindb, uniqueName); err != nil {
		tb.Fatalf("unable to create database: %v", err)
	}
	defer func() {
		if err := dropDatabase(ctx, maindb, uniqueName); err != nil {
			tb.Fatalf("unable to drop database: %v", err)
		}
	}()

	// Modify the connection string to use a different database.
	connstr, err := connstrWithDatabase(dbaddr, uniqueName)
	if err != nil {
		tb.Fatal(err)
	}

	// Create a new connection to the database.
	db, err := pgx.Connect(ctx, connstr)
	if err != nil {
		tb.Fatalf("Unable to connect to database: %v", err)
	}
	defer func() { _ = db.Close(ctx) }()

	// Run our test code.
	test(tb, db)
}
```

Now for the small utility funcs that we used:

```go
// connstrWithDatabase changes the main database in the connection string.
func connstrWithDatabase(connstr, database string) (string, error) {
	u, err := url.Parse(connstr)
	if err != nil {
		return "", fmt.Errorf("invalid connstr: %q", connstr)
	}
	u.Path = database
	return u.String(), nil
}

// createDatabase creates a new database with the specified name.
func createDatabase(ctx context.Context, db *pgx.Conn, name string) error {
	_, err := db.Exec(ctx, `CREATE DATABASE `+sanitizeDatabaseName(name)+`;`)
	return err
}

// dropDatabase drops the specific database.
func dropDatabase(ctx context.Context, db *pgx.Conn, name string) error {
	_, err := db.Exec(ctx, `DROP DATABASE `+sanitizeDatabaseName(name)+`;`)
	return err
}


// sanitizeDatabaseName is ensures that the database name is a valid postgres identifier.
func sanitizeDatabaseName(schema string) string {
	return pgx.Identifier{schema}.Sanitize()
}
```

The performance looks already significantly better:

```
Environment                   Test        Time
Windows Threadripper 2950X    Container   2.86s ± 6%
Windows Threadripper 2950X    Database    136ms ± 12%
MacOS M1 Pro                  Container   1.63s ± 16%
MacOS M1 Pro                  Database    136ms ± 12%
Linux Xeon Gold 6226R         Container   2.24s ± 10%
Linux Xeon Gold 6226R         Database    135ms ± 10%
```

## Using SCHEMA

But, 90ms is still a lot of time per single test. There's one lesser-known approach we discovered in Storj. It's possible to use a [schema](https://www.postgresql.org/docs/current/ddl-schemas.html) to create an isolated namespace that can be dropped together.

Creating a new schema is as straightforward as executing `CREATE SCHEMA example;` and dropping `DROP SCHEMA example CASCADE;`. When connecting to the database it's possible to add a connection string parameter `?search\_path=example` to execute all queries by default in that schema.

Of course, if you use schemas for other purposes in your system, then this approach may complicate the rest of your code. Similarly, schemas are not as isolated as separate databases.

Now that the disclaimer is out of the way, let's take a look at some code:

```go
func WithSchema[TB testing.TB](ctx context.Context, tb TB, test func(t TB, db *pgx.Conn)) {
	if *pgaddr == "" {
		tb.Skip("-database flag not defined")
	}
	dbaddr := *pgaddr

	// We need to create a unique schema name so that our parallel tests don't clash.
	var id [8]byte
	rand.Read(id[:])
	uniqueName := tb.Name() + "/" + hex.EncodeToString(id[:])

	// Change the connection string to use a specific schema name.
	connstr, err := connstrWithSchema(dbaddr, uniqueName)
	if err != nil {
		tb.Fatal(err)
	}
	db, err := pgx.Connect(ctx, connstr)
	if err != nil {
		tb.Fatalf("Unable to connect to database: %v", err)
	}
	defer func() { _ = db.Close(ctx) }()

	// Surprisingly, it's perfectly fine to create a schema after connecting with the name.
	if err := createSchema(ctx, db, uniqueName); err != nil {
		tb.Fatal(err)
	}
	defer func() {
		if err := dropSchema(ctx, db, uniqueName); err != nil {
			tb.Fatal(err)
		}
	}()

	test(tb, db)
}
```

The smaller utilities that make it work:

```go
// connstrWithSchema adds search_path argument to the connection string.
func connstrWithSchema(connstr, schema string) (string, error) {
	u, err := url.Parse(connstr)
	if err != nil {
		return "", fmt.Errorf("invalid connstr: %q", connstr)
	}
	u.Query().Set("search_path", sanitizeSchemaName(schema))
	return u.String(), nil
}

// createSchema creates a new schema in the database.
func createSchema(ctx context.Context, db *pgx.Conn, schema string) error {
	_, err := db.Exec(ctx, `CREATE SCHEMA IF NOT EXISTS`
+ sanitizeSchemaName(schema)+`;`)
	return err
}

// dropSchema drops the specified schema and associated data.
func dropSchema(ctx context.Context, db *pgx.Conn, schema string) error {
	_, err := db.Exec(ctx, `DROP SCHEMA `+sanitizeSchemaName(schema)+` CASCADE;`)
	return err
}

// sanitizeSchemaName is ensures that the name is a valid postgres identifier.
func sanitizeSchemaName(schema string) string {
	return pgx.Identifier{schema}.Sanitize()
}
```

After running some benchmarks we can see that we've reached ~20ms:

```
Environment                   Test        Time
Windows Threadripper 2950X    Container   2.86s ± 6%
Windows Threadripper 2950X    Database    136ms ± 12%
Windows Threadripper 2950X    Schema      26.7ms ± 3%
MacOS M1 Pro                  Container   1.63s ± 16%
MacOS M1 Pro                  Database    136ms ± 12%
MacOS M1 Pro                  Schema      19.7ms ± 20%
Linux Xeon Gold 6226R         Container   2.24s ± 10%
Linux Xeon Gold 6226R         Database    135ms ± 10%
Linux Xeon Gold 6226R         Schema      29.2ms ± 16%
```


## Final tweaks

There's one important flag that you can adjust in Postgres to make it run faster... of course, this should only be used for testing. It's disabling [fsync](https://www.postgresql.org/docs/current/runtime-config-wal.html).

The final results of the comparison look like:

```
Environment                   Test        fsync   Time
Windows Threadripper 2950X    Container   on      2.86s ± 6%
Windows Threadripper 2950X    Container   off     2.82s ± 4%
Windows Threadripper 2950X    Database    on      136ms ± 12%
Windows Threadripper 2950X    Database    off     105ms ± 30%
Windows Threadripper 2950X    Schema      on      26.7ms ± 3%
Windows Threadripper 2950X    Schema      off     20.5ms ± 5%
MacOS M1 Pro                  Container   on      1.63s ± 16%
MacOS M1 Pro                  Container   off     1.64s ± 13%
MacOS M1 Pro                  Database    on      136ms ± 12%
MacOS M1 Pro                  Database    off     105ms ± 30%
MacOS M1 Pro                  Schema      on      19.7ms ± 20%
MacOS M1 Pro                  Schema      off     18.5ms ± 31%
Linux Xeon Gold 6226R         Container   on      2.24s ± 10%
Linux Xeon Gold 6226R         Container   off     1.97s ± 10%
Linux Xeon Gold 6226R         Database    on      135ms ± 10%
Linux Xeon Gold 6226R         Database    off     74.2ms ± 10%
Linux Xeon Gold 6226R         Schema      on      29.2ms ± 16%
Linux Xeon Gold 6226R         Schema      off     15.3ms ± 15%
```

All the tests were run in a container that didn't have persistent disk mounted. The fsync=off would probably have a bigger impact with an actual disk.

So for the conclusion, we looked at three different approaches to creating a clean Postgres environment. The approaches aren't completely equivalent, but use the fastest one that you can.

‍

