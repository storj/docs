import { Tag } from '@markdoc/markdoc'

import { Callout } from '@/components/Callout'
import { CodeGroup } from '@/components/Code'
import { Tabs, Tab } from '@/components/Tabs'
import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import { TagLinks } from '@/components/TagLinks'
import PartnerIntegration from '@/components/PartnerIntegration'
import YouTubeEmbed from '@/components/YouTubeEmbed'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  tabs: {
    render: Tabs,
    attributes: {},
    async transform(node, config) {
      const children = await node.transformChildren(config)

      const labels = children
        .filter((child) => child && child.name === 'Tab')
        .map((tab) => (typeof tab === 'object' ? tab.attributes.label : null))

      return new Tag(this.render, { labels }, children)
    },
  },
  tab: {
    render: Tab,
    attributes: {
      label: {
        type: String,
      },
    },
  },
  'partner-integration': {
    render: PartnerIntegration,
  },
  'code-group': {
    render: CodeGroup,
    async transform(node, config) {
      const languages = await node
        .transformChildren(config)
        .filter((child) => {
          return child && child.name === 'Fence'
        })
        .map((tab) =>
          typeof tab === 'object'
            ? tab.attributes.title || tab.attributes.language
            : null
        )
      let attributes = node.transformAttributes(config)

      return new Tag(
        this.render,
        { ...attributes, languages },
        node.transformChildren(config)
      )
    },
    attributes: {
      label: {
        type: String,
      },
    },
  },
  'tag-links': {
    render: TagLinks,
    attributes: {
      tag: { type: String, required: true },
      directory: { type: String, required: true },
    },
    matches: [
      'backup',
      'large-file',
      'file-management',
      'scientific',
      'cloud-ops',
      'content-delivery',
    ],
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  'youtube-embed': {
    selfClosing: true,
    render: YouTubeEmbed,
    attributes: {
      videoId: { type: String, required: true },
    },
  },
}

export default tags
