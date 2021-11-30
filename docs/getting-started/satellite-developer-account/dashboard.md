---
description: >-
  The landing page for the Storj DCS Satellite Admin Console is the Project
  Dashboard.
---

# Dashboard

When you log into the Satellite Admin Console, you start on the Project Dashboard for your default Project. A Project is the basic unit for aggregating usage, calculating billing, invoicing fees,  collecting payment, and handling access management. Users can create multiple Projects and projects are invoiced separately. Within a Project, usage is tracked at the Bucket level and aggregated for invoicing to the Project. Project names are not client-side encrypted so that they may be rendered in the Satellite user interface. There are two main drivers for creating multiple Projects: access management and billing.

{% hint style="info" %}
Learn more about [Projects](../../concepts/key-architecture-constructs.md#project) in Key Architecture Constructs under Concepts.
{% endhint %}

On the Project Dashboard, there are a number of navigational elements and information displays:

![](<../../.gitbook/assets/image (176).png>)

1.  &#x20;**Projects management** - This element allows you to add Projects and switch between different Projects. There you also have a [**Manage Projects**](manage-projects.md) setting.

    ![](<../../.gitbook/assets/image (139).png>)\

2. **Project Navigation** - This element allows you to move between the different functions related to the project you have selected, to view the [**Dashboard**](dashboard.md), use the [**Objects**](objects.md) to interact with data stored on Storj DCS through a web browser interface, create [**Access**](access-grants.md) for native integrations and credentials for the [hosted S3-compatible gateway](../../api-reference/s3-compatible-gateway/), invite other developers to collaborate with you on [your Project](manage-projects.md) in [**Users**](users.md), see [**Billing**](billing.md), check [**Resources**](resources.md) and [**Quick Start**](quick-start.md), manage your Account in [**My Account**](my-account.md).\

3. **Storage Utilization** - This element displays the amount of storage utilized in the current month [measured in GB hours](../../billing-payment-and-accounts-1/pricing/billing-and-payment.md#object-storage).\

4. **Bandwidth Utilization** - This element  element displays the amount of download bandwidth utilized in the current month [measured in GB](../../billing-payment-and-accounts-1/pricing/billing-and-payment.md#bandwidth-fee).\

5. **Project Details** - This element displays the number of users added to a project, the number of [Access Grants](access-grants.md), the current number of [Buckets](../../concepts/key-architecture-constructs.md#bucket) and the [estimated charge for the current month](../../billing-payment-and-accounts-1/pricing/billing-and-payment.md).\

6. **Bucket Information** - This element displays the names of [Buckets](../../concepts/key-architecture-constructs.md#bucket), the current month usage on Buckets and the number of objects in Buckets.

Here are some links to help you get a better understand of your Satellite Admin Console and Storj DCS constructs:

{% hint style="info" %}
Learn more about [Key Architecture Constructs](../../concepts/key-architecture-constructs.md) under Concepts.

Learn more about Project [Usage Limits](../../concepts/limits.md) under Concepts.

Learn more about [adding a Payment Method](../../billing-payment-and-accounts-1/storj-token/) under Billing, Payment & Accounts.

Learn [how usage and billing are calculated](../../billing-payment-and-accounts-1/pricing/billing-and-payment.md) under Billing, Payment & Accounts.
{% endhint %}

Next we'll learn about creating/deleting buckets, uploading, downloading, viewing the object map, and sharing access to objects through the [Object Browser in the Satellite Admin Console](objects.md).

