Storj has an Amazon [S3 compatible API](docId:eZ4caegh9queuQuaazoo) and you'll need generate S3 credentials to use it. S3 credentials consist of an **access key**, **secret key**, and **endpoint**.

Create S3 credentials in the Storj console:

1. Navigate to **Access Keys** on the left side menu.

2. Click the **New Access Key** button.

3. When the New Access dialog comes up, set specifications according to the following guidelines:

   - **Name:** The name of the credentials (e.g. my-access)
   - **Type:** S3 Credentials
   
4. Click **Next** to provide permissions, either Full Access or Advanced:

   - **Permissions:** All
   - **Buckets:** Feel free to specify the bucket you created above (e.g. my-bucket), or leave as “All”
   - **End date**: provide an expiration date for these credentials (optional)

5. Click **Next** to provide Access encryption Information
   {% callout type="warning"  %}
   In order to see the data uploaded to your bucket in the Storj console, you must unlock the bucket with the same encryption passphrase as the credentials.
   {% /callout %}

   - **Use the current passphrase**: this is default option
   - **Advanced**: you may provide a different encryption phrase either your own or generate a new one.
     - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase
     - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

6. Click **Create Access** to finish creation of your S3 credentials

7. Click **Confirm** the Confirm details pop-up message

8. Your S3 credentials are created. Write them down and store them, or click the **Download all** button. You will need these credentials for the following steps.