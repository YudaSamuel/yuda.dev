<script setup lang="ts">
const props = defineProps<{ path: string; name: string }>()
const { data: doc } = await useAsyncData(`legal-${props.path}`, () => queryCollection('legal').path(props.path).first())
if (!doc.value) throw createError({ statusCode: 404, statusMessage: 'Sayfa bulunamadı', fatal: true })
usePageSeo({ title: doc.value.title, description: doc.value.description })
const route = useRoute()
</script>

<template>
  <div v-if="doc">
    <SitePageHero :title="doc.title" :trail="[{ name: 'Ana Sayfa', path: '/' }, { name, path: route.path }]">
      <p class="mt-6 text-sm text-fg-muted">Son güncelleme: <time :datetime="doc.updated">{{ formatDateTr(doc.updated) }}</time></p>
    </SitePageHero>
    <UiContainer>
      <!-- Left-aligned with the header logo, like every other page; line length capped for readability. -->
      <ContentRenderer :value="doc" class="prose-yuda max-w-3xl py-16" />
    </UiContainer>
  </div>
</template>
