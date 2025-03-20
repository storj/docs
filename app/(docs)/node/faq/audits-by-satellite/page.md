---
title: Audits by satellite
docId: 83d85755-010d-4ace-9b44-5ff5df4097a3
metadata:
  title: Audits by satellite
  description: Do you want to know the audit statistics by satellite for your node? Here is the script to find out!
redirects:
  - /hc/en-us/articles/360030997132-Audits-by-satellite
  - /hc/en-us/articles/360030997132
---
## Docker version (bash)
```shell
for sat in `docker exec -i storagenode wget -qO - localhost:14002/api/sno | jq .satellites[].id -r`; do docker exec -i storagenode wget -qO - localhost:14002/api/sno/satellite/$sat | jq .id,.audits; done
```

## Docker version (Powershell)
```powershell
(docker exec -i storagenode wget -qO - localhost:14002/api/sno | ConvertFrom-Json).satellites.id | %{"$_"; (docker exec -i storagenode wget -qO - localhost:14002/api/sno/satellite/$_ | ConvertFrom-Json).audits}
```

## Dashboard is port mapped (bash)
```shell
for sat in `wget -qO - localhost:14002/api/sno | jq .satellites[].id -r`; do wget -qO - localhost:14002/api/sno/satellite/$sat | jq .id,.audits; done
```

## Dashboard is port mapped or Windows GUI (Powershell)
```powershell
((curl http://127.0.0.1:14002/api/sno).Content | ConvertFrom-Json).satellites.id | %{"$_"; ((curl http://127.0.0.1:14002/api/sno/satellite/$_).Content | ConvertFrom-Json).audits}
```
