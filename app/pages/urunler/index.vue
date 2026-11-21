<script setup lang="ts">
const { data: products } = await useAsyncData('products-list', () =>
  queryCollection('products').order('order', 'ASC').all())

usePageSeo({
  title: 'Hazır Scriptler ve Yazılım Ürünleri',
  description: 'Proxy, lisans sistemi ve URL kısaltma gibi hazır scriptler. Tek seferlik ödeme, anında teslim; ihtiyaca göre özelleştirme seçeneği.',
  ogImage: { title: 'Hazır Scriptler', subtitle: 'Tek seferlik ödeme, anında teslim' },
})
</script>

<template>
  <div>
    <header class="relative isolate overflow-hidden border-b border-border">
      <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div class="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
      <UiContainer>
        <div class="py-14 sm:py-24">
          <SiteBreadcrumbs :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Ürünler', path: '/urunler' }]" />
          <h1 class="mt-10 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-6xl">Hazır scriptler</h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            Belirli bir işi bugün çözmek isteyenler için tek seferlik ödemeli ürünler. Özel bir sürüm mü gerekiyor? Sizin için uyarlayabiliriz.
          </p>
        </div>
      </UiContainer>
    </header>

    <UiContainer>
      <ul class="grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(p, i) in products" :key="p.path" v-reveal="(i % 3) * 80">
          <ProductCard :product="p" />
        </li>
      </ul>

      <div v-reveal class="mb-24 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-bg-subtle p-8 sm:flex-row sm:items-center">
        <div>
          <h2 class="text-2xl font-bold">Aradığınız hazır değil mi?</h2>
          <p class="mt-2 text-fg-muted">İşinize özel yazılımı sıfırdan geliştirebilir ya da bir scripti ihtiyacınıza göre özelleştirebiliriz.</p>
        </div>
        <UiButton to="/hizmetler/yazilim-gelistirme" size="lg">Özel yazılım</UiButton>
      </div>
    </UiContainer>
  </div>
</template>
