---
description: Moves a Storj object to another location in Storj DCS
---

# mv

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe mv SOURCE DESTINATION [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink mv SOURCE DESTINATION [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink mv SOURCE DESTINATION [flags]
```
{% endtab %}
{% endtabs %}

The `mv` command is used to move or rename objects within the same Storj DCS project. The `mv` command uses a server-side move (rename) method, it does not incur a fee for downloading and will be performed with no delay.

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for mv                                         |

## Examples

### Move an object within an existing bucket

When the `mv` command is used to move a file within Storj DCS, the CLI will move (rename) the object using the server-side method to rename the object.

To move `cheesecake.jpg` within the existing bucket `cakes`, use the following command:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```
{% endtab %}

{% tab title="Linux" %}
```
uplink mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```
{% endtab %}

{% tab title="macOS" %}
```
uplink mv sj://cakes/cheesecake.jpg sj://cakes/New-York/cheesecake.jpg
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
You cannot use regular expressions to specify which files to copy (e.g. `uplink mv sj://cakes/cheese* sj://cakes/New-York/` will not work). Also, you can only specify one source at a time (no ~~`uplink mv sj://cakes/cheesecake.jpg sj://cakes/cheesecake2.png sj://cakes`~~)
{% endhint %}

Sample Output:

![](<../../.gitbook/assets/image (127) (1) (1).png>)

### Move an object from a one bucket to another

When the `mv` command is used to move an object from one Storj DCS bucket to another Storj DCS bucket, the CLI will use a server-side move method.

To create a new bucket, we will use the `mb` command, as a move is possible only to an existing bucket.

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe mb sj://new-recipes
```
{% endtab %}

{% tab title="Linux" %}
```
uplink mb sj://new-recipes
```
{% endtab %}

{% tab title="macOS" %}
```
uplink mb sj://new-recipes
```
{% endtab %}
{% endtabs %}

```powershell
Bucket new-recipes created
```

{% hint style="info" %}
Nested buckets are not supported, but you can use prefixes, as they would act almost like subfolders.
{% endhint %}

To move an object from one bucket to another, use:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="Linux" %}
```
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="macOS" %}
```
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```
{% endtab %}
{% endtabs %}

Sample Output:

![](<../../.gitbook/assets/image (129) (1) (1).png>)

## Troubleshooting move errors

### ERROR: duplicate key value violates unique constraint "primary" (SQLSTATE 23505)

```
uplink mv sj://cakes/New-York/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg



Error: uplink: metaclient: metabase: unable to update object: ERROR: duplicate key value violates unique constraint "primary" (SQLSTATE 23505)
```

This error means that the destination object already exists. You should either use a different destination name/prefix or remove the existing object from the destination.

{% hint style="info" %}
To remove an object, use the [`uplink rm`](rm-command.md) command.
{% endhint %}
