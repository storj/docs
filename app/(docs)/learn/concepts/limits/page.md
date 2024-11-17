---
title: Usage Limits
docId: Zrbz4XYhIOm99hhRShWHg
redirects:
  - /dcs/concepts/limits
metadata:
  title: Understanding Storj Usage Limits
  description:
    Explains the usage limits for pro accounts in Storj, including
    project number, bucket quantity, storage capacity, egress bandwidth, and request
    rate. Also discusses the rationale behind these limits and how to request limit
    increases.
---

Usage Limits allow us to ensure a consistent level of service for all customers. We have established limits for usage per Project on all Storj Satellites. All limits are set to default values as follows:

## PRO Account (Paid Tier)

Adding a valid Payment method will result in your per-project limits being automatically raised to Pro Account limits:

- 3 projects

- 100 buckets per project

- 25 TB storage per project

- 100 TB egress bandwidth per project

- 100,000,000 segments

- 100 request per second rate limit

- 1 write per second to the same object name

- Secure Custom Domains (HTTPS) for Linksharing

### Credit Card Payment method

{% callout type="warning"  %}
Please note: some Debit cards maybe accepted too, but prepaid cards are not supported.
{% /callout %}

### STORJ token Payment method

Adding $10 or more worth of STORJ tokens to your account deposit address will automatically upgrade your account to PRO and you will also receive a bonus of 10% of the deposit amount on your balance.

{% callout type="info"  %}
Please note: The deposit address currently only accepts transactions with ERC20 STORJ tokens on Ethereum mainnet or zkSync Era (note that **zkSync Lite is not supported**).
{% /callout %}

### Google Pay Payment method
You can also add Google Pay as a payment method, it's available when you select **Add Card** on the _**Payment Methods**_ tab of the [**Billing**](docId:Hurx0SirlRp_O5aUzew7_) page in the desktop or mobile browsers logged in to the Google Account with enabled Google Pay.

### Bank account Payment method
Available banks depending on the used region. Use the **Add Card** button on the _**Payment Methods**_ tab of the [**Billing**](docId:Hurx0SirlRp_O5aUzew7_) page.

### Online Payment Link in the invoice
You can also use a payment link in the Open invoices (invoices are available on [_**Billiing History**_](docId:Hurx0SirlRp_O5aUzew7_) tab)

## Rationales behind limits

Most cloud infrastructure providers impose storage and bandwidth limits as a normal part of capacity planning and to ensure achievement of SLAs. In distributed and decentralized storage systems they are equally important, if not more so. Like any provider, the aggregate amount of available storage and bandwidth must be shared across all users. With a distributed and decentralized storage system like Storj, the storage and bandwidth are provided by a network of third parties running storage node software. One of the key aspects to success is the balance of supply and demand. If too many users over-utilize available resources, the user experience will be poor.

If there are too many storage nodes, there won’t be enough use to provide a meaningful ROI for Storage Node Operators. This can lead to storage node churn, increasing load on the network, and potentially impacting durability. Usage limits are one of the tools that maintain the balance.

We set rate limits between the uplink and the satellite to ensure good service for all uplink users. Without the rate limit, users could inadvertently consume most of the database resources available on the satellite and cause issues for other users. We selected a limit that would be mostly unnoticed by end users (as the typical use case shouldn’t hit the limit). The current default limits are based on requests per second for all meta info calls: list, get, delete, put.

We set the default limits for the number of buckets per project to ensure performance.

In addition, we limit the number of Projects per Developer Account to minimize complexity.

We have also set the default limit for the number of segments to a healthy level for the network. Note that increasing the Segment Project Limit may incur additional fees. Read more about [](docId:A4kUGYhfgGbVhlQ2ZHXVS).

Customers can request a limit increase when needed by filling out the [limit increase request form](https://supportdcs.storj.io/hc/en-us/requests/new?ticket_form_id=360000683212) on our Storj support portal.

An automatic limit increase to Pro Account can be accomplished by adding a credit card or STORJ tokens (more or equal to $10) as a payment method. Please only make such requests if your use case requires more than the current default limits.
