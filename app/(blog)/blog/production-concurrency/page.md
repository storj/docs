---
author:
  name: Egon Elbre
date: '2022-07-29 00:00:00'
heroimage: ./df0a3a1834547b61.jpeg
layout: blog
metadata:
  description: Concurrency is one of those things that's easy to get wrong, even with
    Go concurrency features. Let's review things you should consider while writing
    a concurrency production code.
  title: Production Ready Go Concurrency
title: Production Ready Go Concurrency

---

Concurrency is one of those things that's easy to get wrong, even with Go concurrency features. Let's review things you should consider while writing a concurrency production code.

The guide is split into three parts, each with a different purpose. First, we'll talk about "Rules of Thumb," which are usually the right thing to do. The second part is on what to use for writing concurrent code. And finally, we'll cover how to write your custom concurrency primitives.

Before we start, I should mention that many of these recommendations will have conditions where they are not the best choice. The main situations are going to be performance and prototyping.

### Avoid Concurrency

I've seen many times people using concurrency where you should not use it. It should go without saying, don't add concurrency unless you have a good reason.


```
var wg sync.WaitGroup

wg.Add(1)
go serve(&wg)
wg.Wait()
```
❯


```
serve()
```
The concurrency here is entirely unnecessary, but I've seen this exact code in a repository. System without concurrency is much easier to debug, test and understand.

People also add concurrency because they think it will speed up their program. In a production environment, you are handling many concurrent requests anyways, so making one part concurrent doesn't necessarily make the whole system faster.

### Prefer Synchronous API

A friend of the previous rule is to prefer synchronous API. As mentioned, non-concurrent code is usually shorter and easier to test and debug.


```
server.Start(ctx)
server.Stop()
server.Wait()
```
❯


```
server.Run(ctx)
```
If you need concurrency when using something, it's relatively easy to make things concurrent. It's much more difficult to do the reverse.

### Use -race and t.Parallel()

There are two excellent Go features that help you shake out concurrency bugs from your code.

First is -race, which enables the race detector to flag all the observed data races. It can be used with go test -race ./... or go build -race ./yourproject. See [Data Race Detector](https://go.dev/doc/articles/race_detector) for more details.

Second mark your tests with t.Parallel():


```
func TestServer(t *testing.T) {
	t.Parallel()
	// ...
```
This makes your tests run in parallel, which can speed them up, but it also means you are more likely to find a hidden shared state that doesn't work correctly in concurrent code. In addition to finding bugs in our codebases, we've also found them in third-party libraries.

### No global variables

Avoid global variables such as caches, loggers, and databases.

For example, it's relatively common for people to use log.Println inside their service, and their testing output ends in the wrong location.


```
func TestAlpha(t *testing.T) {
	t.Parallel()
	log.Println("Alpha")
}

func TestBeta(t *testing.T) {
	t.Parallel()
	log.Println("Beta")
}
```
The output from go test -v will look like:


```
=== RUN   TestAlpha
=== PAUSE TestAlpha
=== RUN   TestBeta
=== PAUSE TestBeta
=== CONT  TestAlpha
=== CONT  TestBeta
2022/07/24 10:59:06 Alpha
--- PASS: TestAlpha (0.00s)
2022/07/24 10:59:06 Beta
--- PASS: TestBeta (0.00s)
PASS
ok      test.test       0.213s
```
Notice how the "Alpha" and "Beta" are out of place. The code under test should call t.Log for any testing needs; then, the log lines will appear in the correct location. There's no way to make it work with a global logger.

### Know when things stop

Similarly, it's relatively common for people to start goroutines without waiting for them to finish. *go* keyword makes starting goroutines very easy; however, it's not apparent that you also must wait for them to stop.


```
go ListenHTTP(ctx)
go ListenGRPC(ctx)
go ListenDebugServer(ctx)
select{}
```
❯


```
g, ctx := errgroup.WithContext(ctx)
g.Go(func() error {
	return ListenHTTP(ctx)
}
g.Go(func() error {
	return ListenGRPC(ctx)
}
g.Go(func() error {
	return ListenDebugServer(ctx)
}
err := g.Wait()
```
When you don't know when things stop, you don't know when to close your connections, databases, or log files. For example, some stray goroutine might use a closed database and cause panic.

Similarly, when you wait for all goroutines to finish, you can detect scenarios when one of the goroutines has become indefinitely blocked.

### Context aware code

The next common issue is not handling context cancellation. It usually won't be a problem in the production system itself. It's more of an annoyance during testing and development. Let's imagine you have a time.Sleep somewhere in your code:


```
time.Sleep(time.Minute)
```
❯


```
tick := time.NewTimer(time.Minute)
defer tick.Stop()

select {
case <-tick.C:
case <-ctx.Done():
	return ctx.Err()
}
```
time.Sleep cannot react to any code, which means when you press Ctrl-C on your keyboard, it will stay on that line until it finishes. This can increase your test times due to some services shutting down slowly. Or, when doing upgrades on your servers, it can make them much slower to shut down.

*The code for the waiting on the right is much longer, but we can write helpers to simplify it.*

The other scenario where this cancellation comes up is long calculations:


```
for _, f := range files {
	data, err := os.ReadFile(f)
	// ...
}
```
❯


```
for _, f := range files {
	if err := ctx.Err(); err != nil {
		return err
	}

	data, err := os.ReadFile(f)
	// ...
}
```
Here we can introduce a ctx.Err() call to check whether the context has been cancelled. Note ctx.Err() call is guaranteed to be concurrency safe, and it's not necessary to check ctx.Done() separately.

### No worker pools

People coming from other languages often resort to creating worker pools. It's one of those tools that's necessary when you are working with threads instead of goroutines.

There are many reasons to not use worker pools:

* They make stack traces harder to read. You'll end up having hundreds of goroutines that are on standby.
* They use resources even if they are not working.
* They can be slower than spawning a new goroutine.

You can replace your worker pools with a goroutine limiter -- something that disallows from creating more than N goroutines.


```
var wg sync.WaitGroup
defer wg.Wait()
queue := make(chan string, 8)
for k := 0; k < 8; k++ {
	wg.Add(1)
	go func() {
		defer wg.Done()
		for work := range queue {
			process(work)
		}
	}()
}

for _, work := range items {
	queue <- work
}
close(queue)
```
❯


```
var wg sync.WaitGroup
defer wg.Wait()
limiter := make(chan struct{}, 8)
for _, work := range items {
	work := work
	wg.Add(1)
	limiter <- struct{}{}
	go func() {
		defer wg.Done()
		defer func() { <-limiter }()

		process(work)
	}()
}
```
We'll later show how to make a limiter primitive easier to use.

### No polling

Polling another system is rather wasteful of resources. It's usually better to use some channel or signal to message the other side:


```
lastKnown := 0
for {
	time.Sleep(time.Second)
	t.mu.Lock()
	if lastKnown != t.current {
		process(t.current)
		lastKnown = t.current
	}
	t.mu.Unlock()
}
```
❯


```
lastKnown := 0
for newState := range t.updates {
	if lastKnown != newState {
		process(newState)
		lastKnown = newState
	}
}
```
Polling wastes resources when the update rates are slow. It also responds to changes slower compared to notifying directly. There are many ways to avoid polling, which could be a separate article altogether.

*Of course, if you are making an external request and the external API is out of your control, you might not have any other choice than to poll.*

### Defer unlocks and waits

It's easy to forget an mu.Unlock, wg.Wait or close(ch). If you always defer them, it will be much easier to see when they are missing.


```
for _, item := range items {
	service.mu.Lock()
	service.process(item)
	service.mu.Unlock()
}
```
❯


```
for _, item := range items {
	func() {
		service.mu.Lock()
		defer service.mu.Unlock()

		service.process(item)
	}()
}
```
Even if your initial code is correct, then code modification can introduce a bug. For example, adding a return inside the loop after the mu.Lock() would leave the mutex locked.

### Don’t expose your locks

The larger the scope where the locks can be used, the easier it is to make a mistake.


```
type Set[T any] struct {
	sync.Lock
	Items []T
}
```
❯


```
type Set[T any] struct {
	mu    sync.Lock
	items []T
}
```
### Name your goroutines

You can make your debugging and stack traces much nicer by adding names to your goroutines:


```
labels := pprof.Labels("server", "grpc")
pprof.Do(ctx, labels,
	func(ctx context.Context) {
		// ...
	})
```
There's an excellent article "[Profiler labels in Go](https://rakyll.org/profiler-labels/)", which explains how to use them.

## Concurrency Primitives

When it comes to writing production code, it's a bad idea to use some concurrency primitives directly in your code. They can be error-prone and make code much harder to reason about.

When choosing primitives, prefer them in this order:

1. no-concurrency
2. golang.org/x/sync/errgroup, golang.org/x/sync, sync.Once
3. custom primitive or another library
4. sync.Mutex in certain scenarios
5. select {

However, many others are useful when used for implementing your custom primitives:

5. sync.Map, sync.Pool (use a typesafe wrapper)
6. sync.WaitGroup
7. chan, go func() {
8. sync.Mutex, sync.Cond
9. sync/atomic

If you are surprised that chan and go func() { are so low on the list, we'll show how people make tiny mistakes with them.

### Common Mistake #1: go func()


```
func (server *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	...
	// start an async operation
	go func() {
		res, err := server.db.ExecContext(r.Context(), "INSERT ...")
		...
	}()
	...
}

func main() {
	...

	db, err := openDB(ctx)
	defer db.Close()

	err := server.Run(ctx)
	...
}
```
Notice there's no guarantee that the goroutine finishes before the database is closed. This can introduce weird test failure, where you try to insert into a closed database.

Similarly, another bug, r.Context() could be cancelled prematurely. Of course, this depends on the problem specifics, but when you start a background operation from your handler, you don't want the user to cancel it.

### Primitive: sync.WaitGroup

One of the solutions for starting goroutines is to use sync.WaitGroup. However, it also has quite a few problematic scenarios.

Let's take a look at the first common mistake with sync.WaitGroup:


```
func processConcurrently(item []*Item) {
	var wg sync.WaitGroup
	defer wg.Wait()
	for _, item := range items {
		item := item
		go func() {
			process(&wg, item)
		}()
	}
}

func process(wg *sync.WaitGroup, item *Item) {
	wg.Add(1)
	defer wg.Done()

	...
}
```
Here the problem is that the processConcurrently can return before wg.Add is called. This means that we don't wait for all the goroutines to finish.

The other scenario comes up when people incrementally change code:


```
func processConcurrently(item []*Item) {
	var wg sync.WaitGroup
	wg.Add(len(items))
	defer wg.Wait()
	for _, item := range items {
		item := item
		if filepath.Ext(item.Path) != ".go" {
			continue
		}
		go func() {
			defer wg.Done()
			process(item)
		}()
	}
}
```
Notice how we moved the call to wg.Done outside of the process, making it easier to track the full concurrency. However, due to the extra if filepath.Ext statement, the code is wrong. That check was probably added by someone else at a later time. Similarly, it's one of those cases where tests might easily miss the problem.

To fully fix the code, it should look like this:


```
func processConcurrently(item []*Item) {
	var wg sync.WaitGroup
	defer wg.Wait()
	for _, item := range items {
		item := item
		if filepath.Ext(item.Path) != ".go" {
			continue
		}
		wg.Add(1)
		go func() {
			defer wg.Done()
			process(item)
		}()
	}
}
```
If you don't see the following parts when someone is using sync.WaitGroup, then it probably has a subtle error somewhere:


```
var wg sync.WaitGroup
defer wg.Wait()
...
for ... {
	wg.Add(1)
	go func() {
		defer wg.Done()
```
### Use golang.org/x/sync/errgroup

Instead of sync.WaitGroup there's a better alternative that avoids many of these issues:


```
func processConcurrently(item []*Item) error {
	var g errgroup.Group
	for _, item := range items {
		item := item
		if filepath.Ext(item.Path) != ".go" {
			continue
		}
		g.Go(func() error {
			return process(item)
		})
	}
	return g.Wait()
}
```
errgroup.Group can be used in two ways:


```
// on failure, waits other goroutines
// to stop on their own
var g errgroup.Group
g.Go(func() error {
	return publicServer.Run(ctx)
})
g.Go(func() error {
	return grpcServer.Run(ctx)
})
err := g.Wait()
```

```
// on failure, cancels other goroutines
g, ctx := errgroup.WithContext(ctx)
g.Go(func() error {
	return publicServer.Run(ctx)
})
g.Go(func() error {
	return grpcServer.Run(ctx)
})
err := g.Wait()
```
You can read [golang.org/x/sync/errgroup documentation](https://pkg.go.dev/golang.org/x/sync/errgroup#Group) for additional information. *Note, errgroup allows to limit the number of goroutines that can be started concurrently.*

### Primitive: sync.Mutex

Mutex is definitely a useful primitive, however you should be careful when you use it. I've seen quite often code that looks like:


```
func (cache *Cache) Add(ctx context.Context, key, value string) {
	cache.mu.Lock()
	defer cache.mu.Unlock()

	cache.evictOldItems()
	cache.items[key] = entry{
		expires: time.Now().Add(time.Second),
		value: value,
	}
}
```
You might wonder, what's the problem here. It's appropriately locking and unlocking. The main problem is the call to cache.evictOldItemsand that it's not handling context cancellation. This means that requests could end up blocking behind cache.mu.Lock, and even if they are cancelled you would need to wait for it to get unlocked before you can return.

Instead, you can use a chan \*state, which allows you to handle context cancellation properly:


```
type Cache struct {
	state chan *state
}

func NewCache() {
	content := make(chan *state, 1)
	content <- &state{}
	return Cache{state: content}
}

func (cache *Cache) Add(ctx context.Context, key, value string) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	case state := <-cache.state:
		defer func() { cache.state <- state }()

		cache.evictOldItems()
		cache.items[key] = entry{
			expires: time.Now().Add(time.Second),
			value: value,
		}

		return nil
	}
}
```
Even though the evictOldItems call is still there, it won't prevent other callers to Add to cancel their request.

Use sync.Mutex only for cases where you need to hold the lock for a short duration. Roughly it means that the code is O(N) or better, and N is small.

#### Primitive: sync.RWMutex

sync.RWMutex has all the same problems as sync.Mutex. However, it can also be significantly slower. Similarly, it makes it easy to have data races when you write to variables during RLock.

In your specific scenario, you should have benchmarks demonstrating that sync.RWMutex is faster than sync.Mutex.

*Details: When there are a lot of readers and no writers, there's a cache contention between the readers because taking a read lock mutates a mutex, which is not scalable. A writer attempting to grab the lock blocks future readers from acquiring it, so long-lived readers with infrequent writers cause long delays of no work.*

Either way, you should be able to demonstrate that your use of sync.RWMutex is helpful.

### Primitive: chan

Channels are valuable things in the Go language but are also error-prone. There are many ways to write bugs with them:


```
const workerCount = 100

var wg sync.WaitGroup
workQueue := make(chan *Item)
defer wg.Wait()

for i := 0; i < workerCount; i++ {
	wg.Add(1)
	go func() {
		defer wg.Done()
		for item := range workQueue {
			process(item)
		}
	}()
}

err := db.IterateItems(ctx, func(item *Item) {
	workQueue <- item
})
```
This is probably one of the common ones... forgetting to close the channel. Channels also make the code harder to review compared to using higher-level primitives.

Using chan for communicating between different "goroutine processes" in your application is fine; however, ensure that you handle context cancellations and shut down properly. Otherwise, it's easy to introduce a deadlock.

### Few additional rules-of-thumb

I've come to the conclusion that you should avoid these in your domain logic:

* make(chan X, N)
* go func()
* sync.WaitGroup

They are error-prone, and there are better approaches. It's clearer to write your own higher-level abstraction for your domain logic. Of course, having them isn't an "end-of-the-world" issue either.

I should separately note that using "select" is usually fine.

## Your own artisanal concurrency primitives

I told you to avoid many things in domain code, so what should you do instead?

If you cannot find an appropriate primitive from golang.org/x/sync or other popular libraries... you can write your own.


> Writing a separate concurrency primitive is easier to get right than writing ad hoc concurrency logic in domain code.

There are many ways you can write such primitives. The following are merely examples of different ways how you can write them.

### Sleeping

Let's take a basic thing first, sleeping a bit:


```
func Sleep(ctx context.Context, duration time.Duration) error {
	t := time.NewTimer(duration)
	defer t.Stop()

	select {
	case <-t.C:
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}
```
Here we need to ensure that we appropriately react to context cancellation so that we don't wait for a long time until we notice that context canceled the operation. Using this call is not much longer than time.Sleep itself:


```
if err := Sleep(ctx, time.Second); err != nil {
	return err
}
```
### Limiter

I've found plenty of cases where you must limit the number of goroutines.


```
type Limiter struct {
	limit   chan struct{}
	working sync.WaitGroup
}

func NewLimiter(n int) *Limiter {
	return &Limiter{limit: make(chan struct{}, n)}
}

func (lim *Limiter) Go(ctx context.Context, fn func()) bool {
	// ensure that we aren't trying to start when the
	// context has been cancelled.
	if ctx.Err() != nil {
		return false
	}

	// wait until we can start a goroutine:
	select {
	case lim.limit <- struct{}{}:
	case <-ctx.Done():
		// maybe the user got tired of waiting?
		return false
	}

	lim.working.Add(1)
	go func() {
		defer func() {
			<-lim.limit
			lim.working.Done()
		}()

		fn()
	}()

	return true
}

func (lim *Limiter) Wait() {
	lim.working.Wait()
}
```
This primitive is used the same way as errgroup.Group:


```
lim := NewLimiter(8)
defer lim.Wait()
for _, item := range items {
	item := item
	started := lim.Go(ctx, func() {
		process(item)
	})
	if !started {
		return ctx.Err()
	}
}
```
Of course, if your limited goroutines are dependent on each other, then it can introduce a deadlock.

*AlsonNote that there's a potential "bug" with using such a Limiter. You must not call limiter.Go after you have called limiter.Wait, otherwise the goroutine can be started after limiter.Wait has returned. This can also happen with sync.WaitGroup and errgroup.Group. One way to avoid this problem is to disallow starting goroutines after limiter.Wait has been called. It probably makes sense to rename it to "limiter.Close" in that case.*

#### Batch processing a slice

Let's say you want to process a slice concurrently. We can use this limiter to start multiple goroutines with the specified batch sizes:


```
type Parallel struct {
	Concurrency int
	BatchSize   int
}

func (p Parallel) Process(ctx context.Context,
	n, process func(low, high int)) error {

	// alternatively, these panics could set a default value
	if p.Concurrency <= 0 {
		panic("concurrency must be larger than zero")
	}
	if p.BatchSize <= 0 {
		panic("batch size must be larger than zero")
	}

	lim := NewLimiter(p.Concurrency)
	defer lim.Wait()

	for low := 0; low < n; low += p.BatchSize {
		low, high := low, low + p.BatchSize
		if high > n {
			high = n
		}

		started := lim.Go(ctx, func() {
			process(low, high)
		})
		if !started {
			return ctx.Err()
		}
	}
}
```
This primitive allows to hide the "goroutine management" from our domain code:


```
var mu sync.Mutex
total := 0

err := Parallel{
	Concurrency: 8,
	BatchSize: 256,
}.Process(ctx, len(items), func(low, high int) {
	price := 0
	for _, item := range items[low:high] {
		price += item.Price
	}

	mu.Lock()
	defer mu.Unlock()
	total += price
})
```
### Running a few things concurrently

Sometimes for testing, you need to start multiple goroutines and wait for all of them to complete. You can use errgroup for it; however, we can write a utility that makes it shorter:


```
func Concurrently(fns ...func() error) error {
	var g errgroup.Group
	for _, fn := range fns {
		g.Go(fn)
	}
	return g.Wait()
}
```
A test can use it this way:


```
err := Concurrently(
	func() error {
		if v := cache.Get(123); v != nil {
			return errors.New("expected value for 123")
		}
		return nil
	},
	func() error {
		if v := cache.Get(256); v != nil {
			return errors.New("expected value for 256")
		}
		return nil
	},
)
if err != nil {
	t.Fatal(err)
}
```
There are many variations of this. Should the function take ctx as an argument and pass it to the child goroutines? Should it cancel all the other functions via context cancellations when one error occurs?

### Waiting for a thing

Sometimes you want different goroutines to wait for one another:


```
type Fence struct {
	create  sync.Once
	release sync.Once
	wait    chan struct{}
}

// init allows to use the struct without separate initialization.
func (f *Fence) init() {
	f.create.Do(func() {
		f.wait = make(chan struct{})
	})
}

// Release releases any waiting goroutines.
func (f *Fence) Release() {
	f.init()
	f.release.Do(func() {
		close(f.wait)
	})
}

// Released allows to write different select than
// `Fence.Wait` provides.
func (f *Fence) Released() chan struct{} {
	f.init()
	return f.wait
}

// Wait waits for the fence to be released and takes into account
// context cancellation.
func (f *Fence) Wait(ctx context.Context) error {
	f.init()
	select {
	case <-f.Released():
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}
```
When we use it together with Concurrently we can write code that looks like:


```
var loaded Fence
var data map[string]int

err := Concurrently(
	func() error {
		defer loaded.Release()
		data = getData(ctx, url)
		return nil
	},
	func() error {
		if err := loaded.Wait(ctx); err != nil {
			return err
		}
		return saveToCache(data)
	},
	func() error {
		if err := loaded.Wait(ctx); err != nil {
			return err
		}
		return processData(data)
	},
)
```
### Protecting State

Similarly, we quite often need to protect the state when concurrently modifying it. We've seen how sync.Mutex is sometimes error-prone and doesn't consider context cancellation. Let's write a helper for such a scenario.


```
type Locked[T any] struct {
	state chan *T
}

func NewLocked[T any](initial *T) *Locked[T] {
	s := &Locked[T]{}
	s.state = make(chan *T, 1)
	s.state <- initial
	return s
}

func (s *Locked[T]) Modify(ctx context.Context, fn func(*T) error) error {
	if ctx.Err() != nil {
		return ctx.Err()
	}

	select {
	case state := <-s.state:
		defer func() { s.state <- state }()
		return fn(state)
	case <-ctx.Done():
		return ctx.Err()
	}
}
```
Then we can use it like:


```
state := NewLocked(&State{Value: 123})
err := state.Modify(ctx, func(state *State) error {
	state.Value = 256
	return nil
})
```
### Async processes in a server

Finally, let's take a scenario where we want to start background goroutines inside a server.

Let's first write out the server code, how we would like to use it:


```
unc (server *Server) Run(ctx context.Context) error {
	server.pending = NewJobs(ctx)
	defer server.pending.Wait()

	return server.listenAndServe(ctx)
}

func (server *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	...

	started := server.pending.Go(r.Context(),
		func(ctx context.Context) {
			err := server.db.ExecContext(ctx, "INSERT ...")
			...
		})
	if !started {
		if r.Context().Err() != nil {
			http.Error(w, "client closed request", 499)
			return
		}
		http.Error(w, "shutting down", http.StatusServiceUnavailable)
		return nil
	}

	...
}
```
Then let's write the primitive:


```
type Jobs struct {
	root  context.WithContext
	group errgroup.Group
}

func NewJobs(root context.Context) *Jobs {
	return &Jobs{root: root}
}

func (jobs *Jobs) Wait() { _ = jobs.group.Wait() }

func (jobs *Jobs) Go(requestCtx context.Context, fn func(ctx context.Context)) bool {
	// did the user cancel?
	if requestCtx.Err() != nil {
		return false
	}
	// let's check whether server is shutting down
	if jobs.root.Err() != nil {
		return false
	}

	jobs.group.Go(func() error {
		// Note, we use the root context and not the request context.
		fn(jobs.root)
		return nil
	})

	return true
}
```
Of course, we can add a limiter, to prevent too many background workers to be started:


```
type Jobs struct {
	root  context.WithContext
	limit chan struct{}
	group errgroup.Group
}

func (jobs *Jobs) Go(requestCtx context.Context, fn func(ctx context.Context)) bool {
	if requestCtx.Err() != nil || jobs.root.Err() != nil {
		return false
	}
	select {
	case <-requestCtx.Done():
		return false
	case <-jobs.root.Done():
		return false
	case jobs.limit <- struct{}{}:
	}

	jobs.group.Go(func() error {
		defer func() { <-jobs.limit }()
		fn(ctx)
		return nil
	})

	return true
}
```
### Exercise: Retrying with backoff

As a final exercise for the reader, you can try implementing a retry with backoff. The API for such a primitive can look like this:


```
const (
	maxRetries = 10
	minWait = time.Second/10
	maxWait = time.Second
)

retry := NewRetry(maxRetries, minWait, maxWait)
for retry.Next(ctx) {
	...
}
if retry.Err() != nil {
	return retry.Err()
}
```
Alternatively, it can be callback based:


```
err := Retry(ctx, maxRetries, minWait, maxWait,
	func(ctx context.Context) error {
		...
	})
```
Additionally, consider where one would be better than the other.

## Additional resources

There are many resources that can help you delve deeper.

You can find quite a lot of **our own custom primitives** at [**storj.io/common/sync2**](https://pkg.go.dev/storj.io/common/sync2). This package contains most of our synchronization primitives. It contains things like *Sleep* and *Concurrently*, but also more advanced things like *Cycle*, *ReadCache* and *Throttle*. We also have problem specific implementations of [**Combiner**](https://github.com/storj/storj/blob/main/satellite/metainfo/piecedeletion/combiner.go#L15) and [**Queue**](https://github.com/storj/storj/blob/6df867bb3d06240da139de145aaf88077572b4b8/satellite/metainfo/piecedeletion/queue.go#L10) that implement a combiner queue. This primitive allows to dial storage nodes, coalesce multiple deletion requests into a single request.

One of the best talks about Go concurrency is "[**Rethinking Classical Concurrency Patterns**](https://www.youtube.com/watch?v=5zXAHh5tJqQ)" by **Bryan C. Mills**. He discusses problems with worker pools and sync.Cond in-depth.

When you struggle with understanding data-races, then "[**Little Book of Semaphores**](https://greenteapress.com/wp/semaphores/)" by **Allen B. Downey** is an excellent resource. It contains many classic problems and exercises to get your brain noticing them.

There has been also some research on the topic "[**Real-World Concurrency Bugs in Go**](https://songlh.github.io/paper/go-study.pdf)" by **Tengfei Tu** et. al. It contains many additional issues not mentioned in this post.

‍

