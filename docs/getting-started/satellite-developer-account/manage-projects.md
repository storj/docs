---
description: Manage your projects and limits
---

# Manage Projects

When you log into the Satellite Admin Console, you start on the [Project Dashboard](dashboard.md) for your default Project. A Project is the basic unit for aggregating usage, calculating billing, invoicing fees,  collecting payment, and handling access management. Users can create multiple Projects and projects are invoiced separately. Within a Project, usage is tracked at the Bucket level and aggregated for invoicing to the Project. Project names are not client-side encrypted so that they may be rendered in the Satellite user interface. There are two main drivers for creating multiple Projects: access management and billing.

{% hint style="info" %}
Learn more about [Projects](../../concepts/key-architecture-constructs.md#project) in Key Architecture Constructs under Concepts.
{% endhint %}

To select, create or **Manage Projects** you can click the name of your project on the left side toolbar above [**Dashboard**](dashboard.md).

![](<../../.gitbook/assets/image (139).png>)\
In the **Manage Project** screen you can create or rename or modify your limits (if you use a Pro account).

![](<../../.gitbook/assets/image (178).png>)

## Create a new Project

On _**Projects**_ screen to create a new Project select the **Create Project**. On [Project **Dashboard**](dashboard.md) you can click the name of the current project and select **Create Project**.

{% hint style="info" %}
The availability of this function depends on your account tier. Please check [limits.md](../../concepts/limits.md "mention") for details.
{% endhint %}

![](<../../.gitbook/assets/image (140).png>)

Specify the **Project Name**, optional **Description** and confirm the creating with the **Create Project** button.

## Modify the existing Project

To modify the existing Project on the _**Projects**_ screen you can select a needed project and modify its name or description.

![](<../../.gitbook/assets/image (153).png>)

### Changing Project Limits

If your account tier allows you to change [your Limits](../../concepts/limits.md), you will have more options than a [Free tier](../../billing-payment-and-accounts-1/pricing/free-tier.md).

![](<../../.gitbook/assets/image (127).png>)

Select **Edit** to the right of the limit to change it. However, it will not allow to increase limits greater than your available maximum. To change the maximum you need to [file a support request to change your limits](../../billing-payment-and-accounts-1/pricing/usage-limit-increases.md).

## Delete the existing Project

At the moment the Satellite Admin Console will not allow you to delete a Project.&#x20;

{% hint style="success" %}
But you can delete all buckets and Access Grants from it and [rename it](manage-projects.md#modify-the-existing-project) to something like "not used". The empty project costs nothing.
{% endhint %}

If you believe that you need to remove it anyway, then please remove all data and Access Grants from it before [file a support request](https://supportdcs.storj.io).

{% hint style="warning" %}
We do not have an access to your data and Access Grants, because they are encrypted, and cannot remove your data on your behalf. So, please, remove them yourself before file a support request. We will ask you to do so anyway.
{% endhint %}
