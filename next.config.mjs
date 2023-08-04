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
