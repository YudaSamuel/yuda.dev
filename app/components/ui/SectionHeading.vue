<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  as?: 'h1' | 'h2'
  center?: boolean
}>(), { as: 'h2', center: false })
</script>

<template>
  <div :class="center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p v-if="eyebrow" class="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">{{ eyebrow }}</p>
    <component :is="as" :class="as === 'h1' ? 'text-4xl sm:text-5xl font-semibold leading-tight' : 'text-3xl sm:text-4xl font-semibold leading-tight'">
      {{ title }}
    </component>
    <p v-if="subtitle" class="mt-4 text-lg text-fg-muted leading-relaxed">{{ subtitle }}</p>
  </div>
</template>
