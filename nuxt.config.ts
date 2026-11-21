import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  // Inline CSS into the HTML so first paint doesn't wait on a stylesheet request.
  features: { inlineStyles: true },
  // GitHub Pages serves /x/index.html and 301-redirects /x → /x/. Every internal
  // link, canonical and sitemap URL therefore ends with a slash.
  experimental: { defaults: { nuxtLink: { trailingSlash: 'append' } } },
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
    trailingSlash: true,
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
          // Runs before first paint so dark mode never flashes white. (html.js, which
          // enables scroll reveals, is added by plugins/reveal.ts once the app mounts,
          // so a failed or blocked bundle never leaves content hidden.)
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
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
    // Turkish letters (ş ğ İ) live in latin-ext; the default ['latin'] renders them as "NO GLYPH".
    fontSubsets: ['latin', 'latin-ext'],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog/rss.xml', '/iletisim/tesekkurler/'],
      // Pages are canonical with a trailing slash. Skip crawler-discovered variants
      // without it (they raced on the same payload cache file on Windows) and URLs
      // with a query string (they would overwrite the page's index.html with
      // query-specific markup). Real links without a slash are caught by
      // tests/build/sitewide.test.ts and check:links.
      ignore: [
        (path: string) => path.includes('?'),
        (path: string) => !path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path),
      ],
      failOnError: true,
    },
  },
})
