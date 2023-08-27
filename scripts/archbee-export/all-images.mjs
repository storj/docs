import fs from 'fs'
import fg from 'fast-glob'

const imageRegex = /!\[.*?\]\((.*archbee.*.*?)\)/g

function updateAllImageUrls() {
  const filePaths = fg.sync('app/**/*.md') // This will search in all directories and subdirectories

  const allUrls = []

  for (const filePath of filePaths) {
    const urlsFromCurrentFile = extractImageUrlsFromMarkdown(filePath)
    allUrls.push(...urlsFromCurrentFile)
  }

  return allUrls
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

let urls = updateAllImageUrls()
fs.writeFileSync('images.json', JSON.stringify(urls))

console.log(urls)
