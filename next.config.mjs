import withSearch from './src/markdoc/search.mjs'
import withNavigation from './src/markdoc/navigation.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  env: {
    SITE_URL: 'https://docs-storj.vercel.app',
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(md|mdoc)$/,
      use: [
        // Adding the babel loader enables fast refresh
        options.defaultLoaders.babel,
        {
          loader: './src/markdoc-loader/loader',
          options: {
            dir: options.dir,
            schemaPath: './src/markdoc',
          },
        },
      ],
    })

    return config
  },
}

export default withNavigation(withSearch(nextConfig))
