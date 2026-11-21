import { describe, expect, it } from 'vitest'
import { business } from '~/data/site'

describe('site data', () => {
  it('uses the public contact email', () => {
    expect(business.email).toBe('contact@yuda.dev')
  })
  it('lists the exact service area', () => {
    expect(business.areaServed).toEqual(['Antalya', 'Muratpaşa', 'Konyaaltı', 'Kepez', 'Aksu', 'Döşemealtı'])
  })
  it('starts with empty phone and whatsapp', () => {
    expect(business.phone).toBe('')
    expect(business.whatsapp).toBe('')
  })
})
