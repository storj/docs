---
title: Restic
docId: 5_zxVAqCUku5pVX0OTwSW
tags:
  - backup
redirects:
  - /dcs/how-tos/backup-with-restic
metadata:
  title: Using Restic for Backups
  description:
    Step-by-step guide on how to set up and use Restic, a Go-based backup
    client, with Storj for effective data backup and restore.
---

## Introduction

**Restic** is a backup client written in Go language, it is highly secure and efficient. Each **Restic** backup is a snapshot of the server/files/directory, deduplicated from what was stored before. Any restore to a given backup will restore the server/files/directories to the exact state they were at that time.

This is a quick-start tutorial that covers [Restic](https://restic.net) usage with Storj DCS.&#x20;

In this guide, we will cover only some of the basic features of the tool. The complete documentation for Restic is located here, at their [complete command reference](https://restic.readthedocs.io/en/latest/manual_rest.html).

{% callout type="danger"  %}
This guide is experimental. The main functionality appears to work, but there are expected to be undiscovered issues. Please report any issues you may run into on this [forum thread](https://forum.storj.io/t/two-more-tech-previews-rclone-and-restic/6072).
{% /callout %}

## Before you begin

If you haven't yet, [create a Storj DCS account](https://us1.storj.io/signup?partner=restic) before following the rest of the tutorial.

You will need the following:

- [x] Install and configure Rclone by following this walkthrough: [](docId:LdrqSoECrAyE_LQMvj3aF)
- [x] Read through the [Restic-Rclone documentation here](https://restic.readthedocs.io/en/latest/030_preparing_a_new_repo.html#other-services-via-rclone)

The bucket for the backup needs to exist before using Restic. Use Rclone to create the bucket:

```Text
$ rclone mkdir storj:bucket
```

The general backend specification format is `rclone:<remote>:<path>`, the `<remote>:<path>` component will be directly passed to Rclone. When you configure a remote named `foo`, you can then call Restic as follows to initiate a new repository in the path `bar` in the repo:

```Text
$ restic -r rclone:foo:bar init
```

{% callout type="info"  %}
Restic will take care of starting and stopping Rclone for your backup
{% /callout %}

## Setup

First, [install](https://restic.readthedocs.io/en/stable/020_installation.html) Restic for your operating system, then execute the init command:

```Text
restic --repo rclone:storj:bucket/my-backup init
```

Flag `--repo` defines that we will use `rclone` as a tool for backup with `storj` configuration. The last part `bucket/my-backup` specifies where our backup will be stored remotely.&#x20;

The label `storj` refers to the `rclone` configuration name which you chose during setup.&#x20;

Now, enter a password for your repository.

![](https://link.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images/9Pwnr8Xm5xOZElCIB8OzE_restic.png)

{% callout type="info"  %}
Remembering your password is important! If you lose it, you won’t be able to access data stored in the repository.
{% /callout %}

Repository data will be created directly at the specified bucket prefix e.g., `bucket/my-backup`.

Now you are ready to do your first backup!

## Backing Up

Execute the backup command:&#x20;

```Text
restic --repo rclone:storj:bucket/my-backup backup ~/directory-to-backup --pack-size=60
```

You will be able to see the progress of the backup and a summary at the end of the process.

{% callout type="info"  %}
Passing `--pack-size=60` sets the Restic pack size to 60 MiB, which is the optimal value for Storj. Restic is not very precise, and the actual pack files may be a little larger.
{% /callout %}

{% callout type="warning"  %}
When backing up the root directory on Unix systems it is important to pass `--one-file-system` to prevent accidentally backing up virtual filesystems like`/proc`.
{% /callout %}

{% callout type="warning"  %}
Passing `-o rclone.connections=1` reduces the Rclone parallelism to a single upload. The Storj backend will still open multiple connections to storage nodes. Use this option to reduce the stress on your router in case of failing uploads with the default parallelism.
{% /callout %}

## Cleanup

With every backup, Restic is creating a new snapshot with contents of a directory at the moment. To remove old and unused snapshots we need to execute the `forget` command:

```Text
restic --repo rclone:storj:bucket/my-backup forget --keep-last 2 --prune
```

The `--keep-last` flag is for keeping last `n` snapshots. This command offers multiple flags for defining deletion rules. See `restic help forget` for more options.

The `--prune` flag is for removing unreferenced data. Without this option, the `forget` command will remove the snapshot but not the referenced data.

## Check

If you want to verify the consistency of your backup, run the `check` command:

```Text
restic --repo rclone:storj:bucket/my-backup check
```

## Restore

To restore the latest snapshot of your backup:

```Text
restic --repo rclone:storj:bucket/my-backup restore latest --target ~/restore
```

The `latest` option means we want to restore the latest snapshot.&#x20;

The `--target` flag defines the directory where the backup will be restored.

For more detailed information around Restic usage, please visit the [Restic documentation page](https://restic.readthedocs.io).
