---
title: Can Storj use a different blockchain for payments?
docId: 3a5981b3-588a-49ca-98d0-3eb7a2421af7
redirects:
  - /hc/en-us/articles/360060646012-Can-Storj-use-a-different-blockchain-for-payments
---
Currently, none of the blockchains really solve the issue of high transaction costs. While there is a small user base, transaction fees on any blockchain may be low, but once they become more popular, they will face the same issue of scaling. There is a lot of discussion about how to address high fees for Layer 1 transactions on the Ethereum blockchain, which is currently one used by many popular projects. And for good reason. No other developer community can match ETH, which comes with a lot of upsides. Storj is committed to the Ethereum platform to take advantage of its many opportunities and great developer community.

Switching blockchains would either mean you end up on a less popular blockchain which makes it less secure, and harder for customers and node operators to use as it would most likely be relying on a less active developer community. Or you may get lucky and pick the blockchain of the future, which will then be overloaded and most likely, eventually run into the exact same scaling issues.

The Ethereum roadmap actually has a lot of promising developments to alleviate the scaling issues it’s facing now, zk-rollups being one of them. Right now the best approach is to use a Layer 2 solution like zkSync instead of taking a gamble on a less proven blockchain.


Our project already experienced moving blockchains in the past, where we migrated the Counterparty based SJCX token (running on the Bitcoin blockchain) to the  STORJ ERC-20 token on the Ethereum blockchain at the time when Bitcoin had run into scaling issues making Counterparty token transactions very expensive to send. While initially the move alleviated the issue with transaction fees, now the Ethereum blockchain is experiencing the same scaling issues and high fees. So, the best approach is to use a Layer 2 solution like Rollups ([zkSync](docId:6TX_ve1PyUrXuwax-mWWw) in particular), until Ethereum releases version 2.0 to further address scaling issues.


Thanks to René Smeekes (@BrightSilence) for summarizing all reasons in one [post](https://forum.storj.io/t/move-storj-to-the-xrpl-for-faster-payouts/13404/8?u=alexey).
