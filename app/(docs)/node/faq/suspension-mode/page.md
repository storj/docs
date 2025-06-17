---
title: Suspension mode
docId: 6514f956-dfeb-44a6-81a6-7f8a245af97b
redirects:
  - /hc/en-us/articles/360042257912-Suspension-mode
  - /hc/en-us/articles/360042257912
---
An overview of the [suspension mode design](https://forum.storj.io/t/design-draft-storage-node-suspended-state/4606?u=alexey)

[How does suspension mode work?](https://forum.storj.io/t/suspension-mode-and-disqualification-emails/6091)

[Explanation regarding suspension mode notification emails](https://forum.storj.io/t/node-suspension/6102/111)

# What should I do?
Please, search for the reason for failed audit [in your logs](docId:O68S24Iww4ZEnVk8yO7Mv). You should try to find the errors on the affected satellite(s) starting around the timestamp mentioned in the suspension mode notification email you received.

## Linux/MacOS bash
```
docker logs storagenode 2>&1 | grep -E "GET_AUDIT|GET_REPAIR" | grep failed
```

## Linux/MacOS bash for [redirected logs](docId:EeyBBKEeuNK5oqkB4EyU0)
```
grep -E "GET_AUDIT|GET_REPAIR" /mnt/storj/storagenode/node.log | grep failed
```

## Windows Docker Powershell
```
docker logs storagenode 2>&1 | sls "GET_AUDIT|GET_REPAIR" | sls failed
```

## Windows GUI Powershell
```
sls "GET_AUDIT|GET_REPAIR" "C:\Program Files\Storj\Storage Node\storagenode.log" | sls failed
```

## Windows Powershell for [redirected logs](docId:EeyBBKEeuNK5oqkB4EyU0)
```
sls "GET_AUDIT|GET_REPAIR" "x:\storagenode\node.log" | sls failed
```

Once you have found the error(s), search for threads mentioning these errors [on the forum](https://forum.storj.io/search?expanded=true) so you can find what are the steps to fix the error. Once you have fixed the error that led your node to get suspended, it should get unsuspended fairly soon after and you should start seeing new uploads for that satellite in your logs, which indicates that the node is no longer suspended.
