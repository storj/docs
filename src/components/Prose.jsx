import clsx from 'clsx'

export function Prose({ as: Component = 'div', className, ...props }) {
  return (
    <Component
      className={clsx(
        className,
        'prose prose-slate max-w-none dark:prose-invert dark:text-slate-400',
        // headings
        'prose-headings:font-display prose-headings:scroll-mt-28 prose-headings:font-normal lg:prose-headings:scroll-mt-[10rem]',
        // lead
        'prose-lead:text-slate-500 dark:prose-lead:text-slate-300',
        // links
        'prose-a:font-semibold prose-a:text-storj-blue-700 dark:prose-a:text-sky-400',
        // text
        'prose-p:break-words',
        // link underline
        'prose-a:no-underline prose-a:shadow-[inset_0_0_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,1px)+1px))_0_0_var(--tw-prose-underline,theme(colors.storj-blue.700))] hover:prose-a:[--tw-prose-underline-size:2px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:px]',
        // pre
        'prose-pre:rounded-xl prose-pre:bg-storj-black prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
        // hr
        'dark:prose-hr:border-slate-800',
        // blockquote
        'dark:prose-blockquote:text-slate-300'
      )}
      {...props}
    />
  )
}
