---
title: Access
docId: _xWsamBjOsZYyu9xtQCm5
redirects:
  - /dcs/getting-started/satellite-developer-account/access-grants
metadata:
  title: Generating and Managing Access Grants
  description:
    A guide on how to create access grants, generate S3-compatible credentials,
    create API keys for the CLI, and manage these elements in Storj for secure data
    access.
---

An Access Grant is a security envelope that contains a satellite address, a restricted API Key, and a restricted path-based encryption key - everything an application needs to locate an object on the network, access that object, and decrypt it.

{% callout type="info"  %}
Learn more about [](docId:bNywu7-9KLjYfk5LBQABx) and [](docId:XKib9SzjtEXTXWvdyYWX6) or check out the [](docId:4qPQxa8HlvDIO1Kgqa2No) and [](docId:DUfoyppOZA756jGFgj9qw).
{% /callout %}

The Access Grant screen allows you to create or delete Access Grants, generate credentials for the Storj S3-compatible Gateway from an Access Grant, create an API key to generate an access grant in the CLI.

---

## Create S3 Credentials

{% partial file="s3-credentials.md" /%}

## Create Access Grant

{% partial file="create-access-grant.md" /%}

## Create Keys for CLI

1. You need to have a Storj account and Uplink CLI installed. See [](docId:HeEf9wiMdlQx9ZdS_-oZS)

2. The project should be configured to use a manual managed encryption (see [](docId:aitie6rohXai9uuv))

3. To start, proceed through the initial steps of creating a new Access Grant.

4. Navigate to "Access Keys" page and click the **New Access Key** button, then type an access name and choose **API Key** as an Access type.

5. On the next step, select either **Full Access** or **Advanced** if you want to choose the permissions, buckets, and set an expiry date for this access key.

6. Once you create the access key, copy and save the **Satellite Address** and **API Key** in a safe place, or download them as they will only appear once.

7. Make sure you've already [](docId:hFL-goCWqrQMJPcTN82NB) and run `uplink setup`.

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

8. Follow the prompts. When asked for your API Key, enter it (you should have saved it in step 5 above).

9. Generate the Access Grant by running `uplink share` with no restrictions.

   {% callout type="info"  %}
   If you chose an access name, you'll need to specify it in the following command as `--access=name`
   {% /callout %}

   {% code-group %}

   ```windows
   ./uplink.exe access restrict --readonly=false
   ```

   ```linux
   uplink access restrict --readonly=false
   ```

   ```macos
   uplink access restrict --readonly=false
   ```

   {% /code-group %}

   {% callout type="danger"  %}
   Keep your full-rights Access Grant secret, it contains the encryption key and will enable uploading, downloading or deleting your data from the entire project!
   {% /callout %}

10. Your Access Grant should have been output.

{% callout type="success"  %}
The alternative for using the `uplink setup` command and then `uplink access restrict` is to use the `uplink access create` command instead, it will print the Access Grant right away.
{% /callout %}

---

# Delete Access Grant

To Delete an Access Grant, select three dots on the right side of the Access Grant and choose **Delete Access**:

{% callout type="danger"  %}
**Important:** If you delete an Access Grant from the Satellite user interface, that Access Grant will immediately cease to function, and all hierarchically derived child Access Grants and Storj gateway access credentials based on that Access Grant will also cease to function. Any data uploaded with that Access Grant will persist on Storj. If you didn't back up the Encryption Passphrase used with the Access Grant you are deleting, you will not be able to decrypt that data without that Encryption Passphrase, and it will be effectively unrecoverable.
{% /callout %}

You don't need to know everything in the whitepaper about our Access Grants, macaroon-based API Keys or our encryption implementation, but if you understand the general principles, you'll find these are some very sophisticated (but easy to use) tools for creating more secure and private applications.
