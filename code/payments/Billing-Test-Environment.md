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
5. Build the storagenode GUI:
```sh
cd $HOME/storj/web/satellite
npm install
npm run build
cd $HOME/storj
```
6. Build storj-sim:
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

## Create new user

1. Open the satellite GUI in your browser: http://localhost:10002
1. Click the `Create Account` button at the top right corner.
1. Enter user name, email, and password. The email does NOT need to be valid.
1. Accept the Term of Service and click the `Create Account` button.
1. The "Account Created" page will be displayed stating that a confirmation email has been sent. In fact, no email has been sent and the account does NOT need to be confirmed.
1. Click on the `Login` button and login with the new user.
