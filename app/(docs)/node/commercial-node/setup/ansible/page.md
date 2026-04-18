---
title: Sample Ansible Configuration
docId: aiwee4RieY4cooMa
metadata:
  title: Creating Storage Nodes Using Ansible
  description: This document provides an example for creating multiple Storj Storage
    nodes using Ansible. A playbook is provided that details how to run a single host
    machine with multiple hard drives to run multiple Storage nodes.
---

{% callout type="danger" %}

This guide is for Commerical Storage Nodes, if you're looking to join the public network follow [](docId:kjMiGo7HTr4v_qwD5Iqc7) instead.

{% /callout %}

## Prerequisites

- Completed setup of one [Storage Node](docId:ohngie2AhcuiX1ce)
- Installed [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/index.html)
- Installed [Docker](docId:EW9B_0fJujL3Z5aTLUW7d)

## Ansible Configuration

There are a number of different tools to do cloud operations, this guide should be considered only an example and not a requirement for how to run [Commerical Storage nodes](docId:eisoh4oa2uRaac1n).

{% callout type="note" %}

Any environment that can reliability run the [storage node image](https://hub.docker.com/r/storjlabs/storagenode) can be also be used.

{% /callout %}

This Ansible playbook is showing how a single host machine with multiple hard drives can run multiple Storage nodes. Each container's environment variables, storage volumes, and network ports are set according to the individual dictionary elements in `storj_containers`.

Each Storage node requires its own `external_port`, for communication with the Storj network. Similarly, each node ideally has a dedicated drive or mount point for its storage, identified by `volume_mount` like /mnt/sdb or /mnt/sdc.

The Ansible `loop` iterates over the list of dictionaries stored in the `storj_containers` variable, executing the container deployment tasks for each dictionary item. This allows multiple Storage nodes with varying configurations to be deployed in a single playbook run.

{% code-group label="storagenode_playbook.yml" %}
```ini
- name: Run Storj Storage Nodes
  hosts: storagenode
  become: yes
  vars:
    base_email: 'name+{{ item.name }}@example.com'
    public_ip: xxx.xx.xx.xx
    storj_containers:
      - name: storagenode1
        external_port: 20001
        internal_dashboard_port: 14001
        volume_mount: '/mnt/sdb'
        storage: '10TB'
      - name: storagenode2
        external_port: 20002
        internal_dashboard_port: 14002
        volume_mount: '/mnt/sdc'
        storage: '10TB'
      # Add more here
  tasks:
    - name: Pull Storj image
      community.docker.docker_image:
        name: storjlabs/storagenode:latest
        source: pull

    - name: Run Storj containers
      community.docker.docker_container:
        name: '{{ item.name }}'
        image: storjlabs/storagenode:latest
        env:
          WALLET: '0x0000000000000000000000000000000000000000'
          EMAIL: '{{ base_email }}'
          ADDRESS: '{{ public_ip }}:{{ item.external_port }}'
          STORAGE: '{{ item.storage }}'
          STORJ_CONSOLE_ADDRESS: '127.0.0.1:{{ item.internal_dashboard_port }}'
        volumes:
          - '{{ item.volume_mount }}/identity:/app/identity'
          - '{{ item.volume_mount }}/storage:/app/config'
        ports:
          - '{{ item.external_port }}:{{ item.external_port }}/tcp'
          - '{{ item.external_port }}:{{ item.external_port }}/udp'
          - '127.0.0.1:{{ item.internal_dashboard_port }}:{{ item.internal_dashboard_port }}'
        state: started
        restart_policy: unless-stopped
      loop: '{{ storj_containers }}'
```
{% /code-group %}


Next define the hosts where Ansible tasks will be executed with an inventory file `hosts.ini`, where you list the IP addresses or hostnames of your target machines, optionally grouped under bracketed headers to organize them. Here's a basic example:

{% code-group label="hosts.ini" %}
```ini
[storagenode]
192.168.1.5
192.168.1.6
```
{% /code-group %}

With this inventory, you can target specific groups (e.g., `[storagenode]`) or individual hosts in your Ansible playbooks.

To execute the playbook, specify your inventory file using the `-i` option. This will run the playbook tasks on the hosts listed in your inventory.

```
ansible-playbook -i hosts.ini storagenode_playbook.yml
```

On your host machine, you can view the status of your docker containers. Here are some useful commands

The `docker ps` command lists all running Docker containers, it's useful for quickly checking which containers are active and their configurations.

The `docker logs` command displays the standard output and standard error logs of a specified Docker container. To debug `storagenode1` container for example you could do

```
docker logs --tail 20 storagenode1
```
