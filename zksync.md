# Configuring zkSync Payments

## How to configure L2 Payments with zkSync

### Background
Storj is continuously innovating to bring the decentralized cloud to the masses
We are excited to bring L2 ethereum scaling through ZK Rollups to our community.  L2 scaling aligns with our goal of bringing decentralized cloud storage to the masses - via more efficient and autonomous payments.
Here are a few of the benefits to receiving payouts through this approach:

#### Better Scalability
With zkSync, payouts will consume less block space on the Ethereum network because transactions are bundled together and processed in batches. The system is currently capable of processing 2000 transactions per second! 

#### Lower Layer 2 Transfer Fees
ZkSync also dramatically lowers network transfer fees (compared to layer 1 fees) for operators sharing their hard drive space and bandwidth on the Storj network. ZkSync accounts are tied to your existing Ethereum keys and current transaction fees are as low as ~0.000543 ETH at 210 Gwei. As the zkSync ecosystem grows, interoperability between projects and exchanges means even more savings. These fees can be reinvested in the community, creating new incentives for network operators to drive growth.

#### Pay Network Fees in STORJ Token
One of the most interesting things about zkSync is it supports "gasless meta-transactions" that allow users to pay transaction fees in the tokens being transferred. For example, if you want to transfer STORJ to an exchange, smart contract, or other address, there is no need for you to own ETH or any other tokens.

### Get Started and Opt-in
To opt-in to zkSync you need to do a simple change in your Node configuration by following these steps:
* Open your storage node's `config.yaml` (see [Where can I find the config.yaml?](https://docs.storj.io/node/resources/faq/where-can-i-find-a-config.yaml)) and add  
```
operator.wallet-features: ["zksync"]
```

---
*Please enter everything in lowercase and double-check for spelling mistakes. This is a very basic implementation without any validations.*

---

Once you have the line to your config file, save it and restart your node.
![The change to the payment method will be indicated in your personal dashboard](https://user-images.githubusercontent.com/26858949/138343309-f013facd-90a3-4bf0-8817-aad06b173595.png)

After opting-in for zkSync payouts for STORJ payments, gather your ETH address and private key, navigate to the zkSync Wallet (https://wallet.zksync.io/), and connect your ethereum account. If you have problems accessing your wallet, you might want to change your payout address to an address that you can access (for which you control the private keys).
![image](https://user-images.githubusercontent.com/26858949/138344398-bd1284a1-11fe-4e51-9ce3-1ae0bb7630ff.png)

**Supported Wallets**: zkSync supports WalletConnect, an open source protocol for connecting decentralized applications to mobile wallets.  The protocol also supports hardware wallets like Trezor/Ledger and software wallets like Metamask, Fortmatic, Portis, Oper, Dapper, Lattice and Torus.

Finally, zkSync enables our Storage Node Operators to more easily interact directly with the world of DeFi through solutions like Curve, Numio, Uniswap V3, and others.

**We are excited to share this update around payment scaling with our community of operators.  If you have any questions about using zkSync, check out our documentation. If you have ideas, or would like to talk with the team, please feel free to .**

## Understanding zkSync fees
Matter Labs runs an API for calculating transfer fees. Here's an example session to determine the Layer 2 to Layer 1 withdrawal fee:
```
curl -X POST -H 'Content-type: application/json'   -d '{
     "jsonrpc":"2.0",
     "id":1, "method": "get_tx_fee",
     "params": ["Withdraw", "0x80a52B7F26426d2b16578FC5f376c349F54772A7", "STORJ"]
     }'   https://api.zksync.io/jsrpc | jq
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

---
*Currently, zkSync requires users to pay a one-time registration fee of ~11000 gas for registering your address to zkSync, as this requires an on-chain transaction (you can elect to pay it with your STORJ tokens rather than ETH). This one-time fee should be eliminated in the near future.*

---

![Activate account](https://user-images.githubusercontent.com/26858949/138344987-a11212b7-8549-4767-8653-4e2d3c5da88d.png)


Here is an example of a Layer 2 to Layer 2 transfer fee:
```
curl -X POST -H 'Content-type: application/json'   -d '{
    "jsonrpc":"2.0",
    "id":1, "method": "get_tx_fee",
    "params": ["Transfer", "0x80a52B7F26426d2b16578FC5f376c349F54772A7", "STORJ"]
    }'   https://api.zksync.io/jsrpc | jq
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
