# Testing

This document describes testing guidelines for Storj. Occasionally, code may diverge from this guide, however it should be a significant reason for the alternate behavior.

If the guide is not followed then CI may fail.

Refer to [Style](Style.md) for information about the style.


## Error handling

All errors must be handled and checked and don't hide errors.

See [Error Handling](Style.md#error-handling) for more details.


## Prefer `test` in test package names

By using different package name we are testing the exposed behavior rather than the internal behavior making the tests more robust against changes.


## Logging

Use `log := zaptest.NewLogger(t)` as the root logger for services. Use `t.Log`, if you need single logging.

Using `fmt.Print` or other global loggers bypass built-in logging behavior in `testing` package. This means that when running tests in parallel logs can appear in the wrong places.


## Close all opened resources

In tests we should check all closing errors and check that everything gets closed properly. The program and any test should shut-down cleanly without any leaks.

Following are the common resources that are leaked:

1. Files
1. Database Connections
1. Connections
1. Servers
1. Goroutines


`internal/testcontext` package contains useful utilities for it:

```
func TestBasic(t *testing.T) {
	ctx := testcontext.New(t) // we create a context with the specific test
	defer ctx.Cleanup()       // this waits for all goroutines to terminate

	db, err := CreateDatabase(ctx.File("example.db"))
	if err != nil {
		t.Fatal(err)
	}
	defer ctx.Check(db.Close)

	server := NewServer(db)
	defer ctx.Check(server.Stop)

	ctx.Go(func() error {
		return server.Run(ctx)
	})
}
```

When `server.Stop` is not called then this func will stall with a message: "some goroutines are still running...".

https://github.com/loov/leakcheck can be used to detect open files or connections either in tests or the final binaries.


## Real dependencies and data

Use real dependencies that are used in production. Try to create the appropriate data using the exiting API-s rather than creating them manually.

Avoid using mocks and stub-data, if possible. By using mocks we are not testing the actual system and how the systems work together; hence missing some bugs.

Package `internal/testplanet` helps to setup a full environment that can be used for testing. For the basic examples see [internal/testplanet/planet_test.go](https://github.com/storj/storj/blob/master/internal/testplanet/planet_test.go). Of course many packages already use it, so refer them for more examples.

For testing erroring behavior a wrapper can be used. For example:

```
// assume we want to test this interface
type Server interface { Do(ctx context.Context) error }

// we can write a type that has all the same methods but returns an error
type erroringServer struct { Server }
func (_ erroringServer) Do(ctx context.Context) error { return errors.New("invalid request") }
```

Note: there are places where using mocks are unavoidable or have a significant benefit.

## Table tests

Prefer table-driven tests when you have multiple similar tests. Try to keep the table as simple as possible. Needing a function closure often indicates a table has become too complicated. Separating erroring and non-erroring examples makes the code easier to read.

Example:

```
func TestNormalizeEmail(t *testing.T) {
	type test struct {
		input    string
		expected string
	}
	validEmails := []test{
		{"alpha@example.com", "alpha@example.com",
		{"aLPha+bETa@example.com", "alpha@example.com",
		...
	}

	for i, tt := range validEmails {
		errTag := fmt.Sprintf("%d. %+v", i, tt)

		normalized, err := normalizeEmail(tt.input)
		if assert.NoError(t, err, errTag) {
			assert.Equal(t, tt.expected, normalized, errTag)
		}
	}
}

func TestNormalizeEmail_Invalid(t *testing.T) {
	invalidEmails := []string{
		"@example.com",
		...
	}
	for i, tt := range invalidEmails {
		errTag := fmt.Sprintf("%d. %+v", i, tt)
		_, err := normalizeEmail(tt)
		assert.Error(t, err, errTag)
	}
}
```

## Automatically choose ports

Tests should only use automatic port selection when starting servers. Use `net.Listen("127.0.0.1:0")` for this.

Developers usually have many things running on their own system, so eventually we will use a port that is already in use and cause a failure. Similarly this prevents the test being tested in parallel. Using `"127.0.0.1:0"` is necessary for Windows users, because using `":0"` causes firewall notices when running tests.

Preassigned addresses also interfere with running all tests in parallel.

CI environment blocks attempts to use fixed port numbers.


## Data in temporary directory

Tests should only create data in temp directory. The created data must be cleaned-up.

By creating things inside source directory we risk the data being committed or accumulating in the source directory. By not cleaning up the temp directory we may end up creating gigabytes of data there.

`internal/testcontext` package contains useful utilities for it:

```
func TestBasic(t *testing.T) {
	ctx := testcontext.New(t) // we create a context with the specific test
	defer ctx.Cleanup() // this deletes all created directories

	t.Log(ctx.Dir("a", "b", "c")) // create a directory inside a temporary directory
	t.Log(ctx.File("a", "w", "c.txt")) // get a filename inside a temporary directory
}
```

## Domain Names

Use only domains intended for testing and examples, otherwise tests may end up accidentally sending an email to an actual person.

For testing or documentation use [`.test`](https://en.wikipedia.org/wiki/.test) domain, it is reserved for that purpose. Examples: `mail.test`, `example.test`.

For documentation [`example.com`](https://www.iana.org/domains/reserved) can also be used.

## Running test through PostgreSQL

Part of our [current implementation uses different _database backends_](Database), some of them are used to run the test in local without having to always depend of third party external systems when developing.

Because using a different _database backend_ for development than in production can cause that some tests pass in local meanwhile fail using the production _database backend_, the CI runs all the tests with all the supported _backends_ or at least with the one used in production.

Sometimes, meanwhile developing, it's less than ideal that for having feedback of each change the developer must push the code to run the CI, making pretty convenient to run the tests which the production _databse backend_. Currently this is the case for PostgreSQL in:

* [Database migrations](Database).
* Test SIM (i.e. `make test-sim`).

In order to use PostgreSQL<sup>1</sup> for running the tests in a local development machine you have to setup and run PostgreSQL v9.6 in your machine or run a Docker container using a [PostgreSQL image](https://hub.docker.com/_/postgres) and run the tests as follow:

1. For _Go tests_, use the environment variable `STORJ_POSTGRES_TEST` to specify a connection URL (i.e. `postgres://[user][:password]@[host]?sslmode=disable`) when running them, for example `STORJ_POSTGRES_TEST="postgres://postgres:pass@localhost?sslmode=disable" go test ./...`
2. For _test sim_ use the environment variable `STORJ_SIM_POSTGRES` to specify a connection URL with an existing database (preferably an empty one) (i.e `postgres://[user][:password]@[host]/[database]?sslmode=disable`) when running them, for example `STORJ_SIM_POSTGRES="postgres://postgres:pass@localhost/teststorj?sslmode=disable" make test-sim`. For creating an empty database in Postgres, you can easily do with it's Postgres client running for example `psql -U postgres -c 'create database teststorj;'` for creating a database named `teststorj` (you can also use the Docker image commented above rather than the locally installed Postgres client `psql`).

<sup>1</sup>PostgreSQL is currently required to run some Go tests.