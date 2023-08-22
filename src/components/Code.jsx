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
    <div className="border-b-white/7.5 bg-white/2.5 dark:bg-white/1 flex h-9 items-center gap-2 border-y border-t-transparent bg-slate-900 px-4 shadow-lg dark:border-b-white/5 dark:bg-slate-800/60">
      {tag && (
        <div className="dark flex">
          <Tag variant="small">{tag}</Tag>
        </div>
      )}
      {tag && label && (
        <span className="h-0.5 w-0.5 rounded-full bg-zinc-500" />
      )}
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
        <h3 className="flex flex-none items-center border-b border-t border-b-sky-300 border-t-transparent px-4 py-1 text-sky-300">
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
                'flex flex-none items-center border-b border-t  border-t-transparent px-4 py-2 pr-2 text-sky-300',
                childIndex === selectedIndex
                  ? 'bg-none shadow'
                  : 'rounded-t border-slate-500/30 text-zinc-400 hover:text-zinc-300'
              )}
            >
              {title ?? languageNames[lang] ?? lang}
            </Tab>
          ))}
        </Tab.List>
      )}
      <div className="flex flex-auto items-center rounded-tl border border-l-0 border-slate-500/30 bg-slate-700/50"></div>
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
        'not-prose my-8 overflow-hidden rounded-xl bg-slate-900 shadow-lg dark:bg-slate-800/60 dark:shadow-none dark:ring-1 dark:ring-slate-300/10'
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
