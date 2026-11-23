import { readdirSync, readFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import { isPublished } from '~/utils/publishing'
import { fileExists, livePosts, nodesOfType, postLinks, readFile, readPage } from './helpers'

const LIVE = livePosts().map((p) => `/blog/${p.slug}`)
const HIDDEN = ['/blog/test-planlanmis', '/blog/test-taslak']

describe('/blog listing', () => {
  const page = readPage('/blog')
  it('lists the newest 9 published posts on page 1, newest first', () => {
    expect(postLinks(page.querySelector('main')!)).toEqual(LIVE.slice(0, 9).map((p) => `${p}/`))
  })
  it('generates a page for every published post', () => {
    for (const p of LIVE) expect(fileExists(`${p.slice(1)}/index.html`), p).toBe(true)
  })
  it('hides future-dated and draft posts', () => {
    for (const p of HIDDEN) expect(page.querySelector(`a[href="${p}/"]`), p).toBeNull()
  })
  it('advertises the RSS feed', () => {
    expect(page.querySelector('link[rel="alternate"][type="application/rss+xml"]')?.getAttribute('href')).toBe('/blog/rss.xml')
  })
  it('has one h1', () => {
    expect(page.querySelectorAll('h1')).toHaveLength(1)
  })
})

describe('hidden posts are never generated', () => {
  it('has no html for future/draft posts', () => {
    for (const p of HIDDEN) expect(fileExists(`${p.slice(1)}/index.html`), p).toBe(false)
  })
  it('keeps them out of the sitemap', () => {
    const sm = readFile('sitemap.xml')
    for (const p of HIDDEN) expect(sm).not.toContain(p)
    for (const p of LIVE) expect(sm).toContain(`https://yuda.dev${p}/`)
  })
})

describe('shipped content database', () => {
  it('contains no draft or future-dated post', () => {
    const raw = readFile('__nuxt_content/blog/sql_dump.txt').trim()
    let sql = raw
    try { sql = gunzipSync(Buffer.from(raw, 'base64')).toString('utf8') }
    catch { /* plain text dump */ }
    expect(sql).toContain('antalya-web-sitesi-yaptirmak')
    for (const p of HIDDEN) expect(sql, p).not.toContain(p.split('/').pop())
  })
})

describe('RSS', () => {
  const rss = readFile('blog/rss.xml')
  it('is RSS 2.0 in Turkish', () => {
    expect(rss).toContain('<rss version="2.0"')
    expect(rss).toContain('<language>tr</language>')
  })
  it('has exactly the published items', () => {
    // Count posts that should be live right now, so adding articles never breaks this test.
    const live = readdirSync('content/blog').filter((f) => {
      const fm = parse(readFileSync(`content/blog/${f}`, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)![1])
      return isPublished({ date: fm.date, draft: fm.draft === true })
    })
    expect(live.length).toBeGreaterThanOrEqual(2)
    expect(rss.match(/<item>/g)).toHaveLength(Math.min(live.length, 30))
    expect(rss).not.toContain('test-planlanmis')
    expect(rss).not.toContain('test-taslak')
  })
})

describe('post page', () => {
  const page = readPage('/blog/antalya-web-sitesi-yaptirmak')
  it('has h1 and a machine-readable date', () => {
    expect(page.querySelectorAll('h1')).toHaveLength(1)
    expect(page.querySelector('time[datetime="2026-11-18"]')).not.toBeNull()
  })
  it('emits BlogPosting with a Person author', () => {
    const post = nodesOfType(page, 'BlogPosting')
    expect(post).toHaveLength(1)
    const author = [].concat(post[0].author)[0] as any
    const authorNode = author['@type'] ? author : nodesOfType(page, 'Person')[0]
    expect(authorNode['@type']).toBe('Person')
    expect(post[0].datePublished).toContain('2026-11-18')
  })
  it('has breadcrumbs Ana Sayfa > Blog > category > title', () => {
    const names = nodesOfType(page, 'BreadcrumbList')[0].itemListElement.map((i: any) => i.name)
    expect(names).toEqual(['Ana Sayfa', 'Blog', 'İşletmeler İçin', "Antalya'da Web Sitesi Yaptırmak: 2026 Rehberi"])
  })
  it('links its related service', () => {
    expect(page.querySelector('a[href="/hizmetler/web-tasarim/"]')).not.toBeNull()
  })
})

describe('category page', () => {
  const page = readPage('/blog/kategori/isletmeler-icin')
  it('lists only that category', () => {
    const expected = livePosts().filter((p) => p.category === 'isletmeler-icin').slice(0, 9).map((p) => `/blog/${p.slug}/`)
    expect(expected.length).toBeGreaterThan(0)
    expect(postLinks(page.querySelector('main')!)).toEqual(expected)
  })
})
