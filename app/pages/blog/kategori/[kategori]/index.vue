<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.kategori) as BlogCategory
const cat = BLOG_CATEGORIES[slug]
if (!cat) throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })

usePageSeo({
  title: `${cat.label} Blog Yazıları`,
  description: cat.description,
  ogImage: { title: cat.label, subtitle: 'Yuda Blog' },
})
</script>

<template>
  <div>
    <BlogHero
      :title="cat.label"
      :subtitle="cat.description"
      :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Blog', path: '/blog' }, { name: cat.label, path: `/blog/kategori/${slug}` }]"
    />
    <UiContainer>
      <BlogListing :page="1" :category="slug" />
    </UiContainer>
  </div>
</template>
