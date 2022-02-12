# How to remote access the web dashboard

## Enable the web dashboard for your setup

{% tabs %}
{% tab title="Windows" %}
See [Dashboard](../../setup/gui-windows/dashboard.md#device-on-local-network) for Windows GUI or [Dashboard](../../setup/cli/dashboard.md#storage-node-operator-web-dashboard) for docker version
{% endtab %}

{% tab title="Linux" %}
See [Dashboard](../../setup/cli/dashboard.md#storage-node-operator-web-dashboard) for docker version
{% endtab %}

{% tab title="macOS" %}
See [Dashboard](../../setup/cli/dashboard.md#storage-node-operator-web-dashboard) for docker version
{% endtab %}
{% endtabs %}

## Install a ssh server on your PC with the storagenode

{% tabs %}
{% tab title="Windows" %}
{% embed url="https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse" %}
{% endtab %}

{% tab title="Linux" %}
```
sudo apt update && sudo apt install ssh -y
```
{% endtab %}

{% tab title="macOS" %}
{% embed url="https://osxdaily.com/2016/08/16/enable-ssh-mac-command-line/" %}
{% endtab %}
{% endtabs %}

## Install a ssh client on your device

{% tabs %}
{% tab title="Windows" %}
```
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

{% embed url="https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse#installing-openssh-with-powershell" %}
{% endtab %}

{% tab title="Linux" %}
```
sudo apt update && sudo apt install ssh -y
```
{% endtab %}

{% tab title="macOS" %}
{% embed url="https://osxdaily.com/2016/08/16/enable-ssh-mac-command-line/" %}
{% endtab %}

{% tab title="Android" %}
Install [Termius SSH client from Google Play](https://play.google.com/store/apps/details?id=com.server.auditor.ssh.client)
{% endtab %}

{% tab title="iOS" %}
Install [Termius SSH client from Apple Store](https://apps.apple.com/ru/app/termius-ssh-client/id549039908)
{% endtab %}
{% endtabs %}

### Check connection

Here we will use a _user_ as user on the remote ssh server, and _server_ as hostname or IP of the remote ssh server.

{% tabs %}
{% tab title="Windows" %}
```
ssh user@server
```

`Password:`\
`user@server:~$`
{% endtab %}

{% tab title="Linux" %}
```
ssh user@server
```

`Password:`\
`user@server:~$`
{% endtab %}

{% tab title="macOS" %}
```
ssh user@server
```

`Password:`\
`user@server:~$`
{% endtab %}

{% tab title="Android" %}
Launch the **Termius** application

![](../../.gitbook/assets/Screenshot\_2020-04-10-01-35-23-452\_com.server.auditor.ssh.client.png)

![](<../../.gitbook/assets/Screenshot\_2020-04-10-01-35-32-750\_com.server.auditor.ssh.client (1).png>)

Navigate to the **Keychain** via hamburger menu

### Keychain

![](../../.gitbook/assets/Screenshot\_2020-04-10-01-36-41-348\_com.server.auditor.ssh.client.png)

Tap on plus sign and select **New Identity**.

![](../../.gitbook/assets/Screenshot\_2020-04-10-01-36-53-829\_com.server.auditor.ssh.client.png)

#### New Identity

Specify a name of the Identity in the field **Name**, provide a username for your PC with storagenode in the **Username** fieled, specify a password in the **Password** field, confirm creation.

Navigate to the **Hosts** in the hamburger menu.

### Hosts

![](../../.gitbook/assets/Screenshot\_2020-04-10-01-36-29-564\_com.server.auditor.ssh.client.png)

Create a new host with the plus sign.

![](../../.gitbook/assets/Screenshot\_2020-04-10-02-15-11-130\_com.server.auditor.ssh.client.png)

#### New host

Specify alias for the host, i.e. _MyHomePC_. Provide the local or public hostname or IP address in the **Hostname or IP Address** field. Tap on **Username** icon and select the Identity, created earlier. In our example - _user_. Confirm creation of the host.

![](../../.gitbook/assets/Screenshot\_2020-04-10-02-24-01-105\_com.server.auditor.ssh.client.png)

Tap on your host, the _MyHomePC_ in our example, it should request a confirmation to add the fingerprint of the host to the list of known host on your smartphone.

![](../../.gitbook/assets/Screenshot\_2020-04-11-19-51-53-851\_com.server.auditor.ssh.client.png)

Confirm the connection with a tap on **Connect** button, the Terminal to your host should appear.

![](../../.gitbook/assets/Screenshot\_2020-04-11-19-54-49-429\_com.server.auditor.ssh.client.png)
{% endtab %}

{% tab title="iOS" %}
We use the same application, so all steps are similar to Android version, please take a look on Android tab.
{% endtab %}
{% endtabs %}

### Port forwarding

{% tabs %}
{% tab title="Windows" %}
```
ssh -L 14002:localhost:14002 user@server
```
{% endtab %}

{% tab title="Linux" %}
```
ssh -L 14002:localhost:14002 user@server
```
{% endtab %}

{% tab title="macOS" %}
```
ssh -L 14002:localhost:14002 user@server
```
{% endtab %}

{% tab title="Android" %}
Navigate to the **Port forwarding** screen in the hamburger menu.

![](../../.gitbook/assets/Screenshot\_2020-04-10-02-24-32-574\_com.server.auditor.ssh.client.png)

### Port forwarding

![](../../.gitbook/assets/Screenshot\_2020-04-11-17-22-25-683\_com.server.auditor.ssh.client.png)

Tap on plus sign to create a new port forwarding rule.

![](../../.gitbook/assets/Screenshot\_2020-04-11-17-22-50-525\_com.server.auditor.ssh.client.png)

Tap on **Select host** and select the host created earlier, in our case _MyHomePC_.

![](../../.gitbook/assets/Screenshot\_2020-04-11-17-22-56-255\_com.server.auditor.ssh.client.png)

Select it and fill other parameters for the port forwarding rule:

* _Port forward from_ with **14002** (dashboard port)
* _Host to_ with **127.0.0.1**
* _Port to_ with **14002**
* _Address_ with **127.0.0.1**

![](../../.gitbook/assets/Screenshot\_2020-04-11-17-23-57-464\_com.server.auditor.ssh.client.png)

Confirm creation.

Check that it's working - tap on your port forwarding rule, it should connect immediately.

You should see that connection is established and the button **Close** is appear.

![](../../.gitbook/assets/Screenshot\_2020-04-11-19-21-46-575\_com.server.auditor.ssh.client.png)

Now, open a web dashboard in your mobile browser: [http://localhost:14002](http://localhost:14002)

![](../../.gitbook/assets/Screenshot\_2020-04-11-19-24-18-951\_com.android.browser.png)

Congratulation!
{% endtab %}

{% tab title="iOS" %}
We use the same application, so all steps are similar to Android version, please take a look on Android tab.
{% endtab %}
{% endtabs %}

Navigate to [http://localhost:14002](http://localhost:14002) in your browser, you should see a web dashboard of your storagenode.

The connection can be established to your ssh server at that stage from the LAN, however, to publish your ssh server to the internet we need to secure it first. We should enable a key-only way to log in to your server. To be able to do so we need to generate and export your ssh public key to your ssh server before disabling the password login.

### Generate ssh keys

{% tabs %}
{% tab title="Windows" %}
```
ssh-keygen
```
{% endtab %}

{% tab title="Linux" %}
```
ssh-keygen
```
{% endtab %}

{% tab title="macOS" %}
```
ssh-keygen
```
{% endtab %}

{% tab title="Android" %}
Navigate to the **Keychain** in the hamburger menu, select created Identity by tap on Identity icon then tap on pencil icon to edit an Identity, tap on **Key** icon, you will see a screen _Select key_.

#### Select key

Select existing key or tap on plus sign, select the option **Generate key** to generate a new key.

#### Generate Key

Specify a name for the key in the field **Name**, provide a passphrase (optional) in the field **Passphrase** and confirm.

Select the key to return to the edit of the Identity screen, confirm modification.

![](../../.gitbook/assets/Screenshot\_2020-04-10-01-49-35-129\_com.server.auditor.ssh.client.png)
{% endtab %}

{% tab title="iOS" %}
We use the same application, so all steps are similar to Android version, please take a look on Android tab.
{% endtab %}
{% endtabs %}

### Export public key from the ssh client to the ssh server

{% tabs %}
{% tab title="Windows" %}
If the ssh server is a Windows machine, then you can use this guide: [Deploying the public key](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh\_keymanagement#deploying-the-public-key). Otherwise, use the Powershell:

```
cat ~/.ssh/id_rsa.pub | ssh user@server "umask 077; test -d .ssh || mkdir .ssh ; cat >> .ssh/authorized_keys"
```
{% endtab %}

{% tab title="Linux" %}
```
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
```
{% endtab %}

{% tab title="macOS" %}
```
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
```
{% endtab %}

{% tab title="Android" %}
Select **Keychain** from the hamburger menu

![](../../.gitbook/assets/Screenshot\_2020-04-10-01-36-41-348\_com.server.auditor.ssh.client.png)

Select the key by tap on key icon, tap on three vertical dots and select **Export to host**.

![](../../.gitbook/assets/Screenshot\_2020-04-11-19-01-30-561\_com.server.auditor.ssh.client.png)

![](../../.gitbook/assets/Screenshot\_2020-04-11-19-02-47-152\_com.server.auditor.ssh.client.png)

Tap on **Select host** and select the needed host, _MyHomePC_ in our example

![](../../.gitbook/assets/Screenshot\_2020-04-11-19-06-00-312\_com.server.auditor.ssh.client.png)

![](../../.gitbook/assets/Screenshot\_2020-04-11-19-06-09-738\_com.server.auditor.ssh.client.png)

Confirm the export to the selected host.
{% endtab %}

{% tab title="iOS" %}
We use the same application, so all steps are similar to Android version, please take a look on Android tab.
{% endtab %}
{% endtabs %}

## Disable the password login on your ssh server with storagenode

We need to specify options `PubkeyAuthentication yes` and `PasswordAuthentication no` in the config file for the ssh daemon. So, return back to your server with storagenode.

{% hint style="warning" %}
You can use a ssh terminal to make these modifications, but be careful - if you have not added your key to the `.ssh/authorized_keys` file on your ssh server on previous steps, you will lose an access via ssh to your server.
{% endhint %}

{% tabs %}
{% tab title="Windows" %}
Open the config file `%programdata%\ssh\sshd_config` with Notepad++ and set options `PubkeyAuthentication yes` and `PasswordAuthentication no`, save changes and restart the `sshd` service either from the **Services** applet or from the elevated Powershell:

```
Restart-Service sshd
```

{% embed url="https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_server_configuration#windows-configurations-in-sshd_config" %}
{% endtab %}

{% tab title="Linux" %}
Open the config file `/etc/ssh/sshd_config` with a text editor, for example `nano`, and set the `PubkeyAuthentication yes` and `PasswordAuthentication no` options, save the config file and restart the `ssh` daemon

```
sudo service ssh restart
```
{% endtab %}

{% tab title="macOS" %}
Edit the configuration file `/private/etc/ssh/sshd_config` with a plain text editor, for example - with `nano`, set the `PubkeyAuthentication yes` and `PasswordAuthentication no` options, save the config file and restart the `ssh` daemon

```
sudo launchctl stop com.openssh.sshd
sudo launchctl start com.openssh.sshd
```

{% embed url="https://superuser.com/questions/364304/how-do-i-configure-ssh-on-os-x" %}
{% endtab %}
{% endtabs %}

Now check your connection: try to connect from your ssh client again, it should now use the ssh key for authentication instead of a password.

To add more security you can install applications such as `fail2ban` to your Linux or macOS server.

Now, you can make a port forwarding rule on your router for the `22` TCP port (default ssh port) to your ssh server. For more security we recommend to forward an unusual port to the 22 port of the PC with ssh.
