export const dynamic = "force-static"

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
    host: `${process.env.SITE_URL}`,
  }
}
