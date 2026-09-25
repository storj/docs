---
title: Payment Methods
docId: 7U4_uu6Pzg6u2N6FpV9VE
redirects:
  - /dcs/billing-payment-and-accounts-1/storj-token
metadata:
  title: Payment Methods and Policies
  description:
    Learn about the payment methods accepted by Storj, the process for
    adding a payment method, and unique guidelines for using credit card and USDC
    for payments.
---

Storj accepts the following several payment methods:

1.  Credit Card

2.  USDC - a US dollar stablecoin (ERC20 token on the Ethereum blockchain)

3.  Google Pay (available only in the browser logged in to your Google Account with enabled Google Pay)

4.  Apple Pay (available only in the Safari browser)

5.  Bank payment method (availability varies by region)

6.  Online payment link in the Open invoice

---

## How To Add A Payment Method

Once you have created a user account and a project, registered users are required to add a payment method before storing data on Storj. Payment methods are added from the [](docId:Hurx0SirlRp_O5aUzew7_) section of the user interface.

Begin by selecting "Billing" from the "My Account" dropdown menu at the left bottom corner of your dashboard.

## Using a Credit Card

You can select to **Add New Card** to add a Card to your account on the **_Billing - Payment Methods_** screen. You will be prompted to specify Card details.

On this screen you can also use a Google Pay payment method, it become available if you use a browser logged in to a Google Account with enabled Google Pay.

The Apple Pay payment method is available only in the Safari browser.

Bank payment method may also be available here (availability varies by region).

You’ll be prompted to add your card information. Using a credit card is somewhat self-explanatory, but there are some key points users should understand:

- When paying for their cloud storage bill with a credit card, users will be charged every month at the end of the billing period.

- The billing period is a period of time starting at 00:00:00 UTC on the first day of the month and finishing at 23:59:59 UTC on the last day of the month. This means that, for example, users in the United States, whose application incorporating Uplink interacts with a Satellite to upload files at 10:00 PM EST on the last day of the month, will be charged for their usage in the following billing period.

- Users can add multiple credit cards, but only one can be the default method of payment.

- A default credit card can only be deleted once all usage has stopped on the account, all data is removed, and any outstanding balance is paid. To remove a credit card from an account, any outstanding balance must be paid prior to contacting our support team to request that the card be removed.

- Up to one full billing cycle may be required prior to the removal of all payment methods.

- Once all payment methods are removed from an account, usage limits will be reset to zero until a new payment method is added.

- If a credit card expires, a user will receive a notification to the registered email on the account, however, if a new payment method is not added within a reasonable amount of time, we reserve the right to reclaim the available storage and bandwidth, reset usage limits to zero and delete any data stored on the account pursuant to our data retention policy.

## Using USDC

In addition to credit cards, users may also pay for usage fees with USD Coin (USDC). USDC is a stablecoin issued by a third party that is designed to hold a value of one US dollar. It is an ERC20 token on the Ethereum blockchain.

Making payments with USDC is a different process than using a credit card. When using USDC as your payment method, you commit to using a pre-payment model, which means you must first deposit USDC to your account. Each USDC you deposit is added to your account balance as one US dollar.

{% callout type="info"  %}
Please note that your deposit address can accept only USDC transactions on the Ethereum network (L1). zkSync, other Layer 2 networks and other blockchains are not supported and will result in loss of funds. Tokens other than USDC, including STORJ, sent to the deposit address will not be credited to your account.
{% /callout %}

{% callout type="info"  %}
Important: If a user does not want to add a credit card but wants to pay only via USDC, they should exclusively deposit USDC and should not add a credit card to their account because, once a credit card is added as a payment method, it can only be removed by closing the account or requesting removal of the credit card after adding USDC, using the support process defined in this documentation.
{% /callout %}

Depending on the amount of platform usage and the usage limits configured on your account, you may be required to keep a minimum deposit of USDC on your account to ensure monthly usage fees are paid in full each billing cycle.

To deposit USDC in an account, open a **_Payment Methods_** tab on the **Billing** page and click **Add USDC**, then use the provided deposit address to deposit USDC on the Ethereum network.

{% callout type="info"  %}
Important: The deposit address generated for your account is a deposit-only address to prepay for usage on the Storj Platform. Users are not able to remove or otherwise withdraw tokens from this address. Any request for a refund or return of an unused prepaid deposit must follow the support process [](docId:LX9pqXsAduR8LEaEiX_It).
{% /callout %}

If the USDC balance runs out, a user will receive a notification to the registered email on the account. However, if a new payment is not added within a reasonable amount of time, Storj reserves the right to reduce account usage limits to zero and/or reclaim the available storage and bandwidth resources and delete your data stored on the network pursuant to our data retention policy.

## Using Online payment link in the Open invoice
This option is available only in the Opened unpaid invoices. You need to download the invoice PDF from the Billing History and open it, then click the Online payment link.
There you could also use a different Card, a Wire bank transfer, Google Pay, Apple Pay and Amazon Pay.
