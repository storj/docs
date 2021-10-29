# Revoke an Access to an Object

You can revoke an access grant to an object at any time with the command `uplink revoke`.

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe revoke asdfRF...
```
{% endtab %}

{% tab title="Linux" %}
```
uplink revoke asdfRF...
```
{% endtab %}

{% tab title="MacOS" %}
```
uplink revoke asdfRF...
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
The access will be revoked permanently for this parent access grant.&#x20;

If you want to share this content again you should create a new access grant through the web interface.
{% endhint %}

### Revoke a named access grant

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe revoke --access access-name
```
{% endtab %}

{% tab title="Linux" %}
```
uplink revoke --access access-name
```
{% endtab %}

{% tab title="MacOS" %}
```
uplink revoke --access access-name
```
{% endtab %}
{% endtabs %}
