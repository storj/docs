---
title: Key Management
docId: sj3WfIZpLE65brw6Dtp9r
redirects:
  - /dcs/concepts/access/encryption-and-keys/key-management
---

End-to-end encryption means that you are responsible for creating and maintaining the encryption keys to your data. Lose your encryption keys and you've effectively lost access to your data.

## A Word of Caution on encryption keys

At several points in the Documentation it’s important to point out three important things about your encryption keys. Please make sure you clearly understand how encryption keys are used on Storj DCS. You, your application and/or your users are responsible for managing your encryption keys. &#x20;

{% callout type="info"  %}
If you lose your encryption keys, you have lost the ability to decrypt your data rendering it useless.&#x20;
{% /callout %}

## Thing 1: Your encryption keys are your data

Storj DCS does not have access to your encryption keys. If you lose your encryption keys, they are gone. If you can’t decrypt your data, you’ve effectively lost it. All of it.

### Thing 2: Make sure you backup your encryption keys

It is very important you make sure to backup your encryption keys in a safe place. Storj DCS does not have any features or functions to back up encryption keys. We have a reference implementation of a user interface to ensure a user has backed up their encryption keys, but all of that happens client-side.

### Thing 3: Secure your encryption keys

This probably goes without saying, but be careful with how your app stores and transmits encryption keys.&#x20;

By keeping encryption and access management separate, and by implementing client-side encryption, Storj DCS ensures that your data can’t be processed, mined, scanned by Storj or any unauthorized 3rd parties. If you don’t, it will end badly and Storj won’t be able to help.

### Thing 4: Choose complex encryption passphrases.

If your encryption key is easily guessable, or is leaked via some means, you will have to re-encrypt and re-upload all of your data to change your keys. This is a consequence of the encryption passphrase being controlled by you and being deterministic.

To try and help encourage users to have the right behavior, the access grant creation wizard on the Satellite dashboard will prompt first time users to create a 12 word passphrase.\\
