import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s | Storj blog',
    default: 'Storj blog',
  },
  description: 'Make the world your data center',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return children
}
