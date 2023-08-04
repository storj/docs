// See https://bright.codehike.org/recipes for Code docs
import { Code } from 'bright'
import CodeCopy from '@/components/CodeCopy'

// TODO make a storj theme for now this theme just changes the background color
// https://themes.codehike.org/editor
import light from '@/components/codeTheme.json'
let dark = structuredClone(light)
dark.colors['editor.background'] = '#182234'
Code.theme = {
  dark: dark,
  light: light,
  // using a different CSS selector:
  lightSelector: '[class="light"]',
  // lightSelector: 'html.light',
}
// Get attributes from .md files to pass to Code
//   - Define attribute in @/markdoc/nodes for fence
//        e.g. hello: { type: String }
//   - Add attributes in markdown using {%...%}
//        e.g. ```js {% hello="hi" %}
//   - hello will appear as a prop for Fence
export default function Fence({ language, children, copy = true }) {
  // Code has be to a Server Component to work
  // nest it in a Client component for the copy button
  //
  let codeComp = <Code lang={language}>{children.trim()}</Code>
  if (!copy) {
    return codeComp
  }

  return <CodeCopy code={children}>{codeComp}</CodeCopy>
}
