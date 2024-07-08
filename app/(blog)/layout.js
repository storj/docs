import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s | Storj Engineering Blog',
    default: 'Storj Engineering Blog',
  },
  description:
    'Learn about the latest developments in the Storj network and the technology that powers it.',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return children
}
