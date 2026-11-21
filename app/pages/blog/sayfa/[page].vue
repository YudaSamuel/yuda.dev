<script setup lang="ts">
const route = useRoute()
const page = Number(route.params.page)
if (!Number.isInteger(page) || page < 2) throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })

usePageSeo({
  title: `Blog – Sayfa ${page}`,
  description: `Yuda blog yazıları, sayfa ${page}. Antalya'daki işletmeler ve geliştiriciler için web, yazılım ve güvenlik rehberleri.`,
})
</script>

<template>
  <div>
    <BlogHero
      :title="`Blog – Sayfa ${page}`"
      subtitle="İşletmeler ve geliştiriciler için rehberler."
      :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Blog', path: '/blog' }, { name: `Sayfa ${page}`, path: `/blog/sayfa/${page}` }]"
    />
    <UiContainer>
      <BlogListing :page="page" />
    </UiContainer>
  </div>
</template>
