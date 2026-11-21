<script setup lang="ts">
defineProps<{ service: { path: string; navTitle: string; summary: string; icon: string }; featured?: boolean }>()
</script>

<template>
  <NuxtLink
    :to="service.path"
    class="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-7"
    :class="featured ? 'lg:p-9' : ''"
  >
    <div class="flex items-start justify-between">
      <span class="inline-flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110">
        <Icon :name="service.icon" class="size-6" aria-hidden="true" />
      </span>
      <Icon name="lucide:arrow-up-right" class="size-5 text-fg-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
    </div>
    <h3 class="mt-6 font-display font-semibold text-fg" :class="featured ? 'text-2xl' : 'text-xl'">{{ service.navTitle }}</h3>
    <p class="mt-2 flex-1 leading-relaxed text-fg-muted">{{ service.summary }}</p>
    <span class="mt-6 text-sm font-medium text-brand">Detaylı bilgi</span>
  </NuxtLink>
</template>
