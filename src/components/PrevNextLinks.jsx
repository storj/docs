'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import {
  dcsBottomNav,
  nodeBottomNav,
  learnBottomNav,
  supportBottomNav,
  blogBottomNav,
  oMountBottomNav,
} from '@/markdoc/navigation.mjs'

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
    </svg>
  )
}

function PageLink({ dir = 'next', title, href, ...props }) {
  return (
    <div {...props}>
      <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
        {dir === 'next' ? 'Next' : 'Previous'}
      </dt>
      <dd className="not-prose mt-1">
        <Link
          href={href}
          className={clsx(
            'flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300',
            dir === 'previous' && 'flex-row-reverse'
          )}
        >
          {title}
          <ArrowIcon
            className={clsx(
              'h-4 w-4 flex-none fill-current',
              dir === 'previous' && '-scale-x-100'
            )}
          />
        </Link>
      </dd>
    </div>
  )
}

export function PrevNextLinks() {
  let pathname = usePathname()
  let allLinks = dcsBottomNav
  if (pathname.startsWith('/node')) {
    allLinks = nodeBottomNav
  } else if (pathname.startsWith('/learn')) {
    allLinks = learnBottomNav
  } else if (pathname.startsWith('/support')) {
    allLinks = supportBottomNav
  } else if (pathname.startsWith('/blog')) {
    allLinks = blogBottomNav
  } else if (pathname.startsWith('/object-mount')) {
    allLinks = oMountBottomNav
  }

  let linkIndex = allLinks.findIndex((link) => link.href === pathname)
  let previousPage = linkIndex > -1 ? allLinks[linkIndex - 1] : null
  let nextPage = linkIndex > -1 ? allLinks[linkIndex + 1] : null

  if (!nextPage && !previousPage) {
    return null
  }

  return (
    <dl className="my-6 flex border-t border-slate-200 pt-6 dark:border-slate-800 lg:my-12">
      {previousPage && (
        <PageLink
          dir="previous"
          title={previousPage.title}
          href={previousPage.href}
        />
      )}
      {nextPage && (
        <PageLink
          className="ml-auto text-right"
          title={nextPage.title}
          href={nextPage.href}
        />
      )}
    </dl>
  )
}
