---
title: Manage Projects
slug: getting-started/satellite-developer-account/manage-projects
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-03T08:36:17.000Z
docId: s9MmhnH5OaJrTszOozt3k
---

When you log into the Satellite Admin Console, you start on the [](docId\:k6QwBZM3hnzxkCuQxLOal) for your default Project. A Project is the basic unit for aggregating usage, calculating billing, invoicing fees,  collecting payment, and handling access management. Users can create multiple Projects and projects are invoiced separately. Within a Project, usage is tracked at the Bucket level and aggregated for invoicing to the Project. Project names are not client-side encrypted so that they may be rendered in the Satellite user interface. There are two main drivers for creating multiple Projects: access management and billing.

{% callout type="info"  %} 
Learn more about [](docId\:M-5oxBinC6J1D-qSNjKYS)in Key Architecture Constructs under Concepts.
{% /callout %}

To select, create or **Manage Projects** you can click the name of your project on the left side toolbar above **Dashboard**.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/zkBfEiBnAa8o6fA_2ZMiO_manage-01.png)

## Create a new Project

On ***Projects*** screen to create a new Project select the **Create Project**. On **Project Dashboard** you can click the name of the current project and select **Create Project**.

{% callout type="info"  %} 
The availability of this function depends on your account tier. Please check [](docId\:A4kUGYhfgGbVhlQ2ZHXVS)  for details.
{% /callout %}

Specify the **Project Name**, optional **Description** and confirm the creating with the **Create Project** button.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/DDXNF01IgUwZV8PqLrt3n_manage02.png)

## Modify the existing Project

To modify the existing Project on the ***Projects*** screen you can select a needed project and modify its name or description.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/beljzrUkwGGXkjOMW7LMy_manage03.png)

## Changing Project Limits

If your account tier allows you to change [](docId\:A4kUGYhfgGbVhlQ2ZHXVS),  you will have more options than a [](docId:3QsPeVcuS4Buq5WWgFnRu).

Select **Edit** to the right of the limit to change it. However, it will not allow to increase limits greater than your available maximum. To change the maximum you need to file a [](docId\:xe__i9r3jY1QWUR6RYgzd) request to change your limits.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/GnLdZJSJOqBh_mqlH3lM0_manage04.png)

## Delete the existing Project

At the moment the Satellite Admin Console will not allow you to delete a Project.&#x20;

{% callout type="success"  %} 
But you can delete all buckets and Access Grants from it and rename it to something like "not used". The empty project costs nothing.
{% /callout %}

If you believe that you need to remove it anyway, then please remove all data and Access Grants from it before [file a support request](https://supportdcs.storj.io/).

{% callout type="warning"  %} 
We do not have an access to your data and Access Grants, because they are encrypted, and cannot remove your data on your behalf. So, please, remove them yourself before file a support request. We will ask you to do so anyway.
{% /callout %}

