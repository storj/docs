---
title: access
docId: ObsfiEHKpVU7JTdGtW-3t
redirects:
  - api-reference/uplink-cli/access-command
---

Set of commands to manage accesses.

## Usage

{% code-group %}

```windows
./uplink.exe access [command]
```

```macos
uplink access [command]
```

```linux
uplink access [command]
```

{% /code-group %}

## Child commands

| Command                         | Description                                                                          |
| :------------------------------ | :----------------------------------------------------------------------------------- |
| [](docId:x0Ej1E9_xq9xXFaSvyPTT) | Create an access from a setup token. `uplink setup` is an alias for this.            |
| [](docId:3MZxftia7vLWYDOom-hrY) | Export an access to a file                                                           |
| [](docId:9MIN1usU8WPUY2212Y-_S) | Save an existing access. `uplink import` is an alias for this.                       |
| [](docId:-2V4QD-Wl-oYac7laROm7) | Inspect allows you to expand a serialized access into its constituent parts          |
| [](docId:8ROAZiLnev7X-CP9A_DQF) | Prints name and associated satellite of all available accesses                       |
| [](docId:6hH_ygAn1FJdrIZQ0CGsJ) | Register an access grant for use with a hosted S3 compatible gateway and linksharing |
| [](docId:gQIzU008qGSvybusLZ7ms) | Removes an access from local store                                                   |
| [](docId:jWrIx32jqwp0r45vQcodH) | Restrict an access                                                                   |
| [](docId:FOOspY9cvBKTA7OsETEz4) | Revoke an access                                                                     |
| [](docId:d-btqElDJY9m26QIKJYP-) | Set default access to use                                                            |

## Flags

| Flag           | Description     |
| :------------- | :-------------- |
| `--help`, `-h` | help for access |
