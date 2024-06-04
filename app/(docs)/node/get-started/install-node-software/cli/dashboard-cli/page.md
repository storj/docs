---
title: Dashboard CLI
docId: gH4m4hVZ0BkMVAoW_jA2t
redirects:
  - /node/setup/cli/dashboard
metadata:
  title: Storage Node Dashboard CLI
---

## Introduction

How to monitor the activity of your storage node.

## Storage Node Operator Web Dashboard

{% callout type="success"  %}
If you want to access this dashboard from a device on your **local network**, in your [](docId:HaDkV_0aWg9OJoBe53o-J) command, use `-p 14002:14002` instead of `-p 127.0.0.1:14002:14002`

If you want to access this dashboard remotely, use this guide: [](docId:mZulkrp1H1Igv1BBTPsTC)
{% /callout %}

Open the following URL in your web browser:

## Directly on your node:

```bash
http://127.0.0.1:14002/
```

### Device on local network:

```Text
http://<your-nodes-local-ip>:14002/
```

## CLI Storage Node Dashboard

Run the following command to monitor the activity of your node with the CLI dashboard:

```bash
docker exec -it storagenode /app/dashboard.sh
```

{% callout type="info"  %}
**The dashboard may not load instantly.**

Give it some time to fully load. Also, it is not necessary to keep the dashboard constantly running. You can exit the dashboard with `Ctrl-C` and the Storage Node will continue running in the background.
{% /callout %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/llc8cUNZ5Butv9vRMa9iw_image.png)
