---
description: Decentralized Cloud Storage for Decentralized Digital Asset Registration
---

# NFT storage for OpenSea

Storj DCS makes it easy for NFT (Non-Fungible Token) creators and developers to store their digital art, music, and videos on the decentralized cloud via Storj DCS.

## Getting Started with NFT Storage on Storj DCS

In this tutorial, we’re going to cover three main steps:

1. Upload your Digital Asset to Storj DCS
2. Create a public LinkShare link to your digital asset
3. Register your NFT with the link to the asset

Before we get started, here’s some background information on NFTs for context. Or skip the background and [take me to the tutorial!](nft-storage.md#tutorial)

## Background

This tutorial covers a couple of approaches for developers and creators minting Non-Fungible Tokens (NFTs) for digital assets, to store and serve those digital assets from Storj DCS, the leading decentralized cloud storage provider. In this example, we’re going to use OpenSea for the NFT registration. In principle, the same method could also be applied to storing NFTs issued on any of the other available NFT minting platforms.

Right now, any OpenSea developer can use the coupon code **OPENSEA100** for $100 in STORJ Credit. This would be useful to any developer who signs up to use Storj DCS with the OpenSea SDK and wants to grow beyond our free 50GB tier. This promotion is available to the first 100 developers to register the coupon code on any Storj DCS Satellite account, and is good for two billing cycles. The coupon code is redeemable until December 31st, 2021.

![](<../.gitbook/assets/Screen Shot 2021-09-02 at 3.05.57 PM.png>)

NFTs enable developers and creators to register ownership of a unique digital asset on the blockchain. NFTs are best understood as providing digitally native ownership of images, videos, or PFPs (Profile Pictures), or can be digital representations of asset ownership for real estate etc.

An NFT is just a registration of ownership - for digital objects, owners need a secure, decentralized method to store the associated jpg, mp4, or other files the NFT is to be associated with. Storj DCS provides secure, private storage on the decentralized cloud that is ideal for NFTs:

* Fully encrypted data and metadata for digital assets
* Multiple options for developing web or mobile apps for storing and sharing digital assets
* Ultra-secure and private file sharing options
* Simple public sharing URLs with revocable access
* Native support for media streaming

### What is OpenSea?

OpenSea is an open marketplace and developer toolkit for NFTs. NFTs are blockchain tokens associated with a cryptographic keypair to represent ownership of unique items.

### What are NFTs?

NFT contracts such as ERC721 and ERC1155, let us tokenize things like art, collectibles, and even real estate. They can only have one official owner at a time and, in case of ERC721 and ERC1155, are secured by the Ethereum blockchain – no one can modify the record of ownership or copy/paste a new NFT into existence.

### What does the OpenSea SDK do?

The OpenSea SDK enables developers to easily access the OpenSea orderbook, filter it, create buy orders (offers), sell orders (auctions) or collections of assets to sell at once (bundles), and to complete trades programmatically.

### Why would I store my NFT on the decentralized cloud?

* It’s more available than centralized alternatives like AWS (data stored on Storj DCS is broken into redundant erasure codes across the globe)
* Storj DCS is faster than Kademlia-based networks (like BitTorrent or IPFS)
* It’s 80% less expensive than Amazon S3

### Tutorial

If you haven’t already registered for a Storj DCS account, you're going to need to take care of that upfront. [Instructions are easy to follow](../getting-started/satellite-developer-account/creating-your-account.md).

Now that you’ve got your account squared away, let’s upload your digital asset and create a linkshare link. For this tutorial, we’re just going to use the web interface in the Satellite admin console, but you can also use our [CLI](../api-reference/uplink-cli/share-command.md), one of the [libraries or bindings](../api-reference/storj-client-libraries/), our [S3 compatible gateway](../api-reference/s3-compatible-gateway/), or an app like [FileZilla](set-up-filezilla-for-decentralized-file-transfer.md) or [Rclone](sync-files-with-rclone/).

If you want a little more context about the different components and constructs in Storj DCS, you can read [a quick article on the information architecture](../concepts/key-architecture-constructs.md).

#### Okay, let’s do this.

1. Create a Storj DCS account. ([storj.io/signup](http://storj.io/signup))
2. Create a [Project](../getting-started/satellite-developer-account/dashboard.md)
3. Navigate to [the Object Browser](../getting-started/quickstart-objectbrowser.md)
4. Create a Bucket
5. Upload a file by dragging and dropping your digital asset into the bucket via the browser
6. Generate a Linkshare for URL hosting using Storj Object Browser or CLI share command
   1. Click the 3 dot button to the right of your object and choose _Share_
   2. Click _Generate Share Link_
   3. Copy the Share Link and click _Done_
7. You can interact with your digital asset across the Decentralized Cloud in a number of ways
   1. ​​To download content directly, use /raw/ in the Linkshare URL ex: [https://link.us1.storjshare.io](https://link.us1.storjshare.io/raw/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4)[**/raw/**](https://link.us1.storjshare.io/raw/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4)[ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4](https://link.us1.storjshare.io/raw/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4)
   2. To view the digital asset in the object map that shows the location of the storage nodes storing the encrypted and erasure-coded pieces, use /s/ in the Linkshare URL ex: [https://link.us1.storjshare.io](https://link.us1.storjshare.io/s/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4)[**/s/**](https://link.us1.storjshare.io/s/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4)[ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4](https://link.us1.storjshare.io/s/ju34skavohcqezr6vlfgshg5nmjq/dwebdemo/isthataquestion.mp4)
8. Create the NFT on OpenSea and use the raw content link as external link for NFT Metadata
   1. Use the OpenSea GUI: [https://opensea.io/collections](https://opensea.io/collections)
   2. Or developer SDK here: ([https://docs.opensea.io/docs/2-adding-metadata](https://docs.opensea.io/docs/2-adding-metadata))
