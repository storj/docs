---
title: access use
slug: api-reference/uplink-cli/access-command/access-use
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:02:51.000Z
---

This command allows you to switch the current access for Uplink.

## Usage

{% code-group %}
```windows
./uplink.exe access use <access>
```

```linux
uplink access use <access>
```

```macos
uplink access use <access>
```
{% /code-group %}

## Arguments

| Argument   | Description        |
| :--------- | :----------------- |
| `<access>` | Access name to use |

## Global flags

| Global flags          | Description                                   |
| :-------------------- | :---------------------------------------docId: d-btqElDJY9m26QIKJYP-
----- |
| `--config-dir string` | Directory that stores the configuration       |
| `--help`, `-h`        | prints help for the command                   |
| `--advanced`          | when used with -h, prints advanced flags help |

## Example

You need to have more than one accesses in the local store of Uplink before proceeding. See[](docId\:x0Ej1E9_xq9xXFaSvyPTT),[](docId:9MIN1usU8WPUY2212Y-_S), and [](docId\:OuoKJl9KqbJVQB9Xkdy3g) commands for information how to create/import/setup an access.

{% code-group %}
```windows
./uplink.exe access use us1
```

```linux
uplink access use us1
```

```macos
uplink access use us1
```
{% /code-group %}

```none
Switched default access to "us1"
```

