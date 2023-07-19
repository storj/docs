---
title: Set Up Uplink CLI with Access Grant
slug: getting-started/quickstart-uplink-cli/uploading-your-first-object/set-up-uplink-cli
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-07-19T20:59:40.762Z
docId: h3RyJymEIi4gf2S9wVJg8
---

1\. You need to have a satellite account and installed Uplink CLI as described in [](docId\:TbMdOGCAXNWyPpQmH6EOq)

2\. **Save the **[](docId\:b4-QgUOxVHDHSIWpAf3hG)** to a file.** The Access Grant that you created in the web interface (or [](docId\:OXSINcFRuVMBacPvswwNU)[CLI]()) needs to be saved to disk in a plain text file for simplicity (*for example - Mac terminal would not allow you to paste the whole access grant directly due terminal limitations*). Specify the path to the saved access grant in the following command (`~/Downloads/accessgrant.txt` *for example*).

3\. **Import** Access Grant.

:::::tabs
::::tab{label="Windows"}
## PowerShell

{% callout type="warning"  %} 
For security reasons it's better to use a casual user to work from the CLI, thus please run PowerShell as a casual user, not as an Administrator.
{% /callout %}

Navigate to the directory your **uplink.exe** file is located (Check the FAQ: [](docId:4qPQxa8HlvDIO1Kgqa2No) for instructions):&#x20;


```Text
./uplink.exe access import main accessgrant.txt
```
::::

:::tab{label="Linux"}
```Text
uplink access import main accessgrant.txt
```
:::

:::tab{label="macOS"}
```Text
uplink access import main accessgrant.txt
```
:::
:::::

{% callout type="warning"  %} 
Please note that **Storj Labs does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% /callout %}

Your Uplink is configured and ready to use!
