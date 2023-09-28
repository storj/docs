'use client'
import React, { useRef, useEffect } from 'react'
import { Tab as HeadlessTab } from '@headlessui/react'
import clsx from 'clsx'
import { useTabGroupProps } from '@/components/Code'

export function Tabs({ labels, children }) {
  let tabGroupProps = useTabGroupProps(labels)

  return (
    <div className="w-full px-2 py-2 sm:px-0">
      <HeadlessTab.Group {...tabGroupProps}>
        <HeadlessTab.List className="flex max-w-md space-x-1 rounded-xl bg-slate-900 p-1">
          {labels.map((label, i) => (
            <HeadlessTab
              id={`${label}-${i}`}
              key={`${label}-${i}`}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white dark:bg-white/[0.85] shadow'
                    : 'text-white hover:bg-white/[0.6] dark:hover:bg-white/[0.12] dark:text-white dark:hover:text-white'
                )
              }
            >
              {label}
            </HeadlessTab>
          ))}
        </HeadlessTab.List>
        <HeadlessTab.Panels className="mt-3 bg-slate-100 dark:bg-slate-900 rounded-xl">{children}</HeadlessTab.Panels>
      </HeadlessTab.Group>
      {/* <div className="flex flex-auto items-center rounded-tl border border-l-0 border-slate-500/30 bg-slate-700/50"></div> */}
    </div>
  )
}

export function Tab({ label, children }) {
  return (
    <HeadlessTab.Panel
      id={label}
      className={clsx(
        'rounded-xl p-3',
        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
      )}
    >
      {children}
    </HeadlessTab.Panel>
  )
}
