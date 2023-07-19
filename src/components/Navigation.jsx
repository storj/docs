
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

function NavLink({title, href, current, root }) {
  return (
    <Link
      href={href}
      className={clsx(
        `block w-full ${ root ? 'pl-5' : 'pl-8'} truncate py-0.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full`,
        current
          ? `font-semibold text-storj-blue-700 ${ root ? '' : 'before:bg-storj-blue-700'}`
          : `text-slate-600 dark:text-slate-400 ${ !root ? 'before:hidden before:bg-slate-500 hover:text-slate-700 hover:before:block dark:before:bg-slate-700 dark:hover:text-slate-300' : '' }`
      )}
      title={title}
    >
      {title}
    </Link>
  )
}

function NavItem({ item, root }) {
  const router = useRouter();

  if (item.href && item.links.length === 0) {
    return (
      <NavLink title={item.title} href={item.href} current={ item.href === router.pathname} root={root} />
    );
  }

  return (
    <Disclosure defaultOpen={router.pathname.includes(item.type)} as="div" className={root ? '' : 'ml-3'}>
      {({ open }) => (
        <>
          <Disclosure.Button className={clsx('flex items-center w-full text-left rounded-md pr-2 gap-x-1 py-0.5 text-sm leading-none text-gray-700')}>
            <ChevronRightIcon
              className={clsx(
                open ? `rotate-90 ${router.pathname.includes(item.type) && "text-storj-blue-700"}` : 'text-gray-500',
                'h-4 w-4 shrink-0'
              )}
              aria-hidden="true"
            />
            {item.href ? (
              <NavLink title={item.title} root={root} href={item.href} current={ item.href === router.pathname} />
            ) : (
              root ? (
                <h2 title={item.title} className="truncate py-0.5 font-semiboldfont-display text-slate-900 dark:text-white hover:text-slate-700">
                  {item.title}
                </h2>
              ) : (
                <h2 title={item.title} className='block w-full truncate py-0.5 text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'>
                  {item.title}
                </h2>
              )
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
            <Disclosure.Panel as="ul" className="mt-2 ml-2 border-l-2 space-y-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200">
              {item.links.map((subItem) => (
                <li key={subItem.type + subItem.title} className="relative">
                  {subItem.href ? (
                    <NavLink title={subItem.title} href={subItem.href} current={ subItem.href === router.pathname} />
                  ) : (
                    <NavItem item={subItem} />
                  )}
                </li>
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export function Navigation({ navigation, className }) {
  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="md:py-0 lg:py-14 space-y-3 side-menu">
        {navigation.map((item) => (
          <li key={item.title + item.href}>
            <NavItem item={item} root />
          </li>
        ))}
      </ul>
    </nav>
  );
}

