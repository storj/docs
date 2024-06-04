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

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL),
  title: {
    template: '%s - Storj Docs',
    default: 'Storj Docs',
  },
  description: 'Make the world your data center',
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable)}
      suppressHydrationWarning
    >
      <head />
      <body className="bg-white dark:bg-storj-black">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
