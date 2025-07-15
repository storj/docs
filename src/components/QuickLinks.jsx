import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { convertDocId } from '@/markdoc/convertDocId'

export function QuickLinks({ children }) {
  return (
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {children}
    </div>
  )
}

export function QuickLink({ title, description, href, icon, children }) {
  let { href: docHref, title: docTitle } = convertDocId(href)
  href = docHref
  if (docTitle && !title) {
    title = docTitle
  }
  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        {icon && <Icon icon={icon} className="h-8 w-8" />}
        <h2 className="font-display mt-4 text-base text-slate-900 dark:text-white">
          {href ? (
            <Link href={href}>
              <span className="absolute -inset-px rounded-xl" />
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
            {description}
          </p>
        )}
        {children && children}
      </div>
    </div>
  )
}
