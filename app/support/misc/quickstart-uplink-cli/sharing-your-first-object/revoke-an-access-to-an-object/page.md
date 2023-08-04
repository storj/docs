---
title: Revoke an Access to an Object
docId: '-exN7OdOvfn9G84MTL0d9'
redirects:
  - >-
    /dcs/getting-started/quickstart-uplink-cli/sharing-your-first-object/revoke-an-access-to-an-object
---

You can revoke an access grant to an object at any time with the command `uplink revoke`.

{% code-group %}

```windows
./uplink.exe access revoke asdfRF...
```

```macos
uplink access revoke asdfRF...
```

```linux
uplink access revoke asdfRF...
```

{% /code-group %}

{% callout type="info"  %}
The access will be revoked permanently for this parent access grant.&#x20;

If you want to share this content again you should create a new access grant through the web interface.
{% /callout %}

## Revoke a named access grant

{% code-group %}

```windows
./uplink.exe access revoke access-name
```

```macos
uplink access revoke access-name
```

```linux
uplink access revoke access-name
```

{% /code-group %}
