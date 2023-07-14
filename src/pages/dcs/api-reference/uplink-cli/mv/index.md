---
title: mv
slug: api-reference/uplink-cli/mv
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:03:47.000Z
---

Moves a Storj object to another location in Storj DCS

## Usage

:::codeblocktabs
```windows
./uplink.exe mv SOURCE DESTINATION [flags]
```

```linux
uplink mv SOURCE DESTINATION [flags]
```

```macos
uplink mv SOURCE DESTINATION [flags]
```
:::

The `mv` command is used to move or rename objects within the same Storj DCS project. The `mv` command uses a server-side move (rename) method, it does not incur a fee for downloading and will be performed with no delay.

## Flags

| Flag              | Description                                         |
| :---------------- | :---------------------------------------------docId: PIfV271UghKvJecT-zQ4d
----- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for mv                                         |

## Examples

## Move an object within an existing bucket

When the `mv` command is used to move a file within Storj DCS, the CLI will move (rename) the object using the server-side method to rename the object.

To move `cheesecake.jpg` within the existing bucket `cakes`, use the following command:

:::codeblocktabs
```windows
./uplink.exe mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```

```linux
uplink mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```

```macos
uplink mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```
:::

:::hint{type="info"}
You cannot use pattern expressions to specify which files to copy (e.g. `uplink mv sj://cakes/cheese* sj://cakes/New-York/` will not work). Also, you can only specify one source at a time.
:::

Sample Output:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/fn1JZRT4fFBmNXrzIoBNU_output.png)

### Move an object from a one bucket to another

When the `mv` command is used to move an object from one Storj DCS bucket to another Storj DCS bucket, the CLI will use a server-side move method.

To create a new bucket, we will use the `mb` command, as a move is possible only to an existing bucket.

:::codeblocktabs
```windows
./uplink.exe mb sj://new-recipes
```

```linux
uplink mb sj://new-recipes
```

```macos
uplink mb sj://new-recipes
```
:::

```powershell
Bucket new-recipes created
```

:::hint{type="info"}
Nested buckets are not supported, but you can use prefixes, as they would act almost like subfolders.
:::

To move an object from one bucket to another, use:

:::codeblocktabs
```windows
./uplink.exe mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```

```linux
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```

```macos
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```
:::

Sample Output:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/20_CzBv8l7lU3s83u0GVS_output2.png)

## Troubleshooting move errors

### ERROR: duplicate key value violates unique constraint "primary" (SQLSTATE 23505)

```Text
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg



Error: uplink: metaclient: metabase: unable to update object: ERROR: duplicate key value violates unique constraint "primary" (SQLSTATE 23505)
```

This error means that the destination object already exists. You should either use a different destination name/prefix or remove the existing object from the destination.

:::hint{type="info"}
To remove an object, use the [](docId\:eavv_906IH-39ylIXq30d)  command.
:::

