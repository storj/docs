import {
  nodeBottomNav,
  dcsBottomNav,
  learnBottomNav,
  supportBottomNav,
} from '@/markdoc/navigation.mjs'

export default function sitemap() {
  return [dcsBottomNav, learnBottomNav, nodeBottomNav, supportBottomNav]
    .flat()
    .map(({ href }) => ({ url: `${process.env.SITE_URL}${href}` }))
}
