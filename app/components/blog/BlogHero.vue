<script setup lang="ts">
defineProps<{ title: string; subtitle: string; trail: { name: string; path: string }[] }>()
</script>

<template>
  <header class="relative isolate overflow-hidden border-b border-border">
    <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
    <div class="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
    <UiContainer>
      <div class="py-14 sm:py-20">
        <SiteBreadcrumbs :trail="trail" />
        <h1 class="mt-10 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-6xl">{{ title }}</h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">{{ subtitle }}</p>
      </div>
    </UiContainer>
  </header>
</template>
