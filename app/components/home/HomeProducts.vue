<script setup lang="ts">
const { data: products } = await useAsyncData('home-products', () =>
  queryCollection('products').where('status', '=', 'in_stock').order('order', 'ASC').limit(3).all())
</script>

<template>
  <section id="urunler" class="border-t border-border py-24 sm:py-28" aria-labelledby="urunler-baslik">
    <UiContainer>
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <HomeSectionHead id="urunler-baslik" eyebrow="Hazır scriptler" title="Hemen kullanmaya başlayın" subtitle="Belirli bir işi bugün çözmek isteyen geliştiriciler için tek seferlik ödemeli hazır ürünler." />
        <UiButton v-reveal to="/urunler" variant="secondary">Tüm ürünler</UiButton>
      </div>
      <ul class="mt-12 grid gap-5 md:grid-cols-3">
        <li v-for="(p, i) in products" :key="p.path" v-reveal="i * 80">
          <NuxtLink :to="p.path" class="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
            <div class="aspect-[16/9] overflow-hidden bg-bg-inset">
              <img :src="p.images[0].src" :alt="p.images[0].alt" width="640" height="360" loading="lazy" decoding="async" class="size-full object-cover transition-transform duration-500 group-hover:scale-105">
            </div>
            <div class="flex flex-1 items-start justify-between gap-4 p-5">
              <div>
                <h3 class="font-semibold">{{ p.name }}</h3>
                <p class="mt-1 text-sm text-fg-muted">{{ p.summary }}</p>
              </div>
              <span class="shrink-0 rounded-lg bg-bg-inset px-2.5 py-1 font-mono text-sm font-semibold">${{ p.price }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </UiContainer>
  </section>
</template>
