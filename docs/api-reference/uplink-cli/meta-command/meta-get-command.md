# meta get

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe meta get [KEY] PATH [flags]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink meta get [KEY] PATH [flags]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink meta get [KEY] PATH [flags]
```
{% endtab %}
{% endtabs %}

## Flags

| Flag              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `--access string` | the serialized access, or name of the access to use |
| `--help`, `-h`    | help for get                                        |

### Retrieve all metadata of an object

Suppose you have uploaded your object with metadata using this command:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp cheesecake.jpg sj://cakes --metadata '{\"baker\":\"cheeseman\", "\pictur
e-author\": "\picman\"}'
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp cheesecake.jpg sj://cakes --metadata '{"baker":"cheeseman", "pictur
e-author": "picman"}'
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp cheesecake.jpg sj://cakes --metadata '{"baker":"cheeseman", "pictur
e-author": "picman"}'
```
{% endtab %}
{% endtabs %}

Retrieving all metadata defined for object `sj://cakes/cheesecake.jpg`  is done with:

{% tabs %}
{% tab title=" Windows" %}
```
./uplink.exe meta get sj://cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="Linux" %}
```
uplink meta get sj://cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="macOS" %}
```
uplink meta get sj://cakes/cheesecake.jpg
```
{% endtab %}
{% endtabs %}

![](../../../.gitbook/assets/meta-get.png)

### Query for a specific key in metadata

You can retrieve the value of key `baker` for object `sj://cakes/cheesecake.jpg` using:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe meta get baker sj://cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="Linux" %}
```
uplink meta get baker sj://cakes/cheesecake.jpg
```
{% endtab %}

{% tab title="macOS" %}
```
uplink meta get baker sj://cakes/cheesecake.jpg
```
{% endtab %}
{% endtabs %}

![](../../../.gitbook/assets/meta-get-key.png)

{% hint style="info" %}
Querying for a non-existent key will raise an error.
{% endhint %}
