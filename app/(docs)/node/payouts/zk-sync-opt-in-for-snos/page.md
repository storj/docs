---
title: ZkSync Payments
docId: 6TX_ve1PyUrXuwax-mWWw
redirects:
  - >-
    /node/dependencies/storage-node-operator-payout-information/zk-sync-opt-in-for-snos
---

How to configure L2 Payments with zkSync Era

## Background

L2 scaling aligns with our goal of bringing decentralized cloud storage to the masses - via more efficient and autonomous payments.

Here are a few of the benefits of receiving payouts through this approach:

**Better Scalability**

With zkSync Era, payouts will consume less block space on the Ethereum network because transactions are bundled together and processed in batches. The system is currently capable of processing 2000 transactions per second!

**Lower Layer 2 Transfer Fees**

ZkSync also dramatically lowers network transfer fees (compared to Layer 1 fees) for operators sharing their hard drive space and bandwidth on the Storj network. ZkSync Era accounts are tied to your existing Ethereum keys and current transaction fees on L2 are as low as \~0.000543 ETH at 210 Gwei. As the zkSync Era ecosystem grows, interoperability between projects and exchanges means even more savings. These fees can be reinvested in the community, creating new incentives for network operators to drive growth.

**Pay Network Fees in STORJ Token**

One of the most interesting things about zkSync Era is it supports "gasless meta-transactions" that allow users to pay transaction fees in the tokens being transferred. For example, if you want to transfer STORJ from L2 to an exchange, smart contract, or other address, there is no need for you to own ETH or any other tokens.

[Introducing zkSync Era starting from July 2023!](https://forum.storj.io/t/july-5-2023-ethereum-layer-1-and-zksync-payouts-for-the-month-of-june-are-complete/23167?u=alexey)

## Get Started and Opt-in

To opt-in to [zkSync Era](https://zksync.io/) you need to do a simple change in your Node configuration by following these steps:

## Binary versions (include Windows/Linux GUI)

Open your storage node's `config.yaml` (see [](docId:gDXZgLlP_rcSW8SuflgqS)) and add/change the line

```yaml
operator.wallet-features: ['zksync-era']
```

{% callout type="warning"  %}
Please enter everything in lowercase and double-check for spelling mistakes. This is a very basic implementation without any validations.
{% /callout %}

Once you have added/updated the line to your config file, save it and restart your node.

## Docker versions

If you use a docker version, you can also specify the `zksync-era` wallet feature as an option after the image name, for example:

```shell
docker run ... storjlabs/storagenode:latest --operator.wallet-features=zksync-era
```

{% callout type="warning"  %}
Please enter everything in lowercase and double-check for spelling mistakes. This is a very basic implementation without any validations.
{% /callout %}

If you decided to specify the `zksync-era` wallet feature as an option, you need to stop and remove the container and run it back with all your parameters include added option for wallet feature, otherwise you can just restart the container.

## How to check the opt-in for zkSync Era

1. Navigate to your personal web-dashboard

   You should see an indication of zkSync enabled:

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/1dzgaZpKadOoLc2krD5Y1_image.png)

1. Opt-in for zkSync Era payouts for STORJ payments

1. Navigate to [zkSync Bridges](https://zksync.io/explore#bridges).
   See also [How to add STORJ token to my Wallet](See https://forum.storj.io/t/zksync-era-to-transfer-storj-in-binance-wallet/26119/10?u=alexey).

1. Connect your L1 Ethereum wallet

   If you have problems accessing your wallet, you might want to change your payout address to an address that you can access (for which you control the private keys).

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/RjsNN11_jBcPfwXP7FLsU_image.png)

   zkSync Era supported wallets:

   - WalletConnect, an open source protocol for connecting decentralized applications to mobile wallets.
   - hardware wallets like Trezor/Ledger
   - software wallets like Metamask, MEW, Fortmatic, Portis, Oper, Dapper, Lattice, Torus and many other.
   - see also https://docs.zksync.io/build/tooling/wallets.html

zkSync Era enables our Storage Node Operators to more easily interact directly with the world of DeFi through solutions like ZigZag, Curve, Uniswap V3, and others.

We are excited to share this update around payment scaling with our community of operators. If you have any questions about using zkSync Era, check out our documentation.

**If you have ideas, or would like to talk with the team, please feel free to [reach out on our forum](http://forum.storj.io)**.

You can read more about our approach to storage node payouts in general [here](docId:DVKqtMtnBdZ99gFRWCojP).

## Understanding zkSync Era fee

The fee for transaction on zkSync Era (L2 -> L1) can be checked on the [Bridge](https://portal.zksync.io/bridge/withdraw)

# Transfer tokens from zkSync Era to Ethereum

1.  Navigate to [txSync zkSync Era Bridge](https://app.txsync.io/bridge)

2.  Connect your Etherum Wallet

    ![](https://link.storjshare.io/raw/jvdvvzqjy5sncsehbjh6frkgb46a/docs%2Fimages%2FtxSync-zkSync-Era-WalletConnect.png)

3.  Configure your Wallet to use the zkSync Era Mainnet, following wizard for the chosen Wallet, if you did not already.

4.  Sign the connection

    ![](https://link.storjshare.io/raw/juoh36vchvhrapbh7mhpzj7rc7aa/docs%2Fimages%2FtxSync-zkSync-Era-Sign.png)

5.  Select the STORJ token both for the transfer and the fee, specify an amount and provide a destination Ethereum address

    ![](https://link.storjshare.io/raw/juuomyaaekbsqeuj7eybu5r7wnoq/docs%2Fimages%2FtxSync-zkSync-Era-withdraw.png)

6.  Confirm your selection by button **Continue**.

7.  You will need to sign a transaction in your connected Wallet to transfer your tokens to the provided address.
