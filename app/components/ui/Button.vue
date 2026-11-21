<script setup lang="ts">
const props = withDefaults(defineProps<{
  to: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
}>(), { variant: 'primary', size: 'md' })

const external = computed(() => /^https?:\/\//.test(props.to))
const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 min-h-11',
  props.size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm',
  props.variant === 'primary' && 'bg-brand text-brand-fg hover:bg-brand-hover',
  props.variant === 'secondary' && 'border border-border bg-card text-fg hover:border-fg-muted',
  props.variant === 'ghost' && 'text-fg hover:bg-bg-subtle',
])
</script>

<template>
  <a v-if="external" :href="to" target="_blank" rel="noopener" :class="classes"><slot /></a>
  <NuxtLink v-else :to="to" :class="classes"><slot /></NuxtLink>
</template>
