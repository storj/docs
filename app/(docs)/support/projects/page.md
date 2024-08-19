---
title: Projects
docId: jwCUqpDCk8CUuUqFuykFx
redirects:
  - /setup/project
  - /dcs/projects
  - /dcs/getting-started/satellite-developer-account/manage-projects
weight: 5
metadata:
  title: Managing Projects on the Storj Console
  description:
    Learn how to manage, create, modify, limit and delete your projects
    on the Storj Console. Information on how usage, billing and invoicing
    works at the project level is also included.
---

## Introduction

Manage your projects and limits. When you log into the Satellite Admin Console, you start on the [](docId:k6QwBZM3hnzxkCuQxLOal) for your default Project. A Project is the basic unit for aggregating usage, calculating billing, invoicing fees, collecting payment, and handling access management. Users can create multiple Projects and projects are invoiced separately. Within a Project, usage is tracked at the Bucket level and aggregated for invoicing to the Project. Project names are not client-side encrypted so that they may be rendered in the Satellite user interface. There are two main drivers for creating multiple Projects: access management and billing.

{% callout type="info"  %}
Learn more about Projects in [](docId:M-5oxBinC6J1D-qSNjKYS) under Concepts.
{% /callout %}

To select, create or **Manage Projects** you can click the name of your project on the left side toolbar above Dashboard.

## Create a new Project

On **_Projects_** screen to create a new Project select the **Create Project**. On Project **Dashboard** you can click the name of the current project and select **Create Project**.

{% callout type="info"  %}
The availability of this function depends on your account tier. Please check [](docId:Zrbz4XYhIOm99hhRShWHg) for details.
{% /callout %}

Specify the **Project Name**, optional **Description** and confirm the creating with the **Create Project** button.

## Modify the existing Project

To modify the existing Project on the **_Projects_** screen you can select a needed project and modify its name or description.

## Changing Project Limits

If your account tier allows you to change your [](docId:Zrbz4XYhIOm99hhRShWHg), you will have more options than a free plan.

Select **Edit** to the right of the limit to change it. However, it will not allow to increase limits greater than your available maximum. To change the maximum you need to file a support request to change your limits, see [](docId:A4kUGYhfgGbVhlQ2ZHXVS).

## Delete the existing Project

At the moment the Satellite Admin Console will not allow you to delete a Project.

{% callout type="success"  %}
But you can delete all buckets and Access Grants from it and rename it to something like "not used". The empty project costs nothing.
{% /callout %}

If you believe that you need to remove it anyway, then please remove all data and Access Grants from it before [file a support request](https://supportdcs.storj.io/hc/en-us).

{% callout type="warning"  %}
We do not have an access to your data and Access Grants, because they are encrypted, and cannot remove your data on your behalf. So, please, remove them yourself before file a support request. We will ask you to do so anyway.
{% /callout %}

## Manage Passphrase

You may manage your [Passphrase](docId:M-5oxBinC6J1D-qSNjKYS#encryption-key) used for [Buckets](docId:4oDAezF-FcfPr0WPl7knd) view.

The **Manage Passphrase** window will allow you to:
* [Create a new Passphrase](#create-a-new-passphrase)
* [Switch current Passphrase](#switch-the-current-passphrase)
* [Clear saved Passphrase](#clear-the-saved-passphrase)

### Create a new Passphrase

After click the **Continue** button you will have a choice how do you want to provide your Encryption Passphrase:
* [Generate a 12-words Encryption Passphrase](#generate-12-word-passphrase)
* [Enter your own Encryption Passphrase](#enter-a-new-passphrase)

#### Generate 12-word passphrase

Now you may:
* **Copy** the generated Passphrase
* **Download** the generated Passphrase
* **Show Passphrase**

You need to select a checkbox **[ ] Yes, I saved my encryption passphrase** to **Continue**

#### Enter a new passphrase

You should enter your own Encryption Passphrase (or a previously used), select a checkbox **[ ] Yes, I saved my encryption passphrase** to **Continue**

### Switch the current Passphrase

You should enter your own Encryption Passphrase (or a previously used) to **Continue**

### Clear the saved Passphrase

Click the **Continue** button to clear your currently saved Encryption Passphrase
