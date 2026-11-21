import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    'nuxt-site-config',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    'nuxt-seo-utils',
    'nuxt-og-image',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  site: {
    url: 'https://yuda.dev',
    name: 'Yuda',
    description: "Antalya'da web tasarım, özel yazılım, mobil uygulama ve siber güvenlik hizmetleri.",
    defaultLocale: 'tr',
    trailingSlash: false,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'tr' },
    },
  },
  content: {
    experimental: { sqliteConnector: 'native' },
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Yuda',
      url: 'https://yuda.dev/',
      logo: 'https://yuda.dev/img/logo.png',
    },
  },
  robots: {
    groups: [
      { userAgent: ['OAI-SearchBot', 'PerplexityBot'], allow: ['/'] },
    ],
  },
  ogImage: {
    defaults: { renderer: 'satori' },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: true,
    },
  },
})
