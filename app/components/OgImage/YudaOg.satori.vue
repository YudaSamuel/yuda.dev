<script setup lang="ts">
withDefaults(defineProps<{ title?: string; subtitle?: string }>(), { title: 'Yuda', subtitle: '' })
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between"
    style="padding: 80px; background: linear-gradient(135deg, #042f2e 0%, #0f172a 100%); color: #f8fafc;"
  >
    <div style="display: flex; font-size: 30px; letter-spacing: 2px; color: #5eead4;">YUDA · ANTALYA</div>
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex; font-size: 68px; font-weight: 700; line-height: 1.15;">{{ title }}</div>
      <div v-if="subtitle" style="display: flex; margin-top: 24px; font-size: 32px; color: #cbd5e1;">{{ subtitle }}</div>
    </div>
    <div style="display: flex; font-size: 32px; font-weight: 700;">yuda.dev</div>
  </div>
</template>
