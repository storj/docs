import {
  nodeBottomNav,
  dcsBottomNav,
  learnBottomNav,
  supportBottomNav,
  blogBottomNav,
  cunosfBottomNav,
} from '@/markdoc/navigation.mjs'

export default function sitemap() {
  return [
    dcsBottomNav,
    learnBottomNav,
    nodeBottomNav,
    supportBottomNav,
    blogBottomNav,
    cunosfBottomNav,
  ]
    .flat()
    .map(({ href }) => ({ url: `${process.env.SITE_URL}${href}` }))
}
