# Billing Test Environment

This is a guide on how to setup a dev/test environment for the billing system of satellites.

We will setup storj-sim and connect it to the staging Stripe and CoinPayments accounts.

## Prepare the local code for testing

1. Clone the following repositories, if you haven't done yet:
  - https://github.com/storj/storj
  - https://github.com/storj/tardigrade-satellite-theme
2. Replace the cryptocurrency for payments from STORJ to [LTCT](https://www.coinpayments.net/help-testnet):
```sh
sed -i 's/coinpayments\.CurrencySTORJ/coinpayments.CurrencyLTCT/g' $HOME/storj/satellite/payments/stripecoinpayments/tokens.go
```
3. Copy the Tardigrade satellite theme:
```sh
cp -r $HOME/tardigrade-satellite-theme/europe-west-1/* $HOME/storj/web/satellite/
```
4. Build the satellite GUI:
```sh
cd $HOME/storj/web/satellite
npm install
npm run build
cd $HOME/storj
```
5. Build storj-sim:
```sh
go install ./...
```

## Setup and run storj-sim

Check [Storj Test Network](https://github.com/storj/docs/blob/master/Test-network.md) on how to setup and run storj-sim.

After executing the `storj-sim network setup` command, open the satellite's config.yaml (located at `~/.local/share/storj/local-network/satellite/0/config.yaml`) and enable the following configuration:
```yaml
payments.provider: stripecoinpayments
payments.stripe-coin-payments.stripe-public-key: ask-littleskunk-on-keybase
payments.stripe-coin-payments.stripe-secret-key: ask-littleskunk-on-keybase
payments.stripe-coin-payments.coinpayments-private-key: ask-littleskunk-on-keybase
payments.stripe-coin-payments.coinpayments-public-key: ask-littleskunk-on-keybase
```
Ask littleskunk on Keybase for the actual keys for staging Stripe and CoinPayments accounts.

Now you can start storj-sim with the `storj-sim network run` command.

**NOTE:** To create Access Grant you will need satellite Node ID. To find it search `storj-sim` logs and look for line like this: 
```
storagenode/1                  1ac27vuf38 09:41:21.159 | DEBUG	contact:endpoint	contact/endpoint.go:52	pinged	{"by": "1aE3vja9wQv7UXqAD91ecwj1rjoWBTiRLkbaNjp3EnqqnMmktE", "srcAddr": "127.0.0.1:44040"}
```
Field `by` will be the satellite Node ID.

## Create new user and login

1. Open the satellite GUI in your browser: http://localhost:10002
1. Click the `Create Account` button at the top right corner.
1. Enter user name, email, and password. The email does NOT need to be valid.
1. Accept the Term of Service and click the `Create Account` button.
1. The "Account Created" page will be displayed stating that a confirmation email has been sent. In fact, no email has been sent and the account does NOT need to be confirmed.
1. Click on the `Login` button and login with the new user.

## Add credit card

DO NOT use real credit or debit cards for testing purposes!

Check the [Stripe documentation](https://stripe.com/docs/testing) for testing credit card numbers like `4242 4242 4242 4242`.

These testing credit card numbers work if storj-sim is configured with our staging Stripe account. They won't work on the production satellites.

## Add STORJ payment

For testing purposes it is recommended to use the [LTCT](https://www.coinpayments.net/help-testnet) cryptocurrency instead of STORJ. Using LTCT involves absolutely no cost for the transaction.

In the first section of this document we patched the source code of the satellite to use LTCT instead of STORJ.

### Setup a CoinPayments account

One easy way to be able to make transactions in LTCT is to make your own account on [CoinPayments](https://www.coinpayments.net).

You don't need to complete the KYC work with LTCT.

### Request LTCT coins

After you setup the account, you can request LTCT coins by [clicking here](https://www.coinpayments.net/login?return=acct_req_ltct).

10 LTCT coins will be added immediately to your wallet.

You can check the balance of your LTCT coins in the [dashboard](https://www.coinpayments.net/acct-home).

### Deposit LTCT coins to the satellite account

1. On the satellite initiate a payment with STORJ by selecting an amount in USD and clicking the `Continue to CoinPayments` button.
1. A new web page to CoinPayments pops up displaying the details for completing the transaction.
1. Go to [your wallet](https://www.coinpayments.net/acct-balances) in CoinPayments.
1. Find the LTCT coin in the list.
1. Select `LTCT Options` > `Send / Withdraw`.
1. Enter the amount in LTCT. The amount should be exactly the same as requested by the CoinPayments popup from step 2. Do not enter any value for USD.
1. Enter the Litecoin Testnet address. The address should be exactly the same as requested by the CoinPayments popup from step 2.
1. Click the `Request Withdrawal/Send` button.
1. Check your inbox for a new email and confirm the transaction. It takes a few minutes for the transaction to confirm.
1. In a few minutes the CoinPayments popup from step 2 will display that the transaction is payed.
1. In a few more minutes the payment will be reflected on the satellite too.

## Find user on Stripe

You need to request login information to our staging Stripe account from Brandon.

Once you login, switch the `View test data` toggle on the left-side menu.

Now you can search for your test users by email.

## Simulate usage for past month

1. Create a bucket, upload a file, and download it.
1. Restart storj-sim to trigger Tally service faster.
1. Edit the `created_at` column in the `projects` DB table to simulate the project was created earlier.
1. Edit the `created_at` column in the `stripe_customers` DB table to simulate that the stripe customer was created earlier.
1. Edit one or more records in the `bucket_bandwidth_rollups` DB table:
   1. The records should have `action` of type `2` which means "download".
   1. Change the time in the `interval_start` column to match the desired billing period.
   1. Change the `allocated` and `settled` columns to match the desired Egress value in bytes.
1. Edit at least two adjucent records (one is not enough) in the `bucket_storage_tallies` DB table:
   1. Change the time in the `interval_start` column to match the desired billing period.
   1. Change the `object_count` column to the maximum possible value (e.g. `420000000`) to generate some noticeable Object-Month usage.
   1. Change the `remote` column to some big value (e.g. `356673702400000000`) to generate some noticeable GB-Month usage.

## Create invoices

Invoices for the past month can be created with by executing these satellite commands (order matters):

```
satellite --config-dir ~/.local/share/storj/local-network/satellite/0 --log.level info billing prepare-invoice-records 04/2020

satellite --config-dir ~/.local/share/storj/local-network/satellite/0 --log.level info billing create-invoice-items 04/2020

satellite --config-dir ~/.local/share/storj/local-network/satellite/0 --log.level info billing create-invoice-coupons 04/2020

satellite --config-dir ~/.local/share/storj/local-network/satellite/0 --log.level info billing create-invoice-credits 04/2020

satellite --config-dir ~/.local/share/storj/local-network/satellite/0 --log.level info billing create-invoices 04/2020
```
The invoices will be created in Draft state and can be found in the Stripe account.

## Revert invoices

To revert the changes done by the invoice generating commands:

1. Delete the draft invoices in Stripe.
1. Delete any pending invoice items Stripe. Pending invoice items might be left if the last `create-invoices` commands has not been executed.
1. Delete the records for the respective billing period from the `stripecoinpayments_invoice_project_records` DB table.
1. Delete the records for the respective billing period from the `credits_spendings` DB table.
1. Delete the records for the respective billing period from the `coupon_usages` DB table.
1. Change the `status` to `0` for the respective records in the `coupons` DB table.
