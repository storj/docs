import {
  nodeBottomNav,
  dcsBottomNav,
  learnBottomNav,
  supportBottomNav,
} from '@/markdoc/navigation.mjs'

export function convertDocId(href) {
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
    console.warn(`Could not find docId: ${docId}`)
    return { title: null, href }
    //throw new Error(`Could not find docId: ${docId}`)
  }
  return {
    title: entry.title,
    href: `${entry.href}${fragment ? `#${fragment}` : ''}`,
  }
}
