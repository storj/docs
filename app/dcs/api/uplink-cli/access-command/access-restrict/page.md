---
title: access restrict
docId: jWrIx32jqwp0r45vQcodH
redirects:
  - /dcs/api-reference/uplink-cli/access-command/access-restrict
---

This command allows you to create a restricted Access Grant and print it to `stdout`, export it to a file or import it as an access to the local store of Uplink.

## Usage

{% code-group %}

```windows
./uplink.exe access restrict [flags]
```

```linux
uplink access restrict [flags]
```

```macos
uplink access restrict [flags]
```

{% /code-group %}

## Flags

| Flag                         | Description                                                                                                                                                   |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--access string`            | Access name or value to restrict                                                                                                                              |
| `--import-as string`         | Import the access as this name                                                                                                                                |
| `--export-to string`         | Export the access to this file path                                                                                                                           |
| `-f, --force`                | Force overwrite an existing saved access                                                                                                                      |
| `--use`                      | Switch the default access to the newly created one                                                                                                            |
| `--prefix SharePrefix`       | Key prefix access will be restricted to this prefix.You can optionally specify this flag several times to add several different prefixes to the access grant. |
| `--readonly`                 | Implies `--disallow-writes` and `--disallow-deletes` (default true)                                                                                           |
| `--writeonly`                | Implies `--disallow-reads` and `--disallow-lists`                                                                                                             |
| `--disallow-deletes`         | Disallow deletes with the access                                                                                                                              |
| `--disallow-lists`           | Disallow lists with the access                                                                                                                                |
| `--disallow-reads`           | Disallow reads with the access                                                                                                                                |
| `--disallow-writes`          | Disallow writes with the access                                                                                                                               |
| `--not-before relative_date` | Disallow access before this time (e.g. '+2h', 'now', '2020-01-02T15:04:05Z0700')                                                                              |
| `--not-after relative_date`  | Disallow access after this time (e.g. '+2h', 'now', '2020-01-02T15:04:05Z0700')                                                                               |

## Global flags

| Global flags          | Description                                   |
| :-------------------- | :-------------------------------------------- |
| `--config-dir string` | Directory that stores the configuration       |
| `--help`, `-h`        | prints help for the command                   |
| `--advanced`          | when used with -h, prints advanced flags help |

## Examples

### Create a restricted Access Grant

As result, it will print the created access grant to `stdout`. Since we did not specify any restrictions, only the defaults will be applied. This command will print an Access Grant with read only access:

{% code-group %}

```windows
./uplink.exe access restrict
```

```linux
uplink access restrict
```

```macos
uplink access restrict
```

{% /code-group %}

```Text
18yMsZpg6ZQdz........
```

### Create a restricted Access Grant and export it to the file

This will export the restricted access grant to a file named "access.txt":

{% code-group %}

```windows
./uplink.exe access restrict --not-after +1h --export-to access.txt
```

```linux
uplink access restrict --not-after +1h --export-to access.txt
```

```macos
uplink access restrict --not-after +1h --export-to access.txt
```

{% /code-group %}

```Text
Exported access to: /home/user/access.txt
```

### Create a restricted Access Grant and import it to Uplink

This will import the write only restricted access grant to Uplink as a named access:

{% code-group %}

```windows
./uplink.exe access restrict --access us1 --writeonly --import-as us1-wo
```

```linux
uplink access restrict --access us1 --writeonly --import-as us1-wo
```

```macos
uplink access restrict --access us1 --writeonly --import-as us1-wo
```

{% /code-group %}

```Text
Imported access "us1-wo" to "/home/user/.config/storj/uplink/access.json"
17UjiCX.....
```

### Create a restricted Access Grant and replace the existing access

This will import the restricted access grant to Uplink as a named access and replace it if one existed already:

{% code-group %}

```windows
./uplink.exe access restrict --import-as us1-ro --force
```

```linux
uplink access restrict --import-as us1-ro --force
```

```macos
uplink access restrict --import-as us1-ro --force
```

{% /code-group %}

```Text
Imported access "us1-ro" to "/home/user/.config/storj/uplink/access.json"
19jihX...
```

### Create a restricted Access Grant for several prefixes

This will create the restricted access grant for several prefixes:

{% code-group %}

```windows
./uplink.exe access restrict --prefix sj://cakes/New-York --prefix sj://pies
```

```linux
uplink access restrict --prefix sj://cakes/New-York --prefix sj://pies
```

```macos
uplink access restrict  --prefix sj://cakes/New-York --prefix sj://pies
```

{% /code-group %}

```Text
16Xng...
```
