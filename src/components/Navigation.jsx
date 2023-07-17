import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export function Navigation({ navigation, className }) {
  let router = useRouter()

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9 side-menu">
        {navigation.map((item) => (
          <li key={item.title}>
            {!item.links ? (
              <Link
                href={item.href}
                className={clsx(
                  'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700'
                )}
              >
                {item.title}
              </Link>
            ) : (
              <Disclosure defaultOpen={router.pathname.includes(item.type)} as="div">
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={clsx(
                        'flex items-center w-full text-left rounded-md pr-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                      )}
                    >
                      <ChevronRightIcon
                        className={clsx(
                          open  ? `rotate-90 ${router.pathname.includes(item.type) && "text-storj-blue-700"}` : 'text-gray-400',
                          'h-5 w-5 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      <h2 className="font-medium font-display text-slate-900 dark:text-white hover:text-storj-bleu-400">
                        {item.title}
                      </h2>
                    </Disclosure.Button>
                    <Disclosure.Panel as="ul" className="mt-2 ml-2 border-l-2 space-y-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
                      {item.links.map((subItem) => (
                        <li key={subItem.href} className="relative">
                          <Link
                            href={subItem.href}
                            className={clsx(
                              'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                              subItem.href === router.pathname
                                ? 'font-semibold text-storj-blue-700 before:bg-storj-blue-700'
                                : 'text-slate-500 before:hidden before:bg-storj-blue-400 hover:text-storj-blue-400 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                            )}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
