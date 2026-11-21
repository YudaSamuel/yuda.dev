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
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: true,
    },
  },
})
