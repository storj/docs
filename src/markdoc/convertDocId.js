import { readFileSync, existsSync } from 'fs'
import * as path from 'path'
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'
import {
  nodeBottomNav,
  dcsBottomNav,
  learnBottomNav,
  supportBottomNav,
  blogBottomNav,
  oMountBottomNav,
} from '@/markdoc/navigation.mjs'

function getFrontmatter(filePath) {
  const md = readFileSync(filePath, 'utf8')
  const ast = Markdoc.parse(md)
  const frontmatter = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {}
  return {
    docId: frontmatter.docId,
  }
}

export function convertDocId(href) {
  const siteHost = new URL(process.env.SITE_URL).host
  if (href?.includes(siteHost)) {
    const url = new URL(href)
    let dir = path.resolve('./app')
    const filePath = path.join(dir, url.pathname, 'page.md')
    if (existsSync(filePath)) {
      let { docId } = getFrontmatter(filePath)
      throw new Error(
        `Internal links should use the docId. replace ${href} with docId:${docId}`
      )
    }
    throw new Error(`Could not find document for ${href}`)
  }

  if (!href?.startsWith('docId')) {
    return { title: null, href }
  }

  let parts = href.split(':')
  let [docId, fragment] = parts[1].split('#')
  let entry = nodeBottomNav.find((o) => o.docId === docId)
  if (!entry) {
    entry = dcsBottomNav.find((o) => o.docId === docId)
  }
  if (!entry) {
    entry = supportBottomNav.find((o) => o.docId === docId)
  }
  if (!entry) {
    entry = learnBottomNav.find((o) => o.docId === docId)
  }
  if (!entry) {
    entry = blogBottomNav.find((o) => o.docId === docId)
  }
  if (!entry) {
    entry = oMountBottomNav.find((o) => o.docId === docId)
  }
  if (!entry) {
    throw new Error(`Could not find docId: ${docId}`)
  }
  return {
    title: entry.title,
    href: `${entry.href}${fragment ? `#${fragment}` : ''}`,
  }
}
