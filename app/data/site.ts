/**
 * Single place to fill in business details. Plain TS (no Nuxt imports) so
 * unit tests can import it directly. Empty phone/whatsapp/accessKey hide the
 * related UI and schema fields entirely.
 */
const filled = process.env.YUDA_TEST_FILLED === '1' // build tests only

export const business = {
  name: 'Yuda',
  email: 'contact@yuda.dev',
  phone: filled ? '+90 555 000 00 00' : '',
  whatsapp: filled ? '+90 555 000 00 00' : '',
  areaServed: ['Antalya', 'Muratpaşa', 'Konyaaltı', 'Kepez', 'Aksu', 'Döşemealtı'],
  sameAs: ['https://github.com/yudasamuel'] as string[],
}

export const form = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: filled ? 'test-key' : '',
}

export const author = {
  name: 'Yuda',
  url: '/hakkimizda',
  image: '',
}

export const projects: { title: string; url?: string; summary: string }[] = []

export type Business = typeof business
