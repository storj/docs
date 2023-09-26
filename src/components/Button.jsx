import Link from 'next/link'
import clsx from 'clsx'

const styles = {
  primary:
    'rounded-lg bg-storj-blue-700 py-3 px-5 text-sm font-bold text-white hover:bg-storj-blue-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:bg-storj-blue-500',
    
  secondary:
    'rounded-lg bg-slate-800 py-2 px-4 text-sm font-bold text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(styles[variant], className)

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
