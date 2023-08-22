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
                  ? 'bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300'
                  : 'text-slate-500'
              )
            }
          >
            {({ selected }) => (
              <div
                className={clsx(
                  'flex h-full items-center rounded-full px-2.5',
                  selected && 'bg-slate-800'
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
