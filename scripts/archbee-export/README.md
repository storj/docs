
```
./rename -d spaces/My\ Downloads
exit
./organize -d spaces/my_downloads
exit
./transform-nextjs-pages -d new_docs_next
exit
./transform-nextjs -d new_docs_next
exit

# get ids for scraper
cat archbee.json | jq ' .. | objects | select(.id == "eXgL6hFd9xMzc3rhYsIHA").docsTree | .. | objects | select(.id != null) | .id '
exit

