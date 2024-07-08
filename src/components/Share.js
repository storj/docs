'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditIcon,
} from 'react-share'

const ShareButtons = ({
  title,
  twitterHandle,
  tags,
  reddit,
  hackernews,
  indiehackers,
  linkedin,
}) => {
  const pathname = usePathname()
  let url = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`

  let discuss = true
  if (!linkedin && !reddit && !hackernews && !indiehackers) {
    discuss = false
  }

  return (
    <div className="mt-6 py-2">
      <div>
        <p className="text-lg">Like this post? Share it</p>
        <FacebookShareButton url={url} className="mr-2 mt-3">
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          className="mr-2"
          url={url}
          title={title}
          via={twitterHandle}
          hashtags={tags}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton url={url} className="mr-2">
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>
      </div>
      {discuss && (
        <div className="mt-3">
          <p>Discuss on</p>

          <div className="not-prose mt-3 flex">
            {reddit && (
              <a href={reddit} rel="noreferrer" target="_blank">
                <RedditIcon className="mr-2" size={40} round={true} />
              </a>
            )}
            {hackernews && (
              <a href={hackernews} rel="noreferrer" target="_blank">
                <img
                  alt="hackernews link"
                  className="color-red bg-green mr-2 h-10 w-10"
                  src="/images/misc_logos/hackernews.svg"
                />
              </a>
            )}
            {indiehackers && (
              <a href={indiehackers} rel="noreferrer" target="_blank">
                <img
                  alt="indiehackers link"
                  className="color-red bg-green mr-2 h-10 w-10"
                  src="/images/misc_logos/indie-hackers.svg"
                />
              </a>
            )}
            {linkedin && (
              <a className="" href={linkedin} rel="noreferrer" target="_blank">
                <LinkedinIcon size={40} round={true} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default ShareButtons
