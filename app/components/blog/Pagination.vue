<script setup lang="ts">
const props = defineProps<{ page: number; totalPages: number; base?: string }>()
const href = (n: number) => (n === 1 ? (props.base ?? '/blog') : `${props.base ?? '/blog'}/sayfa/${n}`)
</script>

<template>
  <nav v-if="totalPages > 1" aria-label="Sayfalar" class="mt-12 flex items-center justify-center gap-2">
    <NuxtLink v-if="page > 1" :to="href(page - 1)" class="inline-flex min-h-11 items-center rounded-xl border border-border px-4 hover:border-fg-muted" rel="prev">Önceki</NuxtLink>
    <NuxtLink
      v-for="n in totalPages" :key="n" :to="href(n)"
      class="inline-flex size-11 items-center justify-center rounded-xl border"
      :class="n === page ? 'border-brand-bright bg-brand-bright text-white' : 'border-border hover:border-fg-muted'"
      :aria-current="n === page ? 'page' : undefined"
    >{{ n }}</NuxtLink>
    <NuxtLink v-if="page < totalPages" :to="href(page + 1)" class="inline-flex min-h-11 items-center rounded-xl border border-border px-4 hover:border-fg-muted" rel="next">Sonraki</NuxtLink>
  </nav>
</template>
