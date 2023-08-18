import glob from 'fast-glob'
import path from 'path'
import fs from 'fs'
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'
import Link from 'next/link'
import { convertDocId } from '@/markdoc/convertDocId'

export function TagLinks({ directory, tag }) {
  let dir = path.resolve(directory)
  let files = glob.sync('**/page.md', { cwd: dir })
  let data = files.map((file) => {
    let filepath = path.join(dir, file)
    let md = fs.readFileSync(filepath, 'utf8')
    let ast = Markdoc.parse(md)
    const frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {}
    return { file, frontmatter }
  })
  const organizedByTags = data.reduce((result, item) => {
    const tags = item.frontmatter.tags || []
    tags.forEach((tag) => {
      result[tag] = result[tag] || []
      result[tag].push(item)
    })
    return result
  }, {})
  return (
    <ul className="m-0 list-inside list-none space-y-2 pl-0">
      {organizedByTags[tag]
        .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title))
        .map((item, index) => {
          let { href } = convertDocId(`docId:${item.frontmatter.docId}`)
          return (
            <li key={item.frontmatter.docId}>
              <Link href={href}>{item.frontmatter.title}</Link>
            </li>
          )
        })}
    </ul>
  )
}
