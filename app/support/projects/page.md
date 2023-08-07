---
title: Projects
docId: jwCUqpDCk8CUuUqFuykFx
redirects:
  - /dcs/jwCU-projects
  - /dcs/projects
weight: 1
---

## Introduction

Manage your projects and limits. When you log into the Satellite Admin Console, you start on the [](docId:k6QwBZM3hnzxkCuQxLOal) for your default Project. A Project is the basic unit for aggregating usage, calculating billing, invoicing fees, collecting payment, and handling access management. Users can create multiple Projects and projects are invoiced separately. Within a Project, usage is tracked at the Bucket level and aggregated for invoicing to the Project. Project names are not client-side encrypted so that they may be rendered in the Satellite user interface. There are two main drivers for creating multiple Projects: access management and billing.

{% callout type="info"  %}
Learn more about Projects in [](docId:M-5oxBinC6J1D-qSNjKYS) under Concepts.
{% /callout %}

To select, create or **Manage Projects** you can click the name of your project on the left side toolbar above Dashboard.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/5jcrdDKiEwLzjuqCYqOPB_projects1.png)

## Create a new Project

On **_Projects_** screen to create a new Project select the **Create Project**. On Project **Dashboard** you can click the name of the current project and select **Create Project**.

{% callout type="info"  %}
The availability of this function depends on your account tier. Please check [](docId:Zrbz4XYhIOm99hhRShWHg) for details.
{% /callout %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/_75DWodmOKqwaDRytJXvN_projects2.png)

Specify the **Project Name**, optional **Description** and confirm the creating with the **Create Project** button.

## Modify the existing Project

To modify the existing Project on the **_Projects_** screen you can select a needed project and modify its name or description.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/5GPeq8Gd2lQ6eE28f3f8X_projects3.png)

## Changing Project Limits

If your account tier allows you to change your [](docId:Zrbz4XYhIOm99hhRShWHg), you will have more options than a [](docId:3QsPeVcuS4Buq5WWgFnRu).

Select **Edit** to the right of the limit to change it. However, it will not allow to increase limits greater than your available maximum. To change the maximum you need to file a support request to change your limits, see [](docId:A4kUGYhfgGbVhlQ2ZHXVS).

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Uw86kTuJHbXNQCOZ1lGba_projects5.png)

## Delete the existing Project

At the moment the Satellite Admin Console will not allow you to delete a Project.&#x20;

{% callout type="success"  %}
But you can delete all buckets and Access Grants from it and rename it to something like "not used". The empty project costs nothing.
{% /callout %}

If you believe that you need to remove it anyway, then please remove all data and Access Grants from it before [file a support request](https://supportdcs.storj.io/hc/en-us).

{% callout type="warning"  %}
We do not have an access to your data and Access Grants, because they are encrypted, and cannot remove your data on your behalf. So, please, remove them yourself before file a support request. We will ask you to do so anyway.
{% /callout %}
