---
title: Wallet address for storagenode
docId: 66d6c295-53e4-4308-9cde-1c6193155f52
metadata:
  title: ERC20-compatible wallet address for STORJ tokens
  description: Learn what is valid wallet address to receive STORJ ERC20 tokens.
redirects:
  - /hc/en-us/articles/360029700972-Wallet-address-for-storagenode
---
Here is walkthrough for one of the popular software wallet - [https://MyEtherWallet.com](https://MyEtherWallet.com) . The following step will let you create a valid STORJ token address if you do not already have one. If you already have a compatible STORJ payout address, or an address made with another ERC20 compatible wallet such as Metamask, Parity or Mist, you can skip this article.

First we will add a STORJ ERC20 payout address. STORJ is the name of the token which is used to pay the Operators for renting out their storage space. STORJ has a monetary value and divisibility which makes it suitable as a means of payment. To create a new payout address, you can use any compatible ethereum wallet; we use [https://www.myetherwallet.com/ (MEW)](https://www.myetherwallet.com/) here as example. There are many other options available; Storj Labs does not endorse any particular wallet, please choose the one you are most comfortable with.

You have three options how to create a new wallet on MEW site

1. mobile application
![](https://link.storjshare.io/raw/jwdgkkb45jf3qbxeehfmdu6b23kq/docs/images/PIA-storagenode/mceclip3.png)
2. keystore file
![](https://link.storjshare.io/raw/jwdgkkb45jf3qbxeehfmdu6b23kq/docs/images/PIA-storagenode/mceclip2.png)
3. mnemonic phrase
![](https://link.storjshare.io/raw/jwdgkkb45jf3qbxeehfmdu6b23kq/docs/images/PIA-storagenode/mceclip1.png)
 

# Create wallet using keystore file
On the MEW website, enter a strong password of your liking into the "Enter a password" field and then click on "Create New Wallet", see **Figure 3.1.**

![Creating a payout address with MyEtherWallet using keystore file](https://link.storjshare.io/raw/jwdgkkb45jf3qbxeehfmdu6b23kq/docs/images/PIA-storagenode/mceclip2.png)

***Figure 3.1.** Creating a payout address with MyEtherWallet using keystore file.*

Now download the *Keystore File* and save it to a safe location (e.g. a USB flash drive) and be sure to make multiple backups of your passphrase and Keystore file in different locations to assure that you will not accidentally lose it.. **Also do not forget to write down the password for the Keystore file you entered in the previous step**. Next click on *Download Keystore file*

![Download the Keystore file](https://link.storjshare.io/raw/jwdgkkb45jf3qbxeehfmdu6b23kq/docs/images/PIA-storagenode/mceclip5.png)

***Figure 3.2.** Download the Keystore file.*

# Create wallet using mnemonic phrase
![Creating wallet using mnemonic phrase](https://link.storjshare.io/raw/jwdgkkb45jf3qbxeehfmdu6b23kq/docs/images/PIA-storagenode/mceclip6.png)

***Figure 3.3.** Creating wallet using mnemonic phrase*

Write down your mnemonic phrase or print it. Then click on **I Wrote Down My Mnemonic Phrase** to continue. Then wallet will do a little exam for you. You need to fill missed words from your mnemonic phrase. See **Figure 3.4**

![Verification](https://link.storjshare.io/raw/jwdgkkb45jf3qbxeehfmdu6b23kq/docs/images/PIA-storagenode/mceclip7.png)

***Figure 3.4.** Verification*

![Verification was successful](https://link.storjshare.io/raw/jwdgkkb45jf3qbxeehfmdu6b23kq/docs/images/PIA-storagenode/mceclip8.png)

***Figure 3.5.** Verification was successful*

# Please Note:
{% callout type="danger"  %}
Do NOT use an exchange wallet address, the micropayments wont work with an exchanges' deposit addresses.

You could lose your payments, if you would use an exchanges' deposit address instead of your wallet.
{% /callout %}
