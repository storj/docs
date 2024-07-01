import React from 'react'
import Link from 'next/link'
import * as path from 'path'
import * as fs from 'fs'
import Markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'
import LocalImage from '@/components/LocalImage'

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
    if (a.frontmatter.date !== b.frontmatter.date) {
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
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
        //if (fm.frontmatter.published) {
        results.push(entry)
        //}
      }
    }
  })

  return results
}

let posts = walkDirRec(`${dir}/blog`, 'blog')
sortByDateThenTitle(posts)

export default function BlogIndex() {
  return (
    <>
      <div className="bg-white py-12 dark:bg-storj-black sm:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Storj Engineering Blog
            </h2>
            <p className="mt-2 text-lg leading-8">
              Learn about the latest developments in the Storj network and the
              technology that powers it.
            </p>
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              {posts.map((post) => {
                let frontmatter = post.frontmatter
                return (
                  <article
                    key={frontmatter.title}
                    className="group flex max-w-xl flex-col items-start justify-between"
                  >
                    <Link href={post.href} itemProp="url">
                      {frontmatter.heroimage && (
                        <div className="relative w-full">
                          <LocalImage
                            noLink
                            src={frontmatter.heroimage}
                            layout="fullWidth"
                            alt=""
                            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                          />
                        </div>
                      )}
                      <div className="max-w-xl">
                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                          <time
                            dateTime={new Date(frontmatter.date)
                              .toISOString()
                              .slice(0, 10)}
                          >
                            {' '}
                            {new Date(frontmatter.date).toLocaleDateString()}
                          </time>
                          {/*
                    <a
                      href={post.category.href}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category.title}
                    </a>
*/}
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600 dark:group-hover:text-storj-green-600">
                            <span className="absolute inset-0" />
                            {post.frontmatter.title}
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200">
                            {post.frontmatter.description ||
                              post.frontmatter.metadata?.description ||
                              post.excerpt}
                          </p>
                        </div>
                        {/*
                  <div className="relative flex items-center mt-8 gap-x-4">
                    <img
                      src={post.author.imageUrl}
                      alt=""
                      className="w-10 h-10 bg-gray-100 rounded-full"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                      <p className="text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
*/}
                      </div>
                      <div className="relative mt-3 flex items-center gap-x-4">
                        {frontmatter.author && frontmatter.author.imageUrl && (
                          <img
                            src={frontmatter.author.imageUrl}
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-50"
                          />
                        )}
                        <div className="text-sm leading-6">
                          <p className="font-semibold">
                            <span className="absolute inset-0" />
                            {frontmatter.author.name}
                          </p>
                          <p className="text-gray-600">
                            {frontmatter.author.role}
                          </p>
                        </div>
                      </div>
                    </Link>
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
