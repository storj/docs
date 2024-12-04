'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  dcsNavigation,
  nodeNavigation,
  learnNavigation,
  supportNavigation,
  cunofsNavigation,
} from '@/markdoc/navigation.mjs'

function NavLink({ title, href, current, root, disclosure, className }) {
  let padding = 'pl-6'
  if (root) {
    padding = 'pl-4'
  }
  if (root && disclosure) {
    padding = 'pl-0'
  } else if (disclosure) {
    padding = 'pl-0'
  }

  return (
    <Link
      id={title}
      aria-current={current ? 'page' : undefined}
      href={href}
      className={clsx(
        className,
        padding,
        `block w-full py-0.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:z-10 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full`,
        current
          ? clsx(
              `font-semibold text-storj-blue-700 dark:text-storj-blue-500`,
              !root &&
                !disclosure &&
                'before:bg-storj-blue-700 dark:before:bg-storj-blue-500'
            )
          : clsx(
              `text-slate-600 dark:text-slate-400`,
              !root &&
                !disclosure &&
                'before:hidden before:bg-slate-500 hover:text-slate-700 hover:before:block dark:before:bg-slate-700 dark:hover:text-slate-300'
            )
      )}
      title={title}
    >
      {title}
    </Link>
  )
}

// get first href in tree
const walkTree = (node) => {
  if (node.href) return node

  if (node.links) {
    for (const link of node.links) {
      const result = walkTree(link)
      if (result) return result
    }
  }

  return null
}

function NavItem({ item, root }) {
  const pathname = usePathname()
  const current = item.href === pathname
  const isActive = pathname.includes(item.type)

  if (item.href && item.links.length === 0) {
    return (
      <NavLink
        title={item.title}
        href={item.href}
        current={current}
        root={root}
      />
    )
  }

  return (
    <div className={`${root ? '' : 'ml-2'}`}>
      <>
        <div
          id={item.title}
          className={clsx(
            'flex w-full items-center gap-x-1 rounded-md py-0.5 text-left text-gray-700'
          )}
        >
          <ChevronRightIcon
            className={clsx(
              isActive
                ? `rotate-90 ${
                    pathname.includes(item.type) &&
                    'text-storj-blue-700 dark:text-storj-blue-500'
                  }`
                : 'text-gray-500',
              'z-30 -ml-1.5 h-4 w-4 shrink-0'
            )}
            aria-hidden="true"
          />
          <NavLink
            title={item.title}
            root={root}
            disclosure
            href={item.href ? item.href : walkTree(item).href}
            current={current}
          />
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          {isActive && (
            <motion.ul
              id={item.title}
              className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
              role="list"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {item.links.map((subItem) => (
                <li key={subItem.type + subItem.title} className="relative">
                  <NavItem item={subItem} />
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </>
    </div>
  )
}

export function Navigation({ className }) {
  const pathname = usePathname()
  let sideNavigation = dcsNavigation
  if (pathname.startsWith('/node')) {
    sideNavigation = nodeNavigation
  } else if (pathname.startsWith('/learn')) {
    sideNavigation = learnNavigation
  } else if (pathname.startsWith('/support')) {
    sideNavigation = supportNavigation
  } else if (pathname.startsWith('/cunofs')) {
    sideNavigation = cunofsNavigation
  }

  return (
    <nav
      role="navigation"
      className={clsx('lg:text-medium text-sm', className)}
    >
      <ul className="space-y-3 md:py-0 lg:py-14">
        {sideNavigation.map((item, index) => (
          <li key={item.title + index}>
            <NavItem item={item} root />
          </li>
        ))}
      </ul>
    </nav>
  )
}
