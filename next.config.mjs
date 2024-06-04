import path from 'path'
import withMarkdoc from '@markdoc/next.js'

import withSearch from './src/markdoc/search.mjs'
import withNavigation from './src/markdoc/navigation.mjs'
import { createLoader } from 'simple-functional-loader'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  output: 'export',
  distDir: 'dist',
  env: {
    SITE_URL: 'https://docs.storj.io',
    NEXT_PUBLIC_SITE_URL: 'https://docs.storj.io',
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.unshift({
      test: /\.md$/,
      use: [
        createLoader(function (source) {
          const relativePath = path.relative(process.cwd(), this.resourcePath)
          let cleanedPath = relativePath
            .replace('app', '')
            .replace('/page.md', '')

          if (cleanedPath === '') {
            cleanedPath = '/'
          }

          return (
            source +
            '\nexport const metadata = frontmatter.metadata || frontmatter.nextjs?.metadata || {};' +
            '\nmetadata.title = metadata.title || frontmatter.title;' +
            `\nmetadata.alternates = { canonical: "${cleanedPath}" };`
          )
        }),
      ],
    })

    return config
  },
}

export default withNavigation(
  withSearch(
    withMarkdoc({ schemaPath: './src/markdoc', nextjsExports: [] })(nextConfig)
  )
)
