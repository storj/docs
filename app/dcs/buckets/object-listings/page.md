---
title: Object Listings
docId: sSBwV86liLJ--jeWCN1DB
redirects:
  - /dcs/lexicographically-sorted-object-listings
metadata:
  title: Enabling Lexicographic Sorting of Object Listings
  description:
    Guide on how to enable lexicographically sorted object listings in
    Storj by disabling object key encryption. Includes step-by-step instructions to
    adjust settings via the Satellite Console and Uplink CLI.
---

Storj comes with highly-secure default settings for uploading data to the network. By default, not only is the object content encrypted, but the object metadata and the object key are as well. See [](docId:KEt1PX_a8sbmwGXI4IhT_) for details on how object keys (also know as paths) are encrypted.

Encrypting the object keys comes with a shortcoming. When listing the objects of a bucket, the result does not come in lexicographically sorted order. The list order is still deterministic - based on the sort order of the cipher text of the encrypted object keys.

{% callout type="success"  %}
If your S3-compatible app requires object listings to be lexicographically sorted, you can disable the encryption for object keys.
{% /callout %}

[](docId:XKib9SzjtEXTXWvdyYWX6) determine the access to objects and how they are encrypted, including their object key. Follow these steps to create an access grant with disabled encryption for object keys and register it as S3 credentials.

{% callout type="info"  %}
The following instructions cannot be executed entirely in the Satellite Console and require the final steps to be completed with the Uplink CLI (v1.76 or later).&#x20;
{% /callout %}

1.  Log in to the Satellite Console and follow the steps to [](docId:OXSINcFRuVMBacPvswwNU).

2.  Once you switch to your command terminal and execute the [](docId:OuoKJl9KqbJVQB9Xkdy3g) command, you will be prompted for the API Key and the Satellite Address.

3.  After entering them, answer with `y` to the question:
    `Would you like to disable encryption for object keys (allows lexicographical sorting of objects in listings)? (y/N)`

4.  Answer with `y` the next question too:
    `Would you like S3 backward-compatible Gateway credentials (y/N)`

5.  The command will generate the S3 credentials with disabled encryption for object keys. Configure them in your S3-compatible app.

```
========== GATEWAY CREDENTIALS =================
Access Key ID: <redacted>
Secret Key : <redacted>
Endpoint : https://gateway.storjshare.io
```

{% callout type="warning"  %}
Avoid using access grants or S3 credentials with different path encryption settings in the same bucket. Otherwise, you may get unexpected results in the object listings. The best practice is to start with an empty bucket.
{% /callout %}

{% callout type="info"  %}
The [](docId:4oDAezF-FcfPr0WPl7knd) in the Satellite Console cannot list objects with unencrypted object keys yet. If you try to open a bucket with such objects, you'll see it empty with a message "You have objects locked with a different passphrase". Support for unencrypted object keys in the Object Browser will be added in a future release. Until then, you can use the [](docId:TC-N6QQVQg8w2cRqvEqEf) or a S3-compatible app to list such objects.
{% /callout %}
