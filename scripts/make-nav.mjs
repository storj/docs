import fs from 'fs'
import path from 'path'
import Markdoc from '@markdoc/markdoc'

function getTitleFromMdFile(filepath) {
  const md = fs.readFileSync(filepath, 'utf8')
  const ast = Markdoc.parse(md)
  return ast.attributes?.frontmatter?.match(/^title:\s*(.*?)\s*$/m)?.[1] || '' // Default to empty string if title isn't found
}

function walkDir(dir, currentPath = '') {
  let results = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    const relativePath = path.join(currentPath, file)

    if (stat && stat.isDirectory()) {
      let indexFilepath = filepath + '/index.md'
      let title = fs.existsSync(indexFilepath)
        ? getTitleFromMdFile(indexFilepath)
        : file.charAt(0).toUpperCase() + file.slice(1)
      let entry = {
        title: title,
        type: file,
        links: walkDir(filepath, relativePath),
      }
      if (fs.existsSync(indexFilepath)) {
        entry.href = `/dcs/${relativePath}`
      }
      results.push(entry)
    } else if (path.extname(file) === '.md' && file !== 'index.md') {
      let url = `${relativePath.replace(/\.md$/, '')}` // Remove .md extension
      results.push({
        title: getTitleFromMdFile(filepath),
        href: `/dcs/${url}`,
      })
    }
  })

  return results
}

const result = walkDir('/Users/dan/test/storj-docs-poc/src/pages/dcs') // Replace with your starting directory path
console.log(JSON.stringify(result, null, 2))
