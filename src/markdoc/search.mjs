import { createLoader } from 'simple-functional-loader'
import glob from 'fast-glob'
import * as url from 'url'
import * as path from 'path'
import * as fs from 'fs'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import Markdoc from '@markdoc/markdoc'

const __filename = url.fileURLToPath(import.meta.url)
const slugify = slugifyWithCounter()

function toString(node) {
  let str =
    node.type === 'text' && typeof node.attributes?.content === 'string'
      ? node.attributes.content
      : ''
  if ('children' in node) {
    for (let child of node.children) {
      str += toString(child)
    }
  }
  return str
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }
  if (node.type === 'heading' || node.type === 'paragraph') {
    let content = toString(node).trim()
    if (node.type === 'heading' && node.attributes.level <= 2) {
      let hash = node.attributes?.id ?? slugify(content)
      sections.push([content, hash, []])
    } else {
      sections.at(-1)[2].push(content)
    }
  } else if ('children' in node) {
    for (let child of node.children) {
      extractSections(child, sections, false)
    }
  }
}

export default function (nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            let dir = path.resolve('./app')
            this.addContextDependency(dir)

            let files = glob.sync('**/*.md', { cwd: dir })
            let data = files.map((file) => {
              let url = null
              if (file.endsWith('page.md')) {
                url = `/${file.replace(/page\.md$/, '')}`.slice(0, -1) // remove trailing slash
              } else {
                url = `/${file.replace(/\.md$/, '')}`
              }
              let md = fs.readFileSync(path.join(dir, file), 'utf8')

              let sections

              if (cache.get(file)?.[0] === md) {
                sections = cache.get(file)[1]
              } else {
                let ast = Markdoc.parse(md)
                let title =
                  ast.attributes?.frontmatter?.match(
                    /^title:\s*(.*?)\s*$/m
                  )?.[1]
                // [title, hash, content]
                sections = [[title, null, []]]
                extractSections(ast, sections)
                cache.set(file, [md, sections])
              }

              return { url, sections }
            })

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              let sectionIndex = new FlexSearch.Document({
                tokenize: 'full',
                document: {
                  id: 'url',
                  index: 'content',
                  store: ['title', 'pageTitle', 'paragraphs'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                }
              })

              let data = ${JSON.stringify(data)}

              for (let { url, sections } of data) {
                for (let [title, hash, content] of sections) {
                  sectionIndex.add({
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                    ...(content[0] && { paragraphs: content })
                  })
                }
              }

              export function search(query, options = {}) {
                let result = sectionIndex.search(query, {
                  ...options,
                  enrich: true,
                })
                if (result.length === 0) {
                  return []
                }
                return result[0].result.map((item) => {
                  const spaceCount = 10; // Number of spaces before and after the match for the snippet
                  // match a space only if it is followed by a non-whitespace character
                  const regex = new RegExp(query.trim().replace(/ (?=\\S)/g, '|'), 'i');
                  const matchingSnippets = item.doc.paragraphs?.map(paragraph => {
                    const index = paragraph.search(regex);

                    if (index !== -1) {
                      let start = index;
                      let end = index;

                      // Find the start index
                      for (let i = 0; i < spaceCount; i++) {
                        start = paragraph.lastIndexOf(' ', start - 1);
                        if (start === -1) {
                          start = 0;
                          break;
                        }
                      }

                      // Find the end index
                      for (let i = 0; i < spaceCount + 1; i++) { // +1 to include the matched query
                        end = paragraph.indexOf(' ', end + 1);
                        if (end === -1) {
                          end = paragraph.length;
                          break;
                        }
                      }

                      return paragraph.substring(start, end).trim();
                    }

                    return null;
                  }).filter(Boolean);

                  return {
                    url: item.id,
                    title: item.doc.title,
                    pageTitle: item.doc.pageTitle,
                    snippets: matchingSnippets?.slice(0, 5).join("..."),
                  }
                })
              }
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
