import { describe, expect, it } from 'vitest'
import { listRoutes, readFile, readPage, routeToFile } from './helpers'

const routes = listRoutes().filter((r) => !r.startsWith('/__'))
const pages = routes.map((r) => ({ route: r, page: readPage(r), html: readFile(routeToFile(r)) }))

describe('sitewide', () => {
  it('generated a reasonable number of pages', () => {
    expect(routes.length).toBeGreaterThanOrEqual(19)
  })

  for (const { route, page, html } of pages) {
    describe(route, () => {
      it('has exactly one h1', () => {
        expect(page.querySelectorAll('h1')).toHaveLength(1)
      })
      it('has a title ≤ 60 and description ≤ 155 chars', () => {
        const title = page.querySelector('title')?.text ?? ''
        const desc = page.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
        expect(title.length, title).toBeGreaterThan(0)
        expect(title.length, title).toBeLessThanOrEqual(60)
        expect(desc.length, desc).toBeGreaterThan(0)
        expect(desc.length, desc).toBeLessThanOrEqual(155)
      })
      it('has a canonical without trailing slash', () => {
        const expected = route === '/' ? 'https://yuda.dev/' : `https://yuda.dev${route}`
        expect(page.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(expected)
      })
      it('gives every image an alt attribute', () => {
        for (const img of page.querySelectorAll('img')) expect(img.hasAttribute('alt'), img.getAttribute('src')!).toBe(true)
      })
      it('loads nothing from CDNs and never emits an empty telephone', () => {
        expect(html).not.toContain('cdn.tailwindcss.com')
        expect(html).not.toContain('unpkg.com')
        expect(html).not.toContain('"telephone":""')
      })
      it('has valid JSON-LD', () => {
        for (const s of page.querySelectorAll('script[type="application/ld+json"]')) expect(() => JSON.parse(s.textContent)).not.toThrow()
      })
      it('has no unresolved component placeholders', () => {
        expect(html).not.toMatch(/<(QuoteForm|ProductCard|PostCard|Pagination|AuthorBox)[\s>]/)
      })
      it('opens external links safely', () => {
        for (const a of page.querySelectorAll('a[target="_blank"]')) expect(a.getAttribute('rel') ?? '', a.getAttribute('href')!).toContain('noopener')
      })
    })
  }

  it('uses unique titles and descriptions across pages', () => {
    const titles = pages.map((p) => p.page.querySelector('title')?.text)
    const descs = pages.map((p) => p.page.querySelector('meta[name="description"]')?.getAttribute('content'))
    const dupes = (xs: (string | undefined)[]) => xs.filter((x, i) => xs.indexOf(x) !== i)
    expect(dupes(titles)).toEqual([])
    expect(dupes(descs)).toEqual([])
  })
})
