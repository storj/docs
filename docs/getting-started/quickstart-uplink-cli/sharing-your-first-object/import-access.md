# Import an Access to an Object

Importing an access is done using the `import` command.

### Import from the file

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe import cheesecake cheesecake.access
```
{% endtab %}

{% tab title="Linux" %}
```
uplink import cheesecake ~/cheesecake.access
```
{% endtab %}

{% tab title="macOS" %}
```
uplink import cheesecake ~/cheesecake.access
```
{% endtab %}
{% endtabs %}

This should give you the following output:

![](../../../.gitbook/assets/access-import.png)

### Import from the input

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe import cheesecake 14dfgh....qr
```
{% endtab %}

{% tab title="Linux" %}
```
uplink import cheesecake 14dfgh....qr
```
{% endtab %}

{% tab title="macOS" %}
```
uplink import cheesecake 14dfgh....qr
```
{% endtab %}
{% endtabs %}

### Import from the input to the default access

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe import 14dfgh....qr
```
{% endtab %}

{% tab title="Linux" %}
```
uplink import 14dfgh....qr
```
{% endtab %}

{% tab title="macOS" %}
```
uplink import 14dfgh....qr
```
{% endtab %}
{% endtabs %}

### Check list of Access grants

You can list your available accesses using:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access list
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access list
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access list
```
{% endtab %}
{% endtabs %}

```
=========== ACCESSES LIST: name / satellite ================================
cheesecake / 12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us1.storj.io:7777
pumpkin-pie / 12L9ZFwhzVpuEKMUNUqkaTLGzwY9G24tbiigLiXpmZWKwmcNDDs@eu1.storj.io:7777
tarte / 121RTSDpyNZVcEU84Ticf2L1ntiuUimbWgfATz21tuvgk3vzoA6@ap1.storj.io:7777
```

To get more information on an access use the `inspect` command:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access inspect cheesecake
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access inspect cheesecake
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access inspect cheesecake
```
{% endtab %}
{% endtabs %}

```
{
  "satellite_addr": "12EayRS2V1kEsWESU9QMRseFhdxYxKicsiFmxrsLZHeLUtdps3S@us1.storj.io:7777",
  "encryption_access": {
    "default_path_cipher": "ENC_AESGCM"
  },
  "api_key": "...",
  "macaroon": {
    "head": "...",
    "caveats": [
      {
        "not_after": "2021-04-17T00:00:00Z",
        "not_before": "2021-04-18T00:00:00Z",
        "nonce": "..."
      }
    ],
    "tail": "..."
  }
}
```

{% hint style="info" %}
There is no command to delete an access. You can delete an access directly in your configuration file.
{% endhint %}

### How to use an Access grant with commands

You can now use this access setting the `--access` flag. For example, to copy the shared object to your current directory you would use:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe --access cheesecake cp sj://cakes/cheesecake.jpg .
```
{% endtab %}

{% tab title="Linux" %}
```
uplink --access cheesecake cp sj://cakes/cheesecake.jpg .
```
{% endtab %}

{% tab title="macOS" %}
```
uplink --access cheesecake cp sj://cakes/cheesecake.jpg .
```
{% endtab %}
{% endtabs %}
