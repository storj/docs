---
title: Debits Against Payment Methods
docId: '-rKjIYI_qQVmhCaGTdo9D'
redirects:
  - >-
    /dcs/billing-payment-and-accounts-1/storj-token/debits-against-payment-methods
---

If you have an amount due, your payment methods will be debited in the following order (the order of operations is entirely programmatic):

1.  **Coupon** - Any valid Coupon on an account will first be used to pay an invoice amount. If the entire invoice is paid with Coupons, no further debits are made in that billing cycle. If, after all Coupons are exhausted in a billing cycle, a balance on an invoice remains, the balance will be debited using the next available payment method;

2.  **Credits** - After applying any Coupons, any valid Credit on an account will then be used to pay an invoice amount. If the entire invoice is paid from the amount of valid Credits on an account, no further payment is needed. If, after all Credits are exhausted in a billing cycle, a balance on an invoice remains, the balance will be debited to the next available payment method;

3.  **STORJ Token Balance** - After applying any Coupons and Credits, any valid STORJ token balance on an account will then be used to pay an invoice amount. If the entire invoice is paid from the amount of STORJ token balance on an account, no further payment is needed. If, after all STORJ token balance is exhausted in a billing cycle, a balance on an invoice remains, the balance will be debited to the next available payment method;

4.  **Credit Card** - After applying any Coupons, Credits, or STORJ token available, any valid credit card on an account will then be used to pay an invoice amount. If the entire invoice is paid from a credit card on an account, no further payment is needed. If a credit card payment is partially or fully rejected, and a balance on an invoice remains, the user will be notified by email registered to the registered email address on the account of the unpaid balance that must be paid.

All unpaid balances must be paid via a valid payment method in a billing cycle. Note that, if there is no valid payment method on an account, and a new payment method is not added within a reasonable amount of time, we reserve the right to reduce account usage limits to zero and/or reclaim the available resources (the storage space and bandwidth made available by Storage Node Operators to the Storj network) and delete your data stored on the network pursuant to our data retention policy.
