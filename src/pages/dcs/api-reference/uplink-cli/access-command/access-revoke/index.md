---
title: access revoke
slug: api-reference/uplink-cli/access-command/access-revoke
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-22T13:02:41.000Z
docId: FOOspY9cvBKTA7OsETEz4
---

This command allows you to revoke the access.

## Usage

{% code-group %}
```windows
./uplink.exe access [flags] <revokee>
```

```linux
uplink access [flags] <revokee>
```

```macos
uplink access [flags] <revokee>
```
{% /code-group %}

## Arguments

| Argument    | Description                    |
| :---------- | :----------------------------- |
| `<revokee>` | Access name or value to revoke |

## Flags

| Flag              | Description                                |
| :---------------- | :----------------------------------------- |
| `--access string` | Access name or value performing the revoke |

## Global flags

| Global flags          | Description                                   |
| :-------------------- | :-------------------------------------------- |
| `--config-dir string` | Directory that stores the configuration       |
| `--help`, `-h`        | prints help for the command                   |
| `--advanced`          | when used with -h, prints advanced flags help |

## Examples

### Revoke a stored access

{% callout type="warning"  %} 
If you want to revoke the current access, you need to switch to a different access with the [](docId\:d-btqElDJY9m26QIKJYP-) command before proceeding.
{% /callout %}

{% code-group %}
```windows
./uplink.exe access revoke us1-ro
```

```linux
uplink access revoke us1-ro
```

```macos
uplink access revoke us1-ro
```
{% /code-group %}

```Text
Revoked access "us1-ro"
```

### Revoke an access grant

{% code-group %}
```windows
./uplink.exe access revoke 19hFrjmsi...
```

```linux
uplink access revoke 19hFrjmsi...
```

```macos
uplink access revoke 19hFrjmsi...
```
{% /code-group %}

```Text
Revoked access "19hFrjmsi..."
```

