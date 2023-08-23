A Storj access grant is a serialized, self-contained credential that allows users to access a specific bucket, or object, within a Storj project. It encapsulates everything needed for authentication and authorization on the Storj network.

Create Access Grant in the Storj Console:

1. Navigate to **Access** on the left side menu.

2. Click **Create Access Grant** under the Access Grant block

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/I0a-_XJBVJRkWobIDMI6P_screenshot-2023-07-05-at-22016-pm.png)

3. When the Create Access screen comes up, set specifications according to the following guidelines:

   - **Type:** Access Grant

   - **Name:** The name of the credentials (e.g. my-access-grant)

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/ezY2HJuPFEsgyH4p13ebP_screenshot-2023-07-05-at-22057-pm.png)

4. Click **Continue** to provide permissions

   - **Permissions:** All

   - **Buckets:** Feel free to specify the bucket (e.g. my-bucket), or leave as “All”

   - **End date**: provide an expiration date for these credentials (optional)

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/gQ8jBHtvd5sFZFuAqth_h_image.png)

5. Click **Continue** to provide Access encryption Information

   {% callout type="warning"  %}
   In order to see the data uploaded to your bucket in the web console, you must unlock the bucket with the same encryption passphrase as the credentials.
   {% /callout %}

   - **Use the current passphrase**: this is default option

   - **Advanced**: you may provide a different encryption phrase either your own or generate a new one.

     - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase

     - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/Uxn8zBqXQVmQvsswV3pJ2_image.png)

6. Click **Create Access** to finish creation of your S3 credentials

7. Click **Confirm** the Confirm details pop-up message

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/WAgyNSbTLK8aR3W8btpMg_screenshot-2023-07-05-at-22143-pm.png)

8. Your Access Grant is created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/5c73MkTyjkYBJkkQ42yUF_screenshot-2023-07-05-at-22152-pm.png)
