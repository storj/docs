'use client'
import { useEffect, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { create } from 'zustand'

import { Tag } from '@/components/Tag'

const languageNames = {
  js: 'JavaScript',
  jsx: 'JavaScript',
  ts: 'TypeScript',
  tsx: 'TypeScript',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  php: 'PHP',
  python: 'Python',
  ruby: 'Ruby',
  go: 'Go',
}

function CodePanelHeader({ tag, label }) {
  if (!tag && !label) {
    return null
  }

  return (
    <div className="border-b-white/7.5 bg-white/2.5 dark:bg-white/1 flex h-9 items-center gap-2 rounded-lg border-y border-t-transparent bg-slate-900 px-4 dark:border-b-white/5 dark:bg-slate-700">
      {tag && (
        <div className="flex">
          <Tag variant="small">{tag}</Tag>
        </div>
      )}
      {tag && label && <span className="h-0.5 w-0.5 rounded-lg bg-zinc-500" />}
      {label && (
        <span className="font-mono text-xs text-zinc-400">{label}</span>
      )}
    </div>
  )
}

function CodePanel({ tag, hasTabs, label, children }) {
  return (
    <>
      <CodePanelHeader tag={tag} label={label} />
      <div className={clsx(hasTabs && 'text-sm')}>{children}</div>
    </>
  )
}

function CodeGroupHeader({ title, languages, selectedIndex }) {
  let hasTabs = languages.length > 1

  if (!title && !hasTabs) {
    return null
  }

  return (
    <div className="flex text-xs leading-6 text-slate-400">
      {title && (
        <h3 className="flex flex-none items-center border-b border-white px-4 py-1 text-white">
          {title}
        </h3>
      )}
      {hasTabs && (
        <Tab.List className="-mb-px flex text-xs font-medium ">
          {languages.map((lang, childIndex) => (
            <Tab
              id={`${lang}-${childIndex}`}
              key={`${lang}-${childIndex}`}
              className={clsx(
                'flex flex-none items-center border-b px-4 py-2 pr-2 font-medium text-storj-blue-700 dark:text-white',
                childIndex === selectedIndex
                  ? 'bg-none'
                  : 'rounded-t border-slate-300 text-zinc-700 dark:border-slate-900/30 dark:text-white/50'
              )}
            >
              {title ?? languageNames[lang] ?? lang}
            </Tab>
          ))}
        </Tab.List>
      )}
    </div>
  )
}

function CodeGroupPanels({ children, ...props }) {
  let hasTabs = children.length > 1

  if (hasTabs) {
    return (
      <Tab.Panels>
        {children.map((child, index) => {
          // id is needed for SSR
          // https://github.com/chakra-ui/chakra-ui/issues/4328#issuecomment-920884182
          return (
            <Tab.Panel key={index} id={index}>
              <CodePanel hasTabs={hasTabs} {...props}>
                {child}
              </CodePanel>
            </Tab.Panel>
          )
        })}
      </Tab.Panels>
    )
  }

  return <CodePanel {...props}>{children}</CodePanel>
}

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

const detectOS = () => {
  var os = 'Linux'
  if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
    os = 'macOS'
  } else if (/(Win)/i.test(navigator.platform)) {
    os = 'Windows'
  }
  return os
}

const usePreferredLanguageStore = create((set) => ({
  preferredLanguages: [],
  addPreferredLanguage: (language) =>
    set((state) => ({
      preferredLanguages: [
        ...state.preferredLanguages.filter(
          (preferredLanguage) => preferredLanguage !== language
        ),
        language.toLowerCase(),
      ],
    })),
}))

export function useTabGroupProps(availableLanguages) {
  availableLanguages = availableLanguages.map((lang) => lang.toLowerCase())
  let { preferredLanguages, addPreferredLanguage } = usePreferredLanguageStore()
  let [selectedIndex, setSelectedIndex] = useState(0)
  useEffect(() => {
    addPreferredLanguage(detectOS())
  }, [addPreferredLanguage])

  let activeLanguage = [...availableLanguages].sort(
    (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a)
  )[0]
  let languageIndex = availableLanguages.indexOf(activeLanguage)
  let newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex
  if (newSelectedIndex !== selectedIndex) {
    setSelectedIndex(newSelectedIndex)
  }

  let { positionRef, preventLayoutShift } = usePreventLayoutShift()

  return {
    as: 'div',
    ref: positionRef,
    selectedIndex,
    onChange: (newSelectedIndex) => {
      preventLayoutShift(() =>
        addPreferredLanguage(availableLanguages[newSelectedIndex])
      )
    },
  }
}

export function CodeGroup({ children, title, languages, className, ...props }) {
  let tabGroupProps = useTabGroupProps(languages)
  let hasTabs = children.length > 1

  if (!hasTabs) {
    return <CodePanel {...props}>{children}</CodePanel>
  }

  return (
    <Tab.Group
      {...tabGroupProps}
      className={clsx(
        className,
        'not-prose dark:storj-black/60 my-8 overflow-hidden rounded-xl bg-slate-200 text-slate-900 dark:bg-slate-700 dark:ring-1 dark:ring-slate-300/10'
      )}
    >
      <CodeGroupHeader
        title={title}
        languages={languages}
        selectedIndex={tabGroupProps.selectedIndex}
      />
      <CodeGroupPanels {...props}>{children}</CodeGroupPanels>
    </Tab.Group>
  )
}
