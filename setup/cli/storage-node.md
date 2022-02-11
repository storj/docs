---
description: The Docker container that has the software you need to run your Storage Node.
---

# Storage Node

## Download the Storage Node Docker Container

```
docker pull storjlabs/storagenode:latest
```

## Storage Node Concepts

Before running your Storage Node for the first time, please note the Storage Node concepts to be used.

| Concepts         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-p`             | <p>How to specify ports - which are points through which information flows between your Node and the Storj network.  <code>-p &#x3C;host-port>:&#x3C;container-port>/tcp -p &#x3C;host-port>:&#x3C;container-port>/udp</code> <br></p><p><code>/tcp</code>and<code>/udp</code>will allow your node to connect with the network via both TCP and UDP</p><p></p><p><code>-p 28967:28967</code> is the core port used to connect with the network.<br></p><p><code>-p 14002:14002</code>  is the port used for the <a href="https://documentation.storj.io/setup/cli/dashboard">storage node GUI dashboard</a>.</p>                                                                                                                                                                   |
| `WALLET`         | A wallet address to receive STORJ token payouts for running the node. [Learn how to obtain a valid payout address.](https://support.storj.io/hc/en-us/articles/360026611692-How-do-I-hold-STORJ-What-is-a-valid-address-or-compatible-wallet-)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `EMAIL`          | Email address so that we can notify you when a new version has been released. **(recommended)**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `ADDRESS`        | <p>External IP address or the DDNS you configured and the port you opened on your router <code>&#x3C;ip>:&#x3C;port></code></p><p></p><p>If you are using a custom port other than 28967, you have to change the <code>-p 28967:28967</code> to <code>-p &#x3C;port>:28967</code></p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `STORAGE`        | <p>How much disk space you want to allocate to the Storj network </p><p></p><p>Be sure not to over-allocate space! <strong>Allow at least 10% extra for overhead.</strong> If you over-allocate space, <strong>you may corrupt your database</strong> when the system attempts to store pieces when no more physical space is actually available on your drive. The minimum storage shared requirement is <strong>500 GB</strong>, which means you need a disk of at least 550 GB total size to allow for the 10% overhead.</p><p><br>If you set up a brand new node, make sure the storage destination folder doesn't already have a<code>config.yaml</code> and/or <code>storage</code> folder inside, otherwise the <code>storagenode</code> container could fail to start.</p> |
| `<identity-dir>` | Replace it to the location of your identity files. You can copy the absolute path from the output of the identity commands you ran earlier.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `<storage-dir>`  | <p>Replace it with the local directory where you want files to be stored on your hard drive for the network. </p><p>Please consider using a subfolder instead of the root of the disk, this could prevent starting from scratch if the disk were to disappear/accidentally disconnect.</p><p>The network-attached location could work, but it is neither supported nor recommended!</p><p></p><p><strong>Note</strong>: the current database backend is <a href="https://github.com/boltdb/bolt">BoltDB</a> which <a href="https://github.com/boltdb/bolt/issues/704">requires <em>mmap</em></a>, hence you have to use a file system which supports <em>mmap</em>.</p>                                                                                                            |

## Setting up the Storage Node

{% hint style="warning" %}
The setup step must be performed only once. If a node has already been set up, running with the SETUP flag will result in failure.
{% endhint %}

{% hint style="warning" %}
**Previous versions of the`docker run`command that used the  `-v` rather than the `--mount` option will not work properly. Copy the updated command below.**
{% endhint %}

{% hint style="danger" %}
A network-attached storage location may work, but this is neither supported nor recommended!
{% endhint %}

{% tabs %}
{% tab title="Windows" %}
1. Copy the command into a plain text editor (the `Notepad++` is recommended), do not use any word processor:

```
docker run --rm -e SETUP="true" --mount type=bind,source="<identity-dir>",destination=/app/identity --mount type=bind,source="<storage-dir>",destination=/app/config --name storagenode storjlabs/storagenode:latest
```
{% endtab %}

{% tab title="Linux" %}
{% hint style="danger" %}
**Linux Users:** You **must** static mount via /etc/fstab. Failure to do so will put you in high risk of failing audits and getting disqualified. [Here's how to do that](../../resources/faq/linux-static-mount.md).
{% endhint %}

1. Copy the command into a plain text editor like a `nano`:

```
docker run --rm -e SETUP="true" \
    --user $(id -u):$(id -g) \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:latest
```
{% endtab %}

{% tab title="macOS" %}
1. Copy the command into a plain text editor (do not use any word processors include Notes):

```
docker run --rm -e SETUP="true" \
    --user $(id -u):$(id -g) \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:latest
```
{% endtab %}
{% endtabs %}

2\. Replace the `<identity-dir>` and `<storage-dir>` with your parameters.&#x20;

3\. Copy the updated command.

4\. Run it in a terminal window.

5\. Your node has been set up!

## Running the Storage Node

{% tabs %}
{% tab title="Windows" %}
1\. Copy the command into a text editor (the `Notepad++` is recommended), do not use any word processor:

```bash
docker run -d --restart unless-stopped --stop-timeout 300 -p 28967:28967/tcp -p 28967:28967/udp -p 127.0.0.1:14002:14002 -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" -e EMAIL="user@example.com" -e ADDRESS="domain.ddns.net:28967" -e STORAGE="2TB" --mount type=bind,source="<identity-dir>",destination=/app/identity --mount type=bind,source="<storage-dir>",destination=/app/config --name storagenode storjlabs/storagenode:latest
```
{% endtab %}

{% tab title="Linux" %}
1\. Copy the command into a plain text editor, like a `nano`:

```bash
docker run -d --restart unless-stopped --stop-timeout 300 \
    -p 28967:28967/tcp \
    -p 28967:28967/udp \
    -p 127.0.0.1:14002:14002 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e STORAGE="2TB" \
    --user $(id -u):$(id -g) \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:latest
```
{% endtab %}

{% tab title="macOS" %}
1\. Copy the command into a plain text editor (do not use any word processors include Notes):

```bash
docker run -d --restart unless-stopped --stop-timeout 300 \
    -p 28967:28967/tcp \
    -p 28967:28967/udp \
    -p 127.0.0.1:14002:14002 \
    -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
    -e EMAIL="user@example.com" \
    -e ADDRESS="domain.ddns.net:28967" \
    -e STORAGE="2TB" \
    --user $(id -u):$(id -g) \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:latest
```
{% endtab %}
{% endtabs %}

2\. Edit the `WALLET`, `EMAIL`, `ADDRESS`, `STORAGE` and replace the `<identity-dir>`, and `<storage-dir>` with your parameters.&#x20;

3\. Copy the updated command.

4\. Run it in a terminal window.

5\. You're officially a Storage Node operator! 🎉

You can also check to see if the node was started properly by by running the following command in the terminal

```
docker ps -a
```

## Check the status of your node

You can check the status of your node, along with many other statistics by [running the web dashboard](dashboard.md). It will look like this:

![](../../.gitbook/assets/sno\_dashboard.png)

