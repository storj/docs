import '@/styles/tailwind.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/Navigation'
import Navbar from '@/components/Navbar'
import { Hero as HeroWrap } from '@/components/Hero.client'
import { Hero } from '@/components/Hero'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-white dark:bg-slate-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <HeroWrap>
            <Hero />
          </HeroWrap>
          <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
            <div className="hidden lg:relative lg:block lg:flex-none">
              <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
              <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
              <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
              <div className="content sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 lg:py-8 xl:w-72 xl:pr-16">
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
