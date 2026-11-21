<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)
useHead({ title: is404.value ? 'Sayfa bulunamadı | Yuda' : 'Bir hata oluştu | Yuda', meta: [{ name: 'robots', content: 'noindex' }] })
const links = [
  { to: '/hizmetler', label: 'Hizmetler', icon: 'lucide:layout-grid' },
  { to: '/urunler', label: 'Hazır scriptler', icon: 'lucide:package' },
  { to: '/blog', label: 'Blog', icon: 'lucide:book-open' },
  { to: '/iletisim', label: 'İletişim', icon: 'lucide:mail' },
]
</script>

<template>
  <NuxtLayout>
    <section class="relative isolate overflow-hidden">
      <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <UiContainer>
        <div class="mx-auto max-w-2xl py-24 text-center sm:py-32">
          <p class="font-mono text-sm text-brand"><span class="text-brand-bright">&lt;/</span> {{ error?.statusCode ?? 500 }} <span class="text-brand-bright">&gt;</span></p>
          <h1 class="mt-4 text-4xl font-bold sm:text-6xl">{{ is404 ? 'Sayfa bulunamadı' : 'Bir hata oluştu' }}</h1>
          <p class="mt-5 text-lg text-fg-muted">
            {{ is404 ? 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.' : 'Beklenmeyen bir sorun oluştu. Lütfen biraz sonra tekrar deneyin.' }}
          </p>
          <ul class="mt-10 grid gap-3 sm:grid-cols-2">
            <li v-for="l in links" :key="l.to">
              <NuxtLink :to="l.to" class="card-lift flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-left font-medium">
                <Icon :name="l.icon" class="size-5 text-brand" aria-hidden="true" />{{ l.label }}
              </NuxtLink>
            </li>
          </ul>
          <UiButton to="/" size="lg" class="mt-10">Ana sayfaya dön</UiButton>
        </div>
      </UiContainer>
    </section>
  </NuxtLayout>
</template>
