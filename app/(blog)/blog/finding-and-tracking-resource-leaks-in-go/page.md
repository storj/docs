---
author:
  name: Egon Elbre
date: '2022-10-13 00:00:00'
heroimage: ./d2d97753e00bbc80.png
layout: blog
metadata:
  description: Forgetting to close a file, a connection, or some other resource is
    a rather common issue in Go. Usually you can spot them with good code review practices,
    but what if you wanted to automate it and you don't have a suitable linter at
    hand?
  title: Finding and Tracking Resource Leaks in Go
title: Finding and Tracking Resource Leaks in Go

---

Forgetting to close a file, a connection, or some other resource is a rather common issue in Go. Usually you can spot them with good code review practices, but what if you wanted to automate it and you don't have a suitable linter at hand?

How do we track and figure out those leaks?

Fortunately, there's an approach to finding common resource leaks that we’ll explore below.

## Problem: Connection Leak

Let's take a simple example that involves a TCP client. Of course, it applies to other protocols, such as GRPC, database, or HTTP. We'll omit the communication implementation because it's irrelevant to the problem.

```go
type Client struct {
	conn net.Conn
}

func Dial(ctx context.Context, address string) (*Client, error) {
	conn, err := (&net.Dialer{}).DialContext(ctx, "tcp", address)
	if err != nil {
		return nil, fmt.Errorf("failed to dial: %w", err)
	}

	return &Client{conn: conn}, nil
}

func (client *Client) Close() error {
	return client.conn.Close()
}
```

It's easy to put the defer in the wrong place or forget to call Close altogether.

```go
func ExampleDial(ctx context.Context) error {
	source, err := Dial(ctx, "127.0.0.1:1000")
	if err != nil {
		return err
	}

	destination, err := Dial(ctx, "127.0.0.1:1001")
	if err != nil {
		return err
	}

	defer source.Close()
	defer destination.Close()

	data, err := source.Recv(ctx)
	if err != nil {
		return fmt.Errorf("recv failed: %w", err)
	}

	err = destination.Send(ctx, data)
	if err != nil {
		return fmt.Errorf("send failed: %w", err)
	}

	return nil
}
```

Notice if we fail to dial the second client, we have forgotten to close the source connection.

## Problem: File Leak

Another common resource management mistake is a file leak.

```go
func ExampleFile(ctx context.Context, fs fs.FS) error {
	file, err := fs.Open("data.csv")
	if err != nil {
		return fmt.Errorf("open failed: %w", err)
	}

	stat, err := fs.Stat()
	if err != nil {
		return fmt.Errorf("stat failed: %w", err)
	}

	fmt.Println(stat.Name())

	_ = file.Close()
	return nil
}
```

## Tracking Resources

How do we track and figure out those leaks? One thing we can do is to keep track of every single open file and connection and ensure that everything is closed when the tests finish.

We need to build something that keeps a list of all open things and tracks where we started using a resource.

To figure out where our "leak" comes from, we can use [`runtime.Callers`](https://pkg.go.dev/runtime#Callers). You can look at the [Frames example](https://pkg.go.dev/runtime#example-Frames) to learn how to use it. Let's call the struct we use to hold this information a `Tag`.

```go
// Tag is used to keep track of things we consider open.
type Tag struct {
	owner  *Tracker // we'll explain this below
	caller [5]uintptr
}

// newTag creates a new tracking tag.
func newTag(owner *Tracker, skip int) *Tag {
	tag := &Tag{owner: owner}
	runtime.Callers(skip+1, tag.caller[:])
	return tag
}

// String converts a caller frames to a string.
func (tag *Tag) String() string {
	var s strings.Builder
	frames := runtime.CallersFrames(tag.caller[:])
	for {
		frame, more := frames.Next()
		if strings.Contains(frame.File, "runtime/") {
			break
		}
		fmt.Fprintf(&s, "%s\n", frame.Function)
		fmt.Fprintf(&s, "\t%s:%d\n", frame.File, frame.Line)
		if !more {
			break
		}
	}
	return s.String()
}

// Close marks the tag as being properly deallocated.
func (tag *Tag) Close() {
	tag.owner.Remove(tag)
}
```

Of course, we need something to keep the list of all open trackers:

```go
// Tracker keeps track of all open tags.
type Tracker struct {
	mu     sync.Mutex
	closed bool
	open   map[*Tag]struct{}
}

// NewTracker creates an empty tracker.
func NewTracker() *Tracker {
	return &Tracker{open: map[*Tag]struct{}{}}
}

// Create creates a new tag, which needs to be closed.
func (tracker *Tracker) Create() *Tag {
	tag := newTag(tracker, 2)

	tracker.mu.Lock()
	defer tracker.mu.Unlock()

	// We don't want to allow creating a new tag, when we stopped tracking.
	if tracker.closed {
		panic("creating a tag after tracker has been closed")
	}
	tracker.open[tag] = struct{}{}

	return tag
}

// Remove stops tracking tag.
func (tracker *Tracker) Remove(tag *Tag) {
	tracker.mu.Lock()
	defer tracker.mu.Unlock()
	delete(tracker.open, tag)
}

// Close checks that none of the tags are still open.
func (tracker *Tracker) Close() error {
	tracker.mu.Lock()
	defer tracker.mu.Unlock()

	tracker.closed = true
	if len(tracker.open) > 0 {
		return errors.New(tracker.openResources())
	}
	return nil
}

// openResources returns a string describing all the open resources.
func (tracker *Tracker) openResources() string {
	var s strings.Builder
	fmt.Fprintf(&s, "%d open resources\n", len(tracker.open))

	for tag := range tracker.open {
		fmt.Fprintf(&s, "---\n%s\n", tag)
	}

	return s.String()
}
```

Let's look at how it works:

```go
func TestTracker(t *testing.T) {
	tracker := NewTracker()
	defer func() {
		if err := tracker.Close(); err != nil {
			t.Fatal(err)
		}
	}()

	tag := tracker.Create()
	// if we forget to call Close, then the test fails.
	// tag.Close()
}
```

You can test it over at https://go.dev/play/p/8AkKrzYVFH5.

## Hooking up the tracker to a `fs.FS`

We need to integrate it into the initially problematic code. We can create a wrapper for `fs.FS` that creates a tag for each opened file.

```go
type TrackedFS struct {
	tracker *Tracker
	fs      fs.FS
}

func TrackFS(fs fs.FS) *TrackedFS {
	return &TrackedFS{
		tracker: NewTracker(),
		fs:      fs,
	}
}

func (fs *TrackedFS) Open(name string) (fs.File, error) {
	file, err := fs.fs.Open(name)
	if err != nil {
		return file, err
	}

	tag := fs.tracker.Create()
	return &trackedFile{
		File: file,
		tag:  tag,
	}, nil
}

func (fs *TrackedFS) Close() error { return fs.tracker.Close() }

type trackedFile struct {
	fs.File
	tag *Tag
}

func (file *trackedFile) Close() error {
	file.tag.Close()
	return file.File.Close()
}
```

Finally, we can use this wrapper in a test and get some actual issues resolved:

```go
func TestFS(t *testing.T) {
	// We'll use `fstest` package here, but you can also replace this with
	// `os.DirFS` or similar.
	dir := fstest.MapFS{
		"data.csv": &fstest.MapFile{Data: []byte("hello")},
	}

	fs := TrackFS(dir)
	defer func() {
		if err := fs.Close(); err != nil {
			t.Fatal(err)
		}
	}()

	file, err := fs.Open("data.csv")
	if err != nil {
		t.Fatal(err)
	}

	stat, err := file.Stat()
	if err != nil {
		t.Fatal(err)
	}

	t.Log(stat.Name())
}
```

You can play around with it here https://go.dev/play/p/VTKZUzWukTe.


## Hooking up the tracker via a `Context`

Passing this `tracker` everywhere would be rather cumbersome. However, we can write some helpers to put the tracker inside a `Context`.

```go
type trackerKey struct{}

func WithTracker(ctx context.Context) (*Tracker, context.Context) {
	tracker := NewTracker()
	return tracker, context.WithValue(ctx, trackerKey{}, tracker)
}

func TrackerFromContext(ctx context.Context) *Tracker {
	value := ctx.Value(trackerKey{})
	return value.(*Tracker)
}
```

Of course, we need to adjust our `Client` implementation as well:

```go
type Client struct {
	conn net.Conn
	tag  *Tag
}

func Dial(ctx context.Context, address string) (*Client, error) {
	conn, err := (&net.Dialer{}).DialContext(ctx, "tcp", address)
	if err != nil {
		return nil, fmt.Errorf("failed to dial: %w", err)
	}

	tracker := TrackerFromContext(ctx)
	return &Client{conn: conn, tag: tracker.Create()}, nil
}

func (client *Client) Close() error {
	client.tag.Close()
	return client.conn.Close()
}
```

To make our testing code even shorter, we can make a tiny helper:

```go
func TestingTracker(ctx context.Context, tb testing.TB) context.Context {
	tracker, ctx := WithTracker(ctx)
	tb.Cleanup(func() {
		if err := tracker.Close(); err != nil {
			tb.Fatal(err)
		}
	})
	return ctx
}
```

Finally, we can put it all together:

```go
func TestClient(t *testing.T) {
	ctx := TestingTracker(context.Background(), t)

	addr := startTestServer(t)

	client, err := Dial(ctx, addr)
	if err != nil {
		t.Fatal(err)
	}

	// if we forget to close, then the test will fail
	// client.Close
	_ = client
}
```

You can see it working over here https://go.dev/play/p/B6qI6xgij1m.

## Making it zero cost for production

Now, all of this `runtime.Callers` calling comes with a high cost. However, we can reduce it by conditionally compiling the code. Luckily we can use tags to only compile it only for testing. I like to use the `race` tag for it because it is added any time you run your tests with `-race`.

```go
//go:build race

package tracker
```

The implementations are left as an exercise for the reader. :)

## Conclusion

This is probably not a final solution for your problem, but hopefully, it is a good starting point. You can add more helpers, maybe track the filename inside a `Tag`, or only print unique caller frames in the test failure. Maybe try implementing this for SQL driver and track each thing separately -- you can take a peek [at our implementation](https://github.com/storj/private/tree/main/tagsql), if you get stuck.

May all your resource leaks be discovered.

This is a continuation of our series of finding leaks in Golang. In case you missed it, in a previous post we covered [finding leaked goroutines](https://www.storj.io/blog/finding-goroutine-leaks-in-tests).
