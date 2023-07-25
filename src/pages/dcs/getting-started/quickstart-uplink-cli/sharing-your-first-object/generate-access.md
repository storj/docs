---
title: Create an Access to an Object
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-03T08:36:11.000Z
docId: Ch4vLynsEqyT2-3qDEBiy
redirects:
  - >-
    /dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/generate-access
---

There are several ways to share access to an object:

*   by [](docId\:tBnCSrmR1jbOewG38fIr4)&#x20;

*   by [](docId\:R8OfnPylILOIrkpc187Xx)&#x20;

*   by [](docId\:jWrIx32jqwp0r45vQcodH) using Uplink CLI

## Share an object

You can create an access using the `uplink share` command using [](docId\:Ch4vLynsEqyT2-3qDEBiy).  For example:

{% code-group %}
```windows
./uplink.exe share sj://cakes/cheesecake.jpg --export-to cheesecake.access
```

```macos
uplink share sj://cakes/cheesecake.jpg --export-to cheesecake.access
```

```linux
uplink share sj://cakes/cheesecake.jpg --export-to cheesecake.access
```
{% /code-group %}

The `--export-to` flag is used to export the access to a file. This gives the following output:

```Text
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Disallowed
Lists     : Allowed
Deletes   : Disallowed
NotBefore : No restriction
NotAfter  : No restriction
Paths     : sj://cakes/cheesecake.jpg
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 12yUGNqdsKX1Xky2qVoGwdpL...
Exported to: cheesecake.access
```

## Restrict an access

The command `uplink access restrict` allows you to create a restricted access grant using [](docId\:Ch4vLynsEqyT2-3qDEBiy).

{% callout type="danger"  %} 
An access generated using `uplink access restrict` with no arguments creates an access to your **entire project** with read permissions!
{% /callout %}

Example:&#x20;

{% code-group %}
```windows
./uplink.exe access restrict --not-after=+10h --prefix sj://cakes/NewYork
```

```macos
uplink share --readonly=false --not-before=+2h --not-after=+10h sj://cakes/
```

```linux
uplink share --readonly=false --not-before=+2h --not-after=+10h sj://cakes/
```
{% /code-group %}

```Text
17UjiCXa...
```

{% callout type="info"  %} 
See the [](docId\:jWrIx32jqwp0r45vQcodH) command reference for more actions.
{% /callout %}

## Restrictions

The `--readonly` flag prevents all write operations (delete and write). Similarly, the `--writeonly` flag prevents all read operations (read and list).&#x20;

By default, the access is read-only. To give full permissions, use `--readonly=false`

You may also indicate the duration of access by specifying a start and end time.

The list of all restrictions can be found [](docId\:tBnCSrmR1jbOewG38fIr4). Example:&#x20;

{% code-group %}
```windows
./uplink.exe share --readonly=false --not-before=+2h --not-after=+10h sj://cakes/
```

```macos
uplink share --readonly=false --not-before=+2h --not-after=+10h sj://cakes/
```

```linux
uplink share --readonly=false --not-before=+2h --not-after=+10h sj://cakes/
```
{% /code-group %}

```Text
=========== ACCESS RESTRICTIONS ==========================================================
Download  : Allowed
Upload    : Allowed
Lists     : Allowed
Deletes   : Allowed
NotBefore : 2021-04-17 17:22:39
NotAfter  : 2021-04-18 01:22:39
Paths     : sj://cakes/ (entire bucket)
=========== SERIALIZED ACCESS WITH THE ABOVE RESTRICTIONS TO SHARE WITH OTHERS ===========
Access    : 123qSBBgSUSqwUdbJ6n4bxLM...
```

{% callout type="info"  %} 
See the [](docId\:jWrIx32jqwp0r45vQcodH) and [](docId\:tBnCSrmR1jbOewG38fIr4) commands reference for more actions.
{% /callout %}

