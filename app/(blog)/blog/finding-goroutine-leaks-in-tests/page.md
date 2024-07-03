---
author:
  name: Egon Elbre
date: '2022-03-07 00:00:00'
heroimage: ./c1245dac8cff160d.jpeg
layout: blog
metadata:
  description: 'A leaked goroutine at the end of a
    test can indicate several problems. Let''s first, take a look at the most common
    ones before tackling an approach to finding them.Problem: DeadlockFirst, we can
    have a goroutine that is blocked. As an example:func LeakySumSquares(c...'
  title: Finding Goroutine Leaks in Tests
title: Finding Goroutine Leaks in Tests

---

A leaked goroutine at the end of a test can indicate several problems. Let's first, take a look at the most common ones before tackling an approach to finding them.

### Problem: Deadlock

First, we can have a goroutine that is blocked. As an example:


```go
func LeakySumSquares(ctx context.Context, data []int) (
  total int, err error) {

  results := make(chan int)

  for _, v := range data {
    v := v
    go func() {
      result := v * v
      results <- result
    }()
  }

  for {
    select {
    case value := <-results:
      total += value
    case <-ctx.Done():
      return ctx.Err()
    }
  }

  return total, nil
}

```
In this case, when the context is canceled, the goroutines might end up leaking.

### Problem: Leaked Resource

Many times different services, connections, or databases have an internal goroutine used for async processing. A leaked goroutine can show such leaks.


```go
type Conn struct {
  messages chan Message

  close context.CancelFunc
  done  chan struct{}
}

func Dial(ctx context.Context) *Conn {
  ctx, cancel := context.WithCancel(ctx)
  conn := &Conn{
    close:    cancel,
    messages: make(chan Message)
    done:     make(chan struct{}),
  }
  go conn.monitor(ctx)
  return conn
}

func (conn *Conn) monitor(ctx context.Context) {
  defer close(conn.done)
  for {
    select {
    case msg := <-conn.messages:
      conn.handle(msg)
    case <-ctx.Done():
      return
    }
  }
}

func (conn *Conn) Close() {
  conn.close()
  <-conn.done
}

```
Even if the main loop is properly handled, the *conn.handle(msg)* could become deadlocked in other ways.  


### Problem: Lazy Closing Order

  
Even if all the goroutines terminate, there can still be order problems with regard to resource usage. For example, you could end up depending on a database, connection, file, or any other resource, that gets closed before the goroutine finishes.  


Let's take a common case of the problem:


```go
type Server struct {
  log Logger
  db  *sql.DB
}

func NewServer(log Logger, dburi string) (*Server, error) {
  db, err := sql.Open("postgres", dburi)
  if err != nil {
    return nil, fmt.Errorf("opening database failed: %w", err)
  }
  return &Server{log: log, db: db}, nil
}


func (server *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  tag := r.FormValue("tag")
  if tag == "" {
    return
  }

  // update the database in the background
  go func() {
    err := server.db.Exec("...", tag)
    if err != nil {
      server.log.Errorf("failed to update tags: %w", err)
    }
  }()
}


func (server *Server) Close() {
  _ = server.db.Close()
}

```
In this case, when the *Server* is closed, there still could be goroutines updating the database in the background. Similarly, even the *Logger* could be closed before the goroutine finishes, causing some other problems.  


The severity of such close ordering depends on the context. Sometimes it's a simple extra error in the log; in other cases, it can be a data-race or a panic taking the whole process down.

### Rule of Thumb

Hopefully, it's clear that such goroutines can be problematic.

One of the best rules in terms of preventing these issues is:  


The location that starts the goroutine must wait for the goroutine to complete even in the presence of context cancellation. Or, it must explicitly transfer that responsibility to some other service.

As long as you close the top-level service responsible for everything, it'll become visible in tests because if there's a leak, then the test cannot finish.

Unfortunately, this rule cannot be applied to third-party libraries and it's easy to forget to add tracking to a goroutine.  


### Finding Leaks

We could use the total number of goroutines, to find leaks at the end of a test, however that wouldn't work with parallel tests.  


One helpful feature in Go is [goroutine labels](https://rakyll.org/profiler-labels/), which can make profiling and stack traces more readable. One interesting feature they have is that they are propagated automatically to child goroutines.  


This means if we attach a unique label to a goroutine, we should be able to find all the child goroutines. However, code for finding such goroutines is not trivial.  


To attach the label:  



```go
func Track(ctx context.Context, t *testing.T, fn func(context.Context)) {
  label := t.Name()
  pprof.Do(ctx, pprof.Labels("test", label), fn)
  if err := CheckNoGoroutines("test", label); err != nil {
    t.Fatal("Leaked goroutines\n", err)
  }
}

```
Unfortunately, currently, there's not an easy way to get the goroutines with a given label. But, we can use some of the profiling endpoints to extract the necessary information. Clearly, this is not very efficient.


```go
import "github.com/google/pprof/profile"

func CheckNoGoroutines(key, value string) error {
  var pb bytes.Buffer
  profiler := pprof.Lookup("goroutine")
  if profiler == nil {
    return fmt.Errorf("unable to find profile")
  }
  err := profiler.WriteTo(&pb, 0)
  if err != nil {
    return fmt.Errorf("unable to read profile: %w", err)
  }

  p, err := profile.ParseData(pb.Bytes())
  if err != nil {
    return fmt.Errorf("unable to parse profile: %w", err)
  }

  return summarizeGoroutines(p, key, value)
}

func summarizeGoroutines(p *profile.Profile, key, expectedValue string) (
  err error) {
  var b strings.Builder

  for _, sample := range p.Sample {
    if !matchesLabel(sample, key, expectedValue) {
      continue
    }

    fmt.Fprintf(&b, "count %d @", sample.Value[0])
    // format the stack trace for each goroutine
    for _, loc := range sample.Location {
      for i, ln := range loc.Line {
        if i == 0 {
          fmt.Fprintf(&b, "#   %#8x", loc.Address)
          if loc.IsFolded {
            fmt.Fprint(&b, " [F]")
          }
        } else {
          fmt.Fprint(&b, "#           ")
        }
        if fn := ln.Function; fn != nil {
          fmt.Fprintf(&b, " %-50s %s:%d", fn.Name, fn.Filename, ln.Line)
        } else {
          fmt.Fprintf(&b, " ???")
        }
        fmt.Fprintf(&b, "\n")
      }
    }
    fmt.Fprintf(&b, "\n")
  }

  if b.Len() == 0 {
    return nil
  }

  return errors.New(b.String())
}

func matchesLabel(sample *profile.Sample, key, expectedValue string) bool {
  values, hasLabel := sample.Label[key]
  if !hasLabel {
    return false
  }

  for _, value := range values {
    if value == expectedValue {
      return true
    }
  }

  return false
}

```
And a failing test might look like this:


```go
func TestLeaking(t *testing.T) {
  t.Parallel()
  ctx, cancel := context.WithCancel(context.Background())
  defer cancel()

  Track(ctx, t, func(ctx context.Context) {
    LeakyThing(ctx)
  })
}

func LeakyThing(ctx context.Context) {
  done := make(chan struct{})
  go func() {
    go func() {
      done <- struct{}{}
    }()
    done <- struct{}{}
  }()
}

```
The full example can be found here <https://go.dev/play/p/KTF9tyEmLor>.

Depending on your use case, you may want to adjust to your needs. For example, you may want to skip some goroutines or maybe print some extra information, or have a grace period for transient goroutines to shut down.

Such an approach can be hooked into your tests or existing system in a multitude of ways.

