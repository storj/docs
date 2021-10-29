# Prerequisites

[You need to have the satellite account and installed Uplink CLI](../prerequisites.md).

If you have followed the previous tutorial, you already have a `cakes` bucket. If you don't, simply create it and re-upload using the following command:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe mb sj://cakes
```
{% endtab %}

{% tab title="Linux" %}
```
uplink mb sj://cakes
```
{% endtab %}

{% tab title="macOS" %}
```
uplink mb sj://cakes
```
{% endtab %}
{% endtabs %}

Let's (re)upload our cheesecake image:

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe cp ~/Desktop/cheesecake.jpg sj://cakes
```
{% endtab %}

{% tab title="Linux" %}
```
uplink cp ~/Desktop/cheesecake.jpg sj://cakes
```
{% endtab %}

{% tab title="macOS" %}
```
uplink cp ~/Desktop/cheesecake.jpg sj://cakes
```
{% endtab %}
{% endtabs %}

