---
title: Payout
docId: DVKqtMtnBdZ99gFRWCojP
redirects:
  - /node/dependencies/storage-node-operator-payout-information
weight: 10
---

## Introduction

Storage Node Operators are compensated for the resources that are used by Storj Satellites for their nodes every month. Our payout policy and details can be found on the [Storage Node Operator Terms and Conditions](https://storj.io/storj-operator-terms/). In the event of a conflict between this documentation and Node Operator Terms & Conditions, the Node Operator Terms & Conditions shall govern.

## Understanding How Storage Nodes are Paid on the Storj Network

This document explains how storage node operators are paid for the data they store and the bandwidth that is utilized by Storj. Storage node operators are paid for the resources actually used on the service by Storj Labs-operated satellites. Any satellites operated by third parties not associated with Storj Labs may be subject to different terms, rates and payment methodologies.

## Paid Resources

Storj nodes share underutilized hard drive capacity and bandwidth with the Storj network and are paid when users store and retrieve data. Storj nodes are paid for the following items based on the calculations described below:

**Storage of Storage Materials on Space** - use of storage space on storage node by the Storj satellites and users is calculated in GB hours per month and is paid monthly at the rates specified below;

**Egress related to Uplink Clients** - egress bandwidth used when users retrieve data from the the network via applications is calculated in GB of bandwidth actually utilized and is paid monthly at the rates specified below;

**Egress related to file repair** - egress bandwidth used when Storj satellites retrieve data from storage nodes for the purpose of file repair is calculated in GB of bandwidth actually utilized and is paid monthly at the rates specified below; and

**Audit Bandwidth** - egress bandwidth used when Storj satellites retrieve data from storage nodes to perform an audit is calculated in GB is paid monthly at the rates specified below.

## Exclusions

Storage Node Fees will not be paid for the following Storage Node usage:

**Storage of Garbage Data** – storage of data on a Storage Node that was not removed by the Storage Node following deletion of such Storage Data by an Uplink Client (“**Garbage Data**”) where such data will otherwise be removed via the Storage Services garbage collector function; and

**Other Resources** - Company will not pay for any other resources not specifically identified above.

## Published Storj Satellite Payout Rates

The following table includes the current Storj Satellite payout rates.

| **Payment Category**       | **Rates as of Sep 1st, 2026** |
| -------------------------- | ----------------------------- |
| Storage (per TB per Month) | $1.35                         |
| Egress (per TB)            | $1.00                         |
| Audit/Repair (per TB)      | $1.00                         |

All payments are made pursuant to the terms specified in the [Node Operator Terms & Conditions](https://www.storj.io/node-operator-terms-conditions).

For a detailed understanding of how TB is defined, please see [](docId:59T_2l7c1rvZVhI8p91VX#object-storage).

## Related FAQ

[How do I estimate my payouts per Satellite?](docId:2tLLmAjix5YnHHa1oflQp)

[How do I estimate my potential earnings for a given amount of space and bandwidth?](docId:bG8Q88XbTvEPkzsuc02T8)

[](docId:6xwcyBYTMDNojI58mxXSd)

## Minimum payment thresholds

All Storage Node payouts are subject to a per-wallet minimum threshold. We will not send a transaction where the fee for the transaction is more than 25% of the value of the transaction. The minimum threshold is calculated based on the average transaction fee value in USD from the previous 12 hours at the beginning of the payout process. For example, if the average transaction fee is the equivalent of $12.50, we’ll pay out all wallet addresses that have earned $50.00 and above.

{% callout type="info"  %}
One of the reasons our terms and conditions require you to share the same wallet address across any storage nodes you operate is to avoid missing the minimum payout threshold and to help you avoid transaction costs.
{% /callout %}

For wallet addresses that have earned less than the threshold, the earned payout will be included the following month, as long as the aggregate amount of payouts owed meets the minimum threshold at the time payouts are sent. In the example above, all Node Operators that earn less than $50.00 would have their payouts rolled into their payout the following month.

In case of a final payout when you gracefuly exited or shutdown all nodes but the Undistributed amount is not enough to clear a [Minimum Payout Threshold](#minimum-payment-thresholds) on Ethereum (L1), then you will be forced to wait until fees on L1 would become lower or run a new node using the same wallet address to allow to collect enough funds to clear the Minimum Payout Threshold.

### Payment options

Storage node operators have two options for payment, and these options impact what the transaction fee is.

- Ethereum layer 1 - these are the default transactions, but have much higher fees, and therefore higher minimum payout thresholds ($50 wouldn't be surprising here, depending on current fees).

- zkSync layer 2 - these are [sunset on September 1, 2026](https://forum.storj.io/t/sunsetting-zksync-for-storagenode-payouts/32513). Starting September 1, 2026 all opted-in wallets will receive a payout via layer 1 (Ethereum), if the unpaid amount would clear a [minimum payout threshold](#minimum-payment-thresholds).

## Ethereum layer 1 transactions

The default behavior is for us to transmit funds using Ethereum layer 1 (standard ERC20 transactions) for our STORJ token. This fee is calculated using the Ethereum gas costs of similar transactions, the gas to ETH conversion prices, and the price of ETH.

{% callout type="info"  %}
**Example calculation for layer 1 transaction:**

At a gas price of 274 GWei, with a per-transaction Gas cost of 36508, a transaction costs .01 ETH, which at an ETH price of $1714 is $17.14 per transaction. We will not send a transaction where the fee is more than 25% of the overall transmitted value. That means the minimum payout threshold would be $68.56.
{% /callout %}

## zkSync layer 2 transactions

[zkSync Era layer 2 payout method is sunset on September 1, 2026](https://forum.storj.io/t/sunsetting-zksync-for-storagenode-payouts/32513). Starting September 1, 2026 all opted-in wallets will receive a payout via layer 1 (Ethereum), if the unpaid amount would clear a [minimum payout threshold](#minimum-payment-thresholds).

## General advice

{% callout type="danger"  %}
Always control your private keys to your wallet.
{% /callout %}

While using an exchange address for payouts from your storage node can be convenient, it's always safer to use an address whose private keys you control. Please note that if you used zkSync, starting September 1, 2026, you will receive payouts to your Ethereum Level 1 address. Therefore, please ensure you are able to receive these funds to your exchange address or [update it](docId:65905400-c86d-40f3-a078-b476a522c4c5) as soon as possible.

If you are a EU resident, you will be eligible to confirm the source address of funds due to MiCA changes, due to this mandatory requirement it's not possible for you to use the exchange address as your wallet address in the node's configuration at all, see the [relarted thread](https://forum.storj.io/t/getting-payed-to-kraken-address-with-mica/30295) on the forum.
