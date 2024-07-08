import React from 'react'
import { Link } from 'next/link'
import * as path from 'path'
import * as fs from 'fs'
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'

function getFrontmatter(filepath) {
  const md = fs.readFileSync(filepath, 'utf8')
  const ast = Markdoc.parse(md)
  const frontmatter = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {}
  return {
    title: frontmatter.title || path.basename(filepath),
    frontmatter,
    redirects: frontmatter.redirects,
    docId: frontmatter.docId,
    weight: frontmatter.weight,
  }
}

function sortByDateThenTitle(arr) {
  arr.sort((a, b) => {
    if (a.date !== b.date) {
      return new Date(b.date) - new Date(a.date)
    } else {
      return a.title.localeCompare(b.title)
    }
  })
}

let dir = path.resolve('./app/(blog)')
function walkDirRec(dir, space) {
  let results = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    const relativePath = path.join(file)

    if (stat && stat.isDirectory()) {
      let pageFilepath = path.join(filepath, 'page.md')
      // For directories that don't have an page.md
      let title = file.charAt(0).toUpperCase() + file.slice(1)
      let fm = null
      if (fs.existsSync(pageFilepath)) {
        fm = getFrontmatter(pageFilepath)
      }
      let entry = {
        type: file,
        title,
      }
      if (fm) {
        entry = Object.assign(entry, fm)
      }
      if (fs.existsSync(pageFilepath)) {
        entry.href = `/${space}/${relativePath}`
      }
      results.push(entry)
    }
  })

  return results
}

let posts = walkDirRec(`${dir}/blog`, 'blog')

export default function BlogIndex() {
  return (
    <>
      <div className="bg-white py-12 sm:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Storj Engineering Blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn about the latest developments in the Storj network and the
              technology that powers it.
            </p>
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              {posts.map((post) => {
                let frontmatter = post.frontmatter
                return (
                  <article
                    key={frontmatter.title}
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={new Date(frontmatter.date)
                          .toISOString()
                          .slice(0, 10)}
                      >
                        {' '}
                        {new Date(frontmatter.date).toLocaleDateString()}
                      </time>
                    </div>
                    <a href={post.href}>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <span className="absolute inset-0" />
                          {frontmatter.title}
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {frontmatter.metadata.description}
                        </p>
                      </div>
                    </a>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      {frontmatter.author && frontmatter.author.imageUrl && (
                        <img
                          src={frontmatter.author.imageUrl}
                          alt=""
                          className="h-10 w-10 rounded-full bg-gray-50"
                        />
                      )}
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <span className="absolute inset-0" />
                          {frontmatter.author.name}
                        </p>
                        <p className="text-gray-600">
                          {frontmatter.author.role}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
