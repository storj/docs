---
title: access remove
slug: api-reference/uplink-cli/access-command/access-remove
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:01:49.000Z
docId: gQIzU008qGSvybusLZ7ms
---

This command allows you to remove the access from local store of Uplink.

## Usage

{% code-group %}
```windows
./uplink.exe access remove <name>
```

```linux
uplink access remove <name>
```

```macos
uplink access remove <name>
```
{% /code-group %}

## Arguments

| Argument | Description           |
| :------- | :-------------------- |
| `<name>` | Access name to delete |

## Global flags

| Global flags          | Description                                   |
| :-------------------- | :-------------------------------------------- |
| `--config-dir string` | Directory that stores the configuration       |
| `--help`, `-h`        | prints help for the command                   |
| `--advanced`          | when used with -h, prints advanced flags help |

## Example

You need to have an access in the local store of Uplink before proceeding. See [](docId\:x0Ej1E9_xq9xXFaSvyPTT),[](docId:9MIN1usU8WPUY2212Y-_S), and [](docId\:OuoKJl9KqbJVQB9Xkdy3g)  commands for information how to create/import/setup an access.

{% callout type="info"  %} 
If you want to remove the current access, you need to switch to another before proceeding, using the [](docId\:d-btqElDJY9m26QIKJYP-) command.
{% /callout %}

{% code-group %}
```windows
./uplink.exe access remove us2
```

```linux
uplink access remove us2
```

```macos
uplink access remove us2
```
{% /code-group %}

```Text
Removed access "us2" from "/home/user/.config/storj/uplink/access.json"
```

