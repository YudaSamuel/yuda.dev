import { describe, expect, it } from 'vitest'
import { fileExists, nodesOfType, readFile, readPage } from './helpers'

const LIVE = ['/blog/antalya-web-sitesi-yaptirmak', '/blog/lisans-sistemi-nedir']
const HIDDEN = ['/blog/test-planlanmis', '/blog/test-taslak']

describe('/blog listing', () => {
  const page = readPage('/blog')
  it('lists published posts', () => {
    for (const p of LIVE) expect(page.querySelector(`main a[href="${p}"]`), p).not.toBeNull()
  })
  it('hides future-dated and draft posts', () => {
    for (const p of HIDDEN) expect(page.querySelector(`a[href="${p}"]`), p).toBeNull()
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
    for (const p of LIVE) expect(sm).toContain(`https://yuda.dev${p}`)
  })
})

describe('RSS', () => {
  const rss = readFile('blog/rss.xml')
  it('is RSS 2.0 in Turkish', () => {
    expect(rss).toContain('<rss version="2.0"')
    expect(rss).toContain('<language>tr</language>')
  })
  it('has exactly the published items', () => {
    expect(rss.match(/<item>/g)).toHaveLength(2)
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
    expect(page.querySelector('a[href="/hizmetler/web-tasarim"]')).not.toBeNull()
  })
})

describe('category page', () => {
  const page = readPage('/blog/kategori/isletmeler-icin')
  it('lists only that category', () => {
    expect(page.querySelector('main a[href="/blog/antalya-web-sitesi-yaptirmak"]')).not.toBeNull()
    expect(page.querySelector('main a[href="/blog/lisans-sistemi-nedir"]')).toBeNull()
  })
})
