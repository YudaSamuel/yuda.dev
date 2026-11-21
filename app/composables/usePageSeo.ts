import { absoluteUrl } from '~/utils/schema'

export interface PageSeoOptions {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  ogImage?: { title: string; subtitle?: string }
}

/** Title (with " | Yuda" template), description, canonical, Open Graph and Twitter tags. */
export function usePageSeo(opts: PageSeoOptions) {
  const route = useRoute()
  const canonical = absoluteUrl(route.path)
  const fullTitle = `${opts.title} | Yuda`
  useHead({
    title: opts.title,
    titleTemplate: '%s | Yuda',
    link: [{ rel: 'canonical', href: canonical, key: 'canonical' }],
  })
  useSeoMeta({
    description: opts.description,
    ogTitle: fullTitle,
    ogDescription: opts.description,
    ogType: opts.type ?? 'website',
    ogUrl: canonical,
    ogLocale: 'tr_TR',
    ogSiteName: 'Yuda',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: opts.description,
  })
  if (opts.image) {
    const img = absoluteUrl(opts.image)
    useSeoMeta({ ogImage: img, twitterImage: img })
  }
  else {
    defineOgImage('YudaOg', { title: opts.ogImage?.title ?? opts.title, subtitle: opts.ogImage?.subtitle ?? '' })
  }
}
