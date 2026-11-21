<script setup lang="ts">
const route = useRoute()
const { yuda } = useAppConfig()
const { data: service } = await useAsyncData(`service-${route.params.slug}`, () =>
  queryCollection('services').path(`/hizmetler/${route.params.slug}`).first())
if (!service.value) throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })

const s = service.value
usePageSeo({ title: s.title, description: s.description, ogImage: { title: s.h1, subtitle: s.summary } })
useSchemaOrg([
  businessSchema(yuda.business),
  defineService({ name: s.h1, description: s.description, serviceType: s.navTitle, provider: { '@id': 'https://yuda.dev/#business' }, areaServed: yuda.business.areaServed }),
])
</script>

<template>
  <article v-if="service">
    <header class="border-b border-border bg-bg-subtle">
      <UiContainer>
        <div class="py-14 sm:py-20">
          <SiteBreadcrumbs :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Hizmetler', path: '/hizmetler' }, { name: service.navTitle, path: service.path }]" />
          <div class="mt-8 flex items-start gap-5">
            <span class="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand sm:inline-flex">
              <Icon :name="service.icon" class="size-7" aria-hidden="true" />
            </span>
            <div>
              <h1 class="text-4xl font-semibold leading-tight sm:text-5xl">{{ service.h1 }}</h1>
              <p class="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">{{ service.summary }}</p>
              <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                <UiButton to="#teklif" size="lg">Teklif Al</UiButton>
              </div>
            </div>
          </div>
        </div>
      </UiContainer>
    </header>

    <UiContainer>
      <div class="grid gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <ContentRenderer :value="service" class="prose-yuda max-w-none" />
        <aside class="lg:sticky lg:top-24 lg:self-start">
          <div class="rounded-2xl border border-border bg-card p-6">
            <h2 class="text-lg font-semibold">Fiyatlandırma</h2>
            <p class="mt-2 text-sm leading-relaxed text-fg-muted">{{ service.priceNote }}</p>
            <UiButton to="#teklif" class="mt-5 w-full">Ücretsiz teklif iste</UiButton>
          </div>
        </aside>
      </div>
    </UiContainer>
  </article>
</template>
