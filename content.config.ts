import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { schemas } from './content.schemas'
import { isPublished } from './app/utils/publishing'

/**
 * Draft and future-dated posts are excluded from the collection at build time, so
 * they never reach the HTML, the sitemap, the RSS feed or the content database
 * that @nuxt/content ships to the browser (__nuxt_content/blog/sql_dump.txt).
 * The daily CI build (06:00 Istanbul) picks them up once their date arrives.
 */
function unpublishedBlogFiles(): string[] {
  const dir = join(process.cwd(), 'content', 'blog')
  const hidden: string[] = []
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const m = readFileSync(join(dir, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const fm = m ? parse(m[1]) : null
    if (!fm || typeof fm.date !== 'string' || !isPublished({ date: fm.date, draft: fm.draft === true })) {
      hidden.push(`blog/${file}`)
    }
  }
  return hidden
}

export default defineContentConfig({
  collections: {
    services: defineCollection({ type: 'page', source: 'hizmetler/*.md', schema: schemas.services }),
    products: defineCollection({ type: 'page', source: 'urunler/*.md', schema: schemas.products }),
    blog: defineCollection({
      type: 'page',
      source: { include: 'blog/*.md', exclude: unpublishedBlogFiles() },
      schema: schemas.blog,
    }),
    legal: defineCollection({ type: 'page', source: 'yasal/*.md', schema: schemas.legal }),
  },
})
