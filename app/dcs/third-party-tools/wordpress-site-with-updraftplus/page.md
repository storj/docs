---
title: WordPress backup with UpdraftPlus
tags:
  - backup
metadata:
  title: Backing up WordPress with UpdraftPlus plugin and Storj
  description:
    Detailed guide on how to install UpdraftPlus plugin in your WordPress
    setup and use it to backup your site to Storj using generated Gateway MT credentials.
docId: VzNAjuGSXXvsIh-mfhKVr
redirects:
  - /dcs/how-tos/how-to-backup-your-wordpress-site-with-updraftplus-to-storj-dcs
---

## Installation of UpdraftPlus

UpdraftPlus is a common plugin for WordPress. First, you need to [install WordPress](https://wordpress.org/support/article/how-to-install-wordpress/). You can also use`docker-compose` to [install it locally or on your remote server](https://docs.docker.com/samples/wordpress/).

To download, install and activate the UpdraftPlus plugin, please follow their guide: <https://updraftplus.com/download/>

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/W1rX6ZdrsYO76Yy5AuhIm_wordpress.png)

We will continue configuring the UpdraftPlus plugin after we have created the Gateway MT credentials.

## Generate Gateway MT credentials

Please sign in to your Storj DCS account **Navigate to the Access** page within your project and then click on **Create S3 Credentials**. A modal window will pop up where you should enter a name for this access grant.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/BC_m93u0hx0LSTkrIlvAi_wordpress2.png)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/zMRmJWe8Yf__15KPTGG8o_wordpress3.png)

**Assign the permissions** you want this access grant to have, then click on **Encrypt My Access.**

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/80-mA1KwBVtiknf691R4Z_wordpress4.png)

**Enter the Encryption Passphrase** you used for your other access grants. If this is your first access grant, we strongly encourage you to use a mnemonic phrase as your encryption passphrase (The GUI automatically generates one on the client-side for you.)

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/UdKhUUmYf7OOGlCNaVq2Q_wordpress5.png)

Click either on the **Copy to clipboard** link or **Download .txt** and then confirm that you copied your Encryption Phrase to a safe place.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/dy0nyX4BVQZLewP5yj9fJ_wordpress6.png)

Click the **Create my Access** link to finish generating of S3 credentials.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/VQI4G3wAixCknE2lnML4q_wordpress7.png)

Copy your **Access Key**, **Secret Key**, and **Endpoint** to a safe location or download them.

Now you are ready to configure **UpdraftPlus** plugin.

## Configuring UpdraftPlus plugin to work with Storj DCS

Now that we have finished generating the Gateway MT credentials, let´s go back to the UpdraftPlus configuration. Once the plugin has been activated, you should open its settings:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/iSJUjPPdgIb_C5Xo-sozY_wordpress8.png)

1\. Click the **Settings** tab at the top part of the **_Settings_** page of the **UpdraftPlus** plugin.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/VHpeQ4DAhNxi5CIZAQhw0_wordpress9.png)

2\. Specify a preferred backup schedule for files and/or databases and how many incremental backups you want to have. See <https://wordpress.org/plugins/updraftplus/> for more details.

3\. Click on the **S3-Compatible (Generic)** option. The following fields need to be filled in: **S3 access key**, **S3 secret key**, **S3 location** and **S3 end-point**.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/W-rtITn3IuYXGg8cRvscU_wordpress10.png)

4\. Specify your **Access Key** from your GatewayMT credentials in the **S3 access key** field, your **Access Secret Key** from the GatewayMT credentials in the **S3 secret key** field, **Endpoint** from the GatewayMT credentials in the **S3 end-point** field (without `https://`), and your bucket access style in the **S3 location** field. Then click the **Test S3 settings** button below. If everything was specified correctly, you should see a successful message like this:

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/kLAqW-KxvOGBG3l96mVe2_wordpress11.png)

5\. Please save the **UpdraftPlus** plugin settings with the **Save changes** button at the bottom of the page.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/ZpdW_kXCk-t9jZugb0sMU_wordpress12.png)

After you successfully configured Storj DCS as your storage back end in the **UpdraftPlus** plugin and saved your configuration, you can return back to the **_Backup / Restore_** tab to start your backup manually right away.
