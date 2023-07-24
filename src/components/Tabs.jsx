import React, { useRef, useEffect } from 'react'
import { Tab as HeadlessTab } from '@headlessui/react'
import clsx from 'clsx'
import { create } from 'zustand'

function usePreventLayoutShift() {
  let positionRef = useRef()
  let rafRef = useRef()

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return {
    positionRef,
    preventLayoutShift(callback) {
      let initialTop = positionRef.current.getBoundingClientRect().top

      callback()

      rafRef.current = window.requestAnimationFrame(() => {
        let newTop = positionRef.current.getBoundingClientRect().top
        window.scrollBy(0, newTop - initialTop)
      })
    },
  }
}

const useTabIndexStore = create((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (index) =>
    set((state) => ({
      selectedIndex: index,
    })),
}))

export function Tabs({ labels, children }) {
  let { positionRef, preventLayoutShift } = usePreventLayoutShift()
  let { selectedIndex, setSelectedIndex } = useTabIndexStore()

  return (
    <div className="w-full px-2 py-2 sm:px-0">
      <HeadlessTab.Group
        as="div"
        ref={positionRef}
        selectedIndex={selectedIndex}
        onChange={(newIndex) =>
          preventLayoutShift(() => setSelectedIndex(newIndex))
        }
      >
        <HeadlessTab.List className="flex max-w-md space-x-1 rounded-xl bg-blue-900/20 p-1">
          {labels.map((label) => (
            <HeadlessTab
              key={label}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {label}
            </HeadlessTab>
          ))}
        </HeadlessTab.List>
        <HeadlessTab.Panels className="mt-2">{children}</HeadlessTab.Panels>
      </HeadlessTab.Group>
      <div className="flex flex-auto items-center rounded-tl border border-l-0 border-slate-500/30 bg-slate-700/50"></div>
    </div>
  )
}

export function Tab({ label, children }) {
  return (
    <HeadlessTab.Panel
      className={clsx(
        'rounded-xl p-3',
        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
      )}
    >
      {children}
    </HeadlessTab.Panel>
  )
}
