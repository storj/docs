---
title: How do I setup static mount via /etc/fstab for Linux?
createdAt: 2022-07-29T20:16:45.000Z
updatedAt: 2023-03-03T08:35:46.000Z
docId: nZeFxmawYPdgkwUPy6f9s
redirects:
  - /dcs/resources/faq/linux-static-mount
---

First, run the following command and find the name of the hard drive you wish to use (for example sda2)

```Text
lsblk
```

Once you find it, we will now get the Unique ID (**UUID**) of the hard drive

```bash
lsblk -d -fs /dev/<location (example: sda2)>
```

‌Copy the **UUID**, as well as the **FSTYPE.** We’ll need that later.‌ Next, we will create a new directory in the /mnt folder where you want your Storj files to be stored; you can name this directory whatever you would like.

```bash
sudo mkdir /mnt/<directory name>
```

‌Next, we will add our hard drive to the **etc/fstab** file

```bash
sudo nano /etc/fstab
```

‌Add the following line at the end of the file:

```bash
UUID=<your HD UUID> /mnt/<directory name> <FSTYPE> defaults 0 2
```

‌To save changes, press `Ctrl-X`, `Y`, `Enter`

Once saved, run the following command:

```Text
sudo mount -a
```

‌That’s it!‌ If you’d like to confirm, you can run this command again and your new mount point will be updated in the mount column

```bash
lsblk -d -fs /dev/<location (example: sda2)>
```

‌Congrats, you’ve successfully static mounted your hard drive!

