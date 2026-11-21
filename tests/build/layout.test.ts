import { describe, expect, it } from 'vitest'
import { readFile, readPage } from './helpers'

describe('layout', () => {
  const page = readPage('/')
  const html = readFile('index.html')

  it('has primary nav links', () => {
    for (const href of ['/hizmetler/', '/urunler/', '/blog/', '/iletisim/', '/referanslar/', '/hakkimizda/']) {
      expect(page.querySelector(`header nav a[href="${href}"]`), href).not.toBeNull()
    }
  })
  it('has a "Teklif Al" CTA in the header', () => {
    const cta = page.querySelectorAll('header a[href="/iletisim/"]').find((a) => a.text.includes('Teklif Al'))
    expect(cta).toBeDefined()
  })
  it('footer links the contact email', () => {
    expect(page.querySelector('footer a[href="mailto:contact@yuda.dev"]')).not.toBeNull()
  })
  it('footer lists every service-area district', () => {
    const footer = page.querySelector('footer')!.text
    for (const d of ['Antalya', 'Muratpaşa', 'Konyaaltı', 'Kepez', 'Aksu', 'Döşemealtı']) expect(footer).toContain(d)
  })
  it('renders no tel: or wa.me links while phone/whatsapp are empty', () => {
    expect(page.querySelectorAll('a[href^="tel:"]')).toHaveLength(0)
    expect(page.querySelectorAll('a[href*="wa.me"]')).toHaveLength(0)
  })
  it('applies the theme with an inline head script before stylesheets', () => {
    const head = html.slice(0, html.indexOf('</head>'))
    const themeIdx = head.search(/<script[^>]*>[^<]*localStorage[^<]*classList/)
    const cssIdx = head.indexOf('rel="stylesheet"')
    expect(themeIdx).toBeGreaterThan(-1)
    expect(cssIdx === -1 || themeIdx < cssIdx).toBe(true)
  })
  it('does not mark html.js before the app bundle runs (failed JS must not hide content)', () => {
    const head = html.slice(0, html.indexOf('</head>'))
    const inline = [...head.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n')
    expect(inline).not.toMatch(/classList\.add\(\s*['"`]js['"`]\s*\)/)
  })
  it('loads nothing from tailwind CDN or unpkg', () => {
    expect(html).not.toContain('cdn.tailwindcss.com')
    expect(html).not.toContain('unpkg.com')
  })
  it('declares a favicon', () => {
    expect(page.querySelector('link[rel="icon"]')).not.toBeNull()
  })
  it('has a skip link to main content', () => {
    expect(page.querySelector('a[href="#icerik"]')).not.toBeNull()
    expect(page.querySelector('main#icerik')).not.toBeNull()
  })
})
