---
title: Storage Node
docId: HaDkV_0aWg9OJoBe53o-J
weight: 5
redirects:
  - /node/setup/cli/storage-node
---

## Introduction

The Docker container has the software you need to run your Storage Node.

## Step 1. Download the Storage Node Docker Container

```shell
docker pull storjlabs/storagenode:latest
```

## Step 2. Set up the Storage Node

{% callout type="danger"  %}
**The setup step must be performed only once. If a node has already been set up, running with the SETUP flag will result in failure**.
{% /callout %}

{% callout type="warning"  %}
A network-attached storage location may work, but this is neither supported nor recommended!
{% /callout %}

{% tabs %}
{% tab label="Linux" %}
{% callout type="danger"  %}
**Linux Users:** You **must** static mount via /etc/fstab. Failure to do so will put you in high risk of failing audits and getting disqualified. Here's how to do that: [](docId:nZeFxmawYPdgkwUPy6f9s)&#x20;
{% /callout %}

1.  Copy the command into a plain text editor like a `nano`:

```shell
docker run --rm -e SETUP="true" \
    --user $(id -u):$(id -g) \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:latest
```

{% /tab %}

{% tab label="macOS" %}

1.  Copy the command into a plain text editor (do not use any word processors include Notes):

```shell
docker run --rm -e SETUP="true" \
    --user $(id -u):$(id -g) \
    --mount type=bind,source="<identity-dir>",destination=/app/identity \
    --mount type=bind,source="<storage-dir>",destination=/app/config \
    --name storagenode storjlabs/storagenode:latest
```

{% /tab %}

{% tab label="Windows" %}

1. Copy the command into a plain text editor (the `Notepad++` is recommended), do not use any word processor:

```shell
docker run --rm -e SETUP="true" --mount type=bind,source="<identity-dir>",destination=/app/identity --mount type=bind,source="<storage-dir>",destination=/app/config --name storagenode storjlabs/storagenode:latest
```

{% /tab %}
{% /tabs %}

2. Replace the `<identity-dir>` and `<storage-dir>` with your parameters.&#x20;

3. Copy the updated command.

4. Run it in a terminal window.

5. Your node has been set up!

## Step 3. Run the Storage Node

{% callout type="warning"  %}
**Previous versions of the command that used the rather than the option will not work properly. Copy the updated command below.**
{% /callout %}

{% tabs %}
{% tab label="Linux" %}

1. Copy the command into a plain text editor, like a `nano`:

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

{% /tab %}

{% tab label="macOS" %}

1. Copy the command into a plain text editor (do not use any word processors include Notes):

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

{% /tab %}

{% tab label="Windows" %}

1. Copy the command into a text editor (the `Notepad++` is recommended), do not use any word processor:

```bash
docker run -d --restart unless-stopped --stop-timeout 300 -p 28967:28967/tcp -p 28967:28967/udp -p 127.0.0.1:14002:14002 -e WALLET="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" -e EMAIL="user@example.com" -e ADDRESS="domain.ddns.net:28967" -e STORAGE="2TB" --mount type=bind,source="<identity-dir>",destination=/app/identity --mount type=bind,source="<storage-dir>",destination=/app/config --name storagenode storjlabs/storagenode:latest
```

{% /tab %}
{% /tabs %}

2. Edit the `WALLET`, `EMAIL`, `ADDRESS`, `STORAGE` and replace the `<identity-dir>`, and `<storage-dir>` with your parameters.&#x20;

3. Copy the updated command.

4. Run it in a terminal window.

5. You're officially a Storage Node operator! 🎉

You can also check to see if the node was started properly by by running the following command in the terminal

```bash
docker ps -a
```

## Step 4. Check the status of your node

You can check the status of your node, along with many other statistics by running the web [](docId:3k4V1HFunDWHVso9b1Xt9). It will look like this:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/cFR1q3VoPctBwCp9bJ1CM_image.png)
