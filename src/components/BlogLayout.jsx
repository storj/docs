import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Prose } from '@/components/Prose'
import TableOfContents from './TableOfContents'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import clsx from 'clsx'
import ShareButtons from '@/components/Share'
import Bio from '@/components/bio'
import LocalImage from '@/components/LocalImage'

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (child.type === 'text') {
      text += child.attributes.content
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.type === 'heading' && node.attributes.level <= 3) {
      let title = getNodeText(node)
      if (!title) {
        continue
      }

      let id = slugify(title)
      node.attributes.id = id
      if (
        sections.length > 0 &&
        sections[sections.length - 1].level < node.attributes.level
      ) {
        sections[sections.length - 1].children.push({
          ...node.attributes,
          title,
        })
      } else {
        sections.push({ ...node.attributes, title, children: [] })
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default async function BlogLayout({ children, href, frontmatter, ast }) {
  let tableOfContents = collectHeadings(ast.children)
  let {
    title,
    hideTitle,
    date,
    author: { name },
    heroimage,
  } = frontmatter
  return (
    <div>
      {heroimage && (
        <div className="flex w-full justify-center">
          <LocalImage src={heroimage} />
        </div>
      )}
      <div className="block lg:grid lg:grid-cols-content-toc">
        <main className="isolate ml-auto min-w-0 justify-self-center px-5 pt-3.5 sm:px-12 lg:ml-[5rem] lg:max-w-3xl xl:ml-[20rem] xl:max-w-4xl xl:py-16 ">
          <div className="mx-auto max-w-7xl">
            <Prose>
              <article className="mx-auto ml-0 max-w-3xl">
                <header
                  className={clsx(
                    hideTitle ? 'mb-9 dark:mb-14' : 'mb-9',
                    'space-y-1'
                  )}
                >
                  {title && !hideTitle && (
                    <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                      {title}
                    </h1>
                  )}
                  <Bio name={name} />
                  <time dateTime={new Date(date).toISOString().slice(0, 10)}>
                    {new Date(date).toLocaleDateString()}
                  </time>
                </header>
                {children}
                <ShareButtons
                  title={title}
                  url={href}
                  twitterHandle={frontmatter.author.twitter || 'storj'}
                  tags={frontmatter.tags}
                  reddit={frontmatter.reddit}
                  linkedin={frontmatter.linkedin}
                  hackernews={frontmatter.hackernews}
                  indiehackers={frontmatter.indiehackers}
                />
              </article>
              <PrevNextLinks />
            </Prose>
          </div>
        </main>
        <div className="hidden px-8 lg:sticky lg:top-[6rem] lg:block lg:h-[calc(100vh-6rem)] lg:flex-none lg:overflow-y-auto lg:py-16 lg:pr-14">
          <TableOfContents
            tableOfContents={tableOfContents}
            routeGroup="(blog)"
          />
        </div>
      </div>
    </div>
  )
}
