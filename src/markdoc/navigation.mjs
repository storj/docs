import { createLoader } from 'simple-functional-loader'
import * as url from 'url'
import * as path from 'path'
import * as fs from 'fs'
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'

const __filename = url.fileURLToPath(import.meta.url)

// Used to display next and previous
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
    delete data.type
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

function convertToFirebaseRedirects(data) {
  return data.flatMap((item) =>
    item.redirects
      .filter((redirect) => redirect !== item.href)
      .map((redirect) => ({
        source: redirect,
        destination: item.href,
        type: 308,
      }))
  )
}

function getFrontmatter(filepath) {
  const md = fs.readFileSync(filepath, 'utf8')
  const ast = Markdoc.parse(md)
  const frontmatter = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {}
  return {
    title: frontmatter.title || path.basename(filepath),
    redirects: frontmatter.redirects,
    docId: frontmatter.docId,
    weight: frontmatter.weight,
  }
}

function walkDir(dir, space, currentPath = '') {
  const filepath =
    space == 'dcs' ? dir + '/../page.md' : path.join(dir, 'page.md')
  let fm = getFrontmatter(filepath)
  let entry = {
    ...fm,
    links: [],
    href: space == 'dcs' ? '/' : `/${space}`,
  }

  return [entry, ...walkDirRec(dir, space, currentPath)]
}

function walkDirRec(dir, space, currentPath) {
  let results = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    const relativePath = path.join(currentPath, file)

    if (stat && stat.isDirectory()) {
      let pageFilepath = path.join(filepath, 'page.md')
      // For directories that don't have an page.md
      let metaFilepath = path.join(filepath, '_meta.json')
      let title = file.charAt(0).toUpperCase() + file.slice(1)
      let fm = null
      if (fs.existsSync(pageFilepath)) {
        fm = getFrontmatter(pageFilepath)
      } else if (fs.existsSync(metaFilepath)) {
        const meta = fs.readFileSync(metaFilepath, 'utf8')
        fm = JSON.parse(meta)
      }
      let entry = {
        type: file,
        title,
        links: walkDirRec(filepath, space, relativePath),
      }
      if (fm) {
        entry = Object.assign(entry, fm)
      }
      if (fs.existsSync(pageFilepath)) {
        entry.href = `/${space}/${relativePath}`
      }
      results.push(entry)
    }
  })

  return results
}

function sortByWeightThenTitle(arr) {
  arr.sort((a, b) => {
    // If weight is undefined, set it to Infinity (or any large number)
    const weightA = a.weight !== undefined ? a.weight : Infinity
    const weightB = b.weight !== undefined ? b.weight : Infinity
    if (weightA !== weightB) {
      return weightA - weightB
    } else {
      return a.title.localeCompare(b.title)
    }
  })

  arr.forEach((item) => {
    if (item.links && Array.isArray(item.links)) {
      sortByWeightThenTitle(item.links)
    }
  })
}

export default function (nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            let dir = path.resolve('./app')
            this.addContextDependency(dir)

            let dcs = walkDir(`${dir}/dcs`, 'dcs')
            sortByWeightThenTitle(dcs)
            let node = walkDir(`${dir}/node`, 'node')
            sortByWeightThenTitle(node)
            let learn = walkDir(`${dir}/learn`, 'learn')
            sortByWeightThenTitle(learn)
            let support = walkDir(`${dir}/support`, 'support')
            sortByWeightThenTitle(support)

            let getRedirects = (space) => {
              let re = extractRedirects(space)
              let cov = convertToFirebaseRedirects(re)
              return cov
            }
            let redirs = [
              ...getRedirects(dcs),
              ...getRedirects(node),
              ...getRedirects(learn),
              ...getRedirects(support),
            ]
            let firebaseConfig = JSON.parse(
              fs.readFileSync('firebase.base.json', 'utf8')
            )

            firebaseConfig.hosting.redirects = [
              ...firebaseConfig.hosting.redirects,
              ...redirs,
            ]

            fs.writeFileSync(
              'firebase.json',
              JSON.stringify(firebaseConfig, null, 2)
            )

            let dcsBottomNav = extractHrefObjects(structuredClone(dcs))
            let nodeBottomNav = extractHrefObjects(structuredClone(node))
            let learnBottomNav = extractHrefObjects(structuredClone(learn))
            let supportBottomNav = extractHrefObjects(structuredClone(support))

            // When this file is imported within the application
            // the following module is loaded:
            return `
              export const dcsNavigation = ${JSON.stringify(dcs)}
              export const nodeNavigation = ${JSON.stringify(node)}
              export const learnNavigation = ${JSON.stringify(learn)}
              export const supportNavigation = ${JSON.stringify(support)}
              export const dcsBottomNav = ${JSON.stringify(dcsBottomNav)}
              export const nodeBottomNav = ${JSON.stringify(nodeBottomNav)}
              export const learnBottomNav = ${JSON.stringify(learnBottomNav)}
              export const supportBottomNav = ${JSON.stringify(
                supportBottomNav
              )}
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
