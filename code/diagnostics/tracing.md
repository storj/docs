# Tracing

Different types of tracing:

* Trace graphs
* Distributed tracing

## Trace graphs

There is a config flag, `debug.trace-out`, that will generate a trace graph for a running process.

For example, a trace graph can be generated for `uplink` download with the following command:

```text
$ uplink --debug.trace-out=trace.svg cp sj://bucket/file.test .
```

Then open the `trace.svg` in a browser to view.

The colors in the trace correspond to the following:

* default color: blue
* cancelled: yellow
* error: orange
* panic: red

References:

* [monkit package trace graphs docs](https://github.com/spacemonkeygo/monkit#trace-graphs)

## Distributed tracing

Distributed tracing support is in progress.

