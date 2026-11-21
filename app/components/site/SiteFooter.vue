<script setup lang="ts">
const { yuda } = useAppConfig()
const { data: services } = await useAsyncData('footer-services', () =>
  queryCollection('services').select('path', 'navTitle', 'order').order('order', 'ASC').all())
const year = new Date().getFullYear()
const tel = computed(() => yuda.business.phone.replace(/[^\d+]/g, ''))
</script>

<template>
  <footer class="mt-24 border-t border-border bg-bg-subtle">
    <UiContainer>
      <div class="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <img src="/images/logo.webp" alt="Yuda" width="132" height="32" class="h-8 w-auto dark:hidden" loading="lazy">
          <img src="/images/logo-white.webp" alt="Yuda" width="132" height="32" class="hidden h-8 w-auto dark:block" loading="lazy">
          <p class="mt-4 max-w-sm leading-relaxed text-fg-muted">
            Antalya'da işletmeler için web tasarım, özel yazılım, mobil uygulama ve siber güvenlik hizmetleri.
          </p>
          <p class="mt-4 text-sm text-fg-muted">
            <span class="font-medium text-fg">Hizmet bölgesi:</span> {{ yuda.business.areaServed.join(', ') }}
          </p>
        </div>

        <div>
          <h2 class="text-sm font-semibold text-fg">Hizmetler</h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li v-for="s in services" :key="s.path">
              <NuxtLink :to="s.path" class="text-fg-muted hover:text-fg">{{ s.navTitle }}</NuxtLink>
            </li>
            <li><NuxtLink to="/urunler" class="text-fg-muted hover:text-fg">Hazır Scriptler</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h2 class="text-sm font-semibold text-fg">İletişim</h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li><a :href="`mailto:${yuda.business.email}`" class="text-fg-muted hover:text-fg">{{ yuda.business.email }}</a></li>
            <li v-if="tel"><a :href="`tel:${tel}`" class="text-fg-muted hover:text-fg">{{ yuda.business.phone }}</a></li>
            <li><NuxtLink to="/iletisim" class="text-fg-muted hover:text-fg">Teklif formu</NuxtLink></li>
            <li><NuxtLink to="/blog" class="text-fg-muted hover:text-fg">Blog</NuxtLink></li>
            <li v-for="url in yuda.business.sameAs" :key="url">
              <a :href="url" target="_blank" rel="noopener me" class="text-fg-muted hover:text-fg">{{ url.replace(/^https?:\/\/(www\.)?/, '') }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col gap-3 border-t border-border py-6 text-sm text-fg-muted sm:flex-row sm:justify-between">
        <p>© {{ year }} Yuda. Tüm hakları saklıdır.</p>
        <p class="flex gap-4">
          <NuxtLink to="/sartlar" class="hover:text-fg">Kullanım Şartları</NuxtLink>
          <NuxtLink to="/gizlilik" class="hover:text-fg">Gizlilik ve KVKK</NuxtLink>
        </p>
      </div>
    </UiContainer>
  </footer>
</template>
