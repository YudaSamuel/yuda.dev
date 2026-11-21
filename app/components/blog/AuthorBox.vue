<script setup lang="ts">
const { yuda } = useAppConfig()
</script>

<template>
  <div class="flex items-start gap-4 rounded-2xl border border-border bg-bg-subtle p-6">
    <img v-if="yuda.author.image" :src="yuda.author.image" :alt="yuda.author.name" width="56" height="56" class="size-14 rounded-full object-cover">
    <span v-else class="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-fg font-display text-lg font-bold text-bg" aria-hidden="true">
      <span class="text-brand-bright">&lt;/</span>&gt;
    </span>
    <div>
      <p class="font-semibold">{{ yuda.author.name }}</p>
      <p class="mt-1 text-sm leading-relaxed text-fg-muted">
        Antalya merkezli yazılım geliştirici ve güvenlik araştırmacısı. Philips ve chess.com bug bounty programlarında bulgu raporladı.
      </p>
      <NuxtLink :to="yuda.author.url" class="mt-2 inline-flex text-sm font-medium text-brand">Hakkımızda</NuxtLink>
    </div>
  </div>
</template>
