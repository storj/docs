export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${process.env.VERCEL_URL}/sitemap.xml`,
		host:`https://${process.env.VERCEL_URL}`
  }
}
