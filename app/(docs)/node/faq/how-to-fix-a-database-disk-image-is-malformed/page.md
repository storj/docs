---
title: How to fix a "database disk image is malformed"
docId: b75703c5-1484-4a1d-88fe-eb489dfc5554
redirects:
  - /hc/en-us/articles/360029309111-How-to-fix-a-database-disk-image-is-malformed
  - /hc/en-us/articles/360029309111-How-to-fix-a-database-disk-image-is-malformed-
  - /hc/en-us/articles/360029309111
---
# Problem
Sometimes a Storage Node Operator may encounter the "database disk image is malformed" error in their log. This could happen during unplanned shutdown or reboot. The error indicates that one or more of the `sqlite3` databases may have become corrupted.

# Solution
Firstly, we should try to verify the database with an embedded SQLite3 command. So, we need to have `sqlite3` installed (v3.25.2 or later). The installation steps depend on the OS.


1. [Stop the storagenode]()
2. Make a backup of all the sqlite3 databases. They are located in the storage folder for your data storage. For example `x:\storagenode\storage\bandwidth.db`, where `x:\storagenode` is the data folder you had specified in the `--mount type=bind,source=x:\storagenode,destination=/app/config` option of the `docker run` command for your storagenode, or `x:\storagenode\storage` in case of using the Windows GUI, in the `storage.path:` option of the [config.yaml](docId:gDXZgLlP_rcSW8SuflgqS) file.
3. Check each database for errors. We will use `bandwidth.db` as an example in this guide.

{% tabs %}
{% tab label="Docker version of sqlite3" %}
We will use Docker instead of direct installation (this option is available only for x86_64 CPUs, for arm-based boards you will need to install sqlite3 via the package manager of your OS). See the next tab.

replace ${PWD} with an absolute path to the databases location, or simple switch the current location to there
```shell
docker run --rm -it --mount type=bind,source=${PWD},destination=/data sstc/sqlite3 find . -maxdepth 1 -iname "*.db" -print0 -exec sqlite3 '{}' 'PRAGMA integrity_check;' ';'
```
{% /tab %}
{% tab label="Direct installation of sqlite3" %}
{% tabs %}
{% tab label="Linux" %}
```bash
sudo apt update && sudo apt install sqlite3 -y
```
{% /tab %}
{% tab label="Windows" %}

[https://www.sqlitetutorial.net/download-install-sqlite/](https://www.sqlitetutorial.net/download-install-sqlite/)
{% /tab %}
{% /tabs %}

Make sure that the version is v3.25.2 or later, otherwise the check will not work correctly.
```shell
sqlite3 --version
```
perform the integrity check for each database, for example for `bandwidth.db`:
```shell
sqlite3 /path/to/storage/bandwidth.db "PRAGMA integrity_check;"
```

Or check all databases with help of shell commands:
{% tabs %}
{% tab label="Linux" %}
```bash
find /path/to/storage/ -maxdepth 1 -iname "*.db" -print0 -exec sqlite3 '{}' 'PRAGMA integrity_check;' ';'
```
{% /tab %}
{% tab label="Windows" %}
```powershell
Get-ChildItem X:\storagenode\storage\*.db -File | %{$_.Name + " " + $(sqlite3.exe $_.FullName "PRAGMA integrity_check;")}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}

4. If you see errors in the output, then the check did not pass. We will unload all uncorrupted data and then load it back. But this could sometimes fail, too. If no errors occur here, you can skip all the following steps and start the storagenode again.
5. If you were not lucky and the check failed, then please try to fix the corrupted database(s) as shown below.

6. Open a shell
{% tabs %}
{% tab label="Docker version of sqlite3" %}
Open a shell Inside the container:
```shell
docker run --rm -it --mount type=bind,source=x:\storagenode\storage,destination=/storage sstc/sqlite3 sh
```
{% callout type="info" %}
Tip. You can use tmpfs to restore your databases. It uses memory instead of disk and should take a lot less time than on HDD (you can read more about usage of tmpfs with Docker in the Use tmpfs mounts guide or this forum comment). For Windows or MacOS you must increase the allocated RAM for the docker's VM via Docker desktop application to fit a double size of the greatest corrupted database file in case of usage of tmpfs.
{% /callout %}
{% /tab %}
{% tab label="Direct installation of sqlite3" %}
You could use your shell directly if you have sqlite3 installed. In that case, use the path to your storage instead of `"/storage/"` across this guide below.

For Windows with local sqlite3 installed, we recommend to use a PowerShell to execute the commands below. Don't forget to replace the `"/storage/"` folder with your local path to the folder where the databases are stored. If the `sqlite3.exe` executable is not in the system variable `PATH`, then you should specify the full path to it or run from the location of the executable.
{% /tab %}
{% /tabs %}

7. Now run the following commands in the shell. You need to repeat steps 7 to 12 for each corrupted sqlite3 database:
```shell
cp /storage/bandwidth.db /storage/bandwidth.db.bak
sqlite3 /storage/bandwidth.db
```

8. You will see a prompt from sqlite3. Run this SQL script:
```sql
.mode insert
.output /storage/dump_all.sql
.dump
.exit
```

9. We will edit the SQL file dump_all.sql
{% tabs %}
{% tab label="Linux or docker version" %}
```
{ echo "PRAGMA synchronous = OFF ;"; cat /storage/dump_all.sql; } | grep -v -e TRANSACTION -e ROLLBACK -e COMMIT >/storage/dump_all_notrans.sql
```
{% /tab %}
{% tab label="PowerShell (Windows) with a local sqlite3 version" %}
```
$(echo "PRAGMA synchronous = OFF ;"; Get-Content dump_all.sql) | Select-String -NotMatch "TRANSACTION|ROLLBACK|COMMIT" | Set-Content -Encoding utf8 dump_all_notrans.sql
```
{% /tab %}
{% /tabs %}

10. Remove the corrupted database (make sure that you have a backup!)
```shell
rm /storage/bandwidth.db
```

11. Now we will load the unloaded data into the new database
```shell
sqlite3 /storage/bandwidth.db ".read /storage/dump_all_notrans.sql"
```

12. Check that the new database (bandwidth.db in our example) has a size larger than 0:

{% tabs %}
{% tab label="Linux or docker version" %}
```shell
ls -l /storage/bandwidth.db
```
{% /tab %}
{% tab label="PowerShell (Windows) with a local sqlite3 version" %}
```powershell
ls /storage/bandwidth.db
```
{% /tab %}
{% /tabs %}
13. Exit from the container (skip this step, if you use a directly installed sqlite3)
```shell
exit
```
14. If you are lucky and all corrupted `sqlite3` databases are fixed, then you can start the storagenode again.

{% callout type="warning" %}
Warning. If you were not successful with the fix of the database, then your stat is lost.

You need to follow the guide [How to fix database: file is not a database error](docId:f8bed9a6-755f-4860-a5bb-ce2b1a51f8b0).
{% /callout %}

# Prevention
On Windows: disable the write cache. Consider migrating to the [Windows GUI](docId:LAtWfg_LTgbI5yJ8PILUI) instead of using Docker.

On Unraid: update to the latest version of the platform (the bug is fixed in the 6.8.0-rc5 as seen in [this comment](https://forums.unraid.net/bug-reports/prereleases/sqlite-data-corruption-testing-r664/page/4/?tab=comments#comment-6650)) or rollback to version [6.6.7](https://forums.unraid.net/topic/80439-downgraded-back-to-667-due-to-sqlite-corruption/).

On Docker: use the updated docker run command from the documentation: [](docId:HaDkV_0aWg9OJoBe53o-J)

## Common Problems
Make sure that you are not using NFS or SMB to connect to the storage, they are not compatible with SQLite. The only working network protocol is iSCSI.

Make sure that your external USB drive has enough power and it does not turn off during operations. It's better to avoid using them and use only internal drives.
