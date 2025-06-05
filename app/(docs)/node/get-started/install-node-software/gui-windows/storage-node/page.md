---
title: Storage Node
docId: LAtWfg_LTgbI5yJ8PILUI
redirects:
  - /node/setup/gui-windows/storage-node
weight: 0
---

## Installing a Storage Node with the Windows Installer

1. [Download the Windows MSI installer](https://github.com/storj/storj/releases/latest/download/storagenode_windows_amd64.msi.zip)

2. Extract the MSI from the zip and double click it. The installation window will open.

   ![Initial Storage Node Windows Installer](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/4NFWY9VWzCdRltHBoU8px_pasted-image-0.png)

3. Accept the terms of our end-user license agreement.

   ![EULA agreement screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/6VUhKAYMC7D58hliKFMEA_pasted-image-0.png)

4. Select the folder you would like the Storage Node software to be installed in.

   ![Installation folder screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/JHl6cIzjMQRn8-hISrONa_pasted-image-0.png)

5. Select the folder your Identity is stored in.

   When you generate your Storage Node Identity, the identity tool will show you what folder it was saved in. Please see the [](docId:aT6VAB297OWLd4vqeXxf5) section if you have not created one yet.

   ![Identity folder selection screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/LL0TW17fdolT5vFvZa0OX_pasted-image-0.png)

6. Enter your [ERC-20 compatible wallet address](docId:a045be02-e05a-11ef-9338-6045bd1fa4e3) where you want to receive your STORJ token payouts.

   ![Operator information - Ethereum wallet](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/85j1PrZepUeQGCYMGFKJw_pasted-image-0.png)

7. Enter your email address to receive alerts about software updates and new features.

   ![Operator information - email address screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/0rIVxCc7BpUKcgcHjjtcc_pasted-image-0.png)

8. Enter your external IP address and port (\<ip>:\<port>).

   You can find more information about how to configure this in the [](docId:y0jltT-HzKPmDefi532sd) section.

   ![Connection information external address screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/y3A1AmFxJJqUpZOzSdm1J_pasted-image-0.png)

9. Select where you would like the network data to be stored on your machine.

   {% callout type="danger"  %}
   The network-attached storage location could work, but it is neither supported nor recommended!
   {% /callout %}

   {% callout type="danger"  %}
   Splitting subfolders from the storage location (junctions, symlinks, hardlinks, etc.) will lead to a quick disqualification if they become unavailable!
   The writeability and readability checks are performed on the storage location, not on subfolders.
   {% /callout %}

   {% callout type="warning"  %}
   **Moving an existing node on a CLI Setup to a Windows GUI Setup?**
   
   See [](docId:PsB_5Yp43KeN0DszuE2DN)
   {% /callout %}

   ![Storage folder selection screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/i8pjCLqJCL9JuQnPFALsH_pasted-image-0.png)

10. Select how much storage space you would allocate to the network.

    Required minimum of 500 GB plus 10% overhead to be allocated

    ![Storage allocation selection screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/VjaAz47vLIdzwwIN_dTS3_pasted-image-0.png)

11. Click the install button to install your Storage Node with what you configured in the previous steps.

    ![Start Install screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/9wV8dvx17NjtWyp4sVOwg_pasted-image-0.png)

12. Wait for a few moments while the Storage Node is being installed on your machine.

    ![Installing screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/LcQyXb63xCsrB_DZrIHaX_pasted-image-0.png)

13. Click the Finish button to exit the installer.

    Congrats, your Storage Node is now live!

    ![Install finish screen](https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/gLOwNZjPUw8q4ZecabrXQ_pasted-image-0.png)

    {% callout type="info"  %}
    Note: The Storage node and auto updater are installed as a Windows service. If you want to stop or restart the storage node you have to open the windows service page to do so.
    {% /callout %}
