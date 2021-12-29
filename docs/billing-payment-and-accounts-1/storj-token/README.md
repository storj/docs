---
description: Paying for your platform usage with credit cards or STORJ Utility Token
---

# Payment Methods

The Storj DCS supports two payment methods—credit card and STORJ token, our ERC20 compatible utility token that leverages the Ethereum blockchain.

{% hint style="warning" %}
It is important to note that “Smart Contract" wallets such as Argent Wallet, Authereum, and Gnosis are not compatible with depositing STORJ tokens via CoinPayments. Please only send your STORJ tokens from a wallet that does not use a smart contract by default to send the tokens.
{% endhint %}

## **How To Add A Payment Method**

Once you have created a user account and a project, registered users are required to add a payment method before storing data on Storj DCS. Payment methods are added from the Billing section of the user interface.&#x20;

Begin by selecting "Billing" from the _Settings_ dropdown menu at the top of your dashboard.&#x20;

### Using a Credit Card

To use a credit or debit card, under _Payment Method_, select `Add Card`.

![](<../../.gitbook/assets/Screen Shot 2020-08-19 at 4.54.07 PM.png>)

You’ll be prompted to add your card information. Using a credit card is somewhat self-explanatory, but there are some key points users should understand:

* When paying for their cloud storage bill with a credit card, users will be charged every month at the end of the billing period.
* The billing period is a period of time starting at 00:00:00 UTC on the first day of the month and finishing at 23:59:59 UTC on the last day of the month. This means that, for example, users in the United States, whose application incorporating Uplink interacts with a Satellite to upload files at 10:00 PM EST on the last day of the month, will be charged for their usage in the following billing period.
* Users can add multiple credit cards, but only one can be the default method of payment.
* A default credit card can only be deleted once all usage has stopped on the account, all data is removed, and any outstanding balance is paid. To remove a credit card from an account, any outstanding balance must be paid prior to contacting our support team to request that the card be removed.&#x20;
* Up to one full billing cycle may be required prior to the removal of all payment methods.
* Once all payment methods are removed from an account, usage limits will be reset to zero until a new payment method is added.
* If a credit card expires, a user will receive a notification to the registered email on the account, however, if a new payment method is not added within a reasonable amount of time, we reserve the right to reclaim the available storage and bandwidth, reset usage limits to zero and delete any data stored on the account pursuant to our data retention policy.

### **Using STORJ Token**&#x20;

In addition to credit cards, users may also pay for usage fees with STORJ token. Storj created the STORJ utility token as a medium of exchange on its decentralized cloud storage network. The STORJ utility token facilitates payments from people around the world for their use of the Storj DCS network to store their data, and Storj uses it to pay our community of Storage Node Operators that rent their unused hard drive capacity and bandwidth to the network.&#x20;

Making payments with STORJ token is a different process than using a credit card. When using STORJ as your payment method, you commit to using a pre-payment model, which means you must first deposit X amount of STORJ tokens, which will be automatically converted to Y amount of $USD based on the spot price of the token at the time of the payment transaction.&#x20;

Please note that it is not necessary to open an account with CoinPayments in order to make a STORJ token deposit to your Storj DCS account. You can use the workflow below to receive the STORJ deposit address through CoinPayments, and then directly send the requested amount of STORJ token from your own wallet to that deposit address.

Also note that if a user wants to pay solely using STORJ token, they must add a minimum of $25.00 USD worth of STORJ tokens to their Storj DCS account in a single transaction to activate the account and allow usage of the Storj DCS Platform services.

Important: If a user does not want to add a credit card but wants to pay only via STORJ token, they should exclusively deposit STORJ token and should not add a credit card to their account because, once a credit card is added as a payment method, it can only be removed by closing the account or requesting removal of the credit card after adding STORJ token, using the support process defined in this documentation.

Depending on the amount of platform usage and the usage limits configured on your account, you may be required to keep a minimum deposit of STORJ token on your account to ensure monthly usage fees are paid in full each billing cycle.

We realize the STORJ token price can fluctuate, so our billing system is designed to ensure any such fluctuation does not affect the amount deposited in terms of USD. The value attributed to your account will be based on the STORJ to USD exchange rate at the time of deposit, not at the time of usage or bill payment. In other words, the account balance will be incremented by the USD equivalent of any STORJ deposit as soon as the deposit gets registered from CoinPayments. This is intended to minimize the potential impact of fluctuations in the STORJ token price because the price is fixed in USD on an account until the deposit balance is exhausted.

To deposit STORJ tokens in an account, navigate to the Payment Methods section and click on the **`Add STORJ`** button.   Next, select a prefilled USD amount to be deposited or enter any custom amount that is at least $25 and then select **`Continue to Coin Payments`**.

![](../../.gitbook/assets/STORJ\_deposit.png)

{% hint style="info" %}
Make sure that your browser is not blocking popups, as CoinPayments will open a popup window with the payment instructions, including the STORJ token deposit address and QR code.
{% endhint %}

Users are then redirected to the CoinPayments checkout page where they can find the STORJ deposit address they should send the tokens to, as well as a QR code with the address to easily scan it using a mobile wallet. On this checkout page, users will see the amount in USD that they previously selected. They will also see the corresponding number of STORJ token to deposit into the CoinPayments deposit address, which equals the deposit amount divided by the current exchange rate. Users can then deposit the indicated amount of STORJ to the address provided.

If a user adds less STORJ than the amount indicated by CoinPayments, the details on the checkout page remain valid, and users still have an opportunity to send the remaining balance for up to two hours. Users can deposit STORJ to the checkout page in multiple transactions from different wallets. If they accidentally deposit more STORJ than is required on the checkout page, then they should apply for a refund directly through CoinPayments support (https://coinpay.freshdesk.com/support/home). Storj only deposits the amount originally specified to a customer's Storj DCS accounts.

The commitment made on the checkout page expires two hours after the transaction is initiated. If the deposit is not completed within the two-hour time frame, the transaction will be canceled. If you do not deposit the full amount within the two-hour time frame, and there’s no update to your Storj DCS account balance, then you should contact CoinPayments support (https://coinpay.freshdesk.com/support/home).

![](https://lh6.googleusercontent.com/hOStPn4\_NKo1EWYxg0f-p3NVhhIMXLGdRFEOZU9ktHkFdbhB7wp82tORrRQZdk8USMlpL-c1hL0-nFEHJd8JBH\_tGMQGVJeMdknLHJ8cdSlFXf29SuLTf3tA65uW9mBamhljkBkc)

If the full amount is deposited and the transaction is confirmed, the account should update within a few hours. Within 2 hours of CoinPayments having confirmed the transaction (checkout status having changed from "pending" to "paid", the funds will be reflected in the Storj DCS account's Balance History in the Billing Section. The checkout status should change from “pending” to “paid."

If a user closes the checkout page inadvertently following the checkout process, the information can be recovered. Users have access to the transaction details via a link provided in the billing history, which stores a list of all transactions including status, details, and the link to the checkout page.&#x20;

Important: The deposit address displayed in the CoinPayments deposit wizard interface is a deposit-only address to prepay for usage on the Storj DCS Platform. Users are not able to remove or otherwise withdraw tokens from this address. Any request for a refund or return of an unused prepaid deposit must follow the support process described in this documentation.

If the STORJ token balance runs out, a user will receive a notification to the registered email on the account. However, if a new payment is not added within a reasonable amount of time, Storj reserves the right to reduce account usage limits to zero and/or reclaim the available storage and bandwidth resources and delete your data stored on the network pursuant to our data retention policy.\
\
