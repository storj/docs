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

| **Payment Category**  | **Rates as of Dec 1st, 2023** |
| --------------------- | ----------------------------- |
| Storage (per TB Mo)   | $1.50                         |
| Egress (per TB)       | $2.00                         |
| Audit/Repair (per TB) | $2.00                         |

All payments are made pursuant to the terms specified in the [Node Operator Terms & Conditions](https://www.storj.io/node-operator-terms-conditions).

For a detailed understanding of how TB is defined, please see [here](docId:59T_2l7c1rvZVhI8p91VX#object-storage).

## Related FAQ

[How do I estimate my payouts per Satellite?](docId:2tLLmAjix5YnHHa1oflQp)

[How do I estimate my potential earnings for a given amount of space and bandwidth?](docId:bG8Q88XbTvEPkzsuc02T8)

## Minimum payment thresholds

All Storage Node payouts are subject to a per-wallet minimum threshold. We will not send a transaction where the fee for the transaction is more than 25% of the value of the transaction. The minimum threshold is calculated based on the average transaction fee value in USD from the previous 12 hours at the beginning of the payout process. For example, if the average transaction fee is the equivalent of $12.50, we’ll pay out all wallet addresses that have earned $50.00 and above.

{% callout type="info"  %}
One of the reasons our terms and conditions require you to share the same wallet address across any storage nodes you operate is to avoid missing the minimum payout threshold and to help you avoid transaction costs.
{% /callout %}

For wallet addresses that have earned less than the threshold, the earned payout will be included the following month, as long as the aggregate amount of payouts owed meets the minimum threshold at the time payouts are sent. In the example above, all Node Operators that earn less than $50.00 would have their payouts rolled into their payout the following month.

If a wallet address has no more active storage nodes associated with it (due to graceful exit, disqualification, etc), funds that did not clear previous thresholds will be dispersed.

### Payment options

Storage node operators have two options for payment, and these options impact what the transaction fee is.

- Ethereum layer 1 - these are the default transactions, but have much higher fees, and therefore higher minimum payout thresholds ($50 wouldn't be surprising here, depending on current fees).

- zkSync layer 2 - these are new. You can opt in to them, and the fees are much lower, therefore, there will be much lower minimum payout thresholds ($1 wouldn't be surprising here, depending on current fees).

{% callout type="info"  %}
Both of these options will (for now) happen on a monthly schedule. We are committing to get the prior month's payments out before the 15th of the following month.
{% /callout %}

{% callout type="warning"  %}
If you are running multiple storage nodes, the payment method you select will apply to the individual storage nodes separately. For instance, if you have four nodes, two using default layer 1 transactions, and two using zkSync, then you will receive two payouts, one on layer 1 for those two nodes, and one through zkSync for the zkSync enabled ones.

**IMPORTANT**: These will be considered two separate payouts for purposes of reaching the minimum threshold.
{% /callout %}

## Ethereum layer 1 transactions

The default behavior is for us to transmit funds using Ethereum layer 1 (standard ERC20 transactions) for our STORJ token. This fee is calculated using the Ethereum gas costs of similar transactions, the gas to ETH conversion prices, and the price of ETH.

These transaction fees are typically much higher than layer 2 transactions (see below), and thus incur a much higher minimum payout threshold.

{% callout type="info"  %}
**Example calculation for layer 1 transaction:**

At a gas price of 274 GWei, with a per-transaction Gas cost of 36508, a transaction costs .01 ETH, which at an ETH price of $1714 is $17.14 per transaction. We will not send a transaction where the fee is more than 25% of the overall transmitted value. That means the minimum payout threshold would be $68.56.
{% /callout %}

## zkSync layer 2 transactions

Any node operator running [v1.22.2](https://github.com/storj/storj/releases/tag/v1.22.2) or later also can opt into zkSync Layer 2 transactions to receive payouts. zkSync is new technology and comes with some additional risk. You can read more about why we've chosen [](docId:6TX_ve1PyUrXuwax-mWWw) here.

{% callout type="warning"  %}
We will use this type of transaction when possible, but we may revert to layer 1 transactions (and associated minimum payout thresholds) if circumstances require.
{% /callout %}

The main benefit of zkSync is a much lower L2 transaction fee, and therefore a much lower minimum payout threshold. Low earning wallet addresses will get payouts at a more frequent schedule with zkSync.

The main consideration with this method is that if the node operator wants to withdraw their funds from layer 2 back to layer 1 (for an exchange address of an exchange that does not yet support zkSync or similar), they will have to pay a transaction fee for that withdrawal. This withdrawal fee can be paid in STORJ, but may be more than a standard layer ERC20 transfer.

{% callout type="success"  %}
Transaction fees can be paid using STORJ in zkSync, so no ETH will be needed for zkSync transactions.
{% /callout %}

- Read about how to opt-in to [](docId:6TX_ve1PyUrXuwax-mWWw).

- You can read more about zkSync in general [here](https://zksync.io).

## General advice

{% callout type="danger"  %}
Always control your private keys to your wallet.
{% /callout %}

While it may be convenient to use an exchange address for your storage node payout, it's always safest to use an address for which you control the private keys. If you opt to use zkSync, you definitely want to use an address for which you control the private keys. Withdrawing your funds from zkSync is designed for use with wallets for which you control the private keys. If you use an address from an exchange or for which you otherwise don't have the private keys, you will be required to trigger an emergency withdrawal process, and this will be significantly more costly for you.
