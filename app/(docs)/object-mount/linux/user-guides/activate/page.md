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

Or you may have renewed an expired license key.

**Note:** If you do not yet have a license key, reach out to your 🌐 [Storj Representative](https://www.storj.io/landing/get-in-touch).

To activate or re-activate Object Mount with your new license key, enter the command below and follow the interactive steps:

```shell
# terminal
cuno creds activate
```


## Non-Interactive Activation

Alternatively, for non-interactive license activation, you can point the command to a license key file:

```shell
# terminal
cuno creds activate "<path/filename>"
```

You can also pipe the license key into the command as its input:

```shell
# terminal
echo "<your license key>" | cuno creds activate
```

{% callout type="note" %}
  **License File Location**

  Once activated, the location of the license file is: `$CUNO_ROOT/etc/license`. 

  By default, the permissions on this file are set to `0600`. If needed, Administrators can manually modify the group and permissions to allow other system users access to the `cuno` CLI command.
{% /callout %}


## Activation for Multiple Users

Normally, activation means that access to Object Mount is limited to the one user who runs the `cuno creds activate` command.

However, if the user that runs `cuno creds activate` is `root`, then access can be optionally given to other users.
