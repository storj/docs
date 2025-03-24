import {
  nodeBottomNav,
  dcsBottomNav,
  learnBottomNav,
  supportBottomNav,
  blogBottomNav,
  objectMountBottomNav,
} from '@/markdoc/navigation.mjs'

export default function sitemap() {
  return [
    dcsBottomNav,
    learnBottomNav,
    nodeBottomNav,
    supportBottomNav,
    blogBottomNav,
    objectMountBottomNav,
  ]
    .flat()
    .map(({ href }) => ({ url: `${process.env.SITE_URL}${href}` }))
}
