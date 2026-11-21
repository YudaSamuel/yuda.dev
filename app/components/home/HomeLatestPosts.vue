<script setup lang="ts">
const { data: posts } = await useAsyncData('home-posts', async () => {
  const all = await queryCollection('blog').select('path', 'title', 'description', 'date', 'category', 'cover', 'coverAlt', 'draft').order('date', 'DESC').all()
  return all.filter((p) => isPublished(p)).slice(0, 3)
})
const categoryLabel = (c: string) => (c === 'isletmeler-icin' ? 'İşletmeler İçin' : 'Geliştiriciler İçin')
const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <section id="blog" class="border-t border-border bg-bg-subtle py-24 sm:py-28" aria-labelledby="blog-baslik">
    <UiContainer>
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <HomeSectionHead id="blog-baslik" eyebrow="Blog" title="İşletmeler ve geliştiriciler için rehberler" />
        <UiButton v-reveal to="/blog" variant="secondary">Tüm yazılar</UiButton>
      </div>
      <ul class="mt-12 grid gap-6 md:grid-cols-3">
        <li v-for="(p, i) in posts" :key="p.path" v-reveal="i * 80">
          <NuxtLink :to="p.path" class="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
            <div class="aspect-[1200/630] overflow-hidden">
              <img :src="p.cover" :alt="p.coverAlt" width="1200" height="630" loading="lazy" decoding="async" class="size-full object-cover transition-transform duration-500 group-hover:scale-105">
            </div>
            <div class="flex flex-1 flex-col p-6">
              <p class="font-mono text-xs uppercase tracking-wider text-brand">{{ categoryLabel(p.category) }}</p>
              <h3 class="mt-2 text-lg font-semibold leading-snug">{{ p.title }}</h3>
              <p class="mt-2 line-clamp-2 flex-1 text-sm text-fg-muted">{{ p.description }}</p>
              <time :datetime="p.date" class="mt-4 text-xs text-fg-muted">{{ fmt(p.date) }}</time>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </UiContainer>
  </section>
</template>
