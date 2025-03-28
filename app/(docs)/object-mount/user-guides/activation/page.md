---
title: Activate License
docId: Yee3Kun6axeeFeuh

metadata:
  title: Activate License
  description: Activate License

weight: 4    
---

## Licenses and activation

When installing, you will have the option for a 14-day trial of Object Mount Professional. You don't need to register or activate Object Mount during the trial period. To continue using Object Mount beyond the trial period, you must [register online](https://cuno.io/register) and activate your license.

{% callout type="note"  %}
Trials are only to be used once per user/organisation. If installing inside a cloud instance or container, you should register and activate an appropriate license manually.

To avoid automatic trial registration, set the environment variable `CUNO_NO_TRIAL` to `1` before running the installer.

Register [online](https://cuno.io/register) for a free personal-use license or Professional, Educational or Enterprise evaluation. Contact [sales@storj.io](mailto:sales@storj.io) when you're ready for a quote.

All free licenses (including evaluations) let you use Professional-tier features for 14 days, and thereafter you will be limited to the [Personal](mailto:sales@storj.io) tier of usage. See the [pricing page](mailto:sales@storj.io) for more information about pricing, licenses and the available features on each tier.
{% /callout %}

## Activating your license

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
