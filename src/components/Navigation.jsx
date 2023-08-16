'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  dcsNavigation,
  nodeNavigation,
  learnNavigation,
  supportNavigation,
} from '@/markdoc/navigation.mjs'

function NavLink({ title, href, current, root, disclosure }) {
  let padding = 'pl-6'
  if (root) {
    padding = 'pl-4'
  }
  if (root && disclosure) {
    padding = 'pl-0'
  } else if (disclosure) {
    padding = 'pl-0'
  }

  let ComponentToUse = disclosure ? Disclosure.Button : Link
  let disclosureProps = disclosure ? { as: Link } : {}

  return (
    <ComponentToUse
      id={title}
      {...disclosureProps}
      href={href}
      className={clsx(
        root && disclosure ? 'font-semibold dark:text-white' : 'block',
        padding,
        `w-full truncate py-0.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:z-10 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full`,
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
    </ComponentToUse>
  )
}

function NavItem({ item, root }) {
  const pathname = usePathname()
  const current = item.href === pathname

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
    <Disclosure
      defaultOpen={pathname.includes(item.type)}
      as="div"
      className={`${root ? '' : 'ml-2'}`}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            id={item.title}
            className={clsx(
              'flex w-full items-center gap-x-1 rounded-md py-0.5 text-left text-sm leading-none text-gray-700'
            )}
          >
            <ChevronRightIcon
              className={clsx(
                open
                  ? `rotate-90 ${
                      pathname.includes(item.type) &&
                      'text-storj-blue-700 dark:text-storj-blue-500'
                    }`
                  : 'text-gray-500',
                'z-30 -ml-1.5 h-4 w-4 shrink-0'
              )}
              aria-hidden="true"
            />
            {item.href ? (
              <NavLink
                title={item.title}
                root={root}
                disclosure
                href={item.href}
                current={current}
              />
            ) : (
              <h2
                title={item.title}
                className={`truncate py-0.5 ${
                  root ? 'font-semibold ' : 'block'
                } text-slate-600 hover:text-slate-700 dark:text-white`}
              >
                {item.title}
              </h2>
            )}
          </Disclosure.Button>
          <Transition
            enter="transition-all ease-in-out duration-500 "
            enterFrom="opacity-0 -translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-6"
          >
            <Disclosure.Panel
              id={item.title}
              as="ul"
              className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
            >
              {item.links.map((subItem) => (
                <li key={subItem.type + subItem.title} className="relative">
                  <NavItem item={subItem} />
                </li>
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
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
  }
  return (
    <nav role="navigation" className={clsx('text-base lg:text-sm', className)}>
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
