import { describe, expect, it } from 'vitest'
import { nodesOfType, readPage } from './helpers'

const SLUGS = ['web-tasarim', 'yazilim-gelistirme', 'mobil-uygulama', 'e-ticaret', 'siber-guvenlik']

describe('/hizmetler', () => {
  const page = readPage('/hizmetler')
  it('lists 5 services in order', () => {
    const hrefs = page.querySelectorAll('main a[href^="/hizmetler/"]').map((a) => a.getAttribute('href'))
    expect([...new Set(hrefs)]).toEqual(SLUGS.map((s) => `/hizmetler/${s}/`))
  })
  it('has one h1 and a breadcrumb', () => {
    expect(page.querySelectorAll('h1')).toHaveLength(1)
    expect(nodesOfType(page, 'BreadcrumbList')).toHaveLength(1)
  })
})

describe('/hizmetler/web-tasarim', () => {
  const page = readPage('/hizmetler/web-tasarim')
  it('has an Antalya h1, short title and canonical', () => {
    expect(page.querySelector('h1')!.text).toContain('Antalya')
    expect(page.querySelector('title')!.text.length).toBeLessThanOrEqual(60)
    expect(page.querySelector('link[rel="canonical"]')!.getAttribute('href')).toBe('https://yuda.dev/hizmetler/web-tasarim/')
  })
  it('emits Service, BreadcrumbList and ProfessionalService', () => {
    const svc = nodesOfType(page, 'Service')
    expect(svc).toHaveLength(1)
    expect(JSON.stringify(svc[0].provider)).toContain('https://yuda.dev/#business')
    const crumbs = nodesOfType(page, 'BreadcrumbList')[0].itemListElement.map((i: any) => i.name)
    expect(crumbs).toEqual(['Ana Sayfa', 'Hizmetler', 'Web Tasarım'])
    expect(nodesOfType(page, 'ProfessionalService')).toHaveLength(1)
  })
  it('renders its FAQ questions', () => {
    expect(page.text).toContain("Antalya'da bir web sitesi ne kadar sürede hazır olur?")
  })
  it('links the related blog post', () => {
    expect(page.querySelector('a[href="/blog/antalya-web-sitesi-yaptirmak/"]')).not.toBeNull()
  })
  it('shows the email fallback instead of the form while the access key is empty', () => {
    expect(page.querySelector('form[action="https://api.web3forms.com/submit"]')).toBeNull()
    expect(page.querySelector('#teklif a[href="mailto:contact@yuda.dev"]')).not.toBeNull()
  })
})

describe('all service pages', () => {
  const pages = SLUGS.map((s) => readPage(`/hizmetler/${s}`))
  it('have unique titles and descriptions', () => {
    const titles = pages.map((p) => p.querySelector('title')!.text)
    const descs = pages.map((p) => p.querySelector('meta[name="description"]')!.getAttribute('content'))
    expect(new Set(titles).size).toBe(5)
    expect(new Set(descs).size).toBe(5)
  })
})
