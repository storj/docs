---
description: If your node is already running, use this estimation method
---

# How do I estimate my payouts per Satellite?

If you would like to estimate how much you can expect to get paid for running your Node during a given month, please follow the instructions [here](https://support.storj.io/hc/en-us/articles/360029053531-Calculate-the-current-earnings-for-v3).

This information is also available on the [Web-dashboard](../../setup/cli/dashboard.md) (docker) or [Web-dashboard for Windows/Linux GUI](../../setup/gui-windows/dashboard.md).

The script above can be used to check the estimations displayed on the dashboard and correctness of payout. If your node is working properly, the values for both sources should almost be the same. If you find significant discrepancies - please ask on the [forum](https://forum.storj.io).

Please note that this script won't give you values as exact as what is shown on the dashboard until the payout is finished for the month in question; your actual payout may be slightly different from what you calculated for each Satellite. Also note that the script will estimate what payout you'll receive depending on how long you already have been running the Node on a Satellite. This also takes  into account the amount withheld during the initial months which is not immediately paid out.

Please see more details about held amounts in this [blog post](https://storj.io/blog/2019/01/sharing-storage-space-for-fun-and-profit/).

See also [Storage Node Operator Payout Information](../../dependencies/storage-node-operator-payout-information/) regarding the [minimum payout threshold](../../dependencies/storage-node-operator-payout-information/#minimum-payment-thresholds) and [payment options](../../dependencies/storage-node-operator-payout-information/#payment-options).
