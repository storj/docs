A Storj access grant is a serialized, self-contained credential that allows users to access a specific bucket, or object, within a Storj project. It encapsulates everything needed for authentication and authorization on the Storj network.

Create Access Grant in the Storj Console:

1. Navigate to **Access Keys** on the left side menu.

2. Click the **New Access Key** button.

3. When the New Access dialog comes up, set specifications according to the following guidelines:

   - **Name:** The name of the credentials (e.g. my-access-grant)
   - **Type:** Access Grant

4. Click **Next** to provide permissions, either Full Access or Advanced:

   - **Permissions:** All

   - **Buckets:** Feel free to specify the bucket (e.g. my-bucket), or leave as “All”

   - **End date**: provide an expiration date for these credentials (optional)

5. Click **Next** to provide Access encryption Information (Skip this section if you have opted into [Storj-managed passphrases](docId:aitie6rohXai9uuv) for the project)

   {% callout type="warning"  %}
   In order to see the data uploaded to your bucket in the web console, you must unlock the bucket with the same encryption passphrase as the credentials.
   {% /callout %}

   - **Use the current passphrase**: this is default option

   - **Advanced**: you may provide a different encryption phrase either your own or generate a new one.

     - **Enter a new passphrase**: use this option, if you would like to provide your own new encryption phrase

     - **Generate 12-word passphrase**: use this option, if you would like to generate a new encryption phrase

{% callout type="warning"  %}
**This passphrase is important!** Encryption keys derived from it are used to encrypt your data at rest, and your data will have to be re-uploaded if you want it to change!

Importantly, if you want two access grants to have access to the same data, **they must use the same passphrase**. You won't be able to access your data if the passphrase in your access grant is different than the passphrase you uploaded the data with.

Please note that **Storj does not know or store your encryption passphrase**, so if you lose it, you will not be able to recover your files.
{% /callout %}

6. Click **Create Access** to finish creation of your Access key.

7. Click **Confirm** the Confirm details pop-up message

8. Your Access Grant is created. Write it down and store it, or click the **Download** button. You will need the Access Grant for the following steps.
