---
title: mv
docId: PIfV271UghKvJecT-zQ4d
redirects:
  - /dcs/api-reference/uplink-cli/mv
---

Moves a Storj object to another location in Storj

## Usage

{% code-group %}

```windows
./uplink.exe mv SOURCE DESTINATION [flags]
```

```linux
uplink mv SOURCE DESTINATION [flags]
```

```macos
uplink mv SOURCE DESTINATION [flags]
```

{% /code-group %}

The `mv` command is used to move or rename objects within the same Storj project. The `mv` command uses a server-side move (rename) method, it does not incur a fee for downloading and will be performed with no delay.

## Flags

| Flag                    | Description                                                       |
| :---------------------- | :---------------------------------------------------------------- |
| `--access string`       | the serialized access, or name of the access to use               |
| `-r, --recursive`       | Move all objects or files under the specified prefix or directory |
| `-p, --parallelism int` | Controls how many objects will be moved in parallel (default 1)   |
| `--dryrun`              | Print what operations would happen but don't execute them         |
| `--progress`            | Show a progress bar when possible (default true)                  |
| `--help`, `-h`          | help for mv                                                       |

## Global Flags

| Flag                  | Description                                                                         |
| :-------------------- | :---------------------------------------------------------------------------------- |
| `--config-dir string` | Directory that stores the configuration (default "/home/user/.config/storj/uplink") |
| `--summary`           | prints a summary of what commands are available                                     |
| `--advanced`          | when used with -h, prints advanced flags help                                       |

## Examples

### Move an object within an existing bucket

When the `mv` command is used to move a file within Storj, the CLI will move (rename) the object using the server-side method to rename the object.

To move `cheesecake.jpg` within the existing bucket `cakes`, use the following command:

{% code-group %}

```windows
./uplink.exe mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```

```linux
uplink mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```

```macos
uplink mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```

{% /code-group %}

{% callout type="info"  %}
You cannot use pattern expressions to specify which files to copy (e.g. `uplink mv sj://cakes/cheese* sj://cakes/New-York/` will not work). Also, you can only specify one source at a time.
{% /callout %}

Sample Output:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/fn1JZRT4fFBmNXrzIoBNU_output.png)

### Move an object from a one bucket to another

When the `mv` command is used to move an object from one Storj bucket to another Storj bucket, the CLI will use a server-side move method.

To create a new bucket, we will use the `mb` command, as a move is possible only to an existing bucket.

{% code-group %}

```windows
./uplink.exe mb sj://new-recipes
```

```linux
uplink mb sj://new-recipes
```

```macos
uplink mb sj://new-recipes
```

{% /code-group %}

```powershell
Bucket new-recipes created
```

{% callout type="info"  %}
Nested buckets are not supported, but you can use prefixes, as they would act almost like subfolders.
{% /callout %}

To move an object from one bucket to another, use:

{% code-group %}

```windows
./uplink.exe mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```

```linux
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```

```macos
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```

{% /code-group %}

Sample Output:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/20_CzBv8l7lU3s83u0GVS_output2.png)

## Troubleshooting move errors

### ERROR: duplicate key value violates unique constraint "primary" (SQLSTATE 23505)

```Text
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg



Error: uplink: metaclient: metabase: unable to update object: ERROR: duplicate key value violates unique constraint "primary" (SQLSTATE 23505)
```

This error means that the destination object already exists. You should either use a different destination name/prefix or remove the existing object from the destination.

{% callout type="info"  %}
To remove an object, use the [](docId:eavv_906IH-39ylIXq30d) command.
{% /callout %}
