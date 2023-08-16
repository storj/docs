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
    SITE_URL: 'https://docs-storj.vercel.app',
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
          return (
            source + '\nexport const metadata = frontmatter.nextjs?.metadata;'
          )
        }),
      ],
    })

    return config
  },
}

export default withNavigation(
  withSearch(withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig))
)
