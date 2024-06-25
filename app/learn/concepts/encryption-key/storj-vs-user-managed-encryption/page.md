---
title: Storj Managed vs. User Managed Encryption
docId: aitie6rohXai9uuv
metadata:
  title: Encryption passphrase management comparison
  description:
    Overview of the supported methods for managing an encryption passphrase
    in  a Storj project, and their advantages/disadvantages.
---

When creating a new Storj project, users are able to select between "Storj Managed Encryption" and "Self Managed Encryption". Each has its own benefits and tradeoffs, and once an option is selected, it cannot be changed for that project.

This page is intended to explain the difference between the two options, so that users can be better informed about which project encryption option is better suited to their use-case.

## Brief Overivew

**Storj Managed Encryption** is best suited to:
* users who want a streamlined web browser experience, similar to other cloud storage providers
* users who want to collaborate with others on the same project

**Storj Managed Encryption** is best suited to:
* users who want complete ownership of their data encryption keys
* users who have more advanced/specialized encryption use-cases

## More Details

### Storj Managed Encryption

Storj Managed Encryption means that object data is encrypted using a passphrase stored in the satellite's database. The passphrase itself is encrypted before being stored in the database, by a secret key managed by Storj.

Because the Storj-managed encryption passphrase can be retrieved by the satellite without the user needing to provide anything, the user never needs to be prompted for an encryption passphrase in the web browser.

Because the Storj-managed encryption passphrase applies to an entire project, project members can all view and access the same files without first needing to exchange a shared encryption passphrase.

Projects with Storj Managed Encryption do not have path encryption enabled. This means that files can be listed in lexicographical order by default.

### User Managed Encryption

User Managed Encryption means that object data is encrypted using a passphrase provided by the user, which is never stored in the satellite's database. The user is responsible for saving/remembering the passphrase, as well as sharing it with any project members who need to access files.

Because the user manages their own passphrase, when performing certain actions, such as creating an access, listing files, uploading files, etc..., the user will receive additional prompts in the web browser when a passphrase is necessary. This encryption passphrase is never sent to the server, and stays completely client-side. This favors user control of data at the expense of user experience.

Projects with User Managed Encryption have path encryption enabled by default. Additional steps are necessary to disable path encryption so that it is possible for files to be listed in lexicographical order.

Although it is not recommended in most situations, User Managed Encryption allows the user to do things like use different encryption passphrases within the same project or bucket.