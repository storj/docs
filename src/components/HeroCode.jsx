'use client'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useTabGroupProps } from '@/components/Code'

export function HeroCode({ languages, children }) {
  let tabGroupProps = useTabGroupProps(languages)

  return (
    <Tab.Group {...tabGroupProps}>
      <Tab.List className="mt-4 flex space-x-2 text-xs">
        {languages.map((lang, i) => (
          <Tab
            id={`${lang}-${i}`}
            key={`${lang}-${i}`}
            className={({ selected }) =>
              clsx(
                'flex h-6 rounded-full',
                selected
                  ? 'bg-gradient-to-r from-storj-blue-700/30 via-storj-blue-700 to-storj-blue-700/30 p-px font-medium text-storj-blue-100'
                  : 'text-slate-500'
              )
            }
          >
            {({ selected }) => (
              <div
                className={clsx(
                  'flex h-full items-center rounded-full px-2.5',
                  selected && 'bg-storj-blue-dark'
                )}
              >
                {lang}
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {children.map((child, i) => (
          <Tab.Panel
            id={`${i}-${languages[i]}`}
            key={`${i}-${languages[i]}`}
            className={clsx('rounded-xl p-3')}
          >
            {child}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
