---
title: Node Dashboard
docId: eCupaiZizohpah7I
metadata:
  title: Setting Up a Dashboard for Commercial Storage Nodes
  description:
    A guide to setting up a node dashboard to monitor commercial storage
    nodes using Prometheus and Grafana, including prerequisites, metrics endpoint
    setup, Prometheus and Grafana configuration.
---

This guide assists commercial Storage Node operators in setting up advanced monitoring using Prometheus and Grafana. There are alternative monitoring tools that also will work. Consider the following as guidelines rather than a strict requirement for how to do it.

{% callout type="danger" %}

This guide is for Commerical Storage Nodes, if you're looking to join the public network follow [](docId:kjMiGo7HTr4v_qwD5Iqc7) instead.

{% /callout %}

## Prerequisites

- Familiarity with or installed [Prometheus](https://prometheus.io/docs/prometheus/latest/installation/)
- Familiarity with or installed [Grafana](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)

## Metrics

Storage nodes have a Prometheus metrics endpoint that can be scraped periodically for better insight on the health of your network.

To enable the endpoint set the `STORJ_DEBUG_ADDR` or `--debug.addr` flag for each Storage node (incrementing the port by 1 if multiple nodes are on the same machine).

```
STORJ_DEBUG_ADDR=127.0.0.1:6000
```

Visit 127.0.0.1:6000 for an overview page of monitoring capabilities. More specifically, the `/metrics` endpoint can be viewed for a more specific overview of what is available

### Prometheus configuration

Next, create a `prometheus.yaml` configured to scrape the Storage nodes in your network.

List each Storage Node's debug address and port as targets.

{% callout type="note" %}

`/metrics` is added by prometheus targets by default

{% /callout %}

{% code-group label="prometheus.yaml" %}

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'local-metrics'
    static_configs:
      - targets:
          - host.docker.internal:6000 # if prometheus and node are on the same docker host
          - host.docker.internal:6001
          - 192.168.1.5:6000
          - 192.168.1.5:6001
          - 192.168.1.6:6000
          - 192.168.1.6:6001
```

{% /code-group %}

Run the [Prometheus](https://prometheus.io/docs/prometheus/latest/installation/) docker container or update your existing Prometheus server config

```
docker run -p 9090:9090 -v ./prometheus.yaml:/etc/prometheus/prometheus.yml prom/prometheus
```

Visit the Prometheus targets (<http://localhost:9090/targets>) to see if the Storage Nodes are being successfully scraped.

## Grafana Dashboard

Once metrics are being successfully gathered, they can be visualized and analyzed with Grafana.

Run the [Grafana](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) docker container or add the following to your existing one.

```
docker run -d --name=grafana -p 3000:3000 grafana/grafana-enterprise
```

Login to Grafana by visiting <http://localhost:3000> (username and password is `admin` by default).

### Connect Prometheus to your Grafana instance

To view the metrics data in Grafana, you'll need to create a new Prometheus data source.

1. Click **Add new connection** from the left sidebar under connections.
   ![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/grafana-add-new-data-source.png)

1. Select **Prometheus** as the data source

1. Enter your Prometheus server URL (e.g. http://localhost:9090) under connections

1. Click **Save & test**

### Add Storage Node Dashboard

1. Navigate to the Dashboards <http://localhost:3000/dashboards>

1. Click **Create Dashboard** in the middle of the screen or the **New** if you already have an existing one

1. Select the **Import a dashboard** option

1. Paste the JSON from [storage-node-grafana.json](/storage-node-grafana.json) into **Import via dashboard JSON model** text area.

1. Click **Load** and **Import** to create the Dashboard.

You've successfully setup your Storage node dashboard.

{% callout type="note" %}

It may say "No data" for each graph until an upload or download to your Storage Nodes occurs.

{% /callout %}

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/grafana-storage-node-dashboard.png)

