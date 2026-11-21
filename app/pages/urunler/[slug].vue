<script setup lang="ts">
definePageMeta({ whatsapp: false })

const route = useRoute()
const slug = String(route.params.slug)
const { data: product } = await useAsyncData(`product-${slug}`, () =>
  queryCollection('products').path(`/urunler/${slug}`).first())
if (!product.value) throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })

const p = product.value
usePageSeo({
  title: p.title,
  description: p.description,
  image: p.images[0].src,
})
useSchemaOrg([
  {
    '@type': ['Product', 'SoftwareApplication'],
    '@id': `https://yuda.dev${p.path}#product`,
    name: p.name,
    description: p.description,
    image: p.images.map((i) => `https://yuda.dev${i.src}`),
    brand: { '@type': 'Brand', name: 'Yuda' },
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    url: `https://yuda.dev${p.path}`,
    offers: {
      '@type': 'Offer',
      price: String(p.price),
      priceCurrency: p.currency,
      availability: p.status === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: p.checkoutUrl || `https://yuda.dev${p.path}`,
      seller: { '@id': 'https://yuda.dev/#identity' },
    },
  },
])
</script>

<template>
  <article v-if="product">
    <header class="relative isolate overflow-hidden border-b border-border">
      <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <UiContainer>
        <div class="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <SiteBreadcrumbs :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Ürünler', path: '/urunler' }, { name: product.name, path: product.path }]" />
            <p class="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-brand">Hazır script</p>
            <h1 class="mt-3 text-4xl font-bold leading-[1.08] sm:text-5xl">{{ product.name }}</h1>
            <p class="mt-5 text-lg leading-relaxed text-fg-muted">{{ product.summary }}</p>
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <ProductCta :product="product" />
              <span class="font-mono text-sm text-fg-muted">Tek seferlik ödeme</span>
            </div>
          </div>
          <div class="overflow-hidden rounded-2xl border border-border bg-bg-inset shadow-xl shadow-black/5">
            <img :src="product.images[0].src" :alt="product.images[0].alt" width="1200" height="675" class="w-full object-cover" fetchpriority="high">
          </div>
        </div>
      </UiContainer>
    </header>

    <UiContainer>
      <div class="grid gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <ContentRenderer :value="product" class="prose-yuda max-w-none" />
          <h2 class="mt-12 text-2xl font-semibold">Özellikler</h2>
          <ul class="mt-5 grid gap-3 sm:grid-cols-2">
            <li v-for="feat in product.features" :key="feat" class="flex gap-3 rounded-xl border border-border bg-card p-4 text-fg-muted">
              <Icon name="lucide:check" class="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />{{ feat }}
            </li>
          </ul>
          <template v-if="product.requirements.length">
            <h2 class="mt-12 text-2xl font-semibold">Gereksinimler</h2>
            <ul class="prose-yuda mt-4"><li v-for="r in product.requirements" :key="r">{{ r }}</li></ul>
          </template>
          <template v-if="product.faqs.length">
            <h2 class="mt-12 text-2xl font-semibold">Sık sorulanlar</h2>
            <div class="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
              <details v-for="f in product.faqs" :key="f.q" class="group px-6 py-1">
                <summary class="flex list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 class="text-base font-semibold">{{ f.q }}</h3>
                  <Icon name="lucide:plus" class="size-4 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p class="pb-6 pr-10 leading-relaxed text-fg-muted">{{ f.a }}</p>
              </details>
            </div>
          </template>
        </div>
        <aside class="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div class="rounded-2xl border border-border bg-card p-6">
            <p class="font-mono text-3xl font-semibold">${{ product.price }}</p>
            <p class="mt-1 text-sm text-fg-muted">Tek seferlik ödeme</p>
            <ProductCta :product="product" class="mt-5 w-full" size="md" />
          </div>
          <div class="rounded-2xl border border-border bg-bg-subtle p-6">
            <h2 class="font-semibold">Bu scriptin özel versiyonunu mu istiyorsun?</h2>
            <p class="mt-2 text-sm text-fg-muted">Ek özellik, entegrasyon veya kurulum desteği için teklif alın.</p>
            <NuxtLink to="/hizmetler/yazilim-gelistirme" class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              Özel yazılım geliştirme <Icon name="lucide:arrow-right" class="size-4" aria-hidden="true" />
            </NuxtLink>
          </div>
        </aside>
      </div>
    </UiContainer>
  </article>
</template>
