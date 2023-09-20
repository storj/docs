---
title: Payment Methods
docId: 7U4_uu6Pzg6u2N6FpV9VE
redirects:
  - /dcs/billing-payment-and-accounts-1/storj-token
metadata:
  title: Payment Methods and Policies
  description:
    Learn about the payment methods accepted by Storj, the process for
    adding a payment method, and unique guidelines for using credit card and STORJ
    token for payments.
---

Storj DCS accepts the following two payment methods:

1.  Credit Card

2.  STORJ Token - ERC20 compatible utility token that leverages the Ethereum blockchain

---

## How To Add A Payment Method

Once you have created a user account and a project, registered users are required to add a payment method before storing data on Storj DCS. Payment methods are added from the [](docId:Hurx0SirlRp_O5aUzew7_) section of the user interface.

Begin by selecting "Billiing" from the "My Account" dropdown menu at the left bottom corner of your dashboard.

## Using a Credit Card

You can select to **Add New Payment Method** to add a Card to your account on the **_Billing - Payment Methods_** screen. You will be prompted to specify Card details.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/C4o1JavxukxpIrcIEGW-B_image.png)

You’ll be prompted to add your card information. Using a credit card is somewhat self-explanatory, but there are some key points users should understand:

- When paying for their cloud storage bill with a credit card, users will be charged every month at the end of the billing period.

- The billing period is a period of time starting at 00:00:00 UTC on the first day of the month and finishing at 23:59:59 UTC on the last day of the month. This means that, for example, users in the United States, whose application incorporating Uplink interacts with a Satellite to upload files at 10:00 PM EST on the last day of the month, will be charged for their usage in the following billing period.

- Users can add multiple credit cards, but only one can be the default method of payment.

- A default credit card can only be deleted once all usage has stopped on the account, all data is removed, and any outstanding balance is paid. To remove a credit card from an account, any outstanding balance must be paid prior to contacting our support team to request that the card be removed.

- Up to one full billing cycle may be required prior to the removal of all payment methods.

- Once all payment methods are removed from an account, usage limits will be reset to zero until a new payment method is added.

- If a credit card expires, a user will receive a notification to the registered email on the account, however, if a new payment method is not added within a reasonable amount of time, we reserve the right to reclaim the available storage and bandwidth, reset usage limits to zero and delete any data stored on the account pursuant to our data retention policy.

## Using STORJ Token

In addition to credit cards, users may also pay for usage fees with STORJ token. Storj created the STORJ utility token as a medium of exchange on its decentralized cloud storage network. The STORJ utility token facilitates payments from people around the world for their use of the Storj DCS network to store their data, and Storj uses it to pay our community of Storage Node Operators that rent their unused hard drive capacity and bandwidth to the network.

Making payments with STORJ token is a different process than using a credit card. When using STORJ as your payment method, you commit to using a pre-payment model, which means you must first deposit X amount of STORJ tokens, which will be automatically converted to Y amount of $USD based on the spot price of the token at the time of the payment transaction.

{% callout type="info"  %}
Please note that at the moment your deposit address in your account can accept only L1 (Ethereum) transactions.
{% /callout %}

{% callout type="info"  %}
Important: If a user does not want to add a credit card but wants to pay only via STORJ token, they should exclusively deposit STORJ token and should not add a credit card to their account because, once a credit card is added as a payment method, it can only be removed by closing the account or requesting removal of the credit card after adding STORJ token, using the support process defined in this documentation.
{% /callout %}

Depending on the amount of platform usage and the usage limits configured on your account, you may be required to keep a minimum deposit of STORJ token on your account to ensure monthly usage fees are paid in full each billing cycle.

We realize the STORJ token price can fluctuate, so our billing system is designed to ensure any such fluctuation does not affect the amount deposited in terms of USD. The value attributed to your account will be based on the STORJ to USD exchange rate at the time of deposit, not at the time of usage or bill payment. In other words, the account balance will be incremented by the USD equivalent of any STORJ deposit as soon as the deposit gets registered on Stripe. This is intended to minimize the potential impact of fluctuations in the STORJ token price because the price is fixed in USD on an account until the deposit balance is exhausted.

To deposit STORJ tokens in an account, open a **_Payment Methods_** tab on the **Billing** page and click **Add STORJ tokens**, then use provided deposit address to deposit STORJ tokens via L1 (Ethereum).

{% callout type="info"  %}
Important: The deposit address generated for your account is a deposit-only address to prepay for usage on the Storj DCS Platform. Users are not able to remove or otherwise withdraw tokens from this address. Any request for a refund or return of an unused prepaid deposit must follow the support process [](docId:LX9pqXsAduR8LEaEiX_It).
{% /callout %}

If the STORJ token balance runs out, a user will receive a notification to the registered email on the account. However, if a new payment is not added within a reasonable amount of time, Storj reserves the right to reduce account usage limits to zero and/or reclaim the available storage and bandwidth resources and delete your data stored on the network pursuant to our data retention policy.
