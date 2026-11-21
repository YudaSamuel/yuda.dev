<script setup lang="ts">
const { yuda } = useAppConfig()
const { data: services } = await useAsyncData('services-list', () =>
  queryCollection('services').select('path', 'navTitle', 'summary', 'icon', 'order').order('order', 'ASC').all())

usePageSeo({
  title: "Antalya'da Yazılım ve Web Hizmetleri",
  description: "Antalya'daki işletmeler için web tasarım, özel yazılım, mobil uygulama, e-ticaret ve siber güvenlik hizmetleri. Ücretsiz keşif görüşmesi.",
  ogImage: { title: 'Hizmetlerimiz', subtitle: 'Web · Yazılım · Mobil · E-Ticaret · Güvenlik' },
})
useSchemaOrg([businessSchema(yuda.business)])
</script>

<template>
  <div>
    <header class="relative isolate overflow-hidden border-b border-border">
      <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div class="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
      <UiContainer>
        <div class="py-14 sm:py-24">
          <SiteBreadcrumbs :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Hizmetler', path: '/hizmetler' }]" />
          <h1 class="mt-10 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-6xl">Antalya'da yazılım ve web hizmetleri</h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            İhtiyacınıza göre tek bir hizmet ya da uçtan uca bir proje. Hepsinde aynı ilke: hızlı, güvenli ve müşteri getiren dijital ürünler.
          </p>
        </div>
      </UiContainer>
    </header>

    <UiContainer>
      <ul class="grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(s, i) in services" :key="s.path" v-reveal="(i % 3) * 80">
          <ServiceCard :service="s" />
        </li>
        <li v-reveal="160">
          <NuxtLink to="/urunler" class="card-lift flex h-full flex-col justify-between rounded-2xl border border-dashed border-border bg-bg-subtle p-6 sm:p-7">
            <div>
              <p class="font-mono text-xs uppercase tracking-widest text-brand">Hazır çözümler</p>
              <h2 class="mt-3 text-xl font-semibold">Hazır scriptler</h2>
              <p class="mt-2 leading-relaxed text-fg-muted">Belirli bir işi bugün çözmek isteyen geliştiriciler için tek seferlik ödemeli ürünler.</p>
            </div>
            <span class="mt-6 text-sm font-medium text-brand">Ürünleri gör</span>
          </NuxtLink>
        </li>
      </ul>
    </UiContainer>

    <HomeProcess />
    <HomeQuote />
  </div>
</template>
