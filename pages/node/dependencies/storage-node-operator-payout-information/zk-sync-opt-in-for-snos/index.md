---
title: ZkSync Payments
createdAt: 2022-05-24T21:21:40.000Z
updatedAt: 2023-03-25T04:00:44.000Z
docId: 6TX_ve1PyUrXuwax-mWWw
redirects:
  - >-
    /dcs/dependencies/storage-node-operator-payout-information/zk-sync-opt-in-for-snos
---

## Introduction

How to configure L2 Payments with zkSync

# Background

&#x20;L2 scaling aligns with our goal of bringing decentralized cloud storage to the masses - via more efficient and autonomous payments.

Here are a few of the benefits of receiving payouts through this approach:

**Better Scalability
**With zkSync, payouts will consume less block space on the Ethereum network because transactions are bundled together and processed in batches. The system is currently capable of processing 2000 transactions per second!&#x20;

**Lower Layer 2 Transfer Fees
**ZkSync also dramatically lowers network transfer fees (compared to Layer 1 fees) for operators sharing their hard drive space and bandwidth on the Storj network. ZkSync accounts are tied to your existing Ethereum keys and current transaction fees on L2 are as low as \~0.000543 ETH at 210 Gwei. As the zkSync ecosystem grows, interoperability between projects and exchanges means even more savings. These fees can be reinvested in the community, creating new incentives for network operators to drive growth.

**Pay Network Fees in STORJ Token
**One of the most interesting things about zkSync is it supports "gasless meta-transactions" that allow users to pay transaction fees in the tokens being transferred. For example, if you want to transfer STORJ from L2 to an exchange, smart contract, or other address, there is no need for you to own ETH or any other tokens.

## Get Started and Opt-in

To opt-in to zkSync you need to do a simple change in your Node configuration by following these steps:

## Binary versions (include Windows/Linux GUI)

Open your storage node's `config.yaml`  (see [](docId\:gDXZgLlP_rcSW8SuflgqS)) and add the line&#x20;

```Text
operator.wallet-features: ["zksync"]
```

{% callout type="warning"  %} 
Please enter everything in lowercase and double-check for spelling mistakes. This is a very basic implementation without any validations.
{% /callout %}

Once you have added the line to your config file, save it and restart your node.

### Docker versions

If you use a docker version, you can also specify the `zksync` wallet feature as an option after the image name, for example:

```Text
docker run ... storjlabs/storagenode:latest --operator.wallet-features=zksync
```

{% callout type="warning"  %} 
Please enter everything in lowercase and double-check for spelling mistakes. This is a very basic implementation without any validations.
{% /callout %}

If you decided to specify the `zksync` wallet feature as an option, you need to stop and remove the container and run it back with all your parameters include added option for wallet feature, otherwise you can just restart the container.

### How to check the opt-in for zkSync

Navigate to your personal web-dashboard, you should see an indication of zkSync enabled:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/1dzgaZpKadOoLc2krD5Y1_image.png)

After opting-in for zkSync payouts for STORJ payments, gather your ETH address and private key, navigate to the zkSync Wallet ([zkSync](https://wallet.zksync.io)), and connect your L1 ethereum wallet. If you have problems accessing your wallet, you might want to change your payout address to an address that you can access (for which you control the private keys).

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/v9sY9cshLe8VaRagulnyL_image.png)

**Supported Wallets:** zkSync supports WalletConnect, an open source protocol for connecting decentralized applications to mobile wallets. The protocol also supports hardware wallets like Trezor/Ledger and software wallets like Metamask, Fortmatic, Portis, Oper, Dapper, Lattice and Torus.

Finally, zkSync enables our Storage Node Operators to more easily interact directly with the world of DeFi through solutions like Curve, Numio, Uniswap V3, and others.

**We are excited to share this update around payment scaling with our community of operators.  If you have any questions about using zkSync, check out our documentation. If you have ideas, or would like to talk with the team, please feel free to** [**reach out on our forum**](http://forum.storj.io)**.**

You can read more about our approach to storage node payouts in general here: [](docId\:DVKqtMtnBdZ99gFRWCojP).&#x20;

## Understanding zkSync fees

Matter Labs runs an API for calculating transfer fees. Here's an example session to determine the *Layer 2 to Layer 1 withdrawal fee*:

```Text
curl -X POST -H 'Content-type: application/json'   -d '{
     "jsonrpc":"2.0",
     "id":1, "method": "get_tx_fee",
     "params": ["Withdraw", "0x80a52B7F26426d2b16578FC5f376c349F54772A7", "STORJ"]
     }'   https://api.zksync.io/jsrpc | jq
```

Sample output:

```Text
{
  "jsonrpc": "2.0",
  "result": {
    "feeType": "Withdraw",
    "gasTxAmount": "52700",
    "gasPriceWei": "121000000437",
    "gasFee": "3197359019",
    "zkpFee": "1192017",
    "totalFee": "3190000000"
  },
  "id": 1
}
```

This tells us that at a gas price of approximately 121 GWei, the withdrawal fee is about 31.9 STORJ. Note that this is only an example, actual fees will vary depending on current STORJ-ETH exchange rates.

Here is an example of a *Layer 2 to Layer 2 transfer fee*:

```curl
curl -X POST -H 'Content-type: application/json'   -d '{
    "jsonrpc":"2.0",
    "id":1, "method": "get_tx_fee",
    "params": ["Transfer", "0x80a52B7F26426d2b16578FC5f376c349F54772A7", "STORJ"]
    }'   https://api.zksync.io/jsrpc | jq
```

Sample output:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "feeType": "TransferToNew",
    "gasTxAmount": "1980",
    "gasPriceWei": "121000000437",
    "gasFee": "120128480",
    "zkpFee": "1192017",
    "totalFee": "121300000"
  },
  "id": 1
}
```

This tells us that at a gas price of approximately 121 Gwei, the transfer fee would be about 1.2 STORJ.

You may also check the activation fee for your wallet address:

```curl
curl -X POST -H 'Content-type: application/json'   -d '{
     "jsonrpc":"2.0",
     "id":1, "method": "get_tx_fee",
     "params": [{"ChangePubKey": "ECDSA"}, "0x80a52B7F26426d2b16578FC5f376c349F54772A7", "STORJ"]
     }'   https://api.zksync.io/jsrpc | jq
```

The sample output:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "feeType": {
      "ChangePubKey": "ECDSA"
    },
    "gasTxAmount": "13900",
    "gasPriceWei": "13005559236",
    "gasFee": "116631168",
    "zkpFee": "1682808",
    "totalFee": "118300000"
  },
  "id": 1
}
```

This tells us that at a gas price of approximately 117 Gwei, the activation fee would be about 1.18 STORJ.

You can learn more in the [zkSync Documentation](https://zksync.io/api/).

## Send tokens from zkSync (L2) to Ethereum (L1)

If you want to withdraw your tokens from your zkSync L2 wallet address to any L1 address, you need to reconnect your L1 Ethereum wallet to zkSync with [zkSync Wallet](https://wallet.zksync.io/) - once connected, it will show your L2 token balance as shown below.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/2T412XEJbR6ct77KAHkbf_image.png)

Now click the **Send** button, and in the next window, you can send to Ethereum (L1).

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/zfVDt95aDBynMKXGqFeke_image.png)

Click the **Send to Ethereum (L1)** link.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/Tc282I8s85oFj6LS006xf_image.png)

In the ***Send to Ethereum*** window you can select or specify the L1 address that should receive the tokens you are sending in the *Address* field. This field will display your own L1 wallet address by default (which is the same as on L2), but you can change it to any other L1 address. For example, if you plan to immediately sell the tokens, you could choose an exchange's STORJ deposit address. This will allow you to directly withdraw STORJ from your L2 zkSync wallet address to an exchange L1 deposit address in one single transaction.

To select a different address from your **Contacts**, you can click on the **Own account\[v]** link.

This window also allows you to change which type of token to use to pay for the withdrawal fee. So if you are sending STORJ, by default part of your STORJ balance will be used for paying the withdrawal fee, but you can also select ETH for example, if you have sufficient ETH in the same wallet address to pay the withdrawal fee. To change the type of token to use for paying the gas fees, click the **Change fee token** button and select a different token.

{% callout type="info"  %} 
Currently, zkSync requires users to pay a one-time activation fee for registering your address to zkSync, as this requires an on-chain transaction (you can elect to pay it with your STORJ tokens rather than ETH). See [What is the activation fee on zkSync](https://zksync.io/faq/faq.html#what-is-the-account-activation-fee).
{% /callout %}

### Complete Send to Ethereum

1.  Replace the destination address with the one you want to send the tokens to. You can save the entered address to **Contacts** later.

2.  Click the **Select token** button and select STORJ

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/fD8Y4jyeOdz8aul3hdrKi_image.png)

3\. Enter the amount you want to send into the **Amount** field. You will see a transaction fee, [one-time activation fee](https://zksync.io/faq/tutorials.html#account-activation) (only the first time you make a send to Ethereum), and the estimated fee values expressed in the token you selected (STORJ) and its equivalent value in USD.&#x20;

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/_ovdKR6XU52dfKhKbfZQk_image.png)

4\. Authorize the *Send to Ethereum* by pressing the **Authorize to Send to Ethereum** button. You will be asked for confirmation in your Wallet.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/DDdoHwRMilkIwTdbOUytP_image.png)

5\. Confirm sending by pressing the **Send to Ethereum** button. You should be able to verify the withdrawal transaction was successful in **History**.

See also [Send Funds to Ethereum](https://zksync.io/faq/tutorials.html#send-funds-to-ethereum) for details.
