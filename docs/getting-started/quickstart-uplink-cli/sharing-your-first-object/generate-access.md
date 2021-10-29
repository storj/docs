# Create an Access to an Object

There are two ways to share access to an object:

* by [link sharing](../../../api-reference/uplink-cli/share-command.md#link-sharing)
* by [importing](import-access.md) the access using uplink CLI

In both cases, you can create an access using the `uplink share` command. For example:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share sj://cakes/cheesecake.jpg --export-to cheesecake.access
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share sj://cakes/cheesecake.jpg --export-to cheesecake.access
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share sj://cakes/cheesecake.jpg --export-to cheesecake.access
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
An access generated using `uplink share` with no arguments creates an access to your **entire project** with read permissions.
{% endhint %}

The `--export-to` flag is used to export the access to a file. This gives the following output:

```
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Disallowed
Lists     : Allowed
Deletes   : Disallowed
NotBefore : No restriction
NotAfter  : No restriction
Paths     : sj://cakes/cheesecake.jpg
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 12yUGNqdsKX1Xky2qVoGwdpL...
Exported to: cheesecake.access
```

## Restrictions

The `--readonly`flag prevents all write operations (delete and write). Similarly, the `--writeonly` flag prevents all read operations (read and list).&#x20;

By default, the access is a read-only. To give full permissions, use`--readonly=false`

You may also indicate the duration of access with a start and end time.

The list of all restrictions can be found [here](../../../api-reference/uplink-cli/share-command.md#flags).\
Example:&#x20;

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe share --readonly=false --not-before=+2h --not-after=+10h sj://cakes/
```
{% endtab %}

{% tab title="Linux" %}
```
uplink share --readonly=false --not-before=+2h --not-after=+10h sj://cakes/
```
{% endtab %}

{% tab title="macOS" %}
```
uplink share --readonly=false --not-before=+2h --not-after=+10h sj://cakes/
```
{% endtab %}
{% endtabs %}

```
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Allowed
Lists     : Allowed
Deletes   : Allowed
NotBefore : 2021-04-17 17:22:39
NotAfter  : 2021-04-18 01:22:39
Paths     : sj://cakes/ (entire bucket)
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 123qSBBgSUSqwUdbJ6n4bxLM...
```

{% hint style="info" %}
See the [Uplink CLI `share` command reference](../../../api-reference/uplink-cli/share-command.md) for more actions
{% endhint %}
