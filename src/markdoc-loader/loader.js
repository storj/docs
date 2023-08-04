// Fork of https://github.com/markdoc/next.js
const fs = require('fs')
const path = require('path')
const Markdoc = require('@markdoc/markdoc')

const DEFAULT_SCHEMA_PATH = './markdoc'

function normalize(s) {
  return s.replace(/\\/g, path.win32.sep.repeat(2))
}

async function gatherPartials(ast, schemaDir, tokenizer) {
  let partials = {}

  for (const node of ast.walk()) {
    const file = node.attributes.file

    if (
      node.type === 'tag' &&
      node.tag === 'partial' &&
      typeof file === 'string' &&
      !partials[file]
    ) {
      const filepath = path.join(schemaDir, file)
      // parsing is not done here because then we have to serialize and reload from JSON at runtime
      const content = await fs.promises.readFile(filepath, {
        encoding: 'utf8',
      })

      if (content) {
        const tokens = tokenizer.tokenize(content)
        const ast = Markdoc.parse(tokens)
        partials = {
          ...partials,
          [file]: content,
          ...(await gatherPartials.call(this, ast, schemaDir, tokenizer)),
        }
      }
    }
  }

  return partials
}

// Returning a JSX object is what allows fast refresh to work
async function load(source) {
  // https://webpack.js.org/concepts/module-resolution/
  const resolve = this.getResolve({
    // https://webpack.js.org/api/loaders/#thisgetresolve
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '...'],
    preferRelative: true,
  })

  const {
    dir, // Root directory from Next.js (contains next.config.js)
    schemaPath = DEFAULT_SCHEMA_PATH,
    tokenizerOptions = undefined,
  } = this.getOptions() || {}

  const tokenizer = new Markdoc.Tokenizer(tokenizerOptions)

  const schemaDir = path.resolve(dir, schemaPath || DEFAULT_SCHEMA_PATH)
  const tokens = tokenizer.tokenize(source)
  const ast = Markdoc.parse(tokens)

  // Grabs the path of the file relative to the `/pages` directory
  // to pass into the app props later.
  // This array access @ index 1 is safe since Next.js guarantees that
  // all pages will be located under either pages/ or src/pages/
  // https://nextjs.org/docs/advanced-features/src-directory
  const filepath = this.resourcePath.split('app')[1]

  const partials = await gatherPartials.call(
    this,
    ast,
    path.resolve(schemaDir, 'partials'),
    tokenizer
  )

  // IDEA: consider making this an option per-page
  let schemaCode = 'const schema = {};'
  try {
    const directoryExists = await fs.promises.stat(schemaDir)

    // This creates import strings that cause the config to be imported runtime
    async function importAtRuntime(variable) {
      try {
        const theModule = await resolve(schemaDir, variable)
        return `import * as ${variable} from '${normalize(theModule)}'`
      } catch (error) {
        return `const ${variable} = {};`
      }
    }

    if (directoryExists) {
      schemaCode = `
        ${await importAtRuntime('config')}
        ${await importAtRuntime('tags')}
        ${await importAtRuntime('nodes')}
        ${await importAtRuntime('functions')}
        const schema = {
          tags: defaultObject(tags),
          nodes: defaultObject(nodes),
          functions: defaultObject(functions),
          ...defaultObject(config),
        };`
        .trim()
        .replace(/^\s+/gm, '')
    }
  } catch (error) {
    // Only throw module not found errors if user is passing a custom schemaPath
    if (schemaPath && schemaPath !== DEFAULT_SCHEMA_PATH) {
      throw new Error(`Cannot find module '${schemaPath}' at '${schemaDir}'`)
    }
  }

  this.addContextDependency(schemaDir)
  const result = `import React from 'react';
import yaml from 'js-yaml';
// renderers is imported separately so Markdoc isn't sent to the client
import Markdoc, {renderers} from '@markdoc/markdoc'
import MarkdownLayout from '@/components/MarkdownLayout'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import {
  dcsBottomNav,
  nodeBottomNav,
  learnBottomNav,
  supportBottomNav,
} from '@/markdoc/navigation.mjs'

import {getSchema, defaultObject} from '${normalize(
    await resolve(__dirname, './runtime')
  )}';
/**
 * Schema is imported like this so end-user's code is compiled using build-in babel/webpack configs.
 * This enables typescript/ESnext support
 */
${schemaCode}

const tokenizer = new Markdoc.Tokenizer(${
    tokenizerOptions ? JSON.stringify(tokenizerOptions) : ''
  });

/**
 * Source will never change at runtime, so parse happens at the file root
 */
const source = ${JSON.stringify(source)};
const filepath = ${JSON.stringify(filepath)};
const tokens = tokenizer.tokenize(source);
const ast = Markdoc.parse(tokens);

/**
 * Like the AST, frontmatter won't change at runtime, so it is loaded at file root.
 * This unblocks future features, such a per-page dataFetchingFunction.
 */
const frontmatter = ast.attributes.frontmatter
  ? yaml.load(ast.attributes.frontmatter)
  : {};

const {components, ...rest} = getSchema(schema)

export const metadata = {
  other: {
    filepath,
  }
}

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(\`Cannot add h3 to table of contents without a preceding h2\n \$\{title\}\`)
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


export default async function MarkdocComponent(props) {
  const partials = ${JSON.stringify(partials)};
  let allLinks = dcsBottomNav
  if (filepath.startsWith('/node')) {
    allLinks = nodeBottomNav
  } else if (filepath.startsWith('/learn')) {
    allLinks = learnBottomNav
  } else if (filepath.startsWith('/support')) {
    allLinks = supportBottomNav
  }

  let linkIndex = allLinks.findIndex((link) => link.href === filepath.replace('/page.md', ''))
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]

  // Ensure Node.transformChildren is available
  Object.keys(partials).forEach((key) => {
    const tokens = tokenizer.tokenize(partials[key]);
    partials[key] = Markdoc.parse(tokens);
  });

  const cfg = {
    ...rest,
    variables: {
      ...(rest ? rest.variables : {}),
      // user can't override this namespace
      markdoc: {frontmatter},
      // Allows users to eject from Markdoc rendering and pass in dynamic variables via getServerSideProps
      //...(context.variables || {})
    },
    partials,
    source,
  };

  const content = await Markdoc.transform(ast, cfg);
  let tableOfContents = collectHeadings(content)
  // Only execute HMR code in development
  let rendered = renderers.react(content, React, {
        components: {
          ...components,
          // Allows users to override default components at runtime, via their _app
          ...props.components,
        },
      })

  return (
    <MarkdownLayout
      tableOfContents={tableOfContents}
      filepath={filepath}
      nextPage={nextPage}
      previousPage={previousPage}
      title={frontmatter?.title}
      >
      <>
        <div className="hidden" data-filename="${
          filepath == '/page.md' ? 'home' : ''
        }"></div>
        {rendered}
      </>
    </MarkdownLayout>
  )
}`

  return result
}

module.exports = async function loader(source) {
  const callback = this.async()
  try {
    const result = await load.call(this, source)
    callback(null, result)
  } catch (error) {
    console.error(error)
    callback(error)
  }
}
