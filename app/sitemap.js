import {
  nodeBottomNav,
  dcsBottomNav,
  learnBottomNav,
  supportBottomNav,
  blogBottomNav,
} from '@/markdoc/navigation.mjs'

export default function sitemap() {
  return [
    dcsBottomNav,
    learnBottomNav,
    nodeBottomNav,
    supportBottomNav,
    blogBottomNav,
  ]
    .flat()
    .map(({ href }) => ({ url: `${process.env.SITE_URL}${href}` }))
}
