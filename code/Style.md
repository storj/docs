# Code Style

This document describes Storj stylistic choices. Occasionally, code may diverge from this guide, however it should be a significant reason for the alternate behavior.

We follow most of the suggestions in [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments). We have written out few alterations and clarifications here.

The following is roughly in the order of priority.

If the guide is not followed then CI may fail.

## Formatting

All code is formatted with `goimports -local storj.io`. Where `goimports` is using the latest supported stable Go version.

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

Go allows to place the _package comment_ on any non test go file that the package contains and one of the used patterns is to have a `doc.go` file which only contains the _package comment_ (e.g. [fmt standard package](https://golang.org/src/fmt/doc.go)). For keep it simple in order to choose which file should contain the _package comment_, we place the _package comment_ in a `doc.go` even when the package has only one Go file because we always know where such _package comment_ is written and there is no need to move it in case that a package with just one initial file grow to have more in the future.

## Logging

Use properly namespaced `*zap.Logger`. By properly namespacing and passing in the logger we can better find how things are working. Tests should use `zaptest.NewLogger(t)` as the root logger.

Avoid using global loggers (e.g. `zap.L().Error`, `log.Print`, `fmt.Print`), unless it is `package main`.

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

## Integers

We only use _unsigned integers_ (e.g. `uint`, `uint32`, etc.) on the following circumstances:

* They are used as _bitmasks_.
* They are used for serialized formats.

On the rest of the cases, __always__ use _signed integers_ (e.g. `int`, `int64`, etc.).

The rationale behind this convention is that the last thing that we want is to have wacky behavior around common values and _zero_ is a common one, so we want to avoid `-1` from an unsigned integer variable with `0` value.

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

## Prefer synchronous methods

Making synchronous methods to asynchornous is usually easier than making an asynchronous method to synchronous. This also keeps code simpler when the asynchrony is not needed.

## Avoid sleeps for synchronization

Sleeps usually hide racy behavior, proper synchronization usually doesn't need them.

Of course using sleeps, tickers for scheduling or for avoiding thundering herd problem is acceptable.

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
