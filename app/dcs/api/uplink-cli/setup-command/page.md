---
title: setup
docId: OuoKJl9KqbJVQB9Xkdy3g
redirects:
  - /dcs/api-reference/uplink-cli/setup-command
---

Create an uplink config file

## Usage

{% code-group %}

```windows
./uplink.exe setup [flags]
```

```linux
uplink setup [flags]
```

```macos
uplink setup [flags]
```

{% /code-group %}

## Flags

| Flag                    | Description                                                                                                             |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `--auth-service string` | If generating backwards-compatible S3 Gateway credentials, use this auth service (default "https://auth.storjshare.io") |
| `-f`, `--force`         | Force overwrite an existing saved access                                                                                |
| `--use`                 | Switch the default access to the newly created one                                                                      |

## Global flags

| Flag                  | Description                                   |
| :-------------------- | :-------------------------------------------- |
| `--config-dir string` | Directory that stores the configuration       |
| `--help`, `-h`        | help for setup                                |
| `--advanced`          | when used with -h, prints advanced flags help |

## Example

1\. Start the CLI wizard.

{% tabs %}
{% tab label="Windows" %}

## PowerShell

[](docId:4qPQxa8HlvDIO1Kgqa2No).

```Text
./uplink.exe setup
```

{% /tab %}

{% tab label="Linux" %}

```Text
uplink setup
```

{% /tab %}

{% tab label="macOS" %}

```Text
uplink setup
```

{% /tab %}
{% /tabs %}

2\. Choose an access name, by default this should be left blank, so hit 'enter'

{% callout type="info"  %}
If you would like to choose your own access name, please be sure to only use lowercase letters. Including any uppercase letters will result in your access name not getting recognized when creating buckets.
{% /callout %}

```Text
Enter name to import as [default: main]:
```

3\. Enter the [](docId:OXSINcFRuVMBacPvswwNU) you generated:

```Text
Enter API key or Access grant:
```

4\. Enter the satellite address (generated when you created access grant):

```Text
Satellite address:
```

5\. Create (or use existing) an encryption passphrase and then confirm. This is used to encrypt your files on your machine before they are uploaded to the network:

```Text
Passphrase:
Again:
```

6\. (Optional) Disable encryption for object keys to enable lexicographical sort (More info: [](docId:sSBwV86liLJ--jeWCN1DB))

```Text
Would you like to disable encryption for object keys (allows lexicographical sorting of objects in listings)? (y/N):
```

7\. (Optional) Generate S3 Compatible Gateway Credentials

```Text
Would you like S3 backwards-compatible Gateway credentials? (y/N):
```

{% callout type="warning"  %}
Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% /callout %}

6\. Your Uplink is configured and ready to use!
