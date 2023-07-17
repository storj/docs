---
title: access create
slug: api-reference/uplink-cli/access-command/access-create
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:01:10.000Z
---

This command allow you to create and print the Access Grant to `stdout`, export it to a file or import it as an access to Uplink.

## Usage

{% code-group %}
```windows
./uplink.exe access create [flags]
```

```macos
uplink access create [flags]
```

```linux
uplink access create [flags]
```
{% /code-group %}

## Flags

| Flag                         | Description                                                                        |
| :--------------------------- | :--------------------------------------------------------------------------------- |
| `--passphrase-stdin`         | If set, the passphrase is read from `stdin`, and all other values must be provided |
| `--satellite-address string` | Satellite address from satellite UI (prompted if unspecified)                      |
| `--api-key string`           | API key from satellite UI (prompted if unspecified)                                |
| `--import-as string`         | Import the access as this name                                                     |
| `--export-to string`         | Export the access to this file path                                                |
| `-f, --force`                | Force overwrite an existing saved access                                           |
| `--use`                      | Switch the default access to the newly created one                                 |

## Global flags

| Global flags          | Description                                   |
| :-------------------- | :---------------------------------------docId: x0Ej1E9_xq9xXFaSvyPTT
----- |
| `--config-dir string` | Directory that stores the configuration       |
| `--help`, `-h`        | prints help for the command                   |
| `--advanced`          | when used with -h, prints advanced flags help |

## Examples

### Create an Access Grant without prompts

As result it will print the created access grant to `stdout`.

{% code-group %}
```windows
./uplink.exe access create --export-to access.txt
```

```macos
uplink access create --export-to access.txt
```

```linux
uplink access create --export-to access.txt
```
{% /code-group %}

```Text
18yMsZpg6ZQdz........
```

### Create an Access Grant and export to the file

You will export the created access grant to the file.

{% code-group %}
```windows
./uplink.exe access create --export-to access.txt
```

```macos
uplink access create --export-to access.txt
```

```linux
uplink access create --export-to access.txt
```
{% /code-group %}

```Text
Exported access to: /home/user/access.txt
```

### Create an Access Grant and import it to Uplink

You will import the created access grant to Uplink as a named access.

{% code-group %}
```windows
./uplink.exe access create --import-as us2
```

```macos
uplink access create --import-as us2
```

```linux
uplink access create --import-as us2
```
{% /code-group %}

```Text
Imported access "us2" to "/home/user/.config/storj/uplink/access.json"
```

### Create an Access Grant and replace the existing access

You will import the created access grant to uplink as a named access and replace it if it exists.

{% code-group %}
```windows
./uplink.exe access create --import-as us2 --force
```

```macos
uplink access create --import-as us2 --force
```

```linux
uplink access create --import-as us2 --force
```
{% /code-group %}

```Text
Imported access "us2" to "/home/user/.config/storj/uplink/access.json"
```

