---
title: Access
docId: _xWsamBjOsZYyu9xtQCm5
redirects:
  - /dcs/getting-started/satellite-developer-account/access-grants
---

An Access Grant is a security envelope that contains a satellite address, a restricted API Key, and a restricted path-based encryption key - everything an application needs to locate an object on the network, access that object, and decrypt it.

{% callout type="info"  %}
Learn more about [](docId:bNywu7-9KLjYfk5LBQABx) and [](docId:XKib9SzjtEXTXWvdyYWX6) or check out the [](docId:4qPQxa8HlvDIO1Kgqa2No) and [](docId:DUfoyppOZA756jGFgj9qw).
{% /callout %}

The Access Grant screen allows you to create or delete Access Grants, generate credentials for the Storj DCS S3-compatible Gateway from an Access Grant, create an API key to generate an access grant in the CLI.

---

## Create Access Grant

{% partial file="create-access-grant.md" /%}

## Create S3 Credentials

{% partial file="s3-credentials.md" /%}

## Create Keys for CLI

1. You need to have a satellite account and Uplink CLI installed. See [](docId:HeEf9wiMdlQx9ZdS_-oZS)

2. To start, proceed through the initial steps of creating a new Access Grant.

3. Navigate to "Access" page and click the **Create Keys for CLI** link (rightmost option).

   ![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/dBMRUSzPsBClfxJaXwk7S_cli-keys.png)

4. Provide name, permissions and optionally buckets, select **Create Keys**.

   ![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/NZGAlqeSEv-vuzJW1enUW_cli-keys2.png)

5. Copy and save the **Satellite Address** and **API Key **in a safe place or download them as they will only appear once.

   ![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/68ftNpbXKmJkroQyO2C9Q_cli-keys3.png)

6. Make sure you've already [](docId:hFL-goCWqrQMJPcTN82NB) and run `uplink setup`.

   {% code-group %}

   ```windows
   ./uplink.exe setup
   ```

   ```linux
   uplink setup
   ```

   ```macos
   uplink setup
   ```

   {% /code-group %}

   {% callout type="info"  %}
   For anyone who has previously configured an Uplink, please use a named access. If you want to replace the default access, you need to either [](docId:b4-QgUOxVHDHSIWpAf3hG) and use the [](docId:9MIN1usU8WPUY2212Y-_S)command with`--force` flag to import it, or use the[](docId:9MIN1usU8WPUY2212Y-_S)command with `--force` flag to create an Access Grant in CLI and import it to the specified access in the local store of Uplink.
   {% /callout %}

7. Follow the prompts. When asked for your API Key, enter it (you should have saved it in step 5 above).

8. Generate the Access Grant by running `uplink share` with no restrictions.

   {% callout type="info"  %}
   If you chose an access name, you'll need to specify it in the following command as `--access=name`
   {% /callout %}

   {% code-group %}

   ```windows
   ./uplink.exe share --readonly=false
   ```

   ```linux
   uplink share --readonly=false
   ```

   ```macos
   uplink share --readonly=false
   ```

   {% /code-group %}

   {% callout type="danger"  %}
   Keep your full-rights Access Grant secret, it contains the encryption key and will enable uploading, downloading or deleting your data from the entire project!
   {% /callout %}

9. Your Access Grant should have been output.&#x20;

{% callout type="success"  %}
The alternative for using the uplink setup command and then uplink share is to use the `uplink access create` command instead, it will print the Access Grant right away.
{% /callout %}

---

# Delete Access Grant

To Delete an Access Grant, select three dots on the right side of the Access Grant and choose **Delete Access**:

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/8DjOwU27KCkISKOJs9T3O_access10.png)

Then confirm that you want to delete the Access Grant by typing its name and confirming with **Delete Access** button.

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/--lULF4MsGMwhbtfyIa5W_access11.png)

{% callout type="danger"  %}
**Important:** If you delete an Access Grant from the Satellite user interface, that Access Grant will immediately cease to function, and all hierarchically derived child Access Grants and Storj DCS gateway access credentials based on that Access Grant will also cease to function. Any data uploaded with that Access Grant will persist on Storj DCS. If you didn't back up the Encryption Passphrase used with the Access Grant you are deleting, you will not be able to decrypt that data without that Encryption Passphrase, and it will be effectively unrecoverable.
{% /callout %}

You don't need to know everything in the whitepaper about our Access Grants, macaroon-based API Keys or our encryption implementation, but if you understand the general principles, you'll find these are some very sophisticated (but easy to use) tools for creating more secure and private applications.
