import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  // Inline CSS into the HTML so first paint doesn't wait on a stylesheet request.
  features: { inlineStyles: true },
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
    // Body text uses the system font stack (zero download, full Turkish support).
    // Only the brand display font is self-hosted; not preloaded so it never
    // competes with CSS for first paint (font-display: swap).
    defaults: { subsets: ['latin', 'latin-ext'], preload: false },
    families: [
      { name: 'Outfit', weights: [700], provider: 'google' },
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
      failOnError: true,
    },
  },
})
