import { describe, expect, it } from 'vitest'
import { readFile, readPage } from './helpers'

const page = readPage('/')
const html = readFile('index.html')
const sectionIds = () => page.querySelectorAll('main section[id]').map((s) => s.getAttribute('id'))

describe('home structure', () => {
  it('has exactly one h1 mentioning Antalya', () => {
    const h1 = page.querySelectorAll('h1')
    expect(h1).toHaveLength(1)
    expect(h1[0].text).toContain('Antalya')
  })
  it('orders sections per the design rules', () => {
    expect(sectionIds()).toEqual(['hero', 'hizmetler', 'surec', 'cozumler', 'neden-yuda', 'urunler', 'blog', 'sss', 'teklif'])
  })
  it('uses h2 for every section heading after the hero', () => {
    for (const id of sectionIds().slice(1)) {
      expect(page.querySelector(`section#${id} h2`), id).not.toBeNull()
    }
  })
  it('never skips from h1/h2 straight to h4', () => {
    expect(page.querySelectorAll('main h4')).toHaveLength(0)
  })
})

describe('hero', () => {
  const hero = page.querySelector('section#hero')!
  it('links to quote and services', () => {
    expect(hero.querySelector('a[href="/iletisim"]')).not.toBeNull()
    expect(hero.querySelector('a[href="/hizmetler"]')).not.toBeNull()
  })
  it('is never gated behind a scroll reveal', () => {
    expect(hero.querySelectorAll('[data-reveal]')).toHaveLength(0)
  })
})

describe('sections', () => {
  it('lists 5 service cards linking to service pages', () => {
    const links = page.querySelectorAll('section#hizmetler a[href^="/hizmetler/"]')
    expect(links).toHaveLength(5)
  })
  it('explains the delivery process in at least 4 steps with a diagram', () => {
    expect(page.querySelectorAll('section#surec [data-step]').length).toBeGreaterThanOrEqual(4)
    expect(page.querySelector('section#surec svg[role="img"]')).not.toBeNull()
  })
  it('shows Antalya sector solutions', () => {
    const text = page.querySelector('section#cozumler')!.text
    for (const s of ['Otel', 'Restoran', 'Sağlık', 'Emlak']) expect(text).toContain(s)
  })
  it('shows at most 3 product cards', () => {
    const n = page.querySelectorAll('section#urunler a[href^="/urunler/"]').filter((a) => a.getAttribute('href') !== '/urunler').length
    expect(n).toBeGreaterThan(0)
    expect(n).toBeLessThanOrEqual(3)
  })
  it('lists only published posts', () => {
    const blog = page.querySelector('section#blog')!
    expect(blog.querySelector('a[href="/blog/antalya-web-sitesi-yaptirmak"]')).not.toBeNull()
    expect(blog.querySelector('a[href="/blog/test-planlanmis"]')).toBeNull()
    expect(blog.querySelector('a[href="/blog/test-taslak"]')).toBeNull()
  })
  it('has an FAQ with at least 4 questions', () => {
    expect(page.querySelectorAll('section#sss details').length).toBeGreaterThanOrEqual(4)
  })
  it('names every service-area district in the quote section', () => {
    const text = page.querySelector('section#teklif')!.text
    for (const d of ['Antalya', 'Muratpaşa', 'Konyaaltı', 'Kepez', 'Aksu', 'Döşemealtı']) expect(text).toContain(d)
  })
  it('avoids doorway keyword lists', () => {
    expect(page.text.toLowerCase()).not.toContain('muratpaşa web tasarım')
  })
  it('does not reuse unverified stats from the old site', () => {
    expect(page.text).not.toContain('100+')
  })
})

describe('motion and progressive enhancement', () => {
  it('renders the scroll progress indicator', () => {
    expect(page.querySelector('[data-scroll-progress]')).not.toBeNull()
  })
  const inline = html.match(/<style[^>]*>[\s\S]*?<\/style>/g)?.join('') ?? ''
  const linked = page.querySelectorAll('link[rel="stylesheet"]').map((l) => readFile(l.getAttribute('href')!.replace(/^\//, ''))).join('')
  const allCss = inline + linked

  it('only hides reveal elements when JS has marked the document', () => {
    const hiding = [...allCss.matchAll(/([^{}]*)\{([^{}]*)\}/g)]
      .filter(([, sel, body]) => sel.includes('[data-reveal]') && /opacity:\s*0(?![.\d])/.test(body))
    expect(hiding.length).toBeGreaterThan(0)
    for (const [, sel] of hiding) expect(sel, sel).toContain('.js')
  })
  it('respects reduced motion', () => {
    expect(allCss).toContain('prefers-reduced-motion')
  })
})
