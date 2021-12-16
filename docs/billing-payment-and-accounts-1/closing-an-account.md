---
description: Closing an account on a Storj DCS Satellite
---

# Closing an Account

We want all of our users to receive value when they choose the Storj DCS Platform for their storage needs, but it’s possible that a user may no longer need Storj DCS services. If a user wants to stop using an account and permanently delete the account, the user may submit a request for this only after following the steps outlined below to eliminate platform usage.

The process to eliminate platform usage starts with deleting all data from the platform, including all objects and buckets. Next, all Access Grants should be deleted. Once this is done, the user should submit a support ticket to remove all payment methods and delete the account.&#x20;

Note that in order to verify the deletion request is legitimate, the user will need to confirm they control the email address used for the account in question. Therefore, the user should file their support ticket while signed in to their [Storj help desk](https://supportdcs.storj.io/hc/en-us) account. If the user does not yet have a help desk account, they should sign up first before filing their account deletion request. Support agents will be happy to remove the help desk account once the Storj DCS account deletion has been completed.\
\
\
The account deletion request ticket should specify the following:

1. State that all data has been deleted (Buckets, Objects)
2. State that all Access grants have been deleted
3. Identify the &#x20;
   1. Satellite
   2. Project Name
   3. User Account Email
   4. Payment Method(s)
4. Confirm that the outstanding balance is $0.00
5. State that the account should be deleted&#x20;

{% hint style="info" %}
If you uses the [Objects browser](../getting-started/quickstart-objectbrowser.md) in the [Admin console](../getting-started/satellite-developer-account/), then after deleting the last bucket please do not return to the [Objects view](../getting-started/satellite-developer-account/objects.md), otherwise the `demo-bucket` will be created automatically. This bucket will prevent the account deletion. It also can create a linked Access grant, this will prevent the account deletion too.
{% endhint %}

Once the ticket is received and the information has been verified, the payment method(s) will be removed before the end of the next billing cycle. Once all payment methods are removed from the account, the account will be deleted per the request. Note: The user will be required to verify the request via the registered email address on the account.
