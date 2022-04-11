# Access

An Access Grant is a security envelope that contains a satellite address, a restricted API Key, and a restricted path-based encryption key - everything an application needs to locate an object on the network, access that object, and decrypt it.

{% hint style="info" %}
Learn more about [**Access Management** ](../../concepts/access/)and [**Access Grants**](../../concepts/access/access-grants/) or check out the FAQ on [**Access Grants**](../../support/faqs.md#when-do-you-create-an-access-grant-in-satellite-ui-and-when-do-you-use-the-cli) and [**Encryption Keys**](../../support/faqs.md#how-are-encryption-keys-managed).
{% endhint %}

The Access Grant screen allows you to create or delete Access Grants, and generate credentials for the Storj DCS S3-compatible Gateway from an Access Grant.

Let's start with creating an Access Grant. Click the **Create Access Grant** Button.

![](<../../.gitbook/assets/image (137) (1).png>)

Give your Access Grant a name:

![](<../../.gitbook/assets/image (156).png>)

Set any access restrictions you want encoded into your Access Grant. Through the Satellite Admin Console, you can set basic restrictions on your Access Grant. You can get [more sophisticated using the CLI](../quickstart-uplink-cli/generate-access-grants-and-tokens/generate-a-token.md) and add [further, more granular restrictions](../../api-reference/uplink-cli/share-command.md), for example, at the path prefix level within a Bucket.

![](<../../.gitbook/assets/image (123).png>)

Next, enter an [Encryption Passphrase](../../concepts/access/encryption-and-keys/) for your Access Grant. Note that this encryption passphrase is handled by the browser and is not stored by the Satellite. You can either **Generate Phrase** or **Enter Phrase**.

{% hint style="warning" %}
Do not [lose your Encryption Passphrase](../../support/faqs.md#how-do-i-recover-from-having-lost-my-encryption-key-associated-with-an-access-grant). Storj DCS does not manage your encryption keys and if you lose your Encryption Passphrase and your Access Grant, you will not be able to decrypt your data.
{% endhint %}

![](<../../.gitbook/assets/image (143) (1).png>)

Copy or download your Access Grant. Do not lose it, you only have one opportunity to do so. If you did not save it, please delete this Access Grant and create a new one and save it on this time.

![](<../../.gitbook/assets/image (166).png>)

This Access Grant can now be used to configure tools like the Storj DCS [Uplink CLI](../quickstart-uplink-cli/uploading-your-first-object/set-up-uplink-cli.md), [libuplink library](https://github.com/storj/storj/wiki/Libuplink-Walkthrough), or apps like [Rclone](../../how-tos/sync-files-with-rclone/rclone-with-native-integration.md), [FileZilla ](../../how-tos/set-up-filezilla-for-decentralized-file-transfer.md)or [Restic](../../how-tos/backup-with-restic.md). You can also [generate credentials for the Storj DCS S3-compatible Gateway](../quickstart-aws-sdk-and-hosted-gateway-mt.md#generate-credentials-to-the-gateway-mt).

{% hint style="info" %}
Remember, when you generate credentials for the Storj DCS S3-compatible Gateway from an Access Grant, you are [opting in to server-side encryption](../../concepts/encryption-key/design-decision-server-side-encryption.md).
{% endhint %}

![](<../../.gitbook/assets/image (178).png>)

When you generate credentials for the Storj DCS S3-compatible Gateway, the Admin Console will register your Access Grant with the [Gateway auth service](../../concepts/edge-services/auth-service.md) and display the credentials required to configure your client app to work with the Storj DCS S3-compatible Gateway.

![](<../../.gitbook/assets/image (142).png>)

To Delete an Access Grant, select an Access Grant and choose **Remove Selected**:

![](<../../.gitbook/assets/image (132).png>)

Then confirm that you want to delete the Access Grant.

![](<../../.gitbook/assets/image (152).png>)

{% hint style="danger" %}
**Important:** If you delete an Access Grant from the Satellite user interface, that Access Grant will immediately cease to function, and all hierarchically derived child Access Grants and Storj DCS gateway access credentials based on that Access Grant will also cease to function. Any data uploaded with that Access Grant will persist on Storj DCS. If you didn't back up the Encryption Passphrase used with the Access Grant you are deleting, you will not be able to decrypt that data without that Encryption Passphrase, and it will be effectively unrecoverable.
{% endhint %}

You don't need to know everything in the whitepaper about our Access Grants, macaroon-based API Keys or our encryption implementation, but if you understand the general principles, you'll find these are some very sophisticated (but easy to use) tools for creating more secure and private applications.

Next we'll cover [adding and removing other developers to and from your project](users.md).
