<script setup lang="ts">
usePageSeo({
  title: 'Blog: Web, Yazılım ve Yerel SEO Rehberleri',
  description: "Antalya'daki işletmeler ve geliştiriciler için web sitesi, yazılım, yerel SEO ve siber güvenlik üzerine pratik rehberler.",
  ogImage: { title: 'Yuda Blog', subtitle: 'İşletmeler ve geliştiriciler için rehberler' },
})
</script>

<template>
  <div>
    <BlogHero
      title="Blog"
      subtitle="İşletmeler için web, yazılım ve yerel SEO rehberleri; geliştiriciler için lisanslama ve güvenlik yazıları."
      :trail="[{ name: 'Ana Sayfa', path: '/' }, { name: 'Blog', path: '/blog' }]"
    />
    <UiContainer>
      <BlogListing :page="1" />
    </UiContainer>
  </div>
</template>
