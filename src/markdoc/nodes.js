import { nodes as defaultNodes } from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import yaml from 'js-yaml'
import { Tag } from '@markdoc/markdoc'
import { Link } from 'next/link'
import MarkdownLayout from '@/components/MarkdownLayout'
import Fence from '@/components/Fence'
import probe from 'probe-image-size'
import crypto from 'crypto'
import imageSizeCache from '../../.image-size-cache.json'
import { convertDocId } from './convertDocId'
import { Heading } from '@/components/Heading'
import { ImageWrap, handleImageAsset } from '@/lib/image-tool'

let documentSlugifyMap = new Map()

const nodes = {
  document: {
    ...defaultNodes.document,
    render: MarkdownLayout,
    async transform(node, config) {
      documentSlugifyMap.set(config, slugifyWithCounter())
      let frontmatter = yaml.load(node.attributes.frontmatter)

      if (frontmatter.layout === 'blog') {
        return new Tag(
          'Blog',
          { frontmatter, ast: node },
          await node.transformChildren(config)
        )
      }

      return new Tag(
        this.render,
        { frontmatter: yaml.load(node.attributes.frontmatter), ast: node },
        await node.transformChildren(config)
      )
    },
  },
  heading: {
    render: Heading,
    attributes: {
      level: { type: Number, required: true },
      anchor: { type: Boolean, default: true },
    },
    async transform(node, config) {
      let slugify = documentSlugifyMap.get(config) || slugifyWithCounter() // partials don't have the same config
      let attributes = node.transformAttributes(config)
      let children = await node.transformChildren(config)
      let text = children.filter((child) => typeof child === 'string').join(' ')
      let id = attributes.id ?? slugify(text)

      return new Tag(this.render, { ...attributes, id }, children)
    },
  },
  list: {
    ...defaultNodes.list,
    // support async transforms
    async transform(node, config) {
      return new Tag(
        node.attributes.ordered ? 'ol' : 'ul',
        node.transformAttributes(config),
        await node.transformChildren(config)
      )
    },
  },
  link: {
    render: Link,
    attributes: {
      ...defaultNodes.link.attributes,
    },
    children: defaultNodes.children,
    async transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = await node.transformChildren(config)
      if (!attributes.href) {
        return new Tag('a', attributes, children)
      }

      let { title, href } = convertDocId(attributes.href)
      let tag = new Tag(
        'a',
        href ? { href } : attributes,
        children.length === 0 && title ? [title] : children
      )
      return tag
    },
  },
  image: {
    render: ImageWrap,
    attributes: {
      ...defaultNodes.image.attributes,
    },
    children: defaultNodes.children,
    async transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)

      const src = attributes.src
      if (!src.includes('http')) {
        // if it's a local image, copy it to the public/images folder
        if (src.startsWith('./')) {
          let output = await handleImageAsset(null, null, src)
          return new Tag(
            'img',
            {
              className: 'rounded-lg border-2 border-gray-600',
              src: output.src,
              alt: attributes.alt,
              loading: 'lazy',
              decoding: 'async',
              width: output.width,
              height: output.height,
            },
            children
          )
        }

        return new Tag('img', attributes, children)
      }

      const hash = crypto.createHash('md5').update(attributes.src).digest('hex')
      let result = imageSizeCache[hash]
      if (!result) {
        console.warn(`image size not cached, probing... ${attributes.src}`)
        try {
          result = await probe(attributes.src)
        } catch (err) {
          throw new Error(`${err}\nOccurred on ${attributes.src}`)
        }
      }

      return new Tag(
        this.render,
        { ...attributes, width: result.width, height: result.height },
        children
      )
    },
  },
  table: {
    render: ({ children }) => {
      return (
        <div className="overflow-x-auto">
          <table>{children}</table>
        </div>
      )
    },
  },
  th: {
    ...defaultNodes.th,
    attributes: {
      ...defaultNodes.th.attributes,
      scope: {
        type: String,
        default: 'col',
      },
    },
  },
  fence: {
    render: Fence,
    attributes: {
      title: {
        type: String,
      },
      language: {
        type: String,
      },
      lineNumbers: {
        type: Boolean,
      },
    },
  },
}

export default nodes
