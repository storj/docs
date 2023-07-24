---
title: How to remote access the web dashboard
slug: resources/faq/how-to-remote-access-the-web-dashboard
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-07-24T18:29:44.717Z
docId: mZulkrp1H1Igv1BBTPsTC
---

## Enable the web dashboard for your setup

{% tabs %}
{% tab label="Windows" %}
See [](docId:3k4V1HFunDWHVso9b1Xt9) or [](docId\:gH4m4hVZ0BkMVAoW_jA2t) for docker version
{% /tab %}

{% tab label="Linux" %}
See [](docId\:gH4m4hVZ0BkMVAoW_jA2t) for docker version
{% /tab %}

{% tab label="macOS" %}
See [](docId\:gH4m4hVZ0BkMVAoW_jA2t) for docker version
{% /tab %}
{% /tabs %}

## Install a ssh server on your PC with the storagenode

{% tabs %}
{% tab label="Windows" %}

[Get started with OpenSSH for Windows](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui)
{% /tab %}

{% tab label="Linux" %}
```Text
sudo apt update && sudo apt install ssh -y
```
{% /tab %}

{% tab label="MacOS" %}
Get started with OpenSSH for Windows



[How to Enable SSH on a Mac from the Command Line](https://osxdaily.com/2016/08/16/enable-ssh-mac-command-line/)
{% /tab %}
{% /tabs %}



## Install a ssh client on your device

{% tabs %}
{% tab label="Windows" %}
```Text
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

[Get started with OpenSSH for Windows](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui)
{% /tab %}

{% tab label="Linux" %}
```Text
sudo apt update && sudo apt install ssh -y
```
{% /tab %}

{% tab label="MacOS" %}


[How to Enable SSH on a Mac from the Command Line](https://osxdaily.com/2016/08/16/enable-ssh-mac-command-line/)
{% /tab %}
{% /tabs %}

## Check connection

Here we will use a *user* as user on the remote ssh server, and *server* as hostname or IP of the remote ssh server.

{% tabs %}
{% tab label="Windows" %}
```Text
ssh user@server
```

`Password:`

`user@server:~$`
{% /tab %}

{% tab label="Linux" %}
```Text
ssh user@server
```

`Password:`

`user@server:~$`
{% /tab %}

{% tab label="macOS" %}
```Text
ssh user@server
```

`Password:`

`user@server:~$`
{% /tab %}

{% tab label="Android" %}
Launch the **Termius** application

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/1WDSMEBw1RX2L-nMMxwsS_screenshot2020-04-10-01-35-23-452comserverauditorsshclient.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/CyargBsklkwjygra8sIWG_screenshot2020-04-10-01-35-32-750comserverauditorsshclient-1.png)



Navigate to the **Keychain** via menu in the top left



**Keychain**

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/kSSZM2TtTrUv0LnI_6gRW_screenshot2020-04-10-01-36-41-348comserverauditorsshclient.png)



Tap on plus sign and select **New Identity.**

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/61_qLtgFBqtwN2mjqNnKR_screenshot2020-04-10-01-36-53-829comserverauditorsshclient.png)

****

**New Identity**

Specify a name of the Identity in the field **Name**, provide a username for your PC with storagenode in the **Username** fieled, specify a password in the **Password** field, confirm creation.

Navigate to the **Hosts** in the hamburger menu.



**Hosts**

![](https://archbee.imgix.net/kv3plx2xmXcUGcVl4Lttj/BL4PNy3nbasglk_aTj7SU_screenshot2020-04-10-01-36-29-564comserverauditorsshclient.png)

****

Create a new host with the plus sign.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/eT1xBP6coksxRjOPeHQrO_screenshot2020-04-10-02-15-11-130comserverauditorsshclient.png)

****

**New host**

Specify alias for the host, i.e. *MyHomePC*. Provide the local or public hostname or IP address in the **Hostname or IP Address** field. Tap on **Username** icon and select the Identity, created earlier. In our example - *user*. Confirm creation of the host

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/bnu6Fux3BMxY0weUr9SJC_screenshot2020-04-10-02-24-01-105comserverauditorsshclient.png)

Tap on your host, the *MyHomePC* in our example, it should request a confirmation to add the fingerprint of the host to the list of known host on your smartphone.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/8wpjlE8KZhLDBuWqtEaGY_screenshot2020-04-11-19-51-53-851comserverauditorsshclient.png)

Confirm the connection with a tap on **Connect** button, the Terminal to your host should appear.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/2Z_8PC7IFvnnW9IVa8Ehj_screenshot2020-04-11-19-54-49-429comserverauditorsshclient.png)

****

****

****

****
{% /tab %}

{% tab label="iOS" %}
We use the same application, so all steps are similar to Android version, please take a look on Android tab.
{% /tab %}
{% /tabs %}

### Port forwarding

{% tabs %}
{% tab label="Windows" %}
```Text
ssh -L 14002:localhost:14002 user@server
```
{% /tab %}

{% tab label="Linux" %}
```Text
ssh -L 14002:localhost:14002 user@server
```
{% /tab %}

{% tab label="macOS" %}
```Text
ssh -L 14002:localhost:14002 user@server
```
{% /tab %}

{% tab label="Android" %}
Navigate to the **Port forwarding** screen in the hamburger menu.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/CNwrfB-kBPuwJOSsETfTb_screenshot2020-04-10-02-24-32-574comserverauditorsshclient.png)

Port forwarding

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/u1Bqqejp1xXQaIapnLrMi_screenshot2020-04-11-17-22-25-683comserverauditorsshclient-1.png)

Tap on plus sign to create a new port forwarding rule.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Ob94a-BLL3MYMV2jJwPSC_screenshot2020-04-11-17-22-50-525comserverauditorsshclient.png)

Tap on **Select host** and select the host created earlier, in our case *MyHomePC*.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/lje50iRLNyo9CXAa-8dUH_screenshot2020-04-11-17-22-56-255comserverauditorsshclient.png)





Select it and fill other parameters for the port forwarding rule:

*   *Port forward from* with **14002** (dashboard port)

*   *Host to* with **127.0.0.1**

*   *Port to* with **14002**

*   *Address* with **127.0.0.1**

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/bSM1dqhcfVRFvz3pYMx7f_screenshot2020-04-11-17-23-57-464comserverauditorsshclient.png)

Confirm creation.

Check that it’s working - tap on your port forwarding rule, it should connect immediately.

You should see that connection is established and the button **Close** is appear.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/SCQG9DGFn61KvlTeRJFcz_screenshot2020-04-11-19-21-46-575comserverauditorsshclient.png)

Now, open a web dashboard in your mobile browser: [http://localhost:14002](http://localhost:14002/)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/IBDxUGuEagsFPsvB1S_ku_screenshot2020-04-11-19-24-18-951comandroidbrowser.png)



Congratulations!




{% /tab %}

{% tab label="iOS" %}
We use the same application, so all steps are similar to Android version, please take a look on Android tab.
{% /tab %}
{% /tabs %}

Navigate to <http://localhost:14002> in your browser, you should see a web dashboard of your storagenode.

The connection can be established to your ssh server at that stage from the LAN, however, to publish your ssh server to the internet we need to secure it first. We should enable a key-only way to log in to your server. To be able to do so we need to generate and export your ssh public key to your ssh server before disabling the password login.

### Generate ssh keys

{% tabs %}
{% tab label="Windows" %}
```Text
ssh-keygen
```
{% /tab %}

{% tab label="Linux" %}
```Text
ssh-keygen
```
{% /tab %}

{% tab label="macOS" %}
```Text
ssh-keygen
```
{% /tab %}

{% tab label="Android" %}
Navigate to the **Keychain** in the hamburger menu, select created Identity by tap on Identity icon then tap on pencil icon to edit an Identity, tap on **Key** icon, you will see a screen *Select key*.

**Select key**

Select existing key or tap on plus sign, select the option **Generate key** to generate a new key.

**Generate Key**

Specify a name for the key in the field **Name**, provide a passphrase (optional) in the field **Passphrase** and confirm.

Select the key to return to the edit of the Identity screen, confirm modification.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Sq8VU_0y2HbAx_B-4mBwq_screenshot2020-04-10-01-49-35-129comserverauditorsshclient.png)




{% /tab %}

{% tab label="iOS" %}
We use the same application, so all steps are similar to Android version, please take a look on Android tab.
{% /tab %}
{% /tabs %}

### Export public key from the ssh client to the ssh server

{% tabs %}
{% tab label="Windows" %}
If the ssh server is a Windows machine, then you can use this guide: [Deploying the public key](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement#deploying-the-public-key). Otherwise, use the Powershell:

```Text
cat ~/.ssh/id_rsa.pub | ssh user@server "umask 077; test -d .ssh || mkdir .ssh ; cat >> .ssh/authorized_keys"
```
{% /tab %}

{% tab label="Linux" %}
```Text
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
```
{% /tab %}

{% tab label="macOS" %}
```Text
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
```
{% /tab %}

{% tab label="Android" %}
Select **Keychain** from the hamburger menu

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/gGsesUDyNfxMb51n92mvO_screenshot2020-04-10-01-36-41-348comserverauditorsshclient-2.png)

Select the key by tap on key icon, tap on three vertical dots and select **Export to host**.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/49seOAvmH0qxOll1W3UrO_screenshot2020-04-11-19-01-30-561comserverauditorsshclient-1.png)



![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/9jLtDrJSWYlZLRNsfNzO-_screenshot2020-04-11-19-02-47-152comserverauditorsshclient-1.png)

Tap on **Select host** and select the needed host, *MyHomePC* in our example

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/95AevSp1sAx2gLaX63lR3_screenshot2020-04-11-19-06-00-312comserverauditorsshclient-1.png)




![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/RTg4f_bxcoYxlhQkmS87T_screenshot2020-04-11-19-06-09-738comserverauditorsshclient-1.png)



Confirm the export to the selected host.


{% /tab %}

{% tab label="iOS" %}
Select **Keychain** from the hamburger menu.

![](https://archbee.imgix.net/kv3plx2xmXcUGcVl4Lttj/eW61FgtTMkNAdPZVykKSq_screenshot2020-04-10-01-36-41-348comserverauditorsshclient-1.png)

Select the key by tap on key icon, tap on three vertical dots and select **Export to host**.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/paSbf4qhCpltTZgsgdV4V_screenshot2020-04-11-19-01-30-561comserverauditorsshclient.png)





![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/khKiRRWD8IQGeqPBG09PD_screenshot2020-04-11-19-02-47-152comserverauditorsshclient.png)

Tap on **Select host** and select the needed host, *MyHomePC* in our example

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/4x9jBCu_kNDGbJpETZ8xT_screenshot2020-04-11-19-06-00-312comserverauditorsshclient.png)

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/x--vRfC1CX1Gj2mYMZcnK_screenshot2020-04-11-19-06-09-738comserverauditorsshclient.png)



Confirm the export to the selected host.

##
{% /tab %}
{% /tabs %}

## Disable the password login on your ssh server with storagenode

{% tabs %}
{% tab label="Windows" %}
We need to specify options `PubkeyAuthentication yes` and `PasswordAuthentication no` in the config file for the ssh daemon. So, return back to your server with storagenode.

{% callout type="warning"  %} 
You can use a ssh terminal to make these modifications, but be careful - if you have not added your key to the `.ssh/authorized_keys` file on your ssh server on previous steps, you will lose an access via ssh to your server.
{% /callout %}

Open the config file `%programdata%\ssh\sshd_config` with Notepad++ and set options `PubkeyAuthentication yes` and `PasswordAuthentication no`, save changes and restart the `sshd` service either from the **Services** applet or from the elevated Powershell:



```Text
Restart-Service sshd
```

[Windows Configurations in sshd\_config](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_server_configuration#windows-configurations-in-sshd_config)
{% /tab %}

{% tab label="Linux" %}
Open the config file `/etc/ssh/sshd_config` with a text editor, for example `nano`, and set the `PubkeyAuthentication yes` and `PasswordAuthentication no` options, save the config file and restart the `ssh` daemon

```Text
sudo service ssh restart
```
{% /tab %}

{% tab label="MacOS" %}
Edit the configuration file `/private/etc/ssh/sshd_config` with a plain text editor, for example - with `nano`, set the `PubkeyAuthentication yes` and `PasswordAuthentication no` options, save the config file and restart the `ssh` daemon

```Text
sudo launchctl stop com.openssh.sshd
sudo launchctl start com.openssh.sshd
```

[How do I configure SSH on OS X? ](https://superuser.com/questions/364304/how-do-i-configure-ssh-on-os-x)
{% /tab %}
{% /tabs %}

Now check your connection: try to connect from your ssh client again, it should now use the ssh key for authentication instead of a password.

To add more security you can install applications such as `fail2ban` to your Linux or macOS server.

Now, you can make a port forwarding rule on your router for the `22` TCP port (default ssh port) to your ssh server. For more security we recommend to forward an unusual port to the 22 port of the PC with ssh.
