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

| Command                        | Description                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| [`access`](access-command/)    | set of commands to manage accesses                               |
| [`cat`](cat-command.md)        | output a file to standard-out                                    |
| [`cp`](cp-command.md)          | copy a file from outside of Storj bucket to inside or vice versa |
| [`help`](help-command.md)      | help about any command                                           |
| [`import`](import-command.md)  | imports an access into configuration                             |
| [`ls`](ls-command.md)          | List objects and prefixes or all buckets                         |
| [`mb`](uplink-mb-command.md)   | make a new bucket                                                |
| [`meta`](meta-command/)        | metadata related commands                                        |
| [`put`](put-command.md)        | writes data from standard-in to a file in a Storj bucket         |
| [`rb`](rb-command.md)          | remove a bucket                                                  |
| [`revoke`](revoke.md)          | revoke an access grants to objects                               |
| [`rm`](rm-command.md)          | remove a file from a Storj bucket                                |
| [`share`](share-command.md)    | shares restricted access to objects                              |

## Flags

| Flag                  | Description                                     |
| --------------------- | ----------------------------------------------- |
| `--advanced`          | if used in with `-h`, print advanced flags help |
| `--config-dir string` | main directory for uplink configuration         |
