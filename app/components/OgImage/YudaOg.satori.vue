<script setup lang="ts">
// Fonts must cover Turkish (ş ğ ı İ): Outfit comes from @nuxt/fonts (latin-ext),
// Noto Sans is fetched by og-image with ogImage.fontSubsets including latin-ext.
withDefaults(defineProps<{ title?: string; subtitle?: string; eyebrow?: string }>(), { title: 'Yuda', subtitle: '', eyebrow: 'Antalya · Yazılım ve Web' })
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between"
    style="padding: 72px 80px; background-color: #09090b; background-image: radial-gradient(circle at 100% 0%, rgba(255, 49, 49, 0.32) 0%, rgba(255, 49, 49, 0) 55%); color: #fafafa; font-family: 'Noto Sans', sans-serif;"
  >
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; font-family: 'Outfit'; font-weight: 700; font-size: 40px;">
        <span style="color: #ff3131;">&lt;/</span><span style="margin-left: 10px;">YUDA</span><span style="margin-left: 10px; color: #ff3131;">&gt;</span>
      </div>
      <div style="display: flex; font-size: 24px; color: #a1a1aa; letter-spacing: 2px;">{{ eyebrow.toLocaleUpperCase('tr-TR') }}</div>
    </div>
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex; width: 72px; height: 8px; border-radius: 4px; background: #ff3131; margin-bottom: 32px;" />
      <div style="display: flex; font-family: 'Outfit'; font-weight: 700; font-size: 70px; line-height: 1.1;">{{ title }}</div>
      <div v-if="subtitle" style="display: flex; margin-top: 24px; font-size: 30px; line-height: 1.4; color: #d4d4d8;">{{ subtitle }}</div>
    </div>
    <div style="display: flex; font-size: 26px; color: #a1a1aa;">yuda.dev</div>
  </div>
</template>
