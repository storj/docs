---
title: Can Storj use a different blockchain for payments?
docId: 3a5981b3-588a-49ca-98d0-3eb7a2421af7
redirects:
  - /hc/en-us/articles/360060646012-Can-Storj-use-a-different-blockchain-for-payments
---
Currently, none of the blockchains really solve the issue of high transaction costs. While there is a small user base, transaction fees on any blockchain may be low, but once they become more popular, they will face the same issue of scaling. There is a lot of discussion about how to address high fees for Layer 1 transactions on the Ethereum blockchain, which is currently one used by many popular projects. And for good reason. No other developer community can match ETH, which comes with a lot of upsides. Storj is committed to the Ethereum platform to take advantage of its many opportunities and great developer community.

Switching blockchains would either mean you end up on a less popular blockchain which makes it less secure, and harder for customers and node operators to use as it would most likely be relying on a less active developer community. Or you may get lucky and pick the blockchain of the future, which will then be overloaded and most likely, eventually run into the exact same scaling issues.

Ethereum's roadmap actually contains many promising developments to address the scaling issues it has faced in the past, and zk-rollups are one of them. Some time ago, the best approach was to use a second-layer solution like zkSync Era, rather than risk using a less-proven blockchain.

Our project has already experienced blockchain migration in the past, when we migrated the Counterparty-based SJCX token (running on the Bitcoin blockchain) to the ERC-20 STORJ token on the Ethereum blockchain at a time when Bitcoin was experiencing scaling issues that made transactions with Counterparty tokens very expensive. While this migration initially mitigated the transaction fee problem, the Ethereum blockchain subsequently began to experience the same scaling issues and high fees. Therefore, we briefly used a second-layer solution such as Rollups (specifically zkSync Era) until Ethereum released version 2.0 to further address the scaling issues.
We have now [deprecated Layer 2](https://forum.storj.io/t/sunsetting-zksync-for-storagenode-payouts/32513) as Layer 1 fees have become acceptable. Payouts to Storage Node Operators and customer deposits now use USDC on the Ethereum blockchain (Layer 1) instead of the STORJ token.

Thanks to René Smeekes (@BrightSilence) for summarizing all reasons in one [post](https://forum.storj.io/t/move-storj-to-the-xrpl-for-faster-payouts/13404/8?u=alexey).
