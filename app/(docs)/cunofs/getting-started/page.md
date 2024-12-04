---
title: Getting Started
docId: 56bbfdaa-d6c5-4a4f-ba2d-13b05d446a24
metadata:
  description: Getting started with cunoFS
---

# cunoFS GUI User Guide v0.9.13

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Importing Credentials](#importing-credentials)
3. [Mounts](#mounts)

---

## Initial Setup
1. On first opening the app, you will be prompted for a license activation key, which you will have received via email from PetaGene. Please activate it now.
2. To verify your license period, click the **About** tab at the top, which should show your license details.

---

## Importing Credentials
cunoFS can connect to any of the major cloud storage providers using native storage credentials. If you have an S3-compatible object storage solution from another provider, you will first need to configure S3 API access. For instructions on retrieving these credentials, check out the [Getting your credentials](https://cuno-cunofs.readthedocs-hosted.com/en/stable/getting-started-configuring-credentials.html#getting-your-credentials) section of our online documentation.

1. In the application, open the **Credentials** tab.
2. On the right, click the green **+ Import new credentials** button.
3. In the modal that opens:
   - Enter a new recognizable name for this set of credentials.
   - Select the tab for your cloud provider.
   - Fill out the relevant details in the form.

   **Note**: If using the S3-compatible API for a cloud provider, select the **S3-compatible** tab and choose your provider from the dropdown. Ensure the endpoint you enter is accessible from your machine. Additional compatibility settings may be required (e.g., add an explicit region if using Wasabi).

   For Storj users, we recommend using a lexicographically ordered S3 bucket to enable cunoFS’ fastest listing performance.

4. After filling in the relevant fields, click **Import** at the bottom right. This will prompt cunoFS to discover any listable and readable buckets.
5. If the import was successful, you will be taken to a page showing all discovered buckets. Please select the buckets for which you want to create mount configurations.
6. After selecting buckets to create mounts for, you will be presented with a series of panels prompting you to create mount configurations. See the [Mount Configuration](#mounts) section for more information.

---

## Mounts
1. To add a new mount, open the **Mounts** tab in the app and select the **+ Create new mount** button.
2. Set the relevant options, and click the **Add mount** button. For more information on POSIX mode, refer to the [POSIX File Access](https://cuno-cunofs.readthedocs-hosted.com/en/stable/getting-started-configuration-modes.html#posix-file-access) documentation.
3. When you are satisfied with your mount configuration, click **Add Mount**. This will store your new mount configuration.
4. Back on the **Mounts** tab, activate the mount by connecting the cloud root to the local mount point.
5. Once enabled, click on the mount name to open Finder at the mount point. This may take a moment if the mount contains many files, but access speeds will improve after the initial opening.

---
