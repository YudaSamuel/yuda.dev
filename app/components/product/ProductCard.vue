<script setup lang="ts">
defineProps<{ product: { path: string; name: string; summary: string; price: number; status: string; images: { src: string; alt: string }[] } }>()
</script>

<template>
  <NuxtLink :to="product.path" class="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
    <div class="relative aspect-[16/9] overflow-hidden bg-bg-inset">
      <img :src="product.images[0].src" :alt="product.images[0].alt" width="640" height="360" loading="lazy" decoding="async" class="size-full object-cover transition-transform duration-500 group-hover:scale-105">
      <span v-if="product.status === 'out_of_stock'" class="absolute left-3 top-3 rounded-full bg-fg px-3 py-1 text-xs font-medium text-bg">Stokta yok</span>
    </div>
    <div class="flex flex-1 items-start justify-between gap-4 p-5">
      <div>
        <h3 class="font-semibold">{{ product.name }}</h3>
        <p class="mt-1 text-sm text-fg-muted">{{ product.summary }}</p>
      </div>
      <span class="shrink-0 rounded-lg bg-bg-inset px-2.5 py-1 font-mono text-sm font-semibold">${{ product.price }}</span>
    </div>
  </NuxtLink>
</template>
