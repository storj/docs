import { nodes as defaultNodes } from '@markdoc/markdoc'
import { Tag } from '@markdoc/markdoc'
import { Link } from 'next/link'
import { transformer } from '@markdoc/markdoc'
import { Fence } from '@/components/Fence'
import { nodeBottomNav, dcsBottomNav } from '@/markdoc/navigation.mjs'

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
