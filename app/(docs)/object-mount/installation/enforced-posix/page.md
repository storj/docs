---
title: Enforced Posix
docId: IX6thohVi6kaiY7i

metadata:
  title: Enforced Posix
  description:
    Enforced Posix

---

This mode will maintain POSIX metadata for your objects, and will enforce POSIX access controls on those objects. Use this when you want to manage what users have access to based on the UID/GID of their UNIX user and the corresponding POSIX metadata (owner, group, mode) on files. That means users will encounter `access denied` errors if they try to read or write to a file/directory they haven't been given permission to (by a suitably privileged user doing `chown`, `chgrp` or `chmod`).

Note that this is client-side rather than server-side enforcement. If the user has access to object storage credentials with server-side privileges beyond this, then the user can potentially access or modify objects outside of these POSIX access controls. Contact us at [supportdcs@storj.io](mailto:supportdcs@storj.io) for how to setup ACL Policies to enforce server-side access control that reflects POSIX access controls.

{% callout type="warning"  %}
This mode stores POSIX metadata as objects in a "hidden" directory in *your* buckets alongside *your* data. You cannot see these directories when using Object Mount to list objects, but you will see them if you use other tools (such as your storage provider's web console). Non-Object Mount access which renames, moves, or copies objects with Object Mount-stored POSIX file attributes will result in those objects losing their metadata. You will need to use Object Mount to manage those files while preserving their attributes.
{% /callout %}
