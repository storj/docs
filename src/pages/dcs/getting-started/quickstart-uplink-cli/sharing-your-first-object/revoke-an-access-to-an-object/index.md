---
title: Revoke an Access to an Object
slug: getting-started/quickstart-uplink-cli/sharing-your-first-object/revoke-an-access-to-an-object
createdAt: 2022-08-02T16:14:49.000Z
updatedAt: 2023-03-03T08:36:11.000Z
docId: -exN7OdOvfn9G84MTL0d9
---

You can revoke an access grant to an object at any time with the command `uplink revoke`.

:::codeblocktabs
```windows
./uplink.exe access revoke asdfRF...
```

```macos
uplink access revoke asdfRF...
```

```linux
uplink access revoke asdfRF...
```
:::

:::hint{type="info"}
The access will be revoked permanently for this parent access grant.&#x20;

If you want to share this content again you should create a new access grant through the web interface.
:::

### Revoke a named access grant

:::codeblocktabs
```windows
./uplink.exe access revoke access-name
```

```macos
uplink access revoke access-name
```

```linux
uplink access revoke access-name
```
:::

