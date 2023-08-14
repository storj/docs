'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const spaces = [
  { name: 'Home', path: '/', href: '/dcs' },
  { name: 'Learn', href: '/learn' },
  { name: 'Node', href: '/node' },
  { name: 'Help Center', href: '/support' },
]

export default function Spaces() {
  const pathname = usePathname()
  return (
    <>
      {spaces.map((item) => {
        let current = pathname.startsWith(item.href)
        if (pathname == '/' && item.href == '/dcs') {
          current = true
        }
        return (
          <Link
            key={item.name}
            href={item.path ?? item.href}
            className={clsx(
              current
                ? 'bg-gray-200 text-gray-900 dark:bg-gray-50'
                : 'text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
              'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium'
            )}
            aria-current={current ? 'page' : undefined}
          >
            {item.name}
          </Link>
        )
      })}
    </>
  )
}
