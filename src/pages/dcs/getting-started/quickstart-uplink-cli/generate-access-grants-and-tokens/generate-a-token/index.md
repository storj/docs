---
title: Create Access Grant in CLI
slug: getting-started/quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-07-11T03:10:07.193Z
docId: OXSINcFRuVMBacPvswwNU
---

## Introduction

Create an Access Grant in the Uplink CLI with Satellite and API Key info from  the Satellite Admin Console

1.  You need to have a satellite account and installed Uplink CLI.

2.  To start, proceed through the initial steps of creating a new Access Grant.

3.  Navigate to **Access** page and click the **Create Keys for CLI** link (rightmost option).

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/A-FVBJUPSoGo5PefsWReo_access-grants01.png)

4\. Provide name, permissions and optionally buckets, select **Create Keys**.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/MDufnxlBjkqF4aA2sox0j_access-grants02.png)

5\. Copy and save the **Satellite Address** and **API Key** in a safe place or download them as they will only appear once.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/5nn_fN9lmg9VauZZ5S1ks_access-grants03.png)

6\. Make sure you've already [](docId\:hFL-goCWqrQMJPcTN82NB)  and run `uplink setup`.

:::codeblocktabs
```windows
./uplink.exe setup
```

```macos
uplink setup
```

```linux
uplink setup
```
:::

{% callout type="info"  %} 
For anyone who has previously configured an Uplink, please use a named access. If you want to replace the default access, you need to either specify the `--force` flag to the `uplink setup` command or [](docId\:b4-QgUOxVHDHSIWpAf3hG) and use the `uplink access import` command with `--force` flag to import it, or use the `uplink access create --import-to <name>` command with `--force` flag to create an Access Grant in CLI and import it to the specified access in the local store of Uplink.
{% /callout %}

7\. Follow the prompts. When asked for your API Key, enter it (you should have saved it in step 4 above).

8\. Generate the Access Grant by running `uplink access restrict` with no restrictions.

{% callout type="info"  %} 
&#x20;If you chose an access name, you'll need to specify it in the following command as `--access=name`
{% /callout %}

:::codeblocktabs
```windows
./uplink.exe access restrictt --readonly=false
```

```macos
uplink access restrict --readonly=false
```

```linux
uplink access restrict --readonly=false
```
:::

{% callout type="danger"  %} 
Keep your full-rights Access Grant secret, it contains the encryption key and will enable uploading, downloading or deleting your data from the entire project!
{% /callout %}

9\. Your Access Grant should have been output.&#x20;

{% callout type="success"  %} 
The alternative for using the `uplink setup` command and then `uplink access restrict` is to use the `uplink access create` command instead, it will print the Access Grant right away.
{% /callout %}

