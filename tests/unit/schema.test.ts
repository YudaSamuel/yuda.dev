import { describe, expect, it } from 'vitest'
import { breadcrumbItems, businessSchema } from '~/utils/schema'
import { business } from '~/data/site'

const AREA = ['Antalya', 'Muratpaşa', 'Konyaaltı', 'Kepez', 'Aksu', 'Döşemealtı']

describe('businessSchema', () => {
  it('omits telephone when phone is empty', () => {
    expect('telephone' in businessSchema({ ...business, phone: '' })).toBe(false)
  })
  it('includes telephone when phone is set', () => {
    expect(businessSchema({ ...business, phone: '+90 555 000 00 00' }).telephone).toBe('+90 555 000 00 00')
  })
  it('never exposes a street address or geo', () => {
    const s = businessSchema(business) as any
    expect(s['@type']).toBe('ProfessionalService')
    expect(s.address.streetAddress).toBeUndefined()
    expect(s.geo).toBeUndefined()
    expect(s.address).toEqual({ '@type': 'PostalAddress', addressLocality: 'Antalya', addressRegion: 'Antalya', addressCountry: 'TR' })
  })
  it('lists the exact service area, Antalya as City', () => {
    const s = businessSchema(business) as any
    expect(s.areaServed.map((a: any) => a.name)).toEqual(AREA)
    expect(s.areaServed[0]['@type']).toBe('City')
    expect(s.areaServed[1]['@type']).toBe('AdministrativeArea')
  })
  it('omits sameAs when empty', () => {
    expect('sameAs' in businessSchema({ ...business, sameAs: [] })).toBe(false)
  })
})

describe('breadcrumbItems', () => {
  it('builds absolute URLs', () => {
    const r = breadcrumbItems([{ name: 'Ana Sayfa', path: '/' }, { name: 'Hizmetler', path: '/hizmetler' }])
    expect(r[0]).toEqual({ name: 'Ana Sayfa', item: 'https://yuda.dev/' })
    expect(r[1].item).toBe('https://yuda.dev/hizmetler')
  })
})
