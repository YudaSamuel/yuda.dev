<script setup lang="ts">
withDefaults(defineProps<{ id: string; eyebrow: string; title: string; subtitle?: string; center?: boolean }>(), { center: false })
</script>

<template>
  <div v-reveal :class="center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p class="mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">
      <span class="text-brand-bright" aria-hidden="true">&lt;/&gt;</span>{{ eyebrow }}
    </p>
    <h2 :id="id" class="text-3xl font-bold leading-tight sm:text-[2.6rem]">{{ title }}</h2>
    <p v-if="subtitle" class="mt-4 text-lg leading-relaxed text-fg-muted">{{ subtitle }}</p>
  </div>
</template>
