// See https://bright.codehike.org/recipes for Code docs
import { Code } from 'bright'
import { extractAnnotations } from '@code-hike/lighter'
import CodeCopy from '@/components/CodeCopy'
import { convertDocId } from '@/markdoc/convertDocId'

// https://themes.codehike.org/editor
import light from '@/components/storjCodeTheme.json'
let dark = structuredClone(light)
dark.colors['editor.background'] = '#182234'
Code.theme = {
  dark: dark,
  light: light,
  // using a different CSS selector:
  lightSelector: 'html.light',
}

// Get attributes from .md files to pass to Code
//   - Define attribute in @/markdoc/nodes for fence
//        e.g. hello: { type: String }
//   - Add attributes in markdown using {%...%}
//        e.g. ```js {% hello="hi" %}
//   - hello will appear as a prop for Fence

const languageMapping = {
  windows: 'powershell',
  macos: 'shell',
  linux: 'shell',
  text: 'shell',
  curl: 'shell',
}

/** @type {import("bright").Extension} */
const link = {
  name: 'link',
  InlineAnnotation: ({ children, query }) => {
    let { href } = convertDocId(query)
    return (
      <span className="not-prose">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="border-b border-current no-underline hover:border-b-2"
        >
          {children}
        </a>
      </span>
    )
  },
}

export const highlight = {
  name: 'highlight',
  MultilineAnnotation: ({ children }) => {
    return (
      <span className="block bg-storj-blue-700 bg-opacity-50">{children}</span>
    )
  },
}

export const unfocusInline = {
  name: 'terminal',
  MultilineAnnotation: ({ children }) => {
    return (
      <div className="relative flex flex-row">
        <span
          style={{ paddingLeft: '1em' }}
          className="select-none group-hover:contrast-0"
        >
          $
        </span>
        {children}
      </div>
    )
  },
}

/** @type {import("bright").Extension} */
export const focus = {
  name: 'focus',
  MultilineAnnotation: ({ children }) => (
    <div className="select-none group-hover:contrast-0">{children}</div>
  ),
  beforeHighlight: (props, focusAnnotations) => {
    if (focusAnnotations.length === 0) return props

    const lineCount = props.code.split('\n').length

    const ranges = focusAnnotations.flatMap((a) => a.ranges)

    let newRanges = [{ fromLineNumber: 1, toLineNumber: lineCount }]

    for (const range of ranges) {
      const { fromLineNumber, toLineNumber } = range
      newRanges = newRanges.flatMap((r) => {
        if (r.fromLineNumber > toLineNumber || r.toLineNumber < fromLineNumber)
          return [r]
        if (
          r.fromLineNumber >= fromLineNumber &&
          r.toLineNumber <= toLineNumber
        )
          return []
        if (r.fromLineNumber < fromLineNumber && r.toLineNumber > toLineNumber)
          return [
            {
              fromLineNumber: r.fromLineNumber,
              toLineNumber: fromLineNumber - 1,
            },
            {
              fromLineNumber: toLineNumber + 1,
              toLineNumber: r.toLineNumber,
            },
          ]
        if (r.fromLineNumber < fromLineNumber)
          return [
            {
              fromLineNumber: r.fromLineNumber,
              toLineNumber: fromLineNumber - 1,
            },
          ]
        if (r.toLineNumber > toLineNumber)
          return [
            {
              fromLineNumber: toLineNumber + 1,
              toLineNumber: r.toLineNumber,
            },
          ]
      })
    }

    const newAnnotations = props.annotations.filter((a) => a.name !== 'focus')
    newAnnotations.push({
      name: 'focus',
      ranges: newRanges,
    })
    return { ...props, annotations: newAnnotations }
  },
}

export default async function Fence({ language, children: code, copy = true }) {
  // Code has be to a Server Component to work
  // nest it in a Client component for the copy button
  if (languageMapping[language?.toLowerCase()]) {
    language = languageMapping[language]
  } else if (!language || language === 'none') {
    language = 'text'
  }
  let extensions = [link, focus, unfocusInline, highlight]
  const extensionNames = extensions.map((e) => e.name)
  let { code: newCode, annotations } = await extractAnnotations(
    code.trim() || '',
    language || 'text',
    extensionNames
  )

  let parsedCode = ''
  const lines = newCode.split('\n')
  annotations.forEach((annotation) => {
    // Exclude all other code when copying
    if (annotation.name === 'terminal') {
      annotation.ranges.forEach((range) => {
        const fromLineNumber = range.fromLineNumber
        const toLineNumber = range.toLineNumber
        const rangeLines = lines.slice(fromLineNumber - 1, toLineNumber)
        parsedCode += rangeLines.join('\n') + '\n'
      })
    }
  })
  if (parsedCode !== '') {
    newCode = parsedCode
  }

  let codeComp = (
    <Code className="group" lang={language} extensions={extensions}>
      {code.trim()}
    </Code>
  )
  if (!copy) {
    return codeComp
  }

  return <CodeCopy code={newCode}>{codeComp}</CodeCopy>
}
