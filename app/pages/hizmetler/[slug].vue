<script setup lang="ts">
const route = useRoute()
const { yuda } = useAppConfig()
const { data: service } = await useAsyncData(`service-${route.params.slug}`, () =>
  queryCollection('services').path(`/hizmetler/${route.params.slug}`).first())
if (!service.value) throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })

const s = service.value
const slug = String(route.params.slug)
const { data: related } = await useAsyncData(`service-posts-${slug}`, async () => {
  const posts = await queryCollection('blog').select('path', 'title', 'description', 'date', 'draft', 'relatedServices').order('date', 'DESC').all()
  return posts.filter((p) => isPublished(p) && p.relatedServices?.includes(slug)).slice(0, 3)
})
usePageSeo({ title: s.title, description: s.description, ogImage: { title: s.h1, subtitle: s.summary } })
useSchemaOrg([
  businessSchema(yuda.business),
  defineService({ name: s.h1, description: s.description, serviceType: s.navTitle, provider: { '@id': 'https://yuda.dev/#business' }, areaServed: yuda.business.areaServed }),
])
</script>

<template>
  <article v-if="service">
    <header class="relative isolate overflow-hidden border-b border-border">
      <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div class="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
      <UiContainer>
        <div class="py-14 sm:py-24">
          <SiteBreadcrumbs :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Hizmetler', path: '/hizmetler' }, { name: service.navTitle, path: service.path }]" />
          <p class="mt-10 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
            <Icon :name="service.icon" class="size-4" aria-hidden="true" />{{ service.navTitle }}
          </p>
          <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-6xl">{{ service.h1 }}</h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">{{ service.summary }}</p>
          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <UiButton to="/iletisim" size="lg">
              Ücretsiz Teklif Al
              <Icon name="lucide:arrow-right" class="size-5" aria-hidden="true" />
            </UiButton>
            <UiButton to="#sss" size="lg" variant="secondary">Sık sorulanlar</UiButton>
          </div>
        </div>
      </UiContainer>
    </header>

    <UiContainer>
      <div class="grid gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div v-reveal>
          <ContentRenderer :value="service" class="prose-yuda max-w-none" />
        </div>
        <aside class="lg:sticky lg:top-24 lg:self-start">
          <div class="rounded-2xl border border-border bg-card p-6">
            <p class="font-mono text-xs uppercase tracking-widest text-brand">Fiyatlandırma</p>
            <p class="mt-3 text-sm leading-relaxed text-fg-muted">{{ service.priceNote }}</p>
            <UiButton to="/iletisim" class="mt-5 w-full">Ücretsiz teklif iste</UiButton>
          </div>
          <ul class="mt-4 space-y-2 rounded-2xl border border-border bg-bg-subtle p-6 text-sm text-fg-muted">
            <li class="flex gap-2"><Icon name="lucide:shield-check" class="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />Güvenlik testi dahil</li>
            <li class="flex gap-2"><Icon name="lucide:map-pin" class="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />{{ yuda.business.areaServed.join(', ') }}</li>
          </ul>
        </aside>
      </div>
    </UiContainer>

    <section v-if="related?.length" class="border-t border-border py-20" aria-labelledby="ilgili-baslik">
      <UiContainer>
        <h2 id="ilgili-baslik" class="text-3xl font-bold">İlgili yazılar</h2>
        <ul class="mt-8 grid gap-5 md:grid-cols-3">
          <li v-for="p in related" :key="p.path">
            <NuxtLink :to="p.path" class="card-lift block h-full rounded-2xl border border-border bg-card p-6">
              <h3 class="text-lg font-semibold leading-snug">{{ p.title }}</h3>
              <p class="mt-2 line-clamp-2 text-sm text-fg-muted">{{ p.description }}</p>
            </NuxtLink>
          </li>
        </ul>
      </UiContainer>
    </section>

    <section id="sss" class="border-t border-border bg-bg-subtle py-20" aria-labelledby="hizmet-sss-baslik">
      <UiContainer>
        <h2 id="hizmet-sss-baslik" class="text-3xl font-bold">{{ service.navTitle }} hakkında sık sorulanlar</h2>
        <div class="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          <details v-for="f in service.faqs" :key="f.q" class="group px-6 py-1">
            <summary class="flex list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <h3 class="text-base font-semibold">{{ f.q }}</h3>
              <span class="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                <Icon name="lucide:plus" class="size-4" />
              </span>
            </summary>
            <p class="pb-6 pr-12 leading-relaxed text-fg-muted">{{ f.a }}</p>
          </details>
        </div>
      </UiContainer>
    </section>

    <section id="teklif" class="py-20" aria-labelledby="hizmet-teklif-baslik">
      <UiContainer>
        <div class="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-brand">Teklif</p>
            <h2 id="hizmet-teklif-baslik" class="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{{ service.navTitle }} için ücretsiz teklif alın</h2>
            <p class="mt-4 text-lg leading-relaxed text-fg-muted">Formu doldurun, ihtiyacınızı konuşmak için size dönelim. Yazılı ve net bir teklifle ilerleriz.</p>
          </div>
          <ServiceQuoteForm :service="service.navTitle" />
        </div>
      </UiContainer>
    </section>
  </article>
</template>
