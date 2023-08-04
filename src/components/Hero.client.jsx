'use client'
import { usePathname } from 'next/navigation'
export function Hero({ children }) {
  let pathname = usePathname()
  let isHomePage = pathname === '/'
  if (!isHomePage) {
    return null
  }
  return children
}
