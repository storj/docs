import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Prose } from '@/components/Prose'
import TableOfContents from './TableOfContents'
import { PrevNextLinks } from '@/components/PrevNextLinks'

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
    if (
      node.type === 'heading' &&
      (node.attributes.level === 2 || node.attributes.level === 3)
    ) {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.attributes.level === 3) {
          if (!sections[sections.length - 1]) {
            throw new Error(
              `Cannot add 'h3' to table of contents without a preceding 'h2'\n${title}`
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function DocsLayout({
  children,
  frontmatter: { title, hideTitle = false },
  ast,
}) {
  let tableOfContents = collectHeadings(ast.children)
  return (
    <>
      <main className="isolate min-w-0 px-5 pt-3.5 sm:px-12 xl:py-16 ">
        <div className="mx-auto max-w-7xl">
          <article className="ml-0 max-w-4xl 2xl:mx-auto">
            {title && !hideTitle && (
              <header className="mb-9 space-y-1">
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}

            <Prose>{children}</Prose>
          </article>
          <PrevNextLinks />
        </div>
      </main>
      <div className="hidden px-8 xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-14">
        <TableOfContents tableOfContents={tableOfContents} />
      </div>
    </>
  )
}
