# Code Style

This document describes Storj stylistic choices. Occasionally, code may diverge from this guide, however it should be a significant reason for the alternate behavior.

We follow most of the suggestions in [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments). We have written out few alterations and clarifications here.

The following is roughly in the order of priority.

If the guide is not followed then CI may fail.

## Formatting

All code is formatted with `goimports -local storj.io`. Where `goimports` is using the latest supported stable Go version.

We use `staticcheck` and `golangci-lint` for linting. The configuration file for all repositories is in [.golangci.yml](https://github.com/storj/ci/blob/master/.golangci.yml). Jenkins runs this check automatically.

### Imports

Import statements are in three groups in the following order:

```go
import (
	// standard packages
	"context"
	...
	"sort"

	// external packages
	"github.com/gogo/protobuf/proto"
	...
	"go.uber.org/zap"

	// storj.io packages
	"storj.io/storj/internal/fpath"
	...
)
```

Note: for https://golang.org/pkg/sync/atomic/#pkg-note-BUG you would need to align the memory. Either use padding or reorder to fix the possible issue.

## Linting

All code should pass the linters setup in the project folder.

## Copyright

All code must have a copyright header.

## Error handling

All errors must be handled and checked. Don't hide errors.

_Exceptions: printing to console or log (e.g. `fmt.Println`, `log.Print`)_

Use `errs.Class` to annotate errors with more information.

To combine multiple errors use `errs.Combine`. To collect multiple similar errors use `errs.Group`.

To handle errors with things that need closing use `errs.Combine` together with `defer`. As an example:

```go
var Error = errs.Class("example error")

func Example() (err error) {
	file, err := os.Open("example.txt")
	if err != nil {
		return Error.Wrap(err)
	}
	defer func() {
		err = errs.Combine(err, Error.Wrap(file.Close()))
	}

	return Process(file)
}
```

## Comments

See [Comment Sentences](https://github.com/golang/go/wiki/CodeReviewComments#comment-sentences). Comments should help the reader to orient to the constraints and relations with other packages.

Bad example:

```go
// Encode encodes req to w.
func Encode(w io.Writer, req *Request)
```

Better example:

```go
// Encode encodes req as JSON to w, which is used by Server.
func Encode(w io.Writer, req *Request)
```

Avoid tautological comments:

```go
// DB is a database.
type DB interface {
```

Better example:

```go
// DB stores raw accounting information gathered by tally.
type DB interface {
```

Comments should have a space after `//`, e.g. `// DB` instead of `//DB`.

### Package

Every package should have at least _package comment_ with concise information of the purpose of it; when its usage isn't trivial despite of the comments that the top-level exported names must have and non-trivial unexported, the _package comment_ should also contain specific clarifications.

One example of a package that requires specific clarifications is the [fmt standard package](https://golang.org/pkg/fmt/).

Go allows to place the _package comment_ on any non test go file that the package contains and one of the used patterns is to have a `doc.go` file which only contains the _package comment_ (e.g. [fmt standard package](https://golang.org/src/fmt/doc.go)). For keep it simple in order to choose which file should contain the _package comment_, we place the _package comment_ in a `doc.go` even when the package has only one Go file because we always know where such _package comment_ is written and there is no need to move it, in case that a package with just one initial file grows to have more in the future.

## Logging

Use properly namespaced `*zap.Logger`. By properly namespacing and passing in the logger we can better find how things are working. Tests should use `zaptest.NewLogger(t)` as the root logger.

Avoid using global loggers (e.g. `zap.L().Error`, `log.Print`, `fmt.Print`), unless it is `package main`.

Secrets (database, api, tokens) __should only be logged at `DEBUG` level__. Production systems should not be running at DEBUG level, thus keeping secrets out of logs.

Logging shouldn't be very chatty, except the `DEBUG` level which is useful during development and problem diagnosis. For these reason we don't log any possible error and we should only log errors which we don't know why they may happen and having the most information as possible about them is important for being able to diagnose what went wrong; those errors are mostly the one that we classify as an _internal error_ and despite that they are returned to the caller, not always are returned with all the information, because the error doesn't contain all of it or we are not interested in returning such internal information to the caller, one example of this is when the error is returned through the wire (e.g. gRPC, HTTP, etc.)

```go
  // All the validations have been done before the following instruction, the
  // only error that could be returned is because of an unexpected error by the
  // DB

  result, err := server.AddUserToInvitationList(user)
  if err != nil {
    // This log the error giving a context through the given message and the
    // error field (structured logger).
    // Zap will log the stack trace of this log operation but if the `err`
    // contains a stack trace (as the ones created with zeebo/errs package
    // offers) it will be also logged under the `error` field.
    server.log.Error("internal error while accessing to the DB", zap.Error(err))

    // This error will only contain the err's message, the client doesn't need
    // more than that, but although the server may have a middleware which log
    // such error response, that information isn't enough to diagnose what could
    // be wrong with the DB, while the log function call of above will provide
    // much more information about it.
    return status.Error(codes.Internal, err.Error())
  }
```

The exception about logging more information than `DEBUG` and unrecognized errors are the command line tools; those one use the logger for also informing to the user about the important operations which are executed.

### Avoid log names in log messages

Treat the log name `log.Named("XYZ")` as part of the log message. It's expected to have log names turned on for production and development.

For example:

```
package contact
type Chore struct {
	log *zap.Logger
	...
}

func (chore *Chore) Run(ctx context.Context) (err error) {
	chore.log.Info("storagenode contact chore starting up")
```

Would end up looking like this in storj-sim log:

```
storagenode/4        127iLKuetd 17:10:31.537 | INFO     contact:chore   contact/chore.go:49     Storagenode contact chore starting up
storagenode/7                   17:10:31.390 | INFO     gracefulexit:chore      gracefulexit/chore.go:67        running graceful exit chore.
```

We know that the log is related to `storagenode` and the `contact:chore` based on the logname and the thing logging. The code could be replaced with:

```
func (chore *Chore) Run(ctx context.Context) (err error) {
	chore.log.Info("starting")
```

## Variable naming

Prefer hard-to-confuse variables with 3-7 letters. Use conventional naming when there is one (e.g. `mu sync.Mutex`)

Small variables can be fine in small scopes (up to 40 lines) and when there isn't a danger of confusion. Take into account that the confusion can arise also due to moving between packages. As an example:

```go
func (p *Printer) Print(pr *Project) error {
	...
}

func (p *Project) PrintTo(pr *Printer) error {
	return pr.Print(p)
}
```

It's easier to follow the code with:

```go
func (printer *Printer) Print(project *Project) error {
	...
}

func (project *Project) PrintTo(printer *Printer) error {
	return printer.Print(project)
}
```

The litmus test about naming is whether it confuses the reader. So, if a reviewer finds the naming hard to understand, then he should suggest better naming and discuss to find a better name.

Additionally, avoid naming your variables the same as those of imported packages. For example, if you've imported
`storj.io/storj/uplink`, use something like `var uplinkPeer` rather than `var uplink` in that file.

## Integers

We only use _unsigned integers_ (e.g. `uint`, `uint32`, etc.) on the following circumstances:

* They are used as _bitmasks_.
* They are used for serialized formats.

On the rest of the cases, __always__ use _signed integers_ (e.g. `int`, `int64`, etc.).

The rationale behind this convention is that the last thing that we want is to have wacky behavior around common values and _zero_ is a common one, so we want to avoid to not get a negative number when subtracting _one_ from an _unsigned integer_ variable with value _zero_.

## Dates and UTC

Remember that Go stores time zone as part of `time.Time`.  This means that date/times that are functionally equal may not compare as equal (`==`).  When storing a date/time to a database, make sure you use `timestamp with time zone`.  It takes up the same amount of room as a `timestamp` but automatically ensures the time is saved in UTC.  This means that date/times stored in Postgres or CockroachDB lose/alter their time zone information.  This is particularly important when using `time.Time` in a way where binary equality matters, such as they key in a `map[time.Time]`.  This is one case where using UTC in Go may make sense.  When writing tests, prefer `.True(t, date1.Equal(date2))` over `.Equals(t, date1.UTC(), date2.UTC())`.

Another case where UTC may be appropriate in Go is within a Storage Node SQLite database calls.  SQLite does not have a native timestamps datatype of sufficient precision.  Date time comparisons in SQLite may be handled as string comparisons and UTC should be ensured in Go.

Another use case for UTC is when creating a new date/time based on an existing date/time.  What is Monday in one time zone maybe be Tuesday in another, February may be March, or 1999 may be 2000.  To ensure consistent rounding or batching of dates, it makes sense to perform these operations in UTC.  Unless the requirements forbid it, please take this approach and be careful to express this approach in any user interface elements.

https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_timestamp_.28without_time_zone.29

## Type and method naming

Consider package name as part of the type name, this avoids stutter when using the types or methods.

```
identity.FullIdentity // not great due to stutter
identity.Full         // better
```

There are places where it's difficult to avoid, example:

```
kademlia.Kademlia
```

Avoid using initialisms unless they are widely known like `ID`, `URL` and `DB`.

## Methods

### Argument order

The following argument order should be used for consistency (split into multiple lines for clarity only):

```go
func Do(
    ctx context.Context, // associated context with the operation
    log *zap.Logger,     // logger used by Do
    dep1, dep2,          // dependencies needed by Do
    conf1, conf2,        // different configuration flags
)
```

Of course, if an argument is not needed then there is no need to add it.

There are cases where this order is not ideal; use your best judgment when deciding whether to deviate.

### Arguments

Prefer separate func or a typed enum instead of a boolean argument. They keep the callers clearer:

```
Create(true), Create(false) //

Create(), CreateNested()         // separate func
Create(Unnested), Create(Nested) // typed enum
```

### Prefer less than 5 arguments

Cognitive load at 5 arguments is quite high already, so at that moment prefer combining some of the arguments into a configuration struct.

_Exclude `ctx` and `log` from the count of 5, since common arguments don't have as drastic effect._

## Package naming and aliases

For package naming see https://blog.golang.org/package-names. Prefer names that are easy to say when talking.

Avoid package aliases, they make it harder to understand which package is actually being used especially, if the names are inconsistent.

If a package alias is required prefer to rename the external packages rather than `storj.io/`.

## Contexts

`context.Background()` should be only called at the top-level. For example in `main`, `pkg/process`, `net/http` internals. A good rule of thumb is that you should be able to count calls to `context.Background()` in your whole program on one hand.

* If you need a `ctx` then take it as the first argument from outside. See [Argument Order](#argument-order).
* In tests use `ctx := testcontext.New(t); defer ctx.Cleanup()`.
* If threading a `ctx` variable through your callstack is more work than reasonable for your PR, use `context.TODO()` instead of `context.Background()` so you can come back to it later.
* In a `main()` method, if you're using `pkg/process.Exec` with `*cobra.Cmd`, you can use `process.Ctx(cmd)` to retrieve a command-specific context, instead of making a new one.

When you need to check for premature exit use `ctx.Err()` directly, selecting on `context.Done()` is not necessary:

```
if err := ctx.Err(); err != nil {
	return err
}
```

## Implementing Interfaces

To show that a type implements a particular interface use:

```
var _ metainfo.Observer = (*PathCollector)(nil)
```

Use these for all non-std interfaces. If would cause a cycle, then it can be omitted.

## Telemetry

For any "non-trivial" function (i.e., a function that takes more than microseconds to run), please add monkit instrumentation to it. Make sure the function takes a context (see above) and returns a named error, and add this line to the very top of the function:

```golang
defer mon.Task()(&ctx)(&err)
```

If the function really can't take a context, then either create a context first with `context.TODO()`, or pass `nil` instead of `&ctx`. If the function really won't ever error, then you can pass `nil` instead of `&err` as well.

NOTE the function returned by `mon.Task()` [accepts a list of variadic arguments](https://godoc.org/gopkg.in/spacemonkeygo/monkit.v2#Task) after the first `*context.Context` parameter. This arguments are attached to the trace and they can be helpful for having more insights of them.
The arguments should be the ones of the parent functions, however, some arguments may not be very useful, for example a raw protocol buffer request. Think about the arguments of the function and pass them to monkit instrumentation when they can give insights to the instrumentation.


```golang
func (endpoint *Endpoint) DeletePiece(ctx context.Context, req pb.DeletePieceRequest) (*pb.DeletePieceResponse, err error) {
	// req only contains one field PieceID. PieceID is a slice of bytes which won't bring to much
	// human readable information, however it will its string representation, hence we pass it.
	defer mon.Task()(&ctx, req.PieceID.String())(&err)

	// .... The rest of the function logic
}

// ...

func (reader ContextWriter) Writer(ctx context.Context, data []byte) (n int, err error) {
	// We don't pass data because it won't bring any useful information to the metric.
	defer mon.Task()(&ctx)(&err)
}

```

### Intentional Metrics
When we add a monkit call to track information outside the basic `mon.Task()` telemetry discussed above, make sure it is locked with the `//locked` comment and run `go generate ./scripts/check-monitoring.go` to update the `monkit.lock` file.

This is to ensure that we do not accidentally lose metric tracking when code moves around or changes.

Example:
```
mon.FloatVal("audit_successful_percentage").Observe(successfulPercentage) //locked

```

## SQL code

SQL statements must use query arguments to avoid potential current and future issues with SQL injection. See [OWASP SQL Injection](https://www.owasp.org/index.php/SQL_Injection) for more information.

Bad:

```go
db.QueryRow(`SELECT id FROM nodes WHERE owner = ` + owner)
db.QueryRow(`SELECT id FROM nodes WHERE last_updated = ` + timeToString(lastUpdated))
```

Should be:

```go
db.QueryRow(`SELECT id FROM nodes WHERE owner = ?`, owner)
db.QueryRow(`SELECT id FROM nodes WHERE last_updated = ?`, timeToString(lastUpdated))
```

## Prefer synchronous methods

Making synchronous methods to asynchornous is usually easier than making an asynchronous method to synchronous. This also keeps code simpler when the asynchrony is not needed.

## Avoid sleeps for synchronization

Sleeps usually hide racy behavior, proper synchronization usually doesn't need them.

Of course using sleeps, tickers for scheduling or for avoiding thundering herd problem is acceptable.

## Field order

Prefer consistency in field ordering. The usual ordering is "dependencies", "immutable information" (e.g. configuration) and finally "internal state". In some cases it's beneficial to have multiple groupings in "internal state" (e.g. when dealing with mutexes). For example:

```go
type Service struct {
	log *zap.Logger     // most common dependencies first
	Loop *metainfo.Loop // dependencies
	DB   satellitedb.DB // ... (prefer same order as constructor arguments, if possible)

	// immutable information, such as configuration
	config      Config
	dialTimeout time.Duration

	// internal state
	alive   errgroup.Group
	running int64 // atomic
}

// embedding first, however avoid, if possible
type DB struct {
	*sql.DB
	log *zap.Logger
}
```

## Mutexes

When using synchronizing structures like mutexes or condition variables organize them in the struct such that they make clear which fields are protected and which are unprotected.

For example:

```go
type GraphiteDest struct {
	address string

	mu      sync.Mutex
	conn    net.Conn
	buf     *bufio.Writer
	stopped bool
}
```

## Unused Code

Avoid merging unused code into master unless there is a justifiable reason to do so. This includes methods, functions, constants, variables, and parameters. A reason one may leave unused code is if the method is necessary to implement an interface.
