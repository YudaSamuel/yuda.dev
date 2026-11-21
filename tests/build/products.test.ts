import { describe, expect, it } from 'vitest'
import { nodesOfType, readPage } from './helpers'

function productNode(route: string) {
  const nodes = nodesOfType(readPage(route), 'Product')
  expect(nodes, route).toHaveLength(1)
  return nodes[0]
}

describe('/urunler', () => {
  const page = readPage('/urunler')
  it('lists 4 products', () => {
    const hrefs = new Set(page.querySelectorAll('main a[href^="/urunler/"]').map((a) => a.getAttribute('href')))
    expect(hrefs).toEqual(new Set(['/urunler/proxy-chain', '/urunler/lisans-sistemi', '/urunler/url-kisaltma', '/urunler/yudastore']))
  })
  it('has one h1', () => {
    expect(page.querySelectorAll('h1')).toHaveLength(1)
  })
})

describe('in-stock products link to checkout', () => {
  const cases = [
    ['/urunler/proxy-chain', 'https://checkout.yuda.dev/buy_script/proxy-chain', 89],
    ['/urunler/lisans-sistemi', 'https://checkout.yuda.dev/buy_script/lisans-system', 129],
    ['/urunler/url-kisaltma', 'https://checkout.yuda.dev/buy_script/url-shortener', 50],
  ] as const
  for (const [route, checkout, price] of cases) {
    it(route, () => {
      const page = readPage(route)
      expect(page.querySelector(`a[href="${checkout}"]`)).not.toBeNull()
      const p = productNode(route)
      const offer = [].concat(p.offers)[0] as any
      expect(Number(offer.price)).toBe(price)
      expect(offer.priceCurrency).toBe('USD')
      expect(offer.availability).toBe('https://schema.org/InStock')
      expect([].concat(p['@type'])).toContain('SoftwareApplication')
      expect(page.querySelector('a[href="/hizmetler/yazilim-gelistirme"]')).not.toBeNull()
    })
  }
})

describe('/urunler/yudastore (out of stock)', () => {
  const page = readPage('/urunler/yudastore')
  it('has no checkout link', () => {
    expect(page.querySelectorAll('a[href^="https://checkout.yuda.dev"]')).toHaveLength(0)
  })
  it('links to contact with the product preselected', () => {
    expect(page.querySelector('a[href="/iletisim?urun=yudastore"]')).not.toBeNull()
  })
  it('marks the offer OutOfStock', () => {
    const offer = [].concat(productNode('/urunler/yudastore').offers)[0] as any
    expect(offer.availability).toBe('https://schema.org/OutOfStock')
    expect(Number(offer.price)).toBe(499)
  })
})

describe('product images', () => {
  it('all have non-empty alt text', () => {
    for (const r of ['/urunler', '/urunler/proxy-chain', '/urunler/yudastore']) {
      for (const img of readPage(r).querySelectorAll('main img')) expect(img.getAttribute('alt')?.trim(), r).toBeTruthy()
    }
  })
})
