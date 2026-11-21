<script setup lang="ts">
defineProps<{ post: { path: string; title: string; description: string; date: string; category: string; cover: string; coverAlt: string } }>()
</script>

<template>
  <NuxtLink :to="post.path" class="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
    <div class="aspect-[1200/630] overflow-hidden bg-bg-inset">
      <img :src="post.cover" :alt="post.coverAlt" width="1200" height="630" loading="lazy" decoding="async" class="size-full object-cover transition-transform duration-500 group-hover:scale-105">
    </div>
    <div class="flex flex-1 flex-col p-6">
      <p class="font-mono text-xs uppercase tracking-wider text-brand">{{ categoryLabel(post.category) }}</p>
      <h3 class="mt-2 text-lg font-semibold leading-snug">{{ post.title }}</h3>
      <p class="mt-2 line-clamp-2 flex-1 text-sm text-fg-muted">{{ post.description }}</p>
      <time :datetime="post.date" class="mt-4 text-xs text-fg-muted">{{ formatDateTr(post.date) }}</time>
    </div>
  </NuxtLink>
</template>
