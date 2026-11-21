import { describe, expect, it } from 'vitest'
import { productCta } from '~/utils/products'

describe('productCta', () => {
  it('links to checkout when in stock with a checkout url', () => {
    expect(productCta({ slug: 'proxy-chain', status: 'in_stock', checkoutUrl: 'https://checkout.yuda.dev/buy_script/proxy-chain' }))
      .toEqual({ kind: 'buy', href: 'https://checkout.yuda.dev/buy_script/proxy-chain' })
  })
  it('falls back to contact when out of stock without url', () => {
    expect(productCta({ slug: 'yudastore', status: 'out_of_stock', checkoutUrl: '' }))
      .toEqual({ kind: 'contact', href: '/iletisim?urun=yudastore' })
  })
  it('falls back to contact when in stock but url is empty', () => {
    expect(productCta({ slug: 'x', status: 'in_stock', checkoutUrl: '' }).kind).toBe('contact')
  })
  it('falls back to contact when out of stock even with a url', () => {
    expect(productCta({ slug: 'x', status: 'out_of_stock', checkoutUrl: 'https://checkout.yuda.dev/buy_script/x' }).kind).toBe('contact')
  })
})
