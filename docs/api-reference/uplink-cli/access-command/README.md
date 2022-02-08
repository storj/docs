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

| Command                                | Description                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| `create`                               | Create an access from a setup token. `uplink setup` is an alias for this.            |
| `delete`                               | Delete an access from local store                                                    |
| `import`                               | Save an existing access. `uplink import` is an alias for this.                       |
| [`inspect`](access-inspect-command.md) | Inspect allows you to expand a serialized access into its constituent parts          |
| [`list`](access-list-command.md)       | Prints name and associated satellite of all available accesses                       |
| [`register`](access-register.md)       | Register an access grant for use with a hosted S3 compatible gateway and linksharing |
| `restrict`                             | Restrict an access                                                                   |
| `revoke`                               | Revoke an access                                                                     |
| `use`                                  | Set default access to use                                                            |

## Flags

| Flag           | Description     |
| -------------- | --------------- |
| `--help`, `-h` | help for access |
