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
      meta: [
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0b1120', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      script: [
        {
          // Runs before first paint: marks JS as available (enables scroll reveals)
          // and applies dark mode so it never flashes white.
          innerHTML: `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          tagPriority: 'critical',
          tagPosition: 'head',
        },
      ],
    },
  },
  fonts: {
    defaults: { subsets: ['latin', 'latin-ext'] },
    families: [
      { name: 'Outfit', weights: [500, 600, 700], provider: 'google' },
      { name: 'Inter', weights: [400, 500, 600], provider: 'google' },
    ],
  },
  icon: {
    mode: 'svg',
    serverBundle: { collections: ['lucide'] },
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
      routes: ['/', '/blog/rss.xml'],
      failOnError: false, // TEMP until Task 9 adds all nav pages
    },
  },
})
