# Configuring zkSync Payments
**How to configure L2 Payments with zkSync**

## Background
**Storj is continuously innovating to bring the decentralized cloud to the masses**
We are excited to bring L2 ethereum scaling through ZK Rollups to our community. L2 scaling aligns with our goal of bringing decentralized cloud storage to the masses - via more efficient and autonomous payments.
Here are a few of the benefits to receiving payouts through this approach:

### Better Scalability
With zkSync, payouts will consume less block space on the Ethereum network because transactions are bundled together and processed in batches. The system is currently capable of processing 2000 transactions per second! 

### Lower Layer 2 Transfer Fees
ZkSync also dramatically lowers network transfer fees (compared to layer 1 fees) for operators sharing their hard drive space and bandwidth on the Storj network. ZkSync accounts are tied to your existing Ethereum keys and current transaction fees are as low as ~0.000543 ETH at 210 Gwei. As the zkSync ecosystem grows, interoperability between projects and exchanges means even more savings. These fees can be reinvested in the community, creating new incentives for network operators to drive growth.

### Pay Network Fees in STORJ Token
One of the most interesting things about zkSync is it supports "gasless meta-transactions" that allow users to pay transaction fees in the tokens being transferred. For example, if you want to transfer STORJ to an exchange, smart contract, or other address, there is no need for you to own ETH or any other tokens.

## Get Started and Opt-in
*To opt-in to zkSync you need to do a simple change in your Node configuration by following these steps:*

---
*Please enter everything in lowercase and double-check for spelling mistakes. This is a very basic implementation without any validations.*

---

### Binary versions (include Windows/Linux GUI)
Open your storage node's `config.yaml` (see [Where can I find the config.yaml?](https://docs.storj.io/node/resources/faq/where-can-i-find-a-config.yaml)) and add  
```
operator.wallet-features: ["zksync"]
```

Once you have the line to your config file, save it and restart your node.

### Docker versions
If you use a docker version, you can also specify the `zksync` wallet feature as an option after the image name, for example:

```
docker run ... storjlabs/storagenode:latest --operator.wallet-features=zksync
```

If you decided to specify the `zksync` wallet feature as an option, you need to stop and remove the container and run it back with all your parameters include added option for wallet feature, otherwise you can just restart the container.

### How to check the opt-in for zkSync
Navigate to your personal web-dashboard, you should see an indication of zkSync enabled:
![The change to the payment method will be indicated in your personal dashboard](https://user-images.githubusercontent.com/26858949/138343309-f013facd-90a3-4bf0-8817-aad06b173595.png)

After opting-in for zkSync payouts for STORJ payments, gather your ETH address and private key, navigate to the zkSync Wallet (https://wallet.zksync.io/), and connect your ethereum account. If you have problems accessing your wallet, you might want to change your payout address to an address that you can access (for which you control the private keys).
![zkSync Wallet](https://user-images.githubusercontent.com/26858949/138344398-bd1284a1-11fe-4e51-9ce3-1ae0bb7630ff.png)

**Supported Wallets**: zkSync supports WalletConnect, an open source protocol for connecting decentralized applications to mobile wallets.  The protocol also supports hardware wallets like Trezor/Ledger and software wallets like Metamask, Fortmatic, Portis, Oper, Dapper, Lattice and Torus.

Finally, zkSync enables our Storage Node Operators to more easily interact directly with the world of DeFi through solutions like Curve, Numio, Uniswap V3, and others.

**We are excited to share this update around payment scaling with our community of operators. If you have any questions about using zkSync, check out our documentation. If you have ideas, or would like to talk with the team, please feel free to [reach out on our forum](http://forum.storj.io/).**

## Understanding zkSync fees
Matter Labs runs an API for calculating transfer fees. Here's an example session to determine the Layer 2 to Layer 1 withdrawal fee:
```
curl -X POST -H 'Content-type: application/json'   -d '{
     "jsonrpc":"2.0",
     "id":1, "method": "get_tx_fee",
     "params": ["Withdraw", "0x80a52B7F26426d2b16578FC5f376c349F54772A7", "STORJ"]
     }'   https://api.zksync.io/jsrpc | jq
```
Example output:
```
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
This tells us that at a gas price of 121 GWei, the withdrawal fee is 31.9 STORJ.

Here is an example of a Layer 2 to Layer 2 transfer fee:
```
curl -X POST -H 'Content-type: application/json'   -d '{
    "jsonrpc":"2.0",
    "id":1, "method": "get_tx_fee",
    "params": ["Transfer", "0x80a52B7F26426d2b16578FC5f376c349F54772A7", "STORJ"]
    }'   https://api.zksync.io/jsrpc | jq
```
Example output:
```
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
This tells us that at a gas price of 121 Gwei, the transfer fee would be 1.2 STORJ
You can learn more in the [zkSync Documentation](https://zksync.io/api/).

## Withdrawal from zkSync to L1
If you want to withdraw your tokens to any L1 address, you need to connect your wallet to zkSync Wallet https://wallet.zksync.io/
![zkSync Wallet, Withdraw](https://user-images.githubusercontent.com/26858949/138349332-d6248871-73e9-453d-8ac5-454bffea3eee.png)

and click the **Withdraw** button

You may see the activation account request

1. Authorize an account:

![zkSync Wallet, authorize account](https://user-images.githubusercontent.com/26858949/138349571-fe03acea-0388-42b5-91f0-93bc98689c58.png)

2. Sign an account activation:

![zkSync Wallet, sign account activation](https://user-images.githubusercontent.com/26858949/138349770-a6a247b6-c1b1-4ab3-b093-079f6a95e220.png)

Then finally you will see a window where you can select a destination L1 address (it's the same as on L2 by default), token to withdraw and token for fee.

![zkSync Wallet, Withraw to L1](https://user-images.githubusercontent.com/26858949/138350461-53d103ca-b923-4f32-bd98-dbdc63f0335a.png)

### Complete withdrawal to L1
1. Replace the address to needed one or select it from your contacts list with button **Own account [v]**. You can save the entered address to contacts later.
2. Click the **Select token** button and select STORJ
![zkSync Wallet, Withdraw to L1, Select a token](https://user-images.githubusercontent.com/26858949/138351536-04d615fb-384b-4af8-ba6e-6f059a18bef9.png)

3. Enter amount into **Amount** field. You will see a withdrawal fee, one-time activation fee, and estimated sums in USD
![zkSync Wallet, Withdraw to L1, Amount](https://user-images.githubusercontent.com/26858949/138352317-71a843f9-957a-4c55-ac4f-7baef7e86904.png)

4. Confirm withdrawal by button **Withdraw to L1**
