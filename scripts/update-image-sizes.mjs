import fs from 'fs'
import fg from 'fast-glob'
import crypto from 'crypto'
import probe from 'probe-image-size'

// Since images rarely change, it's kinda pointless to always be probing for their size

// Regular expression to match the markdown image syntax
const imageRegex = /!\[.*?\]\((.*?)\)/g

async function getImageSizes(urls) {
  const headersHash = {}

  const results = await Promise.allSettled(urls.map((url) => probe(url)))

  for (const result of results) {
    if (result.status === 'fulfilled') {
      const { url, ...rest } = result.value
      if (url) {
        const hash = crypto.createHash('md5').update(url).digest('hex')

        headersHash[hash] = { ...rest }
      } else {
        console.warn(`No size for URL: ${result.value.url}`)
      }
    } else {
      console.error(`Failed to fetch size URL: ${result.reason}`)
    }
  }

  return headersHash
}

function extractImageUrlsFromMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')

  let match
  const urls = []

  while ((match = imageRegex.exec(content)) !== null) {
    let url = match[1]
    if (url.startsWith('http')) {
      urls.push(url)
    }
  }

  return urls
}

function updateAllImageUrls() {
  const filePaths = fg.sync('app/**/*.md') // This will search in all directories and subdirectories

  const allUrls = []

  for (const filePath of filePaths) {
    const urlsFromCurrentFile = extractImageUrlsFromMarkdown(filePath)
    allUrls.push(...urlsFromCurrentFile)
  }

  return allUrls
}

const imageUrls = updateAllImageUrls()
getImageSizes(imageUrls).then((result) => {
  // TODO have it upload to storj instead
  fs.writeFileSync('.image-size-cache.json', JSON.stringify(result, null, 2))
})
