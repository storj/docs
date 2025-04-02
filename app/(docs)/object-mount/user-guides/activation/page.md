---
title: Activate License
docId: Yee3Kun6axeeFeuh

metadata:
  title: Activate License
  description: Activate License

weight: 4    
---

## Licenses and activation

If interested in a free trial license, please schedule a discovery call [here](https://meetings.hubspot.com/tom1581/storj-object-mount-discovery-meeting?uuid=7d69a8eb-87d2-4971-aef9-9ea2b1073e7a).

### Interactive

Activate your licence by running the command and following the interactive steps:

```console
cuno creds activate
```

{% callout type="note"  %}
Normally, activation means that access to Object Mount is limited to the user who runs `cuno creds activate`.
However, if the user that runs `cuno creds activate` is `root`, then access can be optionally given to other users.
{% /callout %}

### Non-interactive

For non-interactive activation, you can supply a file to the command:

```console
cuno creds activate "<file>"
```

You can also pipe the licence in as input:

```console
echo "<your licence key>" | cuno creds activate
```

{% callout type="note"  %}
The location of the license file after activation is `$CUNO_ROOT/etc/license`. By default, the permissions on this file are set to `0600`. Administrators can manually modify the group and permissions to allow other system users accessing `cuno`.
{% /callout %}
