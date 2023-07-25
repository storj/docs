import fs from 'fs'
import path from 'path'
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'

function getFrontmatterTitleAndRedirects(filepath) {
  const md = fs.readFileSync(filepath, 'utf8')
  const ast = Markdoc.parse(md)
  const frontmatter = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {}
  return { title: frontmatter.title, redirects: frontmatter.redirects }
}

function walkDir(dir, space, currentPath = '') {
  let results = []

  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    const relativePath = path.join(currentPath, file)

    if (stat && stat.isDirectory()) {
      let indexFilepath = filepath + '/index.md'
      let title = file.charAt(0).toUpperCase() + file.slice(1)
      let redirects = null
      if (fs.existsSync(indexFilepath)) {
        let { title: newTitle, redirects: newRedirects } =
          getFrontmatterTitleAndRedirects(indexFilepath)
        title = newTitle
        redirects = newRedirects
      }
      let entry = {
        title,
        redirects,
        type: file,
        links: walkDir(filepath, space, relativePath),
      }
      if (fs.existsSync(indexFilepath)) {
        entry.href = `/${space}/${relativePath}`
      }
      results.push(entry)
    } else if (path.extname(file) === '.md' && file !== 'index.md') {
      let url = `${relativePath.replace(/\.md$/, '')}` // Remove .md extension
      results.push({
        ...getFrontmatterTitleAndRedirects(filepath),
        links: [],
        href: `/${space}/${url}`,
      })
    }
  })

  return results
}

function extractHrefObjects(data) {
  let hrefObjects = []

  // If data itself is an array, recursively extract from each item
  if (Array.isArray(data)) {
    for (let item of data) {
      hrefObjects = hrefObjects.concat(extractHrefObjects(item))
    }
    return hrefObjects
  }

  // Base case: If it's an object and has href, push it to results
  if (data && typeof data === 'object' && data.href) {
    delete data.links
    hrefObjects.push(data)
  }

  // If the object has a 'links' property and it's an array, iterate over it
  if (data.links && Array.isArray(data.links)) {
    for (let item of data.links) {
      hrefObjects = hrefObjects.concat(extractHrefObjects(item))
    }
  }

  return hrefObjects
}

function extractRedirects(data) {
  let redirects = []

  // If data itself is an array, recursively extract from each item
  if (Array.isArray(data)) {
    for (let item of data) {
      redirects = redirects.concat(extractRedirects(item))
    }
    return redirects
  }

  // Base case: If it's an object and has href, push it to results
  if (data && typeof data === 'object' && data.redirects) {
    redirects.push(data)
  }

  // If the object has a 'links' property and it's an array, iterate over it
  if (data.links && Array.isArray(data.links)) {
    for (let item of data.links) {
      redirects = redirects.concat(extractRedirects(item))
    }
  }

  return redirects
}

let result = extractRedirects(
  walkDir('/Users/dan/test/storj-docs-poc/src/pages/node/', 'node')
) // Replace with your starting directory path
result = result.flatMap((item) =>
  item.redirects
    .filter((redirect) => redirect !== item.href)
    .map((redirect) => ({
      source: redirect,
      destination: item.href,
      permanent: false,
    }))
)
console.log(JSON.stringify(result, null, 2))
