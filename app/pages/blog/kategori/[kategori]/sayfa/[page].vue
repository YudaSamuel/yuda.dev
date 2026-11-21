<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.kategori) as BlogCategory
const cat = BLOG_CATEGORIES[slug]
const page = Number(route.params.page)
if (!cat || !Number.isInteger(page) || page < 2) throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })

usePageSeo({
  title: `${cat.label} – Sayfa ${page}`,
  description: `${cat.description} Sayfa ${page}.`.slice(0, 155),
})
</script>

<template>
  <div>
    <BlogHero
      :title="`${cat.label} – Sayfa ${page}`"
      :subtitle="cat.description"
      :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Blog', path: '/blog' }, { name: cat.label, path: `/blog/kategori/${slug}` }, { name: `Sayfa ${page}`, path: `/blog/kategori/${slug}/sayfa/${page}` }]"
    />
    <UiContainer>
      <BlogListing :page="page" :category="slug" />
    </UiContainer>
  </div>
</template>
