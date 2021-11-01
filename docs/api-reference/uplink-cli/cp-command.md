---
description: Copies a local file or Storj object to another location locally or in Storj
---

# cp

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp SOURCE DESTINATION [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp SOURCE DESTINATION [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp SOURCE DESTINATION [flags]
```
{% endtab %}
{% endtabs %}

The `cp` command is used to upload and download objects. The `cp` command abstracts the complexity of encryption, erasure coding, and distributing pieces of a file to storage nodes.

## Flags

| Flag                | Description                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `--access string`   | the serialized access, or name of the access to use                                                          |
| `--expires string`  | <p>optional expiration date of an object. <br>Please use format (<code>yyyy-mm-ddThh:mm:ssZhh:mm</code>)</p> |
| `--help`, `-h`      | help for cp                                                                                                  |
| `--metadata string` | optional metadata for the object. Please use a single level JSON object of string to string only             |
| `--parallelism int` | controls how many parallel uploads/downloads of a single object will be performed (default 1)                |
| `--progress`        | if true, show progress (default true)                                                                        |

## Examples

### Copy a local file into an existing bucket

When the `cp` command is used to copy a file to Storj DCS (upload), the CLI first encrypts the file client-side, then splits it into a minimum of x erasure-coded pieces, and finally, the x pieces are uploaded in parallel to x different storage nodes. x currently equals 80 but is subject to change depending on continuous optimization.&#x20;

To copy `cheesecake.jpg` into the existing bucket `cakes`, use the following command:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp cheesecake.jpg sj://cakes 
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp cheesecake.jpg sj://cakes
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp cheesecake.jpg sj://cakes
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
You cannot use regular expressions to specify which files to copy (e.g. `uplink cp cheese* sj://cakes` will not work). Also, you can only specify one source at a time (no ~~`uplink cp cheesecake.jpg cheesecake.png sj://cakes`~~)
{% endhint %}

Output:

![](../../.gitbook/assets/upload\_file.png)

### Copy a file from a bucket to a local drive

When the `cp` command is used to copy a file from Storj DCS (download), the CLI first downloads the minimum number of pieces to reconstitute a file (typically 29 pieces), then re-encodes the pieces into a single file, and finally decrypts the file client-side.&#x20;

To copy a file from a project to a local drive, use:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp sj://cakes/cheesecake.jpg ~/Downloads/
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp sj://cakes/cheesecake.jpg ~/Downloads/
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp sj://cakes/cheesecake.jpg ~/Downloads/
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/download\_object.png)

### Copy a local file into a bucket with an expiration date

The uploaded object can be set to expire at a certain time. After the expiration date, the file is no longer available and no longer will generate usage charges. To set an expiration date for a file when uploading it, you should use the `cp` command with the `--expires` flag:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp cheesecake.jpg --expires 2021-12-31T13:00:00+02:00 sj://cakes
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp cheesecake.jpg --expires 2021-12-31T13:00:00+02:00 sj://cakes
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp cheesecake.jpg --expires 2021-12-31T13:00:00+02:00 sj://cakes
```
{% endtab %}
{% endtabs %}

The date is given in the `yyyy-mm-ddThh:mm:ssZhh:mm` format defined in ISO 8601.  `2021-12-31T13:00:00+02:00` reads "December, 31st at 1pm UTC+2". A date ending with "Z", such as `2021-12-31T13:00:00Z`, is in UTC.

The command above gives the following output:

![](../../.gitbook/assets/upload\_file.png)

### Copy an object with parallelism

If you have enough upstream bandwidth you can use the multipart functionality to upload object faster.

To increase upload speed you can use the `cp` command with the `--parallelism 10`  flag (the number you can set accordingly your preferences and available upstream bandwidth):

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp cheesecake.jpg sj://cakes --parallelism 10
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp cheesecake.jpg sj://cakes --parallelism 10
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp cheesecake.jpg sj://cakes --parallelism 10
```
{% endtab %}
{% endtabs %}

Since our sample object is small, you likely will not notice a difference.

![](../../.gitbook/assets/upload\_file.png)

It would be significant different with the big objects, like videos or OS images, etc. and upstream bandwidth much more than 100Mbps.

### Copy an object from the one location to another on Storj

It is possible to copy a file from one Storj DCS location to another Storj DCS location within the same project.

When the `cp` command is used to copy a file from the one Storj DCS location to another Storj DCS location, the CLI will **download** the object from the previous location and **upload** it to a new location.

{% hint style="warning" %}
The download will use your egress limits. You can be charged for egress traffic accordingly your [tariff plan](broken-reference).
{% endhint %}

To create a new bucket we will use the `mb` command, the copy is possible only to the existing bucket.

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
Nested buckets are not supported, but you can use prefixes, they would act almost as subfolders.
{% endhint %}

To copy a file from a project to another bucket in the same project and with prefix `cakes`, use:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp sj://cakes/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp sj://cakes/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp sj://cakes/cheesecake.jpg sj://new-recipes/cakes/cheesecake.jpg
```
{% endtab %}
{% endtabs %}

![](<../../.gitbook/assets/image (124).png>)

### Copy a file to a bucket with metadata

You can include metadata when uploading your file using the --metadata flag. These metadata are provided in JSON format.&#x20;

{% hint style="info" %}
You must use a single level JSON object of **string to string** only (e.g. '{"key1":"value1",  "key2": "value2"'}
{% endhint %}

For example, to include information about the baker of a cheesecake and the author of the photo:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp cheesecake.jpg sj://cakes --metadata '{\"baker\":\"cheeseman\", \"picture_author\": \"picman\"}'
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp cheesecake.jpg sj://cakes --metadata '{"baker":"cheeseman", "picture_author": "picman"}'
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp cheesecake.jpg sj://cakes --metadata '{"baker":"cheeseman", "picture_author": "picman"}'
```
{% endtab %}
{% endtabs %}

You can retrieve these metadata using the [`meta get` command.](meta-command/meta-get-command.md)
