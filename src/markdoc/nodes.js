import { nodes as defaultNodes } from '@markdoc/markdoc'
import { Tag } from '@markdoc/markdoc'
import { Link } from 'next/link'
import Fence from '@/components/Fence'
import { nodeBottomNav, dcsBottomNav } from '@/markdoc/navigation.mjs'
import probe from 'probe-image-size'
import crypto from 'crypto'
import imageSizeCache from '../../.image-size-cache.json'

const ImageWrap = ({ src, alt, width, height }) => {
  // TODO size the image at build, but this works well enough in the meantime
  let imgStyle = 'xs:max-w-full sm:max-w-sm max-h-96'
  if (width > height) {
    imgStyle = 'max-w-full'
    if (height >= 400) {
      imgStyle = 'w-auto max-h-96'
    }
  }
  return (
    <a target="_blank" rel="noreferrer" href={src}>
      <img className={`object-fit ${imgStyle} `} src={src} alt={alt} />
    </a>
  )
}

const nodes = {
  link: {
    render: Link,
    attributes: {
      ...defaultNodes.link.attributes,
    },
    children: defaultNodes.children,
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      if (attributes.href?.startsWith('docId')) {
        let parts = attributes.href.split(':')
        let docId = parts[1]
        let entry = nodeBottomNav.find((o) => o.docId === docId)
        if (!entry) {
          entry = dcsBottomNav.find((o) => o.docId === docId)
        }

        let tag = new Tag(
          'a',
          entry?.href ? { href: entry.href } : attributes,
          children.length === 0 && entry?.title ? [entry.title] : children
        )
        return tag
      }
      return new Tag('a', attributes, children)
    },
  },
  document: {
    render: undefined,
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
      if (!attributes.src.includes('http')) {
        return new Tag('img', attributes, children)
      }
      const hash = crypto.createHash('md5').update(attributes.src).digest('hex')
      let result = imageSizeCache[hash]
      if (!result) {
        result = await probe(attributes.src)
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
      language: {
        type: String,
      },
    },
  },
}

export default nodes
