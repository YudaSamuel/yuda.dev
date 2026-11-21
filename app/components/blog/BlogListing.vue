<script setup lang="ts">
/** Shared listing for /blog, /blog/sayfa/N and /blog/kategori/X. */
const props = defineProps<{ page?: number; category?: string }>()

const key = `blog-list-${props.category ?? 'all'}-${props.page ?? 1}`
const { data } = await useAsyncData(key, async () => {
  const all = await queryCollection('blog')
    .select('path', 'title', 'description', 'date', 'category', 'cover', 'coverAlt', 'draft')
    .order('date', 'DESC').all()
  const live = all.filter((p) => isPublished(p) && (!props.category || p.category === props.category))
  return paginate(live, props.page ?? 1, 9)
})
if (props.page && props.page > 1 && data.value && props.page > data.value.totalPages) {
  throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })
}
useHead({ link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Yuda Blog', href: '/blog/rss.xml' }] })
</script>

<template>
  <div>
    <nav aria-label="Kategoriler" class="flex flex-wrap gap-2 pt-12">
      <NuxtLink to="/blog" class="rounded-full border px-4 py-2 text-sm" :class="!category ? 'border-fg bg-fg text-bg' : 'border-border text-fg-muted hover:text-fg'">Tümü</NuxtLink>
      <NuxtLink
        v-for="(c, slug) in BLOG_CATEGORIES" :key="slug" :to="`/blog/kategori/${slug}`"
        class="rounded-full border px-4 py-2 text-sm"
        :class="category === slug ? 'border-fg bg-fg text-bg' : 'border-border text-fg-muted hover:text-fg'"
      >{{ c.label }}</NuxtLink>
    </nav>
    <ul v-if="data?.items.length" class="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(p, i) in data.items" :key="p.path" v-reveal="(i % 3) * 80">
        <BlogPostCard :post="p" />
      </li>
    </ul>
    <p v-else class="py-16 text-fg-muted">Bu kategoride henüz yazı yok.</p>
    <BlogPagination v-if="data" :page="data.page" :total-pages="data.totalPages" :base="category ? `/blog/kategori/${category}` : '/blog'" />
  </div>
</template>
