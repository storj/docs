---
title: Activate a License Key
hideTitle: false
docId: BN6yJrwasPnZsaf
weight: 2
redirects:
  - /object-mount/linux/user-guides/activation
metadata:
  title: Activate a License Key for Object Mount for Linux
  description:
    Steps to activate Object Mount on Linux.
hidden: false
---

## Activate using an Object Mount License Key

When you first [installed Object Mount](docId:wxtofwqcb5f2) for Linux, you may have already added your license key.

If not, you may have selected the option to start a Free Trial.

At the end of your free trial period you must register to obtain an Object Mount License Key.

**Note:** If you do not yet have a license key, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).

To activate Object Mount with your license, enter the command for your environment below, and follow the interactive steps:

{% tabs %}

{% tab label="Linux Distros" %}
   ```shell
   # terminal
   cuno creds activate
   ```
{% /tab %}

{% tab label="Mac (Linux)" %}
   ```shell
   # terminal
   cuno-mac creds activate
   ```

  {% callout type="info" %}
    **Instructions for cuno-mac users**

    If any arguments are given to ``cuno-mac``, it starts a temporary container with your installation of cuno mounted into it, and runs the command inside the container.

    The first time ``cuno-mac`` is run, a Docker container will be created with Object Mount ready to use and a user set up within the container similar to your local user on your Mac.
  {% /callout %}
{% /tab %}

{% /tabs %}


## Non-Interactive Activation

For non-interactive license activation, you can supply a file to the command:

```shell
# terminal
cuno creds activate "<path/filename>"
```

You can also pipe the license key into the command as its input:

```shell
# terminal
echo "<your license key>" | cuno creds activate
```

{% callout type="note"  %}
**Log File Location**

The location of the license file after activation is: `$CUNO_ROOT/etc/license`. 

By default, the permissions on this file are set to `0600`. Administrators can manually modify the group and permissions to allow other system users access to the `cuno` CLI command.
{% /callout %}


## Activation for Multiple Users

Normally, activation means that access to Object Mount is limited to the user who runs the `cuno creds activate` command.

However, if the user that runs `cuno creds activate` is `root`, then access can be optionally given to other users.
