---
description: List objects and prefixes or all buckets
---

# ls

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe ls [sj://BUCKET[/PREFIX]] [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink ls [sj://BUCKET[/PREFIX]] [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink ls [sj://BUCKET[/PREFIX]] [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag                | Description                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `--access string`   | the serialized access, or name of the access to use                                                |
| `--encrypted`       | if true, show paths as base64-encoded encrypted paths                                              |
| `--expanded`, `-x`  | Use expanded output, showing object expiration times and whether there is custom metadata attached |
| `--help`, `-h`      | help for ls                                                                                        |
| `--pending`         | if true, list incomplete objects instead                                                           |
| `--recursive`, `-r` | if true, list recursively                                                                          |

## Examples

_We consider the following object hierarchy throughout these examples:_

![](../../.gitbook/assets/ls-example-hierarchy2.png)

_We assume the `cakes/very-secret-recipe.txt` object has been uploaded using a different encryption key than the other objects in the project._

### List buckets

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe ls
```
{% endtab %}

{% tab title="Linux" %}
```
uplink ls
```
{% endtab %}

{% tab title="macOS" %}
```
uplink ls
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/ls-project.png)

### List objects in a bucket

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe ls sj://images
```
{% endtab %}

{% tab title="Linux" %}
```
uplink ls sj://images
```
{% endtab %}

{% tab title="macOS" %}
```
uplink ls sj://images
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/ls-bucket.png)

### List by prefix

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe ls sj://images/cakes
```
{% endtab %}

{% tab title="Linux" %}
```
uplink ls sj://images/cakes
```
{% endtab %}

{% tab title="macOS" %}
```
uplink ls sj://images/cakes
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/ls-prefix.png)

### List recursively

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe ls --recursive 
```
{% endtab %}

{% tab title="Linux" %}
```
uplink ls --recursive 
```
{% endtab %}

{% tab title="macOS" %}
```
uplink ls --recursive 
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/ls-example-hierarchy3.png)

### List encrypted paths of all objects in a bucket

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe ls sj://recipes --encrypted --recursive
```
{% endtab %}

{% tab title="Linux" %}
```
uplink ls sj://recipes --encrypted
```
{% endtab %}

{% tab title="macOS" %}
```
uplink ls sj://recipes --encrypted
```
{% endtab %}
{% endtabs %}

![](../../.gitbook/assets/ls-encrypted.png)

Notice that since `sj://recipes/cakes/very-secret-recipe.txt` was encrypted with a different key, we cannot view it using regular ls and the default access, but with `--encrypted` we can see that it is indeed stored in sj://recipes
