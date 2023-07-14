import fs from 'fs'
import path from 'path'
import Markdoc from '@markdoc/markdoc'
import glob from 'fast-glob'
let cache = new Map()
function titleCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function constructOutputStructure(basePath) {
  let files = glob.sync('**/index.md', { cwd: basePath })
  let data = []

  files.forEach((file) => {
    //let url = file === 'index.md' ? '/' : `/${file.replace(/page\.md$/, '')}`
    let url = `${file.replace(/index\.md$/, '')}`.slice(0, -1) // remove trailing slash
    //url = removeNumericPrefixes(url)
    let md = fs.readFileSync(path.join(basePath, file), 'utf8')

    let sections

    if (cache.get(file)?.[0] === md) {
      sections = cache.get(file)[1]
    } else {
      let ast = Markdoc.parse(md)
      let title =
        ast.attributes?.frontmatter?.match(/^title:\s*(.*?)\s*$/m)?.[1]
      sections = [[title, null, []]]
      //extractSections(ast, sections)
      cache.set(file, [md, sections])
    }

    // Extract the guide type from href
    let guideType = url.split('/')[0]

    // Try to find an existing guide group for this type
    let guideGroup = data.find((group) => group.type === guideType)
    if (!guideGroup) {
      guideGroup = { title: titleCase(guideType), type: guideType, links: [] }
      data.push(guideGroup)
    }
    // Add the current guide to the group
    //
    guideGroup.links.push({ title: sections[0][0], href: `/dcs/${url}` })
  })

  console.log('data', JSON.stringify(data, null, 2))
  return data
}

constructOutputStructure('/Users/dan/test/storj-docs-poc/src/pages/dcs')
