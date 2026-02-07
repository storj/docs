---
title: Uplink CLI API
docId: TC-N6QQVQg8w2cRqvEqEf
redirects:
  - /dcs/api-reference/uplink-cli
  - /api-reference/uplink-cli
metadata:
  title: Using the Uplink CLI
  description:
    A guide to using the Uplink CLI tool for accessing, managing, and uploading
    objects and buckets on Storj. Includes command details and flag usage.
---

## Introduction

An application that allows you to access Object Storage from the command line. Use this tool to upload and manage objects and buckets.

{% callout type="info"  %}
To setup `uplink` see [](docId:TbMdOGCAXNWyPpQmH6EOq).
{% /callout %}

The `uplink` command can take the following child commands:

| Command                         | Description                                                      |
| :------------------------------ | :--------------------------------------------------------------- |
| [](docId:ObsfiEHKpVU7JTdGtW-3t) | set of commands to manage access grants                          |
| [](docId:N20xcpVOuPQIEcaA44wZu) | import a serialized access grant into the configuration          |
| [](docId:yk6xM8Jj_C-blgyjh4K61) | copy a file from outside of Storj bucket to inside or vice versa |
| [](docId:Df-CVmCCHmt6r3_c1PLn4) | list objects and prefixes or all buckets                         |
| [](docId:F77kaGpjXx7w-JYv2rkhf) | make a new bucket                                                |
| [](docId:kyMG3B16kKc3gpCxRNe1K) | metadata related commands                                        |
| [](docId:PIfV271UghKvJecT-zQ4d) | moves a Storj object to another location in Storj            |
| [](docId:Wo5-shT0hZDNMeyM1kA12) | remove a bucket                                                  |
| [](docId:eavv_906IH-39ylIXq30d) | remove a file from a Storj bucket                                |
| [](docId:OuoKJl9KqbJVQB9Xkdy3g) | create an uplink config file                                     |
| [](docId:tBnCSrmR1jbOewG38fIr4) | shares restricted access to objects                              |

## Global flags

| Flag                  | Description                                     |
| :-------------------- | :---------------------------------------------- |
| `-h, --help`          | prints help for the command                     |
| `--summary`           | prints a summary of what commands are available |
| `--advanced`          | if used in with `-h`, print advanced flags help |
| `--config-dir string` | main directory for uplink configuration         |

## Advanced global flags

You can see them with the `uplink <command> --help --advanced` command.

| Global flags                  | Description                                                                   |
| :---------------------------- | :-----------------------------------------------------------------------------|
| `--interactive`               | Controls if interactive input is allowed                                      |
| `--config-dir string`         | Directory that stores the configuration                                       |
| `--legacy-config-dir string`  | Directory that stores legacy configuration. Only used during migration        |
| `--trace-id int64`            | Specify a trace id manually. This should be globally unique. Usually you      |
|                               | don't need to set it, and it will be automatically generated.                 |
| `--trace-sample float64`      | The chance (between 0 and 1.0) to report tracing information. Set to 1 to     |
|                               | always send it.                                                               |
| `--trace-verbose bool`        | Flag to print out used trace ID                                               |
| `--trace-addr string`         | Specify where to send traces                                                  |
| `--trace-tags`                | comma separated k=v pairs to be added to distributed traces                   |
| `--events-addr string`        | Specify where to send events                                                  |
| `--debug-pprof string`        | File to collect Golang pprof profiling data                                   |
| `--debug-monkit-trace string` | File to collect Monkit trace data. Understands file extensions .json and .svg |
| `--debug-monkit-stats string` | File to collect Monkit stats                                                  |
| `--analytics`                 | Whether to send usage information to Storj                                    |
| `--help`, `-h`                | prints help for the command                                                   |
| `--summary`                   | prints a summary of what commands are available                               |
| `--advanced`                  | when used with -h, prints advanced flags help                                 |
