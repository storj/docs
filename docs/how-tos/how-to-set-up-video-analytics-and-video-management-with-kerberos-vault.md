# How to set up video analytics and video management with Kerberos Vault

## Integration with Kerberos.io

The [Kerberos.io](https://kerberos.io) project (not to be confused with the authentication protocol of the same name) offers an open-source platform for video analytics and monitoring. With a modular system design focused on minimal startup requirements and additional components available to add later, Kerberos.io is built to work for everything from small, personal systems to complex enterprise configurations. This makes it a useful solution that is relevant at all scales.

The modularity of Kerberos.io includes optional components that help integrate it into any cloud architecture. One of these components is [Kerberos Vault](https://kerberos.io/product/vault/), which provides a flexible and extensible storage solution for video files. Kerberos Vault is designed to work with several different cloud providers, including Storj DCS, to allow for customized storage options where users can bring their own providers.

### Storj DCS and Kerberos

Storj's decentralized cloud storage platform offers a great video storage backend for integration with Kerberos.io and Kerberos Vault. This is because the distributed storage design that Storj DCS is built on offers both high availability access to video files (thanks to its network of nodes across multiple regions) and secure, reliable hosting with no single-point-of-failure.

Conveniently, it is fairly simple to configure Storj DCS to work with Kerberos Vault. This doc will show the steps necessary to do so.

### Prerequisites

Before starting the steps in this outline, ensure you have the following:

* **A Storj account.** You can [create your Storj DCS account for free](../getting-started/satellite-developer-account/creating-your-account.md) at Storj.io/signup.\
  ![](<../.gitbook/assets/Kerberos doc graphic 3.gif>)
* **A Kubernetes cluster.** Kerberos.io is best deployed as a container in Kubernetes. You can create a Kubernetes cluster locally or on any service provider that offers Kubernetes such as Google Cloud's GKE or Amazon EKS.
* **Kerberos Vault installed in your Kubernetes cluster.** Kerberos.io provides documentation on [how to install Kerberos Vault in Kubernetes](https://doc.kerberos.io/vault/installation/), both for public and private cloud options.

With these prerequisites satisfied, we can begin configuring Kerberos Vault to use Storj in our Kubernetes cluster.

### Creating a Storj Bucket and Access Credentials

The first step in configuring Storj as the storage backend for Kerberos.io is to create a bucket in your Storj DCS account and [generate S3 access credentials](../getting-started/quickstart-uplink-cli/uploading-your-first-object/create-first-access-grant.md) for the bucket.

![](<../.gitbook/assets/Kerberos doc graphic 4.gif>)

Kerberos Vault will then use the bucket information and access grant to connect with Storj.

![](<../.gitbook/assets/Kerberos doc graphic 5.gif>)

For this, do the following steps:

1. Log in to your Storj DCS account
2. On the main dashboard, click **"New Bucket"**
3. Give your bucket a descriptive name in the text box, for example "**kerberosvault**"
4. Click **Create Bucket**
5. Once back on the main dashboard, select your new bucket
6. On the left-hand side, click **Access**
7. In the top-right, click **Create Access Grant**
8. In the new window, give your access grant a descriptive name, for example "**kerberoskey**", and click **Next**
9. Choose the appropriate permissions you wish to grant Kerberos Vault for this bucket:
   * **Download** / **Update** / **List** / **Delete** - these are the actions that Kerberos.io will be able to perform
   * **Duration** - this is the time until this access grant will expire
   * **Buckets** - this sets which bucket (or buckets) Kerberos.io will have access to.
10. Click **Continue in browser**
11. Enter your encryption passphrase for this access grant and click **Next**
12. Save the access grant key which is displayed and click **Generate S3 Gateway Credentials**
13. On the next page, click **Generate Credentials**
14. Save the **Access Key**, **Secret Key**, and **End Point** to use with Kerberos Vault in a safe place

After completing these steps, you are ready to configure Kerberos Vault with your new bucket's access credentials.

### Configuring Kerberos Vault to Use Storj

Now it is time to tell Kerberos where to store videos (your Storj bucket) and how to access that location (with the access grant created above). These steps can be completed from the Kerberos Vault web panel within your running instance of Kerberos inside a Kubernetes cluster.

![](<../.gitbook/assets/Kerberos doc graphic 6.gif>)

1. From the main Kerberos Vault dashboard, select **Storage Providers** (on the left menu)
2. In the window that pops up, in the drop-down menu under **Select Storage Provider**, choose **Storj**.
3. Under **Provider Name**, enter a descriptive name for this provider to be referred to in your Kerberos instance (for example, **"storjdcs"**)
4. For **Bucket Name**, enter the same bucket name as the one created above (in this tutorial, that would be **"kerberos-vault"**)
5. **Region** this is not relevant for Storj or an edge deployment and can be left blank
6. **Hostname** is the [gateway hostname (without `https://`)](../api-reference/s3-compatible-gateway/#regions-and-points-of-presence) for your Storj bucket's region (for example, **"gateway.us1.storjshare.io"**)
7. Under **Storj Credentials**, enter the **Access Key** and **Secret Key** you saved earlier when creating your access credentials.
8. Finally, click **Validate** to ensure your access is correct and **Add Integration** to finish setup.

### Summary

The flexibility of Kerberos.io and its components like Kerberos Vault are what make it a versatile platform for video monitoring and analytics. From single-camera setups to advanced cloud-based enterprise installations, the Kerberos.io video technology is adaptable to any configuration. This adaptability includes the option to customize your choice for video storage with the platform, which is where Storj DCS makes an excellent choice.

In this tutorial, we demonstrated the steps to set up a Storj bucket and create access credentials for that bucket. We then showed how to update a Kerberos Vault installation to use Storj as a storage provider. Doing all of this allows Kerberos.io to leverage the distributed storage network provided by Storj DCS, taking advantage of all the benefits it provides. Your video monitoring and analytics solution is now enhanced with the power of decentralized media storage.
