/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import Link from 'next/link'
import LocalImage from '@/components/LocalImage'

export default async function Bio({ name = 'Dan Willoughby', image, summary }) {
  return (
    <div className="my-8 flex flex-col py-2 md:flex-row">
      {image && (
        <div className="mr-4 inline-flex flex-shrink-0">
          <LocalImage
            src={image}
            alt={name}
            className="border-storj-600 h-12 w-12 rounded-full border-2"
          />
        </div>
      )}
      <div className="pt-2 text-lg md:pt-0">
        <p>
          Written by <strong>{name}</strong>
        </p>
        {summary && <p className="mt-2 text-sm">{summary}</p>}
      </div>
    </div>
  )
}
