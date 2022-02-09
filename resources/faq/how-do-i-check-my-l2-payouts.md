---
description: You opted-in for L2 (zkSync)
---

# How do I check my L2 zkSync payouts?

If you [opted-in for zkSync](../../dependencies/storage-node-operator-payout-information/zk-sync-opt-in-for-snos.md), you can check your payout in three ways:

## Payout section on the Dashboard

You can click the **View on zkScan** button on the main page of your web-dashboard (see [Dashboard for CLI](../../setup/cli/dashboard.md) and [Dashboard for GUI](../../setup/gui-windows/dashboard.md)), as shown in the screenshot of the dashboard _Payout section_ below. This will send you to your zkSync wallet page where you can review the latest L2 payout transactions received.

![Payout section of the web-dashboard](<../../.gitbook/assets/image (40).png>)

{% hint style="info" %}
If you do not see the notification "zkSync is opted-in", then you did not enable zkSync in the configuration of the node. See [Configuring zkSync Payments](../../dependencies/storage-node-operator-payout-information/zk-sync-opt-in-for-snos.md) how to opt in.
{% endhint %}

## Payout Information

Open your web-dashboard (see [Dashboard for CLI](../../setup/cli/dashboard.md) and [Dashboard for GUI](../../setup/gui-windows/dashboard.md)), navigate to the _Payout_ section and click the _Payout Information_ link. Scroll down to the _Payout History_ section and expand any of the satellites. You should see a _Transaction_ link. If you click on it - it will open the corresponding transaction on [https://zkscan.io](https://zkscan.io) if you opted-in for zkSync and received payout on L2. If you did not opt in to zkSync, the _Transaction_ link will show your L1 payout on  [https://etherscan.io](https://etherscan.io).

![Fig. Payout History section of the Payout Information window](<../../.gitbook/assets/image (41).png>)

{% hint style="info" %}
If you do not see the _Transaction_ link, then your node has not received payout receipts from the satellites yet. You need to wait at least 24 hours after the payout for the previous month has been completed to see it.
{% endhint %}

## Check your wallet on zkscan.io

And finally, you can open [https://zkscan.io](https://zkscan.io), put your wallet address in the search field and click the **Search** button.
