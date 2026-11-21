import { describe, expect, it } from 'vitest'
import { fileExists, nodesOfType, readFile, readPage } from './helpers'

const ROUTES = ['/referanslar', '/hakkimizda', '/iletisim', '/sartlar', '/gizlilik']

describe('company and legal pages', () => {
  const pages = ROUTES.map((r) => [r, readPage(r)] as const)
  it('each has one h1, its own title and the right canonical', () => {
    const titles = new Set<string>()
    for (const [r, p] of pages) {
      expect(p.querySelectorAll('h1'), r).toHaveLength(1)
      titles.add(p.querySelector('title')!.text)
      expect(p.querySelector('link[rel="canonical"]')!.getAttribute('href'), r).toBe(`https://yuda.dev${r}`)
    }
    expect(titles.size).toBe(ROUTES.length)
  })
})

describe('/sartlar', () => {
  it('carries the original terms', () => {
    const t = readPage('/sartlar').text
    expect(t).toContain('31 Ocak 2026')
    expect(t).toContain('9. İletişim')
  })
})

describe('/referanslar', () => {
  const page = readPage('/referanslar')
  it('links both bug bounty proofs', () => {
    expect(page.querySelector('a[href="https://www.philips.com/a-w/security/coordinated-vulnerability-disclosure/hall-of-honors.html"]')).not.toBeNull()
    expect(page.querySelector('a[href="https://www.youtube.com/watch?v=ikSVujJ8fp0"]')).not.toBeNull()
  })
  it('hotlinks no external images', () => {
    expect(page.querySelectorAll('img[src^="http"]')).toHaveLength(0)
  })
  it('hides the projects block while there are none', () => {
    expect(page.querySelector('#projeler')).toBeNull()
  })
})

describe('/iletisim', () => {
  const page = readPage('/iletisim')
  it('emits ContactPage and the business', () => {
    expect(nodesOfType(page, 'ContactPage').length + nodesOfType(page, 'WebPage').filter((n) => [].concat(n['@type']).includes('ContactPage')).length).toBeGreaterThan(0)
    expect(nodesOfType(page, 'ProfessionalService')).toHaveLength(1)
  })
  it('lists the service area and email', () => {
    expect(page.text).toContain('Döşemealtı')
    expect(page.querySelector('main a[href="mailto:contact@yuda.dev"]')).not.toBeNull()
  })
})

describe('/hakkimizda', () => {
  it('emits AboutPage', () => {
    const page = readPage('/hakkimizda')
    expect(nodesOfType(page, 'AboutPage').length + nodesOfType(page, 'WebPage').filter((n) => [].concat(n['@type']).includes('AboutPage')).length).toBeGreaterThan(0)
  })
})

describe('404 and legacy URLs', () => {
  it('ships a Turkish 404.html that links the main sections', () => {
    expect(fileExists('404.html')).toBe(true)
    const html = readFile('404.html')
    expect(html).toContain('Sayfa bulunamadı')
    for (const href of ['/hizmetler', '/urunler', '/blog']) expect(html).toContain(`href="${href}"`)
  })
  it('redirects /terms.html to /sartlar', () => {
    const t = readFile('terms.html')
    expect(t).toContain('url=/sartlar')
    expect(t).toContain('<link rel="canonical" href="https://yuda.dev/sartlar">')
    expect(t).toContain('noindex')
  })
})
