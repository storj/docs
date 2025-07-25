import {
  nodeBottomNav,
  dcsBottomNav,
  learnBottomNav,
  supportBottomNav,
  blogBottomNav,
  oMountBottomNav,
} from '@/markdoc/navigation.mjs'

export const dynamic = "force-static"

export default function sitemap() {
  return [
    dcsBottomNav,
    learnBottomNav,
    nodeBottomNav,
    supportBottomNav,
    blogBottomNav,
    oMountBottomNav,
  ]
    .flat()
    .map(({ href }) => ({ url: `${process.env.SITE_URL}${href}` }))
}
