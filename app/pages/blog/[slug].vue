<script setup lang="ts">
const route = useRoute()
const { yuda } = useAppConfig()
const slug = String(route.params.slug)

const { data: post } = await useAsyncData(`post-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first())
if (!post.value || !isPublished(post.value)) throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })

const p = post.value
const minutes = readingTime(p.rawbody ?? '')

const { data: extras } = await useAsyncData(`post-extras-${slug}`, async () => {
  const [all, services, products] = await Promise.all([
    queryCollection('blog').select('path', 'title', 'description', 'date', 'category', 'tags', 'cover', 'coverAlt', 'draft').order('date', 'DESC').all(),
    p.relatedServices.length ? queryCollection('services').select('path', 'navTitle', 'summary', 'icon').all() : Promise.resolve([]),
    p.relatedProducts.length ? queryCollection('products').select('path', 'name', 'summary', 'price').all() : Promise.resolve([]),
  ])
  return {
    related: relatedPosts({ ...p, tags: p.tags ?? [] }, all.filter((x) => isPublished(x)).map((x) => ({ ...x, tags: x.tags ?? [] })), 3),
    services: services.filter((s) => p.relatedServices.includes(s.path.split('/').pop()!)),
    products: products.filter((x) => p.relatedProducts.includes(x.path.split('/').pop()!)),
  }
})

usePageSeo({ title: p.title, description: p.description, type: 'article', ogImage: { title: p.title, subtitle: categoryLabel(p.category) } })
useSeoMeta({ articlePublishedTime: p.date, articleModifiedTime: p.updated ?? p.date, articleSection: categoryLabel(p.category) })
useSchemaOrg([
  defineArticle({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    image: `https://yuda.dev${p.cover}`,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    inLanguage: 'tr',
    author: { '@type': 'Person', name: p.author, url: `https://yuda.dev${yuda.author.url}` },
  }),
])
const toc = (p.body?.toc?.links ?? []) as { id: string; text: string }[]
const trail = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: categoryLabel(p.category), path: `/blog/kategori/${p.category}` },
  { name: p.title, path: p.path },
]
</script>

<template>
  <article v-if="post">
    <header class="relative isolate overflow-hidden border-b border-border">
      <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <UiContainer>
        <div class="py-12 sm:py-16">
          <SiteBreadcrumbs :trail="trail" />
          <NuxtLink :to="`/blog/kategori/${post.category}`" class="mt-10 inline-block font-mono text-xs uppercase tracking-[0.18em] text-brand">{{ categoryLabel(post.category) }}</NuxtLink>
          <h1 class="mt-3 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">{{ post.title }}</h1>
          <p class="mt-5 max-w-3xl text-lg leading-relaxed text-fg-muted">{{ post.description }}</p>
          <p class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-muted">
            <span>{{ post.author }}</span>
            <span aria-hidden="true">·</span>
            <time :datetime="post.date">{{ formatDateTr(post.date) }}</time>
            <span aria-hidden="true">·</span>
            <span>{{ minutes }} dk okuma</span>
          </p>
        </div>
      </UiContainer>
    </header>

    <UiContainer>
      <!-- Same two-column grid as service pages: content starts at the logo edge,
           the sticky sidebar ends at the header CTA edge. -->
      <div class="grid gap-14 py-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div class="min-w-0">
        <img :src="post.cover" :alt="post.coverAlt" width="1200" height="630" class="w-full rounded-2xl border border-border" fetchpriority="high">
        <ContentRenderer :value="post" class="prose-yuda mt-12 max-w-none" />

        <div v-if="extras?.services.length || extras?.products.length" class="mt-14 grid gap-4 sm:grid-cols-2">
          <NuxtLink v-for="s in extras.services" :key="s.path" :to="s.path" class="card-lift flex gap-4 rounded-2xl border border-border bg-card p-5">
            <Icon :name="s.icon" class="mt-1 size-6 shrink-0 text-brand" aria-hidden="true" />
            <span><span class="block font-mono text-xs uppercase tracking-wider text-fg-muted">Hizmet</span><span class="mt-1 block font-semibold">{{ s.navTitle }}</span><span class="mt-1 block text-sm text-fg-muted">{{ s.summary }}</span></span>
          </NuxtLink>
          <NuxtLink v-for="x in extras.products" :key="x.path" :to="x.path" class="card-lift flex gap-4 rounded-2xl border border-border bg-card p-5">
            <Icon name="lucide:package" class="mt-1 size-6 shrink-0 text-brand" aria-hidden="true" />
            <span><span class="block font-mono text-xs uppercase tracking-wider text-fg-muted">Hazır script · ${{ x.price }}</span><span class="mt-1 block font-semibold">{{ x.name }}</span><span class="mt-1 block text-sm text-fg-muted">{{ x.summary }}</span></span>
          </NuxtLink>
        </div>

        <div class="mt-10">
          <BlogAuthorBox />
        </div>
      </div>

      <aside class="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <nav v-if="toc.length" aria-labelledby="bu-yazida" class="rounded-2xl border border-border bg-card p-6">
          <p id="bu-yazida" class="font-mono text-xs uppercase tracking-widest text-brand">Bu yazıda</p>
          <ol class="mt-4 space-y-2.5 text-sm">
            <li v-for="l in toc" :key="l.id">
              <a :href="`#${l.id}`" class="text-fg-muted transition-colors hover:text-fg">{{ l.text }}</a>
            </li>
          </ol>
        </nav>
        <div class="rounded-2xl border border-border bg-bg-subtle p-6">
          <p class="font-semibold">Projeniz için teklif alın</p>
          <p class="mt-2 text-sm leading-relaxed text-fg-muted">Ücretsiz keşif görüşmesiyle ihtiyacınızı netleştirip yazılı teklif hazırlayalım.</p>
          <UiButton to="/iletisim" class="mt-5 w-full">Ücretsiz teklif iste</UiButton>
        </div>
      </aside>
      </div>
    </UiContainer>

    <section v-if="extras?.related.length" class="border-t border-border bg-bg-subtle py-16" aria-labelledby="ilgili-yazilar">
      <UiContainer>
        <h2 id="ilgili-yazilar" class="text-2xl font-bold">Aynı kategoriden</h2>
        <ul class="mt-8 grid gap-6 md:grid-cols-3">
          <li v-for="r in extras.related" :key="r.path"><BlogPostCard :post="r" /></li>
        </ul>
      </UiContainer>
    </section>
  </article>
</template>
