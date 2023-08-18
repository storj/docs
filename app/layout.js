import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/Navigation'
import Navbar from '@/components/Navbar'
import { Hero as HeroWrap } from '@/components/Hero.client'
import { Hero } from '@/components/Hero'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../src/fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata = {
  title: {
    template: '%s - Storj Docs',
    default: 'Storj Docs',
  },
  description: 'Make the world your data center',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <head />
      <body className="bg-white dark:bg-slate-900">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Navbar />
          <HeroWrap>
            <Hero />
          </HeroWrap>
          <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content xl:grid-cols-sidebar-content-toc">
            <div className="hidden lg:relative lg:block lg:flex-none">
              <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
              <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
              <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
              <div className="content sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden px-8 py-16 lg:py-8">
                <Navigation />
              </div>
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
