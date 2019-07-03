# Profiling

Different ways to profile:

* Debug Endpoint
* Uplink Profiling

## Debug Endpoint

The Satellite and storage nodes run an http service with debug endpoints. By default it uses a random port when the service is started so look in the storj-sim logs to find the debug port.

The debug endpoints can be used to look at the cpu or heap profile or to create an execution trace. See these [go docs](https://golang.org/pkg/net/http/pprof/) for details.

For example, create a 30 second cpu profile of the satellite running locally with this command:

```text
curl "localhost:<saDebugPort>/debug/pprof/profile?seconds=30" -o cpu.prof
```

Create a 30 second memory profile of the satellite running locally with this command:

```text
curl "localhost:<saDebugPort>/debug/pprof/heap?seconds=30" -o mem.prof
```

Reference:

* [debug endpoint source code](https://github.com/storj/storj/blob/master/pkg/process/debug.go#L32)
* [go pprof docs](https://golang.org/pkg/net/http/pprof/)

## Uplink profiling

To create a cpu or memory profile for the uplink, use the following flags `--profile.cpu` and `--profile.mem`.

For example, to create a cpu profile of a download, run:

```text
// generate profile
$ uplink --profile.cpu=cpu.prof cp sj://testbucket/file.test .

// view profile
$ go tool pprof -http :6060 cpu.prof
```

To create a memory profile of a download, run:

```text
$ uplink --profile.mem=mem.prof cp sj://testbucket/file.test .
```

