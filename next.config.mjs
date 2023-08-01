import withMarkdoc from '@markdoc/next.js'
import withSearch from './src/markdoc/search.mjs'
import withNavigation from './src/markdoc/navigation.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true, // Firebase is really slow at deploying when image optimization is enabled..
  },
  webpack(config) {
    // Needed to use node APIs such as `fs` in markdoc transformer,
    // works because we're the default static (getStaticProps) in @markdoc/next.js
    config.resolve.fallback = {
      ...config.resolve.fallback,

      fs: false,
    }

    return config
  },
}

export default withNavigation(
  withSearch(withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig))
)
