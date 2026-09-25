---
title: How do I hold USDC? What is a valid address or compatible wallet?
docId: a045be02-e05a-11ef-9338-6045bd1fa4e3
metadata:
  title: How do I hold USDC? What is a valid address or compatible wallet?
  description: Learn how you can hold USDC and what is valid address or a compatible wallet
redirects:
  - /hc/en-us/articles/360026611692-How-do-I-hold-STORJ-What-is-a-valid-address-or-compatible-wallet
  - /hc/en-us/articles/360026611692-How-do-I-hold-STORJ-What-is-a-valid-address-or-compatible-wallet-
  - /hc/en-us/articles/360026611692
---
Payouts are made in USDC, an ERC-20 token running on the Ethereum platform. In order to receive and hold your USDC payouts, you should use an ERC-20 compatible wallet to which you hold the private key yourself. Several options are available:
* [mycrypto](https://mycrypto.com/)
* [MyEtherWallet](https://www.myetherwallet.com/)
* [MetaMask](https://metamask.io/)

You may also access a hardware wallet such as Trezor or Ledger Nano S from mycrypto or MyEtherWallet. This is the preferred and safest way to store your USDC.

There are many more wallets available for ERC20 tokens - we only listed a few above that have proven to be most reliable/popular and offer good setup instructions and help sites.

It is very important to note that an exchange address is not a valid address unless it is of the type that enables you to hold the private key yourself (decentralized exchange).

Furthermore, please be sure that the ethereum address you use when you configure your storage node is one created by the wallet you choose.

{% callout type="danger" %}
**Do not use a token smart contract address as your payout address**, such as the USDC contract 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 or the STORJ Token contract 0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC. If you accidentally have specified such an address in your storage node configuration as payout address, you will not be able to withdraw your funds as you are not controlling the private keys of this address yourself. If you discover that you have accidentally used the wrong payout address, please follow [these instructions](docId:bMlttgapdFJxCNAULJDIv) to change the payout address to your own wallet address.
{% /callout %}

Storj will not be able to help you recover your funds if you have used any payout address that you do not hold the private keys of yourself.
