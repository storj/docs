---
description: Every node is required to have a unique identifier on the network.
---

# Identity

### Get an authorization token

If you haven't already, [get an authorization token](../before-you-begin/auth-token.md). This is required to continue.

### Download the Identity Binary

Open a terminal window as a usual user (not administrator or root) and paste the command for your OS:

{% tabs %}
{% tab title="Windows" %}
PowerShell:

```
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; curl https://github.com/storj/storj/releases/latest/download/identity_windows_amd64.zip -o identity_windows_amd64.zip; Expand-Archive ./identity_windows_amd64.zip . -Force
```
{% endtab %}

{% tab title="Linux" %}
```
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_amd64.zip -o identity_linux_amd64.zip
unzip -o identity_linux_amd64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

#### ARM-based OS

Raspberry PI:

```
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_arm.zip -o identity_linux_arm.zip
unzip -o identity_linux_arm.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```

Devices Capable of the AARCH64 Instruction Set:

```
curl -L https://github.com/storj/storj/releases/latest/download/identity_linux_arm64.zip -o identity_linux_arm64.zip
unzip -o identity_linux_arm64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```
{% endtab %}

{% tab title="pre-M1 macOS" %}
```
curl -L https://github.com/storj/storj/releases/latest/download/identity_darwin_amd64.zip -o identity_darwin_amd64.zip
unzip -o identity_darwin_amd64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```
{% endtab %}

{% tab title="M1 macOS" %}
```
curl -L https://github.com/storj/storj/releases/latest/download/identity_darwin_arm64.zip -o identity_darwin_arm64.zip
unzip -o identity_darwin_arm64.zip
chmod +x identity
sudo mv identity /usr/local/bin/identity
```
{% endtab %}
{% endtabs %}

### Create an identity

{% hint style="info" %}
**This can take several hours or days, depending on your machines processing power and luck.**&#x20;

Plan to run your Node on a NAS, Raspberry Pi or similar? Create your identity on a more powerful machine and transfer it over.
{% endhint %}

{% tabs %}
{% tab title="Windows" %}
PowerShell:

```
./identity.exe create storagenode
```

Command Prompt:

```
identity.exe create storagenode
```
{% endtab %}

{% tab title="Linux" %}
```
identity create storagenode
```

If you are unable to execute the command, be sure that you set your file permission to executable: `chmod +x identity`
{% endtab %}

{% tab title="all macOS" %}
```
identity create storagenode
```

Not working? [Set your file permission](http://osxdaily.com/2011/02/21/change-file-permissions-mac/) to executable.
{% endtab %}
{% endtabs %}

4\. This process will continue until it reaches a difficulty of at least 36. On completion, it will look something like this:

![](<../.gitbook/assets/difficulty-36 (1).png>)

### Authorize the identity

Open your Storj Node invitation email and copy your [single-use authorization token](../before-you-begin/auth-token.md#authorization-token):

![](<../.gitbook/assets/Screen Shot 2019-12-13 at 4.08.37 PM.png>)

Authorize your Storage Node identity using your [single-use authorization token](../before-you-begin/auth-token.md#authorization-token) (_please, replace the placeholder `<email:characterstring>` to your actual authorization token_):

{% tabs %}
{% tab title="Windows" %}
PowerShell:

```
./identity.exe authorize storagenode <email:characterstring>
```

Command Prompt:

```
identity.exe authorize storagenode <email:characterstring>
```
{% endtab %}

{% tab title="Linux" %}
```
identity authorize storagenode <email:characterstring>
```
{% endtab %}

{% tab title="all macOS" %}
```
identity authorize storagenode <email:characterstring>
```
{% endtab %}
{% endtabs %}

### Confirm the identity

Run the following command to confirm you have the required identity files:

{% tabs %}
{% tab title="Windows" %}
PowerShell:

```
(sls BEGIN "$env:AppData\Storj\Identity\storagenode\ca.cert").count
```

```
(sls BEGIN "$env:AppData\Storj\Identity\storagenode\identity.cert").count
```

Command Prompt:

```
findstr "BEGIN" "%APPDATA%\Storj\Identity\storagenode\ca.cert" | find /c /v ""
```

```
findstr "BEGIN" "%APPDATA%\Storj\Identity\storagenode\identity.cert" | find /c /v ""
```
{% endtab %}

{% tab title="Linux" %}
```
grep -c BEGIN ~/.local/share/storj/identity/storagenode/ca.cert
```

```
grep -c BEGIN ~/.local/share/storj/identity/storagenode/identity.cert
```
{% endtab %}

{% tab title="all macOS" %}
```
grep -c BEGIN ~/Library/Application\ Support/Storj/identity/storagenode/ca.cert
```

```
grep -c BEGIN ~/Library/Application\ Support/Storj/identity/storagenode/identity.cert
```
{% endtab %}
{% endtabs %}

The first command should return **2**, and the second command should return **3**:

![](<../.gitbook/assets/identity files 0padding.png>)

If your numbers are different, then [authorizing the identity](identity.md#authorize-the-identity) was not successful. Please try again.

Might move your storage node to another machine in the future? Back up your identity folder.

### Backup the identity

{% hint style="danger" %}
**Backup before you continue, it should be quick! 🙏**

This allows you to restore your Node in case of an unfortunate hardware or OS incident.
{% endhint %}

Use an external device and backup your identity folder:

{% tabs %}
{% tab title="Windows" %}
Your identity folder is located in (PowerShell): \
`start "$Env:APPDATA/Storj/Identity/storagenode"`

In Command Prompt or Windows Explorer: \
`start "%APPDATA%\Storj\Identity\storagenode"`
{% endtab %}

{% tab title="Linux" %}
Your identity folder is located in:\
`~/.local/share/storj/identity/storagenode`

On Raspberry Pi, your identity folder is located in: `/home/pi/.local/share/storj/identity/storagenode`
{% endtab %}

{% tab title="macOS" %}
Your identity folder is located in: `/Users/USER/Library/Application Support/Storj/identity/storagenode`
{% endtab %}
{% endtabs %}

### Optional: Move the identity to the subfolder in the storage location

It's not required, but could prevent the storagenode from start, if the mounted disk is inaccessible.

Unfortunately this trick will not help, if the disk would disappear while the storagenode running.

### Next up, select your installation method:

{% content-ref url="../setup/cli/" %}
[cli](../setup/cli/)
{% endcontent-ref %}

{% content-ref url="../setup/gui-windows/" %}
[gui-windows](../setup/gui-windows/)
{% endcontent-ref %}
