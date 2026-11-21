import { queryCollection } from '@nuxt/content/server'
import { isPublished } from '../../../app/utils/publishing'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Prerendered at build time into a static /blog/rss.xml (not a runtime API).
export default defineEventHandler(async (event) => {
  const posts = (await queryCollection(event, 'blog').order('date', 'DESC').all())
    .filter((p) => isPublished(p))
    .slice(0, 30)

  const items = posts.map((p) => {
    const url = `https://yuda.dev${p.path}`
    const pubDate = new Date(`${p.date}T09:00:00+03:00`).toUTCString()
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`
  }).join('\n')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yuda Blog</title>
    <link>https://yuda.dev/blog</link>
    <atom:link href="https://yuda.dev/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Antalya'daki işletmeler ve geliştiriciler için web, yazılım, yerel SEO ve güvenlik rehberleri.</description>
    <language>tr</language>
${items}
  </channel>
</rss>
`
})
