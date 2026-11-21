<script setup lang="ts">
const { yuda } = useAppConfig()
usePageSeo({
  title: 'Antalya Yazılım ve Web Tasarım Hizmeti',
  description: "Antalya'da işletmenize özel web tasarım, yazılım geliştirme, mobil uygulama ve siber güvenlik hizmetleri. Ücretsiz teklif alın.",
})
useSchemaOrg([businessSchema(yuda.business)])
</script>

<template>
  <div>
    <HomeHero />
    <HomeServices />
    <HomeProcess />
    <HomeSolutions />
    <HomeWhy />
    <HomeProducts />
    <HomeLatestPosts />
    <HomeFaq />
    <HomeQuote />
  </div>
</template>
