import { describe, expect, it } from 'vitest'
import { jsonLd, nodesOfType, readFile, readPage } from './helpers'

describe('home page SEO', () => {
  const page = readPage('/')
  it('has the exact home title', () => {
    expect(page.querySelector('title')?.text).toBe('Antalya Yazılım ve Web Tasarım Hizmeti | Yuda')
  })
  it('has canonical https://yuda.dev/', () => {
    expect(page.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://yuda.dev/')
  })
  it('keeps Turkish characters in og:title', () => {
    expect(page.querySelector('meta[property="og:title"]')?.getAttribute('content')).toContain('Yazılım')
  })
  it('sets og:locale tr_TR and twitter card', () => {
    expect(page.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('tr_TR')
    expect(page.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image')
  })
  it('has og:image', () => {
    expect(page.querySelector('meta[property="og:image"]')?.getAttribute('content')).toMatch(/^https:\/\/yuda\.dev\//)
  })
  it('emits Organization, WebSite and ProfessionalService', () => {
    expect(nodesOfType(page, 'Organization').length).toBeGreaterThan(0)
    expect(nodesOfType(page, 'WebSite').length).toBeGreaterThan(0)
    expect(nodesOfType(page, 'ProfessionalService').length).toBe(1)
  })
  it('has no SearchAction', () => {
    expect(JSON.stringify(jsonLd(page))).not.toContain('SearchAction')
  })
  it('omits telephone while phone is empty', () => {
    expect(nodesOfType(page, 'ProfessionalService')[0].telephone).toBeUndefined()
  })
})

describe('robots.txt and sitemap', () => {
  const robots = readFile('robots.txt')
  it('points to the sitemap', () => {
    expect(robots).toContain('Sitemap: https://yuda.dev/sitemap.xml')
  })
  it('allows AI search bots', () => {
    expect(robots).toMatch(/User-agent: OAI-SearchBot[\s\S]*?Allow: \//)
    expect(robots).toMatch(/User-agent: PerplexityBot[\s\S]*?Allow: \//)
  })
  it('sitemap lists the home page', () => {
    expect(readFile('sitemap.xml')).toContain('<loc>https://yuda.dev/</loc>')
  })
})
