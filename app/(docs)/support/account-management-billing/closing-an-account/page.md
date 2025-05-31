---
title: Closing an Account
docId: 1AZ8BVkKsR3a2MTEKq85b
redirects:
  - /dcs/billing-payment-and-accounts-1/closing-an-account
metadata:
  title: How to Close Your Account
  description:
    Guide to discontinuing your Storj account, including deleting all data,
    removing access grants, and submitting a support ticket to finally delete the
    account.
---

We want all of our users to receive value when they choose the Storj Platform for their storage needs, but it’s possible that a user may no longer need Storj services. If a user wants to stop using an account and permanently delete the account, the user may submit a request for this only after following the steps outlined below to eliminate platform usage.

If your free trial is expired and the account is frozen, all operations will be frozen too, include download and perhaps deletion, so, if you do not need your account anymore, you may do nothing, your frozen account will be added to the deletion queue and will be removed later automatically (the exact time interval is not determined though).

The process to eliminate platform usage starts with deleting all data from the platform, including all objects and buckets. Next, all Access Grants should be deleted. Once this is done, the user should delete all projects (via [**Project settings**](docId:k6QwBZM3hnzxkCuQxLOal)) and the account itself (via **My Account** -> **Settings**).

{% callout type="info" %}
If you have thousands objects or versions, the bucket deletion could take a lot of time via [](docId:nGzxQBhV8nx5Pukj6O0zT) (web UI) due to browsers limitations, so it's recommended to use CLI tools instead, like `uplink` CLI or `rclone`. See [](docId:b953ae01-9beb-48d3-83f7-2f6c7d07e875) for details.
{% /callout %}

{% callout type="info"  %}
If you use the [](docId:4oDAezF-FcfPr0WPl7knd) in the [](docId:nGzxQBhV8nx5Pukj6O0zT), then after deleting the last bucket please do not return to the Buckets menu, otherwise the `demo-bucket` will be created automatically. This bucket will prevent the account deletion. It also can create a linked Access grant, this will prevent the account deletion too.
{% /callout %}
