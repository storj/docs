---
description: >-
  An application that allows you to access Object Storage from the command line.
  Use this tool to upload and manage objects and buckets.
---

# Uplink CLI



{% hint style="info" %}
To setup `uplink` see [Prerequisites](../../getting-started/quickstart-uplink-cli/prerequisites.md).
{% endhint %}

The `uplink` command can take the following child commands:

| Command                                                | Description                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| [access-command](access-command/ "mention")            | set of commands to manage accesses                               |
| [cp-command.md](cp-command.md "mention")               | copy a file from outside of Storj bucket to inside or vice versa |
| [ls-command.md](ls-command.md "mention")               | List objects and prefixes or all buckets                         |
| [uplink-mb-command.md](uplink-mb-command.md "mention") | make a new bucket                                                |
| [meta-command](meta-command/ "mention")                | metadata related commands                                        |
| [mv.md](mv.md "mention")                               | moves a Storj object to another location in Storj DCS            |
| [rb-command.md](rb-command.md "mention")               | remove a bucket                                                  |
| [rm-command.md](rm-command.md "mention")               | remove a file from a Storj bucket                                |
| [setup-command.md](setup-command.md "mention")         | create an uplink config file                                     |
| [share-command.md](share-command.md "mention")         | shares restricted access to objects                              |

## Flags

| Flag                  | Description                                     |
| --------------------- | ----------------------------------------------- |
| `--advanced`          | if used in with `-h`, print advanced flags help |
| `--config-dir string` | main directory for uplink configuration         |
