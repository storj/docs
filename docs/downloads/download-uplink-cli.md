---
description: The native CLI tool for Storj DCS/OSP
---

# Download Uplink CLI

{% content-ref url="../getting-started/satellite-developer-account/creating-your-account.md" %}
[creating-your-account.md](../getting-started/satellite-developer-account/creating-your-account.md)
{% endcontent-ref %}

**Install** the binary for your OS:

{% tabs %}
{% tab title="Windows" %}
#### Download the [Windows Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplinkng\_windows\_amd64.zip) zip file

In the Downloads folder, right-click and select "Extract all"

![](<../.gitbook/assets/image (117).png>)

Extract to your user's folder ("**Alexey"** in this example):

![](<../.gitbook/assets/image (120).png>)

Once extracted, do not try to open the file, as it can only be accessed via command line.

Open **Windows PowerShell** and continue on to the next step.
{% endtab %}

{% tab title="Linux" %}
### AMD64

#### Curl Download

```
curl -L https://github.com/storj/storj/releases/latest/download/uplinkng_linux_amd64.zip -o uplinkng_linux_amd64.zip
unzip -o uplinkng_linux_amd64.zip
sudo install uplinkng /usr/local/bin/uplink
```

#### Direct Download

[Linux AMD64 Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplinkng\_linux\_amd64.zip)

### ARM

#### Curl Download

```
curl -L https://github.com/storj/storj/releases/latest/download/uplinkng_linux_arm.zip -o uplinkng_linux_arm.zip
unzip -o uplinkng_linux_arm.zip
sudo install uplinkng /usr/local/bin/uplink
```

#### Direct Download

[Linux ARM Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplinkng\_linux\_arm.zip)
{% endtab %}

{% tab title="macOS" %}
#### Curl Download

```
curl -L https://github.com/storj/storj/releases/latest/download/uplinkng_darwin_amd64.zip -o uplinkng_darwin_amd64.zip
unzip -o uplinkng_darwin_amd64.zip
sudo install uplinkng /usr/local/bin/uplink
```

#### Direct Download

[macOS Uplink Binary](https://github.com/storj/storj/releases/latest/download/uplinkng\_darwin\_amd64.zip)
{% endtab %}
{% endtabs %}

{% content-ref url="../getting-started/quickstart-uplink-cli/" %}
[quickstart-uplink-cli](../getting-started/quickstart-uplink-cli/)
{% endcontent-ref %}
