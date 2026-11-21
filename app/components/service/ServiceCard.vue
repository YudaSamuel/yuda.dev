<script setup lang="ts">
defineProps<{ service: { path: string; navTitle: string; summary: string; icon: string } }>()
</script>

<template>
  <NuxtLink
    :to="service.path"
    class="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-brand"
  >
    <span class="inline-flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
      <Icon :name="service.icon" class="size-5" aria-hidden="true" />
    </span>
    <h3 class="mt-5 text-lg font-semibold text-fg">{{ service.navTitle }}</h3>
    <p class="mt-2 flex-1 leading-relaxed text-fg-muted">{{ service.summary }}</p>
    <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
      Detaylı bilgi
      <Icon name="lucide:arrow-right" class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </span>
  </NuxtLink>
</template>
