import type { Business } from '~/data/site'

export const SITE_URL = 'https://yuda.dev'

/** ProfessionalService node. Service-area business: no street address, no geo. */
export function businessSchema(b: Business): Record<string, unknown> {
  const node: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: b.name,
    url: `${SITE_URL}/`,
    email: b.email,
    image: `${SITE_URL}/img/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Antalya', addressRegion: 'Antalya', addressCountry: 'TR' },
    areaServed: b.areaServed.map((name, i) => ({ '@type': i === 0 ? 'City' : 'AdministrativeArea', name })),
  }
  if (b.phone) node.telephone = b.phone
  if (b.sameAs.length) node.sameAs = b.sameAs
  return node
}

/** Absolute page URL, always with a trailing slash (GitHub Pages directory style). */
export function absoluteUrl(path: string): string {
  const clean = `/${path.replace(/^\/+|\/+$/g, '')}`
  return clean === '/' ? `${SITE_URL}/` : `${SITE_URL}${clean}/`
}

export function breadcrumbItems(trail: { name: string; path: string }[]): { name: string; item: string }[] {
  return trail.map((t) => ({ name: t.name, item: absoluteUrl(t.path) }))
}
