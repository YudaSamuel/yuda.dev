<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; subtitle?: string; trail: { name: string; path: string }[] }>()
</script>

<template>
  <header class="relative isolate overflow-hidden border-b border-border">
    <div class="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
    <div class="bg-glow absolute inset-0 -z-10" aria-hidden="true" />
    <UiContainer>
      <div class="py-14 sm:py-20">
        <SiteBreadcrumbs :trail="trail" />
        <p v-if="eyebrow" class="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-brand">{{ eyebrow }}</p>
        <h1 class="max-w-3xl text-4xl font-bold leading-[1.08] sm:text-6xl" :class="eyebrow ? 'mt-3' : 'mt-10'">{{ title }}</h1>
        <p v-if="subtitle" class="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">{{ subtitle }}</p>
        <slot />
      </div>
    </UiContainer>
  </header>
</template>
