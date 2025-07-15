---
title: access import
docId: 9MIN1usU8WPUY2212Y-_S
redirects:
  - /dcs/api-reference/uplink-cli/access-command/access-import
---

This command allows you to import the Access Grant to Uplink.

## Usage

{% code-group %}

```windows
./uplink.exe access import [flags] <name> <access|filename>
```

```macos
uplink access import [flags] <name> <access|filename>
```

```linux
uplink access import [flags] <name> <access|filename>
```

{% /code-group %}

## Arguments

| Argument             | Description                                  |
| :------------------- | :------------------------------------------- |
| `<name>`             | Name to save the access as                   |
| `<access\|filename>` | Serialized access value or file path to save |

## Flags

| Flag          | Description                                        |
| :------------ | :------------------------------------------------- |
| `-f, --force` | Force overwrite an existing saved access           |
| `--use`       | Switch the default access to the newly created one |

## Global flags

| Global flags          | Description                                   |
| :-------------------- | :-------------------------------------------- |
| `--config-dir string` | Directory that stores the configuration       |
| `--help`, `-h`        | prints help for the command                   |
| `--advanced`          | when used with -h, prints advanced flags help |

## Examples

Please [](docId:b4-QgUOxVHDHSIWpAf3hG) or [](docId:OXSINcFRuVMBacPvswwNU) before proceeding.

### Import Access Grant from the file

Save the created Access Grant to the file `access.txt`. As result, this command will import the Access Grant from the file to the access with the specified name into Uplink.

{% code-group %}

```windows
./uplink.exe access import main access.txt
```

```macos
uplink access import main access.txt
```

```linux
uplink access import main access.txt
```

{% /code-group %}

```Text
Imported access "main" to "/home/user/.config/storj/uplink/access.json"
```

### Import Access Grant from the console

As result, the Access Grant will be imported from the console to the access with the specified name.

{% code-group %}

```windows
./uplink.exe access import main 18fglgkoitmfvkogmoitr....
```

```linux
uplink access import main 18fglgkoitmfvkogmoitr....
```

```macos
uplink access import main 18fglgkoitmfvkogmoitr....
```

{% /code-group %}

```Text
Imported access "main" to "/home/user/.config/storj/uplink/access.json"
```

### Import Access Grant and replace the existing access

You will import the created access grant to uplink as a named access

{% code-group %}

```windows
./uplink.exe access import main access.txt --force
```

```linux
uplink access import main access.txt --force
```

```macos
uplink access import main access.txt --force
```

{% /code-group %}

```Text
Imported access "main" to "/home/user/.config/storj/uplink/access.json
```
