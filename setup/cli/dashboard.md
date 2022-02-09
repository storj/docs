---
description: How to monitor the activity of your storage node.
---

# Dashboard

## Storage Node Operator Web Dashboard

{% hint style="success" %}
If you want to access this dashboard from a device on your **local network**, in your [docker run command](storage-node.md#running-the-storage-node), use `-p 14002:14002` instead of `-p 127.0.0.1:14002:14002`

If you want to access this dashboard remotely, use this guide: [how-to-remote-access-the-web-dashboard.md](../../resources/faq/how-to-remote-access-the-web-dashboard.md "mention")
{% endhint %}

Open the following URL in your web browser:

#### Directly on your node:

```bash
http://127.0.0.1:14002/
```

#### Device on local network:

```
http://<your-nodes-local-ip>:14002/
```

![SNO Dashboard](<../../.gitbook/assets/image (47).png>)

### Storage Node Dashboard Concepts

| Concept                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Satellite**                                                  | Satellites act as the mediator between clients (people up- and downloading data) and Storage Node Operators  (people storing data). Satellites facilitate the storage interaction and decide which storage nodes will store which pieces.                                                                                                                                                                                                                                                                                                                                                                                    |
| **Bandwidth Used This Month**                                  | The amount of total bandwidth you've provided to the network since the beginning of the current period.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Usage / Repair / Audit**                                     | <p><em>Usage bandwidth</em> is the bandwidth a Storage Node uses so customers can download their data, for which a <strong>Storage Node Operator is paid $20/TB.</strong></p><p></p><p><em>Repair bandwidth</em> is the bandwidth usage resulting from regenerating a bad Storage Node's deleted data that is part of the repair process, for which a <strong>Storage Node Operator sending the data to new nodes is paid $10/TB.</strong></p><p><strong></strong></p><p><em>Audit bandwidth</em> is the data downloaded from the Storage Node, which the Satellite uses to measure file durability and Node reputation.</p> |
| <p><strong>Egress</strong> </p><p><strong>Ingress</strong></p> | <p>Egress is the data the customer downloads from the network.<br>Ingress is the data the network uploads to a Storage Node.</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Disk Space Used This Month**                                 | <p>The amount of total disk space used on a storage node in the current monthly period, <br>for which a <strong>storage node is paid $1.50/TB.</strong></p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Uptime Checks**                                              | Uptime checks occur to make sure a Storage Node is still online. This is the percentage of uptime checks a Storage Node has passed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Audit Checks**                                               | Audit checks occur to make sure the data sent to a Storage Node is still held on the node and intact. This is the audit score, represented as percentage. With score less than 60% node will be disqualified.                                                                                                                                                                                                                                                                                                                                                                                                                |

{% content-ref url="../../resources/faq/how-to-remote-access-the-web-dashboard.md" %}
[how-to-remote-access-the-web-dashboard.md](../../resources/faq/how-to-remote-access-the-web-dashboard.md)
{% endcontent-ref %}

## CLI Storage Node Dashboard

Run the following command to monitor the activity of your node with the CLI dashboard:

```bash
docker exec -it storagenode /app/dashboard.sh
```

![What the CLI-dashboard will look like](<../../.gitbook/assets/CLI Dashboard v0.28.2.png>)

{% hint style="info" %}
**The dashboard may not load instantly.**&#x20;

Give it some time to fully load. Also, it is not necessary to keep the dashboard constantly running. You can exit the dashboard with `Ctrl-C` and the Storage Node will continue running in the background.
{% endhint %}
