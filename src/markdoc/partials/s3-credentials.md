Storj has an Amazon S3 compatible API and you'll need generate S3 credentials to use it. S3 credentials consist of an **access key**, **secret key**, and **endpoint**.

Create S3 credentials in the Storj console:

1. Navigate to **Access** on the left side menu.

2. Click **Create S3 Credentials** under the S3 Credentials block.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/s3_credentials_1.png)

3. When the Create Access screen comes up, set specifications according to the following guidelines:

   - **Type:** S3 Credentials
   - **Name:** The name of the credentials (e.g. my-access)

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/s3_credentials_2.png)

4. Click **Continue** to provide permissions

   - **Permissions:** All
   - **Buckets:** Feel free to specify the bucket you created above (e.g. my-bucket), or leave as “All”
   - **End date**: provide an expiration date for these credentials (optional)

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/s3_credentials_3.png)

5. Click **Continue** to provide Access encryption Information
   {% callout type="warning"  %}
   In order to see the data uploaded to your bucket in the Storj console, you must unlock the bucket with the same encryption passphrase as the credentials.
   {% /callout %}

   - **Use the current passphrase**: this is default option
   - **Advanced**: you may provide a different encryption phrase either your own or generate a new one.
     - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase
     - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/s3_credentials_4.png)

6. Click **Create Access** to finish creation of your S3 credentials

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/s3_credentials_5.png)

7. Click **Confirm** the Confirm details pop-up message

8. Your S3 credentials are created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.

   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/s3_credentials_6.png)
