This document describes Storj stylistic choices. Occasionally, code may diverge from this guide, however it should be a significant reason for the alternate behavior.

We follow most of the suggestions in [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments). We have written out few alterations and clarifications here.

The following is roughly in the order of priority.

If the guide is not followed then CI may fail.

## Formatting

All code is formatted with `goimports -local storj.io`. Where `goimports` is using the latest supported stable Go version.

### Imports

Import statments are in three groups in the following order:

```
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

All errors must be handled and checked.

_Exceptions: printing to console or log (e.g. `fmt.Println`, `log.Print`)_

To combine multiple errors use `errs.Combine`. To collect multiple similar errors use `errs.Group`.

To handle errors with things that need closing use `errs.Combine` together with `defer. As an example:

```
func Example() (err error) {
	file, err := os.Open("example.txt")
	if err != nil {
		return err
	}
	defer func() {
		err = errs.Combine(err, file.Close())
	}

	...
}
```

## Comments

See [Comment Sentences](https://github.com/golang/go/wiki/CodeReviewComments#comment-sentences). Comments should help the reader to orient to the constraints and relations with other packages.

Bad example:

```
// Encode encodes req to w.
func Encode(w io.Writer, req *Request)
```

Better example:

```
// Encode encodes req as JSON to w, which is used by Server.
func Encode(w io.Writer, req *Request)
```

Avoid tautological comments:

```
// DB is a database.
type DB interface {
```

Better example:

```
// DB stores raw accounting information gathered by tally.
type DB interface {
```

_Comments should have a space after `//`, e.g. `// DB` instead of `//DB`.

## Argument order

The following argument order should be used for consistency (split into multiple lines for clarity only):

```
func Do(
    ctx context.Context, // associated context with the operation
    log *zap.Logger,     // logger used by Do
    dep1, dep2,          // dependencies needed by Do
    conf1, conf2,        // different configuration flags
)
```

Of course, if an argument is not needed then there is no need to add it.

## Variable naming

Avoid single letter receivers. For variables a single letter variable can be fine only if the scope doesn't exceed one page (~50 lines).

Prefer hard-to-confuse variables with 3-7 letters.

_Exceptions: Prefer the conventional naming when there is one. e.g. `sync.Mutex` is usually called `mu`._

_Reasoning: Single letter receivers can be convenient, however when moving between a lot of pacakges it can be quickly confusing._

Facilitated example (assume these declarations are in different files):

```
func (p *Printer) Print(project *Project) error { ... }

func (p *Project) PrintTo(printer *Printer) error { return printer.Print(p) }
```

It's easier to follow the code when a longer consistent name is used:

```
func (printer *Printer) Print(project *Project) error { ... }

func (project *Project) PrintTo(printer *Printer) error { return printer.Print(project) }
```

## Type naming

Avoid stutter andc onsider package name as part of the full type name.

```
identity.FullIdentity // not great due to stutter
identity.Full         // better
```

There are places where it's difficult to avoid, example:

```
kademlia.Kademlia
```

## Package aliases

Avoid package aliases, they make it harder to understand which package is actually being used especially, if the names are inconsistent.

If a package alias is required prefer to rename the external packages rather than `storj.io/`.

## Mutexes

When using synchronizing structures like mutexes or condition variables organize them in the struct such that they make clear which fields are protected and which are unprotected. 

For example:

```
type GraphiteDest struct {
	address string

	mu      sync.Mutex
	conn    net.Conn
	buf     *bufio.Writer
	stopped bool
}
```
