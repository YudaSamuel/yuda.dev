<script setup lang="ts">
const props = defineProps<{ trail: { name: string; path: string }[] }>()
useSchemaOrg([
  defineBreadcrumb({ itemListElement: breadcrumbItems(props.trail) }),
])
</script>

<template>
  <nav aria-label="Sayfa konumu" class="text-sm text-fg-muted">
    <ol class="flex flex-wrap items-center gap-1.5">
      <li v-for="(t, i) in trail" :key="t.path" class="flex items-center gap-1.5">
        <Icon v-if="i > 0" name="lucide:chevron-right" class="size-3.5 opacity-60" aria-hidden="true" />
        <NuxtLink v-if="i < trail.length - 1" :to="t.path" class="hover:text-fg">{{ t.name }}</NuxtLink>
        <span v-else aria-current="page" class="text-fg">{{ t.name }}</span>
      </li>
    </ol>
  </nav>
</template>
