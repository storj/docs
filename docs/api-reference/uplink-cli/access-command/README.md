---
description: Set of commands to manage accesses.
---

# access

## Usage

{% tabs %}
{% tab title="Windows" %}
```
./uplink.exe access [command]
```
{% endtab %}

{% tab title="Linux" %}
```
uplink access [command]
```
{% endtab %}

{% tab title="macOS" %}
```
uplink access [command]
```
{% endtab %}
{% endtabs %}

## Child commands

| Command                                | Description                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------- |
| [`inspect`](access-inspect-command.md) | Inspect allows you to expand a serialized access into its constituent parts |
| [`list`](access-list-command.md)       | Prints name and associated satellite of all available accesses              |
| [`register`](access-register.md)       | Register your access for use with a hosted gateway.                         |

## Flags

| Flag           | Description     |
| -------------- | --------------- |
| `--help`, `-h` | help for access |
